import React from "react"
import { Container } from "@chakra-ui/react"

import { Statistics, TimelinePlotContainer } from "components"

const DashboardPage = () => {
  return (
    <Container maxW={"6xl"} mt={10}>
      <Statistics />
      <TimelinePlotContainer />
    </Container>
  )
}

export default DashboardPage
