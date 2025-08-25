---
title: 'Flexible Indexes: Exciting new ways to slice and dice your data!'
date: '2025-08-11'
authors:
  - name: Benoît Bovy
    github: benbovy
  - name: Scott Henderson
    github: scottyhq
  - name: Deepak Cherian
    github: dcherian
  - name: Justus Magin
    github: keewis
summary: 'An introduction to customizable coordinate-based data selection and alignment for more efficient handling of both traditional and more exotic data structures'
---

**TL;DR**: xarray>=2025.6 has been through a major refactoring of its internals that makes coordinate-based data selection and alignment customizable, enabling more efficient handling of both traditional and more exotic data structures. In this post we highlight a few examples that take advantage of this new superpower!

<figure>
  <img src='/posts/flexible-indexing/summary-slide.png' />
  <figcaption>
    *Summary schematic from our [2025 SciPy
    Presentation](https://www.youtube.com/watch?v=I-NHCuLhRjY) highlighting new
    custom Indexes and usecases. [Link to full slide
    deck](https://docs.google.com/presentation/d/1sQU2N0-ThNZM8TUhsZy-kT0bZnu0H5X0FRJz2eKwEpA/edit?slide=id.g37373ba88e6_0_214#slide=id.g37373ba88e6_0_214)*
  </figcaption>
</figure>

## Indexing basics

First thing's first, _what is an `index` and why is it helpful?_

> In brief, an _index_ makes selection of subsets of data more efficient. Xarray Indexes connect coordinate labels to associated data values and encode important contextual information about the coordinate space.

Examples of indexes are all around you and are a fundamental way to organize and simplify access to information.
In the United States, if you want a book about Natural Sciences, you can go to your local library branch and head straight to section 500. Or if you're in the mood for a classic novel go to section 800. Connecting thematic labels with numbers (`{'Natural Sciences': 500, 'Literature': 800}`) is a classic indexing system that's been around for hundreds of years [(Dewey Decimal System, 1876)](https://en.wikipedia.org/wiki/Dewey_Decimal_Classification).
The need for an index becomes critical as the size of data grows - just imagine the time it would take to find a specific novel amongst a million uncategorized books!

The same efficiencies arise in computing. Consider a simple 1D dataset consisting of measurements `Y=[10,20,30,40,50,60]` at six coordinate positions `X=[1, 2, 4, 8, 16, 32]`. _What was our measurement at `X=8`?_
To answer this in code, we need an index that is simply a _key:value_ mapping or "hash table" between the coordinate values and integer positions `i=[0,1,2,3,4,5]` in the coordinates array.
With only 6 coordinates, we easily see `X[3]=8` so our measurement of interest is `Y[3]=40`.

> 💡 **Note:** for large datasets we should loop over _all_ the coordinates to ensure there are no repeated values! This initial pass over all the coordinates to build an index may take significant time and may not always be desirable.

## pandas.Index

Xarray's [label-based selection](https://docs.xarray.dev/en/latest/user-guide/indexing.html#indexing-with-dimension-names) allows a more expressive and simple syntax in which you don't have to think about the index (`da.sel(x=8) = 40`). Up until now, Xarray has relied exclusively on [pandas.Index](https://pandas.pydata.org/docs/user_guide/indexing.html), which is still used by default:

```python
x = np.array([1, 2, 4, 8, 16, 32])
y = np.array([10, 20, 30, 40, 50, 60])
da = xr.DataArray(y, coords={'x': x})
da
```

<RawHTML filePath='/posts/flexible-indexing/da-pandas-repr.html' />

```python
da.sel(x=8)
# 40
```

## Alternatives to pandas.Index

Importantly, a loop over all the coordinate values is not the only way to create an index.
You might recognize that our coordinates can in fact be represented by a function `X(i)=2**i` where `i` is the integer position! Given that function we can quickly get measurement values at any position: `Y(X=8)` = `Y[log2(8)]` = `Y[3]=40`. Xarray now has a [CoordinateTransformIndex](https://xarray-indexes.readthedocs.io/blocks/transform.html) to handle this type of on-demand lookup of coordinate positions!

### xarray RangeIndex

A simple special case of `CoordinateTransformIndex` is a `RangeIndex` where coordinates can be defined by a start, stop, and uniform step size. _`pandas.RangeIndex` only supports integers_, whereas Xarray handles floating-point values. Coordinate look-up is performed on-the-fly rather than loading all values into memory up-front when creating a Dataset, which is critical for the example below that has a coordinate array of 7TB!

```python
from xarray.indexes import RangeIndex

index = RangeIndex.arange(0.0, 1000.0, 1e-9, dim='x') # 7TB coordinate array!
ds = xr.Dataset(coords=xr.Coordinates.from_xindex(index))
ds
```

<RawHTML filePath='/posts/flexible-indexing/ds-range-repr.html' />

Selection preserves the RangeIndex and does not require loading all the coordinates into memory.

```
sliced = ds.isel(x=slice(1_000, 50_000, 100))
sliced.x
```

<RawHTML filePath='/posts/flexible-indexing/ds-range-slice-repr.html' />

## Third-party custom Indexes

In addition to a few new built-in indexes, `xarray.Index` provides an API that allows dealing with coordinate data and metadata in a highly customizable way for the most common Xarray operations such as `sel`, `align`, `concat`, `stack`. This is a powerful extension mechanism that is very important for supporting a multitude of domain-specific data structures.

### rasterix RasterIndex

Earlier we mentioned that coordinates often have a _functional representation_.
For 2D raster images, this function often takes the form of an [Affine Transform](https://en.wikipedia.org/wiki/Affine_transformation).
The [rasterix](https://github.com/xarray-contrib/rasterix) library extends Xarray with a `RasterIndex` which computes coordinates for geospatial images such as GeoTiffs via Affine Transform.

Below is a simple example of slicing a large mosaic of GeoTiffs without ever loading the coordinates into memory, note that a new Affine is defined after the slicing operation:

```python
# 811816322401 values!
import rasterix

#26475 GeoTiffs represented by a GDAL VRT
da = xr.open_dataarray('https://opentopography.s3.sdsc.edu/raster/COP30/COP30_hh.vrt',
                       engine='rasterio',
                       parse_coordinates=False).squeeze().pipe(
    rasterix.assign_index
)
da
```

<RawHTML filePath='/posts/flexible-indexing/da-rasterix-repr.html' />

```python
print('Original geotransform:\n', da.xindexes['x'].transform())
da_sliced = da.sel(x=slice(-122.4, -120.0), y=slice(-47.1,-49.0))
print('Sliced geotransform:\n', da_sliced.xindexes['x'].transform())
```

```
Original geotransform:
 | 0.00, 0.00,-180.00|
| 0.00,-0.00, 84.00|
| 0.00, 0.00, 1.00|

Sliced geotransform:
 | 0.00, 0.00,-122.40|
| 0.00,-0.00,-47.10|
| 0.00, 0.00, 1.00|
```

### XProj CRSIndex

> real-world datasets are usually more than just raw numbers; they have labels which encode information about how the array values map to locations in space, time, etc. [Xarray Docs](https://docs.xarray.dev/en/stable/getting-started-guide/why-xarray.html#what-labels-enable)

We often think about metadata providing context for _measurement values_ but metadata is also critical for coordinates!
In particular, to align two different datasets we must ask if the coordinates are in the same coordinate system.
In other words, do they share the same origin and scale?

There are currently over 7000 commonly used [Coordinate Reference Systems (CRS)](https://spatialreference.org/ref/epsg/) for geospatial data in the authoritative EPSG database!
And of course an infinite number of custom-defined CRSs.
[xproj.CRSIndex](https://xproj.readthedocs.io/en/latest/) gives Xarray objects an automatic awareness of the coordinate reference system operations like `xr.align()`, which can raise an informative error when there is a CRS mismatch:

```python
from xproj import CRSIndex
lons1 = np.arange(-125, -120, 1)
lons2 = np.arange(-122, -118, 1)
ds1 = xr.Dataset(coords={'longitude': lons1}).proj.assign_crs(crs=4267)
ds2 = xr.Dataset(coords={'longitude': lons2}).proj.assign_crs(crs=4326)
ds1 + ds2
```

```pytb
MergeError: conflicting values/indexes on objects to be combined for coordinate 'crs'
```

### XVec GeometryIndex

A "vector data cube" is an n-D array that has at least one dimension indexed by a 2-D array of vector geometries.
Large vector cubes can take advantage of an [R-tree spatial index](https://en.wikipedia.org/wiki/R-tree) for efficiently selecting vector geometries within a given bounding box.
The `xvec.GeometryIndex` provides this functionality, below is a short code snippet but please refer to the [documentation for more](https://xvec.readthedocs.io/en/stable/indexing.html)!

```python
import xvec
import geopandas as gpd
from geodatasets import get_path

# Dataset that contains demographic data indexed by U.S. counties
counties = gpd.read_file(get_path("geoda.natregimes"))

cube = xr.Dataset(
    data_vars=dict(
        population=(["county", "year"], counties[["PO60", "PO70", "PO80", "PO90"]]),
        unemployment=(["county", "year"], counties[["UE60", "UE70", "UE80", "UE90"]]),
    ),
    coords=dict(county=counties.geometry, year=[1960, 1970, 1980, 1990]),
).xvec.set_geom_indexes("county", crs=counties.crs)
cube
```

<RawHTML filePath='/posts/flexible-indexing/xvec-repr.html' />

```python
# Efficient selection using shapely.STRtree
from shapely.geometry import box

subset = cube.xvec.query(
    "county",
    box(-125.4, 40, -120.0, 50),
    predicate="intersects",
)

subset['population'].xvec.plot(col='year');
```

<p align='center'>
  <img src='/posts/flexible-indexing/xvecfig.png' />
</p>

### Even more examples!

Be sure to check out the [Gallery of Custom Index Examples](https://xarray-indexes.readthedocs.io) for more detailed examples of all the indexes mentioned in this post and more!

## What's next?

While we're extremely excited about what can _already_ be accomplished with the new indexing capabilities, there are plenty of exciting ideas for future work.

Have an idea for your own custom index? Check out [this section of the Xarray documentation](https://docs.xarray.dev/en/stable/internals/how-to-create-custom-index.html).

## Acknowledgments

This work would not have been possible without technical input from the Xarray core team and community!
Several developers received essential funding from a [CZI Essential Open Source Software for Science (EOSS) grant](https://xarray.dev/blog/czi-eoss-grant-conclusion) as well as NASA's Open Source Tools, Frameworks, and Libraries (OSTFL) grant 80NSSC22K0345.
