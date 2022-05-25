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

import { Libraries } from "../data/array-libraries"
import { Link } from "components/mdx"

const Library = ({ name, description, url, logo }) => {
  return (
    <Stack align="center">
      <Flex
        as={Link}
        href={url}
        w={32}
        h={32}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={"gray.50"}
        mb={1}
      >
        <Image src={logo} alt={name}></Image>
      </Flex>

      <Heading
        as={Link}
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
  const libraries = React.useMemo(() => Libraries, [])
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
