---
title: 'Accelerating Biological Analysis with Xarray'
date: '2025-06-05'
authors:
  - name: Ian Hunt-Isaak
    github: ianhi
summary: 'A discussion of how Xarray fits into Biological analysis workflows'
---

**SciPy 2025 Sprint!** If you will be attending the [SciPy 2025](https://www.scipy2025.scipy.org/) conference join our Xarray for Biology Sprint! It's not required but if you are interested let us know via this [form](https://docs.google.com/forms/d/e/1FAIpQLSeGvTLONF-24V7z2HoACm4MhEr82c2V-VIzA9eqM9-jt-Xh8g/viewform?usp=sharing&ouid=111570313164368772519).

---

Hi! I'm Ian, a multimodal microscopist, and the new "Xarray Community Developer." I am funded by the Chan Zuckerberg Institute to support the use of Xarray in biological and biomedical applications.

I believe Xarray can be immensely valuable to the biological community. I discovered Xarray during my PhD where I used it to keep track of complex microscopy image metadata and execute larger-than-memory jobs on the cluster. It is so useful that it is now my default tool for all analyses in both structural and microbiology. Using Xarray means I no longer ask myself questions like: Which axis was what? Where did the exposure times go? I know I changed the media at 32 minutes, but what time index was that?

You have likely experienced similar challenges when working with array data (e.g., microscopy images, genomic sequences, or anything else you might currently analyze using NumPy). Xarray is a great tool for dealing with those challeneges. However, while Xarray is heavily used in the geosciences community, where it was initially developed, biological applications are only recently gaining steam.

To understand why and figure out a roadmap for the future of Xarray in Biology I have spent the last several months interviewing scientists and software developers across many fields of Biology. I also contributed biology related fixes to Xarray and Zarr, attended conferences and studied existing use cases of Xarray.

This post contains a summary of my findings. I will introduce the concepts of Xarray at a high level with biological context and give examples where it is already in use. Then, based on the interviews I conducted I will explain what has limited adoption. Finally, I will describe what we (Biologists and Xarray contributors) can do to increase adoption.

## What is Xarray and Why Should You Use it?

Biological data almost always has rich context and metadata associated with the actual measurements. For example, sample conditions, genetic modifications, buffer composition per well in a plate, time points, and spatial coordinates. While NumPy is a powerful tool, it has limitations when it comes to working with these datasets.

Selecting data based on array indices rather than the physical values can be confusing. You know you switched the growth medium at 32 minutes, but which array index is that? Similarly, keeping track of which dimension is which can be difficult without labels. You have a five-dimensional array, but there are a few transposes in this code from last week, and now you don't remember which axis is which in the output. Managing a collection of multiple related arrays with slightly different shapes can be tricky. Imagine sending data into a batch job and trying to keep segmentations and raw images together. Or maybe you've tried to follow poorly commented analysis from an interesting paper and gotten lost in the details?

### Data Structures

Xarray’s data structures provide a solution to all these problems. To quote the docs,

> Xarray introduces labels in the form of dimensions, coordinates, and attributes on top of raw NumPy-like multidimensional arrays, which allows for a more intuitive, more concise, and less error-prone developer experience.

Xarray accomplishes this by providing the [`DataArray`](https://docs.xarray.dev/en/latest/user-guide/data-structures.html#dataarray), [`Dataset`](https://docs.xarray.dev/en/stable/user-guide/data-structures.html#dataset) and [`DataTree`](https://docs.xarray.dev/en/stable/user-guide/data-structures.html#datatree). Which keep track of it metadata and are coordinate aware (e.g., can hold the values of timepoints in seconds for you).

### DataArray

Here is an example of what a `DataArray` of a small stack of microscopy images might look like:

<RawHTML filePath='/posts/xarray-biology/dataarray-repr.html' />

Looking at the `repr`, you can probably understand a lot about the experiment without any explanation. You no longer need to mentally keep track of transposes, axis labels, and metadata because you can always check the current state! This Xarray feature makes it easier for you to develop your analysis and also means that your code will be more easily understandable by others. Or if you receive a notebook from someone, you will have an easier time deciphering it. You can also use the metadata to expressss operations, writing `dim="time"` is much clearer than `axis=0`

### Dataset

When you collect data, you likely collect more than just one type. You may have sequence data in addition to growth curves, fluorescence data, or some kind of spectral data. If you collect multiple arrays of data that share some dimensions (e.g., time) but not all, how do you keep them organized? They can't fit in one array as they don't share all their dimensions!

Happily, Xarray solves this problem for us as well! The [`Dataset`](https://docs.xarray.dev/en/latest/user-guide/data-structures.html#dataset) object stores collections of related `DataArray`'s. For example, for our microscopy image stack, we might also create a segmentation layer that will share some of the dimensions of our image (`time`, `X`, `Y`, [`Z`]) but not all (`channel`, [`Z`]) and it would be great to keep them together.

<RawHTML filePath='/posts/xarray-biology/dataset-repr.html' />

### DataTree

Finally, the [`DataTree`](https://docs.xarray.dev/en/latest/user-guide/data-structures.html#dataset) object allows you to keep trees of related datasets, for example, a representation of multiscale images allows for natural support of [OME-NGFF](https://www.nature.com/articles/s41592-021-01326-w) data.

<RawHTML filePath='/posts/xarray-biology/datatree-repr.html' />

### Why use Xarray?

Having labeled dimensions and the ability to organize multiple arrays is often reason enough to start using Xarray. But there are more benefits:

- Readable and easy to use [indexing and selecting semantics](https://docs.xarray.dev/en/stable/user-guide/indexing.html)
  - e.g., Max projected GFP from minutes 15 and 30: `array.sel(channel='GFP', time=(15,30)).max(‘Z’)`
- [Data merging](https://docs.xarray.dev/en/stable/user-guide/combining.html) based on dimensions and coordinates
- Built-in [vizualization tooling](https://docs.xarray.dev/en/stable/user-guide/plotting.html)
- Powerful [computational Patterns](https://tutorial.xarray.dev/intermediate/01-high-level-computation-patterns.html) such as `groupby`, `coarsen`, `resample`
- Ability to scale to larger than memory datasets via [integration with Dask](https://docs.xarray.dev/en/stable/user-guide/dask.html)
- Flexible [I/O framework](https://docs.xarray.dev/en/stable/user-guide/io.html) with potential for better integration with a zoo of bio formats
- Arbitrary array types including `pydata/sparse` arrays.

### When Can You Use Xarray?

As great as Xarray sounds, it does have limitations. Xarray is an array library; it's in the name! So, if your data is tabular and the tabular ecosystem is working well for you then keep using that!

To better understand if you have tabular or array data, I recommend reading Ryan Abernathy's excellent post [Tensors vs. Tables](https://earthmover.io/blog/tensors-vs-tables?ref=xarray-bio-blog). If you have array-like data and have been using Pandas to work with it and want to try out Xarray you can do so easily with `pandas_df.to_xarray()`.

Many parts of biology generate array data. And scientists in some areas are already benefiting from Xarray.

### Who is Using Xarray

- [Sgkit](https://sgkit-dev.github.io/sgkit/latest/getting_started.html#data-structures) "a toolkit for quantitative and population genetics" uses Xarray `Dataset`'s as a core data structure. Xarray allows them to keep track of the rich metadata associated with sequences and further uses computational patterns to speed up analyses.
  - Xarray's interoperability with Zarr makes it a promising way to interact with new Variant Call Format (VCF) standard [`VCF Zarr`](https://www.biorxiv.org/content/10.1101/2024.06.11.598241v3)
- Xarray has also been used for neurophysiology data by the [Ecephys](https://allensdk.readthedocs.io/en/latest/allensdk.brain_observatory.ecephys.html) package. See a previous blog post [xarray for neurophysiology](https://xarray.dev/blog/xarray-for-neurophysiology) to learn more.
- The `scverse` family of software uses [anndata](https://anndata.readthedocs.io/en/stable/), which, like Xarray provides labeled dimensions. There are plans to have `anndata` be powered by `anndata`
- The [bioio](https://bioio-devs.github.io/bioio/OVERVIEW.html) package, capable of reading a zoo of microscope formats, provides a function to get image stacks as a `DataArray`.
- The [movement](https://movement.neuroinformatics.dev/index.html) package for analyzing animal body movements uses `Xarray.Dataset`s as their data model.
- The `Xarray.DataTree` provides a natural representation of multiscale images and can interoperate well with the OME-NGFF model. The [multiscale-spatial-image](https://github.com/spatial-image/multiscale-spatial-image?tab=readme-ov-file#multiscale-spatial-image) project uses `DataTree` for precisely this purpose.

## What has limited adoption by Biologists?

Given the benefits of switching to Xarray, why aren't more biologists using it? Is it secretly not as good as this blog claims? I spent February and April 2025 reaching out to scientists and scientific software developers across various fields of biology to find out. From those discussions, I've found three core reasons have prevented biologists who are already using Python from adopting Xarray.

### Awareness and Examples

Many biologists have never heard of Xarray. This is because the geosciences community created Xarray, and there wasn't enough community overlap for the word to spread to biologists.

A related issue is that the examples and tutorials are geoscience-centric, which was the source of my discouragement when I first read the Xarray docs.

### Technical Barriers

Once a potential user is convinced of Xarray's value, they may still face technical barriers. Ranging from rough edges to missing features, however, none are insurmountable. These barriers can exist in Xarray or in other tools in their workflow not accepting Xarray as input.

An example of a rough edge in Xarray is that you cannot use integers as keys in a `DataTree`. That is a problem, as integers are a natural key when tracking single-cell lineages. Rough edges like this one haven't been smoothed over yet because there has not been a large user base of biologists using Xarray and raising issues when they encounter problems.

Until recently, a missing feature was the ability to have Xarray coordinates defined as functions or via transformations. The requirement was to have dense in memory arrays, which was limiting factor for applications such as volumetric imaging. Allowing for analytical transforms and having more flexible coordinates is critical to unlocking the benefits of Xarray in those applications. Excitingly, in February 2025, initial support for this was [merged](https://github.com/pydata/xarray/pull/9543)!

Another area of potential improvement is support for sparse arrays. Many biology datasets are sparse, so robust support is a key feature. For example Hi-C data (genome contact maps) are both large and sparse. Xarray does currently support sparse arrays so if you have tried using them and ran into problems please [open an issue](https://github.com/pydata/xarray/issues/new/choose).

### Lack of Integration

Finally, we have been limited by a lack of integration with existing software tools. This is partially a consequence of prioritization from downstream developers. It's a classic chicken and egg problem: Users with Xarray data aren't asking for integration, so why spend time incorporating it? Similarly, the software doesn't support Xarray, so why spend time putting your data in Xarray?

This comes up in two ways. First, whether tools can output their internal format to Xarray, and second, whether tools accept Xarray arrays and make use of the extra features. For example, the high performance N-D image viewer [Napari](https://napari.org/stable/) has had a long-standing [open issue](https://github.com/napari/napari/issues/14) about using Xarray to add extra information to dimension sliders.

## Call To Action

Xarray has fantastic potential to accelerate our ability to perform and share biological analyses and accelerate discovery. To realize this potential, there are a few things we as a community need to do.

The first thing is to consider what we mean by "community." There are two separate communities with some overlap: Xarray developers and biologists interested in using Xarray.

### What can Xarray Do

As a community of contributors to Xarray, we need to:

- **Support**: Be responsive to technical limitations and bugs in Xarray that affect biologists
- **Educate**: cross-post about improvements in Xarray to spaces with biologists

### What can Biologists Do?

**Try** using Xarray for your data. Find the smallest, most straightforward way to get your data into Xarray and start using it.

Make sure to **ask for help** when you need it. To do so:

- Post on forums (e.g., [image.sc](https://forum.image.sc/), or the [Xarray Github Discussions](https://github.com/pydata/xarray/discussions))
  As part of my role as an "Xarray community Developer" I'm always happy to talk to you about whether Xarray might be a good fit for your biology data. Please reach out if you have a question! I'm `@ianhi` on most platforms. You can also join our new Xarray in Biology
- Join the new Xarray for Biology [office hours](https://xarray-contrib.github.io/xarray-for-bio/getting-help.html#office-hours)
- Book one on one time with Ian [here](https://calendar.app.google/xdjhynWycxE3okk68).

**Share** how you did it with your colleagues and report bugs and feature requests to Xarray.

If you have a success story, then you should tell people about it! For example, by submitting a short blog post [here](https://github.com/xarray-contrib/xarray.dev/issues).

### What can the Xarray-Bio Community do?

Anyone already using Xarray to work with biology data is uniquely well-positioned to help speed adoption. We have three core tasks to grow the number of us.

**Build** and then **share** tools that use Xarray to do useful things, such as building domain-specific visualization tools that use Xarray metadata to build the visualizations. Or solving any problems that you run into; if it bothers you, it likely bothers someone else, and they'll be happy to use your solution.
**Contribute** by commenting on Xarray issues, explaining how they affect biology use cases, and working on bug fixes and new features.
**Support** other biologists learning to use Xarray. Respond to forum posts and help budding users, write and share small examples of using Xarray with biology data. Teach tutorials to your peers.

As part of my role as an "Xarray community Developer" I'm always happy to talk to you about whether Xarray might be a good fit for your biology data. Please reach out if you have a question! I'm `@ianhi` on most platforms. You can also join our new Xarray in Biology [office hours](https://xarray-contrib.github.io/xarray-for-bio/getting-help.html#office-hours), or book some time with me to talk Xarray and Biology [here](https://calendar.app.google/xdjhynWycxE3okk68).

## Looking Forward

Xarray has already demonstrated its value to biologists when it is used. If we continue to work toward using this tool, it will be a significant step toward having standardized, interoperable, metadata-rich datasets, maintainable workflows, and easier interactive analysis. This will benefit the geosciences community with contributions and benefit biologists by avoiding duplication of effort.

This blog post addressed biology as a broad topic. In future posts, I will explore domain-specific insights and examples in fields such as microscopy, cryo-EM/ET, x-ray crystallography data, high-throughput screening, etc... If you are interested in talking about this, helping write posts, or otherwise getting involved, please don't hesitate to reach out.

The future of Xarray in biology is bright if we work together to realize it.
