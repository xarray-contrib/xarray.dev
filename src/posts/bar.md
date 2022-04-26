import { Button } from "@chakra-ui/react"

export const meta = {
title: ' This is an MDX file!',
date: '2022-03-10',
authors: ['Foo Bar'],
summary: 'Welcome to the Home page. This whole page is rendered from a single .mdx file!'
}

## This is h2

### This is h3

#### and so on...

Welcome to the Home page. This whole page is rendered from a single `.mdx` file!

You get code blocks:

```jsx
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
