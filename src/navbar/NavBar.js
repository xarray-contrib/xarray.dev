import React, { useState } from "react"
import { Flex, Switch, Button, IconButton } from "@chakra-ui/react"
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons"
import NextLink from "next/link"

export const NavBar = () => {
  const [display, setDisplay] = useState("none")
  return (
    <Flex>
      <Flex position="absolute" top="1rem" right="1rem" align="center">
        <Flex display={["none", "none", "flex", "flex"]}>
          <NextLink href="#" passHref>
            <Button as="a" variant="ghost" aria-label="Home" my={5} w="100%">
              Home
            </Button>
          </NextLink>

          <NextLink href="https://xarray.pydata.org" passHref>
            <Button
              as="a"
              variant="ghost"
              aria-label="Documentation"
              my={5}
              w="100%"
            >
              Documentation
            </Button>
          </NextLink>

          <NextLink href="#features" passHref>
            <Button
              as="a"
              variant="ghost"
              aria-label="Features"
              my={5}
              w="100%"
            >
              Features
            </Button>
          </NextLink>

          <NextLink href="#ecosystem" passHref>
            <Button
              as="a"
              variant="ghost"
              aria-label="Ecosystem"
              my={5}
              w="100%"
            >
              Ecosystem
            </Button>
          </NextLink>

          <NextLink href="#sponsors" passHref>
            <Button
              as="a"
              variant="ghost"
              aria-label="Sponsors"
              my={5}
              w="100%"
            >
              Sponsors
            </Button>
          </NextLink>

          <NextLink href="#donate" passHref>
            <Button as="a" variant="ghost" aria-label="Donate" my={5} w="100%">
              Donate ❤
            </Button>
          </NextLink>
        </Flex>

        <IconButton
          aria-label="Open Menu"
          size="lg"
          mr={2}
          icon={<HamburgerIcon />}
          onClick={() => setDisplay("flex")}
          display={["flex", "flex", "none", "none"]}
        />

        <Flex
          w="100vw"
          display={display}
          bgColor="gray.50"
          zIndex={20}
          h="100vh"
          pos="fixed"
          top="0"
          left="0"
          overflowY="auto"
          flexDir="column"
        >
          <Flex justify="flex-end">
            <IconButton
              mt={2}
              mr={2}
              aria-label="Open Menu"
              size="lg"
              icon={<CloseIcon />}
              onClick={() => setDisplay("none")}
            />
          </Flex>

          <Flex flexDir="column" align="center">
            <NextLink href="#" passHref>
              <Button as="a" variant="ghost" aria-label="Home" my={5} w="100%">
                Home
              </Button>
            </NextLink>

            <NextLink href="https://xarray.pydata.org" passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="Documentation"
                my={5}
                w="100%"
              >
                Documentation
              </Button>
            </NextLink>

            <NextLink href="#features" passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="Features"
                my={5}
                w="100%"
              >
                Features
              </Button>
            </NextLink>

            <NextLink href="#ecosystem" passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="Ecosystem"
                my={5}
                w="100%"
              >
                Ecosystem
              </Button>
            </NextLink>

            <NextLink href="#sponsors" passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="Sponsors"
                my={5}
                w="100%"
              >
                Sponsors
              </Button>
            </NextLink>

            <NextLink href="#donate" passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="Donate"
                my={5}
                w="100%"
              >
                Donate ❤
              </Button>
            </NextLink>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
