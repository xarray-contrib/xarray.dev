---
title: 'CuPy-Xarray: Xarray on GPUs!'
date: '2023-10-27'
authors:
  - name: Negin Sobhani, Deepak Cherian, Max Jones
    github: negin513, dcherian, maxrjones
summary: 'CuPy-Xarray is a Python library that leverages CuPy, a GPU array library, and Xarray, a library for multi-dimensional labeled array computations, to enable fast and efficient data processing on GPUs.'
---

## TLDR
The CuPy-Xarray collaboration brings GPU acceleration into Xarray workflows. Explore the new documentation and tutorials to leverage these capabilities for your data science needs. 🎉 🥳 🚀

## Background
### What is CuPy-Xarray?
CuPy is a GPU-accelerated library for numerical computations. It’s like NumPy but runs on NVIDIA CUDA. Meanwhile, Xarray is an open-source Python library that simplifies working with labelled multi-dimensional arrays, such as in weather data, satellite images, and more.

The CuPy-Xarray integration means that Xarray can now handle CuPy arrays, providing a seamless transition between CPU and GPU computations in your data pipeline.

### Why is this important?
With data science tasks becoming more complex and demanding, especially in domains like geospatial analysis and deep learning, the need for faster computation is crucial. GPUs provide parallel processing capabilities that CPUs just can't match for specific tasks. By bringing CuPy arrays into Xarray, computations that were previously a bottleneck can now be accelerated.

## New Documentation and Tutorials
We have now created detailed documentation with examples to help you get started with CuPy-Xarray. Check it out at https://cupy-xarray.readthedocs.io/en/latest/.

The new documentation offer the followings: 

1. Basics of CuPy and GPU Computing: 
2. Introduction to CuPy-Xarray : This section introduces the CuPy-Xarray library and how it handles Xarray DataArrays on GPUs.
3. Basic Computations with CuPy-Xarray: This section introduces, Applying basic arithmetic and NumPy functions to xarray DataArray. Next it will talk about Understand two important concepts: broadcasting and alignment.

Performance of Xarray using Cupy vs. Numpy on different array sizes

4. High-level Computation with CuPy-Xarray: This section introduces, Applying high-level functions like groupby, resample, rolling, and apply_ufunc to xarray DataArray. 
5. Custom Kernels with `apply_ufunc` : Here we will talk about how to write custom kernels for `apply_ufunc` and how to use `apply_ufunc` with `groupby` and `resample`.
6. A real world example: This section introduces, how to use CuPy-Xarray to accelerate a real world example. We will use the NASA Earth Exchange Global Daily Downscaled Projections (NEX-GDDP-CMIP6) to demonstrate how to use CuPy-Xarray to accelerate a real world example.

If you have any questions, encounter issues, or want to contribute, the community forums are a great place to start. Whether you're a newbie or an experienced developer, the CuPy-Xarray community welcomes you.

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