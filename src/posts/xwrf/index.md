---
title: 'Making WRF output data pythonic using xWRF'
date: '2022-09-20'
authors:
  - name: Jon Thielen
    github: jthielen
  - name: Lukas Pilz
    github: lpilz
---

![xWRF logo](https://github.com/xarray-contrib/xwrf/blob/main/docs/source/_static/xwrf_logo_bg_light.svg)

In the past, when analyzing [Weather Research and Forecasting (`WRF`)](https://www.mmm.ucar.edu/weather-research-and-forecasting-model) data with python you would be restricted to using the [`wrf-python`](https://wrf-python.readthedocs.io/en/latest/) package. This is not very convenient, especially when working on very large datasets since it uses compiled Fortran code in the background essentially preventing the user from scaling to cluster-scale using utilities like [`dask`](https://www.dask.org/).

Here, we present to you [`xWRF`](https://github.com/xarray-contrib/xwrf/), a lightweight interface for working with the  model output in [Xarray](https://docs.xarray.dev/en/stable/). Using `xWRF` enables a seamless integration of the unique `WRF` data format into Xarray and the [Pangeo](https://pangeo.io/) software stack. It achieves this by:

1. transforming `WRF` data into CF- and COMODO-compliant xarray datasets
2. converting `WRF` units into [`pint`](https://pint.readthedocs.io/en/stable/)-friendly ones
3. generating projection coordinates and providing a [`pyproj.CRS`](https://pyproj4.github.io/pyproj/dev/api/crs/crs.html) object

In this post, we will show how `xWRF` works together with other utilities in order to post-process a large `WRF` output dataset.

+++

## Installing `xWRF`

Before we start using `xWRF`, we need to install it. We can do this by following these steps!
1. Install this in your python environment using pip (`pip install xwrf`)
2. Open up a notebook and use the imports shown below!

```{code-cell} ipython3
import holoviews as hv
import hvplot
import hvplot.xarray
import xarray as xr
import xwrf
from distributed import Client
from dask_jobqueue import SLURMCluster
import pint_xarray
import numpy as np

hv.extension('bokeh')
```

## Spin up a Cluster

```{code-cell} ipython3
cluster = SLURMCluster(name='dask-cluster',
                      cores=128,
                      memory='125G',
                      processes=11,
                      interface='ib0',
                      queue='compute',
                      walltime='8:00:00',
                      asynchronous=0)
n_workers = 2
cluster.scale(n_workers)
client = Client(cluster)
client.wait_for_workers(n_workers=n_workers)
client
```

## Load the WRF output

```{code-cell} ipython3
import intake
cat = intake.open_catalog("https://raw.githubusercontent.com/xarray-contrib/xwrf-data/main/catalogs/catalog.yml")
ssp5_ds = cat["xwrf-sample-ssp585"].to_dask()
ssp5_ds
```

As one can see, this output is not very helpful. Heaps of necessary information like WRF model grid coordinates or coordinate index assignments are missing. But we can use `xWRF` to very efficiently fix this.

```{code-cell} ipython3
%time
ssp5_ds = ssp5_ds.xwrf.postprocess()
ssp5_ds
```

As you can see, the `xWRF` postprocessing is done in no time at all thanks to it leveraging the `dask`'s integration and it's delayed computation feature. This is despite the uncompressed dataset being close to 60GB in size.

```{code-cell} ipython3
ssp5_ds.nbytes*1E-9
```

Next to some cleanup of the coordinates, the `xWRF` postprocessing includes the calculation of some basic diagnostics not included in WRF output, namely `air_pressure`, `air_potential_temperature`, `geopotential` and `geopotential_height`.

Using `dask`, the computations for determining these diagnostics are delayed. They will be executed upon using `.compute()`, `.persist()` or `.values` on the variable itself or a variable depending on it.

```{code-cell} ipython3
ssp5_ds.air_pressure
```

## Example analysis

+++

Let's just imagine that we would want to investigate e.g. how climate change might affect the jet stream in different SSP scenarios. One comparison we might want to make could be between the SSP 585 and the SSP 245 simulations.

So first, we load the SSP 245 dataset, too.

```{code-cell} ipython3
ssp2_ds = cat["xwrf-sample-ssp245"].to_dask().xwrf.postprocess()
ssp2_ds
```

Now, in order to calculate the wind speeds, we have to destagger the x and y wind components. Finally, we can define the pressure levels we want to interpolate the data to and use `xgcm.Grid.transform` in order to perform the vertical interpolation.

```{code-cell} ipython3
from metpy.calc import wind_speed
import xgcm

plevs = np.array([350., 300., 250., 200., 150., 100.]) # in hPa
wind_speeds_js = []

for ds in [ssp2_ds, ssp5_ds]:
    for field in ['U', 'V']:
        ds[field] = ds[field].xwrf.destagger().variable
    ds = ds.metpy.quantify()
    _wind_speed = wind_speed(ds.U, ds.V).metpy.dequantify()
    grid = xgcm.Grid(ds, periodic=False)
    _wind_speed = grid.transform(_wind_speed, 'Z', plevs, target_data=ds.air_pressure.pint.to('hPa').metpy.dequantify(), method='log').persist()
    wind_speeds_js.append(_wind_speed)
```

+++ {"tags": []}

Now, we can simply subtract the wind speed data of the two simulations from one another, compute the outcome and plot the data using `hvplot.quadmesh`.

```{code-cell} ipython3
ws_difference = (wind_speeds_js[0] - wind_speeds_js[1]).compute()
max_value = np.max(np.fabs(ws_difference)).item()

plot = ws_difference.hvplot.quadmesh(
    x='XLONG',
    y='XLAT',
    groupby=['Time', 'air_pressure'],
    widget_location='bottom',
    title='Wind speed difference between SSPs 245 and 585',
    cmap='seismic',
    clim=(-max_value,max_value), 
    clabel='wind speed [m/s]',
    coastline=True,
    geo=True,
    rasterize=True,
    project=True
)
plot
```
![blogpost.gif](https://user-images.githubusercontent.com/14276158/191564410-1a7a83f0-3795-445a-9f5d-388ba225fa13.gif)

Finally, we clean up our workspace.

```{code-cell} ipython3
ssp5_ds.close(); ssp2_ds.close();
```

```{code-cell} ipython3
cluster.close(); client.close()
```
