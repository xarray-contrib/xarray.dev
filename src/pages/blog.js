import React from "react"
import { Container, UnorderedList, ListItem, Box } from "@chakra-ui/react"

import { Contents } from "../data/contents"

const Blog = () => {
  return (
    <Container maxW={"6xl"} mt={10}>
      <Box mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <UnorderedList>
          <ListItem>Test</ListItem>
          <ListItem>{JSON.stringify(Contents)}</ListItem>
        </UnorderedList>
      </Box>
    </Container>
  )
}

export default Blog
