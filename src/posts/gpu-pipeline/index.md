---
title: 'Accelerating AI/ML Workflows in Earth Sciences with GPU-Native Xarray and Zarr (and more!)'
date: '2025-05-01'

authors:
  - name: Negin Sobhani
    github: negin513
  - name: Wei Ji Leong
    github: weiji14
  - name: Max Jones
    github: maxjones
  - name: Akshay Subranian
    github: akshaysubr
  - name: Thomas Augspurger
    github: tomaugspurger
  - name: Katelyn Fitzgerald
    github: kafitzgerald

summary: 'How to accelerate AI/ML workflows in Earth Sciences with GPU-native Xarray and Zarr.'
---

# Accelerating AI/ML Workflows in Earth Sciences with GPU-Native Xarray and Zarr (and more!)

## Introduction

In large-scale geospatial AI and machine learning workflows, data loading is often the main bottleneck. Traditional pipelines rely on CPUs to preprocess and transfer massive datasets from storage to GPU memory, consuming resources and limiting scalability and effective use of GPU resources.

To tackle this issue, a team from the [National Center for Atmospheric Research (NSF-NCAR)](https://ncar.ucar.edu) and [Development Seed](https://developmentseed.org) with mentors from [NVIDIA](https://www.nvidia.com) participated in a GPU hackathon to demonstrate how AI/ML workflows in Earth system sciences can benefit from GPU-native workflows using tools such as [Zarr](https://zarr.readthedocs.io/), [KvikIO](https://docs.rapids.ai/api/kvikio/stable/), and [DALI](https://developer.nvidia.com/dali).

In this post, we share our hackathon experience, the integration strategies we explored, and the performance gains we achieved to highlight how modern tools can transform data-intensive workflows.

## Problem

Machine learning pipelines typically involve:

- Reading data from disk or object storage.
- Transforming / preprocessing data (often CPU-bound).
- Feeding the data into GPUs for training or inference.

Although GPU compute is incredibly fast, the CPU can become a bottleneck when dealing with large datasets.

In this hackathon, we tried looking at different ways of reducing this bottleneck.

### Data & Code Overview

For this hackathon, we developed a benchmark of training a U-NET (with ResNet backend) model on the ERA-5 Dataset to predict next time steps. The U-Net model is implemented in PyTorch and the training pipeline is built using PyTorch DataLoader. The model can be trained on a single GPU or multiple GPUs using Distributed Data Parallel (DDP) for parallelization.

-- TODO : Add an example image.

The basic data loader is implemented in `zarr_ML_optimization/train_unet.py` and the model is defined in `zarr_ML_optimization/model.py`. The training pipeline is designed to be flexible and can be easily adapted to different datasets and models.

More details on the model and training pipeline can be found in the [README](https://github.com/pangeo-data/ncar-hackathon-xarray-on-gpus/blob/main/zarr_ML_optimization/README.md) file in the `zarr_ML_optimization` folder.

### Performance Bottlenecks

First, we needed to identify the performance bottlenecks in our pipeline. We used NVIDIA's [Nsight Systems](https://developer.nvidia.com/nsight-systems) to profile our code and identify the areas that needed optimization.

Here are some screenshots of the profiling results:

- ![profiling_screenshot1](posts/gpu-pipline/profiling_screenshot1.png)
- ![profiling_screenshot2](posts/gpu-pipline/profiling_screenshot2.png)

The profiling results clearly showed that the data loading step was the main bottleneck in our pipeline. Additionally, we noticed the alternating CPU and GPU compute steps (i.e. data loading and model training) were not overlapping, which meant that the GPU was often idle while waiting for the CPU to load data (fist screenshot above).


This was also confirmed by a few other tests to measure the time spent on data loading and model training. The results are shown below:

![baseline plot](baseline.png)

In the plot above, we show the throughput of the data loading and training steps in our pipeline. The three bars represent:

- Real Data: Baseline throughput of the end-to-end pipeline using real data.
- No Training (i.e. data loading throughput): Throughput of the data loading without any training (to measure the time spent on data loading vs. training).
- Synthetic Data (i.e. Training throughput): Throughput of the data loading using synthetic data (to remove the data loading bottleneck).

The results show that the data loading step is the main bottleneck in our pipeline, with **much** lower throughput compared to the training step.

## Hackathon: Putting this altogether

Our initial profiling showed that data loading is a major bottleneck in this workflow.

During the hackathon, we tested the following strategies to improve the data loading performance:

1. Optimized Chunking & Compression
   - We explored different chunking and compression strategies to optimize the data loading performance. We found that using Zarr v3 with optimized chunking and compression significantly improved the data loading performance.
2. GPU native data loading with Zarr V3 and KvikIO
3. Using `nvcomp` for decompression on GPUs
4. NVIDIA DALI: We explored integrating NVIDIA's Data Loading Library (DALI) into Xarray to facilitate efficient data loading and preprocessing directly on the GPU. DALI provides highly optimized building blocks and an execution engine for data processing, accelerating deep learning applications.

### Step 1: Optimized chunking :card_file_box:

The ERA-5 dataset we were using had a sub-optimal chunking scheme of `{'time': 10, 'channel': C, 'height': H, 'width': W}`, which meant that a minimum of 10 timesteps of data was being read even if we only needed 2 consecutive timesteps at a time.
We decided to rechunk the data to align with our access pattern of 1-timestep at a time, while reformating to Zarr v3.
The full script is available [here](https://github.com/pangeo-data/ncar-hackathon-xarray-on-gpus/blob/main/rechunk/era5_rechunking.ipynb), with the main code looking like so:

```python
import xarray as xr

ds: xr.Dataset = xr.open_mfdataset("ERA5.zarr")
# Rechunk the data
ds = ds.chunk({"time": 1, "level": 1, "latitude": 640, "longitude": 1280})
# Save to Zarr v3
ds.to_zarr("rechunked_ERA5.zarr", zarr_version=3)
```

For more optimal performance, consider:

1. Storing the data without compression (if not transferring over a network), as decompressing data can slow down read speeds. But see also GPU decompression with nvCOMP below. :wink:
2. Concatenating several data variables together **if** a single chunk size is too small (<1MB), at the expense of reducing readability of the Zarr store. Having too many small chunks can be detrimental to read speeds. A compressed chunk should be >1MB, <10MB (??TODO verify) for optimal reads.
   - Alternatively, wait for [sharding](https://zarr.readthedocs.io/en/stable/user-guide/performance.html#sharding) to be supported for GPU buffers in zarr-python?

The plot below shows the read performance of the original dataset vs. the rechunked dataset (to optimal chunk size) vs. uncompressed zarr v3 dataset.

TODO: ADD plot here.

### Step 2: Reading with zarr-python v3 + kvikIO :open_book:

The advent of [Zarr v3](https://zarr.dev/blog/zarr-python-3-release/) bought many improvements, including the ability to [read from Zarr stores to CuPy arrays (i.e. GPU memory)](https://github.com/zarr-developers/zarr-python/issues/2574).

Specifically, you can use the [`zarr-python`](https://github.com/zarr-developers/zarr-python) driver to read data from zarr->CPU->GPU, or the [`kvikio`](https://github.com/rapidsai/kvikio) driver to read data from zarr->GPU directly!

To benefit from these new features, we recommend installing:

- [`zarr>=3.0.3`](https://github.com/zarr-developers/zarr-python/releases/tag/v3.0.3)
- [`xarray>=2025.03.00`](https://github.com/pydata/xarray/releases/tag/v2025.03.0)
- [`kvikio>=25.04.00`](https://github.com/rapidsai/kvikio/releases/tag/v25.04.00)

Reading to GPU can be enabled by using the [`zarr.config.enable_gpu()`](https://zarr.readthedocs.io/en/v3.0.6/user-guide/gpu.html) setting like so:

```python
import cupy as cp
import xarray as xr
import zarr

airt = xr.tutorial.open_dataset("air_temperature", engine="netcdf4")
airt.to_zarr(store="/tmp/air-temp.zarr", mode="w", zarr_format=3, consolidated=False)

with zarr.config.enable_gpu():
    ds = xr.open_dataset("/tmp/air-temp.zarr", engine="zarr", consolidated=False)
    assert isinstance(ds.air.data, cp.ndarray)
```

Note that using `engine="zarr"` like above would still result in data being loaded into CPU memory before it goes to GPU memory.
If you prefer to bypass CPU memory, and have GPU Direct Storage (GDS) enabled, you can use the `kvikio` driver like so:

```python
import kvikio.zarr

with zarr.config.enable_gpu():
    store = kvikio.zarr.GDSStore(root="/tmp/air-temp.zarr")
    ds = xr.open_dataset(filename_or_obj=store, engine="zarr")
    assert isinstance(ds.air.data, cp.ndarray)
```

This will read the data directly from the Zarr store to GPU memory, bypassing CPU memory altogether. This is especially useful for large datasets, as it reduces the amount of data that needs to be transferred between CPU and GPU memory.

[ TODO: add a figure showing this -- technically decompression is still done on CPU. ]

(TODO ongoing work) Eventually with this [cupy-xarray Pull Request merged](https://github.com/xarray-contrib/cupy-xarray/pull/70) (based on earlier work at https://xarray.dev/blog/xarray-kvikio), this can be simplified to:

```python
import cupy_xarray

ds = xr.open_dataset(filename_or_obj="/tmp/air-temp.zarr", engine="kvikio")
assert isinstance(ds.air.data, cp.ndarray)
```

How do these two methods, zarr (CPU) and kvikio (GPU), compare?

(TODO put in benchmark numbers here).

For kvikio performance improvements, you need GPU Direct Storage (GDS) enabled on your system. This is a feature that allows the GPU to access data directly from storage, bypassing the CPU and reducing latency. GDS is supported on NVIDIA GPUs with the [GPUDirect Storage](https://docs.nvidia.com/datacenter/pgp/gds/index.html) feature.

### Step 3: GPU-based decompression with nvCOMP :rocket:

For a fully GPU-native workflow, we can let the GPU do all of the work!
This includes reading the compressed data, decompression (using nvCOMP), any augmentation steps, to the ML model training.

![image](https://hackmd.io/_uploads/rJtz66YCyl.png)

Sending compressed instead of uncompressed data to the GPU means less data transfer overall, reducing I/O latency from storage to device.
To unlock this, we would need zarr-python to support GPU-based decompression codecs, with one for Zstandard (Zstd) currently being implemented at https://github.com/zarr-developers/zarr-python/pull/2863.

![image](https://hackmd.io/_uploads/H1kJkk9Akx.png)

Figure above shows benchmark comparing CPU vs GPU-based decompression, with or without GDS enabled.

Keep an eye on this space!

### Step 4: Overlapping CPU and GPU compute with NVIDIA DALI :twisted_rightwards_arrows:

Ideally, we want to minimize pauses where the device (GPU) is waiting for the host (CPU) or vice versa. This is one of the reasons we went with [NVIDIA DALI](https://docs.nvidia.com/deeplearning/dali/user-guide/docs/index.html) that enables overlapping CPU and GPU computation.

Our full codebase is available at https://github.com/pangeo-data/ncar-hackathon-xarray-on-gpus for reference.
To start, there is a [zarr_DALI](https://github.com/pangeo-data/ncar-hackathon-xarray-on-gpus/tree/main/zarr_DALI) folder with short, contained examples of a DALI pipeline loading from Zarr.

Next, look at the [zarr_ML_optimization](https://github.com/pangeo-data/ncar-hackathon-xarray-on-gpus/tree/main/zarr_ML_optimization) folder that contains an end-to-end example on how this DALI pipeline can be integrated into a Pytorch Dataloader and full training workflow.

![image](https://hackmd.io/_uploads/H1YVp6tR1l.png)

(TODO insert better nsight profiling figure than above showing overlapping CPU and GPU compute)

## Going Forward

This work is still ongoing, and we are continuing to explore ways to optimize data loading and processing for large-scale geospatial AI/ML workflows. We started this work during a 3-day hackathon, and we are excited to continue this work in the future. During the hackathon, we were able to make significant progress in optimizing data loading and processing for large-scale geospatial AI/ML workflows.

We are continuing to explore the following areas:

- GPU Direct Storage (GDS) for optimal performance
- NVIDIA DALI
- Work out how to use GDS when reading from cloud object store instead of on-prem disk.
- etc

## Lessons Learned

- Chunking matters! It really does.
- Consider using GPU Direct Storage (GDS) for optimal performance, but be aware of the setup and configuration required.
- GPU Direct Storage (GDS) can be an improvement for data-intensive workflows, but requires some setup and configuration.
- NVIDIA DALI is a powerful tool for optimizing data loading, but requires some effort to integrate into existing workflows.
- GPU-based decompression is a promising area for future work, but requires further development and testing.

## Acknowledgements

This work was developed during the [NCAR/NOAA Open Hackathon](https://www.openhackathons.org/s/siteevent/a0CUP00000rwYYZ2A2/se000355) in Golden, Colorado from 18-27 February 2025. We would like to thank the OpenACC Hackathon for the opportunity to participate and learn from this experience.
