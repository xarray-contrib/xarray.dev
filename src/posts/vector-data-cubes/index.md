---
title: Vector data cubes in Xarray
description: Thanks to Xvec and developments across a number of packages, the Xarray ecosystem now supports data cubes with vector geometries as coordinate locations.
---

Geospatial datasets representing information about real-world features as points, lines, and polygons are increasingly large, complex, and multidimensional. They are naturally represented as vector data cubes: n-dimensional arrays where at least one dimension is a set of vector geometries. The Xarray ecosystem now supports vector data cubes thanks to Xvec, a package designed for working with vector geometries within the Xarray data model 🎉. For those familiar with GeoPandas, Xvec is to Xarray as GeoPandas is to Pandas.

This blog post is geared toward analysts working with geospatial datasets. We introduce vector data cubes, discuss how they differ from raster data cubes, and describe the analytical opportunities they enable. We demonstrate these ideas by constructing a vector data cube from ERA5 reanalysis data sampled at a set of geometries representing points of interest.

## Background

### Raster data cubes and vector dataframes

The Python ecosystem has robust tools built to work with both raster and vector data. Geospatial raster data are typically stored as multi-dimensional arrays, with dimensions such as [x, y] or [longitude, latitude] representing the spatial domain of the dataset. For example, a satellite image usually covers a swath of area of the Earth’s surface with either latitude,longitude, or x,y dimensions. Raster data cubes can have additional dimensions such as time and a vertical dimension such as height or level. These data are typically stored on disk in array-based formats such as NetCDF, Zarr, or GeoTIFF, and analyzed with powerful tools like Xarray and Numpy. In contrast, geospatial vector data, which model real-world features like rivers, counties, and buildings as geometry objects, are typically stored as tables and formatted on disk in vector-specific containers like GeoJSON, Shapefile, or GeoParquet. In memory, geometries are commonly represented as Shapely geometries, and vector dataframes are analyzed using the GeoPandas library.

The key difference: raster data is viewed as a cube, while vector data is (mostly) viewed as a dataframe. Both of these are powerful and functional formats, but they are optimized for different types of operations. Thus framing raster data as cubes and vector data as tables can influence both how we, as analysts, think about our data and the analytical questions we ask with it. Further, analysts commonly want to merge the raster and vector data worlds, for instance, sampling a raster data cube at a set of points described by a vector dataframe.

#### The drawbacks of dataframes

|                            ![geodataframe](/posts/vector-data-cubes/geodataframe.png)                             |
| :---------------------------------------------------------------------------------------------------------------: |
| _Diagram of a GeoPandas GeoDataFrame, a tabular representation of vector data. Source: Introduction to GeoPandas_ |

Some data is more naturally represented as a multi-dimensional cube. Consider a collection of weather stations that record temperature and windspeed. These measurements are stored in the columns of a geopandas.GeoDataFrame, while the coordinates of each weather station are stored as Shapely Point geometries in a geometry column. We can quickly access a lot of information and ask questions such as “how do temperatures vary across the elevation range covered by the weather stations”, and “where are windspeeds highest?” But, each time the weather station records a measurement, we get a new set of data for each variable. How should that new data be incorporated in the GeoDataFrame? While there are ways of representing such multi-dimensional data in tabular form (see Pebesma, 2022), the column structure is still fundamentally one-dimensional, and these strategies all involve duplicating data along either the row or column dimension.

In the weather station example, the data are fundamentally two-dimensional ([location, time]) and must be flattened to fit into a dataframe. Contrast this to raster data cubes, where data is explicitly represented as multi-dimensional. In this data model, adding new dimensions is easy, and popular tools reflect this fundamental concept. What would it look like, and how would our workflows change, if vector data were also represented as a cube?
|![cube_sidebyside](/posts/vector-data-cubes/cube_sidebyside.png)|
|:--:|
|_Example of a raster data cube (left) and vector data cube (right). The raster data cube has a gridded structure with latitude, longitude and time dimensions. The vector data cube has a dimension of geometries, a dimension of data variables and a time dimension. Source: R-Spatial: Data Cubes_|

