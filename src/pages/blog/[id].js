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

import { ArrowBackIcon } from "@chakra-ui/icons"

import { formatDistanceToNow, format } from "date-fns"
import { MdBuild, MdCall } from "react-icons/md"

import { serialize } from "next-mdx-remote/serialize"
import { MDXRemote } from "next-mdx-remote"

import fs from "fs"
import path from "path"
import matter from "gray-matter"

import { getPostData, getAllPostsIds } from "../../lib/posts"
import { CustomLink } from "components"

const allComponents = {
  Button,
  Image,
  Stack,
  MdBuild,
  MdCall,
}

export default function Post({ source, frontmatter }) {
  return (
    <Container
      py={20}
      spacing={8}
      justifyContent="center"
      alignItems="flex-start"
      m="0 auto 4rem auto"
      maxWidth="800px"
    >
      <VStack spacing="3" alignItems="flex-start">
        <VStack paddingTop="30px" spacing="2" alignItems="center">
          <Heading as={"h1"} textAlign={"center"} size="xl" my={4}>
            {frontmatter.title}
          </Heading>
          <Text fontSize={"sm"}>
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
        <MDXRemote {...source} components={allComponents} />
      </VStack>

      <Button
        marginTop={10}
        as={CustomLink}
        href={"/blog"}
        variant={"outline"}
        leftIcon={<ArrowBackIcon />}
        colorScheme={"blue"}
      >
        Back to Blog
      </Button>
      <Divider marginTop={10} />
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
