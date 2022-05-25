import React from "react"
import { Link as ChakraLink } from "@chakra-ui/react"
import NextLink from "next/link"

export const Link = React.forwardRef(function CustomLink(props, ref) {
  const href = props.href
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"))

  if (isInternalLink) {
    return (
      <NextLink href={href} passHref ref={ref}>
        <ChakraLink {...props} />
      </NextLink>
    )
  }

  return <ChakraLink isExternal {...props} ref={ref} />
})