## What are vector data cubes?

The defining characteristic of a vector dataframes is that the data are contained in a set of 1-D columns, and one or more columns contain vector geometries. Generalizing this structure leads us to vector data cubes. Vector data cubes are n-dimensional arrays with at least one dimension that is an array of geometries (Pebesma, 2022). Where the spatial domain of a raster object is a gridded extent (eg. rdc = {'x': [0,1,2,3,4,5,6,7,8,9], 'y':[0,1,2,3,4,5,6,7,8,9]}), the spatial domain of a vector data cube is an array of points, lines or polygons representing real-world features:

```python
vdc = {
    'counties': [
        <POLYGON ((-95.343 48.547, -95.341 48.715, -95.095 48.912,.../>,
        <POLYGON ((-118.851 47.95, -118.847 48.479, -118.87 48.647, .../>,
        <POLYGON ((-117.438 48.044,-117.541 47.79, -117.61 47.798, .../>,
        ...
    ]
}
```

## What can we do with vector data cubes?

Vector data cubes allow users to observe how geospatial features, or data associated with those features, change over time: for example, tracking areal extents such as forest boundaries and agricultural parcels, or data from non-stationary monitoring systems such as ocean data buoys. Important information about the sampling locations will be preserved as points or other geometries, making the result a vector data cube. A particularly exciting use case is sampling gridded raster data at a number of polygons of interest, going from a raster data cube covering a large spatial extent to a vector data cube containing only the spatial areas of interest, while preserving information about the spatial sampling. To illustrate, we will sample the ERA5 atmospheric reanalysis dataset at a number of point locations representing cities across Europe.

ERA5 is a dataset that provides estimates for 32 atmospheric variables for the entire globe for every 6-hour window from 1959 to 2022. We will use an ‘analysis-ready’ dataset from WeatherBench2, which makes it possible to access ERA 5 data from Google Cloud Storage, letting us work with this dataset without downloading it to a local machine.

## Assemble vector data cube

For brevity's sake, we'll extract a shorter time series and only a few data variables.

```python
import xarray as xr

uri = "gs://gcp-public-data-arco-era5/ar/1959-2022-full_37-6h-0p25deg-chunk-1.zarr-v2"
era5_ds_sub = (
    # Open the dataset
    xr.open_zarr(uri, chunks={"time": 48}, consolidated=True)
    # Select the near-surface level
    .isel(level=0, drop=True)
    # subset in time
    .sel(time=slice("2017-01", "2018-01"))
    # reduce to two arrays
    [["2m_temperature", "u_component_of_wind"]]
)
era5_ds_sub
```

![era5_raster_cube](/posts/vector-data-cubes/era5_raster_cube.png)

Here's an image of the "2m_temperature' variable at a single time-step.

```python
(era5_ds_sub.isel(time=-2)["2m_temperature"].plot(robust=True, figsize=(10, 6)))
```

![png](/posts/vector-data-cubes/vector_cube_blogpost_combined_4_1.png)

### Read vector data

