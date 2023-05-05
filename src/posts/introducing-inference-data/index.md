---
title: 'Better Bayesian Workflows with InferenceData and Xarray'
date: '2022-12-17'
authors:
  - name: Ravin Kumar
    github: canyon289
  - name: Oriol Abril-Pla
    github: OriolAbril
  - name: Osvaldo Martin
    github: aloctavodia
summary: "Xarray provides the core data model for ArviZ's InfrerenceData structure"
---

_TLDR: The Xarray Dataset provides is the core of the `arviz.InferenceData` object. [ArviZ InferenceData](https://python.arviz.org/en/stable/api/generated/arviz.InferenceData.html) simplifies the Bayesian workflow, facilitates reproducibility, and enables interoperability between different Probabilistic Programming languages._

```python
# Load the saved results of a bayesian analysis from disk
import arviz as az

data = az.load_arviz_data("non_centered_eight")
data
```

<div>
<div class='xr-header'>
<div class="xr-obj-type">arviz.InferenceData</div>
</div>
<ul class="xr-sections group-sections">

<li class = "xr-section-item">
<input id="idata_posterior293bc73a-6d43-47c7-b9df-6d94cc495063" class="xr-section-summary-in" type="checkbox">
<label for="idata_posterior293bc73a-6d43-47c7-b9df-6d94cc495063" class = "xr-section-summary">posterior</label>
<div class="xr-section-inline-details"></div>
<div class="xr-section-details">
<ul id="xr-dataset-coord-list" class="xr-var-list">
<div style="padding-left:2rem;"><div><svg style="position: absolute; width: 0; height: 0; overflow: hidden">
<defs>
<symbol id="icon-database" viewBox="0 0 32 32">
<path d="M16 0c-8.837 0-16 2.239-16 5v4c0 2.761 7.163 5 16 5s16-2.239 16-5v-4c0-2.761-7.163-5-16-5z"></path>
<path d="M16 17c-8.837 0-16-2.239-16-5v6c0 2.761 7.163 5 16 5s16-2.239 16-5v-6c0 2.761-7.163 5-16 5z"></path>
<path d="M16 26c-8.837 0-16-2.239-16-5v6c0 2.761 7.163 5 16 5s16-2.239 16-5v-6c0 2.761-7.163 5-16 5z"></path>
</symbol>
<symbol id="icon-file-text2" viewBox="0 0 32 32">
<path d="M28.681 7.159c-0.694-0.947-1.662-2.053-2.724-3.116s-2.169-2.030-3.116-2.724c-1.612-1.182-2.393-1.319-2.841-1.319h-15.5c-1.378 0-2.5 1.121-2.5 2.5v27c0 1.378 1.122 2.5 2.5 2.5h23c1.378 0 2.5-1.122 2.5-2.5v-19.5c0-0.448-0.137-1.23-1.319-2.841zM24.543 5.457c0.959 0.959 1.712 1.825 2.268 2.543h-4.811v-4.811c0.718 0.556 1.584 1.309 2.543 2.268zM28 29.5c0 0.271-0.229 0.5-0.5 0.5h-23c-0.271 0-0.5-0.229-0.5-0.5v-27c0-0.271 0.229-0.5 0.5-0.5 0 0 15.499-0 15.5 0v7c0 0.552 0.448 1 1 1h7v19.5z"></path>
<path d="M23 26h-14c-0.552 0-1-0.448-1-1s0.448-1 1-1h14c0.552 0 1 0.448 1 1s-0.448 1-1 1z"></path>
<path d="M23 22h-14c-0.552 0-1-0.448-1-1s0.448-1 1-1h14c0.552 0 1 0.448 1 1s-0.448 1-1 1z"></path>
<path d="M23 18h-14c-0.552 0-1-0.448-1-1s0.448-1 1-1h14c0.552 0 1 0.448 1 1s-0.448 1-1 1z"></path>
</symbol>
</defs>
</svg>
<style>/* CSS stylesheet for displaying xarray objects in jupyterlab.
*
*/

:root {
--xr-font-color0: var(--jp-content-font-color0, rgba(0, 0, 0, 1));
--xr-font-color2: var(--jp-content-font-color2, rgba(0, 0, 0, 0.54));
--xr-font-color3: var(--jp-content-font-color3, rgba(0, 0, 0, 0.38));
--xr-border-color: var(--jp-border-color2, #e0e0e0);
--xr-disabled-color: var(--jp-layout-color3, #bdbdbd);
--xr-background-color: var(--jp-layout-color0, white);
--xr-background-color-row-even: var(--jp-layout-color1, white);
--xr-background-color-row-odd: var(--jp-layout-color2, #eeeeee);
}

html[theme=dark],
body[data-theme=dark],
body.vscode-dark {
--xr-font-color0: rgba(255, 255, 255, 1);
--xr-font-color2: rgba(255, 255, 255, 0.54);
--xr-font-color3: rgba(255, 255, 255, 0.38);
--xr-border-color: #1F1F1F;
--xr-disabled-color: #515151;
--xr-background-color: #111111;
--xr-background-color-row-even: #111111;
--xr-background-color-row-odd: #313131;
}

.xr-wrap {
display: block !important;
min-width: 300px;
max-width: 700px;
}

.xr-text-repr-fallback {
/_ fallback to plain text repr when CSS is not injected (untrusted notebook) _/
display: none;
}

.xr-header {
padding-top: 6px;
padding-bottom: 6px;
margin-bottom: 4px;
border-bottom: solid 1px var(--xr-border-color);
}

.xr-header > div,
.xr-header > ul {
display: inline;
margin-top: 0;
margin-bottom: 0;
}

.xr-obj-type,
.xr-array-name {
margin-left: 2px;
margin-right: 10px;
}

.xr-obj-type {
color: var(--xr-font-color2);
}

.xr-sections {
padding-left: 0 !important;
display: grid;
grid-template-columns: 150px auto auto 1fr 20px 20px;
}

.xr-section-item {
display: contents;
}

.xr-section-item input {
display: none;
}

.xr-section-item input + label {
color: var(--xr-disabled-color);
}

.xr-section-item input:enabled + label {
cursor: pointer;
color: var(--xr-font-color2);
}

.xr-section-item input:enabled + label:hover {
color: var(--xr-font-color0);
}

.xr-section-summary {
grid-column: 1;
color: var(--xr-font-color2);
font-weight: 500;
}

.xr-section-summary > span {
display: inline-block;
padding-left: 0.5em;
}

.xr-section-summary-in:disabled + label {
color: var(--xr-font-color2);
}

.xr-section-summary-in + label:before {
display: inline-block;
content: '►';
font-size: 11px;
width: 15px;
text-align: center;
}

.xr-section-summary-in:disabled + label:before {
color: var(--xr-disabled-color);
}

.xr-section-summary-in:checked + label:before {
content: '▼';
}

.xr-section-summary-in:checked + label > span {
display: none;
}

.xr-section-summary,
.xr-section-inline-details {
padding-top: 4px;
padding-bottom: 4px;
}

.xr-section-inline-details {
grid-column: 2 / -1;
}

.xr-section-details {
display: none;
grid-column: 1 / -1;
margin-bottom: 5px;
}

.xr-section-summary-in:checked ~ .xr-section-details {
display: contents;
}

.xr-array-wrap {
grid-column: 1 / -1;
display: grid;
grid-template-columns: 20px auto;
}

.xr-array-wrap > label {
grid-column: 1;
vertical-align: top;
}

.xr-preview {
color: var(--xr-font-color3);
}

.xr-array-preview,
.xr-array-data {
padding: 0 5px !important;
grid-column: 2;
}

.xr-array-data,
.xr-array-in:checked ~ .xr-array-preview {
display: none;
}

.xr-array-in:checked ~ .xr-array-data,
.xr-array-preview {
display: inline-block;
}

.xr-dim-list {
display: inline-block !important;
list-style: none;
padding: 0 !important;
margin: 0;
}

.xr-dim-list li {
display: inline-block;
padding: 0;
margin: 0;
}

.xr-dim-list:before {
content: '(';
}

.xr-dim-list:after {
content: ')';
}

.xr-dim-list li:not(:last-child):after {
content: ',';
padding-right: 5px;
}

.xr-has-index {
font-weight: bold;
}

.xr-var-list,
.xr-var-item {
display: contents;
}

.xr-var-item > div,
.xr-var-item label,
.xr-var-item > .xr-var-name span {
background-color: var(--xr-background-color-row-even);
margin-bottom: 0;
}

.xr-var-item > .xr-var-name:hover span {
padding-right: 5px;
}

.xr-var-list > li:nth-child(odd) > div,
.xr-var-list > li:nth-child(odd) > label,
.xr-var-list > li:nth-child(odd) > .xr-var-name span {
background-color: var(--xr-background-color-row-odd);
}

.xr-var-name {
grid-column: 1;
}

.xr-var-dims {
grid-column: 2;
}

.xr-var-dtype {
grid-column: 3;
text-align: right;
color: var(--xr-font-color2);
}

.xr-var-preview {
grid-column: 4;
}

.xr-index-preview {
grid-column: 2 / 5;
color: var(--xr-font-color2);
}

.xr-var-name,
.xr-var-dims,
.xr-var-dtype,
.xr-preview,
.xr-attrs dt {
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
padding-right: 10px;
}

.xr-var-name:hover,
.xr-var-dims:hover,
.xr-var-dtype:hover,
.xr-attrs dt:hover {
overflow: visible;
width: auto;
z-index: 1;
}

.xr-var-attrs,
.xr-var-data,
.xr-index-data {
display: none;
background-color: var(--xr-background-color) !important;
padding-bottom: 5px !important;
}

.xr-var-attrs-in:checked ~ .xr-var-attrs,
.xr-var-data-in:checked ~ .xr-var-data,
.xr-index-data-in:checked ~ .xr-index-data {
display: block;
}

.xr-var-data > table {
float: right;
}

.xr-var-name span,
.xr-var-data,
.xr-index-name div,
.xr-index-data,
.xr-attrs {
padding-left: 25px !important;
}

.xr-attrs,
.xr-var-attrs,
.xr-var-data,
.xr-index-data {
grid-column: 1 / -1;
}

dl.xr-attrs {
padding: 0;
margin: 0;
display: grid;
grid-template-columns: 125px auto;
}

.xr-attrs dt,
.xr-attrs dd {
padding: 0;
margin: 0;
float: left;
padding-right: 10px;
width: auto;
}

.xr-attrs dt {
font-weight: normal;
grid-column: 1;
}

.xr-attrs dt:hover span {
display: inline-block;
background: var(--xr-background-color);
padding-right: 10px;
}

.xr-attrs dd {
grid-column: 2;
white-space: pre-wrap;
word-break: break-all;
}

.xr-icon-database,
.xr-icon-file-text2,
.xr-no-icon {
display: inline-block;
vertical-align: middle;
width: 1em;
height: 1.5em !important;
stroke-width: 0;
stroke: currentColor;
fill: currentColor;
}

</style><pre class='xr-text-repr-fallback'>&lt;xarray.Dataset&gt;
Dimensions:  (chain: 4, draw: 500, school: 8)
Coordinates:
* chain    (chain) int64 0 1 2 3
* draw     (draw) int64 0 1 2 3 4 5 6 7 8 ... 492 493 494 495 496 497 498 499
* school   (school) object &#x27;Choate&#x27; &#x27;Deerfield&#x27; ... &quot;St. Paul&#x27;s&quot; &#x27;Mt. Hermon&#x27;
Data variables:
mu       (chain, draw) float64 ...
theta_t  (chain, draw, school) float64 ...
tau      (chain, draw) float64 ...
theta    (chain, draw, school) float64 ...
Attributes:
created_at:                 2022-10-13T14:37:26.351883
arviz_version:              0.13.0.dev0
inference_library:          pymc
inference_library_version:  4.2.2
sampling_time:              4.738754749298096
tuning_steps:               1000</pre><div class='xr-wrap' style='display:none'><div class='xr-header'><div class='xr-obj-type'>xarray.Dataset</div></div><ul class='xr-sections'><li class='xr-section-item'><input id='section-8284cceb-1be4-4191-8aea-fc7487ac3eb2' class='xr-section-summary-in' type='checkbox' disabled ><label for='section-8284cceb-1be4-4191-8aea-fc7487ac3eb2' class='xr-section-summary'  title='Expand/collapse section'>Dimensions:</label><div class='xr-section-inline-details'><ul class='xr-dim-list'><li><span class='xr-has-index'>chain</span>: 4</li><li><span class='xr-has-index'>draw</span>: 500</li><li><span class='xr-has-index'>school</span>: 8</li></ul></div><div class='xr-section-details'></div></li><li class='xr-section-item'><input id='section-bfeb1d37-91bb-4dec-98d8-73fcb868c617' class='xr-section-summary-in' type='checkbox'  checked><label for='section-bfeb1d37-91bb-4dec-98d8-73fcb868c617' class='xr-section-summary' >Coordinates: <span>(3)</span></label><div class='xr-section-inline-details'></div><div class='xr-section-details'><ul class='xr-var-list'><li class='xr-var-item'><div class='xr-var-name'><span class='xr-has-index'>chain</span></div><div class='xr-var-dims'>(chain)</div><div class='xr-var-dtype'>int64</div><div class='xr-var-preview xr-preview'>0 1 2 3</div><input id='attrs-289a4b8a-fb4a-4e58-8896-06f50fa07bc2' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-289a4b8a-fb4a-4e58-8896-06f50fa07bc2' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-fcb67492-b96b-4239-975d-0d389e5badbe' class='xr-var-data-in' type='checkbox'><label for='data-fcb67492-b96b-4239-975d-0d389e5badbe' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>array([0, 1, 2, 3])</pre></div></li><li class='xr-var-item'><div class='xr-var-name'><span class='xr-has-index'>draw</span></div><div class='xr-var-dims'>(draw)</div><div class='xr-var-dtype'>int64</div><div class='xr-var-preview xr-preview'>0 1 2 3 4 5 ... 495 496 497 498 499</div><input id='attrs-f27df22e-c355-4687-bb7c-cbf8fa8130bb' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-f27df22e-c355-4687-bb7c-cbf8fa8130bb' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-965d297c-f136-4eea-9789-a3588f51ec14' class='xr-var-data-in' type='checkbox'><label for='data-965d297c-f136-4eea-9789-a3588f51ec14' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>array([  0,   1,   2, ..., 497, 498, 499])</pre></div></li><li class='xr-var-item'><div class='xr-var-name'><span class='xr-has-index'>school</span></div><div class='xr-var-dims'>(school)</div><div class='xr-var-dtype'>object</div><div class='xr-var-preview xr-preview'>&#x27;Choate&#x27; ... &#x27;Mt. Hermon&#x27;</div><input id='attrs-a05ad6bc-5695-43e1-bbd9-db946a00bedc' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-a05ad6bc-5695-43e1-bbd9-db946a00bedc' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-280a05bc-61d8-40e3-8b42-90f458a4f262' class='xr-var-data-in' type='checkbox'><label for='data-280a05bc-61d8-40e3-8b42-90f458a4f262' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>array([&#x27;Choate&#x27;, &#x27;Deerfield&#x27;, &#x27;Phillips Andover&#x27;, &#x27;Phillips Exeter&#x27;,
&#x27;Hotchkiss&#x27;, &#x27;Lawrenceville&#x27;, &quot;St. Paul&#x27;s&quot;, &#x27;Mt. Hermon&#x27;], dtype=object)</pre></div></li></ul></div></li><li class='xr-section-item'><input id='section-ff80f97c-8f20-4e92-a7ee-3a879efd4116' class='xr-section-summary-in' type='checkbox'  checked><label for='section-ff80f97c-8f20-4e92-a7ee-3a879efd4116' class='xr-section-summary' >Data variables: <span>(4)</span></label><div class='xr-section-inline-details'></div><div class='xr-section-details'><ul class='xr-var-list'><li class='xr-var-item'><div class='xr-var-name'><span>mu</span></div><div class='xr-var-dims'>(chain, draw)</div><div class='xr-var-dtype'>float64</div><div class='xr-var-preview xr-preview'>...</div><input id='attrs-1360566d-5f7e-4633-86ca-2417f362ece0' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-1360566d-5f7e-4633-86ca-2417f362ece0' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-e9565b7b-6f84-4831-a36e-16d8ca85e789' class='xr-var-data-in' type='checkbox'><label for='data-e9565b7b-6f84-4831-a36e-16d8ca85e789' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>[2000 values with dtype=float64]</pre></div></li><li class='xr-var-item'><div class='xr-var-name'><span>theta_t</span></div><div class='xr-var-dims'>(chain, draw, school)</div><div class='xr-var-dtype'>float64</div><div class='xr-var-preview xr-preview'>...</div><input id='attrs-81099b38-6ed6-411a-b293-a283750f04f1' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-81099b38-6ed6-411a-b293-a283750f04f1' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-8b46116b-ec7c-4607-a96b-4f5f1b90f127' class='xr-var-data-in' type='checkbox'><label for='data-8b46116b-ec7c-4607-a96b-4f5f1b90f127' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>[16000 values with dtype=float64]</pre></div></li><li class='xr-var-item'><div class='xr-var-name'><span>tau</span></div><div class='xr-var-dims'>(chain, draw)</div><div class='xr-var-dtype'>float64</div><div class='xr-var-preview xr-preview'>...</div><input id='attrs-5f8bdd36-104e-480e-83d8-71f25f0adde8' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-5f8bdd36-104e-480e-83d8-71f25f0adde8' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-125903ae-64b8-4b31-9f89-8577d362b195' class='xr-var-data-in' type='checkbox'><label for='data-125903ae-64b8-4b31-9f89-8577d362b195' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>[2000 values with dtype=float64]</pre></div></li><li class='xr-var-item'><div class='xr-var-name'><span>theta</span></div><div class='xr-var-dims'>(chain, draw, school)</div><div class='xr-var-dtype'>float64</div><div class='xr-var-preview xr-preview'>...</div><input id='attrs-de57e2bc-4485-4b7a-9a84-8ee215f5c59b' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-de57e2bc-4485-4b7a-9a84-8ee215f5c59b' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-f2d899f9-ba82-431e-b968-340500675771' class='xr-var-data-in' type='checkbox'><label for='data-f2d899f9-ba82-431e-b968-340500675771' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>[16000 values with dtype=float64]</pre></div></li></ul></div></li><li class='xr-section-item'><input id='section-14332288-10a0-430f-ba93-553562eec173' class='xr-section-summary-in' type='checkbox'  ><label for='section-14332288-10a0-430f-ba93-553562eec173' class='xr-section-summary' >Indexes: <span>(3)</span></label><div class='xr-section-inline-details'></div><div class='xr-section-details'><ul class='xr-var-list'><li class='xr-var-item'><div class='xr-index-name'><div>chain</div></div><div class='xr-index-preview'>PandasIndex</div><div></div><input id='index-3b5e0f47-cfb1-42a2-9784-6a52c0c0611a' class='xr-index-data-in' type='checkbox'/><label for='index-3b5e0f47-cfb1-42a2-9784-6a52c0c0611a' title='Show/Hide index repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-index-data'><pre>PandasIndex(Int64Index([0, 1, 2, 3], dtype=&#x27;int64&#x27;, name=&#x27;chain&#x27;))</pre></div></li><li class='xr-var-item'><div class='xr-index-name'><div>draw</div></div><div class='xr-index-preview'>PandasIndex</div><div></div><input id='index-5bb0212d-d582-441c-8f13-2bd88c544e26' class='xr-index-data-in' type='checkbox'/><label for='index-5bb0212d-d582-441c-8f13-2bd88c544e26' title='Show/Hide index repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-index-data'><pre>PandasIndex(Int64Index([  0,   1,   2,   3,   4,   5,   6,   7,   8,   9,
...
490, 491, 492, 493, 494, 495, 496, 497, 498, 499],
dtype=&#x27;int64&#x27;, name=&#x27;draw&#x27;, length=500))</pre></div></li><li class='xr-var-item'><div class='xr-index-name'><div>school</div></div><div class='xr-index-preview'>PandasIndex</div><div></div><input id='index-c57b3825-db72-4663-9d5d-aea4936839ff' class='xr-index-data-in' type='checkbox'/><label for='index-c57b3825-db72-4663-9d5d-aea4936839ff' title='Show/Hide index repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-index-data'><pre>PandasIndex(Index([&#x27;Choate&#x27;, &#x27;Deerfield&#x27;, &#x27;Phillips Andover&#x27;, &#x27;Phillips Exeter&#x27;,
&#x27;Hotchkiss&#x27;, &#x27;Lawrenceville&#x27;, &#x27;St. Paul&#x27;s&#x27;, &#x27;Mt. Hermon&#x27;],
dtype=&#x27;object&#x27;, name=&#x27;school&#x27;))</pre></div></li></ul></div></li><li class='xr-section-item'><input id='section-2cd5cd2d-99a7-4147-91e3-c3d6864685bb' class='xr-section-summary-in' type='checkbox'  checked><label for='section-2cd5cd2d-99a7-4147-91e3-c3d6864685bb' class='xr-section-summary' >Attributes: <span>(6)</span></label><div class='xr-section-inline-details'></div><div class='xr-section-details'><dl class='xr-attrs'><dt><span>created_at :</span></dt><dd>2022-10-13T14:37:26.351883</dd><dt><span>arviz_version :</span></dt><dd>0.13.0.dev0</dd><dt><span>inference_library :</span></dt><dd>pymc</dd><dt><span>inference_library_version :</span></dt><dd>4.2.2</dd><dt><span>sampling_time :</span></dt><dd>4.738754749298096</dd><dt><span>tuning_steps :</span></dt><dd>1000</dd></dl></div></li></ul></div></div><br></div>
</ul>
</div>
</li>

<li class = "xr-section-item">
<input id="idata_posterior_predictive0b716060-4603-4688-85fc-96f479419ecb" class="xr-section-summary-in" type="checkbox">
<label for="idata_posterior_predictive0b716060-4603-4688-85fc-96f479419ecb" class = "xr-section-summary">posterior_predictive</label>
<div class="xr-section-inline-details"></div>
<div class="xr-section-details">
<ul id="xr-dataset-coord-list" class="xr-var-list">
<div style="padding-left:2rem;"><div><svg style="position: absolute; width: 0; height: 0; overflow: hidden">
<defs>
<symbol id="icon-database" viewBox="0 0 32 32">
<path d="M16 0c-8.837 0-16 2.239-16 5v4c0 2.761 7.163 5 16 5s16-2.239 16-5v-4c0-2.761-7.163-5-16-5z"></path>
<path d="M16 17c-8.837 0-16-2.239-16-5v6c0 2.761 7.163 5 16 5s16-2.239 16-5v-6c0 2.761-7.163 5-16 5z"></path>
<path d="M16 26c-8.837 0-16-2.239-16-5v6c0 2.761 7.163 5 16 5s16-2.239 16-5v-6c0 2.761-7.163 5-16 5z"></path>
</symbol>
<symbol id="icon-file-text2" viewBox="0 0 32 32">
<path d="M28.681 7.159c-0.694-0.947-1.662-2.053-2.724-3.116s-2.169-2.030-3.116-2.724c-1.612-1.182-2.393-1.319-2.841-1.319h-15.5c-1.378 0-2.5 1.121-2.5 2.5v27c0 1.378 1.122 2.5 2.5 2.5h23c1.378 0 2.5-1.122 2.5-2.5v-19.5c0-0.448-0.137-1.23-1.319-2.841zM24.543 5.457c0.959 0.959 1.712 1.825 2.268 2.543h-4.811v-4.811c0.718 0.556 1.584 1.309 2.543 2.268zM28 29.5c0 0.271-0.229 0.5-0.5 0.5h-23c-0.271 0-0.5-0.229-0.5-0.5v-27c0-0.271 0.229-0.5 0.5-0.5 0 0 15.499-0 15.5 0v7c0 0.552 0.448 1 1 1h7v19.5z"></path>
<path d="M23 26h-14c-0.552 0-1-0.448-1-1s0.448-1 1-1h14c0.552 0 1 0.448 1 1s-0.448 1-1 1z"></path>
<path d="M23 22h-14c-0.552 0-1-0.448-1-1s0.448-1 1-1h14c0.552 0 1 0.448 1 1s-0.448 1-1 1z"></path>
<path d="M23 18h-14c-0.552 0-1-0.448-1-1s0.448-1 1-1h14c0.552 0 1 0.448 1 1s-0.448 1-1 1z"></path>
</symbol>
</defs>
</svg>
<style>/* CSS stylesheet for displaying xarray objects in jupyterlab.
*
*/

:root {
--xr-font-color0: var(--jp-content-font-color0, rgba(0, 0, 0, 1));
--xr-font-color2: var(--jp-content-font-color2, rgba(0, 0, 0, 0.54));
--xr-font-color3: var(--jp-content-font-color3, rgba(0, 0, 0, 0.38));
--xr-border-color: var(--jp-border-color2, #e0e0e0);
--xr-disabled-color: var(--jp-layout-color3, #bdbdbd);
--xr-background-color: var(--jp-layout-color0, white);
--xr-background-color-row-even: var(--jp-layout-color1, white);
--xr-background-color-row-odd: var(--jp-layout-color2, #eeeeee);
}

html[theme=dark],
body[data-theme=dark],
body.vscode-dark {
--xr-font-color0: rgba(255, 255, 255, 1);
--xr-font-color2: rgba(255, 255, 255, 0.54);
--xr-font-color3: rgba(255, 255, 255, 0.38);
--xr-border-color: #1F1F1F;
--xr-disabled-color: #515151;
--xr-background-color: #111111;
--xr-background-color-row-even: #111111;
--xr-background-color-row-odd: #313131;
}

.xr-wrap {
display: block !important;
min-width: 300px;
max-width: 700px;
}

.xr-text-repr-fallback {
/_ fallback to plain text repr when CSS is not injected (untrusted notebook) _/
display: none;
}

.xr-header {
padding-top: 6px;
padding-bottom: 6px;
margin-bottom: 4px;
border-bottom: solid 1px var(--xr-border-color);
}

.xr-header > div,
.xr-header > ul {
display: inline;
margin-top: 0;
margin-bottom: 0;
}

.xr-obj-type,
.xr-array-name {
margin-left: 2px;
margin-right: 10px;
}

.xr-obj-type {
color: var(--xr-font-color2);
}

.xr-sections {
padding-left: 0 !important;
display: grid;
grid-template-columns: 150px auto auto 1fr 20px 20px;
}

.xr-section-item {
display: contents;
}

.xr-section-item input {
display: none;
}

.xr-section-item input + label {
color: var(--xr-disabled-color);
}

.xr-section-item input:enabled + label {
cursor: pointer;
color: var(--xr-font-color2);
}

.xr-section-item input:enabled + label:hover {
color: var(--xr-font-color0);
}

.xr-section-summary {
grid-column: 1;
color: var(--xr-font-color2);
font-weight: 500;
}

.xr-section-summary > span {
display: inline-block;
padding-left: 0.5em;
}

.xr-section-summary-in:disabled + label {
color: var(--xr-font-color2);
}

.xr-section-summary-in + label:before {
display: inline-block;
content: '►';
font-size: 11px;
width: 15px;
text-align: center;
}

.xr-section-summary-in:disabled + label:before {
color: var(--xr-disabled-color);
}

.xr-section-summary-in:checked + label:before {
content: '▼';
}

.xr-section-summary-in:checked + label > span {
display: none;
}

.xr-section-summary,
.xr-section-inline-details {
padding-top: 4px;
padding-bottom: 4px;
}

.xr-section-inline-details {
grid-column: 2 / -1;
}

.xr-section-details {
display: none;
grid-column: 1 / -1;
margin-bottom: 5px;
}

.xr-section-summary-in:checked ~ .xr-section-details {
display: contents;
}

.xr-array-wrap {
grid-column: 1 / -1;
display: grid;
grid-template-columns: 20px auto;
}

.xr-array-wrap > label {
grid-column: 1;
vertical-align: top;
}

.xr-preview {
color: var(--xr-font-color3);
}

.xr-array-preview,
.xr-array-data {
padding: 0 5px !important;
grid-column: 2;
}

.xr-array-data,
.xr-array-in:checked ~ .xr-array-preview {
display: none;
}

.xr-array-in:checked ~ .xr-array-data,
.xr-array-preview {
display: inline-block;
}

.xr-dim-list {
display: inline-block !important;
list-style: none;
padding: 0 !important;
margin: 0;
}

.xr-dim-list li {
display: inline-block;
padding: 0;
margin: 0;
}

.xr-dim-list:before {
content: '(';
}

.xr-dim-list:after {
content: ')';
}

.xr-dim-list li:not(:last-child):after {
content: ',';
padding-right: 5px;
}

.xr-has-index {
font-weight: bold;
}

.xr-var-list,
.xr-var-item {
display: contents;
}

.xr-var-item > div,
.xr-var-item label,
.xr-var-item > .xr-var-name span {
background-color: var(--xr-background-color-row-even);
margin-bottom: 0;
}

.xr-var-item > .xr-var-name:hover span {
padding-right: 5px;
}

.xr-var-list > li:nth-child(odd) > div,
.xr-var-list > li:nth-child(odd) > label,
.xr-var-list > li:nth-child(odd) > .xr-var-name span {
background-color: var(--xr-background-color-row-odd);
}

.xr-var-name {
grid-column: 1;
}

.xr-var-dims {
grid-column: 2;
}

.xr-var-dtype {
grid-column: 3;
text-align: right;
color: var(--xr-font-color2);
}

.xr-var-preview {
grid-column: 4;
}

.xr-index-preview {
grid-column: 2 / 5;
color: var(--xr-font-color2);
}

.xr-var-name,
.xr-var-dims,
.xr-var-dtype,
.xr-preview,
.xr-attrs dt {
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
padding-right: 10px;
}

.xr-var-name:hover,
.xr-var-dims:hover,
.xr-var-dtype:hover,
.xr-attrs dt:hover {
overflow: visible;
width: auto;
z-index: 1;
}

.xr-var-attrs,
.xr-var-data,
.xr-index-data {
display: none;
background-color: var(--xr-background-color) !important;
padding-bottom: 5px !important;
}

.xr-var-attrs-in:checked ~ .xr-var-attrs,
.xr-var-data-in:checked ~ .xr-var-data,
.xr-index-data-in:checked ~ .xr-index-data {
display: block;
}

.xr-var-data > table {
float: right;
}

.xr-var-name span,
.xr-var-data,
.xr-index-name div,
.xr-index-data,
.xr-attrs {
padding-left: 25px !important;
}

.xr-attrs,
.xr-var-attrs,
.xr-var-data,
.xr-index-data {
grid-column: 1 / -1;
}

dl.xr-attrs {
padding: 0;
margin: 0;
display: grid;
grid-template-columns: 125px auto;
}

.xr-attrs dt,
.xr-attrs dd {
padding: 0;
margin: 0;
float: left;
padding-right: 10px;
width: auto;
}

.xr-attrs dt {
font-weight: normal;
grid-column: 1;
}

.xr-attrs dt:hover span {
display: inline-block;
background: var(--xr-background-color);
padding-right: 10px;
}

.xr-attrs dd {
grid-column: 2;
white-space: pre-wrap;
word-break: break-all;
}

.xr-icon-database,
.xr-icon-file-text2,
.xr-no-icon {
display: inline-block;
vertical-align: middle;
width: 1em;
height: 1.5em !important;
stroke-width: 0;
stroke: currentColor;
fill: currentColor;
}

</style><pre class='xr-text-repr-fallback'>&lt;xarray.Dataset&gt;
Dimensions:    (chain: 4, draw: 500, obs_dim_0: 8)
Coordinates:
* chain      (chain) int64 0 1 2 3
* draw       (draw) int64 0 1 2 3 4 5 6 7 ... 492 493 494 495 496 497 498 499
* obs_dim_0  (obs_dim_0) int64 0 1 2 3 4 5 6 7
Data variables:
obs        (chain, draw, obs_dim_0) float64 ...
Attributes:
created_at:                 2022-10-13T14:37:34.333731
arviz_version:              0.13.0.dev0
inference_library:          pymc
inference_library_version:  4.2.2</pre><div class='xr-wrap' style='display:none'><div class='xr-header'><div class='xr-obj-type'>xarray.Dataset</div></div><ul class='xr-sections'><li class='xr-section-item'><input id='section-0611d539-67f9-4a5e-8b30-7f0ec4d21b5c' class='xr-section-summary-in' type='checkbox' disabled ><label for='section-0611d539-67f9-4a5e-8b30-7f0ec4d21b5c' class='xr-section-summary'  title='Expand/collapse section'>Dimensions:</label><div class='xr-section-inline-details'><ul class='xr-dim-list'><li><span class='xr-has-index'>chain</span>: 4</li><li><span class='xr-has-index'>draw</span>: 500</li><li><span class='xr-has-index'>obs_dim_0</span>: 8</li></ul></div><div class='xr-section-details'></div></li><li class='xr-section-item'><input id='section-31bf5e2d-9d67-4648-a4ef-7d6c15e6c831' class='xr-section-summary-in' type='checkbox'  checked><label for='section-31bf5e2d-9d67-4648-a4ef-7d6c15e6c831' class='xr-section-summary' >Coordinates: <span>(3)</span></label><div class='xr-section-inline-details'></div><div class='xr-section-details'><ul class='xr-var-list'><li class='xr-var-item'><div class='xr-var-name'><span class='xr-has-index'>chain</span></div><div class='xr-var-dims'>(chain)</div><div class='xr-var-dtype'>int64</div><div class='xr-var-preview xr-preview'>0 1 2 3</div><input id='attrs-753fd859-e4cb-4004-9354-fbedd029d84a' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-753fd859-e4cb-4004-9354-fbedd029d84a' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-780b1e30-2897-4c3e-b84b-8beaed99ac5e' class='xr-var-data-in' type='checkbox'><label for='data-780b1e30-2897-4c3e-b84b-8beaed99ac5e' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>array([0, 1, 2, 3])</pre></div></li><li class='xr-var-item'><div class='xr-var-name'><span class='xr-has-index'>draw</span></div><div class='xr-var-dims'>(draw)</div><div class='xr-var-dtype'>int64</div><div class='xr-var-preview xr-preview'>0 1 2 3 4 5 ... 495 496 497 498 499</div><input id='attrs-212ebcef-940d-4d9e-9dfd-162608e4849f' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-212ebcef-940d-4d9e-9dfd-162608e4849f' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-ece3f1a3-d857-4274-a69e-4332ddb212fc' class='xr-var-data-in' type='checkbox'><label for='data-ece3f1a3-d857-4274-a69e-4332ddb212fc' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>array([  0,   1,   2, ..., 497, 498, 499])</pre></div></li><li class='xr-var-item'><div class='xr-var-name'><span class='xr-has-index'>obs_dim_0</span></div><div class='xr-var-dims'>(obs_dim_0)</div><div class='xr-var-dtype'>int64</div><div class='xr-var-preview xr-preview'>0 1 2 3 4 5 6 7</div><input id='attrs-d4889544-65fd-4d71-830a-60340ec15bbd' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-d4889544-65fd-4d71-830a-60340ec15bbd' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-5a10fe2e-bdf1-45a0-a879-4101c6c96daa' class='xr-var-data-in' type='checkbox'><label for='data-5a10fe2e-bdf1-45a0-a879-4101c6c96daa' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>array([0, 1, 2, 3, 4, 5, 6, 7])</pre></div></li></ul></div></li><li class='xr-section-item'><input id='section-9d82ab78-5a91-4fdf-b805-2bee0b0063b0' class='xr-section-summary-in' type='checkbox'  checked><label for='section-9d82ab78-5a91-4fdf-b805-2bee0b0063b0' class='xr-section-summary' >Data variables: <span>(1)</span></label><div class='xr-section-inline-details'></div><div class='xr-section-details'><ul class='xr-var-list'><li class='xr-var-item'><div class='xr-var-name'><span>obs</span></div><div class='xr-var-dims'>(chain, draw, obs_dim_0)</div><div class='xr-var-dtype'>float64</div><div class='xr-var-preview xr-preview'>...</div><input id='attrs-e9f2e7da-cd62-47d3-826d-8043f6196cb8' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-e9f2e7da-cd62-47d3-826d-8043f6196cb8' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-8fab3c25-aa71-4760-a8eb-4405e653c3ce' class='xr-var-data-in' type='checkbox'><label for='data-8fab3c25-aa71-4760-a8eb-4405e653c3ce' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>[16000 values with dtype=float64]</pre></div></li></ul></div></li><li class='xr-section-item'><input id='section-2911eeef-a3a4-4c83-ac81-70645fac86f5' class='xr-section-summary-in' type='checkbox'  ><label for='section-2911eeef-a3a4-4c83-ac81-70645fac86f5' class='xr-section-summary' >Indexes: <span>(3)</span></label><div class='xr-section-inline-details'></div><div class='xr-section-details'><ul class='xr-var-list'><li class='xr-var-item'><div class='xr-index-name'><div>chain</div></div><div class='xr-index-preview'>PandasIndex</div><div></div><input id='index-b8f3d828-9063-4165-b328-ea643d6b22cd' class='xr-index-data-in' type='checkbox'/><label for='index-b8f3d828-9063-4165-b328-ea643d6b22cd' title='Show/Hide index repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-index-data'><pre>PandasIndex(Int64Index([0, 1, 2, 3], dtype=&#x27;int64&#x27;, name=&#x27;chain&#x27;))</pre></div></li><li class='xr-var-item'><div class='xr-index-name'><div>draw</div></div><div class='xr-index-preview'>PandasIndex</div><div></div><input id='index-8800a694-43b5-4e7a-90ec-0df252221109' class='xr-index-data-in' type='checkbox'/><label for='index-8800a694-43b5-4e7a-90ec-0df252221109' title='Show/Hide index repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-index-data'><pre>PandasIndex(Int64Index([  0,   1,   2,   3,   4,   5,   6,   7,   8,   9,
...
490, 491, 492, 493, 494, 495, 496, 497, 498, 499],
dtype=&#x27;int64&#x27;, name=&#x27;draw&#x27;, length=500))</pre></div></li><li class='xr-var-item'><div class='xr-index-name'><div>obs_dim_0</div></div><div class='xr-index-preview'>PandasIndex</div><div></div><input id='index-c83cb7ba-454e-4e83-9455-8751edbeeccc' class='xr-index-data-in' type='checkbox'/><label for='index-c83cb7ba-454e-4e83-9455-8751edbeeccc' title='Show/Hide index repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-index-data'><pre>PandasIndex(Int64Index([0, 1, 2, 3, 4, 5, 6, 7], dtype=&#x27;int64&#x27;, name=&#x27;obs_dim_0&#x27;))</pre></div></li></ul></div></li><li class='xr-section-item'><input id='section-2bd11ad7-62ee-4014-ab27-75d2b4bbc1bf' class='xr-section-summary-in' type='checkbox'  checked><label for='section-2bd11ad7-62ee-4014-ab27-75d2b4bbc1bf' class='xr-section-summary' >Attributes: <span>(4)</span></label><div class='xr-section-inline-details'></div><div class='xr-section-details'><dl class='xr-attrs'><dt><span>created_at :</span></dt><dd>2022-10-13T14:37:34.333731</dd><dt><span>arviz_version :</span></dt><dd>0.13.0.dev0</dd><dt><span>inference_library :</span></dt><dd>pymc</dd><dt><span>inference_library_version :</span></dt><dd>4.2.2</dd></dl></div></li></ul></div></div><br></div>
</ul>
</div>
</li>

<li class = "xr-section-item">
<input id="idata_log_likelihood55be2989-d03c-4199-a7fb-18369fc9fe6d" class="xr-section-summary-in" type="checkbox">
<label for="idata_log_likelihood55be2989-d03c-4199-a7fb-18369fc9fe6d" class = "xr-section-summary">log_likelihood</label>
<div class="xr-section-inline-details"></div>
<div class="xr-section-details">
<ul id="xr-dataset-coord-list" class="xr-var-list">
<div style="padding-left:2rem;"><div><svg style="position: absolute; width: 0; height: 0; overflow: hidden">
<defs>
<symbol id="icon-database" viewBox="0 0 32 32">
<path d="M16 0c-8.837 0-16 2.239-16 5v4c0 2.761 7.163 5 16 5s16-2.239 16-5v-4c0-2.761-7.163-5-16-5z"></path>
<path d="M16 17c-8.837 0-16-2.239-16-5v6c0 2.761 7.163 5 16 5s16-2.239 16-5v-6c0 2.761-7.163 5-16 5z"></path>
<path d="M16 26c-8.837 0-16-2.239-16-5v6c0 2.761 7.163 5 16 5s16-2.239 16-5v-6c0 2.761-7.163 5-16 5z"></path>
</symbol>
<symbol id="icon-file-text2" viewBox="0 0 32 32">
<path d="M28.681 7.159c-0.694-0.947-1.662-2.053-2.724-3.116s-2.169-2.030-3.116-2.724c-1.612-1.182-2.393-1.319-2.841-1.319h-15.5c-1.378 0-2.5 1.121-2.5 2.5v27c0 1.378 1.122 2.5 2.5 2.5h23c1.378 0 2.5-1.122 2.5-2.5v-19.5c0-0.448-0.137-1.23-1.319-2.841zM24.543 5.457c0.959 0.959 1.712 1.825 2.268 2.543h-4.811v-4.811c0.718 0.556 1.584 1.309 2.543 2.268zM28 29.5c0 0.271-0.229 0.5-0.5 0.5h-23c-0.271 0-0.5-0.229-0.5-0.5v-27c0-0.271 0.229-0.5 0.5-0.5 0 0 15.499-0 15.5 0v7c0 0.552 0.448 1 1 1h7v19.5z"></path>
<path d="M23 26h-14c-0.552 0-1-0.448-1-1s0.448-1 1-1h14c0.552 0 1 0.448 1 1s-0.448 1-1 1z"></path>
<path d="M23 22h-14c-0.552 0-1-0.448-1-1s0.448-1 1-1h14c0.552 0 1 0.448 1 1s-0.448 1-1 1z"></path>
<path d="M23 18h-14c-0.552 0-1-0.448-1-1s0.448-1 1-1h14c0.552 0 1 0.448 1 1s-0.448 1-1 1z"></path>
</symbol>
</defs>
</svg>
<style>/* CSS stylesheet for displaying xarray objects in jupyterlab.
*
*/

:root {
--xr-font-color0: var(--jp-content-font-color0, rgba(0, 0, 0, 1));
--xr-font-color2: var(--jp-content-font-color2, rgba(0, 0, 0, 0.54));
--xr-font-color3: var(--jp-content-font-color3, rgba(0, 0, 0, 0.38));
--xr-border-color: var(--jp-border-color2, #e0e0e0);
--xr-disabled-color: var(--jp-layout-color3, #bdbdbd);
--xr-background-color: var(--jp-layout-color0, white);
--xr-background-color-row-even: var(--jp-layout-color1, white);
--xr-background-color-row-odd: var(--jp-layout-color2, #eeeeee);
}

html[theme=dark],
body[data-theme=dark],
body.vscode-dark {
--xr-font-color0: rgba(255, 255, 255, 1);
--xr-font-color2: rgba(255, 255, 255, 0.54);
--xr-font-color3: rgba(255, 255, 255, 0.38);
--xr-border-color: #1F1F1F;
--xr-disabled-color: #515151;
--xr-background-color: #111111;
--xr-background-color-row-even: #111111;
--xr-background-color-row-odd: #313131;
}

.xr-wrap {
display: block !important;
min-width: 300px;
max-width: 700px;
}

.xr-text-repr-fallback {
/_ fallback to plain text repr when CSS is not injected (untrusted notebook) _/
display: none;
}

.xr-header {
padding-top: 6px;
padding-bottom: 6px;
margin-bottom: 4px;
border-bottom: solid 1px var(--xr-border-color);
}

.xr-header > div,
.xr-header > ul {
display: inline;
margin-top: 0;
margin-bottom: 0;
}

.xr-obj-type,
.xr-array-name {
margin-left: 2px;
margin-right: 10px;
}

.xr-obj-type {
color: var(--xr-font-color2);
}

.xr-sections {
padding-left: 0 !important;
display: grid;
grid-template-columns: 150px auto auto 1fr 20px 20px;
}

.xr-section-item {
display: contents;
}

.xr-section-item input {
display: none;
}

.xr-section-item input + label {
color: var(--xr-disabled-color);
}

.xr-section-item input:enabled + label {
cursor: pointer;
color: var(--xr-font-color2);
}

.xr-section-item input:enabled + label:hover {
color: var(--xr-font-color0);
}

.xr-section-summary {
grid-column: 1;
color: var(--xr-font-color2);
font-weight: 500;
}

.xr-section-summary > span {
display: inline-block;
padding-left: 0.5em;
}

.xr-section-summary-in:disabled + label {
color: var(--xr-font-color2);
}

.xr-section-summary-in + label:before {
display: inline-block;
content: '►';
font-size: 11px;
width: 15px;
text-align: center;
}

.xr-section-summary-in:disabled + label:before {
color: var(--xr-disabled-color);
}

.xr-section-summary-in:checked + label:before {
content: '▼';
}

.xr-section-summary-in:checked + label > span {
display: none;
}

.xr-section-summary,
.xr-section-inline-details {
padding-top: 4px;
padding-bottom: 4px;
}

.xr-section-inline-details {
grid-column: 2 / -1;
}

.xr-section-details {
display: none;
grid-column: 1 / -1;
margin-bottom: 5px;
}

.xr-section-summary-in:checked ~ .xr-section-details {
display: contents;
}

.xr-array-wrap {
grid-column: 1 / -1;
display: grid;
grid-template-columns: 20px auto;
}

.xr-array-wrap > label {
grid-column: 1;
vertical-align: top;
}

.xr-preview {
color: var(--xr-font-color3);
}

.xr-array-preview,
.xr-array-data {
padding: 0 5px !important;
grid-column: 2;
}

.xr-array-data,
.xr-array-in:checked ~ .xr-array-preview {
display: none;
}

.xr-array-in:checked ~ .xr-array-data,
.xr-array-preview {
display: inline-block;
}

.xr-dim-list {
display: inline-block !important;
list-style: none;
padding: 0 !important;
margin: 0;
}

.xr-dim-list li {
display: inline-block;
padding: 0;
margin: 0;
}

.xr-dim-list:before {
content: '(';
}

.xr-dim-list:after {
content: ')';
}

.xr-dim-list li:not(:last-child):after {
content: ',';
padding-right: 5px;
}

.xr-has-index {
font-weight: bold;
}

.xr-var-list,
.xr-var-item {
display: contents;
}

.xr-var-item > div,
.xr-var-item label,
.xr-var-item > .xr-var-name span {
background-color: var(--xr-background-color-row-even);
margin-bottom: 0;
}

.xr-var-item > .xr-var-name:hover span {
padding-right: 5px;
}

.xr-var-list > li:nth-child(odd) > div,
.xr-var-list > li:nth-child(odd) > label,
.xr-var-list > li:nth-child(odd) > .xr-var-name span {
background-color: var(--xr-background-color-row-odd);
}

.xr-var-name {
grid-column: 1;
}

.xr-var-dims {
grid-column: 2;
}

.xr-var-dtype {
grid-column: 3;
text-align: right;
color: var(--xr-font-color2);
}

.xr-var-preview {
grid-column: 4;
}

.xr-index-preview {
grid-column: 2 / 5;
color: var(--xr-font-color2);
}

.xr-var-name,
.xr-var-dims,
.xr-var-dtype,
.xr-preview,
.xr-attrs dt {
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
padding-right: 10px;
}

.xr-var-name:hover,
.xr-var-dims:hover,
.xr-var-dtype:hover,
.xr-attrs dt:hover {
overflow: visible;
width: auto;
z-index: 1;
}

.xr-var-attrs,
.xr-var-data,
.xr-index-data {
display: none;
background-color: var(--xr-background-color) !important;
padding-bottom: 5px !important;
}

.xr-var-attrs-in:checked ~ .xr-var-attrs,
.xr-var-data-in:checked ~ .xr-var-data,
.xr-index-data-in:checked ~ .xr-index-data {
display: block;
}

.xr-var-data > table {
float: right;
}

.xr-var-name span,
.xr-var-data,
.xr-index-name div,
.xr-index-data,
.xr-attrs {
padding-left: 25px !important;
}

.xr-attrs,
.xr-var-attrs,
.xr-var-data,
.xr-index-data {
grid-column: 1 / -1;
}

dl.xr-attrs {
padding: 0;
margin: 0;
display: grid;
grid-template-columns: 125px auto;
}

.xr-attrs dt,
.xr-attrs dd {
padding: 0;
margin: 0;
float: left;
padding-right: 10px;
width: auto;
}

.xr-attrs dt {
font-weight: normal;
grid-column: 1;
}

.xr-attrs dt:hover span {
display: inline-block;
background: var(--xr-background-color);
padding-right: 10px;
}

.xr-attrs dd {
grid-column: 2;
white-space: pre-wrap;
word-break: break-all;
}

.xr-icon-database,
.xr-icon-file-text2,
.xr-no-icon {
display: inline-block;
vertical-align: middle;
width: 1em;
height: 1.5em !important;
stroke-width: 0;
stroke: currentColor;
fill: currentColor;
}

</style><pre class='xr-text-repr-fallback'>&lt;xarray.Dataset&gt;
Dimensions:    (chain: 4, draw: 500, obs_dim_0: 8)
Coordinates:
* chain      (chain) int64 0 1 2 3
* draw       (draw) int64 0 1 2 3 4 5 6 7 ... 492 493 494 495 496 497 498 499
* obs_dim_0  (obs_dim_0) int64 0 1 2 3 4 5 6 7
Data variables:
obs        (chain, draw, obs_dim_0) float64 ...
Attributes:
created_at:                 2022-10-13T14:37:26.571887
arviz_version:              0.13.0.dev0
inference_library:          pymc
inference_library_version:  4.2.2</pre><div class='xr-wrap' style='display:none'><div class='xr-header'><div class='xr-obj-type'>xarray.Dataset</div></div><ul class='xr-sections'><li class='xr-section-item'><input id='section-426ba15b-614e-42e2-8fdf-acf4bbd75d31' class='xr-section-summary-in' type='checkbox' disabled ><label for='section-426ba15b-614e-42e2-8fdf-acf4bbd75d31' class='xr-section-summary'  title='Expand/collapse section'>Dimensions:</label><div class='xr-section-inline-details'><ul class='xr-dim-list'><li><span class='xr-has-index'>chain</span>: 4</li><li><span class='xr-has-index'>draw</span>: 500</li><li><span class='xr-has-index'>obs_dim_0</span>: 8</li></ul></div><div class='xr-section-details'></div></li><li class='xr-section-item'><input id='section-45488a38-9577-4304-a35d-33b84478166f' class='xr-section-summary-in' type='checkbox'  checked><label for='section-45488a38-9577-4304-a35d-33b84478166f' class='xr-section-summary' >Coordinates: <span>(3)</span></label><div class='xr-section-inline-details'></div><div class='xr-section-details'><ul class='xr-var-list'><li class='xr-var-item'><div class='xr-var-name'><span class='xr-has-index'>chain</span></div><div class='xr-var-dims'>(chain)</div><div class='xr-var-dtype'>int64</div><div class='xr-var-preview xr-preview'>0 1 2 3</div><input id='attrs-ee6daa44-ed03-403b-b61d-b94817ffed2f' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-ee6daa44-ed03-403b-b61d-b94817ffed2f' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-3c9e4d99-0055-4b41-96cc-970bc3d37e2a' class='xr-var-data-in' type='checkbox'><label for='data-3c9e4d99-0055-4b41-96cc-970bc3d37e2a' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>array([0, 1, 2, 3])</pre></div></li><li class='xr-var-item'><div class='xr-var-name'><span class='xr-has-index'>draw</span></div><div class='xr-var-dims'>(draw)</div><div class='xr-var-dtype'>int64</div><div class='xr-var-preview xr-preview'>0 1 2 3 4 5 ... 495 496 497 498 499</div><input id='attrs-204b475b-eddd-42b6-a27a-c9676d98b4bf' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-204b475b-eddd-42b6-a27a-c9676d98b4bf' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-622a2d6f-3fdc-4034-8b15-6a1da3e76f9d' class='xr-var-data-in' type='checkbox'><label for='data-622a2d6f-3fdc-4034-8b15-6a1da3e76f9d' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>array([  0,   1,   2, ..., 497, 498, 499])</pre></div></li><li class='xr-var-item'><div class='xr-var-name'><span class='xr-has-index'>obs_dim_0</span></div><div class='xr-var-dims'>(obs_dim_0)</div><div class='xr-var-dtype'>int64</div><div class='xr-var-preview xr-preview'>0 1 2 3 4 5 6 7</div><input id='attrs-a7e85cac-3536-4efe-b440-d71cee657c03' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-a7e85cac-3536-4efe-b440-d71cee657c03' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-f60540d6-22e7-4f81-aa7b-462d9493c797' class='xr-var-data-in' type='checkbox'><label for='data-f60540d6-22e7-4f81-aa7b-462d9493c797' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>array([0, 1, 2, 3, 4, 5, 6, 7])</pre></div></li></ul></div></li><li class='xr-section-item'><input id='section-ddfdb67c-ff28-4e1b-aeba-4dd6f9c04951' class='xr-section-summary-in' type='checkbox'  checked><label for='section-ddfdb67c-ff28-4e1b-aeba-4dd6f9c04951' class='xr-section-summary' >Data variables: <span>(1)</span></label><div class='xr-section-inline-details'></div><div class='xr-section-details'><ul class='xr-var-list'><li class='xr-var-item'><div class='xr-var-name'><span>obs</span></div><div class='xr-var-dims'>(chain, draw, obs_dim_0)</div><div class='xr-var-dtype'>float64</div><div class='xr-var-preview xr-preview'>...</div><input id='attrs-8faac892-24e0-4ae7-bdf0-8a68931d0614' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-8faac892-24e0-4ae7-bdf0-8a68931d0614' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-187baedc-2cb7-4a76-9790-c847094dc68d' class='xr-var-data-in' type='checkbox'><label for='data-187baedc-2cb7-4a76-9790-c847094dc68d' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>[16000 values with dtype=float64]</pre></div></li></ul></div></li><li class='xr-section-item'><input id='section-a6a493a7-58ba-4cbe-a8ab-4969d92159d4' class='xr-section-summary-in' type='checkbox'  ><label for='section-a6a493a7-58ba-4cbe-a8ab-4969d92159d4' class='xr-section-summary' >Indexes: <span>(3)</span></label><div class='xr-section-inline-details'></div><div class='xr-section-details'><ul class='xr-var-list'><li class='xr-var-item'><div class='xr-index-name'><div>chain</div></div><div class='xr-index-preview'>PandasIndex</div><div></div><input id='index-26b63e5f-2ba3-4ae0-8cdc-e2a398604444' class='xr-index-data-in' type='checkbox'/><label for='index-26b63e5f-2ba3-4ae0-8cdc-e2a398604444' title='Show/Hide index repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-index-data'><pre>PandasIndex(Int64Index([0, 1, 2, 3], dtype=&#x27;int64&#x27;, name=&#x27;chain&#x27;))</pre></div></li><li class='xr-var-item'><div class='xr-index-name'><div>draw</div></div><div class='xr-index-preview'>PandasIndex</div><div></div><input id='index-43b16d05-f0b7-4e1c-8fc4-95569e4a9201' class='xr-index-data-in' type='checkbox'/><label for='index-43b16d05-f0b7-4e1c-8fc4-95569e4a9201' title='Show/Hide index repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-index-data'><pre>PandasIndex(Int64Index([  0,   1,   2,   3,   4,   5,   6,   7,   8,   9,
...
490, 491, 492, 493, 494, 495, 496, 497, 498, 499],
dtype=&#x27;int64&#x27;, name=&#x27;draw&#x27;, length=500))</pre></div></li><li class='xr-var-item'><div class='xr-index-name'><div>obs_dim_0</div></div><div class='xr-index-preview'>PandasIndex</div><div></div><input id='index-d34cdd17-ff02-44c5-8142-6f36a57a723f' class='xr-index-data-in' type='checkbox'/><label for='index-d34cdd17-ff02-44c5-8142-6f36a57a723f' title='Show/Hide index repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-index-data'><pre>PandasIndex(Int64Index([0, 1, 2, 3, 4, 5, 6, 7], dtype=&#x27;int64&#x27;, name=&#x27;obs_dim_0&#x27;))</pre></div></li></ul></div></li><li class='xr-section-item'><input id='section-d73e0c89-6774-4522-8ce0-a97cc59a4389' class='xr-section-summary-in' type='checkbox'  checked><label for='section-d73e0c89-6774-4522-8ce0-a97cc59a4389' class='xr-section-summary' >Attributes: <span>(4)</span></label><div class='xr-section-inline-details'></div><div class='xr-section-details'><dl class='xr-attrs'><dt><span>created_at :</span></dt><dd>2022-10-13T14:37:26.571887</dd><dt><span>arviz_version :</span></dt><dd>0.13.0.dev0</dd><dt><span>inference_library :</span></dt><dd>pymc</dd><dt><span>inference_library_version :</span></dt><dd>4.2.2</dd></dl></div></li></ul></div></div><br></div>
</ul>
</div>
</li>

<li class = "xr-section-item">
<input id="idata_sample_statscfd55756-b15d-4261-8dda-5c58efd418d4" class="xr-section-summary-in" type="checkbox">
<label for="idata_sample_statscfd55756-b15d-4261-8dda-5c58efd418d4" class = "xr-section-summary">sample_stats</label>
<div class="xr-section-inline-details"></div>
<div class="xr-section-details">
<ul id="xr-dataset-coord-list" class="xr-var-list">
<div style="padding-left:2rem;"><div><svg style="position: absolute; width: 0; height: 0; overflow: hidden">
<defs>
<symbol id="icon-database" viewBox="0 0 32 32">
<path d="M16 0c-8.837 0-16 2.239-16 5v4c0 2.761 7.163 5 16 5s16-2.239 16-5v-4c0-2.761-7.163-5-16-5z"></path>
<path d="M16 17c-8.837 0-16-2.239-16-5v6c0 2.761 7.163 5 16 5s16-2.239 16-5v-6c0 2.761-7.163 5-16 5z"></path>
<path d="M16 26c-8.837 0-16-2.239-16-5v6c0 2.761 7.163 5 16 5s16-2.239 16-5v-6c0 2.761-7.163 5-16 5z"></path>
</symbol>
<symbol id="icon-file-text2" viewBox="0 0 32 32">
<path d="M28.681 7.159c-0.694-0.947-1.662-2.053-2.724-3.116s-2.169-2.030-3.116-2.724c-1.612-1.182-2.393-1.319-2.841-1.319h-15.5c-1.378 0-2.5 1.121-2.5 2.5v27c0 1.378 1.122 2.5 2.5 2.5h23c1.378 0 2.5-1.122 2.5-2.5v-19.5c0-0.448-0.137-1.23-1.319-2.841zM24.543 5.457c0.959 0.959 1.712 1.825 2.268 2.543h-4.811v-4.811c0.718 0.556 1.584 1.309 2.543 2.268zM28 29.5c0 0.271-0.229 0.5-0.5 0.5h-23c-0.271 0-0.5-0.229-0.5-0.5v-27c0-0.271 0.229-0.5 0.5-0.5 0 0 15.499-0 15.5 0v7c0 0.552 0.448 1 1 1h7v19.5z"></path>
<path d="M23 26h-14c-0.552 0-1-0.448-1-1s0.448-1 1-1h14c0.552 0 1 0.448 1 1s-0.448 1-1 1z"></path>
<path d="M23 22h-14c-0.552 0-1-0.448-1-1s0.448-1 1-1h14c0.552 0 1 0.448 1 1s-0.448 1-1 1z"></path>
<path d="M23 18h-14c-0.552 0-1-0.448-1-1s0.448-1 1-1h14c0.552 0 1 0.448 1 1s-0.448 1-1 1z"></path>
</symbol>
</defs>
</svg>
<style>/* CSS stylesheet for displaying xarray objects in jupyterlab.
*
*/

:root {
--xr-font-color0: var(--jp-content-font-color0, rgba(0, 0, 0, 1));
--xr-font-color2: var(--jp-content-font-color2, rgba(0, 0, 0, 0.54));
--xr-font-color3: var(--jp-content-font-color3, rgba(0, 0, 0, 0.38));
--xr-border-color: var(--jp-border-color2, #e0e0e0);
--xr-disabled-color: var(--jp-layout-color3, #bdbdbd);
--xr-background-color: var(--jp-layout-color0, white);
--xr-background-color-row-even: var(--jp-layout-color1, white);
--xr-background-color-row-odd: var(--jp-layout-color2, #eeeeee);
}

html[theme=dark],
body[data-theme=dark],
body.vscode-dark {
--xr-font-color0: rgba(255, 255, 255, 1);
--xr-font-color2: rgba(255, 255, 255, 0.54);
--xr-font-color3: rgba(255, 255, 255, 0.38);
--xr-border-color: #1F1F1F;
--xr-disabled-color: #515151;
--xr-background-color: #111111;
--xr-background-color-row-even: #111111;
--xr-background-color-row-odd: #313131;
}

.xr-wrap {
display: block !important;
min-width: 300px;
max-width: 700px;
}

.xr-text-repr-fallback {
/_ fallback to plain text repr when CSS is not injected (untrusted notebook) _/
display: none;
}

.xr-header {
padding-top: 6px;
padding-bottom: 6px;
margin-bottom: 4px;
border-bottom: solid 1px var(--xr-border-color);
}

.xr-header > div,
.xr-header > ul {
display: inline;
margin-top: 0;
margin-bottom: 0;
}

.xr-obj-type,
.xr-array-name {
margin-left: 2px;
margin-right: 10px;
}

.xr-obj-type {
color: var(--xr-font-color2);
}

.xr-sections {
padding-left: 0 !important;
display: grid;
grid-template-columns: 150px auto auto 1fr 20px 20px;
}

.xr-section-item {
display: contents;
}

.xr-section-item input {
display: none;
}

.xr-section-item input + label {
color: var(--xr-disabled-color);
}

.xr-section-item input:enabled + label {
cursor: pointer;
color: var(--xr-font-color2);
}

.xr-section-item input:enabled + label:hover {
color: var(--xr-font-color0);
}

.xr-section-summary {
grid-column: 1;
color: var(--xr-font-color2);
font-weight: 500;
}

.xr-section-summary > span {
display: inline-block;
padding-left: 0.5em;
}

.xr-section-summary-in:disabled + label {
color: var(--xr-font-color2);
}

.xr-section-summary-in + label:before {
display: inline-block;
content: '►';
font-size: 11px;
width: 15px;
text-align: center;
}

.xr-section-summary-in:disabled + label:before {
color: var(--xr-disabled-color);
}

.xr-section-summary-in:checked + label:before {
content: '▼';
}

.xr-section-summary-in:checked + label > span {
display: none;
}

.xr-section-summary,
.xr-section-inline-details {
padding-top: 4px;
padding-bottom: 4px;
}

.xr-section-inline-details {
grid-column: 2 / -1;
}

.xr-section-details {
display: none;
grid-column: 1 / -1;
margin-bottom: 5px;
}

.xr-section-summary-in:checked ~ .xr-section-details {
display: contents;
}

.xr-array-wrap {
grid-column: 1 / -1;
display: grid;
grid-template-columns: 20px auto;
}

.xr-array-wrap > label {
grid-column: 1;
vertical-align: top;
}

.xr-preview {
color: var(--xr-font-color3);
}

.xr-array-preview,
.xr-array-data {
padding: 0 5px !important;
grid-column: 2;
}

.xr-array-data,
.xr-array-in:checked ~ .xr-array-preview {
display: none;
}

.xr-array-in:checked ~ .xr-array-data,
.xr-array-preview {
display: inline-block;
}

.xr-dim-list {
display: inline-block !important;
list-style: none;
padding: 0 !important;
margin: 0;
}

.xr-dim-list li {
display: inline-block;
padding: 0;
margin: 0;
}

.xr-dim-list:before {
content: '(';
}

.xr-dim-list:after {
content: ')';
}

.xr-dim-list li:not(:last-child):after {
content: ',';
padding-right: 5px;
}

.xr-has-index {
font-weight: bold;
}

.xr-var-list,
.xr-var-item {
display: contents;
}

.xr-var-item > div,
.xr-var-item label,
.xr-var-item > .xr-var-name span {
background-color: var(--xr-background-color-row-even);
margin-bottom: 0;
}

.xr-var-item > .xr-var-name:hover span {
padding-right: 5px;
}

.xr-var-list > li:nth-child(odd) > div,
.xr-var-list > li:nth-child(odd) > label,
.xr-var-list > li:nth-child(odd) > .xr-var-name span {
background-color: var(--xr-background-color-row-odd);
}

.xr-var-name {
grid-column: 1;
}

.xr-var-dims {
grid-column: 2;
}

.xr-var-dtype {
grid-column: 3;
text-align: right;
color: var(--xr-font-color2);
}

.xr-var-preview {
grid-column: 4;
}

.xr-index-preview {
grid-column: 2 / 5;
color: var(--xr-font-color2);
}

.xr-var-name,
.xr-var-dims,
.xr-var-dtype,
.xr-preview,
.xr-attrs dt {
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
padding-right: 10px;
}

.xr-var-name:hover,
.xr-var-dims:hover,
.xr-var-dtype:hover,
.xr-attrs dt:hover {
overflow: visible;
width: auto;
z-index: 1;
}

.xr-var-attrs,
.xr-var-data,
.xr-index-data {
display: none;
background-color: var(--xr-background-color) !important;
padding-bottom: 5px !important;
}

.xr-var-attrs-in:checked ~ .xr-var-attrs,
.xr-var-data-in:checked ~ .xr-var-data,
.xr-index-data-in:checked ~ .xr-index-data {
display: block;
}

.xr-var-data > table {
float: right;
}

.xr-var-name span,
.xr-var-data,
.xr-index-name div,
.xr-index-data,
.xr-attrs {
padding-left: 25px !important;
}

.xr-attrs,
.xr-var-attrs,
.xr-var-data,
.xr-index-data {
grid-column: 1 / -1;
}

dl.xr-attrs {
padding: 0;
margin: 0;
display: grid;
grid-template-columns: 125px auto;
}

.xr-attrs dt,
.xr-attrs dd {
padding: 0;
margin: 0;
float: left;
padding-right: 10px;
width: auto;
}

.xr-attrs dt {
font-weight: normal;
grid-column: 1;
}

.xr-attrs dt:hover span {
display: inline-block;
background: var(--xr-background-color);
padding-right: 10px;
}

.xr-attrs dd {
grid-column: 2;
white-space: pre-wrap;
word-break: break-all;
}

.xr-icon-database,
.xr-icon-file-text2,
.xr-no-icon {
display: inline-block;
vertical-align: middle;
width: 1em;
height: 1.5em !important;
stroke-width: 0;
stroke: currentColor;
fill: currentColor;
}

</style><pre class='xr-text-repr-fallback'>&lt;xarray.Dataset&gt;
Dimensions:              (chain: 4, draw: 500)
Coordinates:
* chain                (chain) int64 0 1 2 3
* draw                 (draw) int64 0 1 2 3 4 5 6 ... 494 495 496 497 498 499
Data variables: (12/16)
lp                   (chain, draw) float64 ...
largest_eigval       (chain, draw) float64 ...
perf_counter_start   (chain, draw) float64 ...
perf_counter_diff    (chain, draw) float64 ...
step_size            (chain, draw) float64 ...
diverging            (chain, draw) bool ...
...                   ...
max_energy_error     (chain, draw) float64 ...
n_steps              (chain, draw) float64 ...
step_size_bar        (chain, draw) float64 ...
energy_error         (chain, draw) float64 ...
smallest_eigval      (chain, draw) float64 ...
index_in_trajectory  (chain, draw) int64 ...
Attributes:
created_at:                 2022-10-13T14:37:26.362154
arviz_version:              0.13.0.dev0
inference_library:          pymc
inference_library_version:  4.2.2
sampling_time:              4.738754749298096
tuning_steps:               1000</pre><div class='xr-wrap' style='display:none'><div class='xr-header'><div class='xr-obj-type'>xarray.Dataset</div></div><ul class='xr-sections'><li class='xr-section-item'><input id='section-2b2ae2b7-6a47-4f38-a8a5-1451e7db9145' class='xr-section-summary-in' type='checkbox' disabled ><label for='section-2b2ae2b7-6a47-4f38-a8a5-1451e7db9145' class='xr-section-summary'  title='Expand/collapse section'>Dimensions:</label><div class='xr-section-inline-details'><ul class='xr-dim-list'><li><span class='xr-has-index'>chain</span>: 4</li><li><span class='xr-has-index'>draw</span>: 500</li></ul></div><div class='xr-section-details'></div></li><li class='xr-section-item'><input id='section-940f9459-ccc4-4aff-93a9-82592b860118' class='xr-section-summary-in' type='checkbox'  checked><label for='section-940f9459-ccc4-4aff-93a9-82592b860118' class='xr-section-summary' >Coordinates: <span>(2)</span></label><div class='xr-section-inline-details'></div><div class='xr-section-details'><ul class='xr-var-list'><li class='xr-var-item'><div class='xr-var-name'><span class='xr-has-index'>chain</span></div><div class='xr-var-dims'>(chain)</div><div class='xr-var-dtype'>int64</div><div class='xr-var-preview xr-preview'>0 1 2 3</div><input id='attrs-04019a1c-20d8-4aa2-9528-0fbe4123a8b6' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-04019a1c-20d8-4aa2-9528-0fbe4123a8b6' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-2e6e2b59-9ed4-4a57-8507-38a9405b03bc' class='xr-var-data-in' type='checkbox'><label for='data-2e6e2b59-9ed4-4a57-8507-38a9405b03bc' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>array([0, 1, 2, 3])</pre></div></li><li class='xr-var-item'><div class='xr-var-name'><span class='xr-has-index'>draw</span></div><div class='xr-var-dims'>(draw)</div><div class='xr-var-dtype'>int64</div><div class='xr-var-preview xr-preview'>0 1 2 3 4 5 ... 495 496 497 498 499</div><input id='attrs-10a739d7-4ae1-453d-ba4a-6411dcd536d7' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-10a739d7-4ae1-453d-ba4a-6411dcd536d7' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-27b72577-1c35-43fb-9e99-611f3d405d73' class='xr-var-data-in' type='checkbox'><label for='data-27b72577-1c35-43fb-9e99-611f3d405d73' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>array([  0,   1,   2, ..., 497, 498, 499])</pre></div></li></ul></div></li><li class='xr-section-item'><input id='section-4ad3b8f6-4bce-4978-9ecd-1cdf7b488556' class='xr-section-summary-in' type='checkbox'  ><label for='section-4ad3b8f6-4bce-4978-9ecd-1cdf7b488556' class='xr-section-summary' >Data variables: <span>(16)</span></label><div class='xr-section-inline-details'></div><div class='xr-section-details'><ul class='xr-var-list'><li class='xr-var-item'><div class='xr-var-name'><span>lp</span></div><div class='xr-var-dims'>(chain, draw)</div><div class='xr-var-dtype'>float64</div><div class='xr-var-preview xr-preview'>...</div><input id='attrs-46c7da44-3887-427e-9728-05ccde3be625' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-46c7da44-3887-427e-9728-05ccde3be625' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-cbc28d7d-4ccf-4c16-916a-21be75e1b656' class='xr-var-data-in' type='checkbox'><label for='data-cbc28d7d-4ccf-4c16-916a-21be75e1b656' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>[2000 values with dtype=float64]</pre></div></li><li class='xr-var-item'><div class='xr-var-name'><span>largest_eigval</span></div><div class='xr-var-dims'>(chain, draw)</div><div class='xr-var-dtype'>float64</div><div class='xr-var-preview xr-preview'>...</div><input id='attrs-366f8db3-c8aa-427a-a37f-3d08186959c6' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-366f8db3-c8aa-427a-a37f-3d08186959c6' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-0a957cdb-477a-4f18-b221-cb840a249bfc' class='xr-var-data-in' type='checkbox'><label for='data-0a957cdb-477a-4f18-b221-cb840a249bfc' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>[2000 values with dtype=float64]</pre></div></li><li class='xr-var-item'><div class='xr-var-name'><span>perf_counter_start</span></div><div class='xr-var-dims'>(chain, draw)</div><div class='xr-var-dtype'>float64</div><div class='xr-var-preview xr-preview'>...</div><input id='attrs-bd17ff8a-9011-4a13-9f14-5c1c0c194d40' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-bd17ff8a-9011-4a13-9f14-5c1c0c194d40' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-6832ec23-170e-4ff4-a960-1f34f182f95d' class='xr-var-data-in' type='checkbox'><label for='data-6832ec23-170e-4ff4-a960-1f34f182f95d' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>[2000 values with dtype=float64]</pre></div></li><li class='xr-var-item'><div class='xr-var-name'><span>perf_counter_diff</span></div><div class='xr-var-dims'>(chain, draw)</div><div class='xr-var-dtype'>float64</div><div class='xr-var-preview xr-preview'>...</div><input id='attrs-2f6dc110-fd0a-4a51-8217-d8f51dbc65d3' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-2f6dc110-fd0a-4a51-8217-d8f51dbc65d3' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-d99ca465-2249-462f-9d41-2fabdfb54f8d' class='xr-var-data-in' type='checkbox'><label for='data-d99ca465-2249-462f-9d41-2fabdfb54f8d' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>[2000 values with dtype=float64]</pre></div></li><li class='xr-var-item'><div class='xr-var-name'><span>step_size</span></div><div class='xr-var-dims'>(chain, draw)</div><div class='xr-var-dtype'>float64</div><div class='xr-var-preview xr-preview'>...</div><input id='attrs-ac150654-d384-4293-a45b-4dc9f25403a6' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-ac150654-d384-4293-a45b-4dc9f25403a6' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-1723862e-ebef-45ae-9be2-0116004ccee1' class='xr-var-data-in' type='checkbox'><label for='data-1723862e-ebef-45ae-9be2-0116004ccee1' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>[2000 values with dtype=float64]</pre></div></li><li class='xr-var-item'><div class='xr-var-name'><span>diverging</span></div><div class='xr-var-dims'>(chain, draw)</div><div class='xr-var-dtype'>bool</div><div class='xr-var-preview xr-preview'>...</div><input id='attrs-ef6f4a3b-3435-40a0-af80-556facfdc5b0' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-ef6f4a3b-3435-40a0-af80-556facfdc5b0' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-d12e352d-7c27-48d2-80d2-8399b373b959' class='xr-var-data-in' type='checkbox'><label for='data-d12e352d-7c27-48d2-80d2-8399b373b959' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>[2000 values with dtype=bool]</pre></div></li><li class='xr-var-item'><div class='xr-var-name'><span>energy</span></div><div class='xr-var-dims'>(chain, draw)</div><div class='xr-var-dtype'>float64</div><div class='xr-var-preview xr-preview'>...</div><input id='attrs-37c9d383-f124-4af0-8354-967d6e373ca3' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-37c9d383-f124-4af0-8354-967d6e373ca3' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-674faf1b-8de6-4cce-b91b-0173cdea052d' class='xr-var-data-in' type='checkbox'><label for='data-674faf1b-8de6-4cce-b91b-0173cdea052d' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>[2000 values with dtype=float64]</pre></div></li><li class='xr-var-item'><div class='xr-var-name'><span>process_time_diff</span></div><div class='xr-var-dims'>(chain, draw)</div><div class='xr-var-dtype'>float64</div><div class='xr-var-preview xr-preview'>...</div><input id='attrs-e18ec4cd-7787-4f55-94be-5d12b9287396' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-e18ec4cd-7787-4f55-94be-5d12b9287396' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-807f605c-90e7-4a1a-bb97-7f7cbbd774c4' class='xr-var-data-in' type='checkbox'><label for='data-807f605c-90e7-4a1a-bb97-7f7cbbd774c4' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>[2000 values with dtype=float64]</pre></div></li><li class='xr-var-item'><div class='xr-var-name'><span>tree_depth</span></div><div class='xr-var-dims'>(chain, draw)</div><div class='xr-var-dtype'>int64</div><div class='xr-var-preview xr-preview'>...</div><input id='attrs-c716a9b1-0b1d-48d6-811c-96cedcf79713' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-c716a9b1-0b1d-48d6-811c-96cedcf79713' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-008054f4-f19f-4eaf-8458-b9a094780902' class='xr-var-data-in' type='checkbox'><label for='data-008054f4-f19f-4eaf-8458-b9a094780902' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>[2000 values with dtype=int64]</pre></div></li><li class='xr-var-item'><div class='xr-var-name'><span>acceptance_rate</span></div><div class='xr-var-dims'>(chain, draw)</div><div class='xr-var-dtype'>float64</div><div class='xr-var-preview xr-preview'>...</div><input id='attrs-f8c0bb1e-1006-4c4f-a3c9-e25a8cce2645' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-f8c0bb1e-1006-4c4f-a3c9-e25a8cce2645' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-434bb744-0c80-4c0f-bd4a-6b6f46539293' class='xr-var-data-in' type='checkbox'><label for='data-434bb744-0c80-4c0f-bd4a-6b6f46539293' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>[2000 values with dtype=float64]</pre></div></li><li class='xr-var-item'><div class='xr-var-name'><span>max_energy_error</span></div><div class='xr-var-dims'>(chain, draw)</div><div class='xr-var-dtype'>float64</div><div class='xr-var-preview xr-preview'>...</div><input id='attrs-e34d0a50-8ca7-45b3-b4a3-d22c8643df5b' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-e34d0a50-8ca7-45b3-b4a3-d22c8643df5b' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-c0bac95c-05f4-4346-aa64-7513979a3e70' class='xr-var-data-in' type='checkbox'><label for='data-c0bac95c-05f4-4346-aa64-7513979a3e70' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>[2000 values with dtype=float64]</pre></div></li><li class='xr-var-item'><div class='xr-var-name'><span>n_steps</span></div><div class='xr-var-dims'>(chain, draw)</div><div class='xr-var-dtype'>float64</div><div class='xr-var-preview xr-preview'>...</div><input id='attrs-9f2b2917-6316-4db8-9a50-2cea66509b86' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-9f2b2917-6316-4db8-9a50-2cea66509b86' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-ea949da0-68ed-4385-b86a-a09cd9150e44' class='xr-var-data-in' type='checkbox'><label for='data-ea949da0-68ed-4385-b86a-a09cd9150e44' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>[2000 values with dtype=float64]</pre></div></li><li class='xr-var-item'><div class='xr-var-name'><span>step_size_bar</span></div><div class='xr-var-dims'>(chain, draw)</div><div class='xr-var-dtype'>float64</div><div class='xr-var-preview xr-preview'>...</div><input id='attrs-943dae42-b789-4c62-96b4-f7f2eaf07efa' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-943dae42-b789-4c62-96b4-f7f2eaf07efa' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-9dc26eee-2a24-4658-8d96-e6dcfdf2cd65' class='xr-var-data-in' type='checkbox'><label for='data-9dc26eee-2a24-4658-8d96-e6dcfdf2cd65' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>[2000 values with dtype=float64]</pre></div></li><li class='xr-var-item'><div class='xr-var-name'><span>energy_error</span></div><div class='xr-var-dims'>(chain, draw)</div><div class='xr-var-dtype'>float64</div><div class='xr-var-preview xr-preview'>...</div><input id='attrs-a3be19b9-2b66-4435-8e1f-d99727dc2f0d' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-a3be19b9-2b66-4435-8e1f-d99727dc2f0d' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-75809d2e-eb02-4f95-8908-6f48a766bc40' class='xr-var-data-in' type='checkbox'><label for='data-75809d2e-eb02-4f95-8908-6f48a766bc40' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>[2000 values with dtype=float64]</pre></div></li><li class='xr-var-item'><div class='xr-var-name'><span>smallest_eigval</span></div><div class='xr-var-dims'>(chain, draw)</div><div class='xr-var-dtype'>float64</div><div class='xr-var-preview xr-preview'>...</div><input id='attrs-803ab06e-e93d-4f50-8294-031afdd19403' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-803ab06e-e93d-4f50-8294-031afdd19403' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-75604e49-ad2b-40e4-b3af-e5cf1dd3bba8' class='xr-var-data-in' type='checkbox'><label for='data-75604e49-ad2b-40e4-b3af-e5cf1dd3bba8' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>[2000 values with dtype=float64]</pre></div></li><li class='xr-var-item'><div class='xr-var-name'><span>index_in_trajectory</span></div><div class='xr-var-dims'>(chain, draw)</div><div class='xr-var-dtype'>int64</div><div class='xr-var-preview xr-preview'>...</div><input id='attrs-b4c3921a-4a88-4c6d-8c57-7cbd1431bcef' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-b4c3921a-4a88-4c6d-8c57-7cbd1431bcef' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-e19accfc-8580-4848-b7e0-018ac3d297fa' class='xr-var-data-in' type='checkbox'><label for='data-e19accfc-8580-4848-b7e0-018ac3d297fa' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>[2000 values with dtype=int64]</pre></div></li></ul></div></li><li class='xr-section-item'><input id='section-52fc4ab1-22fe-478c-8e34-f3a4f9109315' class='xr-section-summary-in' type='checkbox'  ><label for='section-52fc4ab1-22fe-478c-8e34-f3a4f9109315' class='xr-section-summary' >Indexes: <span>(2)</span></label><div class='xr-section-inline-details'></div><div class='xr-section-details'><ul class='xr-var-list'><li class='xr-var-item'><div class='xr-index-name'><div>chain</div></div><div class='xr-index-preview'>PandasIndex</div><div></div><input id='index-cec7cf1b-b13f-4a68-8ddc-4ec62d42cf0a' class='xr-index-data-in' type='checkbox'/><label for='index-cec7cf1b-b13f-4a68-8ddc-4ec62d42cf0a' title='Show/Hide index repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-index-data'><pre>PandasIndex(Int64Index([0, 1, 2, 3], dtype=&#x27;int64&#x27;, name=&#x27;chain&#x27;))</pre></div></li><li class='xr-var-item'><div class='xr-index-name'><div>draw</div></div><div class='xr-index-preview'>PandasIndex</div><div></div><input id='index-533ba15a-01c0-49e3-a9b0-628251da381e' class='xr-index-data-in' type='checkbox'/><label for='index-533ba15a-01c0-49e3-a9b0-628251da381e' title='Show/Hide index repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-index-data'><pre>PandasIndex(Int64Index([  0,   1,   2,   3,   4,   5,   6,   7,   8,   9,
...
490, 491, 492, 493, 494, 495, 496, 497, 498, 499],
dtype=&#x27;int64&#x27;, name=&#x27;draw&#x27;, length=500))</pre></div></li></ul></div></li><li class='xr-section-item'><input id='section-8f54bf03-56d2-486b-91eb-38dae9202c96' class='xr-section-summary-in' type='checkbox'  checked><label for='section-8f54bf03-56d2-486b-91eb-38dae9202c96' class='xr-section-summary' >Attributes: <span>(6)</span></label><div class='xr-section-inline-details'></div><div class='xr-section-details'><dl class='xr-attrs'><dt><span>created_at :</span></dt><dd>2022-10-13T14:37:26.362154</dd><dt><span>arviz_version :</span></dt><dd>0.13.0.dev0</dd><dt><span>inference_library :</span></dt><dd>pymc</dd><dt><span>inference_library_version :</span></dt><dd>4.2.2</dd><dt><span>sampling_time :</span></dt><dd>4.738754749298096</dd><dt><span>tuning_steps :</span></dt><dd>1000</dd></dl></div></li></ul></div></div><br></div>
</ul>
</div>
</li>

<li class = "xr-section-item">
<input id="idata_prior6dbdb802-a5f0-4923-a704-a1d318f0230c" class="xr-section-summary-in" type="checkbox">
<label for="idata_prior6dbdb802-a5f0-4923-a704-a1d318f0230c" class = "xr-section-summary">prior</label>
<div class="xr-section-inline-details"></div>
<div class="xr-section-details">
<ul id="xr-dataset-coord-list" class="xr-var-list">
<div style="padding-left:2rem;"><div><svg style="position: absolute; width: 0; height: 0; overflow: hidden">
<defs>
<symbol id="icon-database" viewBox="0 0 32 32">
<path d="M16 0c-8.837 0-16 2.239-16 5v4c0 2.761 7.163 5 16 5s16-2.239 16-5v-4c0-2.761-7.163-5-16-5z"></path>
<path d="M16 17c-8.837 0-16-2.239-16-5v6c0 2.761 7.163 5 16 5s16-2.239 16-5v-6c0 2.761-7.163 5-16 5z"></path>
<path d="M16 26c-8.837 0-16-2.239-16-5v6c0 2.761 7.163 5 16 5s16-2.239 16-5v-6c0 2.761-7.163 5-16 5z"></path>
</symbol>
<symbol id="icon-file-text2" viewBox="0 0 32 32">
<path d="M28.681 7.159c-0.694-0.947-1.662-2.053-2.724-3.116s-2.169-2.030-3.116-2.724c-1.612-1.182-2.393-1.319-2.841-1.319h-15.5c-1.378 0-2.5 1.121-2.5 2.5v27c0 1.378 1.122 2.5 2.5 2.5h23c1.378 0 2.5-1.122 2.5-2.5v-19.5c0-0.448-0.137-1.23-1.319-2.841zM24.543 5.457c0.959 0.959 1.712 1.825 2.268 2.543h-4.811v-4.811c0.718 0.556 1.584 1.309 2.543 2.268zM28 29.5c0 0.271-0.229 0.5-0.5 0.5h-23c-0.271 0-0.5-0.229-0.5-0.5v-27c0-0.271 0.229-0.5 0.5-0.5 0 0 15.499-0 15.5 0v7c0 0.552 0.448 1 1 1h7v19.5z"></path>
<path d="M23 26h-14c-0.552 0-1-0.448-1-1s0.448-1 1-1h14c0.552 0 1 0.448 1 1s-0.448 1-1 1z"></path>
<path d="M23 22h-14c-0.552 0-1-0.448-1-1s0.448-1 1-1h14c0.552 0 1 0.448 1 1s-0.448 1-1 1z"></path>
<path d="M23 18h-14c-0.552 0-1-0.448-1-1s0.448-1 1-1h14c0.552 0 1 0.448 1 1s-0.448 1-1 1z"></path>
</symbol>
</defs>
</svg>
<style>/* CSS stylesheet for displaying xarray objects in jupyterlab.
*
*/

:root {
--xr-font-color0: var(--jp-content-font-color0, rgba(0, 0, 0, 1));
--xr-font-color2: var(--jp-content-font-color2, rgba(0, 0, 0, 0.54));
--xr-font-color3: var(--jp-content-font-color3, rgba(0, 0, 0, 0.38));
--xr-border-color: var(--jp-border-color2, #e0e0e0);
--xr-disabled-color: var(--jp-layout-color3, #bdbdbd);
--xr-background-color: var(--jp-layout-color0, white);
--xr-background-color-row-even: var(--jp-layout-color1, white);
--xr-background-color-row-odd: var(--jp-layout-color2, #eeeeee);
}

html[theme=dark],
body[data-theme=dark],
body.vscode-dark {
--xr-font-color0: rgba(255, 255, 255, 1);
--xr-font-color2: rgba(255, 255, 255, 0.54);
--xr-font-color3: rgba(255, 255, 255, 0.38);
--xr-border-color: #1F1F1F;
--xr-disabled-color: #515151;
--xr-background-color: #111111;
--xr-background-color-row-even: #111111;
--xr-background-color-row-odd: #313131;
}

.xr-wrap {
display: block !important;
min-width: 300px;
max-width: 700px;
}

.xr-text-repr-fallback {
/_ fallback to plain text repr when CSS is not injected (untrusted notebook) _/
display: none;
}

.xr-header {
padding-top: 6px;
padding-bottom: 6px;
margin-bottom: 4px;
border-bottom: solid 1px var(--xr-border-color);
}

.xr-header > div,
.xr-header > ul {
display: inline;
margin-top: 0;
margin-bottom: 0;
}

.xr-obj-type,
.xr-array-name {
margin-left: 2px;
margin-right: 10px;
}

.xr-obj-type {
color: var(--xr-font-color2);
}

.xr-sections {
padding-left: 0 !important;
display: grid;
grid-template-columns: 150px auto auto 1fr 20px 20px;
}

.xr-section-item {
display: contents;
}

.xr-section-item input {
display: none;
}

.xr-section-item input + label {
color: var(--xr-disabled-color);
}

.xr-section-item input:enabled + label {
cursor: pointer;
color: var(--xr-font-color2);
}

.xr-section-item input:enabled + label:hover {
color: var(--xr-font-color0);
}

.xr-section-summary {
grid-column: 1;
color: var(--xr-font-color2);
font-weight: 500;
}

.xr-section-summary > span {
display: inline-block;
padding-left: 0.5em;
}

.xr-section-summary-in:disabled + label {
color: var(--xr-font-color2);
}

.xr-section-summary-in + label:before {
display: inline-block;
content: '►';
font-size: 11px;
width: 15px;
text-align: center;
}

.xr-section-summary-in:disabled + label:before {
color: var(--xr-disabled-color);
}

.xr-section-summary-in:checked + label:before {
content: '▼';
}

.xr-section-summary-in:checked + label > span {
display: none;
}

.xr-section-summary,
.xr-section-inline-details {
padding-top: 4px;
padding-bottom: 4px;
}

.xr-section-inline-details {
grid-column: 2 / -1;
}

.xr-section-details {
display: none;
grid-column: 1 / -1;
margin-bottom: 5px;
}

.xr-section-summary-in:checked ~ .xr-section-details {
display: contents;
}

.xr-array-wrap {
grid-column: 1 / -1;
display: grid;
grid-template-columns: 20px auto;
}

.xr-array-wrap > label {
grid-column: 1;
vertical-align: top;
}

.xr-preview {
color: var(--xr-font-color3);
}

.xr-array-preview,
.xr-array-data {
padding: 0 5px !important;
grid-column: 2;
}

.xr-array-data,
.xr-array-in:checked ~ .xr-array-preview {
display: none;
}

.xr-array-in:checked ~ .xr-array-data,
.xr-array-preview {
display: inline-block;
}

.xr-dim-list {
display: inline-block !important;
list-style: none;
padding: 0 !important;
margin: 0;
}

.xr-dim-list li {
display: inline-block;
padding: 0;
margin: 0;
}

.xr-dim-list:before {
content: '(';
}

.xr-dim-list:after {
content: ')';
}

.xr-dim-list li:not(:last-child):after {
content: ',';
padding-right: 5px;
}

.xr-has-index {
font-weight: bold;
}

.xr-var-list,
.xr-var-item {
display: contents;
}

.xr-var-item > div,
.xr-var-item label,
.xr-var-item > .xr-var-name span {
background-color: var(--xr-background-color-row-even);
margin-bottom: 0;
}

.xr-var-item > .xr-var-name:hover span {
padding-right: 5px;
}

.xr-var-list > li:nth-child(odd) > div,
.xr-var-list > li:nth-child(odd) > label,
.xr-var-list > li:nth-child(odd) > .xr-var-name span {
background-color: var(--xr-background-color-row-odd);
}

.xr-var-name {
grid-column: 1;
}

.xr-var-dims {
grid-column: 2;
}

.xr-var-dtype {
grid-column: 3;
text-align: right;
color: var(--xr-font-color2);
}

.xr-var-preview {
grid-column: 4;
}

.xr-index-preview {
grid-column: 2 / 5;
color: var(--xr-font-color2);
}

.xr-var-name,
.xr-var-dims,
.xr-var-dtype,
.xr-preview,
.xr-attrs dt {
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
padding-right: 10px;
}

.xr-var-name:hover,
.xr-var-dims:hover,
.xr-var-dtype:hover,
.xr-attrs dt:hover {
overflow: visible;
width: auto;
z-index: 1;
}

.xr-var-attrs,
.xr-var-data,
.xr-index-data {
display: none;
background-color: var(--xr-background-color) !important;
padding-bottom: 5px !important;
}

.xr-var-attrs-in:checked ~ .xr-var-attrs,
.xr-var-data-in:checked ~ .xr-var-data,
.xr-index-data-in:checked ~ .xr-index-data {
display: block;
}

.xr-var-data > table {
float: right;
}

.xr-var-name span,
.xr-var-data,
.xr-index-name div,
.xr-index-data,
.xr-attrs {
padding-left: 25px !important;
}

.xr-attrs,
.xr-var-attrs,
.xr-var-data,
.xr-index-data {
grid-column: 1 / -1;
}

dl.xr-attrs {
padding: 0;
margin: 0;
display: grid;
grid-template-columns: 125px auto;
}

.xr-attrs dt,
.xr-attrs dd {
padding: 0;
margin: 0;
float: left;
padding-right: 10px;
width: auto;
}

.xr-attrs dt {
font-weight: normal;
grid-column: 1;
}

.xr-attrs dt:hover span {
display: inline-block;
background: var(--xr-background-color);
padding-right: 10px;
}

.xr-attrs dd {
grid-column: 2;
white-space: pre-wrap;
word-break: break-all;
}

.xr-icon-database,
.xr-icon-file-text2,
.xr-no-icon {
display: inline-block;
vertical-align: middle;
width: 1em;
height: 1.5em !important;
stroke-width: 0;
stroke: currentColor;
fill: currentColor;
}

</style><pre class='xr-text-repr-fallback'>&lt;xarray.Dataset&gt;
Dimensions:  (chain: 1, draw: 500, school: 8)
Coordinates:
* chain    (chain) int64 0
* draw     (draw) int64 0 1 2 3 4 5 6 7 8 ... 492 493 494 495 496 497 498 499
* school   (school) object &#x27;Choate&#x27; &#x27;Deerfield&#x27; ... &quot;St. Paul&#x27;s&quot; &#x27;Mt. Hermon&#x27;
Data variables:
mu       (chain, draw) float64 ...
theta_t  (chain, draw, school) float64 ...
theta    (chain, draw, school) float64 ...
tau      (chain, draw) float64 ...
Attributes:
created_at:                 2022-10-13T14:37:18.108887
arviz_version:              0.13.0.dev0
inference_library:          pymc
inference_library_version:  4.2.2</pre><div class='xr-wrap' style='display:none'><div class='xr-header'><div class='xr-obj-type'>xarray.Dataset</div></div><ul class='xr-sections'><li class='xr-section-item'><input id='section-07f85c2d-0770-44e2-84ed-b42801500b6f' class='xr-section-summary-in' type='checkbox' disabled ><label for='section-07f85c2d-0770-44e2-84ed-b42801500b6f' class='xr-section-summary'  title='Expand/collapse section'>Dimensions:</label><div class='xr-section-inline-details'><ul class='xr-dim-list'><li><span class='xr-has-index'>chain</span>: 1</li><li><span class='xr-has-index'>draw</span>: 500</li><li><span class='xr-has-index'>school</span>: 8</li></ul></div><div class='xr-section-details'></div></li><li class='xr-section-item'><input id='section-f465a4ad-99d9-4c55-9d69-0df2a873b6be' class='xr-section-summary-in' type='checkbox'  checked><label for='section-f465a4ad-99d9-4c55-9d69-0df2a873b6be' class='xr-section-summary' >Coordinates: <span>(3)</span></label><div class='xr-section-inline-details'></div><div class='xr-section-details'><ul class='xr-var-list'><li class='xr-var-item'><div class='xr-var-name'><span class='xr-has-index'>chain</span></div><div class='xr-var-dims'>(chain)</div><div class='xr-var-dtype'>int64</div><div class='xr-var-preview xr-preview'>0</div><input id='attrs-208b0185-3386-47fd-a128-6ea82bc7e329' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-208b0185-3386-47fd-a128-6ea82bc7e329' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-45f18dd2-b7ed-4f63-92d0-c61c8dc97882' class='xr-var-data-in' type='checkbox'><label for='data-45f18dd2-b7ed-4f63-92d0-c61c8dc97882' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>array([0])</pre></div></li><li class='xr-var-item'><div class='xr-var-name'><span class='xr-has-index'>draw</span></div><div class='xr-var-dims'>(draw)</div><div class='xr-var-dtype'>int64</div><div class='xr-var-preview xr-preview'>0 1 2 3 4 5 ... 495 496 497 498 499</div><input id='attrs-5dbbd9c1-e95f-48e2-b764-f7f3bdb5c68c' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-5dbbd9c1-e95f-48e2-b764-f7f3bdb5c68c' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-7096b267-9ba9-4807-b91b-11f8a880d5b8' class='xr-var-data-in' type='checkbox'><label for='data-7096b267-9ba9-4807-b91b-11f8a880d5b8' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>array([  0,   1,   2, ..., 497, 498, 499])</pre></div></li><li class='xr-var-item'><div class='xr-var-name'><span class='xr-has-index'>school</span></div><div class='xr-var-dims'>(school)</div><div class='xr-var-dtype'>object</div><div class='xr-var-preview xr-preview'>&#x27;Choate&#x27; ... &#x27;Mt. Hermon&#x27;</div><input id='attrs-c3911fb6-4912-485b-aee9-e2273db61468' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-c3911fb6-4912-485b-aee9-e2273db61468' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-d01f7147-82c2-4bf4-9455-360dafe9dc07' class='xr-var-data-in' type='checkbox'><label for='data-d01f7147-82c2-4bf4-9455-360dafe9dc07' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>array([&#x27;Choate&#x27;, &#x27;Deerfield&#x27;, &#x27;Phillips Andover&#x27;, &#x27;Phillips Exeter&#x27;,
&#x27;Hotchkiss&#x27;, &#x27;Lawrenceville&#x27;, &quot;St. Paul&#x27;s&quot;, &#x27;Mt. Hermon&#x27;], dtype=object)</pre></div></li></ul></div></li><li class='xr-section-item'><input id='section-782f16fa-9251-474e-af94-7e113e35d93b' class='xr-section-summary-in' type='checkbox'  checked><label for='section-782f16fa-9251-474e-af94-7e113e35d93b' class='xr-section-summary' >Data variables: <span>(4)</span></label><div class='xr-section-inline-details'></div><div class='xr-section-details'><ul class='xr-var-list'><li class='xr-var-item'><div class='xr-var-name'><span>mu</span></div><div class='xr-var-dims'>(chain, draw)</div><div class='xr-var-dtype'>float64</div><div class='xr-var-preview xr-preview'>...</div><input id='attrs-9d0e239b-1ee0-43c8-ba9c-e1295e836775' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-9d0e239b-1ee0-43c8-ba9c-e1295e836775' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-059866b3-6e06-4aba-aabf-62c7ff63b736' class='xr-var-data-in' type='checkbox'><label for='data-059866b3-6e06-4aba-aabf-62c7ff63b736' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>[500 values with dtype=float64]</pre></div></li><li class='xr-var-item'><div class='xr-var-name'><span>theta_t</span></div><div class='xr-var-dims'>(chain, draw, school)</div><div class='xr-var-dtype'>float64</div><div class='xr-var-preview xr-preview'>...</div><input id='attrs-ea3bea77-e777-4e7c-856b-e88f138ed059' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-ea3bea77-e777-4e7c-856b-e88f138ed059' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-ba35b21a-ea27-4d9c-941e-8f076c6da17e' class='xr-var-data-in' type='checkbox'><label for='data-ba35b21a-ea27-4d9c-941e-8f076c6da17e' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>[4000 values with dtype=float64]</pre></div></li><li class='xr-var-item'><div class='xr-var-name'><span>theta</span></div><div class='xr-var-dims'>(chain, draw, school)</div><div class='xr-var-dtype'>float64</div><div class='xr-var-preview xr-preview'>...</div><input id='attrs-857aef27-fbd0-4b65-ae23-b2b9a0c30132' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-857aef27-fbd0-4b65-ae23-b2b9a0c30132' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-8aebda1f-6926-4741-a76b-017f7b953971' class='xr-var-data-in' type='checkbox'><label for='data-8aebda1f-6926-4741-a76b-017f7b953971' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>[4000 values with dtype=float64]</pre></div></li><li class='xr-var-item'><div class='xr-var-name'><span>tau</span></div><div class='xr-var-dims'>(chain, draw)</div><div class='xr-var-dtype'>float64</div><div class='xr-var-preview xr-preview'>...</div><input id='attrs-210912d2-a5c7-4602-b86f-0c23629a9d68' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-210912d2-a5c7-4602-b86f-0c23629a9d68' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-e63cb303-05f6-4ed7-b00d-9c1fa80d9629' class='xr-var-data-in' type='checkbox'><label for='data-e63cb303-05f6-4ed7-b00d-9c1fa80d9629' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>[500 values with dtype=float64]</pre></div></li></ul></div></li><li class='xr-section-item'><input id='section-44dd113d-356e-4ca2-8361-8cfcccb82997' class='xr-section-summary-in' type='checkbox'  ><label for='section-44dd113d-356e-4ca2-8361-8cfcccb82997' class='xr-section-summary' >Indexes: <span>(3)</span></label><div class='xr-section-inline-details'></div><div class='xr-section-details'><ul class='xr-var-list'><li class='xr-var-item'><div class='xr-index-name'><div>chain</div></div><div class='xr-index-preview'>PandasIndex</div><div></div><input id='index-eb823ad0-b113-42d6-b863-21e180a46345' class='xr-index-data-in' type='checkbox'/><label for='index-eb823ad0-b113-42d6-b863-21e180a46345' title='Show/Hide index repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-index-data'><pre>PandasIndex(Int64Index([0], dtype=&#x27;int64&#x27;, name=&#x27;chain&#x27;))</pre></div></li><li class='xr-var-item'><div class='xr-index-name'><div>draw</div></div><div class='xr-index-preview'>PandasIndex</div><div></div><input id='index-80d7ca7d-a590-47e1-b5a3-7530e1c06d47' class='xr-index-data-in' type='checkbox'/><label for='index-80d7ca7d-a590-47e1-b5a3-7530e1c06d47' title='Show/Hide index repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-index-data'><pre>PandasIndex(Int64Index([  0,   1,   2,   3,   4,   5,   6,   7,   8,   9,
...
490, 491, 492, 493, 494, 495, 496, 497, 498, 499],
dtype=&#x27;int64&#x27;, name=&#x27;draw&#x27;, length=500))</pre></div></li><li class='xr-var-item'><div class='xr-index-name'><div>school</div></div><div class='xr-index-preview'>PandasIndex</div><div></div><input id='index-2c104232-d5e4-4764-8568-0a89cabf79f1' class='xr-index-data-in' type='checkbox'/><label for='index-2c104232-d5e4-4764-8568-0a89cabf79f1' title='Show/Hide index repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-index-data'><pre>PandasIndex(Index([&#x27;Choate&#x27;, &#x27;Deerfield&#x27;, &#x27;Phillips Andover&#x27;, &#x27;Phillips Exeter&#x27;,
&#x27;Hotchkiss&#x27;, &#x27;Lawrenceville&#x27;, &#x27;St. Paul&#x27;s&#x27;, &#x27;Mt. Hermon&#x27;],
dtype=&#x27;object&#x27;, name=&#x27;school&#x27;))</pre></div></li></ul></div></li><li class='xr-section-item'><input id='section-b14f55b1-192a-4b71-9f83-7fcc12a2c1d6' class='xr-section-summary-in' type='checkbox'  checked><label for='section-b14f55b1-192a-4b71-9f83-7fcc12a2c1d6' class='xr-section-summary' >Attributes: <span>(4)</span></label><div class='xr-section-inline-details'></div><div class='xr-section-details'><dl class='xr-attrs'><dt><span>created_at :</span></dt><dd>2022-10-13T14:37:18.108887</dd><dt><span>arviz_version :</span></dt><dd>0.13.0.dev0</dd><dt><span>inference_library :</span></dt><dd>pymc</dd><dt><span>inference_library_version :</span></dt><dd>4.2.2</dd></dl></div></li></ul></div></div><br></div>
</ul>
</div>
</li>

<li class = "xr-section-item">
<input id="idata_prior_predictiveeec656d3-3709-413a-be25-a8795b87fbdf" class="xr-section-summary-in" type="checkbox">
<label for="idata_prior_predictiveeec656d3-3709-413a-be25-a8795b87fbdf" class = "xr-section-summary">prior_predictive</label>
<div class="xr-section-inline-details"></div>
<div class="xr-section-details">
<ul id="xr-dataset-coord-list" class="xr-var-list">
<div style="padding-left:2rem;"><div><svg style="position: absolute; width: 0; height: 0; overflow: hidden">
<defs>
<symbol id="icon-database" viewBox="0 0 32 32">
<path d="M16 0c-8.837 0-16 2.239-16 5v4c0 2.761 7.163 5 16 5s16-2.239 16-5v-4c0-2.761-7.163-5-16-5z"></path>
<path d="M16 17c-8.837 0-16-2.239-16-5v6c0 2.761 7.163 5 16 5s16-2.239 16-5v-6c0 2.761-7.163 5-16 5z"></path>
<path d="M16 26c-8.837 0-16-2.239-16-5v6c0 2.761 7.163 5 16 5s16-2.239 16-5v-6c0 2.761-7.163 5-16 5z"></path>
</symbol>
<symbol id="icon-file-text2" viewBox="0 0 32 32">
<path d="M28.681 7.159c-0.694-0.947-1.662-2.053-2.724-3.116s-2.169-2.030-3.116-2.724c-1.612-1.182-2.393-1.319-2.841-1.319h-15.5c-1.378 0-2.5 1.121-2.5 2.5v27c0 1.378 1.122 2.5 2.5 2.5h23c1.378 0 2.5-1.122 2.5-2.5v-19.5c0-0.448-0.137-1.23-1.319-2.841zM24.543 5.457c0.959 0.959 1.712 1.825 2.268 2.543h-4.811v-4.811c0.718 0.556 1.584 1.309 2.543 2.268zM28 29.5c0 0.271-0.229 0.5-0.5 0.5h-23c-0.271 0-0.5-0.229-0.5-0.5v-27c0-0.271 0.229-0.5 0.5-0.5 0 0 15.499-0 15.5 0v7c0 0.552 0.448 1 1 1h7v19.5z"></path>
<path d="M23 26h-14c-0.552 0-1-0.448-1-1s0.448-1 1-1h14c0.552 0 1 0.448 1 1s-0.448 1-1 1z"></path>
<path d="M23 22h-14c-0.552 0-1-0.448-1-1s0.448-1 1-1h14c0.552 0 1 0.448 1 1s-0.448 1-1 1z"></path>
<path d="M23 18h-14c-0.552 0-1-0.448-1-1s0.448-1 1-1h14c0.552 0 1 0.448 1 1s-0.448 1-1 1z"></path>
</symbol>
</defs>
</svg>
<style>/* CSS stylesheet for displaying xarray objects in jupyterlab.
*
*/

:root {
--xr-font-color0: var(--jp-content-font-color0, rgba(0, 0, 0, 1));
--xr-font-color2: var(--jp-content-font-color2, rgba(0, 0, 0, 0.54));
--xr-font-color3: var(--jp-content-font-color3, rgba(0, 0, 0, 0.38));
--xr-border-color: var(--jp-border-color2, #e0e0e0);
--xr-disabled-color: var(--jp-layout-color3, #bdbdbd);
--xr-background-color: var(--jp-layout-color0, white);
--xr-background-color-row-even: var(--jp-layout-color1, white);
--xr-background-color-row-odd: var(--jp-layout-color2, #eeeeee);
}

html[theme=dark],
body[data-theme=dark],
body.vscode-dark {
--xr-font-color0: rgba(255, 255, 255, 1);
--xr-font-color2: rgba(255, 255, 255, 0.54);
--xr-font-color3: rgba(255, 255, 255, 0.38);
--xr-border-color: #1F1F1F;
--xr-disabled-color: #515151;
--xr-background-color: #111111;
--xr-background-color-row-even: #111111;
--xr-background-color-row-odd: #313131;
}

.xr-wrap {
display: block !important;
min-width: 300px;
max-width: 700px;
}

.xr-text-repr-fallback {
/_ fallback to plain text repr when CSS is not injected (untrusted notebook) _/
display: none;
}

.xr-header {
padding-top: 6px;
padding-bottom: 6px;
margin-bottom: 4px;
border-bottom: solid 1px var(--xr-border-color);
}

.xr-header > div,
.xr-header > ul {
display: inline;
margin-top: 0;
margin-bottom: 0;
}

.xr-obj-type,
.xr-array-name {
margin-left: 2px;
margin-right: 10px;
}

.xr-obj-type {
color: var(--xr-font-color2);
}

.xr-sections {
padding-left: 0 !important;
display: grid;
grid-template-columns: 150px auto auto 1fr 20px 20px;
}

.xr-section-item {
display: contents;
}

.xr-section-item input {
display: none;
}

.xr-section-item input + label {
color: var(--xr-disabled-color);
}

.xr-section-item input:enabled + label {
cursor: pointer;
color: var(--xr-font-color2);
}

.xr-section-item input:enabled + label:hover {
color: var(--xr-font-color0);
}

.xr-section-summary {
grid-column: 1;
color: var(--xr-font-color2);
font-weight: 500;
}

.xr-section-summary > span {
display: inline-block;
padding-left: 0.5em;
}

.xr-section-summary-in:disabled + label {
color: var(--xr-font-color2);
}

.xr-section-summary-in + label:before {
display: inline-block;
content: '►';
font-size: 11px;
width: 15px;
text-align: center;
}

.xr-section-summary-in:disabled + label:before {
color: var(--xr-disabled-color);
}

.xr-section-summary-in:checked + label:before {
content: '▼';
}

.xr-section-summary-in:checked + label > span {
display: none;
}

.xr-section-summary,
.xr-section-inline-details {
padding-top: 4px;
padding-bottom: 4px;
}

.xr-section-inline-details {
grid-column: 2 / -1;
}

.xr-section-details {
display: none;
grid-column: 1 / -1;
margin-bottom: 5px;
}

.xr-section-summary-in:checked ~ .xr-section-details {
display: contents;
}

.xr-array-wrap {
grid-column: 1 / -1;
display: grid;
grid-template-columns: 20px auto;
}

.xr-array-wrap > label {
grid-column: 1;
vertical-align: top;
}

.xr-preview {
color: var(--xr-font-color3);
}

.xr-array-preview,
.xr-array-data {
padding: 0 5px !important;
grid-column: 2;
}

.xr-array-data,
.xr-array-in:checked ~ .xr-array-preview {
display: none;
}

.xr-array-in:checked ~ .xr-array-data,
.xr-array-preview {
display: inline-block;
}

.xr-dim-list {
display: inline-block !important;
list-style: none;
padding: 0 !important;
margin: 0;
}

.xr-dim-list li {
display: inline-block;
padding: 0;
margin: 0;
}

.xr-dim-list:before {
content: '(';
}

.xr-dim-list:after {
content: ')';
}

.xr-dim-list li:not(:last-child):after {
content: ',';
padding-right: 5px;
}

.xr-has-index {
font-weight: bold;
}

.xr-var-list,
.xr-var-item {
display: contents;
}

.xr-var-item > div,
.xr-var-item label,
.xr-var-item > .xr-var-name span {
background-color: var(--xr-background-color-row-even);
margin-bottom: 0;
}

.xr-var-item > .xr-var-name:hover span {
padding-right: 5px;
}

.xr-var-list > li:nth-child(odd) > div,
.xr-var-list > li:nth-child(odd) > label,
.xr-var-list > li:nth-child(odd) > .xr-var-name span {
background-color: var(--xr-background-color-row-odd);
}

.xr-var-name {
grid-column: 1;
}

.xr-var-dims {
grid-column: 2;
}

.xr-var-dtype {
grid-column: 3;
text-align: right;
color: var(--xr-font-color2);
}

.xr-var-preview {
grid-column: 4;
}

.xr-index-preview {
grid-column: 2 / 5;
color: var(--xr-font-color2);
}

.xr-var-name,
.xr-var-dims,
.xr-var-dtype,
.xr-preview,
.xr-attrs dt {
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
padding-right: 10px;
}

.xr-var-name:hover,
.xr-var-dims:hover,
.xr-var-dtype:hover,
.xr-attrs dt:hover {
overflow: visible;
width: auto;
z-index: 1;
}

.xr-var-attrs,
.xr-var-data,
.xr-index-data {
display: none;
background-color: var(--xr-background-color) !important;
padding-bottom: 5px !important;
}

.xr-var-attrs-in:checked ~ .xr-var-attrs,
.xr-var-data-in:checked ~ .xr-var-data,
.xr-index-data-in:checked ~ .xr-index-data {
display: block;
}

.xr-var-data > table {
float: right;
}

.xr-var-name span,
.xr-var-data,
.xr-index-name div,
.xr-index-data,
.xr-attrs {
padding-left: 25px !important;
}

.xr-attrs,
.xr-var-attrs,
.xr-var-data,
.xr-index-data {
grid-column: 1 / -1;
}

dl.xr-attrs {
padding: 0;
margin: 0;
display: grid;
grid-template-columns: 125px auto;
}

.xr-attrs dt,
.xr-attrs dd {
padding: 0;
margin: 0;
float: left;
padding-right: 10px;
width: auto;
}

.xr-attrs dt {
font-weight: normal;
grid-column: 1;
}

.xr-attrs dt:hover span {
display: inline-block;
background: var(--xr-background-color);
padding-right: 10px;
}

.xr-attrs dd {
grid-column: 2;
white-space: pre-wrap;
word-break: break-all;
}

.xr-icon-database,
.xr-icon-file-text2,
.xr-no-icon {
display: inline-block;
vertical-align: middle;
width: 1em;
height: 1.5em !important;
stroke-width: 0;
stroke: currentColor;
fill: currentColor;
}

</style><pre class='xr-text-repr-fallback'>&lt;xarray.Dataset&gt;
Dimensions:    (chain: 1, draw: 500, obs_dim_0: 8)
Coordinates:
* chain      (chain) int64 0
* draw       (draw) int64 0 1 2 3 4 5 6 7 ... 492 493 494 495 496 497 498 499
* obs_dim_0  (obs_dim_0) int64 0 1 2 3 4 5 6 7
Data variables:
obs        (chain, draw, obs_dim_0) float64 ...
Attributes:
created_at:                 2022-10-13T14:37:18.111951
arviz_version:              0.13.0.dev0
inference_library:          pymc
inference_library_version:  4.2.2</pre><div class='xr-wrap' style='display:none'><div class='xr-header'><div class='xr-obj-type'>xarray.Dataset</div></div><ul class='xr-sections'><li class='xr-section-item'><input id='section-9137dd3d-baf9-4ea1-83bc-7a55f44adda3' class='xr-section-summary-in' type='checkbox' disabled ><label for='section-9137dd3d-baf9-4ea1-83bc-7a55f44adda3' class='xr-section-summary'  title='Expand/collapse section'>Dimensions:</label><div class='xr-section-inline-details'><ul class='xr-dim-list'><li><span class='xr-has-index'>chain</span>: 1</li><li><span class='xr-has-index'>draw</span>: 500</li><li><span class='xr-has-index'>obs_dim_0</span>: 8</li></ul></div><div class='xr-section-details'></div></li><li class='xr-section-item'><input id='section-9240be9b-2443-4a2c-a5d0-20f598fbc814' class='xr-section-summary-in' type='checkbox'  checked><label for='section-9240be9b-2443-4a2c-a5d0-20f598fbc814' class='xr-section-summary' >Coordinates: <span>(3)</span></label><div class='xr-section-inline-details'></div><div class='xr-section-details'><ul class='xr-var-list'><li class='xr-var-item'><div class='xr-var-name'><span class='xr-has-index'>chain</span></div><div class='xr-var-dims'>(chain)</div><div class='xr-var-dtype'>int64</div><div class='xr-var-preview xr-preview'>0</div><input id='attrs-2db10732-a0eb-48e5-9b19-d8e7e8991cc0' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-2db10732-a0eb-48e5-9b19-d8e7e8991cc0' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-3ebd489c-da77-43e1-9e85-d1c093abc043' class='xr-var-data-in' type='checkbox'><label for='data-3ebd489c-da77-43e1-9e85-d1c093abc043' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>array([0])</pre></div></li><li class='xr-var-item'><div class='xr-var-name'><span class='xr-has-index'>draw</span></div><div class='xr-var-dims'>(draw)</div><div class='xr-var-dtype'>int64</div><div class='xr-var-preview xr-preview'>0 1 2 3 4 5 ... 495 496 497 498 499</div><input id='attrs-7bbe93f9-9b85-4499-bbbf-08b17f6966e2' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-7bbe93f9-9b85-4499-bbbf-08b17f6966e2' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-2f5ce2ee-cc57-4f8a-acb2-cf83bc8807ea' class='xr-var-data-in' type='checkbox'><label for='data-2f5ce2ee-cc57-4f8a-acb2-cf83bc8807ea' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>array([  0,   1,   2, ..., 497, 498, 499])</pre></div></li><li class='xr-var-item'><div class='xr-var-name'><span class='xr-has-index'>obs_dim_0</span></div><div class='xr-var-dims'>(obs_dim_0)</div><div class='xr-var-dtype'>int64</div><div class='xr-var-preview xr-preview'>0 1 2 3 4 5 6 7</div><input id='attrs-83a5b6c3-e20f-4eeb-ada1-744ae8e32e6b' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-83a5b6c3-e20f-4eeb-ada1-744ae8e32e6b' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-baae306a-9b8a-41be-bed9-5d074b80f6c0' class='xr-var-data-in' type='checkbox'><label for='data-baae306a-9b8a-41be-bed9-5d074b80f6c0' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>array([0, 1, 2, 3, 4, 5, 6, 7])</pre></div></li></ul></div></li><li class='xr-section-item'><input id='section-49f7d574-50d8-4b86-b391-6ab7776bf8c8' class='xr-section-summary-in' type='checkbox'  checked><label for='section-49f7d574-50d8-4b86-b391-6ab7776bf8c8' class='xr-section-summary' >Data variables: <span>(1)</span></label><div class='xr-section-inline-details'></div><div class='xr-section-details'><ul class='xr-var-list'><li class='xr-var-item'><div class='xr-var-name'><span>obs</span></div><div class='xr-var-dims'>(chain, draw, obs_dim_0)</div><div class='xr-var-dtype'>float64</div><div class='xr-var-preview xr-preview'>...</div><input id='attrs-96a0f18e-4964-4704-94bc-4c78b1488591' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-96a0f18e-4964-4704-94bc-4c78b1488591' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-86af8532-ee11-487d-be87-aa63a483e492' class='xr-var-data-in' type='checkbox'><label for='data-86af8532-ee11-487d-be87-aa63a483e492' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>[4000 values with dtype=float64]</pre></div></li></ul></div></li><li class='xr-section-item'><input id='section-b23f24d1-3aea-43ab-b65c-2e8b6720ebaa' class='xr-section-summary-in' type='checkbox'  ><label for='section-b23f24d1-3aea-43ab-b65c-2e8b6720ebaa' class='xr-section-summary' >Indexes: <span>(3)</span></label><div class='xr-section-inline-details'></div><div class='xr-section-details'><ul class='xr-var-list'><li class='xr-var-item'><div class='xr-index-name'><div>chain</div></div><div class='xr-index-preview'>PandasIndex</div><div></div><input id='index-7546192a-7df2-4097-8d03-da75c76e2fd6' class='xr-index-data-in' type='checkbox'/><label for='index-7546192a-7df2-4097-8d03-da75c76e2fd6' title='Show/Hide index repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-index-data'><pre>PandasIndex(Int64Index([0], dtype=&#x27;int64&#x27;, name=&#x27;chain&#x27;))</pre></div></li><li class='xr-var-item'><div class='xr-index-name'><div>draw</div></div><div class='xr-index-preview'>PandasIndex</div><div></div><input id='index-1817adee-9771-4293-b9a3-c0cb022216ca' class='xr-index-data-in' type='checkbox'/><label for='index-1817adee-9771-4293-b9a3-c0cb022216ca' title='Show/Hide index repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-index-data'><pre>PandasIndex(Int64Index([  0,   1,   2,   3,   4,   5,   6,   7,   8,   9,
...
490, 491, 492, 493, 494, 495, 496, 497, 498, 499],
dtype=&#x27;int64&#x27;, name=&#x27;draw&#x27;, length=500))</pre></div></li><li class='xr-var-item'><div class='xr-index-name'><div>obs_dim_0</div></div><div class='xr-index-preview'>PandasIndex</div><div></div><input id='index-674ce6f1-b4be-46ec-b72e-821639400d0e' class='xr-index-data-in' type='checkbox'/><label for='index-674ce6f1-b4be-46ec-b72e-821639400d0e' title='Show/Hide index repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-index-data'><pre>PandasIndex(Int64Index([0, 1, 2, 3, 4, 5, 6, 7], dtype=&#x27;int64&#x27;, name=&#x27;obs_dim_0&#x27;))</pre></div></li></ul></div></li><li class='xr-section-item'><input id='section-cac5a88a-d85a-4534-ad12-b861bb013d2b' class='xr-section-summary-in' type='checkbox'  checked><label for='section-cac5a88a-d85a-4534-ad12-b861bb013d2b' class='xr-section-summary' >Attributes: <span>(4)</span></label><div class='xr-section-inline-details'></div><div class='xr-section-details'><dl class='xr-attrs'><dt><span>created_at :</span></dt><dd>2022-10-13T14:37:18.111951</dd><dt><span>arviz_version :</span></dt><dd>0.13.0.dev0</dd><dt><span>inference_library :</span></dt><dd>pymc</dd><dt><span>inference_library_version :</span></dt><dd>4.2.2</dd></dl></div></li></ul></div></div><br></div>
</ul>
</div>
</li>

<li class = "xr-section-item">
<input id="idata_observed_data10a14a62-2ed4-485d-b89c-01b32e8faa73" class="xr-section-summary-in" type="checkbox">
<label for="idata_observed_data10a14a62-2ed4-485d-b89c-01b32e8faa73" class = "xr-section-summary">observed_data</label>
<div class="xr-section-inline-details"></div>
<div class="xr-section-details">
<ul id="xr-dataset-coord-list" class="xr-var-list">
<div style="padding-left:2rem;"><div><svg style="position: absolute; width: 0; height: 0; overflow: hidden">
<defs>
<symbol id="icon-database" viewBox="0 0 32 32">
<path d="M16 0c-8.837 0-16 2.239-16 5v4c0 2.761 7.163 5 16 5s16-2.239 16-5v-4c0-2.761-7.163-5-16-5z"></path>
<path d="M16 17c-8.837 0-16-2.239-16-5v6c0 2.761 7.163 5 16 5s16-2.239 16-5v-6c0 2.761-7.163 5-16 5z"></path>
<path d="M16 26c-8.837 0-16-2.239-16-5v6c0 2.761 7.163 5 16 5s16-2.239 16-5v-6c0 2.761-7.163 5-16 5z"></path>
</symbol>
<symbol id="icon-file-text2" viewBox="0 0 32 32">
<path d="M28.681 7.159c-0.694-0.947-1.662-2.053-2.724-3.116s-2.169-2.030-3.116-2.724c-1.612-1.182-2.393-1.319-2.841-1.319h-15.5c-1.378 0-2.5 1.121-2.5 2.5v27c0 1.378 1.122 2.5 2.5 2.5h23c1.378 0 2.5-1.122 2.5-2.5v-19.5c0-0.448-0.137-1.23-1.319-2.841zM24.543 5.457c0.959 0.959 1.712 1.825 2.268 2.543h-4.811v-4.811c0.718 0.556 1.584 1.309 2.543 2.268zM28 29.5c0 0.271-0.229 0.5-0.5 0.5h-23c-0.271 0-0.5-0.229-0.5-0.5v-27c0-0.271 0.229-0.5 0.5-0.5 0 0 15.499-0 15.5 0v7c0 0.552 0.448 1 1 1h7v19.5z"></path>
<path d="M23 26h-14c-0.552 0-1-0.448-1-1s0.448-1 1-1h14c0.552 0 1 0.448 1 1s-0.448 1-1 1z"></path>
<path d="M23 22h-14c-0.552 0-1-0.448-1-1s0.448-1 1-1h14c0.552 0 1 0.448 1 1s-0.448 1-1 1z"></path>
<path d="M23 18h-14c-0.552 0-1-0.448-1-1s0.448-1 1-1h14c0.552 0 1 0.448 1 1s-0.448 1-1 1z"></path>
</symbol>
</defs>
</svg>
<style>/* CSS stylesheet for displaying xarray objects in jupyterlab.
*
*/

:root {
--xr-font-color0: var(--jp-content-font-color0, rgba(0, 0, 0, 1));
--xr-font-color2: var(--jp-content-font-color2, rgba(0, 0, 0, 0.54));
--xr-font-color3: var(--jp-content-font-color3, rgba(0, 0, 0, 0.38));
--xr-border-color: var(--jp-border-color2, #e0e0e0);
--xr-disabled-color: var(--jp-layout-color3, #bdbdbd);
--xr-background-color: var(--jp-layout-color0, white);
--xr-background-color-row-even: var(--jp-layout-color1, white);
--xr-background-color-row-odd: var(--jp-layout-color2, #eeeeee);
}

html[theme=dark],
body[data-theme=dark],
body.vscode-dark {
--xr-font-color0: rgba(255, 255, 255, 1);
--xr-font-color2: rgba(255, 255, 255, 0.54);
--xr-font-color3: rgba(255, 255, 255, 0.38);
--xr-border-color: #1F1F1F;
--xr-disabled-color: #515151;
--xr-background-color: #111111;
--xr-background-color-row-even: #111111;
--xr-background-color-row-odd: #313131;
}

.xr-wrap {
display: block !important;
min-width: 300px;
max-width: 700px;
}

.xr-text-repr-fallback {
/_ fallback to plain text repr when CSS is not injected (untrusted notebook) _/
display: none;
}

.xr-header {
padding-top: 6px;
padding-bottom: 6px;
margin-bottom: 4px;
border-bottom: solid 1px var(--xr-border-color);
}

.xr-header > div,
.xr-header > ul {
display: inline;
margin-top: 0;
margin-bottom: 0;
}

.xr-obj-type,
.xr-array-name {
margin-left: 2px;
margin-right: 10px;
}

.xr-obj-type {
color: var(--xr-font-color2);
}

.xr-sections {
padding-left: 0 !important;
display: grid;
grid-template-columns: 150px auto auto 1fr 20px 20px;
}

.xr-section-item {
display: contents;
}

.xr-section-item input {
display: none;
}

.xr-section-item input + label {
color: var(--xr-disabled-color);
}

.xr-section-item input:enabled + label {
cursor: pointer;
color: var(--xr-font-color2);
}

.xr-section-item input:enabled + label:hover {
color: var(--xr-font-color0);
}

.xr-section-summary {
grid-column: 1;
color: var(--xr-font-color2);
font-weight: 500;
}

.xr-section-summary > span {
display: inline-block;
padding-left: 0.5em;
}

.xr-section-summary-in:disabled + label {
color: var(--xr-font-color2);
}

.xr-section-summary-in + label:before {
display: inline-block;
content: '►';
font-size: 11px;
width: 15px;
text-align: center;
}

.xr-section-summary-in:disabled + label:before {
color: var(--xr-disabled-color);
}

.xr-section-summary-in:checked + label:before {
content: '▼';
}

.xr-section-summary-in:checked + label > span {
display: none;
}

.xr-section-summary,
.xr-section-inline-details {
padding-top: 4px;
padding-bottom: 4px;
}

.xr-section-inline-details {
grid-column: 2 / -1;
}

.xr-section-details {
display: none;
grid-column: 1 / -1;
margin-bottom: 5px;
}

.xr-section-summary-in:checked ~ .xr-section-details {
display: contents;
}

.xr-array-wrap {
grid-column: 1 / -1;
display: grid;
grid-template-columns: 20px auto;
}

.xr-array-wrap > label {
grid-column: 1;
vertical-align: top;
}

.xr-preview {
color: var(--xr-font-color3);
}

.xr-array-preview,
.xr-array-data {
padding: 0 5px !important;
grid-column: 2;
}

.xr-array-data,
.xr-array-in:checked ~ .xr-array-preview {
display: none;
}

.xr-array-in:checked ~ .xr-array-data,
.xr-array-preview {
display: inline-block;
}

.xr-dim-list {
display: inline-block !important;
list-style: none;
padding: 0 !important;
margin: 0;
}

.xr-dim-list li {
display: inline-block;
padding: 0;
margin: 0;
}

.xr-dim-list:before {
content: '(';
}

.xr-dim-list:after {
content: ')';
}

.xr-dim-list li:not(:last-child):after {
content: ',';
padding-right: 5px;
}

.xr-has-index {
font-weight: bold;
}

.xr-var-list,
.xr-var-item {
display: contents;
}

.xr-var-item > div,
.xr-var-item label,
.xr-var-item > .xr-var-name span {
background-color: var(--xr-background-color-row-even);
margin-bottom: 0;
}

.xr-var-item > .xr-var-name:hover span {
padding-right: 5px;
}

.xr-var-list > li:nth-child(odd) > div,
.xr-var-list > li:nth-child(odd) > label,
.xr-var-list > li:nth-child(odd) > .xr-var-name span {
background-color: var(--xr-background-color-row-odd);
}

.xr-var-name {
grid-column: 1;
}

.xr-var-dims {
grid-column: 2;
}

.xr-var-dtype {
grid-column: 3;
text-align: right;
color: var(--xr-font-color2);
}

.xr-var-preview {
grid-column: 4;
}

.xr-index-preview {
grid-column: 2 / 5;
color: var(--xr-font-color2);
}

.xr-var-name,
.xr-var-dims,
.xr-var-dtype,
.xr-preview,
.xr-attrs dt {
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
padding-right: 10px;
}

.xr-var-name:hover,
.xr-var-dims:hover,
.xr-var-dtype:hover,
.xr-attrs dt:hover {
overflow: visible;
width: auto;
z-index: 1;
}

.xr-var-attrs,
.xr-var-data,
.xr-index-data {
display: none;
background-color: var(--xr-background-color) !important;
padding-bottom: 5px !important;
}

.xr-var-attrs-in:checked ~ .xr-var-attrs,
.xr-var-data-in:checked ~ .xr-var-data,
.xr-index-data-in:checked ~ .xr-index-data {
display: block;
}

.xr-var-data > table {
float: right;
}

.xr-var-name span,
.xr-var-data,
.xr-index-name div,
.xr-index-data,
.xr-attrs {
padding-left: 25px !important;
}

.xr-attrs,
.xr-var-attrs,
.xr-var-data,
.xr-index-data {
grid-column: 1 / -1;
}

dl.xr-attrs {
padding: 0;
margin: 0;
display: grid;
grid-template-columns: 125px auto;
}

.xr-attrs dt,
.xr-attrs dd {
padding: 0;
margin: 0;
float: left;
padding-right: 10px;
width: auto;
}

.xr-attrs dt {
font-weight: normal;
grid-column: 1;
}

.xr-attrs dt:hover span {
display: inline-block;
background: var(--xr-background-color);
padding-right: 10px;
}

.xr-attrs dd {
grid-column: 2;
white-space: pre-wrap;
word-break: break-all;
}

.xr-icon-database,
.xr-icon-file-text2,
.xr-no-icon {
display: inline-block;
vertical-align: middle;
width: 1em;
height: 1.5em !important;
stroke-width: 0;
stroke: currentColor;
fill: currentColor;
}

</style><pre class='xr-text-repr-fallback'>&lt;xarray.Dataset&gt;
Dimensions:    (obs_dim_0: 8)
Coordinates:
* obs_dim_0  (obs_dim_0) int64 0 1 2 3 4 5 6 7
Data variables:
obs        (obs_dim_0) float64 ...
Attributes:
created_at:                 2022-10-13T14:37:18.113060
arviz_version:              0.13.0.dev0
inference_library:          pymc
inference_library_version:  4.2.2</pre><div class='xr-wrap' style='display:none'><div class='xr-header'><div class='xr-obj-type'>xarray.Dataset</div></div><ul class='xr-sections'><li class='xr-section-item'><input id='section-ffc908d4-e63d-48d6-b399-86131653e350' class='xr-section-summary-in' type='checkbox' disabled ><label for='section-ffc908d4-e63d-48d6-b399-86131653e350' class='xr-section-summary'  title='Expand/collapse section'>Dimensions:</label><div class='xr-section-inline-details'><ul class='xr-dim-list'><li><span class='xr-has-index'>obs_dim_0</span>: 8</li></ul></div><div class='xr-section-details'></div></li><li class='xr-section-item'><input id='section-b850c365-9776-417b-b90e-92c5c201d152' class='xr-section-summary-in' type='checkbox'  checked><label for='section-b850c365-9776-417b-b90e-92c5c201d152' class='xr-section-summary' >Coordinates: <span>(1)</span></label><div class='xr-section-inline-details'></div><div class='xr-section-details'><ul class='xr-var-list'><li class='xr-var-item'><div class='xr-var-name'><span class='xr-has-index'>obs_dim_0</span></div><div class='xr-var-dims'>(obs_dim_0)</div><div class='xr-var-dtype'>int64</div><div class='xr-var-preview xr-preview'>0 1 2 3 4 5 6 7</div><input id='attrs-01cdb7f1-1276-4813-969f-422ca1c704d4' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-01cdb7f1-1276-4813-969f-422ca1c704d4' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-100e0f5f-acf6-4b16-8a50-5d92c8ad9779' class='xr-var-data-in' type='checkbox'><label for='data-100e0f5f-acf6-4b16-8a50-5d92c8ad9779' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>array([0, 1, 2, 3, 4, 5, 6, 7])</pre></div></li></ul></div></li><li class='xr-section-item'><input id='section-b59a8e3e-f086-4018-a618-14c77d7049ee' class='xr-section-summary-in' type='checkbox'  checked><label for='section-b59a8e3e-f086-4018-a618-14c77d7049ee' class='xr-section-summary' >Data variables: <span>(1)</span></label><div class='xr-section-inline-details'></div><div class='xr-section-details'><ul class='xr-var-list'><li class='xr-var-item'><div class='xr-var-name'><span>obs</span></div><div class='xr-var-dims'>(obs_dim_0)</div><div class='xr-var-dtype'>float64</div><div class='xr-var-preview xr-preview'>...</div><input id='attrs-bd858847-e20c-4aa6-8534-b835ec224911' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-bd858847-e20c-4aa6-8534-b835ec224911' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-56895d87-3fa6-401c-b90f-59030b59773d' class='xr-var-data-in' type='checkbox'><label for='data-56895d87-3fa6-401c-b90f-59030b59773d' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>[8 values with dtype=float64]</pre></div></li></ul></div></li><li class='xr-section-item'><input id='section-4856962c-5eed-4c6e-8741-d6c610e67988' class='xr-section-summary-in' type='checkbox'  ><label for='section-4856962c-5eed-4c6e-8741-d6c610e67988' class='xr-section-summary' >Indexes: <span>(1)</span></label><div class='xr-section-inline-details'></div><div class='xr-section-details'><ul class='xr-var-list'><li class='xr-var-item'><div class='xr-index-name'><div>obs_dim_0</div></div><div class='xr-index-preview'>PandasIndex</div><div></div><input id='index-e25979b5-6d8f-4819-9a2e-f9a2312a3f18' class='xr-index-data-in' type='checkbox'/><label for='index-e25979b5-6d8f-4819-9a2e-f9a2312a3f18' title='Show/Hide index repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-index-data'><pre>PandasIndex(Int64Index([0, 1, 2, 3, 4, 5, 6, 7], dtype=&#x27;int64&#x27;, name=&#x27;obs_dim_0&#x27;))</pre></div></li></ul></div></li><li class='xr-section-item'><input id='section-8f549cc2-67a2-427e-9c6b-bdb30a612069' class='xr-section-summary-in' type='checkbox'  checked><label for='section-8f549cc2-67a2-427e-9c6b-bdb30a612069' class='xr-section-summary' >Attributes: <span>(4)</span></label><div class='xr-section-inline-details'></div><div class='xr-section-details'><dl class='xr-attrs'><dt><span>created_at :</span></dt><dd>2022-10-13T14:37:18.113060</dd><dt><span>arviz_version :</span></dt><dd>0.13.0.dev0</dd><dt><span>inference_library :</span></dt><dd>pymc</dd><dt><span>inference_library_version :</span></dt><dd>4.2.2</dd></dl></div></li></ul></div></div><br></div>
</ul>
</div>
</li>

<li class = "xr-section-item">
<input id="idata_constant_datadfdce6e7-0313-4ab7-a5ed-46440b1ad405" class="xr-section-summary-in" type="checkbox">
<label for="idata_constant_datadfdce6e7-0313-4ab7-a5ed-46440b1ad405" class = "xr-section-summary">constant_data</label>
<div class="xr-section-inline-details"></div>
<div class="xr-section-details">
<ul id="xr-dataset-coord-list" class="xr-var-list">
<div style="padding-left:2rem;"><div><svg style="position: absolute; width: 0; height: 0; overflow: hidden">
<defs>
<symbol id="icon-database" viewBox="0 0 32 32">
<path d="M16 0c-8.837 0-16 2.239-16 5v4c0 2.761 7.163 5 16 5s16-2.239 16-5v-4c0-2.761-7.163-5-16-5z"></path>
<path d="M16 17c-8.837 0-16-2.239-16-5v6c0 2.761 7.163 5 16 5s16-2.239 16-5v-6c0 2.761-7.163 5-16 5z"></path>
<path d="M16 26c-8.837 0-16-2.239-16-5v6c0 2.761 7.163 5 16 5s16-2.239 16-5v-6c0 2.761-7.163 5-16 5z"></path>
</symbol>
<symbol id="icon-file-text2" viewBox="0 0 32 32">
<path d="M28.681 7.159c-0.694-0.947-1.662-2.053-2.724-3.116s-2.169-2.030-3.116-2.724c-1.612-1.182-2.393-1.319-2.841-1.319h-15.5c-1.378 0-2.5 1.121-2.5 2.5v27c0 1.378 1.122 2.5 2.5 2.5h23c1.378 0 2.5-1.122 2.5-2.5v-19.5c0-0.448-0.137-1.23-1.319-2.841zM24.543 5.457c0.959 0.959 1.712 1.825 2.268 2.543h-4.811v-4.811c0.718 0.556 1.584 1.309 2.543 2.268zM28 29.5c0 0.271-0.229 0.5-0.5 0.5h-23c-0.271 0-0.5-0.229-0.5-0.5v-27c0-0.271 0.229-0.5 0.5-0.5 0 0 15.499-0 15.5 0v7c0 0.552 0.448 1 1 1h7v19.5z"></path>
<path d="M23 26h-14c-0.552 0-1-0.448-1-1s0.448-1 1-1h14c0.552 0 1 0.448 1 1s-0.448 1-1 1z"></path>
<path d="M23 22h-14c-0.552 0-1-0.448-1-1s0.448-1 1-1h14c0.552 0 1 0.448 1 1s-0.448 1-1 1z"></path>
<path d="M23 18h-14c-0.552 0-1-0.448-1-1s0.448-1 1-1h14c0.552 0 1 0.448 1 1s-0.448 1-1 1z"></path>
</symbol>
</defs>
</svg>
<style>/* CSS stylesheet for displaying xarray objects in jupyterlab.
*
*/

:root {
--xr-font-color0: var(--jp-content-font-color0, rgba(0, 0, 0, 1));
--xr-font-color2: var(--jp-content-font-color2, rgba(0, 0, 0, 0.54));
--xr-font-color3: var(--jp-content-font-color3, rgba(0, 0, 0, 0.38));
--xr-border-color: var(--jp-border-color2, #e0e0e0);
--xr-disabled-color: var(--jp-layout-color3, #bdbdbd);
--xr-background-color: var(--jp-layout-color0, white);
--xr-background-color-row-even: var(--jp-layout-color1, white);
--xr-background-color-row-odd: var(--jp-layout-color2, #eeeeee);
}

html[theme=dark],
body[data-theme=dark],
body.vscode-dark {
--xr-font-color0: rgba(255, 255, 255, 1);
--xr-font-color2: rgba(255, 255, 255, 0.54);
--xr-font-color3: rgba(255, 255, 255, 0.38);
--xr-border-color: #1F1F1F;
--xr-disabled-color: #515151;
--xr-background-color: #111111;
--xr-background-color-row-even: #111111;
--xr-background-color-row-odd: #313131;
}

.xr-wrap {
display: block !important;
min-width: 300px;
max-width: 700px;
}

.xr-text-repr-fallback {
/_ fallback to plain text repr when CSS is not injected (untrusted notebook) _/
display: none;
}

.xr-header {
padding-top: 6px;
padding-bottom: 6px;
margin-bottom: 4px;
border-bottom: solid 1px var(--xr-border-color);
}

.xr-header > div,
.xr-header > ul {
display: inline;
margin-top: 0;
margin-bottom: 0;
}

.xr-obj-type,
.xr-array-name {
margin-left: 2px;
margin-right: 10px;
}

.xr-obj-type {
color: var(--xr-font-color2);
}

.xr-sections {
padding-left: 0 !important;
display: grid;
grid-template-columns: 150px auto auto 1fr 20px 20px;
}

.xr-section-item {
display: contents;
}

.xr-section-item input {
display: none;
}

.xr-section-item input + label {
color: var(--xr-disabled-color);
}

.xr-section-item input:enabled + label {
cursor: pointer;
color: var(--xr-font-color2);
}

.xr-section-item input:enabled + label:hover {
color: var(--xr-font-color0);
}

.xr-section-summary {
grid-column: 1;
color: var(--xr-font-color2);
font-weight: 500;
}

.xr-section-summary > span {
display: inline-block;
padding-left: 0.5em;
}

.xr-section-summary-in:disabled + label {
color: var(--xr-font-color2);
}

.xr-section-summary-in + label:before {
display: inline-block;
content: '►';
font-size: 11px;
width: 15px;
text-align: center;
}

.xr-section-summary-in:disabled + label:before {
color: var(--xr-disabled-color);
}

.xr-section-summary-in:checked + label:before {
content: '▼';
}

.xr-section-summary-in:checked + label > span {
display: none;
}

.xr-section-summary,
.xr-section-inline-details {
padding-top: 4px;
padding-bottom: 4px;
}

.xr-section-inline-details {
grid-column: 2 / -1;
}

.xr-section-details {
display: none;
grid-column: 1 / -1;
margin-bottom: 5px;
}

.xr-section-summary-in:checked ~ .xr-section-details {
display: contents;
}

.xr-array-wrap {
grid-column: 1 / -1;
display: grid;
grid-template-columns: 20px auto;
}

.xr-array-wrap > label {
grid-column: 1;
vertical-align: top;
}

.xr-preview {
color: var(--xr-font-color3);
}

.xr-array-preview,
.xr-array-data {
padding: 0 5px !important;
grid-column: 2;
}

.xr-array-data,
.xr-array-in:checked ~ .xr-array-preview {
display: none;
}

.xr-array-in:checked ~ .xr-array-data,
.xr-array-preview {
display: inline-block;
}

.xr-dim-list {
display: inline-block !important;
list-style: none;
padding: 0 !important;
margin: 0;
}

.xr-dim-list li {
display: inline-block;
padding: 0;
margin: 0;
}

.xr-dim-list:before {
content: '(';
}

.xr-dim-list:after {
content: ')';
}

.xr-dim-list li:not(:last-child):after {
content: ',';
padding-right: 5px;
}

.xr-has-index {
font-weight: bold;
}

.xr-var-list,
.xr-var-item {
display: contents;
}

.xr-var-item > div,
.xr-var-item label,
.xr-var-item > .xr-var-name span {
background-color: var(--xr-background-color-row-even);
margin-bottom: 0;
}

.xr-var-item > .xr-var-name:hover span {
padding-right: 5px;
}

.xr-var-list > li:nth-child(odd) > div,
.xr-var-list > li:nth-child(odd) > label,
.xr-var-list > li:nth-child(odd) > .xr-var-name span {
background-color: var(--xr-background-color-row-odd);
}

.xr-var-name {
grid-column: 1;
}

.xr-var-dims {
grid-column: 2;
}

.xr-var-dtype {
grid-column: 3;
text-align: right;
color: var(--xr-font-color2);
}

.xr-var-preview {
grid-column: 4;
}

.xr-index-preview {
grid-column: 2 / 5;
color: var(--xr-font-color2);
}

.xr-var-name,
.xr-var-dims,
.xr-var-dtype,
.xr-preview,
.xr-attrs dt {
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
padding-right: 10px;
}

.xr-var-name:hover,
.xr-var-dims:hover,
.xr-var-dtype:hover,
.xr-attrs dt:hover {
overflow: visible;
width: auto;
z-index: 1;
}

.xr-var-attrs,
.xr-var-data,
.xr-index-data {
display: none;
background-color: var(--xr-background-color) !important;
padding-bottom: 5px !important;
}

.xr-var-attrs-in:checked ~ .xr-var-attrs,
.xr-var-data-in:checked ~ .xr-var-data,
.xr-index-data-in:checked ~ .xr-index-data {
display: block;
}

.xr-var-data > table {
float: right;
}

.xr-var-name span,
.xr-var-data,
.xr-index-name div,
.xr-index-data,
.xr-attrs {
padding-left: 25px !important;
}

.xr-attrs,
.xr-var-attrs,
.xr-var-data,
.xr-index-data {
grid-column: 1 / -1;
}

dl.xr-attrs {
padding: 0;
margin: 0;
display: grid;
grid-template-columns: 125px auto;
}

.xr-attrs dt,
.xr-attrs dd {
padding: 0;
margin: 0;
float: left;
padding-right: 10px;
width: auto;
}

.xr-attrs dt {
font-weight: normal;
grid-column: 1;
}

.xr-attrs dt:hover span {
display: inline-block;
background: var(--xr-background-color);
padding-right: 10px;
}

.xr-attrs dd {
grid-column: 2;
white-space: pre-wrap;
word-break: break-all;
}

.xr-icon-database,
.xr-icon-file-text2,
.xr-no-icon {
display: inline-block;
vertical-align: middle;
width: 1em;
height: 1.5em !important;
stroke-width: 0;
stroke: currentColor;
fill: currentColor;
}

</style><pre class='xr-text-repr-fallback'>&lt;xarray.Dataset&gt;
Dimensions:  (school: 8)
Coordinates:
* school   (school) object &#x27;Choate&#x27; &#x27;Deerfield&#x27; ... &quot;St. Paul&#x27;s&quot; &#x27;Mt. Hermon&#x27;
Data variables:
scores   (school) float64 ...
Attributes:
created_at:                 2022-10-13T14:37:18.114126
arviz_version:              0.13.0.dev0
inference_library:          pymc
inference_library_version:  4.2.2</pre><div class='xr-wrap' style='display:none'><div class='xr-header'><div class='xr-obj-type'>xarray.Dataset</div></div><ul class='xr-sections'><li class='xr-section-item'><input id='section-735f6211-03a1-4792-9d5e-174a84a86d81' class='xr-section-summary-in' type='checkbox' disabled ><label for='section-735f6211-03a1-4792-9d5e-174a84a86d81' class='xr-section-summary'  title='Expand/collapse section'>Dimensions:</label><div class='xr-section-inline-details'><ul class='xr-dim-list'><li><span class='xr-has-index'>school</span>: 8</li></ul></div><div class='xr-section-details'></div></li><li class='xr-section-item'><input id='section-0ea40c07-d133-4ca8-b4eb-21bb9f5b8c39' class='xr-section-summary-in' type='checkbox'  checked><label for='section-0ea40c07-d133-4ca8-b4eb-21bb9f5b8c39' class='xr-section-summary' >Coordinates: <span>(1)</span></label><div class='xr-section-inline-details'></div><div class='xr-section-details'><ul class='xr-var-list'><li class='xr-var-item'><div class='xr-var-name'><span class='xr-has-index'>school</span></div><div class='xr-var-dims'>(school)</div><div class='xr-var-dtype'>object</div><div class='xr-var-preview xr-preview'>&#x27;Choate&#x27; ... &#x27;Mt. Hermon&#x27;</div><input id='attrs-90d82f55-34fb-4723-85aa-2cc0fec9a749' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-90d82f55-34fb-4723-85aa-2cc0fec9a749' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-e2612412-9140-4ea9-82b1-5655572562df' class='xr-var-data-in' type='checkbox'><label for='data-e2612412-9140-4ea9-82b1-5655572562df' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>array([&#x27;Choate&#x27;, &#x27;Deerfield&#x27;, &#x27;Phillips Andover&#x27;, &#x27;Phillips Exeter&#x27;,
&#x27;Hotchkiss&#x27;, &#x27;Lawrenceville&#x27;, &quot;St. Paul&#x27;s&quot;, &#x27;Mt. Hermon&#x27;], dtype=object)</pre></div></li></ul></div></li><li class='xr-section-item'><input id='section-86b33f0f-bf72-4adc-a223-28029c48bdad' class='xr-section-summary-in' type='checkbox'  checked><label for='section-86b33f0f-bf72-4adc-a223-28029c48bdad' class='xr-section-summary' >Data variables: <span>(1)</span></label><div class='xr-section-inline-details'></div><div class='xr-section-details'><ul class='xr-var-list'><li class='xr-var-item'><div class='xr-var-name'><span>scores</span></div><div class='xr-var-dims'>(school)</div><div class='xr-var-dtype'>float64</div><div class='xr-var-preview xr-preview'>...</div><input id='attrs-6268ce46-b14e-402f-b69e-7b1c0cf1ab27' class='xr-var-attrs-in' type='checkbox' disabled><label for='attrs-6268ce46-b14e-402f-b69e-7b1c0cf1ab27' title='Show/Hide attributes'><svg class='icon xr-icon-file-text2'><use xlink:href='#icon-file-text2'></use></svg></label><input id='data-d1ae11cd-5588-4f56-8644-e556499f7299' class='xr-var-data-in' type='checkbox'><label for='data-d1ae11cd-5588-4f56-8644-e556499f7299' title='Show/Hide data repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-var-attrs'><dl class='xr-attrs'></dl></div><div class='xr-var-data'><pre>[8 values with dtype=float64]</pre></div></li></ul></div></li><li class='xr-section-item'><input id='section-fa81ffb6-4bdb-48aa-a566-546971e0db0c' class='xr-section-summary-in' type='checkbox'  ><label for='section-fa81ffb6-4bdb-48aa-a566-546971e0db0c' class='xr-section-summary' >Indexes: <span>(1)</span></label><div class='xr-section-inline-details'></div><div class='xr-section-details'><ul class='xr-var-list'><li class='xr-var-item'><div class='xr-index-name'><div>school</div></div><div class='xr-index-preview'>PandasIndex</div><div></div><input id='index-ef58471b-7214-4b9e-94a1-59df1cf3316e' class='xr-index-data-in' type='checkbox'/><label for='index-ef58471b-7214-4b9e-94a1-59df1cf3316e' title='Show/Hide index repr'><svg class='icon xr-icon-database'><use xlink:href='#icon-database'></use></svg></label><div class='xr-index-data'><pre>PandasIndex(Index([&#x27;Choate&#x27;, &#x27;Deerfield&#x27;, &#x27;Phillips Andover&#x27;, &#x27;Phillips Exeter&#x27;,
&#x27;Hotchkiss&#x27;, &#x27;Lawrenceville&#x27;, &#x27;St. Paul&#x27;s&#x27;, &#x27;Mt. Hermon&#x27;],
dtype=&#x27;object&#x27;, name=&#x27;school&#x27;))</pre></div></li></ul></div></li><li class='xr-section-item'><input id='section-8e3e1319-05c0-4398-ba18-eeaba32eaeae' class='xr-section-summary-in' type='checkbox'  checked><label for='section-8e3e1319-05c0-4398-ba18-eeaba32eaeae' class='xr-section-summary' >Attributes: <span>(4)</span></label><div class='xr-section-inline-details'></div><div class='xr-section-details'><dl class='xr-attrs'><dt><span>created_at :</span></dt><dd>2022-10-13T14:37:18.114126</dd><dt><span>arviz_version :</span></dt><dd>0.13.0.dev0</dd><dt><span>inference_library :</span></dt><dd>pymc</dd><dt><span>inference_library_version :</span></dt><dd>4.2.2</dd></dl></div></li></ul></div></div><br></div>
</ul>
</div>
</li>

</ul>
</div>
<style> /* CSS stylesheet for displaying InferenceData objects in jupyterlab.
*
*/

:root {
--xr-font-color0: var(--jp-content-font-color0, rgba(0, 0, 0, 1));
--xr-font-color2: var(--jp-content-font-color2, rgba(0, 0, 0, 0.54));
--xr-font-color3: var(--jp-content-font-color3, rgba(0, 0, 0, 0.38));
--xr-border-color: var(--jp-border-color2, #e0e0e0);
--xr-disabled-color: var(--jp-layout-color3, #bdbdbd);
--xr-background-color: var(--jp-layout-color0, white);
--xr-background-color-row-even: var(--jp-layout-color1, white);
--xr-background-color-row-odd: var(--jp-layout-color2, #eeeeee);
}

html[theme=dark],
body.vscode-dark {
--xr-font-color0: rgba(255, 255, 255, 1);
--xr-font-color2: rgba(255, 255, 255, 0.54);
--xr-font-color3: rgba(255, 255, 255, 0.38);
--xr-border-color: #1F1F1F;
--xr-disabled-color: #515151;
--xr-background-color: #111111;
--xr-background-color-row-even: #111111;
--xr-background-color-row-odd: #313131;
}

.xr-wrap {
display: block;
min-width: 300px;
max-width: 700px;
}

.xr-text-repr-fallback {
/_ fallback to plain text repr when CSS is not injected (untrusted notebook) _/
display: none;
}

.xr-header {
padding-top: 6px;
padding-bottom: 6px;
margin-bottom: 4px;
border-bottom: solid 1px var(--xr-border-color);
}

.xr-header > div,
.xr-header > ul {
display: inline;
margin-top: 0;
margin-bottom: 0;
}

.xr-obj-type,
.xr-array-name {
margin-left: 2px;
margin-right: 10px;
}

.xr-obj-type {
color: var(--xr-font-color2);
}

.xr-sections {
padding-left: 0 !important;
display: grid;
grid-template-columns: 150px auto auto 1fr 20px 20px;
}

.xr-sections.group-sections {
grid-template-columns: auto;
}

.xr-section-item {
display: contents;
}

.xr-section-item input {
display: none;
}

.xr-section-item input + label {
color: var(--xr-disabled-color);
}

.xr-section-item input:enabled + label {
cursor: pointer;
color: var(--xr-font-color2);
}

.xr-section-item input:enabled + label:hover {
color: var(--xr-font-color0);
}

.xr-section-summary {
grid-column: 1;
color: var(--xr-font-color2);
font-weight: 500;
}

.xr-section-summary > span {
display: inline-block;
padding-left: 0.5em;
}

.xr-section-summary-in:disabled + label {
color: var(--xr-font-color2);
}

.xr-section-summary-in + label:before {
display: inline-block;
content: '►';
font-size: 11px;
width: 15px;
text-align: center;
}

.xr-section-summary-in:disabled + label:before {
color: var(--xr-disabled-color);
}

.xr-section-summary-in:checked + label:before {
content: '▼';
}

.xr-section-summary-in:checked + label > span {
display: none;
}

.xr-section-summary,
.xr-section-inline-details {
padding-top: 4px;
padding-bottom: 4px;
}

.xr-section-inline-details {
grid-column: 2 / -1;
}

.xr-section-details {
display: none;
grid-column: 1 / -1;
margin-bottom: 5px;
}

.xr-section-summary-in:checked ~ .xr-section-details {
display: contents;
}

.xr-array-wrap {
grid-column: 1 / -1;
display: grid;
grid-template-columns: 20px auto;
}

.xr-array-wrap > label {
grid-column: 1;
vertical-align: top;
}

.xr-preview {
color: var(--xr-font-color3);
}

.xr-array-preview,
.xr-array-data {
padding: 0 5px !important;
grid-column: 2;
}

.xr-array-data,
.xr-array-in:checked ~ .xr-array-preview {
display: none;
}

.xr-array-in:checked ~ .xr-array-data,
.xr-array-preview {
display: inline-block;
}

.xr-dim-list {
display: inline-block !important;
list-style: none;
padding: 0 !important;
margin: 0;
}

.xr-dim-list li {
display: inline-block;
padding: 0;
margin: 0;
}

.xr-dim-list:before {
content: '(';
}

.xr-dim-list:after {
content: ')';
}

.xr-dim-list li:not(:last-child):after {
content: ',';
padding-right: 5px;
}

.xr-has-index {
font-weight: bold;
}

.xr-var-list,
.xr-var-item {
display: contents;
}

.xr-var-item > div,
.xr-var-item label,
.xr-var-item > .xr-var-name span {
background-color: var(--xr-background-color-row-even);
margin-bottom: 0;
}

.xr-var-item > .xr-var-name:hover span {
padding-right: 5px;
}

.xr-var-list > li:nth-child(odd) > div,
.xr-var-list > li:nth-child(odd) > label,
.xr-var-list > li:nth-child(odd) > .xr-var-name span {
background-color: var(--xr-background-color-row-odd);
}

.xr-var-name {
grid-column: 1;
}

.xr-var-dims {
grid-column: 2;
}

.xr-var-dtype {
grid-column: 3;
text-align: right;
color: var(--xr-font-color2);
}

.xr-var-preview {
grid-column: 4;
}

.xr-var-name,
.xr-var-dims,
.xr-var-dtype,
.xr-preview,
.xr-attrs dt {
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
padding-right: 10px;
}

.xr-var-name:hover,
.xr-var-dims:hover,
.xr-var-dtype:hover,
.xr-attrs dt:hover {
overflow: visible;
width: auto;
z-index: 1;
}

.xr-var-attrs,
.xr-var-data {
display: none;
background-color: var(--xr-background-color) !important;
padding-bottom: 5px !important;
}

.xr-var-attrs-in:checked ~ .xr-var-attrs,
.xr-var-data-in:checked ~ .xr-var-data {
display: block;
}

.xr-var-data > table {
float: right;
}

.xr-var-name span,
.xr-var-data,
.xr-attrs {
padding-left: 25px !important;
}

.xr-attrs,
.xr-var-attrs,
.xr-var-data {
grid-column: 1 / -1;
}

dl.xr-attrs {
padding: 0;
margin: 0;
display: grid;
grid-template-columns: 125px auto;
}

.xr-attrs dt, dd {
padding: 0;
margin: 0;
float: left;
padding-right: 10px;
width: auto;
}

.xr-attrs dt {
font-weight: normal;
grid-column: 1;
}

.xr-attrs dt:hover span {
display: inline-block;
background: var(--xr-background-color);
padding-right: 10px;
}

.xr-attrs dd {
grid-column: 2;
white-space: pre-wrap;
word-break: break-all;
}

.xr-icon-database,
.xr-icon-file-text2 {
display: inline-block;
vertical-align: middle;
width: 1em;
height: 1.5em !important;
stroke-width: 0;
stroke: currentColor;
fill: currentColor;
}
.xr-wrap{width:700px!important;} </style>

## The Life of a modern Bayesian

The utility of `az.InferenceData` will not be very apparent unless we first talk about the life of a Modern Bayesian Statistician,
the Probabilistic Programming Language (PPL) Designer, and what things used to be like before `az.InferenceData`.

### The Modern Bayesian Practitioner

Like most modern statisticians, the Modern Bayesian Statistician uses a computer to perform their work.
Many PPLs are available for this kind of work, such as [Stan](https://mc-stan.org/),
[PyMC](https://www.pymc.io/), [Tensorflow Probability](https://www.tensorflow.org/probability), [NumPyro](http://pyro.ai/numpyro/) etc.

With probabilistic programming language in hand, the Bayesian then follows the "Bayesian workflow" below, performing each of the various steps
as part of their analysis.

![Bayesian Workflow](https://bayesiancomputationbook.com/_images/Bayesian_workflow.png)

At each of these steps the PPLs generate many arrays, and not only single dimension arrays, but multi dimensional arrays.
The prior predictive distribution, the posterior distribution, the posterior predictive distribution, the log likelihood, and even the input data
are all numerical quantities that need to be captured and ordered to facilitate analysis.

Often these arrays need to be passed to specialized functions in order to check for Markov Chain Monte Carlo (MCMC) convergence, model comparison, or getting summaries from the target distribution.

And once the individual statistician has completed their work, they may either want to save it to disk,
or share it with a colleague.

## The Modern PPL designer

Now consider a PPL designer. PPL designers typically want to focus on model building and inference: graph representation, samplers, symbolic differentiation speed and stability.
However for their PPL to be useful they must ensure that users have easy access to diagnostics,
visualizations, and model criticism tools.
Suddenly the scope of their codebase grows, and duplicative functionality now exists across
the open source Bayesian ecosystem.

## Life before az.InferenceData

Before `az.InferenceData` there wasn't a consistent object or method both for the user or for the PPL library maintainers.
Things like posteriors, prior predictives, observed data, and sampler stats could be stored in their own ways,
For example one PPL may store their modeling outputs in a dictionary, other may have used plain NumPy arrays, a third had its own custom class.
And that's even before considering the shapes and indices of the array.

This all meant

- Each PPL designer would have to implement their own data objects and would have to solve lots problems like how to serialize data to disk.
- All adjacent workflow libraries would only work with a subset of these objects, or would require users to restructure data each time.
- The APIs and interfaces for all of these were inconsistent making life challenging for end user. Users of different PPLs would be isolated in completely different ecosystems, even when the PPLs share the same general programming language.

## How az.InferenceData works and its implementation

`az.InferenceData` is an object that stores (nearly) all the outputs of Bayesian Modeling in a consistent manner.
Under the hood `az.InferenceData` is largely a collection of Xarray objects, with some utility functions built in as well.
Xarray was the natural choice, because storing indexes, and performing calculations
over multidimensional outputs are routine tasks for computational Bayesian modelers.
Named dimensions let us directly interact with the dimensions of interest, such as the quantities being studied.
Importantly they also remove implicit assumptions of which dimension represents chains and draws,\
dimensions while necessary for sampling, are not so interesting when trying to perform inference, 
similar to how batch dimensions are a computational nuance, but not a modeling nuance.

Often in Bayesian analysis we tend to reduce multidimensional arrays into lesser multidimensional arrays, 
for instance taking the mean across a distribution while leaving the other dimensions untouched. 
Xarray named dimensions also let us do this in a readable and repeatable way agnostic of PPL or model construction.


![InferenceData Architecture](https://python.arviz.org/en/stable/_images/InferenceDataStructure.png)

## How this enables ArviZ

With a consistent object that represents the outputs of PPLs, it became possible to develop ArviZ,
a unified library for exploratory analysis of Bayesian models.
Now it does not matter which PPL someone decides to use,
as long as they follow the InferenceData specification ArviZ will know "what to do".
This enables PPL designer to focus on the core of inference,
and also ensures Bayesian Practitioners don't need to relearn the entire toolbox if they decide to switch PPLs.

### The benefit of Xarray

Xarray, in turn, simplifies the lives of the ArviZ developers because we do not need to focus too much on the data storage object, and instead, we can focus on the statistical computations.
Of the [key features of Xarray](https://xarray.dev/#features) we directly utilize

- Interoperability
- Operations over named dimensions
- Value selection by label
- Vectorized operations
- Flexible and Extensible I/O backend API

## Xarray Einstats

The ArviZ project also maintains [xarray-einstats](https://einstats.python.arviz.org/en/latest/), which provides label-aware wrappers for the following functionalities:

- Linear algebra (wrapping `numpy.linalg`)
- Statistical computations like summary statistics, random sampling, or working with distributions (wrapping `scipy.stats`)
- Reduce and rearrange operations (wrapping `einops`)

## Conclusion

Xarray enables neat functionality, standardization, and simplification for Bayesian users.
If you're a Bayesian practitioner we invite you to use [ArviZ](https://python.arviz.org/), and xarray by extension, to see how easy things are.
If you're a library developer for anything that uses numerical, consider how Xarray could help your users.
We're quite thrilled with the capabilities of Xarray today and are excited to see what's to come in the future!
