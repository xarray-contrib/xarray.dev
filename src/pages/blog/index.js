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
  Divider,
  StackDivider,
  Flex,
  Avatar,
  Spacer,
} from "@chakra-ui/react"

import { formatDistanceToNow, format } from "date-fns"

import { getSortedPostsMetadata } from "../../lib/posts"
import { CustomLink } from "components"

export default function Blog({ allPostsData }) {
  return (
    <Box
      py={20}
      spacing={4}
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
      <Divider py={2} borderColor="gray.200" />

      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        {allPostsData.map((page) => {
          return (
            <Stack key={page.id}>
              <Flex
                spacing="10"
                align="stretch"
                py={{ base: 5, md: 10 }}
                direction={{ base: "column", md: "row" }}
              >
                <Box>
                  <CustomLink
                    href={`/blog/${page.id}`}
                    fontSize={"xl"}
                    fontWeight={"bold"}
                  >
                    {page.title}
                  </CustomLink>

                  <Text fontSize={"sm"} color={"gray.600"} py={2}>
                    {format(new Date(page.date), "PPPP")} (
                    {formatDistanceToNow(new Date(page.date), {
                      addSuffix: true,
                    })}
                    )
                  </Text>
                </Box>
                <Spacer />
                <Box>
                  <Wrap spacing={2}>
                    {page.authors.map((author) => {
                      return (
                        <WrapItem key={author}>
                          <Flex
                            align={"center"}
                            mt={1}
                            direction={"column"}
                            key={author}
                          >
                            <Avatar name={author} mb={1} />
                          </Flex>
                        </WrapItem>
                      )
                    })}
                  </Wrap>
                </Box>
              </Flex>
              <Box
                display="flex"
                flex="1"
                flexDirection="column"
                justifyContent="center"
                marginTop={{ base: "3", sm: "0" }}
              >
                <Text noOfLines={3}>{page.summary}</Text>
              </Box>
            </Stack>
          )
        })}
      </VStack>
      <Divider py={2} borderColor="gray.200" />
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
