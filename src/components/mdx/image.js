import React from "react"
import { Box } from "@chakra-ui/react"
import NextImage from "next/image"

// Not functional: https://github.com/chakra-ui/chakra-ui/discussions/2475
export const Image = (props) => {
  const { src, alt, ...rest } = props
  return (
    <Box position="relative" {...rest}>
      <NextImage objectFit="cover" layout="fill" src={src} alt={alt} h="lg" />
    </Box>
  )
}
