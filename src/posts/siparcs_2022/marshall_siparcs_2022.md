---
title: 'Reflection on 2022 NCAR summer internship: "Leveraging Xarray for reproducible and scalable analysis of remote sensing data in the cloud"'
date: '2022-10-27'
authors:
  - name: Emma Marshall
    github: e-marshall
---

I spent the 2022 summer as a Summer Internships in Parallel Computational Sciences ([SIParCS](https://www2.cisl.ucar.edu/outreach/internships#technical)) intern at the National Center for Atmospheric Research ([NCAR](https://ncar.ucar.edu/)) in Boulder, CO, working on Xarray. The advertisement for the project highlighted working on cloud-based remote sensing data workflows using Xarray – something that was intriguing to me as a geography Ph.D. student at the University of Utah who has spent many hours downloading and organizing data locally and on HPC servers. My prior experience with cloud-computing and cloud-hosted resources was very minimal; I’d heard people discuss cloud-hosted data and was somewhat familiar with the terms ‘AWS’, ‘S3 bucket’, ‘Zarr’, etc. but was otherwise unfamiliar with the landscape of cloud resources.

My previous graduate work helped me to develop some coding skills, which was how I first learned of and worked with Xarray. However, I felt fairly insecure in my coding knowledge and that I didn’t know much about how ‘real’ programmers worked or what ‘real’ code looked like. I largely avoided using GitHub, not understanding that in addition to making my life harder, this was keeping me isolated from a community of people working on similar problems who were often eager to share knowledge/experience and tips along the way.

A few months out, I’m grateful for the impactful experience I had this summer. I gained skills and experience writing more efficient code, incorporating version control into my work, and collaborating on GitHub. I also had the opportunity to begin writing my own software packages and learn how to access and work with cloud-hosted data. These all related to my main internship project which was to develop tutorials for working with remote sensing data using xarray with the goal of increasing the accessibility and user base of these datasets. Most of all, working with my mentors and getting to interact with other interns at NCAR made this experience feel more like fun than actual work and left me feeling motivated to continue developing my own skills and stay involved in the open-source software community.

## What did I do?

### Developed Jupyter Book tutorials

Most of my work this summer focused on developing educational resources to help remote sensing data users incorporate Xarray into their workflows. This project was motivated by recent increases in the availability of cloud-based datasets and computational tools, and in preparation for increasing data volume from missions like [NISAR](https://nisar.jpl.nasa.gov/) and [SWOT](https://swot.jpl.nasa.gov/). These advances are exciting because they offer the potential to democratize scientific participation and reduce barriers to entry related to computational and storage resources ([Gentemann et al., 2021](https://doi.org/10.1029/2020AV000354)). Alongside these exciting developments is the need for accessible and informative educational resources that accompany data and tools.

The Jupyter Book tutorials each focus on a different remote sensing dataset and contain Jupyter Notebooks detailing common steps of a research workflow. They demonstrate working with global ice velocity measurements derived from a combination of optical and synthetic aperture radar (SAR) satellite imagery as well as SAR radiometric terrain corrected (RTC) backscatter imagery. These data make use of cloud-native processing chains and cover a range of cloud-native and traditional data types and the tutorials include examples of reading directly from object storage as well as working with data locally. In choosing these examples, we focused on time series datasets that lend themselves to working with Xarray and provide valuable information about Earth’s surface processes that can be used in a range of climate-related applications such as glacier dynamics, hydrology, hazards, and studies of vegetative cover and extent.

#### Approach

In developing these tutorials, I tried to imagine what kind of resources would have helped me when I was first beginning to work with remote sensing data. This included

- Emphasizing the use of narrative text to explain concepts,
- Linking to documentation and other online resources (often ones that I found useful when I was stuck on something), and
- Preserving and explaining errors I encountered while developing the notebooks.

Keeping errors in the code and including explanations and solutions was a valuable way to make sure I really understood the code I was writing and why it worked, as well as hopefully helping a future user to figure out why their own code may not be working. I think that keeping errors in the tutorials is particularly useful for working with messy real-life data that often contain unexpected intricacies and details.

#### Takeaways

Working on these tutorials was a significant learning experience for me. I gained experience working with cloud-optimized data types such as [Zarr](https://zarr.readthedocs.io/en/stable/) and [COGs](https://www.cogeo.org/), querying cloud-hosted datasets such as [AWS](https://registry.opendata.aws/?search=tags:gis,earth%20observation,events,mapping,meteorological,environmental,transportation) and Microsoft Planetary Computer using [PySTAC](https://pystac.readthedocs.io/en/stable/) and [stackstac](https://stackstac.readthedocs.io/en/latest/) tools, and learned strategies for optimizing and parallelizing workflows using [Xarray](https://docs.xarray.dev/en/stable/) and [dask](https://www.dask.org/). Working with large datasets that necessitated the use of these tools was valuable in that I gained a better understanding of how they actually work, the purposes they serve, the situations in which they are or are not well-suited, and how to orient my workflows to make the best use of them. To give an example, while I had used dask once or twice in the past, I had never used it in a case where I was pushing my computational resources and thus needed to parallelize my workflow. Figuring out the appropriate use of Xarray and dask tools in these situations was a challenging learning experience that ultimately left me with a far greater understanding of what the tools are actually doing and how best to use them.

<br>
![](https://i.imgur.com/nh5K9AB.png)
*Exploring seasonal variability in Sentinel-1 RTC backscatter using `groupby()` and `FacetGrid`*

#### Jupyter book tutorials

##### 1.[Using Xarray to examine cloud-based glacier surface velocity data](https://e-marshall.github.io/itslive/)

Based on the Inter-mission Time Series of Land Ice Velocity and Elevation ([ITS_LIVE](https://its-live.jpl.nasa.gov/)) dataset.

##### 2.[Sentinel-1 RTC imagery workflows with Xarray](https://e-marshall.github.io/sentinel1_rtc/)

Using Sentinel-1 Radiometric Terrain Corrected (RTC) backscatter datasets processed and hosted by both [Microsoft Planetary Computer](https://planetarycomputer.microsoft.com/dataset/sentinel-1-rtc#overview) and [Alaska Satellite Facility](https://www.arcgis.com/home/item.html?id=3dd8d25559db4ba6aa0e1b6e8cb5d39a)

### Other open-source contributions

I was fortunate to get to work on other projects and open-source contributions in addition to the Jupyter book tutorials this summer. I developed a data cleaning example that is now a [chapter](https://tutorial.xarray.dev/data_cleaning/ice_velocity.html) within the Xarray tutorial. This focused on taking a time series of gridded data with multiple variables and organizing it into an ‘analysis ready’ format with x, y, and time coordinates. I also submitted [pull requests](https://github.com/pydata/xarray/pulls?q=is%3Apr+author%3Ae-marshall) to pydata/xarray that included improved documentation for xr.Dataset and xr.DataArray methods and a [new dataset](https://github.com/pydata/xarray-data/pull/24) to be used for Xarray tutorials.
![](https://i.imgur.com/sddCbB3.png)
_Data cleaning example in Xarray tutorial_

### SciPy 2022

One of the coolest experiences of my summer internship was the opportunity to co-present the Xarray tutorial at the SciPy Conference in Austin, TX, alongside my mentors, Xarray maintainers, and contributors. At SciPy, I participated in tutorials focused on exciting topics and tools and attended sessions on developments in data science and computationally-intensive geosciences, as well as a range of other topics. The most fun aspect of the conference was meeting members of the open-source scientific software community. From former NCAR employees, Pangeo community members, and people from totally different fields, everyone I met at the conference was friendly, excited to be there, and excited to talk about open-source tools. As someone new to the open-source community, this experience broadened my understanding of this space and the type of work being done in it and highlighted how central community is to scientific research in a way that I’m grateful for.

## What did I learn?

### Git/GitHub

One big thing was transitioning to working and collaborating with git and GitHub. This is something I’d largely avoided in the past out of hesitation and a bit of intimidation. Being able to get accustomed to this work style through contributing to projects with my mentors was invaluable and helped me to figure out the nuances of GitHub workflows.

### Xarray

Another big takeaway for me this summer was becoming more familiar with ‘Xarray-native’ programming. This was really fun! My work in the past had used Xarray but not taken full advantage of it. I ended up writing a lot of things by hand that I could have used Xarray functionality for, either because I didn’t know those methods existed or I didn’t understand how to incorporate them into my work. This summer, I had many opportunities to take code I wrote for a specific purpose and break it down to see how I could accomplish the same task within the Xarray framework. It was a valuable opportunity to have the time to prioritize this, rather than just moving on to the next task, and to receive feedback and advice from my mentors on these tasks. There is a very useful Youtube video of an Xarray tutorial called Thinking like Xarray, and this summer, I feel like I finally started to think like Xarray (always still improving here) - it has helped me to reframe my approach to computational workflows, and it has been fun!

### Cloud computing

The cloud-computing ecosystem was all new to me, and I felt slightly intimidated about entering into this realm and understanding the different cloud-native data types, cloud-hosting platforms, and cloud-computing resources. Working with cloud-hosted data came with new-to-me data types, as well as tools to query catalogs and access data. Spending time understanding (or at least starting to) the ins and outs of these tools and what they are doing under the hood was particularly fun and something I’m excited to continue working on.

## Conclusion

This summer, I got to experience how fun and exciting it is to talk through concepts, work on issues, and problem-solve with people who are passionate about what they do, curious about interesting questions, and selfless in the time and knowledge they invest back into the community. My experience as an Xarray intern and more general community interactions I had both on GitHub and Pangeo left me with a set of role models who I admire for the emphasis they place on sharing knowledge in a constructive, intentional, and community-minded way, with an eye toward developing the tools, but also culture, that will help use data to solve large, important problems now and in the future.


## Acknowledgments

- I'm grateful to Deepak Cherian, Scott Henderson and Jessica Scheick for their guidance, mentorship and support during my summer internship.
- Thank you to the [SIParCS program](https://www2.cisl.ucar.edu/outreach/internships) at NCAR for funding and support during this work.
- My time was supported by NASA’s Open Source Tools, Frameworks, and Libraries Program (award 80NSSC22K0345).

## References

Gentemann, C. L., Holdgraf, C., Abernathey, R., Crichton, D., Colliander, J., Kearns, E. J., et al. (2021). Science storms the cloud. AGU Advances, 2, e2020AV000354. https://doi.org/10.1029/2020AV000354

![](https://i.imgur.com/ESa6prm.jpg)_View of NCAR Mesa Lab coming back from a lunchtime walk_

![](https://i.imgur.com/cz4Sw7N.jpg)
_SIParCS day trip to the NCAR Wyoming Supercomputing Center_

![](https://i.imgur.com/gcacuHQ.jpg)
_Bike ride home from Mesa Lab every evening on my NCAR Blue Bike (NCAR sustainability office bike loan program)_
