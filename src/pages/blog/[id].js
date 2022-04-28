import React from "react"
import {
  Button,
  Image,
  Stack,
  Container,
  VStack,
  Heading,
  Divider,
  Text,
  Avatar,
  Wrap,
  WrapItem,
  Flex,
} from "@chakra-ui/react"

import { formatDistanceToNow, format } from "date-fns"
import { MdBuild, MdCall } from "react-icons/md"

import { serialize } from "next-mdx-remote/serialize"
import { MDXRemote } from "next-mdx-remote"

import fs from "fs"
import path from "path"
import matter from "gray-matter"

import { getPostData, getAllPostsIds } from "../../lib/posts"

export default function Post({ source, frontmatter }) {
  return (
    <Container maxW={"3xl"} py={20} spacing={4} isInline>
      <VStack spacing="3" alignItems="flex-start">
        <VStack paddingTop="40px" spacing="2" alignItems="center">
          <Heading fontSize={"2xl"} textAlign={"center"}>
            {frontmatter.title}
          </Heading>
          <Text fontSize={"2sm"}>
            {format(new Date(frontmatter.date), "PPPP")} (
            {formatDistanceToNow(new Date(frontmatter.date), {
              addSuffix: true,
            })}
            )
          </Text>

          <Wrap>
            {frontmatter.authors.map((author) => {
              return (
                <WrapItem key={author}>
                  <Flex align={"center"} mt={8} direction={"column"}>
                    <Avatar name={author} mb={2} />
                    <Stack spacing={-1} align={"center"}>
                      <Text fontWeight={600}>{author}</Text>
                    </Stack>
                  </Flex>
                </WrapItem>
              )
            })}
          </Wrap>
          <Divider />
        </VStack>
        <br></br>
        <MDXRemote
          {...source}
          components={{ Button, Image, Stack, MdBuild, MdCall }}
        />
      </VStack>
    </Container>
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
      rehypePlugins: [],
    },
  })

  return { props: { source: mdxSource, frontmatter: data } }
}
