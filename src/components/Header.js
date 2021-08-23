import React from "react"
import {
  Box,
  Flex,
  Container,
  Stack,
  useDisclosure,
  IconButton,
  useColorModeValue,
  useColorMode,
  Image,
} from "@chakra-ui/react"
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons"
import { IoMoon, IoSunny } from "react-icons/io5"
import Link from "next/link"
import { MobileNav } from "./MobileNav"
import { DesktopNav } from "./DesktopNav"

export const Header = () => {
  const navItems = React.useMemo(
    () => [
      { label: "Features", href: "#features" },
      { label: "Ecosystem", href: "#ecosystem" },
      { label: "Sponsors", href: "#sponsors" },
      { label: "Donate ❤", href: "#donate" },
    ],
    []
  )

  const { isOpen, onToggle } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box>
      <Flex
        as={"header"}
        pos="fixed"
        top="0"
        w={"full"}
        minH={"60px"}
        boxShadow={"sm"}
        zIndex="999"
        justify={"center"}
        css={{
          backdropFilter: "saturate(180%) blur(5px)",
          backgroundColor: useColorModeValue(
            "rgba(255, 255, 255, 0.8)",
            "rgba(26, 32, 44, 0.8)"
          ),
        }}
      >
        <Container as={Flex} maxW={"7xl"} align={"center"}>
          <Flex
            flex={{ base: "0", md: "auto" }}
            ml={{ base: -2 }}
            mr={{ base: 6, md: 0 }}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={"ghost"}
              size={"sm"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>

          <Flex
            flex={{ base: 1, md: "auto" }}
            justify={{ base: "start", md: "start" }}
          >
            <Link href={"/"} passHref>
              <Stack
                as={"a"}
                direction={"row"}
                alignItems={"center"}
                spacing={{ base: 2, sm: 4 }}
              >
                <Image
                  w={16}
                  showBorder={false}
                  src={"dataset-diagram-logo.png"}
                  alt={"xarray logo"}
                />
              </Stack>
            </Link>
          </Flex>

          <Stack
            direction={"row"}
            align={"center"}
            spacing={{ base: 6, md: 8 }}
            flex={{ base: 1, md: "auto" }}
            justify={"flex-end"}
          >
            <DesktopNav
              navItems={navItems}
              display={{ base: "none", md: "flex" }}
            />
            <IconButton
              size={"sm"}
              variant={"ghost"}
              aria-label={"Toggle Color Mode"}
              onClick={toggleColorMode}
              icon={
                colorMode == "light" ? (
                  <IoMoon size={18} />
                ) : (
                  <IoSunny size={18} />
                )
              }
            />
          </Stack>
        </Container>
      </Flex>
      <MobileNav isOpen={isOpen} navItems={navItems} />
    </Box>
  )
}
