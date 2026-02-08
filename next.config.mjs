import nextMDX from "@next/mdx"
import rehypeSlug from "rehype-slug"

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [rehypeSlug],
    // If you use `MDXProvider`, uncomment the following line.
    providerImportSource: "@mdx-js/react",
    format: 'mdx',
  },
})

export default withMDX({
  // Silence Next.js 16 Turbopack warning when webpack config is present (e.g. from @next/mdx)
  turbopack: {},
  // Append the default value with md extensions
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  images: {
    domains: ["raw.githubusercontent.com", "numpy.org", "dask.org", "chainer.org", ],
  },
})
