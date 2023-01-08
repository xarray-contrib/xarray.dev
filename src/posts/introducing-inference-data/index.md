---
title: 'Better Bayesian Workflows with Inference Data and Xarray'
date: '2022-12-17'
authors:
  - name: Ravin Kumar
    github: canyon289
  - name: ArviZ Dev 2
    github: someone
summary: "Xarray provides the core data model for ArviZ's InfrerenceData structure"
---

_TLDR: Xarray is the core of the `az.InferenceData` object. [ArviZ InferenceData](https://python.arviz.org/en/stable/api/generated/arviz.InferenceData.html) simplifies the Bayesian workflow, facilitates reproducibility, and enables interoperability between different Probabilistic Programming languages._

<!-- Temporary Reference https://xarray.dev/blog/introducing-pint-xarray -->

```python
# Load the saved results of a bayesian analysis from disk
import arviz as az

data = az.load_arviz_data("centered_eight")
data
```

<!-- https://xarray.dev/blog/introducing-pint-xarray -->

## The Life of a modern Bayesian

The utility of `az.InferenceData` will not be very apparent if we first don't talk about the life of a Modern Bayesian Statistician,
the PPL Designer, and what things used to be like before `az.InferenceData`.

### The Modern Bayesian Practitioner

Like most modern statisticians, the Modern Bayesian Statistician uses a computer to perform their work.
Many Probabilistic Programming Language (PPL) are available for this task, such as [Stan](https://mc-stan.org/),
[PyMC](https://www.pymc.io/), [Tensorflow Probability](https://www.tensorflow.org/probability), [NumPyro](http://pyro.ai/numpyro/) etc.

With probabilistic programming language in hand, the Bayesian then follows the workflow below, performing each of the various steps
as part of their analysis.

![Bayesian Workflow](https://bayesiancomputationbook.com/_images/Bayesian_workflow.png)

At each of these steps the PPLs generate many arrays, and not only single dimension arrays, but multi dimensional arrays.
The prior predictive distribution, the posterior distribution, the posterior predictive distribution, the log likelihood, and even the input data
are all numberical quantities that need to be captured and ordered to facilitate analysis.

Often these arrays need to be passed to specialized functions in order to check for MCMC convergence, model comparison, or getting summaries from the target distribution.

And once the individual statistician has completed their work, they may either want to save it to disk,
or share it with a colleague.

## The Modern PPL designer

Now consider a PPL designer. PPL designers typically want to focus on model building and inference: graph representation, samplers, symbolic differentiation speed and stability...
However for their PPL to be useful they must ensure users have easy access to diagnostics,
visualizations, and model criticism tools.
Suddenly the scope of their codebase grows, and duplicative functionality now exists across
the open source Bayesian ecosystem

## Life before az.InferenceData

Before `az.InferenceData` there wasn't a consistent object or method

- Each PPL designer would have to implement their own internal objects
  - The objects may not be serializable to disk
- All adjacent workflow libraries would need
- The APIs and interfaces for all of these were inconsistent making life challenging for end users
  - Folks using different PPLs would be isolated in completely different ecosystems, even when the PPLs share the same general programming language.

## How az.InferenceData works and its implementation

`az.InferenceData` is an object that stores (nearly) all the outputs of Bayesian Modeling in a consistent manner.
Under the hood `az.InferenceData` is largely a collection of Xarray objects, with some utility functions built in as well.
Xarray was the natural choice, because storing indexing, and performing calculations
over multidimensional outputs are routine task for computational Bayesian modelers.

![InferenceData Architecture](https://python.arviz.org/en/stable/_images/InferenceDataStructure.png)

## How this enables ArviZ

With a consistent object that represents the outputs of PPLs, it became possible develop ArviZ,
a unified library for exploratory analysis of Bayesian models.
Now it didn't matter what PPL someone decided to use,
as long as they follow the InferenceData specification ArviZ will know "what to do".
This enables PPL designer to focus on the core of inference,
and also ensures Bayesian Practitioners don't need to relearn the entire toolbox if they decide to switch PPLs.

### The benefit of Xarray

Xarray in turn simplifies the life of the ArviZ devs because we don't need to focus too much
on the data store object, and instead we can focus on the statistical computations.
Of the [key features of Xarray](https://xarray.dev/#features) we directly utiilize

- Interoperability
- Opereations over named dimensions
- Value selection by label
- Vectorized operations
- Flexible and Extensible I/O backend API

**Editing note** Should I mention ein stats?
https://github.com/arviz-devs/xarray-einstats

## Conclusion

Xarray enables neat functionality, standardization, and simplication for Bayesian users.
If you're a bayesian practioner we invite you to use ArviZ, and xarray by extension, to see how easy things are.
If you're a library developer for anything that uses numerical, consider how Xarray could help your users.
We're quite thrilled with capabilities of Xarray today and are excited to see how what's to come in in the future!
