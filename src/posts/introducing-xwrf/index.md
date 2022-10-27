---
title: 'Making WRF model output Xarray-friendly using xWRF'
date: '2022-10-27'
authors:
  - name: Lukas Pilz
    github: lpilz
  - name: Jonathan (JT) Thielen
    github: jthielen
---

![xWRF logo](https://raw.githubusercontent.com/xarray-contrib/xwrf/main/docs/source/_static/xwrf_logo_bg_light.svg)

## Summary

The [WRF model](https://www.mmm.ucar.edu/weather-research-and-forecasting-model) is widely used in the atmospheric sciences community, but its raw [NetCDF](https://www.unidata.ucar.edu/software/netcdf/) output is difficult to work with in Xarray. [`xWRF`](https://github.com/xarray-contrib/xwrf/) introduces post-processing and other utilities (via [accessors](https://docs.xarray.dev/en/stable/internals/extending-xarray.html)), making an `xarray.Dataset` of analysis-ready WRF data just a line of code away:

```python
import xarray as xr
import xwrf

ds = xr.open_dataset("wrfout_d01.nc").xwrf.postprocess()
```

## WRF in the Python Ecosystem

The [Weather Research and Forecasting model ("WRF")](https://www.mmm.ucar.edu/weather-research-and-forecasting-model) is a widely-used numerical weather prediction system, with applications in both atmospheric sciences research and forecasting on scales from climate prediction, to mesoscale weather forecasting, all the way to large-eddy simulations. For example, the [National Centers for Environmental Prediction](https://weather.gov/ncep/) in the U.S. runs several models based on the WRF core (e.g., [NAM](https://www.emc.ncep.noaa.gov/emc/pages/numerical_forecast_systems/nam.php) and [HRRR](https://www.emc.ncep.noaa.gov/emc/pages/numerical_forecast_systems/hrrr.php)).

However, when using WRF in one's own research, WRF outputs [NetCDF](https://www.unidata.ucar.edu/software/netcdf/) files that are not analysis-ready, but instead

- have vertical coordinates that are numerically-friendly, rather than physically useful,
- lack metadata conforming to community standards around which toolkits are built, and
- lack horizontal coordinates in projection space, preventing several types of geospatial calculations.

To address these needs, _post-processing_ tools are most often used to translate the "raw" WRF output into something more useable. Previously in the Python ecosystem, the only extant package for doing so was NCAR's [`wrf-python`](https://wrf-python.readthedocs.io/en/latest/). This legacy toolkit is built on long-standing Fortran routines ported from [NCL](http://www.ncl.ucar.edu/), and has a rich set of functionality for extracting diagnostic variables and interpolating to physically-meaningful coordinate systems. However, it crucially lacks CF metadata handling and [Dask](https://www.dask.org/) support, making it difficult to integrate into the modern stack of Python tools in the [Pangeo ecosystem](https://pangeo.io/) or to scale up to larger datasets.

These factors, along with the maintenance burden of `wrf-python`'s legacy framework, motivated several community members to build [`xWRF`](https://github.com/xarray-contrib/xwrf/). Efforts started with a simple interface for processing just WRF's poorly constructed time coordinate(s), as showcased in the [NCAR-ESDS blog](https://ncar.github.io/esds/posts/2021/xarray-wrf-example/) in October 2021. Since then, `xWRF` has built up to a full-featured accessor-based interface that enables a seamless integration of the unique WRF output format into Xarray and the rest of the Pangeo software stack. Key features include:

1. transforming WRF data into CF- and COMODO-compliant `xarray.Dataset` instances
2. converting WRF units into [`pint`](https://pint.readthedocs.io/en/stable/)-friendly ones
3. generating projection coordinates and providing a [`pyproj.CRS`](https://pyproj4.github.io/pyproj/dev/api/crs/crs.html) object
4. interpolating "staggered grid" fields to grid-cell centers (i.e., "destaggering")

In this post, we will show how `xWRF` works together with other utilities in order to post-process a large WRF dataset.

## Installing xWRF

Before we start using `xWRF`, we need to install it. We can do this by following these steps!

1. Install it in your environment using either
   - [conda](https://anaconda.org/conda-forge/xwrf) (`conda install -c conda-forge xwrf`)
   - or [pip](https://pypi.org/project/xwrf/) (`pip install xwrf`)
2. Open up a notebook and use the imports shown below!

```python
# for WRF data processing (`xwrf` Dataset and DataArray accessor)
import xarray as xr
import xwrf
# for unit conversion (`pint` DataArray accessor)
import pint_xarray
# for `dask`-accelerated computation
from distributed import LocalCluster, Client
# for numerics
import numpy as np
# for visualization
import holoviews as hv
import hvplot
import hvplot.xarray

hv.extension('bokeh') # set plotting backend
xr.set_options(display_style="text")
```

## Spin up a Cluster

This example uses a large volume of data, so in order to make use of Dask's parallelized computational speedup, specifying a Dask cluster best suited for the computational resources at one's disposal is in order. Here, we use a [`LocalCluster`](https://distributed.dask.org/en/stable/api.html#distributed.LocalCluster) to parallelize within a single machine. If we had access to a HPC system, we could also use [`Dask-Jobqueue`](https://jobqueue.dask.org/en/latest/) or another distributed Dask configuration in order to outsource the computation there.

```python
cluster = LocalCluster(n_workers=6)
client = Client(cluster)
print(client)
```

```
<Client: 'tcp://127.0.0.1:33017' processes=6 threads=24, memory=125.71 GiB>
```

## Example analysis

In this example, we will have a closer look at some WRF output data generated by downscaling the [CMIP6 GCM](https://mpimet.mpg.de/en/science/projects/integrated-activities/translate-to-englisch-cmip6-das-gekoppelte-modellvergleichsprojekt) data to higher spatial resolutions. The Coupled Model Intercomparison Project phase 6 (CMIP6) provides scientific input to the 6th assessment report of the IPCC ([IPCC AR6](https://www.ipcc.ch/report/ar6/wg1/)). There, the CMIP-models are used to analyze the impact of different forcings on the climate system and predict future climate change given different scenarios.

For the purposes of our example, let's imagine that one wishes to investigate how climate change could affect the jet stream in the California region in different climate change scenarios. In earlier IPCC reports, said scenarios would only be differentiated by different Representative Concentration Pathways (RCP), modeling different radiative forcings due to greenhouse gases, aerosols and other factors. However, one major critique of this framework was that it excluded a whole dimension of socioeconomic and political developments. Since AR5, this dimension is included using so-called [Shared Socioeconomic Pathways (SSP)](https://www.carbonbrief.org/explainer-how-shared-socioeconomic-pathways-explore-future-climate-change/). For the sake of this analysis. we pick two different scenarios which one might want to compare, namely SSP2-4.5 (SSP2, `4.5 W/m^2` forcing in 2100) and SSP5-8.5 (SSP5, `8.5 W/m^2` forcing in 2100).

In order to be able to easily access this data, we are using an [`intake`](https://intake.readthedocs.io/en/latest/) catalog. This catalog points to [`kerchunk`](https://fsspec.github.io/kerchunk/) metadata which in turn points to an [Open Data AWS bucket](https://registry.opendata.aws/wrf-cmip6/). This allows us to read a large multi-file collection of NetCDF files as if they were a single [Zarr store](https://zarr.readthedocs.io/en/stable/) concatenated over time (and this indeed uses an `xr.open_dataset` call with the `zarr` engine behind the scenes).

```python
import intake
cat = intake.open_catalog("https://raw.githubusercontent.com/xarray-contrib/xwrf-data/main/catalogs/catalog.yml")
ssp5_ds = cat["xwrf-sample-ssp585"].to_dask()
ssp5_ds
```

```
<xarray.Dataset>
Dimensions:                (Time: 124, south_north: 340, west_east: 270,
                            bottom_top_stag: 40, bottom_top: 39,
                            soil_levels_or_lake_levels_stag: 10,
                            snow_and_soil_levels_stag: 15, soil_layers_stag: 4,
                            seed_dim_stag: 2, west_east_stag: 271,
                            south_north_stag: 341, snow_layers_stag: 3,
                            interface_levels_stag: 16, snso_layers_stag: 7)
Coordinates:
  * Time                   (Time) float64 nan 1.0 2.0 3.0 ... 121.0 122.0 123.0
    XLAT                   (Time, south_north, west_east) float32 dask.array<chunksize=(1, 170, 135), meta=np.ndarray>
    XLAT_U                 (Time, south_north, west_east_stag) float32 dask.array<chunksize=(1, 170, 136), meta=np.ndarray>
    XLAT_V                 (Time, south_north_stag, west_east) float32 dask.array<chunksize=(1, 171, 135), meta=np.ndarray>
    XLONG                  (Time, south_north, west_east) float32 dask.array<chunksize=(1, 170, 135), meta=np.ndarray>
    XLONG_U                (Time, south_north, west_east_stag) float32 dask.array<chunksize=(1, 170, 136), meta=np.ndarray>
    XLONG_V                (Time, south_north_stag, west_east) float32 dask.array<chunksize=(1, 171, 135), meta=np.ndarray>
    XTIME                  (Time) float32 dask.array<chunksize=(124,), meta=np.ndarray>
Dimensions without coordinates: south_north, west_east, bottom_top_stag,
                                bottom_top, soil_levels_or_lake_levels_stag,
                                snow_and_soil_levels_stag, soil_layers_stag,
                                seed_dim_stag, west_east_stag,
                                south_north_stag, snow_layers_stag,
                                interface_levels_stag, snso_layers_stag
Data variables: (12/283)
    ACGRDFLX               (Time, south_north, west_east) float32 dask.array<chunksize=(1, 170, 135), meta=np.ndarray>
    ACHFX                  (Time, south_north, west_east) float32 dask.array<chunksize=(1, 170, 135), meta=np.ndarray>
    ACLHF                  (Time, south_north, west_east) float32 dask.array<chunksize=(1, 170, 135), meta=np.ndarray>
    ACLWDNB                (Time, south_north, west_east) float32 dask.array<chunksize=(1, 170, 135), meta=np.ndarray>
    ACLWDNBC               (Time, south_north, west_east) float32 dask.array<chunksize=(1, 170, 135), meta=np.ndarray>
    ACLWDNT                (Time, south_north, west_east) float32 dask.array<chunksize=(1, 170, 135), meta=np.ndarray>
    ...                     ...
    ZNU                    (Time, bottom_top) float32 dask.array<chunksize=(1, 39), meta=np.ndarray>
    ZNW                    (Time, bottom_top_stag) float32 dask.array<chunksize=(1, 40), meta=np.ndarray>
    ZS                     (Time, soil_layers_stag) float32 dask.array<chunksize=(1, 4), meta=np.ndarray>
    ZSNSO                  (Time, snso_layers_stag, south_north, west_east) float32 dask.array<chunksize=(1, 7, 170, 135), meta=np.ndarray>
    ZWT                    (Time, south_north, west_east) float32 dask.array<chunksize=(1, 170, 135), meta=np.ndarray>
    Z_LAKE3D               (Time, soil_levels_or_lake_levels_stag, south_north, west_east) float32 dask.array<chunksize=(1, 10, 170, 135), meta=np.ndarray>
Attributes: (12/149)
    ADAPT_DT_MAX:                    72.0
    ADAPT_DT_MIN:                    36.0
    ADAPT_DT_START:                  54.0
    AERCU_FCT:                       1.0
    AERCU_OPT:                       0
    AER_ANGEXP_OPT:                  1
    ...                              ...
    WEST-EAST_PATCH_END_STAG:        271
    WEST-EAST_PATCH_END_UNSTAG:      270
    WEST-EAST_PATCH_START_STAG:      1
    WEST-EAST_PATCH_START_UNSTAG:    1
    W_DAMPING:                       0
    YSU_TOPDOWN_PBLMIX:              0
```

As one can see, this output is not very helpful. Heaps of necessary information like WRF model grid coordinates or coordinate index assignments are missing. But we can use `xWRF` to very efficiently fix this.

```python
import time

start = time.time()
ssp5_ds = ssp5_ds.xwrf.postprocess()
end = time.time()

print(f"{end - start} s elapsed")
ssp5_ds
```

```
3.1846201419830322 s elapsed
```

```
<xarray.Dataset>
Dimensions:                    (Time: 124, z: 39, z_stag: 40, y: 340, x: 270,
                                soil_levels_or_lake_levels_stag: 10,
                                snow_and_soil_levels_stag: 15,
                                soil_layers_stag: 4, seed_dim_stag: 2,
                                x_stag: 271, y_stag: 341, snow_layers_stag: 3,
                                interface_levels_stag: 16, snso_layers_stag: 7)
Coordinates: (12/15)
  * Time                       (Time) datetime64[ns] 2099-10-01 ... 2099-10-3...
  * z                          (z) float32 0.9969 0.9899 ... 0.009174 0.002948
  * z_stag                     (z_stag) float32 1.0 0.9938 ... 0.005896 0.0
    CLAT                       (y, x) float32 dask.array<chunksize=(170, 135), meta=np.ndarray>
    XLAT                       (y, x) float32 dask.array<chunksize=(170, 135), meta=np.ndarray>
    XLAT_U                     (y, x_stag) float32 dask.array<chunksize=(170, 136), meta=np.ndarray>
    ...                         ...
    XLONG_V                    (y_stag, x) float32 dask.array<chunksize=(171, 135), meta=np.ndarray>
    XTIME                      (Time) float32 dask.array<chunksize=(124,), meta=np.ndarray>
  * y_stag                     (y_stag) float64 -3.386e+05 ... 2.721e+06
  * x_stag                     (x_stag) float64 -4.733e+06 ... -2.303e+06
  * y                          (y) float64 -3.341e+05 -3.251e+05 ... 2.717e+06
  * x                          (x) float64 -4.728e+06 -4.719e+06 ... -2.307e+06
Dimensions without coordinates: soil_levels_or_lake_levels_stag,
                                snow_and_soil_levels_stag, soil_layers_stag,
                                seed_dim_stag, snow_layers_stag,
                                interface_levels_stag, snso_layers_stag
Data variables: (12/282)
    ACGRDFLX                   (Time, y, x) float32 dask.array<chunksize=(1, 170, 135), meta=np.ndarray>
    ACHFX                      (Time, y, x) float32 dask.array<chunksize=(1, 170, 135), meta=np.ndarray>
    ACLHF                      (Time, y, x) float32 dask.array<chunksize=(1, 170, 135), meta=np.ndarray>
    ACLWDNB                    (Time, y, x) float32 dask.array<chunksize=(1, 170, 135), meta=np.ndarray>
    ACLWDNBC                   (Time, y, x) float32 dask.array<chunksize=(1, 170, 135), meta=np.ndarray>
    ACLWDNT                    (Time, y, x) float32 dask.array<chunksize=(1, 170, 135), meta=np.ndarray>
    ...                         ...
    air_pressure               (Time, z, y, x) float32 dask.array<chunksize=(1, 39, 170, 135), meta=np.ndarray>
    geopotential               (Time, z_stag, y, x) float32 dask.array<chunksize=(1, 40, 170, 135), meta=np.ndarray>
    geopotential_height        (Time, z_stag, y, x) float32 dask.array<chunksize=(1, 40, 170, 135), meta=np.ndarray>
    wind_east                  (Time, z, y, x) float32 dask.array<chunksize=(1, 39, 170, 135), meta=np.ndarray>
    wind_north                 (Time, z, y, x) float32 dask.array<chunksize=(1, 39, 170, 135), meta=np.ndarray>
    wrf_projection             object +proj=lcc +x_0=0 +y_0=0 +a=6370000 +b=6...
Attributes: (12/149)
    ADAPT_DT_MAX:                    72.0
    ADAPT_DT_MIN:                    36.0
    ADAPT_DT_START:                  54.0
    AERCU_FCT:                       1.0
    AERCU_OPT:                       0
    AER_ANGEXP_OPT:                  1
    ...                              ...
    WEST-EAST_PATCH_END_STAG:        271
    WEST-EAST_PATCH_END_UNSTAG:      270
    WEST-EAST_PATCH_START_STAG:      1
    WEST-EAST_PATCH_START_UNSTAG:    1
    W_DAMPING:                       0
    YSU_TOPDOWN_PBLMIX:              0
```

Despite the uncompressed dataset being close to 60GB in size, the `xWRF` post-processing is done in negligible time thanks to delayed computation of `dask` arrays.

Along with cleaning up the coordinates, `xWRF` post-processing includes the calculation of some basic diagnostics not included in `WRF` output, namely `air_pressure`, `air_potential_temperature`, `geopotential` and `geopotential_height`. Since version 0.0.2, it also computes `wind_east` and `wind_north` - earth relative wind vector components. These exist as `dask` arrays with delayed execution, and so are only computed upon using `.compute()`, `.persist()` or `.values` on the variable itself or a variable depending on it.

```python
ssp5_ds.air_pressure
```

```
<xarray.DataArray 'air_pressure' (Time: 124, z: 39, y: 340, x: 270)>
dask.array<add, shape=(124, 39, 340, 270), dtype=float32, chunksize=(1, 39, 170, 135), chunktype=numpy.ndarray>
Coordinates:
  * Time     (Time) datetime64[ns] 2099-10-01 ... 2099-10-31T18:00:00
  * z        (z) float32 0.9969 0.9899 0.981 0.9698 ... 0.0161 0.009174 0.002948
    CLAT     (y, x) float32 dask.array<chunksize=(170, 135), meta=np.ndarray>
    XLAT     (y, x) float32 dask.array<chunksize=(170, 135), meta=np.ndarray>
    XLONG    (y, x) float32 dask.array<chunksize=(170, 135), meta=np.ndarray>
    XTIME    (Time) float32 dask.array<chunksize=(124,), meta=np.ndarray>
  * y        (y) float64 -3.341e+05 -3.251e+05 ... 2.708e+06 2.717e+06
  * x        (x) float64 -4.728e+06 -4.719e+06 ... -2.316e+06 -2.307e+06
Attributes:
    units:          Pa
    standard_name:  air_pressure
    grid_mapping:   wrf_projection
```

For comparison with these SSP5-8.5 data, using method chaining, we can load the SSP2-4.5 data too and post-process it in a single line!

```python
ssp2_ds = cat["xwrf-sample-ssp245"].to_dask().xwrf.postprocess()
ssp2_ds
```

```
<xarray.Dataset>
Dimensions:                    (Time: 124, z: 39, z_stag: 40, y: 340, x: 270,
                                soil_levels_or_lake_levels_stag: 10,
                                snow_and_soil_levels_stag: 15,
                                soil_layers_stag: 4, seed_dim_stag: 2,
                                x_stag: 271, y_stag: 341, snow_layers_stag: 3,
                                interface_levels_stag: 16, snso_layers_stag: 7)
Coordinates: (12/15)
  * Time                       (Time) datetime64[ns] 2099-10-01 ... 2099-10-3...
  * z                          (z) float32 0.9969 0.9899 ... 0.009174 0.002948
  * z_stag                     (z_stag) float32 1.0 0.9938 ... 0.005896 0.0
    CLAT                       (y, x) float32 dask.array<chunksize=(170, 135), meta=np.ndarray>
    XLAT                       (y, x) float32 dask.array<chunksize=(170, 135), meta=np.ndarray>
    XLAT_U                     (y, x_stag) float32 dask.array<chunksize=(170, 136), meta=np.ndarray>
    ...                         ...
    XLONG_V                    (y_stag, x) float32 dask.array<chunksize=(171, 135), meta=np.ndarray>
    XTIME                      (Time) float32 dask.array<chunksize=(124,), meta=np.ndarray>
  * y_stag                     (y_stag) float64 -3.386e+05 ... 2.721e+06
  * x_stag                     (x_stag) float64 -4.733e+06 ... -2.303e+06
  * y                          (y) float64 -3.341e+05 -3.251e+05 ... 2.717e+06
  * x                          (x) float64 -4.728e+06 -4.719e+06 ... -2.307e+06
Dimensions without coordinates: soil_levels_or_lake_levels_stag,
                                snow_and_soil_levels_stag, soil_layers_stag,
                                seed_dim_stag, snow_layers_stag,
                                interface_levels_stag, snso_layers_stag
Data variables: (12/282)
    ACGRDFLX                   (Time, y, x) float32 dask.array<chunksize=(1, 170, 135), meta=np.ndarray>
    ACHFX                      (Time, y, x) float32 dask.array<chunksize=(1, 170, 135), meta=np.ndarray>
    ACLHF                      (Time, y, x) float32 dask.array<chunksize=(1, 170, 135), meta=np.ndarray>
    ACLWDNB                    (Time, y, x) float32 dask.array<chunksize=(1, 170, 135), meta=np.ndarray>
    ACLWDNBC                   (Time, y, x) float32 dask.array<chunksize=(1, 170, 135), meta=np.ndarray>
    ACLWDNT                    (Time, y, x) float32 dask.array<chunksize=(1, 170, 135), meta=np.ndarray>
    ...                         ...
    air_pressure               (Time, z, y, x) float32 dask.array<chunksize=(1, 39, 170, 135), meta=np.ndarray>
    geopotential               (Time, z_stag, y, x) float32 dask.array<chunksize=(1, 40, 170, 135), meta=np.ndarray>
    geopotential_height        (Time, z_stag, y, x) float32 dask.array<chunksize=(1, 40, 170, 135), meta=np.ndarray>
    wind_east                  (Time, z, y, x) float32 dask.array<chunksize=(1, 39, 170, 135), meta=np.ndarray>
    wind_north                 (Time, z, y, x) float32 dask.array<chunksize=(1, 39, 170, 135), meta=np.ndarray>
    wrf_projection             object +proj=lcc +x_0=0 +y_0=0 +a=6370000 +b=6...
Attributes: (12/149)
    ADAPT_DT_MAX:                    72.0
    ADAPT_DT_MIN:                    36.0
    ADAPT_DT_START:                  54.0
    AERCU_FCT:                       1.0
    AERCU_OPT:                       0
    AER_ANGEXP_OPT:                  1
    ...                              ...
    WEST-EAST_PATCH_END_STAG:        271
    WEST-EAST_PATCH_END_UNSTAG:      270
    WEST-EAST_PATCH_START_STAG:      1
    WEST-EAST_PATCH_START_UNSTAG:    1
    W_DAMPING:                       0
    YSU_TOPDOWN_PBLMIX:              0
```

Now, say we want to calculate the wind speeds from grid-relative wind vector components using [MetPy](https://unidata.github.io/MetPy/latest/). Because WRF's most commonly used core utilizes a numerically-advantageous [Arakawa-C grid](http://amps-backup.ucar.edu/information/configuration/wrf_grid_structure.html), these wind components are located on grid cell walls and have differing array shapes, which means we need to _destagger_ them onto the grid cell center to perform our calculation (we could also use the already-destaggered earth-relative wind component, but where would be the fun in that? ;) ). Additionally, atmospheric data is most frequently interpreted on isobaric (constant pressure) levels, so we also will use [xgcm](https://xgcm.readthedocs.io/en/latest/) to perform vertical interpolation to our defined pressure levels.

```python
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
    _wind_speed = grid.transform(
        _wind_speed,
        'Z',
        plevs,
        target_data=ds.air_pressure.metpy.unit_array.m_as('hPa'),
        method='log'
    ).persist()
    wind_speeds_js.append(_wind_speed)
```

Now, we can simply subtract the wind speed data of the two simulations from one another, let Dask compute the outcome, and plot the data using `hvplot.quadmesh`.

```python
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

![Animation of wind speed difference over the western U.S. for various times and isobaric levels](/posts/introducing-xwrf/hvplot_output.gif)

Finally, we clean up our workspace.

```python
ssp5_ds.close()
ssp2_ds.close()
cluster.close()
client.close()
```

## Conclusions

In this blog post, we demonstrated how `xWRF` can handle the eccentricities of WRF model output in a lightweight and efficient fashion so as to integrate seamlessly with Xarray and many other tools of the Pangeo stack like Dask, MetPy, and xgcm. This updated approach, in comparison to legacy WRF post-processing tools, handles large, cloud-based workflows effortlessly as seen with this downscaled CMIP6 example. Single local-file use cases are just as straightforward, as seen in [`xWRF`'s documentation](https://xwrf.readthedocs.io/en/latest/) (among several other examples).

The latest version of `xwrf` (v0.0.2, as of publication) contains the core set of functionality needed for most WRF postprocessing and is available on both conda-forge and PyPI, so feel free to try it out with your own WRF data processing! As a rather new package, we especially welcome any bug reports or feature requests on [xWRF's issue tracker](https://github.com/xarray-contrib/xwrf/issues), as well as PRs for code and/or documentation contributions.
