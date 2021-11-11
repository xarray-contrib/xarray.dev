import React from "react"
import useSWR from "swr"
import * as d3 from "d3"

// Fix window is not defined issue
// https://github.com/apexcharts/react-apexcharts/issues/240#issuecomment-765417887
import dynamic from "next/dynamic"
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false })

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const TimelinePlot = () => {
  const { data, error } = useSWR(
    "https://gist.githubusercontent.com/andersy005/4f62b7b0cbf943b158cb11068e80c7c8/raw/1370342e460c7c00980a47e1e6c60dd665080132/xarray-repo-daily-data.json",
    fetcher
  )

  if (error) return <div>failed to load data</div>
  if (!data) return <div>loading...</div>

  const dataSeries = data.map((item) => {
    return [item.time, item.open_issues]
  })

  const start = d3.min(data, (d) => d.time)
  const end = d3.max(data, (d) => d.time)

  const inputs = {
    series: [
      {
        data: dataSeries,
      },
    ],
    options: {
      chart: {
        id: "chart2",
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
        id: "chart1",
        height: 130,
        type: "area",
        brush: {
          target: "chart2",
          enabled: true,
        },
        selection: {
          enabled: true,
          xaxis: {
            min: new Date(start).getTime(),
            max: new Date(end).getTime(),
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
  }

  return (
    <>
      {" "}
      <ReactApexChart
        options={inputs.options}
        series={inputs.series}
        type="line"
        height={230}
      />
      <ReactApexChart
        options={inputs.optionsLine}
        series={inputs.seriesLine}
        type="area"
        height={130}
      />
    </>
  )
}
