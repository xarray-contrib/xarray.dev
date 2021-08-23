import React from "react"
import {
  Stack,
  Box,
  Popover,
  PopoverTrigger,
  Link,
  useColorModeValue,
  PopoverContent,
  Text,
  Flex,
  Icon,
} from "@chakra-ui/react"
import NextLink from "next/link"
import { ChevronRightIcon } from "@chakra-ui/icons"

export const DesktopNav = ({ navItems, ...rest }) => {
  return (
    <Stack direction={"row"} spacing={4} {...rest}>
      {navItems.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <NavItemLInk href={navItem.href}></NavItemLInk>
            </PopoverTrigger>
            {navItem.children && <NavItemPopoverContent navItem={navItem} />}
          </Popover>
        </Box>
      ))}
    </Stack>
  )
}

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <NextLink href={href ?? "#"} passHref={true}>
      <Link
        role={"group"}
        display={"block"}
        p={2}
        rounded={"md"}
        _hover={{ bg: useColorModeValue("green.50", "gray.900") }}
      >
        <Stack direction={"row"} align={"center"}>
          <Box>
            <Text
              transition={"all .3s ease"}
              _groupHover={{ color: "green.400" }}
              fontWeight={500}
            >
              {label}
            </Text>
            <Text fontSize={"sm"}>{subLabel}</Text>
          </Box>
          <Flex
            transition={"all .3s ease"}
            transform={"translateX(-10px)"}
            opacity={0}
            _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
            justify={"flex-end"}
            align={"center"}
            flex={1}
          >
            <Icon color={"green.400"} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Link>
    </NextLink>
  )
}

const NavItemLInk = ({ href }) => {
  return (
    <Link
      p={2}
      href={href ?? "#"}
      fontSize={"sm"}
      fontWeight={500}
      color={useColorModeValue("gray.600", "gray.200")}
      _hover={{
        textDecoration: "none",
        color: useColorModeValue("gray.800", "white"),
      }}
    ></Link>
  )
}

const NavItemPopoverContent = ({ navItem }) => {
  return (
    <PopoverContent
      border={0}
      boxShadow={"xl"}
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      rounded={"xl"}
      minW={"sm"}
    >
      <Stack>
        {navItem.children.map((child) => (
          <DesktopSubNav key={child.label} {...child} />
        ))}
      </Stack>
    </PopoverContent>
  )
}
