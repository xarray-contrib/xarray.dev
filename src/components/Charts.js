import React from "react"
import { Line } from "react-chartjs-2"

const times = [
  1611017460, 1611304380, 1612484160, 1614154440, 1614240480, 1615133700,
  1615565700, 1616026620, 1618128120, 1618214880, 1619050080, 1619280240,
  1620202080, 1622882160, 1624926360, 1627172820, 1627546260, 1629592020,
  1630685580, 1632586260,
].map((x) => new Date(x * 1000).toLocaleDateString())

const issuesData = {
  labels: times,
  datasets: [
    {
      label: "# of open issues",
      data: [
        709, 688, 708, 690, 682, 709, 710, 742, 693, 773, 696, 694, 744, 729,
        692, 778, 705, 680, 739, 764,
      ],
      fill: false,
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgba(255, 99, 132, 0.2)",
    },
  ],
}

const pullsData = {
  labels: times,
  datasets: [
    {
      label: "# of open pull requests",
      data: [
        108, 99, 108, 101, 101, 109, 108, 99, 101, 112, 104, 111, 102, 100, 108,
        116, 105, 101, 94, 110,
      ],
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
      decimation: { enabled: true, algorithm: "lttb", samples: 50 },
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

export const Charts = () => {
  return (
    <>
      <Line data={issuesData} options={options} />
      <Line data={pullsData} options={options} />
    </>
  )
}
