import React from "react"

import {
  Box,
  Flex,
  Text,
  Container,
  useColorModeValue,
  Stack,
  Heading,
  Image,
} from "@chakra-ui/react"

export const SponsorsSection = () => {
  const sponsors = React.useMemo(
    () => [
      { name: "NSF", logo: "NSF.svg" },
      { name: "NASA", logo: "NASA_logo.svg" },
      { name: "CZI", logo: "Chan_Zuckerberg_Initiative.svg" },
      { name: "NVIDIA", logo: "Nvidia_logo.svg" },
    ],
    []
  )

  return (
    <Box bg={useColorModeValue("gray.100", "gray.700")}>
      <Container maxW={"7xl"} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={"center"}>
          <Heading>Supported By</Heading>
          <Text>
            We thank these institutions for generously supporting the
            development and maintenance of xarray
          </Text>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 10, md: 4, lg: 10 }}
          align={"center"}
          justify={"center"}
        >
          {sponsors.map((sponsor, index) => (
            <Flex
              key={index}
              w={64}
              h={64}
              align={"center"}
              justify={"center"}
              rounded={"full"}
              mb={1}
            >
              <Image w={60} h={60} src={sponsor.logo} alt={sponsor.name} />
            </Flex>
          ))}
        </Stack>
      </Container>
    </Box>
  )
}
