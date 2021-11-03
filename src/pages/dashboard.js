import React from "react"
import { Container } from "@chakra-ui/react"
import { WeeklyCountPlot, TimelinePlotContainer } from "components"

const dashboardPage = () => {
  return (
    <Container maxW={"6xl"} mt={10} p={16}>
      <WeeklyCountPlot />
      <br></br>
      <br></br>
      <br></br>
      <TimelinePlotContainer />
    </Container>
  )
}

export default dashboardPage
