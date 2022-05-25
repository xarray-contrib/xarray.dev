import React from "react"
import {
  Container,
  SimpleGrid,
  Stack,
  Text,
  Box,
  HStack,
  Icon,
  VStack,
} from "@chakra-ui/react"

import { CheckIcon } from "@chakra-ui/icons"
import { Features } from "../data/features"
import { Heading } from "components/mdx"

export const FeaturesSection = () => {
  const features = React.useMemo(() => Features, [])
  return (
    <Box id={"features"}>
      <Stack as={Container} maxW={"6xl"} textAlign={"center"}>
        <Heading as="h1" size="2xl" my={4}>
          Key Features & Capabilities
        </Heading>
        <Text fontSize={"lg"}>
          Xarray provides data models for working with labeled arrays and
          datasets. Its toolkit includes a broad set of domain-agnostic
          functions for advanced analytics and visualization with these data
          structures.
        </Text>
      </Stack>

      <Container maxW={"6xl"} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {features.map((feature, index) => (
            <HStack key={index} align={"top"}>
              <Box color={"green.400"} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={"start"}>
                <Text fontWeight={600}>{feature.title}</Text>
                <Text>{feature.text}</Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
