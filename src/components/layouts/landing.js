import React from "react"
import { Flex } from "@chakra-ui/react"
import Header from "sections/header"
import Footer from "sections/footer"

export default function Landing(props) {
  return (
    <Flex direction="column">
      <Header />
      {props.children}
      <Footer />
    </Flex>
  )
}
