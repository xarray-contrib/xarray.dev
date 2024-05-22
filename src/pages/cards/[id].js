import { Image } from '@/components/mdx'
import { MdOutlineCalendarToday, MdPeopleOutline } from 'react-icons/md'

import { formatDate } from '@/lib/date-formatting'
import { getAllPostsIds, getPostData } from '@/lib/posts'
import {
  Avatar,
  AvatarGroup,
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
} from '@chakra-ui/react'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const Card = ({ frontmatter, id }) => {
  const boxBackground = 'teal.100'
  const date = new Date(frontmatter.date)

  return (
    <Box
      sx={{ bg: boxBackground, color: 'invert' }}
      h={'100vh'}
      w={'100vw'}
      backgroundImage={'/background.svg'}
    >
      <Container id='post' maxW={'container.lg'} centerContent>
        <Flex direction='column' fontSize={'2xl'}>
          <Stack direction={'row'} spacing={8} justify='space-between'>
            <Stack>
              <Text my={32} fontWeight={'bold'} opacity={0.7}>
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
                w={'200px'}
                src={'/Xarray-assets/RGB/Xarray_Logo_RGB_Final.svg'}
                alt={'xarray logo'}
              />
            </Flex>
          </Stack>
          <Heading as={'h1'} size={'2xl'} my={8}>
            {frontmatter.title}
          </Heading>

          <Stack direction={'row'} my={4} align={'center'}>
            <Icon as={MdOutlineCalendarToday} w='8' h='8' />
            <Text fontWeight={'bold'}>{formatDate(date)}</Text>
          </Stack>

          <Stack direction={'row'} my={8} align={'center'}>
            <Icon as={MdPeopleOutline} w='8' h='8' />

            <AvatarGroup size={'xl'}>
              {frontmatter.authors.map((author) => {
                return (
                  <Avatar
                    key={author.name}
                    src={`https://github.com/${author.github}.png`}
                    name={author.name}
                  />
                )
              })}
            </AvatarGroup>
          </Stack>
        </Flex>
      </Container>
    </Box>
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
