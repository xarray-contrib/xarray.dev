import React from "react"
import {
  Flex,
  Container,
  Text,
  Stack,
  Heading,
  Image,
  Button,
  Link,
  useColorModeValue,
} from "@chakra-ui/react"

import useSWR from "swr"

import { IoLogoGithub } from "react-icons/io5"

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const HeroBannerSection = () => {
  const { data, error } = useSWR(
    "https://api.github.com/repos/pydata/xarray",
    fetcher
  )

  return (
    <Container maxW={"8xl"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                zIndex: -1,
              }}
            >
              Xarray
            </Text>
            <br />
            <Text as={"span"} color={"red.400"}>
              N-D labeled arrays and datasets in Python
            </Text>
          </Heading>
          <Text color={useColorModeValue("gray.800", "white")} fontSize={"lg"}>
            <strong>Xarray</strong> is an open source project and Python package
            that introduces labels in the form of dimensions, coordinates, and
            attributes on top of raw NumPy-like arrays, which allows for more
            intuitive, more concise, and less error-prone user experience.
            <br />
            <br />
            Xarray includes a large and growing library of domain-agnostic
            functions for advanced analytics and visualization with these data
            structures.
          </Text>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <Button
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              colorScheme={"red"}
              bg={"red.400"}
              _hover={{ bg: "red.500" }}
            >
              <Link href="https://xarray.pydata.org/en/stable/getting-started-guide/quick-overview.html">
                Get Started
              </Link>
            </Button>
            <Button rounded={"full"} size={"lg"} fontWeight={"normal"} px={6}>
              <Link href="https://xarray.pydata.org/en/stable/getting-started-guide/why-xarray.html">
                Why Xarray?
              </Link>
            </Button>

            <Stack direction="row" spacing={4}>
              <Button
                as={"a"}
                href={"https://github.com/pydata/xarray/stargazers"}
                rounded={"full"}
                size={"lg"}
                leftIcon={<IoLogoGithub />}
                variant="outline"
              >
                {"2500".toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                })}
              </Button>
            </Stack>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          <Image
            src={"xarray-datastructure.png"}
            alt="xarray data structure"
            objectFit="contain"
          ></Image>
        </Flex>
      </Stack>
    </Container>
  )
}
