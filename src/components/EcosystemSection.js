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
} from "@chakra-ui/react"

import { ScientificDomains } from "./ScientificDomains"
import { ArrayLibraries } from "./ArrayLibraries"

export const EcosystemSection = () => {
  return (
    <Box id={"ecosystem"} p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={"3xl"}>Ecosystem</Heading>
        <Text fontSize={"lg"}>
          Xarray is part of the larger scientific Python ecosystem. It is built
          on top of NumPy, Pandas, and Dask and supports a wide range of domain
          specific scientific applications.
        </Text>
      </Stack>

      <Container maxW={"8xl"} mt={10}>
        <Tabs align="center" variant="soft-rounded" colorScheme="teal">
          <TabList>
            <Tab>Array Libraries</Tab>
            <Tab>Scientific Domains</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ArrayLibraries />
            </TabPanel>
            <TabPanel>
              <ScientificDomains />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  )
}
