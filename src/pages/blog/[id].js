import React from "react"
import {
  Button,
  Image,
  Stack,
  VStack,
  Heading,
  Divider,
  Text,
  Avatar,
  Wrap,
  WrapItem,
  Flex,
  Box,
} from "@chakra-ui/react"

import { ArrowBackIcon } from "@chakra-ui/icons"

import { MdBuild, MdCall } from "react-icons/md"

import { serialize } from "next-mdx-remote/serialize"
import { MDXRemote } from "next-mdx-remote"
import rehypeSlug from "rehype-slug"

import fs from "fs"
import path from "path"
import matter from "gray-matter"

import { getPostData, getAllPostsIds } from "../../lib/posts"
import { formatDate, distanceToNow } from "../../lib/date-formatting"
import { MDXElements } from "../../lib/mdx-elements"
import { Layout } from "components/Layout"
import { Link } from "components/mdx"
import { Giscus } from "components"

const CARDS_BASE_URL = "https://xarray.dev/cards"

export default function Post({ source, frontmatter, postId }) {
  const card = `${CARDS_BASE_URL}/${postId}.png`
  const date = new Date(frontmatter.date)

  return (
    <Layout
      title={`${frontmatter.title}`}
      card={card}
      description={frontmatter.summary}
      url={`https://xarray.dev/blog/${postId}`}
    >
      <Box
        py={20}
        spacing={8}
        justifyContent="center"
        alignItems="flex-start"
        m="0 auto 4rem auto"
        maxWidth="4xl"
      >
        <Box spacing="3" alignItems="start">
          <VStack paddingTop="30px" spacing="2" alignItems="center">
            <Heading as={"h1"} textAlign={"center"} size="xl" my={4}>
              {frontmatter.title}
            </Heading>
            <Text fontSize={"sm"} color={"gray.700"}>
              {formatDate(date)} ({distanceToNow(date)})
            </Text>

            <Wrap spacing="20px">
              {frontmatter.authors.map((author) => {
                return (
                  <WrapItem key={author}>
                    <Flex align={"center"} mt={2} direction={"column"}>
                      <Avatar name={author} mb={1} />
                      {/* //<Stack spacing={-1} align={"center"}> */}
                      <Text fontWeight={600}>{author}</Text>
                      {/* </Stack> */}
                    </Flex>
                  </WrapItem>
                )
              })}
            </Wrap>
            <Divider py={2} />
          </VStack>
          <br></br>
          <MDXRemote {...source} components={MDXElements} />
        </Box>

        <Button
          marginTop={10}
          as={Link}
          href={"/blog"}
          variant={"outline"}
          leftIcon={<ArrowBackIcon />}
          colorScheme={"blue"}
        >
          Back to Blog
        </Button>
        <Divider marginTop={10} />
        <br />
        <Giscus />
      </Box>
    </Layout>
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
  const filePath = path.join(process.cwd(), "src/posts", postData.file)
  const source = fs.readFileSync(filePath, "utf8")
  const { content, data } = matter(source)
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [rehypeSlug],
    },
  })

  return { props: { source: mdxSource, frontmatter: data, postId: params.id } }
}
