import { Box, Container, SimpleGrid } from '@chakra-ui/react'
import { GiDuration } from 'react-icons/gi'

import { TimelinePlotContainer } from '@/components/dashboard/timeline-plot-container'
import { TimeseriesAggStatsCard } from '@/components/dashboard/timeseries-agg-stats-card'
import { Heading } from '@/components/mdx'

export const IssueTracker = () => {
  return (
    <Box as='section' id='issue-tracker'>
      <Container maxW='container.lg'>
        <Heading as='h2' size='xl' textAlign={'center'}>
          Xarray Issue Tracker
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }}>
          {' '}
          <TimeseriesAggStatsCard
            title={'Median time a pull request is open'}
            query={
              'https://xarray-datasette.fly.dev/github.json?_shape=array&&sql=select%0D%0A++id%2C%0D%0A++number%2C%0D%0A++state%2C%0D%0A++created_at%2C%0D%0A++closed_at%2C%0D%0A++julianday%28closed_at%29+-+julianday%28created_at%29+as+age_in_days%0D%0Afrom%0D%0A++issues+as+data%0D%0Awhere%0D%0A++type+%3D+%27pull%27%0D%0A++and+state+%3D+%27closed%27%0D%0Aorder+by%0D%0A++id'
            }
            icon={<GiDuration size={'3em'} />}
          />
          <TimeseriesAggStatsCard
            title={'Median time an issue is open'}
            icon={<GiDuration size={'3em'} />}
            query={
              'https://xarray-datasette.fly.dev/github.json?_shape=array&&sql=select%0D%0A++id%2C%0D%0A++number%2C%0D%0A++state%2C%0D%0A++created_at%2C%0D%0A++closed_at%2C%0D%0A++julianday%28closed_at%29+-+julianday%28created_at%29+as+age_in_days%0D%0Afrom%0D%0A++issues+as+data%0D%0Awhere%0D%0A++type+%3D+%27issue%27%0D%0A++and+state+%3D+%27closed%27%0D%0Aorder+by%0D%0A++id'
            }
          />
        </SimpleGrid>
        <TimelinePlotContainer />
      </Container>
    </Box>
  )
}
