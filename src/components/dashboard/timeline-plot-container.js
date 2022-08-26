import {
  Spinner,
  Text,
  Box,
  Tabs,
  TabPanels,
  Tab,
  TabPanel,
  TabList,
} from "@chakra-ui/react"
import useSWR from "swr"
import * as d3 from "d3"
import { fetcher } from "../../lib/data-fetching"
import { TimelinePlot } from "./timeline-plot"

export const TimelinePlotContainer = () => {
  const { data, error } = useSWR(
    "https://pydata-datasette.herokuapp.com/open_pulls_and_issues.json?_shape=array&&sql=select%0D%0A++time%2C%0D%0A++open_issues%2C%0D%0A++open_pull_requests%0D%0Afrom%0D%0A++open_pulls_and_issues%0D%0Awhere%0D%0A++project+%3D+%27pydata%2Fxarray%27%0D%0Aorder+by%0D%0A++time",
    fetcher,
  )

  if (error) return <div>failed to load data</div>
  if (!data)
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    )

  const start = d3.min(data, (d) => d.time)
  const end = d3.max(data, (d) => d.time)

  return (
    <Box mt={10}>
      <Text fontSize={"md"} align={"center"}>
        This is a timeline of how many open issues and pull requests Xarray has
        on Github over time from {new Date(start).toLocaleDateString()} to{" "}
        {new Date(end).toLocaleDateString()}.
      </Text>
      <br />
      <br />
      <Tabs align="center" variant="enclosed" isFitted colorScheme="teal">
        <TabList>
          <Tab>Pull Requests</Tab>
          <Tab>Issues</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TimelinePlot
              data={data}
              attr={"open_pull_requests"}
              start={start}
              end={end}
            />
          </TabPanel>
          <TabPanel>
            <TimelinePlot
              data={data}
              attr={"open_issues"}
              start={start}
              end={end}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
