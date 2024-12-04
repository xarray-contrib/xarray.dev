---
title: 'Xarray x NASA: New xarray.DataTree for hierarchical data structures'
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
summary: "The new xarray.DataTree class allows working with netCDF/Zarr groups, brought to you via collaboration with NASA!"
---

## TL;DR

``xarray.DataTree`` has been released, and the prototype [`xarray-contrib/datatree` repository](https://github.com/xarray-contrib/datatree) archived, after collaboration between the xarray team and [NASA ESDIS](https://www.earthdata.nasa.gov/about/esdis).

ESDIS OR EOSDIS??

## Why trees?

- Motivate why users wanted a hierarchical structure (e.g. https://github.com/pydata/xarray/issues/4118 and https://github.com/pydata/xarray/issues/1092)

## What is a DataTree?

- Very brief explanation of the solution we have ended up with
  - Doesn't need to explain much about actually using datatree - that should be covered by pointing people to the docs.

## A Big Addition!

- Emphasise that this is a big deal
  - Arguably the single largest feature added to xarray in 10 years? (I think it is by LoC)
  - Metrics for # commits, LoC, contributors
  - Some really gnarly design questions (link to issues about inheritance)
  - For a decade there have been 3 public xarray data structures, now there are 4 (`Variable`, `DataArray`, `Dataset`, and now `DataTree`). LINKS
- Mention the prototype in xarray-contrib/datatree repo
  - Explain how old repository is now archived
  - And link to migration guide https://github.com/pydata/xarray/issues/8807#issuecomment-2338869819

## How did this happen?

DataTree didn't get implemented overnight - it was a multi-year effort that took place in a number of steps.

Initially, the xarray team applied for funding from the [Chan-Zuckerberg initiative]() (LINK?) in March 2021 to develop something like datatree, citing bioscience use cases (e.g. [microscopy image pyramids](https://spatialdata.scverse.org/en/latest/design_doc.html)). Unfortunately whilst we've been lucky to [receive CZI funding before](https://chanzuckerberg.com/eoss/proposals/xarray-multidimensional-labeled-arrays-and-datasets-in-python/), on this occasion we didn't win money to work on the datatree idea.

In the abcense of dedicated funding for datatree, Tom then used some time whilst at the [Climate Data Science Lab](https://ocean-transport.github.io/cds_lab.html) at Columbia University to take a initial stab at the design in August 2021 - writing the first implementation on an overnight Amtrak! This simple prototype was released as a separate package in the [`xarray-contrib/datatree` repository](https://github.com/xarray-contrib/datatree), and steadily gained a small community of intrepid users.

A separate repository was chosen for speed of iteration, and to [avoid](https://github.com/xarray-contrib/datatree/blob/7ba05880c37f2371b5174f6e8dcfae31248fe19f/README.md#development-roadmap) giving the impression that these early experiments would have the same level of [long-term support promised](https://github.com/pydata/xarray/issues/9854) for code in xarray's main repo. However this meant that the prototype datatree was not fully integrated with xarray's main codebase, limiting possible features and requiring fragile dependencies on private xarray internals.

The prototype then sat there for 2 years, until NASA ESDIS approached the xarray core team in August 2023. ESDIS devs wanted the ability to work with entire hierarchical files, and had experimented with the prototype version of datatree, but they wanted datatree functionality to be migrated upstream into xarray `main` so there would be more guarantees of long-term API stability and support. 

Amazingly the NASA team were able to offer engineer time, so starting in early 2024 Owen, Matt, and Eni (NASA) then worked on migrating datatree into xarray upstream, with supervision from Tom, Justus, and Stephan (existing xarray core devs).

This second stage of development allowed us to reduce the bus factor on the datatree code, sanity check the original approach, and it gave us a chance to make some signficant changes to the design without worrying too much about backwards-incompatibility (for example enabling the [new "coordinate inheritance" feature](https://docs.xarray.dev/en/stable/user-guide/hierarchical-data.html#alignment-and-coordinate-inheritance)).

## Lessons for future collaborations

This gradual process of moving from idea to prototype to robust implementation is arguably a better model of 

 - Took a bit longer than anticipated but otherwise worked out quite well
  - Got 3 new xarray core developers now - so NASA has more explicit representation
  - Was a lot easier for xarray team not to have to write a proposal to get developer time
  - Ideal in the sense of literally zero overhead
  - Also core dev spending 10% time spent directing someone with more time is efficient use of relative expertise
  - Less ideal that Tom/Justus/Stephan didn't get paid for the work
  - In future better to have one of the paid people at the contributing org already be a core dev
  - This approach could work again in future!

- Officially added Owen, Matt and Eni to the xarray core team, which also gives NASA some direct representation.

## Go try it out!

- Implore people to try datatree out, but also to report bugs / suggestions as it's still being built up to its full potential.

## Thanks

A number of other people also [contributed to datatree](https://github.com/xarray-contrib/datatree/graphs/contributors) in various ways - particular shoutout to [Alfonso Ladino](https://github.com/aladinor) and [Etinenne Schalk](https://github.com/etienneschalk) for their dedicated attendance at many of the weekly migration meetings!

## Funding Acknowledgements

- Owen, Eni, and Matt were able to contribute development time thanks to NASA ESDIS.
- Tom was supported first by the Gordon and Betty Moore foundation as part of Ryan Abernathey's [Climate Data Science Lab](https://ocean-transport.github.io/cds_lab.html) at Columbia University, then later by various funders for a fraction of his time through [[C]Worthy](https://www.cworthy.org/).