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
    <Box id={"sponsors"}>
      <Container maxW={"6xl"} py={4} as={Stack} spacing={12}>
        <Stack spacing={4}>
          <Heading fontSize={"5xl"} textAlign={"center"}>
            Supported By
          </Heading>
          <Text
            color={useColorModeValue("gray.800", "white")}
            fontSize={"lg"}
            textAlign={"center"}
          >
            We thank these institutions for generously supporting the
            development and maintenance of Xarray.
          </Text>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={-4}
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
              <Image w={36} h={36} src={sponsor.logo} alt={sponsor.name} />
            </Flex>
          ))}
        </Stack>
      </Container>
    </Box>
  )
}
