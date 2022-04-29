import React from "react"
import {
  Container,
  VStack,
  Box,
  Stack,
  Heading,
  useColorModeValue,
  Link,
  Text,
  Button,
  Divider,
} from "@chakra-ui/react"

import { ArrowForwardIcon } from "@chakra-ui/icons"

import { formatDistanceToNow, format } from "date-fns"

import { getSortedPostsMetadata } from "../../lib/posts"
import { CustomLink } from "components"

export default function Blog({ allPostsData }) {
  return (
    <Container
      py={20}
      as={Stack}
      spacing={8}
      justifyContent="center"
      alignItems="flex-start"
      m="0 auto 4rem auto"
      maxWidth="700px"
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
      <Divider />

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
              <br></br>
              <Text noOfLines={3}>{page.summary}</Text>
              <Button
                as={CustomLink}
                href={`/blog/${page.id}`}
                variant={"outline"}
                rightIcon={<ArrowForwardIcon />}
                colorScheme={"blue"}
              >
                Read More
              </Button>
              <Divider />
            </VStack>
          )
        })}
      </Box>
    </Container>
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
