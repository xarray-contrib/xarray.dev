import { Box } from '@chakra-ui/react'
import React from 'react'

import { getTime } from 'date-fns'

// Fix window is not defined issue
// https://github.com/apexcharts/react-apexcharts/issues/240#issuecomment-765417887
import dynamic from 'next/dynamic'
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

export const TimelinePlot = ({ data, attr, start, end }) => {
  const dataSeries = data.map((item) => {
    return [getTime(new Date(item.time)), item[attr]]
  })

  const [state, setState] = React.useState({
    series: [{ name: attr, data: dataSeries }],
    options: {
      chart: {
        id: `${attr}-chart`,
        type: 'line',
        toolbar: {
          autoSelected: 'pan',
          show: false,
        },
      },
      colors: ['#546E7A'],
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
        type: 'datetime',
      },
      yaxis: {
        tickAmount: 10,
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
        type: 'area',
        brush: {
          target: `${attr}-chart`,
          enabled: true,
        },
        selection: {
          enabled: true,
          xaxis: {
            min: getTime(new Date(start)),
            max: getTime(new Date(end)),
          },
        },
      },
      colors: ['#008FFB'],
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.91,
          opacityTo: 0.1,
        },
      },
      xaxis: {
        type: 'datetime',
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
    <Box mx={'auto'}>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type='line'
        height={330}
      />
      <ReactApexChart
        options={state.optionsLine}
        series={state.seriesLine}
        type='area'
        height={130}
      />
    </Box>
  )
}
