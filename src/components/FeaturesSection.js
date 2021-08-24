/* eslint-disable react-hooks/rules-of-hooks */
import React from "react"
import {
  Container,
  SimpleGrid,
  Stack,
  Text,
  Box,
  Heading,
  HStack,
  Icon,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react"

import { CheckIcon } from "@chakra-ui/icons"

export const FeaturesSection = () => {
  const features = React.useMemo(
    () => [
      {
        title: "Interoperability",
        text: "Interoperable with Dask, GPU and sparse arrays libraries such as Dask, CuPy, and sparse.",
      },
      {
        title: "Apply operations over named dimensions",
        text: "x.sum(['latitude', 'time'])",
      },
      {
        title: "Select values by label instead of integer location",
        text: "x.sel(time='2020-01-04')",
      },
      {
        title: "Vectorized operations",
        text: "Mathematical operations (e.g., `x - y`) vectorize across multiple dimensions (array broadcasting) based on dimension names, not shape.",
      },
      {
        title: "GroupBy operations",
        text: " Flexible split-apply-combine operations with groupby: x.groupby('time.dayofyear').mean()",
      },
      {
        title: "Database like operations",
        text: "Database like alignment based on coordinate labels that smoothly handles missing values: x, y = xr.align(x, y, join='outer').",
      },
      {
        title: "Arbitrary metadata tracking",
        text: "Keep track of arbitrary metadata in the form of a Python dictionary: ds.attrs",
      },
      {
        title: "Flexible and Extensible I/O backend API",
        text: "",
      },
    ],
    []
  )
  return (
    <Box id={"features"} p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={"3xl"}>Key Features & Capabilities</Heading>
        <Text fontSize={"lg"}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.
        </Text>
      </Stack>

      <Container maxW={"8xl"} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {features.map((feature, index) => (
            <HStack key={index} align={"top"}>
              <Box color={"green.400"} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={"start"}>
                <Text fontWeight={600}>{feature.title}</Text>
                <Text color={useColorModeValue("gray.800", "white")}>
                  {feature.text}
                </Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
