import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  Spacer,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'

import { Layout } from '@/components/Layout'
import { Link } from '@/components/mdx'
import { distanceToNow, formatDate } from '@/lib/date-formatting'
import { getSortedPostsMetadata } from '@/lib/posts'

export default function Blog({ allPostsData }) {
  return (
    <Layout
      title={'Blog | Xarray'}
      url={'https://xarray.dev/blog'}
      card={
        'https://raw.githubusercontent.com/xarray-contrib/xarray.dev/main/public/dataset-diagram-logo.png'
      }
    >
      <Box
        py={20}
        spacing={4}
        justifyContent='center'
        alignItems='flex-start'
        m='0 auto 4rem auto'
        maxWidth='4xl'
      >
        <Stack spacing={4}>
          <Heading fontSize={'5xl'} textAlign={'center'}>
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
        </Stack>
        <Divider py={2} borderColor='gray.200' />

        <VStack
          divider={<StackDivider borderColor='gray.200' />}
          spacing={4}
          align='stretch'
        >
          {allPostsData.map((page) => {
            const date = new Date(page.date)
            return (
              <Stack key={page.id}>
                <Stack
                  spacing='2'
                  align='stretch'
                  py={{ base: 5, md: 10 }}
                  direction={{ base: 'column', md: 'row' }}
                >
                  <Box>
                    <Link
                      href={`/blog/${page.id}`}
                      fontSize={'xl'}
                      fontWeight={'bold'}
                    >
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
                    <Wrap spacing={2}>
                      {page.authors.map((author) => {
                        return (
                          <WrapItem key={author.name}>
                            <Flex
                              align={'center'}
                              mt={1}
                              direction={'column'}
                              key={author.name}
                            >
                              <Avatar
                                src={`https://github.com/${author.github}.png`}
                                name={author.name}
                                mb={1}
                              />
                            </Flex>
                          </WrapItem>
                        )
                      })}
                    </Wrap>
                  </Box>
                </Stack>
              </Stack>
            )
          })}
        </VStack>
        <Divider py={2} borderColor='gray.200' />
      </Box>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsMetadata()
  return {
    props: {
      allPostsData,
    },
  }
}
