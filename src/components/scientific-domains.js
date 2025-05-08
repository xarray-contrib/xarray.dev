import { Box, Button, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'

import { Link } from '@/components/mdx'
import { ProjectCard } from '@/components/project-card'
import { getProjects } from '@/data/projects'

import { useLingui } from '@lingui/react/macro'

export const ScientificDomains = () => {
  const { t } = useLingui()
  const Projects = getProjects()
  const projects = React.useMemo(() => Projects, [])
  return (
    <Box my={8}>
      <Text fontSize={'lg'}>
        {t`This section lists some of the standalone packages, projects developed with xarray.`}
      </Text>

      <SimpleGrid
        my={8}
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={8}
        justifyContent={'space-between'}
      >
        {projects
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((project, index) => (
            <ProjectCard
              key={index}
              name={project.name}
              logo={project.logo}
              description={project.description}
              domains={project.domains}
              repo={project.repo}
              homepage={project.homepage}
            ></ProjectCard>
          ))}
      </SimpleGrid>

      <Button
        as={Link}
        useExternalIcon
        href='https://docs.xarray.dev/en/stable/ecosystem.html'
        variant={'outline'}
        colorScheme={'blue'}
      >
        {t`See More`}
      </Button>
    </Box>
  )
}
