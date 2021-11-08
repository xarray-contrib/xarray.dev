import React from "react"
import { Container } from "@chakra-ui/react"

import { Statistics } from "components"

const DashboardPage = () => {
  return (
    <Container maxW={"6xl"} mt={10} p={16}>
      <Statistics />
    </Container>
  )
}

export default DashboardPage
