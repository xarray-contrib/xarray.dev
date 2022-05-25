import React from "react"
import { Container } from "@chakra-ui/react"

import { Statistics } from "components"
import { TimelinePlotContainer } from "components/TimelinePlot"
import { Layout } from "components/Layout"

const DashboardPage = () => {
  return (
    <Layout
      title={"Xarray project statistics"}
      url={"https://xarray.dev/dashboard"}
      description={"Xarray project statistics"}
      card={
        "https://raw.githubusercontent.com/xarray-contrib/xarray.dev/main/public/dataset-diagram-logo.png"
      }
    >
      <Statistics />
      <TimelinePlotContainer />
    </Layout>
  )
}

export default DashboardPage
