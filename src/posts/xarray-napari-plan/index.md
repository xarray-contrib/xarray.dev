---
title: 'Xarray ❤️ napari'
date: '2025-10-20'
authors:
  - name: Ian Hunt-Isaak
    github: ianhi
  - name: Tim Monko
    github: TimMonko
summary: "The Napari and Xarray teams' plan to combine the power of Napari and Xarray "
---

# Xarray ❤️ napari

<Note>
  This post is cross-posted on the [napari
  blog](https://napari.org/stable/blog/napari-xarray.html)
</Note>

## TL;DR

Making napari and Xarray work better together will benefit many users. This has been long desired by the community but due to various roadblocks never implemented. At the SciPy 2025 sprints we formed a plan to implement a stronger integration.

## What and Why

[napari](https://napari.org/stable/) is a high-performance, GPU-backed multidimensional array viewer with support for physical coordinates, data annotation, 2 and 3D visualization, and a plugin infrastructure, allowing users to customize it to their needs.

<div style={{ textAlign: 'center' }}>
  <video
    width='100%'
    controls
    autoPlay
    muted
    loop
    aria-label='Video of napari in action showing multidimensional image visualization'
    title='napari GUI demonstration - Biological data'
  >
    <source
      src='https://napari.org/stable/_static/images/tribolium.webm'
      type='video/webm'
    />
    Your browser does not support the video tag.
  </video>
</div>

However, there are still several key pain points around managing image metadata when using napari.

- Most users think in physical units (microns, lat/lon) rather than pixels
- Re-indexing dimensions (e.g. Fiji's Stack to HyperStack) is difficult with unnamed dimensions
- Dimensionality reductions can lead to misaligned axes between layers, and between layers and the slider dim names
  - For example, in the video below there are two arrays in napari. The images with shape `TZYX` and the masks with shape `TYX`. napari right-aligns axes which means that the slider names can't match both images. The `TYX` images will use the `Z` slider for their time dimension! This means the masks will always go out of the sync with the images.

<div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
  <iframe
    width='100%'
    style={{ maxWidth: '800px', aspectRatio: '16/9' }}
    src='https://www.youtube.com/embed/b3j4GkYKkW8?autoplay=1&mute=1&loop=1&playlist=b3j4GkYKkW8'
    title='Napari Misaligned arrays'
    aria-label='Video showing how napari misaligns arrays with different shapes'
    frameBorder='0'
    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
    referrerPolicy='strict-origin-when-cross-origin'
    allowFullScreen
  ></iframe>
</div>

[Xarray](https://xarray.dev/) is a powerful multidimensional array library with deep support for labelled axes and managing metadata. If napari could understand Xarray objects' metadata, then this integration would provide a solution to all of these pain points.

To get a sense of the benefits Xarray provides, read the [Accelerating Biological Analysis with Xarray](https://xarray.dev/blog/xarray-biology) blog post and look at the rich repr of an `Xarray.DataArray` for an image stack:

<div style={{ textAlign: 'center', margin: '20px 0' }}>
  <iframe
    src='/posts/xarray-biology/dataarray-repr.html'
    width='100%'
    height='600'
    frameBorder='0'
    style={{ border: '1px solid #ccc', borderRadius: '5px' }}
  ></iframe>
</div>

Having napari leverage the Xarray metadata will not only improve the experience of napari users but also provide Xarray users with a polished interactive visualization tool.

There is progress toward this already. Some of the most successful plugins for napari are [napari-aicsimageio](https://github.com/AllenCellModeling/napari-aicsimageio) which is built on top of [aicsimageio](https://github.com/AllenCellModeling/aicsimageio) and its successor [bioio](https://bioio-devs.github.io/bioio/OVERVIEW.html), which use xarray to manage their data and metadata.

<div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
  <iframe
    width='100%'
    style={{ maxWidth: '800px', aspectRatio: '16/9' }}
    src='https://www.youtube.com/embed/xGYhIomzTjw?autoplay=1&mute=1&loop=1&playlist=xGYhIomzTjw'
    title='geo in napari'
    aria-label='Video of napari displaying geographic data with coordinate systems'
    frameBorder='0'
    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
    referrerPolicy='strict-origin-when-cross-origin'
    allowFullScreen
  ></iframe>
</div>

This potential for napari and Xarray to bring out the best in each other is not a new insight.

The second oldest open issue on napari [`#14`](https://github.com/napari/napari/issues/14) is titled "Pass xarray to napari-gui for autolabeling sliders." That issue's age is a testament to the difficulty of the problems involved in this integration.

But something being hard is not a reason not to try to do it. In that spirit both the napari and Xarray developers are committed to improving the integration of napari and Xarray. This blog post is the kickoff of that collaboration.

## How

### SciPy 2025

Thanks to support from the Chan Zuckerberg Institute the napari, Xarray, and [CellProfiler](https://cellprofiler.org/) team members were able to attend SciPy 2025. At the sprints members of these three teams—Ian Hunt-Isaak, Tim Monko, Nodar Gogoberidze, Beth Cimini, Peter Sobolewski and Carol Willing—collaborated to develop a plan for enhancing the integration of Xarray with napari. The rest of this blog post is the initial roadmap we came up with for better integration of Xarray and napari.

### Get Involved

This is a community effort, so your contributions and thoughts are very welcome! To get involved in shaping this vision of the future, please join the napari [Zulip](https://napari.zulipchat.com/) and introduce yourself on this [introductions issue](https://github.com/napari/napari-xarray/issues/8) in the napari Xarray repository.

### **🗺️ Roadmap**

To fully realize the potential of an integration between Xarray and napari, some deep changes in napari may be required. Therefore, we have developed a phased plan that progresses from simple to more complex enhancements, culminating in solutions that require more fundamental changes to how napari handles data.

In addition to the roadmap below we are maintaining a meta-issue that tracks all relevant issues in napari. That issue is [napari-xarray #11](https://github.com/napari/napari-xarray/issues/11).

#### 1: Basic Metadata Mapping (Proof of Concept)

This first step is the easiest, as it requires no changes to napari's core and can be implemented in a simple script or plugin.

**Goal:** Ingest Xarray data into napari's layer metadata to provide immediate context to the user.

**Key Functionality:**

- Auto-label sliders with Xarray dimension names (e.g., `'Z'`, `'Time'`)
- Assign layer names from Xarray's `.name` attribute
- Automatically transform:
  - [`DataArray`](https://docs.xarray.dev/en/latest/user-guide/data-structures.html#dataarray) -> Layer
  - [`Dataset`](https://docs.xarray.dev/en/latest/user-guide/data-structures.html#dataset) -> Multiple Layers
  - [`DataTree`](https://docs.xarray.dev/en/latest/user-guide/data-structures.html#datatree) -> Multiple Layers + Pyramidal Viewing (if applicable)

**Implementation:** Script or plugin level, no napari core changes required. This will be an opportunity

**napari enhancement** napari has laid the groundwork for success here with the ability to include `axis_labels` and `units` on layers in [this pr](https://github.com/napari/napari/pull/6979). The remaining work is to close the gap by adding connections from the napari layer list to the napari dims model. This improvement will help all napari users, not just those using xarray.

#### 2: Meaningful Physical Units (Enhancement)

The next step is to map array indices to Xarray coordinates. This is harder than the previous step as it involves napari's viewer dims model, which is more complex than the layer metadata.

**Goal:** Display physical values instead of array indices in napari sliders and use coordinate information for proper scaling.

**Key Functionality:**

- Show slider values as physical units (e.g., `20.5` microns) using Xarray [Coordinates](https://docs.xarray.dev/en/latest/user-guide/data-structures.html#coordinates)
- Use Xarray coordinates to map pixel sizes for accurate scale bars

**Implementation:** First at script/plugin level, with eventual integration into napari core.

#### 3: "Magic" Reordering (Complex)

Today, if you mix up the order of your axes in non-standard way (e.g. `lat, time, lon`, or `XCZSYT`) and pass it to napari it will display as is, from right to left. This is because napari treats all axes equally, and does not know about or distinguish spatial or temporal dimensions! With knowledge of metadata and the conventions of a field napari could magically re-order the array to display in the "correct" order, with spatial dimensions on the right. This is a significant jump in complexity due to the "magic" involved - the system will need to correctly guess user intent, which can be challenging.

**Goal:** Handle a few clear cases of problematic dimension ordering, not solve the general case of arbitrary reordering.

**Key Functionality:**

- Focus on well-defined, common problematic orderings with clear solutions
- Recognize specific patterns
  - `lat, time, lon` -> `time, lat, lon`
  - `XTCZYS` -> `STCZYX`
- Start with a small set of clear examples rather than attempting to solve all possible cases
- Persist user-defined dimension mappings and schemas across sessions

**Implementation:** Plugin with access to napari internals, requires deep integration with viewer logic.

#### 4: User Personas (Plugin System)

The "magic" reordering naturally leads to issues where different fields of science have different conventions for what the "right" thing to do is. napari can't possibly know every convention across different scientific domains. napari now supports a [startup script](https://github.com/napari/napari/pull/8188) which can serve as an initial hook for this functionality.

**Goal:** Enable domain-specific configuration through pluggable personas with well-defined schemas for converting Xarray data into how napari should interpret it.

**Key Functionality:**

- Define pluggable persona system with well-established schemas (e.g., Microscopy, Geospatial, Astronomy)
- Each persona provides rules for dimension ordering, naming conventions, and visualization defaults
- For example, a Microscopy persona would define different defaults than a Geospatial persona
- Allow users to create and share custom personas for their specific domains
- Persistent user preferences and persona selection across sessions

**Implementation:** Plugin mechanism and API provided by napari for extensible persona definitions.

#### 5: Big Lift: New Dims Model (Major Architecture Change)

Taking the lessons and user feedback from the earlier steps into account, we work to update napari's internal data model to be name-aware in addition to its current index-aware state. This is a major architectural change that addresses long-standing issues.

**Goal:** Transform napari's core to natively understand and preserve named dimensions throughout all operations.

**Key Functionality:**

- Preserve named dimensions and their relationships through transformations like slicing or max projections
- Unify layer dimensions and viewer dimensions under a name-aware system
- Replace fragile index-based state (0, 1, 2...) with persistent named dimensions ('time', 'channel', 'z')
- Ensure viewer state persists correctly when layers are added or removed
- Make napari viewer respect and preserve Xarray's descriptive dimension model

**Implementation:** Deep changes to napari core architecture - significant development effort required. This addresses years-old open issues and fundamental limitations.
