import { Image } from '@/components/mdx'
import { MdOutlineCalendarToday, MdPeopleOutline } from 'react-icons/md'

import { formatDate } from '@/lib/date-formatting'
import { getAllPostsIds, getPostData } from '@/lib/posts'
import {
  Avatar,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const Card = ({ frontmatter, id }) => {
  const boxBackground = 'gray.300'
  const date = new Date(frontmatter.date)

  return (
    <Container
      my={20}
      id='post'
      sx={{ bg: boxBackground, color: 'invert' }}
      maxW={{ base: '900px', md: '930px' }}
    >
      <Flex direction='column' fontSize={'2xl'}>
        <Stack direction={'row'} spacing={8} justify='space-between'>
          <Stack>
            <Text my={8} fontWeight={'bold'} opacity={0.5}>
              xarray.dev / blog
            </Text>
          </Stack>
          <Flex
            direction={'row'}
            alignItems={'center'}
            justify={'right'}
            align={'right'}
          >
            <Image
              justify={'right'}
              align={'right'}
              w={40}
              src={'/dataset-diagram-logo.png'}
              alt={'xarray logo'}
            />
          </Flex>
        </Stack>
        <Heading as={'h1'} size={'2xl'} my={8}>
          {frontmatter.title}
        </Heading>

        <Stack direction={'row'} my={4} align={'center'}>
          <Icon as={MdOutlineCalendarToday} w='8' h='8' />
          <Text>{formatDate(date)}</Text>
        </Stack>

        <Stack direction={'row'} my={4} align={'center'}>
          <Icon as={MdPeopleOutline} w='8' h='8' />

          <Wrap spacing={3} my={8}>
            {frontmatter.authors.map((author) => {
              return (
                <WrapItem key={author.name}>
                  <Flex align={'center'} direction={'column'}>
                    <Avatar
                      src={`https://github.com/${author.github}.png`}
                      name={author.name}
                      size={'lg'}
                    />
                    <Text fontWeight={'bold'} fontSize={'md'}>
                      {author.name}
                    </Text>
                  </Flex>
                </WrapItem>
              )
            })}
          </Wrap>
        </Stack>
      </Flex>
    </Container>
  )
}

export default Card

export async function getStaticPaths() {
  const paths = getAllPostsIds()

  const isDev =
    process.env.VERCEL_ENV === 'preview' ||
    process.env.NODE_ENV === 'development'
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths: isDev ? paths : [], fallback: false }
}

export async function getStaticProps({ params }) {
  const postData = getPostData(params.id)
  const filePath = path.join(process.cwd(), 'src/posts', postData.file)
  const source = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(source)
  return { props: { frontmatter: data, id: params.id } }
}
