---
title: 'Ergonomic seasonal grouping and resampling'
date: '2025-06-18'
authors:
  - name: Deepak Cherian
    github: dcherian
summary: 'Introducing new SeasonalGrouper and SeasonResampler objects'
---

## TLDR

Two new [Grouper](https://github.com/pydata/xarray/blob/main/design_notes/grouper_objects.md) objects - [`SeasonGrouper`](https://docs.xarray.dev/en/latest/generated/xarray.groupers.SeasonGrouper.html#xarray.groupers.SeasonGrouper) and [`SeasonResampler`](https://docs.xarray.dev/en/latest/generated/xarray.groupers.SeasonResampler.html#xarray.groupers.SeasonResampler) - enable ergonomic seasonal aggregations of Xarray objects. See the [docs](https://docs.xarray.dev/en/latest/user-guide/time-series.html#handling-seasons) for more.

## The Problem

Xarray has supported seasonal grouping using `ds.groupby("time.season")` for a very long time.
Seasonal resampling has been supported using [pandas syntax](https://pandas.pydata.org/pandas-docs/stable/user_guide/timeseries.html#resampling) `ds.resample(time="QS-Dec")`.

These approaches have significant limitations

1. Custom season definitions are not possible. This is a very common user request ([1](https://github.com/pydata/xarray/discussions/6180), [2](https://github.com/pydata/xarray/discussions/5134), [3](https://github.com/pydata/xarray/discussions/6865), [4](https://stackoverflow.com/questions/68455725/how-to-enable-season-selection-as-jjas-instead-of-jja-in-xarray), [5](https://stackoverflow.com/questions/69021082/december-january-seasonal-mean)).
   - The `"time.season"` 'virtual variable' (or `time.dt.season`) hardcodes the Northern Hemisphere-centric three-month season definitions namely `["DJF", "MAM", "JJA", "SON"]`.
   - The pandas resampling syntax is more powerful but is still limited to three month seasons, even though the start date can be changed (e.g. `QS-Aug` means 'quarters starting in August').
   - A common annoyance with `groupby('time.season')` is that seasons come out in alphabetical (nonsensical) order — `["DJF", "JJA", "MAM", "SON"]` — a consequence of this really being a 'categorical' reduction under the hood.
2. Seasons spanning the end of the year (e.g DJF) need to be handled specially, in many cases we want to ignore any months in incompletely sampled seasons. As an example, for a time series beginning in Jan-2001 we'd prefer the DJF season beginning in Dec-2000 to be ignored.
3. Overlapping seasons are a common request: `["DJFM", "MAMJ", "JJAS", "SOND"]`.

## The Solution

Our new Grouper objects - [`SeasonGrouper`](https://docs.xarray.dev/en/latest/generated/xarray.groupers.SeasonGrouper.html#xarray.groupers.SeasonGrouper) and [`SeasonResampler`](https://docs.xarray.dev/en/latest/generated/xarray.groupers.SeasonResampler.html#xarray.groupers.SeasonResampler) - help solve nearly all the above problems.

## Examples

### Load data

Load in our classic example dataset:

````python
>>> import xarray as xr
>>> ds = xr.tutorial.open_dataset("air_temperature")
>>> ds
<xarray.Dataset> Size: 31MB
Dimensions:  (lat: 25, time: 2920, lon: 53)
Coordinates:
  * lat      (lat) float32 100B 75.0 72.5 70.0 67.5 65.0 ... 22.5 20.0 17.5 15.0
  * lon      (lon) float32 212B 200.0 202.5 205.0 207.5 ... 325.0 327.5 330.0
  * time     (time) datetime64[ns] 23kB 2013-01-01 ... 2014-12-31T18:00:00
Data variables:
    air      (time, lat, lon) float64 31MB ...```
Attributes: (5)
````

### SeasonGrouper

```python
>>> from xarray.groupers import SeasonGrouper
>>> ds.groupby(time=SeasonGrouper(["DJF", "MAM", "JJA", "SON"])).count()
<xarray.Dataset> Size: 43kB
Dimensions:  (season: 4, lat: 25, lon: 53)
Coordinates:
  * lat      (lat) float32 100B 75.0 72.5 70.0 67.5 65.0 ... 22.5 20.0 17.5 15.0
  * lon      (lon) float32 212B 200.0 202.5 205.0 207.5 ... 325.0 327.5 330.0
  * season   (season) object 32B 'DJF' 'MAM' 'JJA' 'SON'
Data variables:
    air      (season, lat, lon) int64 42kB 720 720 720 720 ... 728 728 728 728
```

Overlapping seasons are supported:

```
>>> ds.groupby(time=SeasonGrouper(["DJFM", "MAMJ", "JJAS", "SOND"])).count()
<xarray.Dataset> Size: 43kB
Dimensions:  (lat: 25, lon: 53, season: 4)
Coordinates:
  * lat      (lat) float32 100B 75.0 72.5 70.0 67.5 65.0 ... 22.5 20.0 17.5 15.0
  * lon      (lon) float32 212B 200.0 202.5 205.0 207.5 ... 325.0 327.5 330.0
  * season   (season) object 32B 'DJFM' 'MAMJ' 'JJAS' 'SOND'
Data variables:
    air      (lat, lon, season) int64 42kB 968 976 976 976 ... 968 976 976 976
Attributes: (5)
```

### SeasonResampler

```python
>>> from xarray.groupers import SeasonResampler
>>> ds.groupby(time=SeasonResampler(["DJF", "MAM", "JJA", "SON"], drop_incomplete=True)).count()
<xarray.Dataset> Size: 75kB
Dimensions:  (time: 7, lat: 25, lon: 53)
Coordinates:
  * lat      (lat) float32 100B 75.0 72.5 70.0 67.5 65.0 ... 22.5 20.0 17.5 15.0
  * lon      (lon) float32 212B 200.0 202.5 205.0 207.5 ... 325.0 327.5 330.0
  * time     (time) datetime64[ns] 56B 2013-03-01 2013-06-01 ... 2014-09-01
Data variables:
    air      (time, lat, lon) int64 74kB 368 368 368 368 368 ... 364 364 364 364
Attributes: (5)
```

Note that the first month starts in `2013-03-01`!
The incomplete DJF season starting in Dec-2012 is ignored (this datasset begins in Jan 2013).
To avoid this behaviour pass `drop_incomplete=False`

```python
>>> ds.groupby(time=SeasonResampler(["DJF", "MAM", "JJA", "SON"], drop_incomplete=False)).count()
<xarray.Dataset> Size: 96kB
Dimensions:  (time: 9, lat: 25, lon: 53)
Coordinates:
  * lat      (lat) float32 100B 75.0 72.5 70.0 67.5 65.0 ... 22.5 20.0 17.5 15.0
  * lon      (lon) float32 212B 200.0 202.5 205.0 207.5 ... 325.0 327.5 330.0
  * time     (time) datetime64[ns] 72B 2012-12-01 2013-03-01 ... 2014-12-01
Data variables:
    air      (time, lat, lon) int64 95kB 236 236 236 236 236 ... 124 124 124 124
Attributes: (5)
```

This result starts in `Jan-2013`!

Seasons need not be of the same length:

```python
>>> ds.groupby(time=SeasonResampler(["JF", "MAM", "JJAS", "OND"])).count()
<xarray.Dataset> Size: 85kB
Dimensions:  (time: 8, lat: 25, lon: 53)
Coordinates:
  * lat      (lat) float32 100B 75.0 72.5 70.0 67.5 65.0 ... 22.5 20.0 17.5 15.0
  * lon      (lon) float32 212B 200.0 202.5 205.0 207.5 ... 325.0 327.5 330.0
  * time     (time) datetime64[ns] 64B 2013-01-01 2013-03-01 ... 2014-10-01
Data variables:
    air      (time, lat, lon) int64 85kB 236 236 236 236 236 ... 368 368 368 368
Attributes: (5)
```

### Multiple groupers

These new Grouper objects compose well with grouping over other arrays ([see blog post](https://xarray.dev/blog/multiple-groupers/)), for example

```
>>> from xarray.groupers import BinGrouper
>>>
>>> ds.groupby(lat=BinGrouper(bins=2), time=SeasonResampler(["JF", "MAM", "JJAS", "OND"])).count()
<xarray.Dataset> Size: 7kB
Dimensions:   (lon: 53, lat_bins: 2, time: 8)
Coordinates:
  * lon       (lon) float32 212B 200.0 202.5 205.0 207.5 ... 325.0 327.5 330.0
  * lat_bins  (lat_bins) interval[float64, right] 32B (14.94, 45.0] (45.0, 75.0]
  * time      (time) datetime64[ns] 64B 2013-01-01 2013-03-01 ... 2014-10-01
Data variables:
    air       (lon, lat_bins, time) int64 7kB 3068 4784 6344 ... 4416 5856 4416
Attributes: (5)
```

## How does this work?

Xarray's GroupBy API implements the split-apply-combine pattern (Wickham, 2011) which applies to a very large number of problems: histogramming, compositing, climatological averaging, resampling to a different time frequency, etc.
The first step in doing so is converting group labels of arbitrary type to integer codes — ["factorization"](https://pandas.pydata.org/pandas-docs/stable/user_guide/reshaping.html#reshaping-factorize).
[Grouper objects](https://github.com/pydata/xarray/blob/main/design_notes/grouper_objects.md) provide an extension point that allow users and downstream libraries to plug in custom factorization strategies.
Here we do exactly that to handle the complexities of seasonal grouping ([example](https://github.com/pydata/xarray/blob/34efef2192a65e0f26a340ae305b0d3ed9e91b19/xarray/groupers.py#L764)).
Given the user's definition of seasons, we construct the appropriate array of integer codes and run the aggregation as usual.

## Limitations

1. `SeasonGrouper` does not support the `drop_incomplete` option yet. This would be a great contribution.
2. `SeasonResampler` does not support overlapping seasons. This seems much harder to solve.

## Summary

Two new [Grouper](https://github.com/pydata/xarray/blob/main/design_notes/grouper_objects.md) objects - [`SeasonGrouper`](https://docs.xarray.dev/en/latest/generated/xarray.groupers.SeasonGrouper.html#xarray.groupers.SeasonGrouper) and [`SeasonResampler`](https://docs.xarray.dev/en/latest/generated/xarray.groupers.SeasonResampler.html#xarray.groupers.SeasonResampler) - enable ergonomic seasonal aggregations with Xarray.
The Grouper API is not public yet, but (hopefully) will be soon.
If you have a use-case for domain-specific Grouper objects, please [open an issue](https://github.com/pydata/xarray/issues/new/choose)!

## Acknowledgments

Many thanks to [Thomas Vo](http://tomvo.me/career) and [Olivier Marti](https://www.lsce.ipsl.fr/en/pisp/olivier-marti/) for contributing any tests, and testing out the pull request.
Thanks also to [Martin Yeo ](https://trexfeathers.github.io) for contributing a very clever [idea](https://github.com/pydata/xarray/discussions/6180#discussioncomment-9141495) on how to do grouping by overlapping seasons.
