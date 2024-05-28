---
title: 'Major updates to the Xarray tutorial'
date: '2024-05-31'
authors:
  - name: Deepak Cherian
    github: dcherian
  - name: Scott Henderson
    github: scottyhq
  - name: Jessica Scheick
    github: JessicaS11
  - name: Emma Marshall
    github: e-marshall
  - name: Tom Nicholas
    github: TomNicholas
  - name: Anderson Banihirwe
    github: andersy005
  - name: Negin Sobhani
    github: negin513
  - name: Don Setiawan
    github: lsetiawan

summary: 'The Xarray tutorial has received a major upgrade!'
---

## TL;DR

Over the past several years, we have worked to significantly revamp the [Xarray tutorial](https://tutorial.xarray.org). The tutorial repository is geared towards groups wanting to run workshops to teach Xarray to both new and seasoned practioners. Consider using it for your workshop! Or sign up for the upcoming [SciPy 2024 Workshop](https://cfp.scipy.org/2024/talk/HHVZ9T/) that we'll be running.

## Approach

The Xarray Tutorial Website https://tutorial.xarray.org hosts a curated selection of Jupyter Notebooks that illustrate concepts, common usage patterns, and long-form examples of using Xarray for data analytics. 

We reworked existing material to bite-sized chunks that can be remixed as needed. For example, rather than organizing material by specific workshops at a top-level, we now organize by topic and then build a learning path for each event. This way future learners can benefit from a guided tour through the material.
For example see the [Fundamental](https://tutorial.xarray.dev/overview/fundamental-path/README.html) and [Intermediate](https://tutorial.xarray.dev/overview/intermediate-path/README.html) learning paths that were presented at SciPy 2022 and SciPy 2023 respectively.

Our hope is that this material will serve as a great starting point for anyone anywhere looking to deliver a Xarray tutorial. 

## Redesigned with Jupyterbook

We chose to use [Jupyterbook](https://jupyterbook.org/en/stable/intro.html) as a the tool to render a static HTML version of the tutorial website. We think this has worked well, because it allows you to keep small Jupyter Notebooks in a repository while guaranteeing that code in those notebooks can be exectuded without errors. It also provides nice linking capabilities directly to the Xarray API documentation. Finally, Jupyterbook simply produces a nice-looking, navigable, and searchable website of all the material. See the before/after image:

<img
  src='/posts/tutorial/tutorial-before-after.png'
  alt='Tutorial outline before/after'
  width='60%'
/>

We've been particularly happy with the [`jupyterlab-myst`](https://github.com/executablebooks/jupyterlab-myst) extension, which extends the basic Markdown rendering with in JupyterLab and ensures Notebooks rendered as a static webpage look identical to an exectuable notebook in the JupyterLab interface.

Finally, we think the Xarray Tutorial is a great way to engage new contributors to Open Source Sofware Development. Every Jupyterbook webpage has a GitHub icon dropdown in the upper right hand corner with a 'Open Issue' and 'Suggest Edit' button. This really simplifies the process of community development and we love that during workshops people totally new to the library have made improvements to the content as we run through it. The repository now has over 30 contributors! 


## New and improved material

In addition to redesigning the layout, we've improved existing material and added a lot of new material focused on intermediate and advanced concepts:

1. Revamped fundamentals

- Data structures, indexing, alignment & broadcasting

1. All New Intermediate level material

- Accessors
- apply_ufunc
- Computational Patterns
- Advanced, Vectorized, and Boolean indexing

## Try it out

The Xarray Tutorial is designed for interactivity, with coding exercises and configuration of one-click free hosted computing environments. At Past SciPy workshops we've successfully used [MyBinder.org](https://tutorial.xarray.dev/overview/get-started.html) and [GitHub Codespaces](https://tutorial.xarray.dev/workshops/scipy2023/README.html#github-codespaces) to ensure 100+ attendees can run code examples in JupyterLab.

## Come contribute

[Contributions](https://tutorial.xarray.dev/CONTRIBUTING.html) are very welcome and could range from fixing typos, to improving the presentation, and even contributing all new material. We are especially interested in expanding the current use-case content to include more examples with datasets from a broad range of scientific domains. Check out [open issues](https://github.com/xarray-contrib/xarray-tutorial/issues) on the repository for ways to contribute!

## Acknowledgments

This work was partially supported by NASA's Open Source Tools, Frameworks, and Libraries (OSTFL)
grant 80NSSC22K0345 "Enhancing analysis of NASA data with the open-source Python Xarray Library".
