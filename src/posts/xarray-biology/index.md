---
title: 'Accelerating Biological Analysis with Xarray: Why You Should Try Using It Today'
date: '2025-05-04'
authors:
  - name: Ian Hunt-Isaak
    github: ianhi
summary: 'A discussion of how Xarray fits into Biological analysis workflows'
---

If you are a biologist and work with array data (microscopy images, genomic sequences, or anything else you might currently analyze using NumPy). Then you've probably spent hours juggling metadata, battling unclear axes labels, and asking questions like “Why is there a transpose here?” Imagine a tool that will solve those frustrations for you. `Xarray` is that tool.

In this blog post, I will show the areas of biology where it is already in use and discuss its potential for more use cases. I will also explain why it hasn’t already seen wider adoption and the next steps the `Xarray` and Biology communities can take to increase usage of this powerful tool.

## What is Xarray and Why Should You Use it?

Biological data almost always has rich context and metadata associated with the actual measurements. For example: sample conditions, genetic modifications in a well, timepoints, spatial coordinates. While `NumPy` is a powerful tool, it has limitations when it comes to working with these datasets.  Selecting data based on array indices, rather than the physical values, can be confusing. You know you switched the buffer at 32 minutes, but which array index is that? Similarly, keeping track of which dimension is which can be difficult without labels. You have a five-dimensional array, but there are a few transposes in this code from last week, and now you don’t remember which axis is which in the output. Managing a collection of multiple related arrays with slightly different shapes can be tricky. Imagine sending data into a batch job and trying to keep segmentations and raw images together. Or maybe you’ve tried to follow poorly commented analysis from an interesting paper and gotten lost in the details?

`Xarray`’s data structures provide a solution to all these problems. To quote the docs “Xarray introduces labels in the form of dimensions, coordinates, and attributes on top of raw `NumPy`-like multidimensional arrays, which allows for a more intuitive, more concise, and less error-prone developer experience.”  

