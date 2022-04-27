// import { bundleMDX } from "mdx-bundler"
import React from "react"
import { Button, Image, Stack } from "@chakra-ui/react"
import { MdBuild, MdCall } from "react-icons/md"

import { serialize } from "next-mdx-remote/serialize"
import { MDXRemote } from "next-mdx-remote"

import { getPostData, getAllPostsIds } from "../../lib/posts"

export default function Post({ mdxSource }) {
  return (
    <>
      <main>
        {" "}
        <MDXRemote
          {...mdxSource}
          components={{ Button, Image, Stack, MdBuild, MdCall }}
        />
      </main>
    </>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostsIds()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const postData = getPostData(params.id)
  const mdxSource = await serialize(postData.content, {
    parseFrontmatter: true,
  })

  return { props: { mdxSource } }
}
