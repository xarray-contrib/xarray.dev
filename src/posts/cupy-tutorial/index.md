---
title: 'CuPy-Xarray: Xarray on GPUs!'
date: '2024-01-17'
authors:
  - name: Negin Sobhani
    github: negin513
  - name: Deepak Cherian
    github: dcherian
  - name: Max Jones
    github: maxrjones
summary: 'CuPy-Xarray is a Python library that leverages CuPy, a GPU array library, and Xarray, a library for multi-dimensional labeled array computations, to enable fast and efficient data processing on GPUs.'
---

## TLDR

The [CuPy-Xarray](https://github.com/xarray-contrib/cupy-xarray) project makes mixing GPU acceleration with Xarray workflows very convenient! Explore the [new documentation](https://cupy-xarray.readthedocs.io/) and tutorials to explore how CuPy-Xarray enables GPU accelerations on large multidimensional datasets. 🎉 🥳 🚀

## Background

### What is CuPy-Xarray?

[CuPy](https://cupy.dev) is a GPU-accelerated library for numerical computations. CuPy provides a NumPy-like array object -- a duck array -- that follows various standard array protocols and executes computations on CUDA-capable devices. Xarray can [wrap duck array](https://docs.xarray.dev/en/stable/user-guide/duckarrays.html) objects (i.e. NumPy-like arrays) that follow specific protocols.

Thus Xarray can handle CuPy arrays, and `cupy-xarray` provides a number of useful methods under the `xarray_object.cupy` namespace, allowing seamless transition between CPU and GPU computations in your data pipeline.

### Why is this important?

GPU acceleration is becoming increasingly important in scientific research, data analysis, and AI/ML techniques due to its ability to perform massively parallel computations. GPUs can greatly accelerate the processing of array datasets, allowing for faster analysis and modeling of large datasets. By leveraging the power of GPUs with tools such as CuPy and CuPy-Xarray, Xarray users can gain significant performance improvements and unlock new opportunities for scientific discovery.

## New Documentation and Tutorials

We have recently created detailed documentation with examples to help users get started with CuPy-Xarray. Check it out at [this link](https://cupy-xarray.readthedocs.io/).

The new documentation offers the following topics:

1. **[Basics of CuPy](https://cupy-xarray.readthedocs.io/source/cupy-basics.html)** : An introduction to CuPy, basics of GPU computing, and data transfer between host and device.
2. **[Introduction to CuPy-Xarray](https://cupy-xarray.readthedocs.io/source/introduction.html)**
3. **[Basic Computations with CuPy-Xarray](https://cupy-xarray.readthedocs.io/source/basic-computations.html)**
4. **[High-level Computation with CuPy-Xarray](https://cupy-xarray.readthedocs.io/source/basic-computations.html#)** : Applying high-level functions like `groupby`, `resample`, `rolling`, and `apply_ufunc` to xarray objects.
5. **[Custom Kernels with `apply_ufunc`](https://cupy-xarray.readthedocs.io/source/apply-ufunc.html)** : Custom CUDA kernels for `apply_ufunc` and how to use `apply_ufunc` with `groupby` and `resample`.
6. **[A real world example](https://cupy-xarray.readthedocs.io/source/real-example-1.html)** : This section introduces how to use CuPy-Xarray to accelerate a real world earth system model analysis workflow. In this demo, we used the NASA Earth Exchange Global Daily Downscaled Projections (NEX-GDDP-CMIP6) to demonstrate how to use CuPy-Xarray to speed-up computations on climate data variables.

If you have any questions, encounter issues, or want to contribute, the [community forum](https://discourse.pangeo.io) is a great place to start.

## Upstream Work

We also worked to improve upstream support for the primitives that Xarray needs. For example this [pull request](https://github.com/cupy/cupy/pull/7575) enabled the use of Xarray's `.rolling` methods. An open [pull request](https://github.com/cupy/cupy/pull/7811), when merged, will make it more clear when Xarray objects are wrapping CuPy arrays.

## Summary

CuPy-Xarray is a Python library helps you use CuPy, a GPU array library, and Xarray, a library for multi-dimensional labeled array computations, to enable fast and friendly data processing on GPUs. With the new documentation and tutorials, users can quickly adapt to this integration and optimize their data science workflows.🚀

## Acknowledgments

A special thanks to the Xarray, CuPy, and Pangeo communities for making this integration possible. Collaborations like these are a testament to the power of open-source and community-driven development. 💪
Much thanks to the [NVIDIA RAPIDS team](https://developer.nvidia.com/rapids) (specifically Jacob Tomlinson, John Kirkham) for initiating the `cupy-xarray` project and guiding us along the way.
This work was partly funded by NSF Earthcube award ["Jupyter Meets the Earth" (1928374)](https://www.nsf.gov/awardsearch/showAward?AWD_ID=1928374); and NASA's Open Source Tools, Frameworks, and Libraries award "Enhancing analysis of NASA data with the open-source Python Xarray Library" (80NSSC22K0345).

## Appendix I: Installation Instructions

From anaconda:

```shell
conda install cupy-xarray -c conda-forge
```

From PyPI:

```shell
python -m pip install cupy-xarray
```

## Appendix II: Additional Resources

1. [CuPy User Guide](https://docs.cupy.dev/en/stable/user_guide/index.html)
2. [Xarray User Guide](https://docs.xarray.dev/en/stable/user-guide/index.html)
3. [Cupy-Xarray Github](https://github.com/xarray-contrib/cupy-xarray.git)
4. [NCAR GPU Workshop](https://github.com/NCAR/GPU_workshop)
