import React from "react"
import useSWR from "swr"
import * as d3 from "d3"
import {
  Spinner,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Box,
  Text,
} from "@chakra-ui/react"

// Fix window is not defined issue
// https://github.com/apexcharts/react-apexcharts/issues/240#issuecomment-765417887
import dynamic from "next/dynamic"
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false })

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const TimelinePlot = ({ data, attr, start, end }) => {
  const dataSeries = data.map((item) => {
    return [item.time, item[attr]]
  })

  const [state, setState] = React.useState({
    series: [{ name: attr, data: dataSeries }],
    options: {
      chart: {
        id: `${attr}-chart`,
        type: "line",
        height: 330,
        toolbar: {
          autoSelected: "pan",
          show: false,
        },
      },
      colors: ["#546E7A"],
      stroke: {
        width: 3,
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        opacity: 1,
      },
      markers: {
        size: 0,
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        tickAmount: 8,
      },
    },

    seriesLine: [
      {
        data: dataSeries,
      },
    ],
    optionsLine: {
      chart: {
        id: `${attr}-chart2`,
        height: 130,
        type: "area",
        brush: {
          target: `${attr}-chart`,
          enabled: true,
        },
        selection: {
          enabled: true,
          xaxis: {
            min: start,
            max: end,
          },
        },
      },
      colors: ["#008FFB"],
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.91,
          opacityTo: 0.1,
        },
      },
      xaxis: {
        type: "datetime",
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        tickAmount: 4,
      },
    },
  })

  return (
    <Box mx={"auto"}>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="line"
        height={230}
      />
      <ReactApexChart
        options={state.optionsLine}
        series={state.seriesLine}
        type="area"
        height={130}
      />
    </Box>
  )
}

export const TimelinePlotContainer = () => {
  const { data, error } = useSWR(
    "https://gist.githubusercontent.com/andersy005/4f62b7b0cbf943b158cb11068e80c7c8/raw/1370342e460c7c00980a47e1e6c60dd665080132/xarray-repo-daily-data.json",
    fetcher
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
      <Text
        as={"h1"}
        textAlign={"center"}
        fontSize={"2xl"}
        py={10}
        fontWeight={"bold"}
      >
        Xarray Issue Tracker
      </Text>
      <Text fontSize={"md"} align={"center"}>
        This is a timeline of how many open issues and pull requests Xarray has
        on Github over time from {new Date(start).toLocaleDateString()} to{" "}
        {new Date(end).toLocaleDateString()}.
      </Text>
      <br />
      <br />
      <Tabs align="center" variant="soft-rounded" colorScheme="teal">
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
