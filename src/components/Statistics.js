import React from "react"
import { lastDayOfMonth, isWithinInterval, startOfMonth } from "date-fns"
import {
  Box,
  Text,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  StatHelpText,
  StatArrow,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react"

import { BsPerson, BsPeople } from "react-icons/bs"
import { GoStar, GoTag, GoBook, GoPackage } from "react-icons/go"
import { GiDuration } from "react-icons/gi"
import useSWR from "swr"
import * as d3 from "d3"

import { Heading } from "components/mdx"

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const StatisticsCard = ({ title, stat, icon, diff, link }) => {
  let diffElement
  if (diff) {
    let color
    if (diff.type === "increase") {
      color = "red.500"
    } else {
      color = "green.500"
    }
    diffElement = (
      <StatHelpText>
        <StatArrow type={diff.type} color={color} />
        {diff.value}
      </StatHelpText>
    )
  } else {
    diffElement = <Text>{""}</Text>
  }
  return (
    <StatGroup>
      <Stat
        as={"a"}
        href={link || null}
        px={{ base: 2, md: 4 }}
        py={"5"}
        shadow={"xl"}
        border={"1px solid"}
        borderColor={useColorModeValue("gray.800", "gray.500")}
        rounded={"lg"}
      >
        <Flex justifyContent={"space-between"}>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={"medium"}>{title}</StatLabel>
            <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
              {stat}
            </StatNumber>
            {diffElement}
          </Box>
          <Box
            my={"auto"}
            color={useColorModeValue("gray.800", "gray.200")}
            alignContent={"center"}
          >
            {icon}
          </Box>
        </Flex>
      </Stat>
    </StatGroup>
  )
}

const DatasetteStatsCard = ({ query, title, icon, link }) => {
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

const TimeseriesAggStatsCard = ({ query, title, icon }) => {
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
    })
  )

  const result = d3.median(data, (d) => d.age_in_days)
  const previousMonthResult = d3.median(previousMonthData, (d) => d.age_in_days)
  const diffPercentage = ((previousMonthResult - result) / result) * 100

  const change = {
    type: diffPercentage < 0 ? "increase" : "decrease",
    value: `${d3.format(".2f")(Math.abs(diffPercentage))}% since last month`,
  }
  return (
    <StatisticsCard
      title={title}
      icon={icon}
      stat={
        result <= 2
          ? `${d3.format(".1f")(result * 24)} hours`
          : `${d3.format(".1f")(result)} days`
      }
      diff={change}
    />
  )
}

export const Statistics = () => {
  return (
    <Box mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <Heading as="h1" size="2xl" my={4} textAlign={"center"}>
        Xarray Project Statistics
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
          title={"Docs Views"}
          stat={"7,000"}
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

      <Heading as="h1" size="2xl" my={4} textAlign={"center"}>
        Xarray Issue Tracker
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }}>
        {" "}
        <TimeseriesAggStatsCard
          title={"Median time a pull request is open"}
          query={
            "https://pydata-datasette.herokuapp.com/xarray.json?_shape=array&&sql=select%0D%0A++id%2C%0D%0A++number%2C%0D%0A++state%2C%0D%0A++created_at%2C%0D%0A++closed_at%2C%0D%0A++julianday%28closed_at%29+-+julianday%28created_at%29+as+age_in_days%0D%0Afrom%0D%0A++issues+as+data%0D%0Awhere%0D%0A++type+%3D+%27pull%27%0D%0A++and+state+%3D+%27closed%27%0D%0Aorder+by%0D%0A++id"
          }
          icon={<GiDuration size={"3em"} />}
        />
        <TimeseriesAggStatsCard
          title={"Median time an issue is open"}
          icon={<GiDuration size={"3em"} />}
          query={
            "https://pydata-datasette.herokuapp.com/xarray.json?_shape=array&&sql=select%0D%0A++id%2C%0D%0A++number%2C%0D%0A++state%2C%0D%0A++created_at%2C%0D%0A++closed_at%2C%0D%0A++julianday%28closed_at%29+-+julianday%28created_at%29+as+age_in_days%0D%0Afrom%0D%0A++issues+as+data%0D%0Awhere%0D%0A++type+%3D+%27issue%27%0D%0A++and+state+%3D+%27closed%27%0D%0Aorder+by%0D%0A++id"
          }
        />
      </SimpleGrid>
    </Box>
  )
}