`Xarray` accomplishes this by providing the [`DataArray`](https://docs.xarray.dev/en/latest/user-guide/data-structures.html#dataarray), which keeps track of its metadata and is coordinate aware (e.g., can hold the values of timepoints in seconds for you).

Here is an example of what a `DataArray` of a small stack of microscopy images might look like:

<RawHTML filePath='/posts/xarray-biology/dataarray-repr.html' />

Just by looking at the `repr` you can probably understand a lot about the experiment without any explanation. You no longer need to mentally keep track of transposes, axis labels, and metadata because you can always check the current state!

Not only does this make it easier for you to develop your analysis, but it also makes your work much more easily understandable and discoverable by others.

**Selection semantics**

Having coordinates and labels allows for powerful selection semantics. Instead of keeping multiple arrays for each variable or coordinate (think timepoints), they will conveniently be contained in one object. For example, to get the max projection of a Z stack from the GFP fluorescent channel at timepoints of 15 and 30 minutes, you would do:

`array.sel(C='GFP’, T=(15,30)).max(‘Z’)`

**Complex Data Structures**

When you collect data, you likely collect more than just one type. You may have sequence data in addition to growth curves, or have fluorescence data, or you have some type of spectral data. If you collect multiple arrays of data that share some dimensions (e.g., time) but not all, how do you keep them organized? They can’t fit in one array as they don’t share all their dimensions!

Happily, `Xarray` solves this problem for us as well! The [`Dataset`](https://docs.xarray.dev/en/latest/user-guide/data-structures.html#dataset) object stores collections of related `DataArray`s. For example in our simple microscopy example we might also create a segmentation layer that will share some, of the dimensions of our image (`T`,`X`,`Y`[`Z`]), but not all (`C`, [`Z`]) and it would be great to keep them together.

<RawHTML filePath='/posts/xarray-biology/dataset-repr.html' />

Finally, the [`DataTree`](https://docs.xarray.dev/en/latest/user-guide/data-structures.html#dataset) object allows you to keep trees of related datasets, for example, a representation of multiscale images allows for natural support of [OME-NGFF](https://www.nature.com/articles/s41592-021-01326-w) data.
<RawHTML filePath='/posts/xarray-biology/datatree-repr.html' />

**Computational Patterns**

Not only does this metadata and coordinates make the developer experience better, but they allow xarray to provide incredibly powerful basic [computational patterns](https://tutorial.xarray.dev/intermediate/01-high-level-computation-patterns.html) such as `groupby`, `coarsen`, `resample` and more. Having access to these tools can, with a little effort, mean you no longer need to write complicated for loops to do your data analysis. It will significantly speed up your ability to explore your data

### When Can You Use Xarray?

As great as Xarray sounds, it does have limitations. After all, Xarray is an Array library; it’s in the name! So if your data is tabular, Xarray is probably not the right tool for you.  To get a better understanding of this, I recommend reading Ryan Abernathy’s excellent post [Tensors vs Tables](https://earthmover.io/blog/tensors-vs-tables?ref=xarray-bio-blog).

That said, many parts of biology generate array data. And scientists in some areas are already benefiting from Xarray.

### Who is Using Xarray

- [`Sgkit`](https://sgkit-dev.github.io/sgkit/latest/getting_started.html#data-structures) “a toolkit for quantitative and population genetics” uses `Xarray` `Dataset`s as a core data structure. This allows them to keep track of the rich metadata associated with sequences and further uses computational patterns to speed up analyses.
- `Xarray` has also been used for neurophysiology data by the Ecephys package. See a previous blog post [xarray for neurophysiology](https://xarray.dev/blog/xarray-for-neurophysiology) to learn more.
- The `scverse` family of software uses `anndata`, which, like `Xarray` provides labeled dimensions.
- The `bioio` package, capable of reading a zoo of microscope formats, provides a function to get image stacks data as Xarray object.
- The `Xarray.DataTree` provides a natural representation of multiscale images and can interoperate well with the OME-NGFF model. The [multiscale-spatial-image](https://github.com/spatial-image/multiscale-spatial-image?tab=readme-ov-file#multiscale-spatial-image) project use DataTree for precisely this purpose.

## What has limited adoption by Biologists?

Given the benefits of switching to `Xarray`, why aren’t more biologists using it? Is it secretly not as good as this blog claims?

As a long-time user of `Xarray` for microscopy data, I had the same question, so I spent February and April 2025 reaching out to scientists and scientific software developers across various fields of biology to answer it. From those discussions, I’ve found that three core reasons have prevented biologists who are already using Python from adopting `Xarray`.

### Awareness and Examples

Many biologists have just never heard of `Xarray`. This is because the geosciences community created Xarray, and there wasn’t enough community overlap for the word to spread to biologists.

A related issue is that the examples and tutorials are geoscience-centric. I admit that when I first read the xarray docs, I was discouraged and thought it wouldn’t work for my microscopy data. Fortunately, I eventually rediscovered Xarray, mentally translated the examples to biology, and found it incredibly useful.

### Technical Barriers

Once a potential user is convinced of `Xarray`'s value, they may still face technical barriers. Ranging from rough edges to missing features, however, none are insurmountable. An example of a rough edge is that, as of May 2025, you cannot use integers as keys in a `DataTree`. That is a problem, as integers are a natural key to use when tracking single cell lineages. Rough edges like this one haven’t been smoothed over yet because there has not been a user base of biologists using `Xarray`, discovering them, and raising issues to get them fixed.

Until very recently, a missing feature was allowing `Xarray` coordinates to be more flexible than a fully instantiated array. Allowing for analytical transforms and having more flexible coordinates is critical to supporting Volumetric imaging applications. Excitingly, in February 2025, initial support for this was [merged](https://github.com/pydata/xarray/pull/9543)!

Another area of potential improvement is support for sparse arrays. Many biology datasets are quite sparse, so robust support is a key feature. Xarray does have support for sparse arrays, but there are still open issues, for example [Issue 3212](https://github.com/pydata/xarray/issues/3213).

### Data Loading/Lack of Integration

Finally, we have been limited by a lack of integration with existing software tools. First, in loading the outputs of other tools into `Xarray` (do they have a `to_xarray` method?), and second, in other tools accepting `Xarray` arrays and using the extra features. For example, [Napari](https://napari.org/stable/) has had a long-standing [open issue](https://github.com/napari/napari/issues/14) about using `Xarray` to add extra information to dimension sliders.

## Call To Action

`Xarray` has fantastic potential to accelerate our ability to perform and share biological analyses and accelerate discovery. To realize this potential, there are a few things we as a community need to do.

The first thing is to consider what we mean by “community”. There are two separate communities with some overlap: `Xarray` developers and biologists interested in using `Xarray`.

### What can Xarray Do

As a community of contributors to `Xarray`, we need to:

- **Support**: Be responsive to technical limitations and bugs in Xarray that affect biologists
- **Educate**: cross-post about improvements in Xarray to spaces with biologists

### What can Biologists Do?

**Try** using `Xarray` for your data. Find the smallest, most straightforward way to get your data into Xarray and start using it.

Make sure to **ask for help** when you need it. To do so:

- Post on forums (e.g., [image.sc](https://forum.image.sc/), or the [Xarray Github Discussions](https://github.com/pydata/xarray/discussions))
- Join the new Xarray for Biology office hours [TODO LINK]
- Book one on one time with Ian [TODO LINK]

Share how you did it with your colleagues and report bugs and feature requests to Xarray.

If you have a success story, then you should share it! For example, via a short blog post here.

### What can the Xarray-Bio Community do?

Anyone already using `Xarray` to work with biology data is uniquely well-positioned to help speed adoption.  We have three core tasks to grow the number of us.

**Build** and then **share** tools that use `Xarray` to do useful things, such as building domain-specific visualization tools that use Xarray metadata to build the visualizations. Or solving any problems that you run into, if it bothers you, it likely bothers someone else and they’ll be happy to use your solution.

**Contribute** by commenting on Xarray issues with how they affect biology use cases, and working on bug fixes and new features.

**Support** other biologists learning to use Xarray. Respond to forum posts and help budding users, write and share small examples of using Xarray with biology data. Teach tutorials to your peers.

My current role is an “Xarray community Developer” focusing on biological applications. So for my part, I’m always happy to talk to you about whether Xarray might be a good fit for your biology data. Please reach out if you have a question! I’m `@ianhi` on most platforms. You can also join our new Xarray in Biology office hours [LINK], or book some time with me to talk Xarray and Biology [here](https://calendly.com/ian-earthmover/30min).

## Looking Forward

`Xarray` has already demonstrated its value to biologists when it is used. If we continue to work toward using this tool, it will be a significant step toward having standardized, interoperable, metadata-rich datasets, maintainable workflows, and easier interactive analysis. This will benefit the geosciences community with contributions and benefit biologists by avoiding duplication of effort.

This blog post addressed biology as a broad topic. In future posts, I will explore domain-specific insights and examples in fields such as microscopy, cryo-EM/ET, x-ray crystallography data, high-throughput screening, etc.. If you are interested in talking about this, helping write posts, or otherwise getting involved, please don’t hesitate to reach out.

The future of `Xarray` in biology is bright if we work together to realize it.
