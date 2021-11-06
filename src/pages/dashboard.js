import React from "react"
import { Container } from "@chakra-ui/react"
import { WeeklyCountPlot } from "components"

const dashboardPage = () => {
  return (
    <Container maxW={"6xl"} mt={10} p={16}>
      <WeeklyCountPlot />
    </Container>
  )
}

export default dashboardPage
