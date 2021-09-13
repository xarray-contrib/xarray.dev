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

export const FeaturesSection = () => {
  const features = React.useMemo(
    () => [
      {
        title: "Interoperability",
        text: "Interoperable with the scientific Python ecosystem including NumPy, Dask, Pandas, and Matplotlib.",
        code: "",
      },
      {
        title: "Apply operations over named dimensions",
        text: "",
        code: 'x.sum(["latitude", "time"])',
      },
      {
        title: "Select values by label instead of integer location",
        text: "",
        code: "x.sel(time='2020-01-04')",
      },
      {
        title: "Vectorized operations",
        text: "Mathematical operations vectorize across multiple dimensions (array broadcasting) based on dimension names, not shape.",
        code: "x - y",
      },
      {
        title: "GroupBy operations",
        text: " Flexible split-apply-combine operations with groupby:",
        code: "x.groupby('time.month').mean()",
      },
      {
        title: "Database like operations",
        text: "Database like alignment based on coordinate labels that smoothly handles missing values:",
        code: "x, y = xr.align(x, y, join='outer')",
      },
      {
        title: "Arbitrary metadata tracking",
        text: "Keep track of arbitrary metadata in the form of a Python dictionary:",
        code: "x.attrs['title'] = 'My Dataset'",
      },
      {
        title: "Flexible and Extensible I/O backend API",
        text: "Read and write data to and from NetCDF, HDF, Zarr, OpenDAP, and GRIB",
        code: "ds = xr.open_dataset(..., engine='engine_name')",
      },
    ],
    []
  )
  return (
    <Box id={"features"} p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={"3xl"}>Key Features & Capabilities</Heading>
        <Text fontSize={"lg"}>
          Xarray provides data models for working with labeled arrays and
          datasets. Its toolkit includes a broad set of domain-agnostic
          functions for advanced analytics and visualization with these data
          structures.
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
                <Code variant="outline" display="block" whiteSpace="pre">
                  {feature.code}
                </Code>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
