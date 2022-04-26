import React from "react"
import {
  Box,
  Button,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Image,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"

import { FaTwitter, FaGithub, FaYoutube } from "react-icons/fa"
import { footerItems } from "../data/footer-items"
import { VercelCallout } from "../components/VercelCallout"

const SocialButton = ({ children, label, href }) => {
  return (
    <Button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={12}
      h={12}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Button>
  )
}

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  )
}

export const Footer = () => {
  return (
    <Box>
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 2fr" }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              <Image
                w={32}
                src={"/dataset-diagram-logo.png"}
                alt={"xarray logo"}
              />
            </Box>
            <Text fontSize={"sm"}>
              © {new Date().getFullYear()}, Xarray core developers. Apache 2.0
              Licensed
            </Text>
            <Stack direction={"row"} spacing={6}>
              <SocialButton
                label={"Twitter"}
                href={"https://twitter.com/xarray_dev"}
              >
                <FaTwitter size={70} />
              </SocialButton>
              <SocialButton
                label={"GitHub"}
                href={"https://github.com/pydata/xarray"}
              >
                <FaGithub size={70} />
              </SocialButton>
              <SocialButton
                label={"YouTube"}
                href={
                  "https://www.youtube.com/channel/UCBlxVSA6xQXeb-i4GgTlO7g"
                }
              >
                <FaYoutube size={70} />
              </SocialButton>
            </Stack>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Xarray</ListHeader>

            {footerItems.xarray.map((item) => {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  fontSize={"sm"}
                  _hover={{ color: "blue.500" }}
                >
                  {item.label}
                </Link>
              )
            })}
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Resources</ListHeader>
            {footerItems.resources.map((item) => {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  fontSize={"sm"}
                  _hover={{ color: "blue.500" }}
                >
                  {item.label}
                </Link>
              )
            })}
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Community</ListHeader>
            {footerItems.community.map((item) => {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  fontSize={"sm"}
                  _hover={{ color: "blue.500" }}
                >
                  {item.label}
                </Link>
              )
            })}
          </Stack>
        </SimpleGrid>
        <VStack as="footer" spacing={4} mt={12} textAlign="center">
          <VercelCallout />
        </VStack>
      </Container>
    </Box>
  )
}
