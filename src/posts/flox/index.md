---
title: 'flox: Faster GroupBy reductions with Xarray'
date: '2023-07-17'
authors:
  - name: Deepak Cherian
    github: dcherian
summary: 'flox enables significantly faster groupby calculations for Xarray/Dask/Pangeo array computing ecosystem.'
---

## TLDR

Significantly faster groupby calculations are now possible through a new-ish package in the Xarray/Dask/Pangeo ecosystem called [flox](https://flox.readthedocs.io/en/latest/).
Practically, this means faster climatologies, faster resampling, faster histogramming, and faster compositing of array datasets.
It also means that [very](https://github.com/pangeo-data/pangeo/issues/266) [very](https://github.com/pangeo-data/pangeo/issues/271) [many](https://github.com/dask/distributed/issues/2602) [discussions](https://github.com/pydata/xarray/issues/2237) in the [Pangeo](https://pangeo.io) community are now closed 🎉 😱 🤯 🥳.

## The National Water Model Dataset

To show off, we demonstrate county-wise aggregation of output from the National Water Model (NWM) available on the [AWS Public Data Registry](https://registry.opendata.aws/nwm-archive/).

Quoting [the NOAA page](https://water.noaa.gov/about/nwm) for more.

> The National Water Model (NWM) is a hydrologic modelling framework that simulates observed and forecast streamflow over the entire continental United States (CONUS). The NWM simulates the water cycle with mathematical representations of the different processes and how they fit together. This complex representation of physical processes such as snowmelt and infiltration and movement of water through the soil layers varies significantly with changing elevations, soils, vegetation types and a host of other variables. Additionally, extreme variability in precipitation over short distances and times can cause the response on rivers and streams to change very quickly. Overall, the process is so complex that to simulate it with a mathematical model means that it needs a very high powered computer or supercomputer in order to run in the time frame needed to support decision makers when flooding is threatened.

> All CONUS model configurations provide streamflow for 2.7 million river reaches and other hydrologic information on 1km and 250m grids.

```python
import flox  # make sure its available
import fsspec
import numpy as np
import rioxarray
import xarray as xr

ds = xr.open_zarr(
    fsspec.get_mapper("s3://noaa-nwm-retrospective-2-1-zarr-pds/rtout.zarr", anon=True),
    consolidated=True,
)
```

Each field in this dataset is big!

```{python}
ds.zwattablrt
```

<RawHTML filePath='/posts/flox/zwattablrt-repr.html' />

This variable `zwattablrt` represents "Depth to saturated layers (=2m when no saturation; =0 when fully saturated)" ([source](https://ral.ucar.edu/sites/default/files/public/WRFHydroV5_OutputVariableMatrix_V5.pdf)). So the 2m depth mean an unsaturated soil column and 0m indicates a fully saturated soil column.

We'll subset to a single variable and a single year for demo purposes.

```{python}
subset = ds.zwattablrt.sel(time="2001")
subset
```

<RawHTML filePath='/posts/flox/subset-repr.html' />

## Problem description

We want to calculate county-level means for 3 hourly time series data on the 250m grid. This is a _Groupby_ problem. Our final output looks like this:

<iframe
  width='1024'
  height='312'
  src='/posts/flox/county-mean-holoviews.html'
  title='Interactive visualization of county means'
  frameborder='0'
  scrolling='no'
></iframe>

GroupBy is a term used for a very common analysis pattern commonly called "split-apply-combine" ([Wickham, 2011](https://www.jstatsoft.org/article/view/v040i01)) wherein an analyst

- _Splits_ a dataset into groups (e.g. counties),
- _Applies_ a transformation to each group of data (here a reduction like `.mean`)
- _Combines_ the results of `apply` to form a new dataset

For this problem we will split the dataset into counties, apply the `mean`, and then combine the results back.

With [Xarray](https://docs.xarray.dev/en/stable/user-guide/groupby.html), this would look like

```python
dataset.groupby(counties).mean()
```

However Xarray's default algorithm is to split the dataset in to groups by indexing, and then applying the reduction as a simple for-loop over groups. This approach doesn't work very well for large distributed problems.

![Xarray default groupby](https://flox.readthedocs.io/en/latest/_images/new-split-apply-combine-annotated.svg)

## Enter flox.

`flox` solves a long-standing problem in the Pangeo array computing ecosytem of computing GroupBy reductions. It implements a parallel groupby algorithm (using a tree reduction) to substantially improve performance of groupby reductions with dask.

![flox default map-reduce groupby](https://flox.readthedocs.io/en/latest/_images/new-map-reduce-reindex-True-annotated.svg)

- Specifically, `flox` speeds up [reduction methods](https://flox.readthedocs.io/en/latest/aggregations.html) like `groupby(...).mean()`, `groupby(...).max()`, etc, but not `groupby.map`.
- `flox` also significantly speeds up groupby reductions with pure numpy arrays using optimized implementations in the [`numpy-groupies` package](https://github.com/ml31415/numpy-groupies).
- `flox` allows more complicated groupby operations such as lazy grouping by a dask array, and grouping by multiple variables. Use `flox.xarray.xarray_reduce` for [these operations](https://flox.readthedocs.io/en/latest/xarray.html). Xarray currently only supports grouping by a single numpy variable.

See [here](https://flox.readthedocs.io/en/latest/intro.html) for short examples.

### How do I use it?

Run `mamba install flox` and `xarray>=2022.06.0` will use it by default for `.groupby`, `.groupby_bins`, and `.resample`!

A lot of effort was spent in ensuring backwards compatibility, so your workloads should only work better. Let us know if it [does not](https://github.com/pydata/xarray/issues)

## Demo

### Load county raster for grouping

A raster TIFF file identifying counties by a unique integer was created separately and saved.

We load that using [rioxarray](https://corteva.github.io/rioxarray/html/rioxarray.html)

```{python}
import rioxarray

counties = rioxarray.open_rasterio(
    "s3://nwm-250m-us-counties/Counties_on_250m_grid.tif", chunks="auto"
).squeeze()

# remove any small floating point error in coordinate locations
_, counties_aligned = xr.align(ds, counties, join="override")
counties_aligned
```

<RawHTML filePath='/posts/flox/counties-repr.html' />

We'll need the unique county IDs later, calculate that now.

```{python}
county_id = np.unique(counties_aligned.data).compute()
# 0 is used as NULL
county_id = county_id[county_id != 0]
print(f"There are {len(county_id)} counties!")
```

There are 3108 counties!

## GroupBy with Flox

We could run the computation as

```python
subset.groupby(counties_aligned).mean()
```

This would use flox in the background.

However it would also load `counties_aligned` in to memory (an unfortunate Xarray implementation detail) which is not so bad (only a gig). To avoid egress charges, we'll instead go through `flox.xarray` which allows you to lazily groupby a dask array (here `counties_aligned`) as long as you pass in the expected group labels in `expected_groups`.

See [here](https://flox.readthedocs.io/en/latest/intro.html#with-dask) for more.

```{python}
import flox.xarray

county_mean = flox.xarray.xarray_reduce(
    subset,
    counties_aligned.rename("county"),
    func="mean",
    expected_groups=(county_id,),
)
county_mean
```

<RawHTML filePath='/posts/flox/county-mean-repr.html' />

The computation proceeds very nicely, in particular thanks to recent
improvements in dask/distributed ([1](https://medium.com/pangeo/dask-distributed-and-pangeo-better-performance-for-everyone-thanks-to-science-software-63f85310a36b), [2](https://www.coiled.io/blog/reducing-dask-memory-usage)).

We don't anticipate trouble scaling this computation up to the full dataset.

## Summary

[flox](https://flox.readthedocs.io) makes many large Groupby problems tractable! Use it.

[flox](https://flox.readthedocs.io) also makes many small but more complicated (e.g. multiple variables) Groupby problems tractable! Use it.

We [anticipate](https://github.com/pydata/xarray/issues/6610) upgrading Xarray's interface to enable more complicated GroupBy computations. In the mean time, use flox!

## Acknowledgements

Thanks to Matt Rocklin ([coiled.io](https://coiled.io)) for facilitating easy computation with Dask in the cloud for the demo calculation.

Thanks to Kevin Sampson, Katelyn Fitzgerald, and James McCreight for feedback.

Deepak Cherian's time was was funded in part by

1. NASA-ACCESS 80NSSC18M0156 "Community tools for analysis of NASA Earth Observing System
   Data in the Cloud"
1. NASA-OSTFL 80NSSC22K0345 "Enhancing analysis of NASA data with the open-source Python Xarray Library", and
1. [NCAR's Earth System Data Science Initiative](https://ncar.github.io/esds/).