ERA5 outputs are gridded datasets covering the entire globe. We only need data about cities in Europe, so continuing to store the global dataset is a pain and unnecessary. We use a [vector dataset from Hugging Face](https://huggingface.co/datasets/jamescalam/world-cities-geo) and format it as a `gpd.GeoDataFrame` containing data covering the European continent.

```python
import geopandas as gpd
import pandas as pd

cities_df = pd.read_json(
    "hf://datasets/jamescalam/world-cities-geo/train.jsonl", lines=True
)
cities_eur = cities_df.loc[cities_df["continent"] == "Europe"]
cities_eur = gpd.GeoDataFrame(
    cities_eur,
    geometry=gpd.points_from_xy(cities_eur.longitude, cities_eur.latitude),
    crs="EPSG:4326",
).drop(["latitude", "longitude", "x", "y", "z"], axis=1)
cities_eur.head()
```

![gdf](/posts/vector-data-cubes/eur_cities_gdf.png)

### Sampling a raster data cube using vector geometries

We've created an vector data cube (`europe_ds`) storing data about European cities. This object has the geographic information needed to subset the ERA5 dataset `era5_ds_sub`. We now need to extract the points from `era5_ds_sub` (which is indexed with latitude and longitude coordinates) that align with the `city` geometry dimension in `europe_ds`. We can use the Xvec method [xvec.extract_points()](https://xvec.readthedocs.io/en/stable/extract_pts.html) for this operation.

```python
import xvec

era5_europe_cities = era5_ds_sub.xvec.extract_points(
    cities_eur.geometry, x_coords="longitude", y_coords="latitude"
).drop_vars("index")
era5_europe_cities
```

![era5_raster_cube](/posts/vector-data-cubes/era5_eur_cities_vector_cube.png)

Cool, now we have a **2-dimensional vector data cube**! We went from a 3-d raster datacube with `[time, latitude, longitude]` dimensions to a 2-d datacube `[time, geometry]` where the only spatial dimension is 'geometry'.

Up until now, we have been performing lazy operations, meaning that we haven't actually loaded the ERA5 data we accessed from Google Cloud Storage into memory on our local machine. We'll do this now so that we can perform computations that require the data in memory.

```python

era5_europe_cities = era5_europe_cities.load()
```

## Using a vector data cube

We've shown how to combine raster and vector data to create a vector data cube with **two indexes** (geometry and time). Now, let's use it!

### 1. Spatial indexing

We can select points based on geometry and proximity to other points using the `xvec.query()` method. As an example, find all cities within 0.5 degree of the city with the highest single temperature estimate:

```python
max_temp_city = era5_europe_cities.isel(
    **era5_europe_cities["2m_temperature"].argmax(dim=["time", "geometry"])
)
max_temp_buffer = era5_europe_cities.xvec.query(
    "geometry", max_temp_city["geometry"].data.item().buffer(0.5)
)
max_temp_buffer
```

![max_temp](/posts/vector-data-cubes/max_temp.png)

### 2. Raster analysis

Now that we have a multidimensional vector data cube, we can leverage Xarray's functionality for computations and reductions along labeled dimensions. For example, let us compute seasonal means of the data

```python
era5_europe_cities_seasons = era5_europe_cities.groupby("time.season").mean()
era5_europe_cities_seasons
```

![seasonal](/posts/vector-data-cubes/seasonal.png)

Let's visualize a single season:

```python
(
    era5_europe_cities_seasons["u_component_of_wind"]
    .sel(season="DJF")
    .xvec.to_geodataframe(geometry="geometry")
    .explore("u_component_of_wind")
)
```

![explore](/posts/vector-data-cubes/explore.png)

## Wrap up

Vector data cubes offer a natural way to manipulate and analyze n-dimensional data indexed along geometric dimensions, particularly with respect to spatial analytics. We look forward to seeing how the scientific community leverages vector data cubes to produce novel analytical workflows.

A few rough edges, such as plotting, remain around interoperability between Xarray vector data cubes and existing Xarray methods. Stay tuned for more updates to vector data cubes in Xarray, and check out the Xvec repository if you’re interested in getting involved.

Implementing vector data cubes is the result of hard work and development across the open-source community by a number of individuals and groups working on a range of packages. It’s exciting to see collaborative efforts in the open-source community that lead to significant breakthroughs and improvements to user experience.

## Acknowledgments

- Many groups and individuals worked to make vector data cubes possible, the following individuals deserve special recognition for their efforts in coordinating and executing this project: Martin Fleischmann, Benoit Bovy, Mohammad Alasawedah.
- WeatherBench2 for analysis-ready ERA5 data
- HuggingFace datasets for global cities dataset

## References

> The R programming language also has strong support for vector data cubes, which inspired much of this work. For information about vector data cube software in R, check out the stars package, and for a very detailed background on vector data cubes, check out this post by Edzer Pebesma, a stars developer.

- Vector Data Cubes, Pebesma (2022)
- R-spatial vector data cube example
- CF documentation on CF Geometries
- Relevant packages: Xvec, Zarr, Xarray, CF_Xarray, GeoPandas, Shapely
