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
} from "@chakra-ui/react"

import { ExternalLinkIcon } from "@chakra-ui/icons"

import { formatDistanceToNow, format } from "date-fns"
import { Contents } from "../../data/contents"

const Blog = () => {
  return (
    <Container
      maxW={"6xl"}
      py={20}
      as={Stack}
      spacing={12}
      align={"center"}
      justify={"center"}
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

      <Box textAlign={"left"}>
        {Contents.map((page) => {
          return (
            <VStack
              paddingTop="40px"
              spacing="2"
              alignItems="flex-start"
              key={page.id}
            >
              <Link
                href={`/blog/${page.id}`}
                fontSize={"xl"}
                fontWeight={"bold"}
              >
                {page.title}
              </Link>
              <Text fontSize={"3sm"}>
                {format(new Date(page.date), "PPPP")} (
                {formatDistanceToNow(new Date(page.date), { addSuffix: true })})
              </Text>
              <br></br>
              <Text>
                {page.summary}
                <br></br>

                <Button
                  variant="outline"
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                >
                  <Link href={`/blog/${page.id}`}>
                    {"Read More"} <ExternalLinkIcon mx="2px" />
                  </Link>
                </Button>
              </Text>
            </VStack>
          )
        })}
      </Box>
    </Container>
  )
}

export default Blog
