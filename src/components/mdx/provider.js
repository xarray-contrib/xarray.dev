import { MDXProvider } from "@mdx-js/react"

import { Box, Code as ChakraCode, Text } from "@chakra-ui/react"
import { Code } from "./code"
import { Heading } from "./heading"
import { Hr } from "./hr"
import { Image } from "./image"
import { Link } from "./link"
import { Quote } from "./quote"

const mapping = {
  h1: (props) => <Heading as="h1" size="2xl" my={4} {...props} />,
  h2: (props) => <Heading as="h2" size="lg" fontWeight="bold" {...props} />,
  h3: (props) => <Heading as="h3" size="md" fontWeight="bold" {...props} />,
  h4: (props) => <Heading as="h4" size="sm" fontWeight="bold" {...props} />,
  h5: (props) => <Heading as="h5" size="sm" fontWeight="bold" {...props} />,
  h6: (props) => <Heading as="h6" size="xs" fontWeight="bold" {...props} />,
  inlineCode: (props) => <ChakraCode fontSize="sm" {...props} />,
  code: (props) => <Code {...props} />,
  br: (props) => <Box height="24px" {...props} />,
  hr: (props) => <Hr {...props} />,
  a: (props) => <Link color={"blue.400"} {...props} />,
  p: (props) => <Text as="p" my={4} lineHeight="tall" {...props} />,
  ul: (props) => <Box as="ul" pt={2} pl={4} ml={2} {...props} />,
  ol: (props) => <Box as="ol" pt={2} pl={4} ml={2} {...props} />,
  li: (props) => <Box as="li" pb={1} {...props} />,
  blockquote: (props) => <Quote {...props} />,
  img: (props) => <Image {...props} alt={props.alt} />,
}

export const MDXComponentsProvider = (props) => {
  return (
    <MDXProvider components={mapping}>
      <Box {...props} />
    </MDXProvider>
  )
}
