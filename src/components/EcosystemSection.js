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
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={"3xl"}>Ecosystem</Heading>
        <Text color={"gray.600"} fontSize={"lg"}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.
        </Text>
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
