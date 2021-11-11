import React from "react"
import { Container } from "@chakra-ui/react"

import { Statistics } from "components"
import { TimelinePlot } from "../components/TimelinePlot"

const DashboardPage = () => {
  return (
    <Container maxW={"6xl"} mt={10} p={16}>
      <Statistics />
      <TimelinePlot />
    </Container>
  )
}

export default DashboardPage
