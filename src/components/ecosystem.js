import {
  Box,
  Button,
  Container,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'

import { ArrayLibraries } from '@/components/array-libraries'
import { Heading, Link } from '@/components/mdx'
import { ScientificDomains } from '@/components/scientific-domains'
import { IoLogoGithub } from 'react-icons/io5'

import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const GitHubStats = () => {
  const { data, error } = useSWR(
    'https://xarray-datasette.fly.dev/github/_analyze_tables_/stars,user.json?_shape=array',
    fetcher,
  )

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <Stack direction='row' spacing={4} justify='center'>
      <Button
        as={Link}
        href={'https://github.com/pydata/xarray/stargazers'}
        rounded={'full'}
        size={'lg'}
        leftIcon={<IoLogoGithub />}
        variant='outline'
      >
        {data[0].total_rows.toLocaleString(undefined, {
          minimumFractionDigits: 0,
        })}{' '}
        Stars
      </Button>
    </Stack>
  )
}

export const Ecosystem = () => {
  return (
    <Box id={'ecosystem'} as='section'>
      <Container maxW='container.lg' centerContent>
        <Heading as='h1' size='2xl'>
          Ecosystem
        </Heading>
        <Text fontSize={'lg'}>
          Xarray is part of the larger scientific Python ecosystem. It is built
          on top of NumPy, Pandas, and Dask and supports a wide range of domain
          specific scientific applications.
        </Text>

        <Tabs
          my={8}
          align='center'
          variant='enclosed'
          isFitted
          colorScheme='teal'
        >
          <TabList>
            <Tab _selected={{ color: 'white', bg: 'teal.500' }}>
              Scientific Domains
            </Tab>
            <Tab _selected={{ color: 'white', bg: 'teal.500' }}>
              Array Libraries
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ScientificDomains />
            </TabPanel>
            <TabPanel>
              <ArrayLibraries />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  )
}
