import React from "react"
import {
  Container,
  Link,
  Button,
  Text,
  useColorModeValue,
  Center,
  Box,
  Image,
  Heading,
  Badge,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react"

const ProjectProfile = ({
  name,
  description,
  domains,
  repo,
  homepage,
  logo,
}) => {
  return (
    <Center py={6}>
      <Box
        maxW={"270px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Image src={logo} alt={name} h={"120px"} w={"full"} />

        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {name}
        </Heading>

        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
          {description}
        </Text>
        <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
          {domains.map((domain, key) => {
            return (
              <Badge key={key} variant="outline" rounded="full" px={2} py={1}>
                {domain}
              </Badge>
            )
          })}
        </Stack>

        <Stack mt={8} direction={"row"} spacing={4}>
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
            boxShadow={
              "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            colorScheme={"teal"}
            bg={"teal.400"}
            _hover={{ bg: "teal.500" }}
          >
            <Link href={repo}>Repository</Link>
          </Button>
        </Stack>
      </Box>
    </Center>
  )
}

export const ScientificDomains = () => {
  const projects = React.useMemo(
    () => [
      {
        name: "xgcm",
        description: "General Circulation Model Postprocessing with xarray",
        domains: ["🌊 Oceanography"],
        repo: "https://github.com/xgcm/xgcm",
        logo: "https://raw.githubusercontent.com/xgcm/xgcm/master/doc/_static/logo.png",
      },
      {
        name: "verde",
        description:
          "Python library for processing spatial data and interpolating it on regular grids",
        domains: ["🗺️ Geographic Processing"],
        repo: "https://github.com/fatiando/verde",
        logo: "https://raw.githubusercontent.com/fatiando/verde/master/doc/_static/verde-logo.svg",
      },
      {
        name: "arviz",
        description: "Exploratory analysis of Bayesian model",
        domains: ["Bayesian Inference"],
        repo: "https://github.com/arviz-devs/arviz",
        homepage: "https://arviz-devs.github.io/arviz/",
        logo: "https://raw.githubusercontent.com/arviz-devs/arviz/main/doc/logo/ArviZ.svg",
      },
      {
        name: "MetPy",
        description:
          "Collection of tools for reading, visualizing and performing calculations with weather data.",
        domains: ["🌪🌡☔ Meteorology"],
        repo: "https://github.com/Unidata/MetPy",
        homepage: "https://unidata.github.io/MetPy",
        logo: "https://raw.githubusercontent.com/Unidata/MetPy/main/docs/_static/metpy_horizontal.png",
      },
      {
        name: "climpred",
        description: "Verification of weather and climate forecasts.",
        domains: ["🌎 Geoscience"],
        repo: "https://github.com/pangeo-data/climpred",
        homepage: "https://climpred.readthedocs.io/",
        logo: "https://raw.githubusercontent.com/pangeo-data/climpred/main/docs/source/images/climpred-logo.png",
      },
      {
        name: "xarray-spatial",
        description: "Raster-based Spatial Analytics for Python",
        domains: ["🗺️ Geographic Processing"],
        repo: "https://github.com/makepath/xarray-spatial",
        homepage: "https://xarray-spatial.org/",
        logo: "https://raw.githubusercontent.com/makepath/xarray-spatial/master/docs/source/_static/img/Xarray-Spatial-logo.svg",
      },
      {
        name: "SquidPy",
        description: "Spatial Single Cell Analysis in Python",
        domains: ["💊 Bioinformatics"],
        repo: "https://github.com/theislab/squidpy",
        homepage: "squidpy.readthedocs.io/en/stable/",
        logo: "https://raw.githubusercontent.com/theislab/squidpy/master/docs/source/_static/img/squidpy_horizontal.png",
      },
    ],
    []
  )

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
        <Link href="https://xarray.pydata.org/en/stable/ecosystem.html">
          See More
        </Link>
      </Button>
    </Container>
  )
}
