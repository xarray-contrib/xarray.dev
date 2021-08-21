import React from "react"
import {
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Link,
  Td,
  Button,
  Text,
  TableCaption,
} from "@chakra-ui/react"

export const ScientificDomains = () => {
  const projects = React.useMemo(
    () => [
      {
        name: "xgcm",
        description: "General Circulation Model Postprocessing with xarray",
        domain: "Geoscience",
        repo: "https://github.com/xgcm/xgcm",
      },
      {
        name: "verde",
        description: "Processing and gridding spatial data",
        domain: "Geoscience",
        repo: "https://github.com/fatiando/verd",
      },
      {
        name: "arviz",
        description: "Exploratory analysis of Bayesian model",
        domain: "Bayesian Inference",
        repo: "https://github.com/arviz-devs/arviz",
      },
      {
        name: "MetPy",
        description:
          "Collection of tools for reading, visualizing and performing calculations with weather data.",
        domain: "Geoscience",
        repo: "https://github.com/xgcm/xgcm",
      },
      {
        name: "climpred",
        description: "loremipsum",
        domain: "GeoScience",
        repo: "https://github.com/pangeo-data/climpred",
      },
      {
        name: "xarray-spatial",
        description: "loremipsum",
        domain: "Geoscience",
        repo: "https://github.com/pangeo-data/climpred",
      },
      {
        name: "SquidPy",
        description: "loremipsum",
        domain: "Bionformatics",
        repo: "https://github.com/pangeo-data/climpred",
      },
      {
        name: "xskillscore",
        description: "loremipsum",
        domain: "Statistical Computing",
        repo: "https://github.com/pangeo-data/climpred",
      },
      {
        name: "xrft",
        description: "Signal Processing",
        domain: "Signal Processing",
        repo: "https://github.com/pangeo-data/climpred",
      },
    ],
    []
  )

  const columns = React.useMemo(
    () => [
      { Header: "Project Name", accessor: "name" },
      { Header: "Description", accessor: "description" },
      { Header: "Domain", accessor: "domain" },
    ],
    []
  )

  return (
    <Container maxW={"full"} mt={10}>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>
          <Button
            rounded={"full"}
            size={"lg"}
            fontWeight={"normal"}
            px={6}
            colorScheme={"red"}
            bg={"red.400"}
            _hover={{ bg: "red.500" }}
          >
            <Link href="https://xarray.pydata.org/en/stable/getting-started-guide/quick-overview.html">
              See More
            </Link>
          </Button>
        </TableCaption>
        <Thead>
          <Tr>
            {columns.map((column, index) => (
              <Th key={index}>{column.Header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {projects
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((project, index) => (
              <Tr key={index}>
                <Td>
                  <Text as="a" href={project.repo}>
                    {project.name}
                  </Text>
                </Td>
                <Td>{project.description}</Td>
                <Td>{project.domain}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Container>
  )
}
