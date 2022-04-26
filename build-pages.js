// Adapted from https://github.com/carbonplan/blog
// MIT License

// Copyright (c) 2020 carbonplan

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

const fs = require("fs")
const glob = require("glob")
const extractMdxMeta = require("extract-mdx-metadata")

const existing = glob.sync(
  "./src/pages/blog/!(index.js|rss.xml.js|contents.json.js)"
)

existing.forEach((f) => {
  if (fs.rmSync) fs.rmSync(f)
})

// Build pages and contents.js from articles
glob("./src/posts/**.md", async (err, filePaths) => {
  const articleContents = await Promise.all(filePaths.map(getMetadata))

  // Construct contents.js
  const sorted = articleContents
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map((meta, idx) => ({ ...meta, number: articleContents.length - 1 - idx }))
  const contents = `export const Contents = ${JSON.stringify(sorted)}`
  fs.writeFileSync("./src/data/contents.js", contents)

  // Construct pages/blog
  sorted.forEach((meta) => {
    const { id, number } = meta
    const page = `
    import Index, {meta} from '../../posts/${id}.md'
    // import { Post } from '@carbonplan/layouts'

    console.log(meta)
    const Content = () => (

      <>
        <Index />
      </>
    )

    export default Content
    `
    fs.writeFileSync(`./src/pages/blog/${id}.js`, page)
  })
})

async function getMetadata(path) {
  const content = fs.readFileSync(path)
  const meta = await extractMdxMeta(content)
  const id = path.match(/[^/]+(?=\.md)/)

  if (!id || !id[0]) {
    throw new Error(`Invalid article path: ${path}`)
  }

  return {
    id: id[0],
    ...meta,
  }
}
