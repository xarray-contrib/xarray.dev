import { DatasetteStatsCard } from '@/components/dashboard/datasette-stats-card'
import { StatisticsCard } from '@/components/dashboard/statistics-card'
import { Heading } from '@/components/mdx'
import { fetcher } from '@/lib/data-fetching'
import { Box, Container, SimpleGrid, Spinner } from '@chakra-ui/react'
import { BsPeople, BsPerson } from 'react-icons/bs'
import { GoBook, GoPackage, GoStar, GoTag } from 'react-icons/go'
import { useLingui } from '@lingui/react/macro'
import useSWR from 'swr'

export const ProjectMetrics = () => {
  const { data, error } = useSWR(
    'https://raw.githubusercontent.com/andersy005/xarray-datasette/a73704d803350a2ec059bec1b4cce601cd9efdd9/data/docs-monthly-views.json',
    fetcher,
  )
  const { t } = useLingui()
  if (error) return <div>{t`failed to load data`}</div>
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

  const monthlyViews = data.sort((a, b) => new Date(b.end) - new Date(a.end))[0]

  const dateObj = new Date(monthlyViews.end)
  const month = dateObj.toLocaleString('default', { month: 'short' })
  const year = dateObj.getFullYear()

  return (
    <Box as='section' id='metrics'>
      <Container maxW='container.lg'>
        {' '}
        <Heading as='h2' size='xl' textAlign={'center'}>
          {t`Xarray Project Metrics`}
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatisticsCard
            title={t`Core Maintainers`}
            stat={'15'}
            icon={<BsPerson size={'3em'} />}
            link={'https://docs.xarray.dev/en/stable/team.html'}
          />
          <DatasetteStatsCard
            title={t`Contributors`}
            query={
              'https://xarray-datasette.fly.dev/github/_analyze_tables_/contributors,user_id.json?_shape=array'
            }
            icon={<BsPeople size={'3em'} />}
            link={'https://github.com/pydata/xarray/graphs/contributors'}
          />

          <DatasetteStatsCard
            title={t`Stargazers`}
            icon={<GoStar size={'3em'} />}
            query={
              'https://xarray-datasette.fly.dev/github/_analyze_tables_/stars,user.json?_shape=array'
            }
            link={'https://github.com/pydata/xarray/stargazers'}
          />

          <StatisticsCard
            title={t`Dependent Packages/Repos`}
            stat={21275}
            icon={<GoPackage size={'3em'} />}
            link={'https://github.com/pydata/xarray/network/dependents'}
          />

          <StatisticsCard
            title={t`Docs Visitors` + ` - ${month}/${year}`}
            stat={monthlyViews.users}
            icon={<GoBook size={'3em'} />}
          />

          <DatasetteStatsCard
            title={t`Releases`}
            query={
              'https://xarray-datasette.fly.dev/github/_analyze_tables_/releases,id.json?_shape=array'
            }
            icon={<GoTag size={'3em'} />}
            link={'https://github.com/pydata/xarray/releases'}
          />
        </SimpleGrid>
      </Container>
    </Box>
  )
}
