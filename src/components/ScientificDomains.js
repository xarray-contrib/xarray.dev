import React from "react"
import {
  Container,
  Link,
  Button,
  Text,
  useColorModeValue,
  HStack,
  VStack,
  Box,
  Grid,
  GridItem,
  Image,
  Badge,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react"

import { Projects } from "../data/projects"

const ProjectProfile = ({
  name,
  description,
  domains,
  repo,
  homepage,
  logo,
}) => {
  return (
    <Box
      maxW="sm"
      maxH="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Box
        maxW={"300px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"1xl"}
        rounded={"md"}
        overflow={"hidden"}
        p={4}
        textAlign={"center"}
      >
        <Box w={"full"} maxH={"80px"}>
          <Image src={logo} alt={name} />
        </Box>

        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={1}
          py={4}
          h={20}
          mt={5}
        >
          {description}
        </Text>
        <VStack
          align={"center"}
          justify={"center"}
          direction={"row"}
          mt={4}
          py={10}
        >
          {domains.map((domain, key) => {
            return (
              <Badge key={key} variant="outline" rounded="full" px={2} py={1}>
                {domain}
              </Badge>
            )
          })}
        </VStack>
        <HStack>
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            _focus={{
              bg: "gray.200",
            }}
          >
            <Link href={homepage}>Homepage</Link>
          </Button>
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            colorScheme={"teal"}
            bg={"teal.400"}
            _hover={{ bg: "teal.500" }}
          >
            <Link href={repo}>Repository</Link>
          </Button>
        </HStack>
      </Box>
    </Box>
  )
}

export const ScientificDomains = () => {
  const projects = React.useMemo(() => Projects, [])

  return (
    <Container maxW={"6xl"} mt={10}>
      <Text color={useColorModeValue("gray.800", "white")} fontSize={"lg"}>
        This section lists some of the standalone packages, projects developed
        with xarray.
      </Text>
      <br />
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        {projects
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((project, index) => (
            <ProjectProfile
              key={index}
              name={project.name}
              logo={project.logo}
              description={project.description}
              domains={project.domains}
              repo={project.repo}
              homepage={project.homepage}
            ></ProjectProfile>
          ))}
      </SimpleGrid>
      <Button
        rounded={"full"}
        size={"lg"}
        fontWeight={"normal"}
        px={6}
        colorScheme={"red"}
        bg={"red.400"}
        _hover={{ bg: "red.500" }}
      >
        <Link href="https://docs.xarray.dev/en/stable/ecosystem.html">
          See More
        </Link>
      </Button>
    </Container>
  )
}
