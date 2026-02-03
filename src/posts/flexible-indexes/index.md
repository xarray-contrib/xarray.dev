---
title: 'Xarray indexes: unleash the power of coordinates'
date: '2025-06-05'
authors:
  - name: Benoît Bovy
    github: benbovy
  - name: Scott Henderson
    github: scottyhq
summary: 'It is now possible to take full advantage of coordinate data via Xarray explicit and flexible indexes'
---

_TLDR: Xarray has been through a major refactoring of its internals that makes coordinate-based data selection and alignment more customizable, via built-in and/or 3rd party indexes! In this post we highlight a few examples that take advantage of this new superpower_

## Introduction

Xarray is a large project that is constantly evolving to meet needs of users and stay relevant to work with novel data formats and use-cases. One area of improvement identified in the [Development Roadmap](https://docs.xarray.dev/en/stable/roadmap.html#flexible-indexes) is the ability add new coordinate indexing capabilities beyond the original `pandas.Index`. Let's look at a few examples to understand what is now possible!

TODO: Insert Benoit's awesome schematic from indexing sprint :)

## Alternatives to pandas.Index

Generally-useful index alternatives are already part of Xarray!

### RangeIndex

By default a `pandas.Index` calculates all coordinates and holds them in-memory. There are many use-cases where for 1-D coordinates where it's more efficient to store the start,stop,and step and calculate specific coordinate values on-the-fly. THis is what RangeIndex accomplishes:

```python
import xarray as xr
from xarray.indexes import RangeIndex

index = RangeIndex.arange(0.0, 100_000, 0.1, dim='x')
ds = xr.Dataset(coords=xr.Coordinates.from_xindex(index))
ds
```

<RawHTML filePath='/posts/flexible-indexes/rangeindex-repr.html' />

### IntervalIndex

TODO: Not sure if this one is ready to highlight(https://github.com/pydata/xarray/pull/10296)

## Third-party custom Indexes

### Xvec GeometryIndex

TODO: Highlight https://xvec.readthedocs.io/en/v0.2.0/generated/xvec.GeometryIndex.html

### RasterIndex

TODO: Highlight https://github.com/dcherian/rasterix

## What’s next

While we're extremely excited about what can _already_ be accomplished with the new indexing capabilities, there are plenty of exciting ideas for future work. If you're interested in getting involved we recommend following [this GitHub Issue](https://github.com/pydata/xarray/issues/6293)!

## Acknowledgments

This work would not have been possible without technical input from the Xarray core team and community!
Several developers received essential funding from a [CZI Essential Open Source Software for Science (EOSS) grant](https://xarray.dev/blog/czi-eoss-grant-conclusion) as well as NASA's Open Source Tools, Frameworks, and Libraries (OSTFL) grant 80NSSC22K0345.
