import React from "react"
import { SimpleGrid, Spinner } from "@chakra-ui/react"
import { BsPerson, BsPeople } from "react-icons/bs"
import useSWR from "swr"
import { GoStar, GoTag, GoBook, GoPackage } from "react-icons/go"
import { Heading } from "../mdx"
import { StatisticsCard } from "./statistics-card"
import { DatasetteStatsCard } from "./datasette-stats-card"
import { fetcher } from "../../lib/data-fetching"
import * as d3 from "d3"

export const ProjectMetrics = () => {
  const { data, error } = useSWR(
    "https://raw.githubusercontent.com/andersy005/pydata-issue-tracker-datasette/main/data/docs-monthly-views.json",
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

  const monthlyViews = data.sort((a, b) => new Date(b.end) - new Date(a.end))[0]

  const dateObj = new Date(monthlyViews.end)
  const month = dateObj.toLocaleString("default", { month: "short" })
  const year = dateObj.getFullYear()

  return (
    <>
      {" "}
      <Heading as="h1" size="2xl" my={4} textAlign={"center"}>
        Xarray Project Metrics
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatisticsCard
          title={"Core Maintainers"}
          stat={"15"}
          icon={<BsPerson size={"3em"} />}
          link={"https://docs.xarray.dev/en/stable/team.html"}
        />
        <DatasetteStatsCard
          title={"Contributors"}
          query={
            "https://pydata-datasette.herokuapp.com/xarray/_analyze_tables_/contributors,user_id.json?_shape=array"
          }
          icon={<BsPeople size={"3em"} />}
          link={"https://github.com/pydata/xarray/graphs/contributors"}
        />

        <DatasetteStatsCard
          title={"Stargazers"}
          icon={<GoStar size={"3em"} />}
          query={
            "https://pydata-datasette.herokuapp.com/xarray/_analyze_tables_/stars,user.json?_shape=array"
          }
          link={"https://github.com/pydata/xarray/stargazers"}
        />

        <DatasetteStatsCard
          title={"Dependent Projects"}
          query={
            "https://pydata-datasette.herokuapp.com/xarray/_analyze_tables_/dependents,dependent.json?_shape=array"
          }
          icon={<GoPackage size={"3em"} />}
          link={"https://github.com/pydata/xarray/network/dependents"}
        />

        <StatisticsCard
          title={`${month}/${year} Docs Visitors`}
          stat={monthlyViews.users}
          icon={<GoBook size={"3em"} />}
        />

        <DatasetteStatsCard
          title={"Releases"}
          query={
            "https://pydata-datasette.herokuapp.com/xarray/_analyze_tables_/releases,id.json?_shape=array"
          }
          icon={<GoTag size={"3em"} />}
          link={"https://github.com/pydata/xarray/releases"}
        />
      </SimpleGrid>
    </>
  )
}
