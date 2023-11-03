---
title: 'CuPy-Xarray: Xarray on GPUs!'
date: '2023-10-27'
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

The [CuPy-Xarray](https://github.com/xarray-contrib/cupy-xarray) collaboration brings GPU acceleration into Xarray workflows. Explore the new documentation and tutorials to leverage these capabilities for your data science needs. 🎉 🥳 🚀

## Background

### What is CuPy-Xarray?

[CuPy](https://cupy.dev) is a GPU-accelerated library for numerical computations. It’s like NumPy but runs on NVIDIA CUDA devices. Meanwhile, Xarray is an open-source Python library that simplifies working with labelled multi-dimensional arrays, such as in weather data, satellite images, and more. Xarray can wrap custom duck array objects (i.e. NumPy-like arrays) that follow specific protocols.

The CuPy-Xarray integration means that Xarray can now handle CuPy arrays, providing a seamless transition between CPU and GPU computations in your data pipeline.

> CuPy-Xarray provides an interface for using CuPy in Xarray, providing [accessors](https://docs.xarray.dev/en/stable/internals/extending-xarray.html) on the Xarray objects.

### Why is this important?

GPU acceleration is becoming increasingly important in scientific research, data analysis, and AI/ML techniques due to its ability to perform massively parallel computations. GPUs can greatly accelerate the processing of array datasets, allowing for faster analysis and modeling of large datasets. By leveraging the power of GPUs with tools such as CuPy and CuPy-Xarray, Xarray users can gain significant performance improvements and unlock new opportunities for scientific discovery.

## New Documentation and Tutorials

We have now created detailed documentation with examples to help you get started with CuPy-Xarray. Check it out at https://cupy-xarray.readthedocs.io/en/latest/.

The new documentation offer the following sections:

1. Basics of CuPy: This section provides an introductions to CuPy and basics of GPU computing and data transfer between host and device.
2. Introduction to CuPy-Xarray : This section introduces the CuPy-Xarray library and how it handles Xarray DataArrays on GPUs.
3. Basic Computations with CuPy-Xarray: This section introduces, how to use CuPy-Xarray to perform basic computations on Xarray DataArrays. Next, it introduces the concepts of broadcasting and alignment.
4. High-level Computation with CuPy-Xarray: This section introduces, Applying high-level functions like groupby, resample, rolling, and apply_ufunc to xarray DataArray.
5. Custom Kernels with `apply_ufunc` : Here we will talk about how to write custom kernels for `apply_ufunc` and how to use `apply_ufunc` with `groupby` and `resample`.
6. A real world example: This section introduces, how to use CuPy-Xarray to accelerate a real world example. We will use the NASA Earth Exchange Global Daily Downscaled Projections (NEX-GDDP-CMIP6) to demonstrate how to use CuPy-Xarray to accelerate a real world example.

If you have any questions, encounter issues, or want to contribute, the community forums are a great place to start.

## Summary

CuPy-Xarray brings together the power of GPU acceleration with the versatility of Xarray. With the new documentation and tutorials, users can quickly adapt to this integration and optimize their data science workflows.🚀

## Acknowledgments

A special thanks to the Xarray, CuPy, and Pangeo communities for making this integration possible. Collaborations like these are a testament to the power of open-source and community-driven development. 💪

## Appendix I: Installation Instructions

From anaconda:

```shell
conda install cupy-xarray -c conda-forge
```

From PyPI:

```shell
pip install cupy-xarray
```

## Appendix II: Additional Resources

[CuPy User Guide](https://docs.cupy.dev/en/stable/user_guide/index.html)
[Xarray User Guide](https://docs.xarray.dev/en/stable/user-guide/index.html)
[Cupy-Xarray Github](https://github.com/xarray-contrib/cupy-xarray.git)
[NCAR GPU Workshop](https://github.com/NCAR/GPU_workshop)
