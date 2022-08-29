import { Box, Button, Container, Heading, Stack, Text } from '@chakra-ui/react'

import { Image, Link } from '@/components/mdx'

export const HeroBanner = () => {
  return (
    <Box as='section'>
      <Container maxW='container.lg' py={24} centerContent>
        <Stack
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          justify={'center'}
          direction={{ base: 'column', md: 'row' }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
            >
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: '30%',
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  zIndex: -1,
                }}
              >
                Xarray
              </Text>
              <br />
              <Text as={'span'} color={'red.400'}>
                N-D labeled arrays and datasets in Python
              </Text>
            </Heading>
            <Text fontSize={'lg'}>
              <strong>Xarray</strong> is an open source project and Python
              package that introduces labels in the form of dimensions,
              coordinates, and attributes on top of raw NumPy-like arrays, which
              allows for more intuitive, more concise, and less error-prone user
              experience.
              <br />
              <br />
              Xarray includes a large and growing library of domain-agnostic
              functions for advanced analytics and visualization with these data
              structures.
            </Text>
          </Stack>
          <Stack flex={1} spacing={{ base: 10, md: 20 }}>
            <Image
              src={'/xarray-datastructure.png'}
              alt='xarray data structure'
              objectFit='contain'
            ></Image>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              justify={'center'}
              direction={{ base: 'column', sm: 'row' }}
            >
              <Button
                useExternalIcon
                as={Link}
                variant={'outline'}
                colorScheme={'blue'}
                href='https://docs.xarray.dev/en/stable/getting-started-guide/quick-overview.html'
              >
                Get Started
              </Button>
              <Button
                useExternalIcon
                as={Link}
                variant={'outline'}
                href='https://docs.xarray.dev/en/stable/getting-started-guide/why-xarray.html'
              >
                Why Xarray?
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
