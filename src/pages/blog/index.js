import {
  Avatar,
  AvatarGroup,
  Box,
  Container,
  Divider,
  Heading,
  Spacer,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'

import { motion } from 'framer-motion'

import { Layout } from '@/components/layout'
import { Link } from '@/components/mdx'
import { distanceToNow, formatDate } from '@/lib/date-formatting'
import { getSortedPostsMetadata } from '@/lib/posts'
import { generateRssFeed } from '@/lib/rss-feed'

const SinglePost = ({ page }) => {
  const date = new Date(page.date)

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Stack
        spacing='2'
        align='stretch'
        my={{ base: 5, md: 10 }}
        direction={{ base: 'column', md: 'row' }}
      >
        <Box>
          <Link href={`/blog/${page.id}`} fontSize={'xl'} fontWeight={'bold'}>
            {page.title}
          </Link>

          <Text fontSize={'sm'} color={'gray.600'} py={4}>
            {formatDate(date)} ({distanceToNow(date)})
          </Text>

          <Text noOfLines={3} py={4}>
            {page.summary}
          </Text>
        </Box>
        <Spacer />
        <Box>
          <AvatarGroup size={'lg'}>
            {page.authors.map((author) => {
              return (
                <Avatar
                  key={author.name}
                  src={`https://github.com/${author.github}.png`}
                  name={author.name}
                />
              )
            })}
          </AvatarGroup>
        </Box>
      </Stack>
    </motion.div>
  )
}

export default function Blog({ allPostsData }) {
  return (
    <Layout
      title={'Blog | Xarray'}
      url={`/blog`}
      card={
        'https://raw.githubusercontent.com/xarray-contrib/xarray.dev/main/public/Xarray-assets/Icon/Xarray_Icon_Final.png'
      }
    >
      <Box as='section'>
        <Container maxW='container.lg' py={20}>
          <Heading as='h1' size='2xl' textAlign={'center'} my={4}>
            Blog
          </Heading>
          <Text
            color={useColorModeValue('gray.800', 'white')}
            fontSize={'lg'}
            textAlign={'center'}
          >
            All the latest news, insights, and practices about Xarray from the
            Xarray team.
          </Text>

          <Divider my={4} borderColor='gray.200' />

          <VStack
            divider={<StackDivider borderColor='gray.200' />}
            spacing={-4}
            align='stretch'
          >
            {allPostsData.map((page) => {
              return <SinglePost key={page.id} page={page} />
            })}
          </VStack>
          <Divider my={2} borderColor='gray.200' />
        </Container>
      </Box>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsMetadata()
  generateRssFeed(allPostsData)
  return {
    props: {
      allPostsData,
    },
  }
}
