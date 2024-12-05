---
title: 'Xarray x NASA: xarray.DataTree for hierarchical data structures'
date: '2024-12-04'
authors:
  - name: Tom Nicholas
    github: tomnicholas
  - name: Owen Littlejohns
    github: owenlittlejohns
  - name: Matt Savoie
    github: flamingbear
  - name: Eni Awowale
    github: eni-awowale
  - name: Alfonso Ladino
    github: aladinor
  - name: Justus Magin
    github: keewis
  - name: Stephan Hoyer
    github: shoyer
summary: 'The new xarray.DataTree class allows working with netCDF/Zarr groups, brought to you in collaboration with NASA!'
---

## tl;dr

[`xarray.DataTree`](https://docs.xarray.dev/en/stable/user-guide/data-structures.html#datatree) has been [released](https://github.com/pydata/xarray/discussions/9680) in [v2024.10.0](https://github.com/pydata/xarray/releases/tag/v2024.10.0), and the prototype [`xarray-contrib/datatree` repository](https://github.com/xarray-contrib/datatree) archived, after collaboration between the xarray team and [NASA ESDIS](https://www.earthdata.nasa.gov/about/esdis). 🤝

## Why trees?

Xarray users have been [asking](https://github.com/pydata/xarray/issues/4118) for a way to handle multiple netCDF4 groups [since at least 2016](https://github.com/pydata/xarray/issues/1092). Such netCDF4/Zarr groups are the on-disk representation of a general problem of handling hierarchies of related but non-alignable array data. Real-world datasets (such as [climate model intercomparisons](https://medium.com/pangeo/easy-ipcc-part-1-multi-model-datatree-469b87cf9114)) often fall into this category, and users wanted a way to work with such hierarchical data in-memory and a way to interact with it on disk.

## What is a DataTree?

Our solution is the new high-level container class `xarray.DataTree`.
It acts like a tree of linked `xarray.Dataset` objects, with alignment enforced between variables in sibling nodes but not between parents and children. It can be written to and opened from formats containing multiple groups, such as netCDF4 files and Zarr stores.

For more details please see the [high-level description](https://docs.xarray.dev/en/stable/user-guide/data-structures.html#datatree), the [dedicated page on hierarchical data](https://docs.xarray.dev/en/stable/user-guide/hierarchical-data.html), and the [section on IO with groups](https://docs.xarray.dev/en/stable/user-guide/io.html#groups) in the xarray documentation.

## Deprecation

If you previously had used the `DataTree` prototype in the [`xarray-contrib/datatree` repository](https://github.com/xarray-contrib/datatree), that has now been archived and will no longer be supported. Instead we encourage you to migrate to the implementation of `DataTree` that you can import from xarray, following the [migration guide](https://github.com/pydata/xarray/blob/main/DATATREE_MIGRATION_GUIDE.md).

## Big moves

This was a big feature addition! For a [decade](https://github.com/pydata/xarray/discussions/8462) there have been 3 core public xarray data structures, now there are 4: [`Variable`](https://docs.xarray.dev/en/stable/generated/xarray.Variable.html#xarray.Variable), [`DataArray`](https://docs.xarray.dev/en/stable/generated/xarray.DataArray.html#xarray.DataArray), [`Dataset`](https://docs.xarray.dev/en/stable/generated/xarray.Dataset.html#xarray.Dataset), and now [`DataTree`](https://docs.xarray.dev/en/stable/generated/xarray.DataTree.html#xarray.DataTree).

Datatree represents arguably one of the single largest new features added to xarray in 10 years - the migration of the existing prototype alone added >10k lines of code across [80 pull requests](https://github.com/pydata/xarray/pulls?q=is%3Apr+label%3Atopic-DataTree+is%3Aclosed), and the resulting datatree implementation now contains contributions from at least 25 people.

We also had to resolve some really [gnarly design questions](https://github.com/pydata/xarray/pull/9063) to make it work in a way we were happy with.

## How did this happen?

DataTree didn't get implemented overnight - it was a multi-year effort that took place in a number of steps, and there are some lessons to be learned from the story.

In March 2021, the xarray team submitted a [funding proposal](https://zenodo.org/records/5484176) to the [Chan-Zuckerberg Initiative](https://chanzuckerberg.com/eoss/) to develop "TreeDataset", citing bioscience use cases such as [microscopy image pyramids](https://spatialdata.scverse.org/en/latest/design_doc.html). Unfortunately whilst we've been lucky to [receive CZI funding before](https://chanzuckerberg.com/eoss/proposals/xarray-multidimensional-labeled-arrays-and-datasets-in-python/), on this occasion we didn't win money to work on the datatree idea.

In the absence of dedicated funding for datatree, Tom then used some time whilst at the [Climate Data Science Lab](https://ocean-transport.github.io/cds_lab.html) at Columbia University to take a initial stab at the design in August 2021 - writing the first implementation on an overnight Amtrak! This simple prototype was released as a separate package in the [`xarray-contrib/datatree` repository](https://github.com/xarray-contrib/datatree), and steadily gained a small community of intrepid users. It was driven partly by the use case of [climate model intercomparison datasets](https://medium.com/pangeo/easy-ipcc-part-1-multi-model-datatree-469b87cf9114).

A separate repository was chosen for speed of iteration, and to be able to more easily [make changes](https://github.com/xarray-contrib/datatree/blob/7ba05880c37f2371b5174f6e8dcfae31248fe19f/README.md#development-roadmap) without worrying as much about [backwards compatibility](https://github.com/pydata/xarray/issues/9854) as code in xarray's main repo does. However the separate repo meant that the prototype `datatree` library was not fully integrated with xarray's main codebase, limiting possible features and requiring fragile dependencies on private xarray internals.

The prototype then sat there for 2 years, until NASA ESDIS approached the xarray core team in August 2023. ESDIS devs wanted the ability to work with entire hierarchical files, and had experimented with the prototype version of datatree, but they wanted datatree functionality to be migrated upstream into xarray's main repository so there would be more guarantees of long-term API stability and support.

Amazingly the NASA team were able to offer engineer time, so starting in late 2023 Owen, Matt, and Eni (NASA) worked on migrating datatree into xarray upstream, with regular supervision from Tom, Justus, and Stephan (existing xarray core devs).

This second stage of development allowed us to reduce the bus factor on the datatree code, sanity check the original approach, and it gave us a chance to make some significant improvements to the design without backwards-compatibility concerns (for example enabling the [new "coordinate inheritance" feature](https://docs.xarray.dev/en/stable/user-guide/hierarchical-data.html#alignment-and-coordinate-inheritance)).

## Lessons for future collaborations

This development story is different from the more typical scientific grant funding model - how did that work out for us?

The scientific grant model for funding software expects you to present a full idea in a proposal, wait 6-12 months to hopefully get funding for it, then implement the whole thing during the grant period. In contrast datatree evolved over a gradual process of moving from ideas to hacky prototype to robust implementation, with big time gaps for user feedback and experimentation. The migration was completed by developer-users who actually wanted the feature, rather than grant awardees working in service of a separate and maybe-only-theoretical userbase.

Overall while the migration effort took longer than anticipated we think it worked out quite well!

### Pros:

- **Zero overhead** - the existing xarray team did not to have to write a proposal to get developer time, and there was literally zero paperwork inflicted (on them at least).
- **Certainty of funding** - writing grant proposals is a lottery, so the time invested up front doesn't even come with any certainty of funding. Collaborating with another org has a much higher chance of actually leading to more money being available for developer time.
- **Time efficient** - a xarray core dev spending 10% of their time directing someone who is less familiar with the codebase but has more time is an efficient use of relative expertise.
- **Bus factor** - the new contributors reduced the bus factor on the datatree code dramatically.
- **User-driven Development** - it makes sense to have actual interested user communities involved in development.
- **Stakeholder representation** - after officially adding Owen, Matt and Eni to the [xarray core team](https://xarray.dev/team), NASA ESDIS has some direct representation in, insider understanding of, and stake in continuing to support the xarray project.

### Cons:

- **Not everyone got direct funding** - it's less ideal that Tom, Justus, and Stephan didn't get direct funding for their supervisory work. In future it might be better to have one of the paid people at the contributing org already be a core xarray team member, or perhaps find some way to pay them as a "consultant".
- **Tricky to accurately scope** out the duration of required work in advance, and hard to "just ship it". We hold the xarray project to high standards and backwards compatibility promises so we want to ensure that any publicly released features don't compromise on quality.

This contributing model is more similar to how open-source software has historically been supported by industry, but perhaps because xarray is primarily developed and used by the scientific community we tend to default to more grant-based funding models.

Overall we think this type of collaboration could work again in future! So if there is an xarray or xarray-adjacent feature your organisation would like to see, **please reach out to us**.

## Go try out DataTree!

Please try datatree out! The hierarchical structure is potentially useful to any xarray users who work with more than one dataset at a time. Simply do 

```python
from xarray import DataTree
```

or 

```python
open_datatree(...)
```
on a netCDF4 file / Zarr store containing multiple groups.

Be aware that as `xarray.DataTree` is still new there will likely be some bugs lurking or places that performance could be improved, as well as as-yet [unimplemented features](https://github.com/pydata/xarray/issues?q=is%3Aissue+is%3Aopen+label%3Atopic-DataTree) (as there always are)!

## Thanks

A number of other people also [contributed to datatree](https://github.com/xarray-contrib/datatree/graphs/contributors) in various ways - particular shoutout to [Alfonso Ladino](https://github.com/aladinor) and [Etinenne Schalk](https://github.com/etienneschalk) for their dedicated attendance at many of the [weekly migration meetings](https://github.com/pydata/xarray/issues/8747)!

## Funding Acknowledgements

- Owen, Eni, and Matt were able to contribute development time thanks to NASA ESDIS.
- Tom was supported first by the Gordon and Betty Moore foundation as part of Ryan Abernathey's [Climate Data Science Lab](https://ocean-transport.github.io/cds_lab.html) at Columbia University, then later by various funders for a fraction of his time through [[C]Worthy](https://www.cworthy.org/).
