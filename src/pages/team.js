import { Layout } from '@/components/layout'
import { Image, Link } from '@/components/mdx'
import { Box, Container, Heading, Text } from '@chakra-ui/react'

const Team = () => {
  return (
    <Layout title={'Xarray Contributors'}>
      <Box as='section' py={20}>
        <Container maxW='container.lg'>
          <Heading as='h1' size='2xl' textAlign={'center'} my={4}>
            Team
          </Heading>
          <Heading as='h2' size='xl' textAlign={'center'} my={4}>
            Our valuable Contributors
          </Heading>
          <Text>
            Xarray is made with love by more than{' '}
            <Link useExternalIcon>370 volunteer contributors</Link>. We
            appreciate all contributions from community to make Xarray thrive.
          </Text>
          <Box
            as={Link}
            href={'https://github.com/pydata/xarray/graphs/contributors'}
          >
            <Image
              my={8}
              src={'https://contrib.rocks/image?repo=pydata/xarray'}
              alt={'Xarray Contributors'}
            />
          </Box>
          <Box py={8}>
            <Heading as='h2' size='xl' textAlign={'center'} my={4}>
              Current core maintainers
            </Heading>
            <Text>
              Xarray core maintainers are responsible for the ongoing
              organizational maintenance and technical direction of the xarray
              project. The current core team comprises:
            </Text>
          </Box>
        </Container>
      </Box>
    </Layout>
  )
}

export default Team
