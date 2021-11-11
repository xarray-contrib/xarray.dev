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
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react"

import { BsPerson, BsPeople } from "react-icons/bs"
import { GoStar, GoTag, GoBook, GoPackage } from "react-icons/go"
import { GiDuration } from "react-icons/gi"
import useSWR from "swr"
import * as d3 from "d3"

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const StatisticsCard = ({ title, stat, icon, includeDiff = false }) => {
  return (
    <Stat
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
  )
}

const DatasetteResult = ({ query }) => {
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
  return data[0].total_rows
}

const TimeseriesAggResult = ({ query }) => {
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
  const diff = result - previousMonthResult
  const diffPercentage = ((previousMonthResult - result) / result) * 100
  const diffPercentageFormatted = (value) => {
    const formatted = d3.format(".2f")(Math.abs(value))
    return value < 0 ? `${formatted}% ↑` : `${formatted}% ↓`
  }
  console.log(
    result,
    previousMonthResult,
    diff,
    diffPercentage,
    diffPercentageFormatted(diffPercentage)
  )

  return result <= 2
    ? `${d3.format(".1f")(result * 24)} hours (${diffPercentageFormatted(
        diffPercentage
      )})`
    : `${d3.format(".1f")(result)} days (${diffPercentageFormatted(
        diffPercentage
      )})`
}

export const Statistics = () => {
  return (
    <Box mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <Text
        as={"h1"}
        textAlign={"center"}
        fontSize={"2xl"}
        py={10}
        fontWeight={"bold"}
      >
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum.
      </Text>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatisticsCard
          title={"Core Contributors"}
          stat={"12"}
          icon={<BsPerson size={"3em"} />}
        />
        <StatisticsCard
          title={"Contributors"}
          stat={
            <DatasetteResult
              query={
                "https://pydata-datasette.herokuapp.com/xarray/_analyze_tables_/contributors,user_id.json?_shape=array"
              }
            />
          }
          icon={<BsPeople size={"3em"} />}
        />
        <StatisticsCard
          title={"Stargazers"}
          stat={
            <DatasetteResult
              query={
                "https://pydata-datasette.herokuapp.com/xarray/_analyze_tables_/stars,user.json?_shape=array"
              }
            />
          }
          icon={<GoStar size={"3em"} />}
        />
        <StatisticsCard
          title={"Dependent Projects"}
          stat={
            <DatasetteResult
              query={
                "https://pydata-datasette.herokuapp.com/xarray/_analyze_tables_/dependents,dependent.json?_shape=array"
              }
            />
          }
          icon={<GoPackage size={"3em"} />}
        />
        <StatisticsCard
          title={"Docs Views"}
          stat={"7,000"}
          icon={<GoBook size={"3em"} />}
        />
        <StatisticsCard
          title={"Releases since 2014"}
          stat={
            <DatasetteResult
              query={
                "https://pydata-datasette.herokuapp.com/xarray/_analyze_tables_/releases,id.json?_shape=array"
              }
            />
          }
          icon={<GoTag size={"3em"} />}
        />
      </SimpleGrid>

      <Text
        as={"h1"}
        textAlign={"center"}
        fontSize={"2xl"}
        py={10}
        fontWeight={"bold"}
      >
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }}>
        {" "}
        <StatisticsCard
          title={"Median time a pull request is open"}
          stat={
            <TimeseriesAggResult
              query={
                "https://pydata-datasette.herokuapp.com/xarray.json?_shape=array&&sql=select%0D%0A++id%2C%0D%0A++number%2C%0D%0A++state%2C%0D%0A++created_at%2C%0D%0A++closed_at%2C%0D%0A++julianday%28closed_at%29+-+julianday%28created_at%29+as+age_in_days%0D%0Afrom%0D%0A++issues+as+data%0D%0Awhere%0D%0A++type+%3D+%27pull%27%0D%0A++and+state+%3D+%27closed%27%0D%0Aorder+by%0D%0A++id"
              }
            />
          }
          icon={<GiDuration size={"3em"} />}
        />
        <StatisticsCard
          title={"Median time an issue is open"}
          stat={
            <TimeseriesAggResult
              query={
                "https://pydata-datasette.herokuapp.com/xarray.json?_shape=array&&sql=select%0D%0A++id%2C%0D%0A++number%2C%0D%0A++state%2C%0D%0A++created_at%2C%0D%0A++closed_at%2C%0D%0A++julianday%28closed_at%29+-+julianday%28created_at%29+as+age_in_days%0D%0Afrom%0D%0A++issues+as+data%0D%0Awhere%0D%0A++type+%3D+%27issue%27%0D%0A++and+state+%3D+%27closed%27%0D%0Aorder+by%0D%0A++id"
              }
            />
          }
          icon={<GiDuration size={"3em"} />}
        />
      </SimpleGrid>
    </Box>
  )
}
