import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), "src/posts")


export function getSortedPostsMetadata() {

const allPosts = fs.readdirSync(postsDirectory).filter((file) => /\.md$/.test(file))
  .map((file) => ({ file, id: file.replace(/\.md$/, "") })).map((post) => {
    const filePath = path.join(postsDirectory, post.file)
    const source = fs.readFileSync(filePath, "utf8")
    const matterData = matter(source)
    const id = post.id
    return {
      ...matterData.data,
      id,
      href: `/blog/${id}`,
      file: post.file,
      content: matterData.content,
    }
  }).sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })

  return allPosts

}


export function getAllPostsIds() {
  const allPosts = getSortedPostsMetadata()
  return allPosts.map((post) => {
    return {
      params: {
        id: post.id
      }
    }
  })
}

export function getPostData(id) {
  const allPosts = getSortedPostsMetadata()
  const post = allPosts.find((post) => post.id === id)
  return post

}
