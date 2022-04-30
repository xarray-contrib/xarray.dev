---
title: Magnis molestie vestibulum ridiculus eget dictum auctor elementum porta fringilla.!
date: "2022-03-10"
authors: [Chetana Débora, Iudith Bruce]
summary: Welcome to the Home page. This whole page is rendered from a single .mdx file!
---

import { Button } from "@chakra-ui/react"

## This is h2

### This is h3

#### and so on...

Welcome to the Home page. This whole page is rendered from a single `.mdx` file!

<Image
borderRadius='full'
boxSize='150px'
src="https://www.nasa.gov/sites/default/files/1-bluemarble_west.jpg"
alt="nasa"
/>

You get code blocks:

```javascript
const Component = () => {
  return <p>Hello!</p>
}

export default Component
```

> This is a blockquote. Use it wisely.

<span>
  There's also a keyboard component: <kbd>Shift</kbd> + <kbd>H</kbd>
</span>

There's also a [Link component](https://chakra-ui.com)

And `<hr/>` as well

---

Even unordered lists:

- Chakra UI
- Next JS

And ordered:

1. MDX
2. React

You can even render buttons, but they won't do anything if they're not placed inside of a custom component:

<Button>Hello!</Button>

```jsx
function createStyleObject(classNames, style) {
  return classNames.reduce((styleObject, className) => {
    return { ...styleObject, ...style[className] }
  }, {})
}

function createClassNameString(classNames) {
  return classNames.join(" ")
}

// this comment is here to demonstrate an extremely long line length, well beyond what you should probably allow in your own code, though sometimes you'll be highlighting code you can't refactor, which is unfortunate but should be handled gracefully

function createChildren(style, useInlineStyles) {
  let childrenCount = 0
  return (children) => {
    childrenCount += 1
    return children.map((child, i) =>
      createElement({
        node: child,
        style,
        useInlineStyles,
        key: `code-segment-${childrenCount}-${i}`,
      })
    )
  }
}

function createElement({ node, style, useInlineStyles, key }) {
  const { properties, type, tagName, value } = node
  if (type === "text") {
    return value
  } else if (tagName) {
    const TagName = tagName
    const childrenCreator = createChildren(style, useInlineStyles)
    const props = useInlineStyles
      ? { style: createStyleObject(properties.className, style) }
      : { className: createClassNameString(properties.className) }
    const children = childrenCreator(node.children)
    return (
      <TagName key={key} {...props}>
        {children}
      </TagName>
    )
  }
}
```

```python
"""
To try Xarray in the browser,
use the console located 👉 or 👇:
1. Type code in the input cell and press
   Shift + Enter to execute
2. Or copy paste the code, and click on
   the "Run" ▶ button in the toolbar
""".
import xarray as xr
import pandas as pd
import numpy as np

data = xr.DataArray(
    np.random.randn(3, 2, 3),
    dims=("time", "lat", "lon"),
    coords={
        "lat": [10, 20],
        "time": pd.date_range(
            "2020-01", periods=3, freq="MS"
        ),
    },
)

# positional and by integer label, like numpy
data[0, :]

# loc or "location": positional and
# coordinate label, like pandas
data.loc[:, 10]

# isel or "integer select": by dimension name
# and integer label
data.isel(lat=0)

# sel or "select": by dimension name and
# coordinate label
data.sel(time="2020-01")

# Data aggregations uses dimension names
# instead of axis numbers
data.mean(dim=["time", "lat"])

# quick and convenient visualizations
data.isel(lon=0).plot();

# Pretty neat, eh? :)
# For more, head over to the documentation page
```
