import React from "react"
import {
  Text,
  Image,
  Stack,
  Flex,
  Box,
  SimpleGrid,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react"

const Library = ({ name, description, url, logo }) => {
  return (
    <Stack align="center">
      <Flex
        w={32}
        h={32}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={"gray.50"}
        mb={1}
      >
        <Image src={logo} alt={name} w={12} h={12}></Image>
      </Flex>

      <Heading
        as="a"
        href={url}
        color={"blue.400"}
        fontSize={"2xl"}
        fontFamily={"body"}
      >
        {name}
      </Heading>
      <Text color={useColorModeValue("gray.800", "white")}>{description}</Text>
    </Stack>
  )
}

export const ArrayLibraries = () => {
  const libraries = React.useMemo(
    () => [
      {
        name: "NumPy",
        description:
          "NumPy is the fundamental package for array computing with Python.",
        url: "https://numpy.org",
        logo: "https://raw.githubusercontent.com/numpy/numpy.org/master/static/images/logos/numpy_logo.svg",
      },
      {
        name: "Dask",
        description:
          "Distributed arrays and advanced parallelism for analytics, enabling performance at scale.",
        url: "https://dask.org/",
        logo: "https://raw.githubusercontent.com/andersy005/xarray-tutorial/main/images/dask_horizontal.svg",
      },
      {
        name: "CuPy",
        description:
          "NumPy-compatible array library for GPU-accelerated computing with Python.",
        url: "https://cupy.chainer.org/",
        logo: "https://github.com/cupy/cupy/blob/master/docs/image/cupy_logo_1000px.png?raw=true",
      },
      {
        name: "Zarr",
        description:
          "An implementation of chunked, compressed, N-dimensional arrays for Python.",
        url: "http://zarr.readthedocs.io/",
        logo: "https://raw.githubusercontent.com/zarr-developers/community/master/logos/logo1.png",
      },
      {
        name: "Sparse",
        description: "Sparse multi-dimensional arrays for the PyData ecosystem",
        url: "https://sparse.pydata.org/",
        logo: "https://github.com/pydata/sparse/blob/master/docs/logo.png?raw=true",
      },
      {
        name: "Pint",
        description: "Operate and manipulate physical quantities in Python",
        url: "http://pint.readthedocs.org/",
        logo: "https://github.com/hgrecco/pint/blob/master/docs/_static/logo-full.jpg?raw=true",
      },
    ],
    []
  )
  return (
    <Box p={4}>
      <Text color={useColorModeValue("gray.800", "white")} fontSize={"lg"}>
        Xarray supports multiple array backends, allowing users to choose array
        types that work best for their application.
      </Text>
      <br />
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        {libraries.map((library, index) => (
          <Library
            key={index}
            name={library.name}
            description={library.description}
            logo={library.logo}
            url={library.url}
          />
        ))}
      </SimpleGrid>
    </Box>
  )
}
