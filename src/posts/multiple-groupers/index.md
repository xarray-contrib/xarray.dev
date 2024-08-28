---
title: 'Grouping by multiple arrays with Xarray'
date: '2023-07-18'
authors:
  - name: Deepak Cherian
    github: dcherian

summary: 'Xarray finally supports grouping by multiple arrays.'
---

## TLDR

Xarray now supports grouping by multiple variables ([docs](https://docs.xarray.dev/en/latest/user-guide/groupby.html#grouping-by-multiple-variables)). 🎉 😱 🤯 🥳. Try it out!

## How do I use it?

Install `xarray>=2024.08.0` and optionally [flox](https://flox.readthedocs.io/en/latest/) for better performance with reductions.

## Simple example

Set up a multiple variable groupby using [Grouper objects](https://docs.xarray.dev/en/latest/user-guide/groupby.html#grouping-by-multiple-variables).

```python
import xarray as xr
from xarray.groupers import UniqueGrouper

da = xr.DataArray(
    np.array([1, 2, 3, 0, 2, np.nan]),
    dims="d",
    coords=dict(
        labels1=("d", np.array(["a", "b", "c", "c", "b", "a"])),
        labels2=("d", np.array(["x", "y", "z", "z", "y", "x"])),
    ),
)

gb = da.groupby(labels1=UniqueGrouper(), labels2=UniqueGrouper())
gb
```

```
<DataArrayGroupBy, grouped over 2 grouper(s), 9 groups in total:
	'labels1': 3 groups with labels 'a', 'b', 'c'
	'labels2': 3 groups with labels 'x', 'y', 'z'>
```

Reductions work as usual:

```python
gb.mean()
```

```
xarray.DataArray (labels1: 3, labels2: 3)> Size: 72B
array([[1. , nan, nan],
       [nan, 2. , nan],
       [nan, nan, 1.5]])
Coordinates:
  * labels1  (labels1) object 24B 'a' 'b' 'c'
  * labels2  (labels2) object 24B 'x' 'y' 'z'
```

So does `map`:

```python
gb.map(lambda x: x[0])
```

```
<xarray.DataArray (labels1: 3, labels2: 3)> Size: 72B
array([[ 1., nan, nan],
       [nan,  2., nan],
       [nan, nan,  3.]])
Coordinates:
  * labels1  (labels1) object 24B 'a' 'b' 'c'
  * labels2  (labels2) object 24B 'x' 'y' 'z'
```

## Multiple Groupers

Combining different grouper types is allowed, that is you can combine
categorical grouping with` UniqueGrouper`, binning with `BinGrouper`, and
resampling with `TimeResampler`.

```python
from xarray.groupers import BinGrouper

ds = xr.Dataset(
        {"foo": (("x", "y"), np.arange(12).reshape((4, 3)))},
        coords={"x": [10, 20, 30, 40], "letters": ("x", list("abba"))},
    )
gb = ds.groupby(x=BinGrouper(bins=[5, 15, 25]), letters=UniqueGrouper())
gb
```

```
<DatasetGroupBy, grouped over 2 grouper(s), 4 groups in total:
	'x_bins': 2 groups with labels (5,, 15], (15,, 25]
	'letters': 2 groups with labels 'a', 'b'>
```

Now reduce as usual

```python
gb.mean()
```

```
<xarray.DataArray 'foo' (x_bins: 2, letters: 2, y: 3)> Size: 96B
array([[[ 0.,  1.,  2.],
        [nan, nan, nan]],

       [[nan, nan, nan],
        [ 3.,  4.,  5.]]])
Coordinates:
  * x_bins   (x_bins) object 16B (5, 15] (15, 25]
  * letters  (letters) object 16B 'a' 'b'
Dimensions without coordinates: y
```
