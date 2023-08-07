---
title: 'Xarray indexes: unleash the power of coordinates'
date: '2023-08-07'
authors:
  - name: Benoît Bovy
    github: benbovy
summary: 'It is now possible to take full advantage of coordinate data via Xarray explicit and flexible indexes'
---

_TLDR: Xarray has been through a major refactoring of its internals that makes coordinate-based data selection and alignment (almost) fully customizable, via built-in and/or 3rd party indexes. It also addresses a good amount of long-standing issues with "dimension coordinates" implicitly backed by pandas (multi-)indexes._

## Introduction

[link to Joe's CZI blog post]

## The concept of "dimension coordinate" and its shortcomings

Some datasets could not be loaded with Xarray (dimension name and coordinate with same name but different dimensions)

Complicated workarounds (swap_dims, etc.)

Limited and/or challenging for data cubes representing arbitrary grids (curvilinear grids, unstructured meshes, etc.).

## Better index vs. coordinate separation

Refactor index logic in `Index` classes. More easily maintainable. May help Pandas become optional dependency in the future? (cf. Xarray-lite).

Also allowed to solve lots of issues with multi-indexes, for which each level has now its own real coordinate.

Dataset / DataArray section has now an "indexes" section.

## Selection using non-dimension, 1-d coordinates

Set an index for non-dimension coordinates! (No more swap_dims anymore or coordinate renaming)

```python
ds.set_xindex(“non_dim_coord”).sel(non_dim_coord=“something”)
```

## Alternatives to pandas.Index

E.g., Numpy index (much faster to build, much more expensive to query), Geometry index (xvec)

Out-of-core index, etc.

...or no index at all! (Create dataset with no default index, `drop_indexes`)

## Create custom indexes from arbitrary coordinates and dimensions

Not limited to 1-dimensional coordinates, even more flexible!

RasterIndex, FunctionalIndex, etc.

See xarray discussion for examples

## What’s next

Still unfinished [link: indexes next steps GH issue], extension entry points, etc.

## Acknowledgments

CZI, Xarray core developers, etc.
