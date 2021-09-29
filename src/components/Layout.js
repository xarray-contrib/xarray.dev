import React from "react"
import { Footer } from "components"
import { Header } from "components"
import { Container } from "@chakra-ui/react"
export const Layout = ({ children }) => {
  return (
    <Container maxW={"full"} maxH={"full"}>
      <Header />
      {children}
      <Footer />
    </Container>
  )
}
