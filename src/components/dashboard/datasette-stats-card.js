import React from "react"
import { Text, Spinner } from "@chakra-ui/react"
import useSWR from "swr"
import { StatisticsCard } from "./statistics-card"
import { fetcher } from "../../lib/data-fetching"

export const DatasetteStatsCard = ({ query, title, icon, link }) => {
  const { data, error } = useSWR(query, fetcher)
  if (error) return <Text>failed to load</Text>
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
  return (
    <StatisticsCard
      stat={data[0].total_rows}
      title={title}
      icon={icon}
      link={link}
    />
  )
}
