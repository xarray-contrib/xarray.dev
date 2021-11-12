import { Footer } from "./footer"
import { Header } from "./header"
import { Container } from "@chakra-ui/react"
import React from "react"

const Layout = ({ children }) => {
  return (
    <>
      <Container maxW={"full"} maxH={"full"}>
        <Header />
        {children}
        <Footer />
      </Container>
    </>
  )
}

export default Layout
