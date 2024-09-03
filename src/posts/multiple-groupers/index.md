---
title: 'Grouping by multiple arrays with Xarray'
date: '2024-09-02'
authors:
  - name: Deepak Cherian
    github: dcherian

summary: 'Xarray finally supports grouping by multiple arrays.'
---

## TLDR

Xarray now supports grouping by multiple variables ([docs](https://docs.xarray.dev/en/latest/user-guide/groupby.html#grouping-by-multiple-variables)). 🎉 😱 🤯 🥳. Try it out!

## How do I use it?

Install `xarray>=2024.09.0` and optionally [flox](https://flox.readthedocs.io/en/latest/) for better performance with reductions.

## Simple example

Simple grouping by multiple categorical variables is easy:

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

gb = da.groupby(["labels1", "labels2"])
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

<RawHTML filePath='/posts/multiple-groupers/repr1.html' />

So does `map`:

```python
gb.map(lambda x: x[0])
```

<RawHTML filePath='/posts/multiple-groupers/repr3.html' />

## Multiple Grouper types

The above syntax `da.groupby(["labels1", "labels2"])` is a short cut for using [Grouper objects](https://docs.xarray.dev/en/latest/user-guide/groupby.html#grouping-by-multiple-variables).

```python
da.groupby(labels1=UniqueGrouper(), labels2=UniqueGrouper())
```

Grouper objects allow you to express more complicated GroupBy problems.
For example, combining different grouper types is allowed.
That is you can combine categorical grouping with [`UniqueGrouper`](https://docs.xarray.dev/en/latest/generated/xarray.groupers.UniqueGrouper.html#xarray.groupers.UniqueGrouper),
binning with [`BinGrouper`](https://docs.xarray.dev/en/latest/generated/xarray.groupers.BinGrouper.html#xarray.groupers.BinGrouper), and
resampling with [`TimeResampler`](https://docs.xarray.dev/en/latest/generated/xarray.groupers.TimeResampler.html#xarray.groupers.TimeResampler).

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

<RawHTML filePath='/posts/multiple-groupers/repr2.html' />
