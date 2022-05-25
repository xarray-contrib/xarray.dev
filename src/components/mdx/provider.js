import React from "react"

import { MDXProvider } from "@mdx-js/react"

import { Box, Heading, Text, Code as ChakraCode } from "@chakra-ui/react"
import { Quote } from "./quote"
import { Code } from "./code"
import { Hr } from "./hr"
import { Link } from "./link"

const DocsHeading = (props) => (
  <Heading
    css={{
      scrollMarginTop: "100px",
      scrollSnapMargin: "100px",
      "&[id]": {
        pointerEvents: "none",
      },
      "&[id]:before": {
        display: "block",
        height: " 6rem",
        marginTop: "-6rem",
        visibility: "hidden",
        content: `""`,
      },
      "&[id]:hover a": { opacity: 1 },
    }}
    {...props}
    mb="1em"
    mt="2em"
  >
    <Box pointerEvents="auto">
      {props.children}
      {props.id && (
        <Box
          aria-label="anchor"
          as="a"
          color="blue.500"
          fontWeight="normal"
          outline="none"
          _focus={{
            opacity: 1,
            boxShadow: "outline",
          }}
          opacity="0"
          ml="0.375rem"
          href={`#${props.id}`}
        >
          #
        </Box>
      )}
    </Box>
  </Heading>
)

const mapping = {
  h1: (props) => <DocsHeading as="h1" size="2xl" my={4} {...props} />,
  h2: (props) => <DocsHeading as="h2" size="lg" fontWeight="bold" {...props} />,
  h3: (props) => <DocsHeading as="h3" size="md" fontWeight="bold" {...props} />,
  h4: (props) => <DocsHeading as="h4" size="sm" fontWeight="bold" {...props} />,
  h5: (props) => <DocsHeading as="h5" size="sm" fontWeight="bold" {...props} />,
  h6: (props) => <DocsHeading as="h6" size="xs" fontWeight="bold" {...props} />,
  inlineCode: (props) => <ChakraCode fontSize="0.84em" {...props} />,
  code: (props) => <Code {...props} />,
  br: (props) => <Box height="24px" {...props} />,
  hr: (props) => <Hr {...props} />,
  a: (props) => <Link color={"blue.400"} {...props} />,
  p: (props) => <Text as="p" mt={0} lineHeight="tall" {...props} />,
  ul: (props) => <Box as="ul" pt={2} pl={4} ml={2} {...props} />,
  ol: (props) => <Box as="ol" pt={2} pl={4} ml={2} {...props} />,
  li: (props) => <Box as="li" pb={1} {...props} />,
  blockquote: (props) => <Quote {...props} />,
}

export const MDXComponentsProvider = (props) => {
  return (
    <MDXProvider components={mapping}>
      <Box {...props} />
    </MDXProvider>
  )
}
