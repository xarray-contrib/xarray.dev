import React from "react"

import {
  Box,
  Text,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react"

import { BsPerson, BsPeople } from "react-icons/bs"
import { GoStar, GoTag, GoBook, GoPackage } from "react-icons/go"
import useSWR from "swr"
const fetcher = (...args) => fetch(...args).then((res) => res.json())

const StatisticsCard = ({ title, stat, icon }) => {
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
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
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

export const Statistics = () => {
  const { data: releases, error: releasesError } = useSWR(
    "https://pydata-datasette.herokuapp.com/xarray/_analyze_tables_/releases,id.json?_shape=array",
    fetcher
  )
  const { data: contributors, error: ContributorsError } = useSWR(
    "https://pydata-datasette.herokuapp.com/xarray/_analyze_tables_/contributors,user_id.json?_shape=array",
    fetcher
  )

  const { data: stars, error: starsError } = useSWR(
    "https://pydata-datasette.herokuapp.com/xarray/_analyze_tables_/stars,user.json?_shape=array",
    fetcher
  )

  if (releasesError || ContributorsError || starsError) {
    return <div>Failed to load</div>
  }

  if (!releases && !contributors && !stars) {
    return <div>loading...</div>
  }

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
          stat={contributors[0].total_rows}
          icon={<BsPeople size={"3em"} />}
        />

        <StatisticsCard
          title={"Stargazers"}
          stat={stars[0].total_rows}
          icon={<GoStar size={"3em"} />}
        />
        <StatisticsCard
          title={"Used By"}
          stat={"2,000"}
          icon={<GoPackage size={"3em"} />}
        />
        <StatisticsCard
          title={"Docs Views"}
          stat={"7,000"}
          icon={<GoBook size={"3em"} />}
        />
        <StatisticsCard
          title={"Releases since 2014"}
          stat={releases[0].total_rows}
          icon={<GoTag size={"3em"} />}
        />
      </SimpleGrid>
    </Box>
  )
}
