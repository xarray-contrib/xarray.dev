---
title: 'Reflecting on Xarray’s first development grant'
date: '2022-06-09'
authors:
  - name: Joe Hamman
    github: jhamman
summary: 'A brief recap of our CZI EOSS grant, accomplishments and learnings.'
---

In early 2020, we submitted a [proposal](https://doi.org/10.6084/m9.figshare.12709556.v1) to the [Chan Zuckerberg Initiative’s (CZI) Essential Open Source Software for Science (EOSS)](https://chanzuckerberg.com/eoss/) grant program. The goal of the proposal was to accelerate progress on key parts of our [roadmap](https://docs.xarray.dev/en/v2022.03.0/roadmap.html), providing dedicated support to augment regular volunteer contributions, enabling work on issues that are often too large to tackle by through volunteer-only contributions. The proposal was funded in late 2020 and our team spent the last year and a half working on a handful of new features and complex internal refactors. Having just closed out the grant, this blog post takes a look at what we proposed and how the development turned out.

## Community Engagement

More than any single feature addition, we felt like a key need for the Xarray project was a concerted focus on understanding and supporting our user community. To this end, we took on three tasks:

1. [Anderson Banihirwe](https://github.com/andersy005) developed a new project website: [xarray.dev](https://xarray.dev) and [this blog](https://xarray.dev/blog). This site includes a high-level introduction to Xarray, an interactive demo using [Pyodide](https://pyodide.org/en/stable/), and pointers to other cross-project resources. We also moved Xarray’s documentation site to a new URL: [docs.xarray.dev](https://docs.xarray.dev).
2. We made numerous improvements to Xarray’s core documentation and extended [tutorial](https://tutorial.xarray.dev/intro.html). Notably, we reworked our [examples gallery](https://docs.xarray.dev/en/stable/gallery.html) and [tutorial page](https://docs.xarray.dev/en/stable/tutorials-and-videos.html). We plan to continue improving these resources.
3. We completed Xarray’s first [user-survey](https://github.com/xarray-contrib/user-survey) in 2021. This gave us a detailed view of our user community and what their use-cases, priorities, and pain points are. Our [2022 user survey is live now](https://docs.google.com/forms/d/e/1FAIpQLSfnMd8UsC1XP1lPuFczl148VfpmwnFu4a0Z94odt1L6U0R0Pw/viewform?usp=sf_link), if you haven’t yet, please take a moment to fill it out. Keep an eye out for a future blog post unpacking the results from these surveys.

## Flexible Grids and Indexes

The second focus area in our proposal was a [long-awaited](https://docs.xarray.dev/en/v2022.03.0/roadmap.html#flexible-indexes) reworking of Xarray’s Indexes in order to better support complex index objects (e.g. MultiIndex or KDTreeIndex). Indexes in Xarray support coordinate-based indexing, slicing, and alignment. [Benoît Bovy](https://github.com/benbovy) led this work which culminated in a very large [Pull Request](https://github.com/pydata/xarray/pull/5692) refactoring the internals of Xarray objects to explicitly include indexes are part of the data model. With the internal refactor in place, it is now possible to develop custom indexes for Xarray objects (see [GH Project #1](https://github.com/pydata/xarray/projects/1) for more detail on the status of this effort). Expect more on this new functionality in another blog post.

## Flexible Storage Backends

Finally, the third focus area in our proposal was a refactor of Xarray’s storage backends to enable reading from and writing to a variety of storage formats. In this work, we wanted to standardize the backend API and support the development and integration of third-party backends through a plugin interface (i.e. [entrypoints](https://packaging.python.org/en/latest/guides/distributing-packages-using-setuptools/#entry-points)). [Aureliana Barghini](https://github.com/aurghs) of [B-Open](https://github.com/aurghs) led this work which, starting with Xarray v0.18, added read-only support for custom backends. Since then, multiple third-party libraries have made use of this new functionality (e.g. [rioxarray](https://corteva.github.io/rioxarray/stable/getting_started/getting_started.html#rioxarray), [cfgrib](https://github.com/ecmwf/cfgrib)). For now, we’ve held off on adding entrypoint support for write operations but hope to see this progress in the [future](https://github.com/pydata/xarray/issues/5954). [GH Project #3](https://github.com/pydata/xarray/projects/3) provides a current view on the status of this topic. If you are interested in writing a custom backend, check out this [step-by-step guide](https://docs.xarray.dev/en/stable/internals/how-to-add-new-backend.html).

## Conclusion

Overall, our first CZI EOSS grant was an overwhelming success. Each of the core areas of our proposal saw significant development progress. We did find however that we were overly optimistic about the rate of development. We ended up needing a 1-year extension to complete the work on the proposal and left a few development tasks in partially completed states. Going forward, we’ll take these learnings into future proposals and grant funded development work.

---

Credits: Joe Hamman ([@jhamman](https://github.com/jhamman)) led the proposal and grant coordination efforts. Stephan Hoyer ([@shoyer](https://github.com/shoyer)), Ryan Abernathey ([@rabernat](https://github.com/rabernat)) and Deepak Cherian ([@dcherian](https://github.com/dcherian)) contributed to the proposal and provided input to the various development efforts. Benoît Bovy ([@benbovy](https://github.com/benbovy)), Anderson Banihirwe ([@andersy005](https://github.com/andersy005)), Alessandro Amici
([@alexamici](https://github.com/alexamici)) and Aureliana Barghini
([@aurghs](https://github.com/aurghs)) contributed to the proposal and made significant contributions to Xarray under this grant.
