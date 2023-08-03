---
title: 'Major updates to the Xarray tutorial'
date: '2023-08-05'
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

Over the past two years, we have worked to substantially revamp the [Xarray tutorial](https://tutorial.xarray.org). See the before/after image:

<img
  src='/posts/tutorial/tutorial-before-after.png'
  alt='Tutorial outline before/after'
  width='60%'
/>

The difference is stark!

## Approach

We worked to present concepts and reworked the material to bite-sized chunks that can be remixed as needed.
Rather than organize material by event, we now organize by topic and then build a learning path for each event.
This way future learners can benefit from a guided tour through the material.
For example see the [Fundamental](https://tutorial.xarray.dev/overview/fundamental-path/README.html) and [Intermediate](https://tutorial.xarray.dev/overview/intermediate-path/README.html) learning paths that were presented at SciPy 2022 and SciPy 2023 respectively.
Our hope is that this material will serve as a great starting point for anyone anywhere looking to deliver a Xarray tutorial.

## New and improved material

1. Full redone fundamentals material

- Data structures, indexing, alignment & broadcasting

1. All New Intermediate level material

- Accessors
- apply_ufunc
- Computational Patterns
- Advanced, Vectorized, and Boolean indexing

## Try it out

- Binder
- VS Codespaces

## Come contribute

While a major improvement, this material is clearly a work in progress and could use help from you!
[Contributions](https://tutorial.xarray.dev/CONTRIBUTING.html) are very welcome and could range from fixing typos, to improving the presentation of material, and even contributoing all new material.

We can also substantially improve the way this tutorial material is linked to in the main Xarray documentation ([Github issue](https://github.com/pydata/xarray/issues/8008)).

Come help out!

## Acknowledgments

This work was partially supported by NASA's Open Source Tools, Frameworks, and Libraries (OSTFL)
grant 80NSSC22K0345 "Enhancing analysis of NASA data with the open-source Python Xarray Library".
