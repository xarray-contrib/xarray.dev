import React from "react"
import {
  Box,
  Container,
  Stack,
  Heading,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Button,
} from "@chakra-ui/react"

import { IoLogoGithub } from "react-icons/io5"
import { ScientificDomains } from "./scientific-domains"
import { ArrayLibraries } from "./array-libraries"

import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const GitHubStats = () => {
  const { data, error } = useSWR(
    "https://api.github.com/repos/pydata/xarray",
    fetcher
  )

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <Stack direction="row" spacing={4} justify="center">
      <Button
        as={"a"}
        href={"https://github.com/pydata/xarray/stargazers"}
        rounded={"full"}
        size={"lg"}
        leftIcon={<IoLogoGithub />}
        variant="outline"
      >
        {data.stargazers_count.toLocaleString(undefined, {
          minimumFractionDigits: 0,
        })}{" "}
        Stars
      </Button>
    </Stack>
  )
}

export const Ecosystem = () => {
  return (
    <Box id={"ecosystem"} p={4}>
      <Stack spacing={4} as={Container} maxW={"6xl"} textAlign={"center"}>
        <Heading fontSize={"3xl"}>Ecosystem</Heading>
        <Text fontSize={"lg"}>
          Xarray is part of the larger scientific Python ecosystem. It is built
          on top of NumPy, Pandas, and Dask and supports a wide range of domain
          specific scientific applications.
        </Text>
        <GitHubStats />
      </Stack>

      <Container maxW={"6xl"} mt={10}>
        <Tabs align="center" variant="soft-rounded" colorScheme="teal">
          <TabList>
            <Tab>Scientific Domains</Tab>
            <Tab>Array Libraries</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ScientificDomains />
            </TabPanel>
            <TabPanel>
              <ArrayLibraries />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  )
}