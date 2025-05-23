---
title: 'Accelerating AI/ML Workflows in Earth Sciences with GPU-Native Xarray and Zarr (and more!)'
date: '2025-05-01'

authors:
  - name: Negin Sobhani
    github: negin513
  - name: Wei Ji Leong
    github: weiji14
  - name: Max Jones
    github: maxrjones
  - name: Akshay Subranian
    github: akshaysubr
  - name: Thomas Augspurger
    github: tomaugspurger
  - name: Katelyn Fitzgerald
    github: kafitzgerald

summary: 'How to accelerate AI/ML workflows in Earth Sciences with GPU-native Xarray and Zarr.'
---

# Accelerating AI/ML Workflows in Earth Sciences with GPU-Native Xarray and Zarr (and more!)

## TL;DR

Earth science AI/ML workflows are often bottlenecked by slow data loading, leaving GPUs underutilized while CPUs struggle to feed large climate datasets like ERA5. In this blog post, we discuss how to build a GPU-native pipeline using Zarr v3, CuPy, KvikIO, and NVIDIA DALI to accelerate data throughput. We walk through profiling results, chunking strategies, direct-to-GPU data reads, and GPU-accelerated preprocessing, all aimed at maximizing GPU usage and minimizing I/O overhead.

The result: faster training, higher throughput, and a scalable path forward for geoscience ML workflows. 🌍🤖🚀

## Introduction

In large-scale geospatial AI and machine learning workflows, data loading is often the main bottleneck. Traditional pipelines rely on CPUs to preprocess and transfer massive datasets from storage to GPU memory, consuming resources and limiting scalability and effective use of GPU resources.

