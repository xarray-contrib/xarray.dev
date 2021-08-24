import React from "react"
import {
  Heading,
  Link,
  Image,
  Text,
  Button,
  Container,
  Stack,
} from "@chakra-ui/react"

export const DonateSection = () => {
  return (
    <Container id={"donate"} maxW={"8xl"} p="12">
      <Heading align="center" fontSize={"3xl"}>
        Donate
      </Heading>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 26 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          <Image
            src={"NumFOCUS_sponsored_project_logo.svg"}
            alt="NumFocus logo"
            objectFit="contain"
          ></Image>

          <Button
            rounded={"full"}
            size={"lg"}
            fontWeight={"normal"}
            px={6}
            colorScheme={"red"}
            bg={"red.400"}
            _hover={{ bg: "red.500" }}
          >
            <Link href="https://numfocus.org/donate-to-xarray">Donate ❤</Link>
          </Button>
        </Stack>
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Text fontSize={"lg"}>
            xarray is a Sponsored Project of NumFOCUS, a{" "}
            <Text
              as="a"
              href={"https://en.wikipedia.org/wiki/501(c)(3)_organization"}
            >
              501(c)(3) nonprofit charity
            </Text>{" "}
            in the United States. NumFOCUS provides Xarray with fiscal, legal,
            and administrative support to help ensure the health and
            sustainability of the project. Visit{" "}
            <Text as="a" href="https://numfocus.org/">
              numfocus.org
            </Text>{" "}
            for more information.
            <br />
            <br />
            If you like xarray and want to support our mission, please consider
            making a donation to support our efforts.
          </Text>
        </Stack>
      </Stack>
    </Container>
  )
}
