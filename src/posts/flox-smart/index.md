---
title: flox: GroupBy, now with smarts!'
date: '2024-05-31'
authors:
  - name: Deepak Cherian
    github: dcherian

summary: 'flox adds heuristics for automatically choosing an appropriate strategy with dask arrays!'
---

## What is flox?

[`flox` implements](https://flox.readthedocs.io/) grouped reductions for chunked array types like cubed and dask using a tree reduction approach.
Tree reduction ([example](https://people.csail.mit.edu/xchen/gpu-programming/Lecture11-reduction.pdf)) are a parallel-friendly way of computing common reduction operations like `sum`, `mean` etc.
Without flox, Xarray shuffles or sorts the data to extract all values in a single group, and then runs the reduction group-by-group.
Depending on data layout ("chunking"), this shuffle can be quite expensive.
With flox installed, Xarray instead uses the parallel-friendly tree reduction approach for the same calculation.
In many cases, this is a massive improvement.
See our [previous blog post](https://xarray.dev/blog/flox) for more.

Two key realizations influenced the development of flox:
1. Array workloads frequently group by a relatively small in-memory array. Quite frequently those arrays have patterns to their values e.g. `"time.month"` is exactly periodic, `"time.dayofyear"` is approximately periodic (depending on calendar), `"time.year"` is commonly a monotonic increasing array.
2. An important difference between arrays and dataframes is that chunk sizes (or "partition sizes") for arrays can be quite small along the core-dimension of an operation.

These two properties are particularly relevant for climatology calculations --- a common Xarray workload.

## Tree reductions can be catastrophically bad

For a catastrophic example, consider `ds.groupby("time.year").mean()`, or the equivalent `ds.resample(time="Y").mean()` for a 100 year long dataset of monthly averages  with chunk size of **1** (or **4**) along the time dimension.
This is a fairly common format for climate model output. 
The small chunk size along time is offset by much larger chunk sizes along the other dimensions --- commonly horizontal space (`x, y` or `latitude, longitude`).

A naive tree reduction would accumulate all averaged values into a single output chunk of size 100. 
Depending on the chunking of the input dataset, this may overload the worker memory and fail catastrophically.
More importantly, there is a lot of wasteful communication --- computing on the last year of data is completely independent of computing on the first year of the data, and there is no reason the two values need to reside in the same output chunk.

## Avoiding catastrophe

Thus `flox` quickly grew two new modes of computing the groupby reduction:
First, `method="blockwise"` which applies the grouped-reduction in a blockwise fashion. 
This is great for `resample(time="Y").mean()` where we group by `"time.year"`, which is a monotonic increasing array.
With an appropriate (and usually quite cheap) rechunking, the problem is embarassingly parallel.
 
 Second, `method="cohorts"` which is a bit more subtle.
 Consider `groupby("time.month")` for the monthly mean dataset i.e. grouping by an exactly periodic array. 
 When the chunk size along the core dimension "time" is a divisor of the period; so either 1, 2, 3, 4, or 6 in this case; groups tend to occur in cohorts ("groups of groups").
 For example, with a chunk size of 4, monthly mean input data for Jan, Feb, Mar, and April ("one cohort") are *always* in the same chunk, and totally separate from any of the other months.
 This means that we can run the tree reduction for each cohort (three cohorts in total: `JFMA | MJJA | SOND`) independently and expose more parallelism.
 Doing so can significantly reduce compute times and in particular memory required for the computation.
 
 Importantly if there isn't much separation of groups into cohorts; example, the groups are randomly distributed, then we'd like the standard `method="map-reduce"` for low overhead.
 
## Choosing a strategy is hard, and hard to teach.

These strategies are great, but the downside is some sophistication is required to apply them.
Worse, they are hard to explain conceptually! I've tried! ([example 1](https://discourse.pangeo.io/t/optimizing-climatology-calculation-with-xarray-and-dask/2453/20?u=dcherian), [example 2](https://discourse.pangeo.io/t/understanding-optimal-zarr-chunking-scheme-for-a-climatology/2335)).
 
 What we need is to choose the appropriate strategy automatically.
 And guess what, `flox>=0.9` will now choose an appropriate method automatically!

## Problem statement
Fundamentally, we know:
 1. the data layout or chunking.
 2. the array we are grouping by, and can detect possible patterns in that array.
 
We want to find all sets of groups that occupy similar sets of chunks.
For groups `A,B,C,D` that occupy the following chunks (chunk 0 is the first chunk along the core-dimension or the axis of reduction)
```
A: [0, 1, 2]
B: [1, 2, 3]
D: [5, 6, 7, 8]
E: [8]
X: [0, 3]
```
We want to detect the cohorts `{A,B,X}` and `{C, D}` with the following chunks.
```
[A, B, X]: [0, 1, 2, 3]
[C, D]: [5, 6, 7, 8]
```
Importantly, we do *not* want to be dependent on detecting exact patterns, and prefer approximate solutions and heuristics.

## The solution
 
 After a fun exploration involving such fun ideas as [locality-sensitive hashing](http://ekzhu.com/datasketch/lshensemble.html), and [all-pair set similarity search](https://www.cse.unsw.edu.au/~lxue/WWW08.pdf), I settled on the following algorithm.
 
I use set *containment*, or a "normalized intersection", to determine the similarity the sets of chunks occupied by two different groups (`Q` and `X`).
```
C =  |Q ∩ X| / |Q|  ≤ 1
```
Unlike Jaccard similarity, *containment* [isn't skewed](http://ekzhu.com/datasketch/lshensemble.html) when one of the sets is much larger than the other.

The steps are as follows:
1. First determine which labels are present in each chunk. The distribution of labels across chunks
   is represented internally as a 2D boolean sparse array `S[chunks, labels]`. `S[i, j] = 1` when
   label `j` is present in chunk `i`.

1. Now we can quickly determine a number of special cases:
    1. Use `"blockwise"` when every group is contained to one block each.
    1. Use `"cohorts"` when every chunk only has a single group, but that group might extend across multiple chunks
    1. [and more](https://github.com/xarray-contrib/flox/blob/e6159a657c55fa4aeb31bcbcecb341a4849da9fe/flox/core.py#L408-L426)
  Here is an example:
   ![bitmask-patterns](/../diagrams/bitmask-patterns-perfect.png)

   - On the left, is a monthly grouping for a monthly time series with chunk size 4. There are 3 non-overlapping cohorts so
     `method="cohorts"` is perfect.
   - On the right, is a resampling problem of a daily time series with chunk size 10 to 5-daily frequency. Two 5-day periods
     are exactly contained in one chunk, so `method="blockwise"` is perfect.

1. At this point, we want to merge groups in to cohorts when they occupy *approximately* the same chunks. For each group `i` we can quickly compute containment against
   all other groups `j` as `C = S.T @ S / number_chunks_per_group`. Here is `C` for a range of chunk sizes from 1 to 12, for computing
   the monthly mean of a monthly time series problem, \[the title on each image is `(chunk size, sparsity)`\].

   ```python
   chunks = np.arange(1, 13)
   labels = np.tile(np.arange(1, 13), 30)
   ```

   ![cohorts-schematic](/../diagrams/containment.png)

1. To choose between `"map-reduce"` and `"cohorts"`, we need a summary measure of the degree to which the labels overlap with
   each other. We can use _sparsity_ --- the number of non-zero elements in `C` divided by the number of elements in `C`, `C.nnz/C.size`.
   We use sparsity(`S`) as an approximation for the sparsity(`C`) to avoid a potentially expensive sparse matrix dot product when `S`
   isn't particularly sparse. When sparsity(`S`) > 0.4 (arbitrary), we choose `"map-reduce"` since there is decent overlap between
   (any) cohorts. Otherwise we use `"cohorts"`.

Cool, isn't it?!

## What's next?

flox' ability to do cool inferences entirely relies on the input chunking, which is a major user-tunable knob.
Perfect optimization still requires some user-tuned chunking. 
Recent Xarray feature makes that a lot easier for time grouping:
```
from xarray.groupers import TimeResampler

rechunked = ds.chunk(time=TimeResampler("YE"))
```
will rechunk so that a year of data is in a single chunk.

Even so, it would be nice to automatically rechunk to minimize number of cohorts detected, or to a perfectly blockwise application.
A key limitation is that we have lost context.
The string `"time.month"` tells me that I am grouping a perfectly periodic array with period 12; similarly
the *string* `"time.dayofyear"` tells me that I am grouping by a (quasi-)_periodic array with period 365, and that group `366` may occur occasionally (depending on calendar).
This context is hard to infer from integer group labels `[1, 2, 3, 4, 5, ..., 1, 2, 3, 4, 5]`.

One way to preserve context may be to use Xarray's new Grouper objects, and let them report ["preferred chunks"](https://github.com/pydata/xarray/blob/main/design_notes/grouper_objects.md#the-preferred_chunks-method-) for a particular grouping.
This would allow a downstream system like `flox` or `dask-expr` to take this in to account later (or even earlier!) in the pipeline.
That is an experiment for another day.