To tackle this issue, a team from the [National Center for Atmospheric Research (NSF-NCAR)](https://ncar.ucar.edu) and [Development Seed](https://developmentseed.org) with mentors from [NVIDIA](https://www.nvidia.com) participated in the [OpenHackathon](https://www.openhackathons.org/s/) to demonstrate how AI/ML workflows in Earth system sciences can benefit from GPU-native workflows using tools such as [Zarr](https://zarr.readthedocs.io/), [KvikIO](https://docs.rapids.ai/api/kvikio/stable/), and [DALI](https://developer.nvidia.com/dali).

In this post, we share our hackathon experience, the integration strategies we explored, and the performance gains we achieved to highlight how modern tools can transform data-intensive workflows.

## Problem

ML pipelines for large scientific datasets typically include steps:

- Reading raw data from disk or object storage (often CPU-bound)
- Transforming / preprocessing data (often CPU-bound)
- Model Training/Inference (often GPU-bound)

Although GPU compute is incredibly fast, the CPU can become a bottleneck when dealing with large datasets. In an ideal scenario, we want to saturate the GPU with data as quickly as possible to minimize idle time on both the CPU and GPU. 

In this hackathon, we explored several strategies to reduce the data loading bottleneck and build a GPU-native pipeline to maximize GPU utilization.


### Data & Code Overview 📊

For this hackathon, we developed a benchmark of training a U-NET (with ResNet encoder) model on the ERA-5 Dataset to predict next time steps. The training pipeline used a standard PyTorch DataLoader and supported both single-GPU and multi-GPU training via Distributed Data Parallel (DDP). The full repo is available [here](https://github.com/pangeo-data/ncar-hackathon-xarray-on-gpus). 


### Initial Performance Bottlenecks

First, we used NVIDIA's [Nsight Systems](https://developer.nvidia.com/nsight-systems) to profile our code and identify performance bottlenecks. 

The initial profiling results clearly showed that the data loading step was the main bottleneck in our pipeline,  with minimal overlap between CPU and GPU compute steps, which meant that the GPU was often idle while waiting for the CPU to load data.

Here are some screenshots of the profiling results:

<div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
  <img
    src='/posts/gpu-pipline/profiling_screenshot1.png'
    alt='Issue 1'
    style={{ width: '50%' }}
  />
  <img
    src='/posts/gpu-pipline/profiling_screenshot2.png'
    alt='Issue 2'
    style={{ width: '55%' }}
  />
</div>


We further quantified this bottleneck by comparing data loading and training throughput, as shown in the figure below:

<img
  src='/posts/gpu-pipline/baseline.png'
  alt='baseline plot'
  style={{ display: 'inline-block', width: '50%', maxWidth: '400px' }}
/>

In the plot above, the three bars represent:

- Baseline: Baseline throughput of the end-to-end pipeline using real data.
- No Training (i.e. data loading throughput): Throughput of the data loading without any training (to measure the time spent on data loading vs. training).
- Synthetic Data (i.e. Training throughput): Throughput of the data loading using synthetic data (to remove the data loading bottleneck).

The results show that the data loading step is the main bottleneck in our pipeline, with **much** lower throughput compared to the training step.

## Hackathon: Strategies Explored!

During the hackathon, we tested the following strategies to improve the data loading performance:

1. **Optimized Chunking & Compression**
   - We explored different chunking and compression strategies to optimize the data loading performance. We found that using Zarr v3 with optimized chunking and compression significantly improved the data loading performance.
2. **GPU native data loading with Zarr v3 and KvikIO**
   - Leveraging Zarr v3's support for reading data directly into GPU memory using CuPy arrays, we utilized [KvikIO](https://docs.rapids.ai/api/kvikio/stable/) to bypass CPU memory, enabling direct data transfer from storage to GPU.
3. **Using `nvcomp` for decompression on GPUs**
   - We explored using [NVIDIA's nvCOMP library](https://developer.nvidia.com/nvcomp) for GPU-accelerated decompression of Zarr data. This allowed us to offload the decompression step to the GPU, reducing the time spent on data loading.
4. **NVIDIA DALI**: We explored integrating [NVIDIA's Data Loading Library (DALI)](https://docs.nvidia.com/deeplearning/dali/user-guide/docs/index.html) into our pipeline to facilitate efficient data loading and preprocessing directly on the GPU. NVIDIA DALI provides highly optimized building blocks and an execution engine for data processing, accelerating deep learning applications.

### Step 1: Optimized chunking 

The ERA-5 dataset we were using had a sub-optimal chunking scheme of `{'time': 10, 'channel': C, 'height': H, 'width': W}`, which meant that a minimum of 10 timesteps of data was being read even if we only needed 2 consecutive timesteps at a time.
We decided to rechunk the data to align with our access pattern of 1-timestep at a time, while reformating to Zarr V3.
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

1. Storing the data without compression (if not transferring over a network), as decompressing data can slow down read speeds. But see also GPU decompression with nvCOMP below. 😉
2. Concatenating several data variables together **if** a single chunk size is too small (`<1MB`), at the expense of reducing readability of the Zarr store.
   Having too many small chunks can be detrimental to read speeds. A compressed chunk should be `>1MB`, `<100MB` for optimal reads.
   - Alternatively, wait for [sharding](https://zarr.readthedocs.io/en/stable/user-guide/performance.html#sharding) to be supported for GPU buffers in Zarr-python.
3. Align chunks with model access pattern.

The plot below shows the performance of the original dataset vs. the rechunked dataset (to optimal chunk size) vs. uncompressed Zarr v3 dataset.


### Step 2: Reading with Zarr-Python v3 + kvikIO 📖

[Zarr v3](https://zarr.dev/blog/zarr-python-3-release/) introduces new capabilities, including the ability to [read from Zarr stores into CuPy arrays (i.e. GPU memory)](https://github.com/zarr-developers/zarr-python/issues/2574).

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

Note that using `engine="zarr"` like above would still result in data being loaded into CPU memory before being transferred to GPU memory. 

If your system supports [GPU Direct Storage (GDS)](https://developer.nvidia.com/blog/gpudirect-storage/), you can use the `kvikio` to read data directly into GPU memory, bypassing CPU memory. 

```python
import kvikio.zarr

with zarr.config.enable_gpu():
    store = kvikio.zarr.GDSStore(root="/tmp/air-temp.zarr")
    ds = xr.open_dataset(filename_or_obj=store, engine="zarr")
    assert isinstance(ds.air.data, cp.ndarray)
```

This will read the data directly from the Zarr store to GPU memory, significantly reducing I/O latency. This is especially useful for large datasets, as it reduces the amount of data that needs to be transferred between CPU and GPU memory, but requires GPU Direct Storage (GDS) to be enabled on your system.

While decompression still occurs on the CPU, this marks an important step toward enabling fully GPU-native workflows. In the figure below, we show the flowchart of the data loading process with GDS enabled.

![Flowchart-technically decompression is still done on CPUs](/posts/gpu-pipline/flowchart_2.png)

Eventually with this [cupy-xarray Pull Request merged](https://github.com/xarray-contrib/cupy-xarray/pull/70) (based on earlier work at https://xarray.dev/blog/xarray-kvikio), this can be simplified to:

```python
import cupy_xarray

ds = xr.open_dataset(filename_or_obj="/tmp/air-temp.zarr", engine="kvikio")
assert isinstance(ds.air.data, cp.ndarray)
```

How do these two methods, Zarr (CPU) and kvikio (GPU), compare?

(TODO put in benchmark numbers here).

**Note**: For kvikio performance improvements, you need GPU Direct Storage (GDS) enabled on your system. This is a feature that allows the GPU to access data directly from storage, bypassing the CPU and reducing latency. GDS is supported on NVIDIA GPUs with the [GPUDirect Storage](https://docs.nvidia.com/datacenter/pgp/gds/index.html) feature.

### Step 3: GPU-based decompression with nvCOMP 🚀

For a fully GPU-native workflow, we can let the GPU do all of the work, including decompression. This is where [NVIDIA's nvCOMP](https://developer.nvidia.com/nvcomp) library comes in. nvCOMP provides GPU-accelerated compression and decompression algorithms for various data formats, including Zstandard (Zstd). This means that all steps of data loading including reading, decompressing, and transforming data can be done on the GPU, significantly reducing the time spent on data loading.

![GPU native decompression](/posts/gpu-pipline/flowchart_3.png)

Sending compressed instead of uncompressed data to the GPU means less data transfer overall, reducing I/O latency from storage to device.
To unlock this, we would need zarr-python to support GPU-based decompression codecs, with one for Zstandard (Zstd) currently being implemented in [this PR](https://github.com/zarr-developers/zarr-python/pull/2863).

Figure above shows benchmark comparing CPU vs GPU-based decompression, with or without GDS enabled using [the data reading benchmark here](https://github.com/pangeo-data/ncar-hackathon-xarray-on-gpus/blob/main/benchmark/era5_zarr_benchmark.py).

![GPU native decompression](/posts/gpu-pipline/zstd_benchmark.png)

These results show that GPU-based decompression can significantly reduce the time spent on data loading and cut I/O latency from storage to device. This is especially useful for large datasets, as it allows for faster data loading and processing.

Keep an eye on this space, as we are working on integrating this into the Zarr ecosystem to enable GPU-based decompression for Zarr stores. This will allow for a fully GPU-native workflow, where all steps of data loading, including reading, decompressing, and transforming data, can be done on the GPU. 😎

> 💡 Takeaway: Even without full GDS support, GPU-based decompression can dramatically reduce latency and free up CPU resources for other tasks.

### Step 4: Overlapping CPU and GPU compute with NVIDIA DALI 🔀

Ideally, we want to minimize idle time on both the CPU and GPU by overlapping their workloads. In traditional PyTorch DataLoaders, data loading and preprocessing often happen sequentially before GPU training can begin—this creates stalls where the GPU sits idle waiting for input (as seen in our baseline profiling screenshots above).

To address this inefficiency, we adopted [NVIDIA DALI (Data Loading Library)](https://docs.nvidia.com/deeplearning/dali/user-guide/docs/index.html), which provides a flexible, GPU-accelerated data pipeline with built-in support for asynchronous execution across CPU and GPU stages. DALI helps reduce CPU pressure, enables concurrent preprocessing, and increases training throughput by pipelining operations.

We began with a minimal example in [zarr_DALI directory](https://github.com/pangeo-data/ncar-hackathon-xarray-on-gpus/tree/main/zarr_DALI) with short, contained examples of a DALI pipeline loading directly from Zarr stores. This example shows how to build a custom DALI `pipeline` that uses an `ExternalSource` operator to load batched image data from a Zarr store and transfer them directly to GPU memory using CuPy arrays.

In short, to use DALI with Zarr for data loading, you need to:

I. Define an external input iterator to read data from data source (e.g., Zarr store) and yield batches of data:

```
class ExternalInputIterator:
    def __init__(self, zarr_path="data/example.zarr", batch_size=16):
        store = zarr.open(zarr_path, mode="r")
        self.images = store["images"]
        self.labels = store["labels"]
        self.batch_size = batch_size
        self.indices = list(range(len(self.images)))

    def __iter__(self):
        self.i = 0
        return self

    def __next__(self):
        batch, labels = [], []
        for _ in range(self.batch_size):
            idx = self.indices[self.i % len(self.images)]
            batch.append(self.images[idx])
            labels.append(self.labels[idx])
            self.i += 1
        return batch, labels
```

II. Define a DALI pipeline with `ExternalSource` operator to read data from the iterator.
```
eii = ExternalInputIterator()
pipe = dali.pipeline.Pipeline(batch_size=16, num_threads=4, device_id=0)

with pipe:
  images, labels = fn.external_source(
      source=eii,
      num_outputs=2,
      device="gpu", # use GPU memory
      batch_size=16,
  )
```

III. Build and run the pipeline: 
```
pipe.build()
output = pipe.run()
images_gpu, labels_gpu = output
```

Next, checkout the [end-to-end example](https://github.com/pangeo-data/ncar-hackathon-xarray-on-gpus/tree/main/zarr_ML_optimization) directory, where we show how to integrate the DALI pipeline into a PyTorch DataLoader and training loop. This example demonstrates how to use DALI to load data from Zarr stores, preprocess it on the GPU, and feed it into a PyTorch model for training.

Profiling results from the DALI pipeline demonstrate effective overlap between CPU and GPU workloads, significantly reducing GPU idle time (blue) and increasing overall training throughput:

<img
  src='/posts/gpu-pipline/profiling_screenshot_dali.png'
  alt='baseline plot'
  style={{ display: 'inline-block', width: '70%', maxWidth: '400px' }}
/>


## Going Forward 🔮

This work is still ongoing, and we are continuing to explore ways to optimize data loading and processing for large-scale geospatial AI/ML workflows. We started this work during a 3-day hackathon, and we are excited to continue this work in the future. During the hackathon, we were able to make significant progress in optimizing data loading and processing for large-scale geospatial AI/ML workflows.

We are continuing to explore the following areas:

- GPU Direct Storage (GDS) for optimal performance
- NVIDIA DALI
- Support for sharded Zarr with GPU-friendly access patterns
- Work out how to use GDS when reading from cloud object store instead of on-prem disk
- GPU-based decompression with nvCOMP

## Lessons Learned 💡

- **Chunking matters!** It really does and can make a huge difference in performance.
- ** Zarr v3 enables GPU-native workflows**: Zarr v3 currently supports reading data into device (GPU) memory as the final stage of the codec pipeline (by using `zarr.config.enable_gpu()`), but this is not yet fully GPU-native. We are working on enabling GPU-native decompression using `nvComp` to eliminate the host-device transfer step. 
- **GPU Direct Storage (GDS)** can be an improvement for data-intensive workflows, but requires some setup and configuration.
- **Compression trade-offs**: Using compression can reduce the amount of data transferred, but can also increase the time spent on decompression. We found that using Zarr v3 with GPU-based decompression can significantly improve performance.
- **NVIDIA DALI** is a powerful tool for optimizing data loading, but requires some effort to integrate into existing workflows.
- **CuPy-Xarray integration** is still a work in progress, but can be very useful for GPU-native workflows. Please see this PR for more details: [xarray-contrib/cupy-xarray#70](https://github.com/xarray-contrib/cupy-xarray/pull/70).
- **GPU-native decompression** is a promising area for future work, but full support (e.g. GPU-side Zstd decompression) requires further development and testing.

## Acknowledgements 🙌

This work was developed during the [NCAR/NOAA Open Hackathon](https://www.openhackathons.org/s/siteevent/a0CUP00000rwYYZ2A2/se000355) in Golden, Colorado from 18-27 February 2025. We would like to thank the OpenACC Hackathon for the opportunity to participate and learn from this experience. Special thanks to NCAR for providing access to NCAR’s Derecho supercomputer which we used for this project. Thanks also to the open-source communities behind [Xarray](https://github.com/pydata/xarray), [Zarr](https://github.com/zarr-developers/zarr-python), [CuPy](https://github.com/cupy/cupy), [KvikIO](https://github.com/rapidsai/kvikio), and [DALI](https://github.com/NVIDIA/DALI).

<div
  style={{
    display: 'flex',
    gap: '1.5rem',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '1rem 0',
  }}
>
  <img
    src='https://www.archives.ucar.edu/sites/default/files/images/NSF-NCAR_Lockup-UCAR-Dark_102523%20%282%29.png'
    alt='NSF NCAR Logo'
    style={{ height: '60px' }}
  />
  <img
    src='https://devseed.com/aiaia-docs/assets/graphics/content/dev-seed-logo-test.png'
    alt='Development Seed Logo'
    style={{ height: '60px' }}
  />
  <img
    src='https://www.nvidia.com/content/dam/en-zz/Solutions/about-nvidia/logo-and-brand/01-nvidia-logo-vert-500x200-2c50-d@2x.png'
    alt='NVIDIA Logo'
    style={{ height: '60px' }}
  />
  <img
    src='https://www.openhackathons.org/s/sfsites/c/resource/CommunityResourceNew/images/logo.png'
    alt='Open Hackathons Logo'
    style={{ height: '60px' }}
  />
</div>
