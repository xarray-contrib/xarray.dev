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

  console.log(articleContents)

  // Construct contents.js
  const sorted = articleContents
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map((meta, idx) => ({ ...meta, number: articleContents.length - 1 - idx }))
  const contents = `export const Contents = ${JSON.stringify(sorted)}`
  fs.writeFileSync("./src/data/contents.js", contents)

  // Construct pages/research
  sorted.forEach((meta) => {
    const { id, number } = meta
    const page = `
    import Index, {meta} from '../../posts/${id}.md'
    // import { Post } from '@carbonplan/layouts'

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
  console.log(`file: ${path}`)
  console.log(`meta: ${JSON.stringify(meta)}`)

  if (!id || !id[0]) {
    throw new Error(`Invalid article path: ${path}`)
  }

  return {
    id: id[0],
    ...meta,
  }
}
