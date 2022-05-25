import React from "react"
import {
  Avatar,
  AvatarGroup,
  Box,
  Flex,
  Icon,
  Image,
  Text,
  Center,
} from "@chakra-ui/react"
import { MdCalendarToday } from "react-icons/md"
import { getPostData, getAllPostsIds } from "../../lib/posts"
import { format } from "date-fns"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

const Card = ({ frontmatter, id }) => {
  const boxBackground = "white !important"
  const secondaryBackground = "gray.50"
  const mainText = "gray.800"
  const iconColor = "brand.200"

  return (
    <Center mt={40} id={id}>
      <Flex
        borderRadius="20px"
        bg={boxBackground}
        w={{ base: "800px", md: "830px" }}
        direction="column"
      >
        <Box p="20px">
          <Flex w="100%" mb="10px">
            <Image
              src={"/dataset-diagram-logo.png"}
              alt={"xarray logo"}
              me={"auto"}
            ></Image>
          </Flex>
          <Box>
            <Text fontWeight="600" color={mainText} w="100%" fontSize="2xl">
              {frontmatter.title}
            </Text>
            <AvatarGroup size="md" max={4} color={iconColor} fontWeight="700">
              {frontmatter.authors.map((author) => {
                return <Avatar name={author} key={author} mt={1} />
              })}
            </AvatarGroup>
          </Box>
        </Box>
        <Flex
          bg={secondaryBackground}
          w="100%"
          p="20px"
          borderBottomLeftRadius="inherit"
          borderBottomRightRadius="inherit"
          height="100%"
          direction="column"
        >
          <Text
            fontSize="2sm"
            color="gray.600"
            lineHeight="24px"
            pe="40px"
            fontWeight="500"
            mb="auto"
            noOfLines={3}
          >
            {
              "Xarray now supports unit-aware operations by wrapping pint arrays"
            }
          </Text>
          <br />
          <Flex>
            <Flex me="25px">
              <Icon
                as={MdCalendarToday}
                w="20px"
                h="20px"
                me="6px"
                color="green.400"
              />
              <Text color={mainText} fontSize="sm" my="auto" fontWeight="500">
                {format(new Date(frontmatter.date), "PPPP")}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Center>
  )
}

export default Card

export async function getStaticPaths() {
  const paths = getAllPostsIds()

  const isDev =
    process.env.VERCEL_ENV === "preview" ||
    process.env.NODE_ENV === "development"
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths: isDev ? paths : [], fallback: false }
}

export async function getStaticProps({ params }) {
  const postData = getPostData(params.id)
  const filePath = path.join(process.cwd(), "src/posts", postData.file)
  const source = fs.readFileSync(filePath, "utf8")
  const { data } = matter(source)
  return { props: { frontmatter: data, id: params.id } }
}
