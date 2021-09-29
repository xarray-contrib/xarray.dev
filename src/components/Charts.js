import React from "react"
import { Line } from "react-chartjs-2"
import { Container } from "@chakra-ui/react"
import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const Charts = () => {
  const { data, error } = useSWR(
    "https://gist.githubusercontent.com/andersy005/4f62b7b0cbf943b158cb11068e80c7c8/raw/6006f3e688e881d944b7b22be043fc4ed8ba5c18/xarray-repo-data.json",
    fetcher
  )

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const pulls = data.map((item) => item.open_pull_requests)
  const issues = data.map((item) => item.open_issues)
  const dates = data.map((item) =>
    new Date(item.timestamp * 1000).toLocaleDateString()
  )

  const issuesData = {
    labels: dates,
    datasets: [
      {
        label: "# of open issues",
        data: issues,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  }

  const pullsData = {
    labels: dates,
    datasets: [
      {
        label: "# of open pull requests",
        data: pulls,
        fill: false,
        backgroundColor: "rgb(54, 162, 235)",
        borderColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  }

  const options = {
    type: "line",
    data: issuesData,
    options: {
      responsive: true,
      interaction: {
        mode: "nearest",
        axis: "x",
        intersect: false,
      },
      plugins: {
        decimation: { enabled: true, algorithm: "lttb", samples: 100 },
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "",
        },
      },
      scales: {
        x: {
          type: "time",
          ticks: {
            source: "auto",
            // Disabled rotation for performance
            maxRotation: 0,
            autoSkip: true,
          },
        },
      },
    },
  }

  return (
    <Container maxW={"6xl"} mt={10} p={16}>
      <Line data={issuesData} options={options} />
      <Line data={pullsData} options={options} />
    </Container>
  )
}
