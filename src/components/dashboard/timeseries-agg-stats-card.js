import { StatisticsCard } from '@/components/dashboard/statistics-card'
import { fetcher } from '@/lib/data-fetching'
import { Spinner, Text } from '@chakra-ui/react'
import * as d3 from 'd3'
import { isWithinInterval, lastDayOfMonth, startOfMonth } from 'date-fns'
import useSWR from 'swr'

export const TimeseriesAggStatsCard = ({ query, title, icon }) => {
  let { data, error } = useSWR(query, fetcher)
  if (error) return <Text>failed to load</Text>
  if (!data)
    return (
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    )

  data = data.map((item) => {
    item.closed_at = new Date(item.closed_at)
    return item
  })

  let previousMonthStart = new Date()
  previousMonthStart.setDate(0)
  previousMonthStart.setDate(1)
  previousMonthStart = startOfMonth(previousMonthStart)
  const previousMonthEnd = lastDayOfMonth(previousMonthStart)

  const previousMonthData = data.filter((d) =>
    isWithinInterval(d.closed_at, {
      start: d3.min(data, (d) => d.closed_at),
      end: previousMonthEnd,
    }),
  )

  const result = d3.median(data, (d) => d.age_in_days)
  const previousMonthResult = d3.median(previousMonthData, (d) => d.age_in_days)
  const diffPercentage = ((previousMonthResult - result) / result) * 100

  const change = {
    type: diffPercentage < 0 ? 'increase' : 'decrease',
    value: `${d3.format('.2f')(Math.abs(diffPercentage))}% since last month`,
  }
  return (
    <StatisticsCard
      title={title}
      icon={icon}
      stat={
        result <= 2
          ? `${d3.format('.1f')(result * 24)} hours`
          : `${d3.format('.1f')(result)} days`
      }
      diff={change}
    />
  )
}
