---
title: 'The Pangeo Machine Learning Ecosystem'
date: '2024-04-03'
authors:
  - name: Wei Ji Leong
    github: weiji14
  - name: Max Jones
    github: maxrjones
  - name: Negin Sobhani
    github: negin513
  - name: Deepak Cherian
    github: dcherian
summary: 'An overview of the open source libraries enabling geospatial machine learning in the Pangeo community.'
---

## TLDR

Open source tools developed by the Pangeo ML community are enabling the shift to cloud-native geospatial Machine Learning.
Join the [Pangeo ML community](https://pangeo.io/meeting-notes.html#working-group-meetings) working in towards scalable [GPU-native](./xarray-kvikio) workflows! 🚀

## Overview

### Building next-generation Machine Learning (ML) tools

At FOSS4G SotM Oceania 2023, we presented on "The ecosystem of geospatial machine learning tools in the Pangeo World" (see the recording [here](https://www.youtube.com/watch?v=X2LBuUfSo5Q)).
One of the driving forces of the Pangeo community is to build better tools that will enable scientific workflows on petabyte-scale datasets, such as Climate/Weather projections that will impact the planet over the coming decades.

To do that, we need to be fast.

These next-generation tools need to be scalable, efficient, and modular.
So we are designing them with three aspects in mind:

- Work with cloud-native data using **GPU-native** compute
- Be able to **stream** subsets of data on-the-fly
- Go from single sensor to **multi-modal** models

Neither of these core technologies are particularly new.
NVIDIA has been leading the development of GPU-native [RAPIDS AI](https://rapids.ai) libraries since 2018.
Streaming has been around since the 2010s if not earlier, and is practically the most common way to consume music and video content nowadays.
Since then, we have also seen the rise in [multi-modal Foundation Models](https://doi.org/10.48550/arXiv.2309.10020) that are able to take in visual (image) and language (text and sound) cues.

Let's now take a step back, and picture what we're working with.

## Layers of the Pangeo Machine Learning stack

![Pangeo Machine Learning Ecosystem in 2023. Bottom row shows cloud-optimized file formats. Middle row shows Array libraries. Top row shows the Pangeo ML libraries and educational resources.](https://github.com/weiji14/foss4g2023oceania/releases/download/v0.9.0/pangeo_ml_ecosystem.png)

There are three main layers to a Machine Learning data pipeline.
It starts with data storage file formats at the bottom row, an in-memory array representation in the middle, and high-level libraries and documentation resources that users or developers interact with at the top.

The key to connecting all of these layers are open standards.

### Cloud-native geospatial file formats

For the file formats, we favour [cloud-native geospatial](https://www.ogc.org/ogc-topics/cloud-native-geospatial) because it allows us to efficiently access subsets of data without reading the entire file.
Generally speaking, you would store rasters as [Zarr](https://zarr.dev) or [Cloud-Optimized GeoTIFFs](https://www.cogeo.org), and vectors (points/lines/polygons) in [FlatGeobuf](https://flatgeobuf.org) or [(Geo)Parquet](https://geoparquet.org).
Ideally though, these files would be indexed using a [SpatioTemporal Asset Catalog (STAC)](https://stacspec.org) which makes it easier to discover datasets using standardized queries.
This can be a whole topic in itself, so check out this [guide](https://guide.cloudnativegeo.org) [published in October 2023](https://cloudnativegeo.org/blog/2023/10/introducing-the-cloud-optimized-geospatial-formats-guide) for more details!

### In memory array representations

In the Python world, [NumPy](https://numpy.org) arrays have been the core way of representing arrays in-memory, but there are many others too, along with an ongoing movement to standardize the array/dataframe API at [https://data-apis.org](https://data-apis.org).
Geospatial folks would most likely be familiar with vector libraries like [GeoPandas](https://geopandas.org) GeoDataFrames (built on top of [pandas](https://pandas.pydata.org)); or raster libraries like [rioxarray](https://corteva.github.io/rioxarray) and [stackSTAC](https://stackstac.readthedocs.io) that reads into [xarray](https://xarray.dev) data structures.

NumPy arrays are CPU-based, but there are also libraries like [CuPy](https://cupy.dev) which can do GPU-accelerated computations.
Instead of GeoPandas, you could use libraries like [cuSpatial](https://docs.rapids.ai/api/cuspatial) (built on top of [cuDF](https://docs.rapids.ai/api/cudf) and part of [RAPIDS AI](https://rapids.ai)) to run GPU-accelerated algorithms.
Deep Learning libraries like [PyTorch](https://pytorch.org/docs), [TensorFlow](https://www.tensorflow.org) or [JaX](https://jax.readthedocs.io) tend to be GPU-based as well, but there are also libraries like [Datashader](https://datashader.org) (for visualization) and [Xarray](https://xarray.dev) that are designed to be CPU/GPU agnostic and can hold either.

### High-level Pangeo ML libraries

Finally, to make life simpler, we have high-level convenience libraries wrapping the low-level stuff.
These are designed to have a nicer user interface to connect the underlying file formats and in-memory array representations.
The [Pangeo Machine Learning Working Group](https://pangeo.io/meeting-notes.html#working-group-meetings) mostly works on Climate/Weather datasets, so we'll focus on multi-dimensional arrays for now.

Stepping into the GPU-native world, [cupy-xarray](https://cupy-xarray.readthedocs.io) allows users to use GPU-backed CuPy arrays in n-dimensional Xarray data structures (see our previous [blog post](./cupy-tutorial) on this).
An exciting development on this front is the experimental [kvikIO](https://github.com/rapidsai/kvikio) engine that enables low-latency reading data from Zarr stores into GPU memory using NVIDIA GPUDirect Storage technology (see this [blog post](./xarray-kvikio)).
[Preliminary benchmarks](https://github.com/zarr-developers/zarr-benchmark/discussions/14) suggest that the GPU-based `kvikIO` engine can take about 25% less time for data reads compared to the regular CPU-based `zarr` engine!

Once you have tensors loaded (lazily) into an Xarray data structure, [xbatcher](https://xbatcher.readthedocs.io) enables efficient iteration over batches of data in a streaming fashion.
This library makes it easier to train machine learning models on big datacubes such as time-series datasets or multi-variate ocean/climate model outputs, as users can do on-the-fly slicing using named variables (more readable than numbered indexes).
There is also an experimental [cache mechanism](https://github.com/xarray-contrib/xbatcher/pull/167) we'd like more people to try and provide feedback on!

To connect all of the pieces, [zen3geo](https://zen3geo.readthedocs.io) implements Composable DataPipes for geospatial.
It acts as the glue to chain together different building blocks, such as readers for Vector/Raster file formats, converters between different in-memory array representations, and even custom pre-processing functions.
The composable design pattern makes it well suited for building complex machine learning data pipelines for multi-modal models that can take in different inputs (e.g. Images, Point Clouds, Trajectory, Text/Sound, etc).
Going forward, there are plans to [refactor the backend to be asynchronous-first](https://github.com/weiji14/zen3geo/discussions/117) to overcome I/O bottlenecks.

## Summary

We've presented a snapshot of the Pangeo Machine Learning ecosystem from 2023.
The basis of any machine learning project is the data, and we touched on how cloud-native geospatial file formats and in-memory array representations built on open standards act as the foundation for our work.
Lastly, we highlighted some of the high-level Pangeo ML libraries enabling user friendly access to GPU-native compute, streaming data batches, and composable geospatial data pipelines.

## Where to learn more

- Educational resources:
  - [Project Pythia Cookbooks](https://cookbooks.projectpythia.org)
  - [GeoSMART Machine Learning Curriculum](https://geo-smart.github.io/mlgeo-book)
  - [University of Washington Hackweeks as a Service](https://guidebook.hackweek.io)

- Pangeo ML Working Group:
  - [Monthly meetings](https://pangeo.io/meeting-notes.html#working-group-meetings)
  - [Discourse Forum](https://discourse.pangeo.io/tag/machine-learning)

## Acknowledgments

The work above is the cumulative effort of folks from the Pangeo, Xarray and RAPIDS AI community, plus more!
In particular, we'd like to acknowledge the work of [Deepak Cherian](https://github.com/dcherian) at [Earthmover](https://earthmover.io) and [Negin Sobhani](https://github.com/negin513) at [NCAR](https://ncar.ucar.edu) for their work on cupy-xarray/kvikIO,
[Max Jones](https://github.com/maxrjones) at [Carbonplan](https://carbonplan.org) for recent developments on the xbatcher package,
and [Wei Ji Leong](https://github.com/weiji14) at [Development Seed](https://developmentseed.org) for the development of zen3geo. Xbatcher development was partly funded by NASA'S Advancing Collaborative Connections for Earth System Science (ACCESS) award "Pangeo ML - Open Source Tools and Pipelines for Scalable Machine Learning Using NASA Earth Observation Data" (80NSSC21M0065). Cupy-Xarray development was partly funded by NSF Earthcube award ["Jupyter Meets the Earth" (1928374)](https://www.nsf.gov/awardsearch/showAward?AWD_ID=1928374); and NASA's Open Source Tools, Frameworks, and Libraries award "Enhancing analysis of NASA data with the open-source Python Xarray Library" (80NSSC22K0345)

## Appendix I: Further Reading

- [The Composable Codex](https://voltrondata.com/codex)
- [zen3geo 2022 Pangeo ML Working Group presentation](https://discourse.pangeo.io/t/monday-november-07-2022-machine-learning-working-group-presentation-zen3geo-guiding-earth-observation-data-on-its-path-to-enlightenment-by-wei-ji-leong/2883) ([recording](https://www.youtube.com/watch?v=8uhOtQUTuDg))
- [Xbatcher 2023 AMS presentation](https://doi.org/10.6084/m9.figshare.22264072.v1) ([recording](https://ams.confex.com/recording/ams/103ANNUAL/mp4/CGNTFL54WCL/67cfb841cba94216ff99f1eb15286ba2/session63444_5.mp4) (starts at 45:30))
- [CuPy-Xarray tutorial at SciPy 2023](https://doi.org/10.5281/zenodo.8247471) ([jupyter-book](https://negin513.github.io/cupy-xarray-tutorials/README.html))
- [Pangeo ML Ecosystem presentation at FOSS4G SotM Oceania 2023](https://github.com/weiji14/foss4g2023oceania) ([recording](https://www.youtube.com/watch?v=X2LBuUfSo5Q))
- [Earthmover blog post on cloud native data loaders for machine learning using xarray and zarr](https://earthmover.io/blog/cloud-native-dataloader)
- [Development Seed blog post on GPU-native machine learning](https://developmentseed.org/blog/2024-03-19-combining-cloud-gpu-native)
