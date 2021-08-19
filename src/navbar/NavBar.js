import React from "react"
import { Flex, Switch, Button, IconButton } from "@chakra-ui/react"
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons"
import NextLink from "next/link"

export const NavBar = () => {
  return (
    <Flex>
      <Flex>
        <Flex>
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
          onClick={() => {}}
        />
      </Flex>
    </Flex>
  )
}
