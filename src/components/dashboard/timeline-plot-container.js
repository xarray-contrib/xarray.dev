import { TimelinePlot } from '@/components/dashboard/timeline-plot'
import { fetcher } from '@/lib/data-fetching'
import {
  Box,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import * as d3 from 'd3'
import useSWR from 'swr'

export const TimelinePlotContainer = () => {
  const { data, error } = useSWR(
    'https://pydata-datasette.fly.dev/open_pulls_and_issues.json?_shape=array&&sql=select%0D%0A++time%2C%0D%0A++open_issues%2C%0D%0A++open_pull_requests%0D%0Afrom%0D%0A++open_pulls_and_issues%0D%0Awhere%0D%0A++project+%3D+%27pydata%2Fxarray%27%0D%0Aorder+by%0D%0A++time',
    fetcher,
  )

  if (error) return <div>failed to load data</div>
  if (!data)
    return (
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    )

  const start = d3.min(data, (d) => d.time)
  const end = d3.max(data, (d) => d.time)

  return (
    <Box my={8}>
      <Text fontSize={'md'} align={'center'}>
        This is a timeline of how many open issues and pull requests Xarray has
        on Github over time from {new Date(start).toLocaleDateString()} to{' '}
        {new Date(end).toLocaleDateString()}.
      </Text>
      <br />
      <br />
      <Tabs align='center' variant='enclosed' isFitted colorScheme='teal'>
        <TabList>
          <Tab _selected={{ color: 'white', bg: 'teal.500' }}>
            Pull Requests
          </Tab>
          <Tab _selected={{ color: 'white', bg: 'teal.500' }}>Issues</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TimelinePlot
              data={data}
              attr={'open_pull_requests'}
              start={start}
              end={end}
            />
          </TabPanel>
          <TabPanel>
            <TimelinePlot
              data={data}
              attr={'open_issues'}
              start={start}
              end={end}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
