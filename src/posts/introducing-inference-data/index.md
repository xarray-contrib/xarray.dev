---
title: 'Better Bayesian Workfllows with Inference Data and Xarray'
date: '2022-12-17'
authors:
  - name: Ravin Kumar
    github: canyon289
  - name: Justus Magin
    github: keewis
summary: "Xarray provides the core data model for ArviZ's InfrerenceData structure"
---

_TLDR: Xarray is the core of the `az.InferenceData` object. [ArviZ InferenceData](INSERT LINK) simplifies the Bayesian workflow, facilitates reproducibility, and enables interoperability between different Probabilistic Programming languages._

<!-- Temporary Reference https://xarray.dev/blog/introducing-pint-xarray -->

```python
# Load the saved results of a bayesian analysis from disk
import arviz as az

data = az.load_arviz_data("centered_eight")
data
```

<!-- https://xarray.dev/blog/introducing-pint-xarray -->

## The Life of a modern Bayesians

The utility of `az.InferenceData` will not be very apparent if we first don't talk about the life of a Modern Bayesian Statistician,
the PPL Designer, and what things used to be like before `az.IhnferenceData`.

### The Modern Bayesian Practitioner

Like most modern statisticians, the Modern Bayesian Statistician uses a computer to perform their work.
Many Probabilistic Programming Language (PPL) are available for this task, such as [Stan](https://mc-stan.org/),
[PyMC](https://www.pymc.io/), [Tensorflow Probability](https://www.tensorflow.org/probability), [NumPyro](http://pyro.ai/numpyro/) etc.
With probabilistic programming language in hand, the Bayesian then follows the workflow below, performing each of the various steps
as part of their analysis.

At each of these steps the PPLs generate many arrays, and not only single dimension arrays, but multi dimensional arrays.
Sampling the prior predictive, running sampling, sampling from the posterior predictive, and even the input data
are all numberical quantities that need to be captured and ordered to facilitate analysis.

And as an individual statistician it's not enough to just store the numbers in arrays.
Often these arrays need to be passed to specialized functions that get check for properties like convergence,
or for plotting.

![Bayesian Workflow](https://bayesiancomputationbook.com/_images/Bayesian_workflow.png)

And once the individual statistician has completed their work, they may either want to save it to disk,
or share it with a colleague.

## The Modern PPL designer

Now consider a PPL designer. PPL designers typically want to focus on the core of the Bayesian inference,
which is graph representation and sampling.
However for their PPL to be useful they must ensure their users must have easy access to diagnostics,
visualizations, and model criticism tools.
Suddenly the scope of their codebase grows, and duplicative functionality now exists across
the open source Bayesian Ecosystem

## Life before az.InferenceData

Before `az.InferenceData` there wasn't a consistent object or method

- Each PPL designer would have their own internal objects to store these
  - The objects may not be serializable to disk
- All adjacent workflow libraries would need
- The APIs and interfaces for all of these were inconsistent making life challenging for end useres
  - Folks using different PPLs would be in completely different ecosystems

## How az.InferenceData works and its implementation

`az.InferenceData` is an object that stores (nearly) of outputs of Bayesian Modeling in a consisntent manner.
Under the hood `az.InferenceData` is largely a collection of Xarray objects, with some utility functions built in as well.
Xarray was the natural choice, especially for MCMC inference, because its ability to store, index, and perform calculations
over multidimensional outputs is exactly what is needed to enable Bayesian workflows.

![InferenceData Architecture](https://python.arviz.org/en/stable/_images/InferenceDataStructure.png)

## How this enables ArviZ

With a consistent object that represents the outputs of PPLs, it became possible develop ArviZ,
a unified library for model diagnostics and visualization.
Now it didn't matter what PPL someone decided to use,
as long as they follow the InferenceData specification ArviZ will know "what to do".
This enables PPL designer to focus on the core of inference,
and also ensures Bayesian Practitioners don't need to relearn the entire workflow if they decide to switch PPLs.

### The benefit of Xarray

Xarray in turn simplifies the life of the ArviZ devs because we don't need to focus too much
on the data store object, and instead can focus on the statistical computation.

**Editing note** Should I mention ein stats?
https://github.com/arviz-devs/xarray-einstats

## Conclusion
