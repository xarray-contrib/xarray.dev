import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Link as ChakraLink } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'

export const Link = React.forwardRef(function CustomLink(props, ref) {
  const href = props.href
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))
  const { useExternalIcon, ...rest } = props

  if (isInternalLink) {
    return (
      <ChakraLink as={NextLink} ref={ref} {...rest}>
        {rest.children}
      </ChakraLink>
    )
  }

  return (
    <ChakraLink isExternal {...rest} as={NextLink} ref={ref}>
      {rest.children}
      {useExternalIcon && <ExternalLinkIcon mx='2px' />}
    </ChakraLink>
  )
})
