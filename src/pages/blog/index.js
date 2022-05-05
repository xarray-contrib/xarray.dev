import React from "react"
import {
  VStack,
  Box,
  Stack,
  Wrap,
  WrapItem,
  Heading,
  useColorModeValue,
  Text,
  Button,
  Divider,
  Flex,
  Avatar,
} from "@chakra-ui/react"

import { ArrowForwardIcon } from "@chakra-ui/icons"

import { formatDistanceToNow, format } from "date-fns"

import { getSortedPostsMetadata } from "../../lib/posts"
import { CustomLink } from "components"

export default function Blog({ allPostsData }) {
  return (
    <Box
      py={20}
      spacing={8}
      justifyContent="center"
      alignItems="flex-start"
      m="0 auto 4rem auto"
      maxWidth="800px"
    >
      <Stack spacing={4}>
        <Heading fontSize={"5xl"} textAlign={"center"}>
          Blog
        </Heading>
        <Text
          color={useColorModeValue("gray.800", "white")}
          fontSize={"lg"}
          textAlign={"center"}
        >
          All the latest news, insights, and practices about Xarray from the
          Xarray team.
        </Text>
      </Stack>
      <Divider py={2} />

      <Box textAlign={"left"}>
        {allPostsData.map((page) => {
          return (
            <VStack
              paddingTop="20px"
              spacing="2"
              alignItems="flex-start"
              key={page.id}
            >
              <CustomLink
                href={`/blog/${page.id}`}
                fontSize={"xl"}
                fontWeight={"bold"}
              >
                {page.title}
              </CustomLink>
              <Text fontSize={"sm"}>
                {format(new Date(page.date), "PPPP")} (
                {formatDistanceToNow(new Date(page.date), { addSuffix: true })})
              </Text>
              <Stack>
                <Wrap>
                  <Text fontSize={"sm"}>By</Text>
                  {page.authors.map((author) => {
                    return (
                      <WrapItem key={author}>
                        <Flex align={"center"} mt={2} direction={"column"}>
                          <Avatar name={author} mb={2} />
                          <Stack spacing={-1} align={"center"}>
                            <Text fontWeight={600}>{author}</Text>
                          </Stack>
                        </Flex>
                      </WrapItem>
                    )
                  })}
                </Wrap>
              </Stack>
              <br></br>
              <Text noOfLines={3}>{page.summary}</Text>
              <Divider py={2} />
            </VStack>
          )
        })}
      </Box>
    </Box>
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
