# xarray landing page

[![Netlify Status](https://api.netlify.com/api/v1/badges/4f940719-54bd-4ff7-95e0-0088dfb3c10f/deploy-status)](https://app.netlify.com/projects/xarraydev/deploys)

Landing Page for xarray project.

## Overview

This project is built using the following tools/technologies:

1. [Next.js](https://nextjs.org/)
2. [Chakra UI](https://chakra-ui.com/)

## Requirements

1. [Node.js](https://nodejs.org/)
2. [yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)

## Installation for local development

### 1. Clone the repository

```bash
git clone https://github.com/xarray-contrib/xarray.dev
```

### 2. Install dependencies

```bash
yarn install
# or
npm install
```

### 3. Run the development server

```bash
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

<a href='https://www.netlify.com'>
  <img
    src='https://www.netlify.com/assets/badges/netlify-badge-color-bg.svg'
    alt='Deploys by Netlify'
  />
</a>

## Authoring blog post tips

1. To create a new blog post a good place to start is copying a subfolder under `src/posts/`, so, for example https://xarray.dev/blog/flox is written here https://github.com/xarray-contrib/xarray.dev/blob/e04905f5ea039eb2eb848c0b4945beee323900e4/src/posts/flox/index.md

### Static assets

Once you have `src/posts/newpost/index.md` start writing! If you want to include figures or other static assets, they go into a matching `public/posts/newpost` folder. But! reference an images without the `public` part of the path like this:

```html
<p align="center">
  <img src="/posts/newpost/figure.png" />
</p>
```

### Xarray HTML reprs

To include an html repr, you must save it first:

```python
with open('da-repr.html', 'w') as f:
   f.write(da._repr_html_())
```

Then put it into the post's static assets folder `public/posts/newpost/da-repr.html`. And finally in `src/posts/newpost/index.md` you can include it with this syntax:

```
<RawHTML filePath='/posts/newpost/da-repr.html' />
```

### Toggling visibilty of sections (markdown comments)

While authoring, you might want to toggle specific sections on and off during rendering. You can do that with this syntax:

```
{/* This is a comment that won't be rendered! */}
```

### Landing page banner

If you'd like to add a link to the latest blog post on the landing page banner, edit this section here:

https://github.com/xarray-contrib/xarray.dev/blob/e04905f5ea039eb2eb848c0b4945beee323900e4/src/components/layout.js#L18
