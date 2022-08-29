import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'

import { ArrowBackIcon } from '@chakra-ui/icons'

import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeSlug from 'rehype-slug'

import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

import { Giscus } from '@/components'
import { Layout } from '@/components/layout'
import { Link } from '@/components/mdx'
import { distanceToNow, formatDate } from '@/lib/date-formatting'
import { MDXElements } from '@/lib/mdx-elements'
import { getAllPostsIds, getPostData } from '@/lib/posts'

const CARDS_BASE_URL = 'https://xarray.dev/cards'

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
        py={10}
        spacing={8}
        justifyContent='center'
        alignItems='flex-start'
        m='0 auto 4rem auto'
        maxWidth='4xl'
      >
        <Box spacing='3' alignItems='start'>
          <VStack paddingTop='30px' spacing='2' alignItems='center'>
            <Heading as={'h1'} textAlign={'center'} size='xl' my={4}>
              {frontmatter.title}
            </Heading>
            <Text fontSize={'sm'} color={'gray.700'}>
              {formatDate(date)} ({distanceToNow(date)})
            </Text>

            <Wrap spacing='20px'>
              {frontmatter.authors.map((author) => {
                return (
                  <WrapItem key={author.name}>
                    <Flex
                      as={Link}
                      href={`https://github.com/${author.github}`}
                      align={'center'}
                      my={2}
                      direction={'column'}
                      _hover={{
                        textDecoration: 'none',
                      }}
                    >
                      <Avatar
                        src={`https://github.com/${author.github}.png`}
                        name={author.name}
                        my={2}
                      />
                      <Text fontWeight={600}>{author.name}</Text>
                    </Flex>
                  </WrapItem>
                )
              })}
            </Wrap>
            <Divider my={2} />
          </VStack>
          <br></br>
          <MDXRemote {...source} components={MDXElements} />
        </Box>

        <Button
          my={8}
          as={Link}
          href={'/blog'}
          variant={'outline'}
          leftIcon={<ArrowBackIcon />}
          colorScheme={'blue'}
        >
          Back to Blog
        </Button>
        <Divider my={8} />
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
  const filePath = path.join(process.cwd(), 'src/posts', postData.file)
  const source = fs.readFileSync(filePath, 'utf8')
  const { content, data } = matter(source)
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [rehypeSlug],
    },
  })

  return { props: { source: mdxSource, frontmatter: data, postId: params.id } }
}
