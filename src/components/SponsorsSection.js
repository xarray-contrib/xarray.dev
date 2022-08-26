import React from 'react'

import {
  Box,
  Container,
  Flex,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import { Heading, Image } from '@/components/mdx'
import { Sponsors } from '@/data/sponsors'

export const SponsorsSection = () => {
  const sponsors = React.useMemo(() => Sponsors, [])

  return (
    <Box id={'sponsors'}>
      <Container maxW={'6xl'} as={Stack}>
        <Stack>
          <Heading as='h1' size='2xl' my={4} textAlign={'center'}>
            Supported By
          </Heading>
          <Text
            color={useColorModeValue('gray.800', 'white')}
            fontSize={'lg'}
            textAlign={'center'}
          >
            We thank these institutions for generously supporting the
            development and maintenance of Xarray.
          </Text>
        </Stack>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={-4}
          align={'center'}
          justify={'center'}
        >
          {sponsors.map((sponsor, index) => (
            <Flex
              key={index}
              w={64}
              h={64}
              align={'center'}
              justify={'center'}
              rounded={'full'}
              mb={1}
            >
              <Image w={36} h={36} src={sponsor.logo} alt={sponsor.name} />
            </Flex>
          ))}
        </Stack>
      </Container>
    </Box>
  )
}
