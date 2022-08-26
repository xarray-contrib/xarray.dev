import { formatDate } from '@/lib/date-formatting'
import { getAllPostsIds, getPostData } from '@/lib/posts'
import {
  Avatar,
  AvatarGroup,
  Box,
  Center,
  Flex,
  Heading,
  Icon,
  Image,
  Text,
} from '@chakra-ui/react'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { MdCalendarToday } from 'react-icons/md'

const Card = ({ frontmatter, id }) => {
  const boxBackground = 'white !important'
  const iconColor = 'brand.200'
  const date = new Date(frontmatter.date)

  return (
    <Center mt={40} id='post'>
      <Flex
        borderRadius='20px'
        bg={boxBackground}
        w={{ base: '900px', md: '930px' }}
        direction='column'
        justify='space-between'
      >
        <Box p='20px'>
          <Flex w='100%' mb='10px'>
            <Image
              src={'/dataset-diagram-logo.png'}
              alt={'xarray logo'}
              me={'auto'}
            ></Image>
          </Flex>
          <Box>
            <Heading as={'h1'} size='xl'>
              {frontmatter.title}
            </Heading>
          </Box>
        </Box>

        <Flex
          mt='auto'
          justify='space-between'
          w='100%'
          align='center'
          borderBottomLeftRadius='inherit'
          borderBottomRightRadius='inherit'
          height='100%'
          direction='row'
          p='20px'
        >
          <Flex me='25px'>
            <Icon
              as={MdCalendarToday}
              w='20px'
              h='20px'
              me='6px'
              color='white.500'
            />
            <Text fontWeight={'600'} fontSize={'xl'}>
              {formatDate(date)}
            </Text>
          </Flex>

          <AvatarGroup size='md' max={4} color={iconColor}>
            {frontmatter.authors.map((author) => {
              return (
                <Avatar
                  key={author.name}
                  src={`https://github.com/${author.github}.png`}
                  name={author.name}
                  mt={1}
                  fontWeight={'600'}
                />
              )
            })}
          </AvatarGroup>
        </Flex>
      </Flex>
    </Center>
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
