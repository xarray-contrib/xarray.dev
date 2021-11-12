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
  Code,
} from "@chakra-ui/react"

import { CheckIcon } from "@chakra-ui/icons"

export const Features = () => {
  const features = React.useMemo(
    () => [
      {
        title: "Interoperability",
        text: "Interoperable with the scientific Python ecosystem including NumPy, Dask, Pandas, and Matplotlib.",
      },
      {
        title: "Apply operations over named dimensions",
        text: "",
      },
      {
        title: "Select values by label instead of integer location",
        text: "",
      },
      {
        title: "Vectorized operations",
        text: "Mathematical operations vectorize across multiple dimensions (array broadcasting) based on dimension names, not shape.",
      },
      {
        title: "GroupBy operations",
        text: " Flexible split-apply-combine operations with groupby.",
      },
      {
        title: "Database like operations",
        text: "Database like alignment based on coordinate labels that smoothly handles missing values.",
      },
      {
        title: "Arbitrary metadata tracking",
        text: "Keep track of arbitrary metadata in the form of a Python dictionary.",
      },
      {
        title: "Flexible and Extensible I/O backend API",
        text: "Read and write data to and from NetCDF, HDF, Zarr, OpenDAP, and GRIB.",
      },
    ],
    []
  )
  return (
    <Box id={"features"} p={4}>
      <Stack spacing={4} as={Container} maxW={"6xl"} textAlign={"center"}>
        <Heading fontSize={"3xl"}>Key Features & Capabilities</Heading>
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
