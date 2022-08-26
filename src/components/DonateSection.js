import { Box, Button, Center, Container, Stack, Text } from '@chakra-ui/react'

import { Heading, Image, Link } from '@/components/mdx'

import { BiDonateHeart } from 'react-icons/bi'

export const DonateSection = () => {
  return (
    <Box id={'donate'}>
      <Container maxW={'6xl'}>
        <Heading as='h1' size='2xl' my={4} textAlign={'center'}>
          Donate
        </Heading>
        <Stack
          align={'center'}
          py={{ base: 8, md: 8 }}
          direction={{ base: 'column', md: 'row' }}
        >
          <Stack
            flex={1}
            px={10}
            spacing={{ base: 5, md: 10 }}
            justify={'center'}
            align={'center'}
            position={'relative'}
          >
            <Text fontSize={'lg'}>
              Xarray is a Sponsored Project of NumFOCUS, a{' '}
              <Text
                as={Link}
                href={'https://en.wikipedia.org/wiki/501(c)(3)_organization'}
                color={'blue.400'}
              >
                501(c)(3) nonprofit charity
              </Text>{' '}
              in the United States. NumFOCUS provides Xarray with fiscal, legal,
              and administrative support to help ensure the health and
              sustainability of the project. Visit{' '}
              <Text as={Link} href={'https://numfocus.org/'} color={'blue.400'}>
                numfocus.org
              </Text>{' '}
              for more information.
              <br />
              <br />
              If you like Xarray and want to support our mission, please
              consider making a donation to support our efforts.
            </Text>
            <Button
              size={'lg'}
              fontWeight={'normal'}
              px={6}
              colorScheme={'red'}
              bg={'red.400'}
              _hover={{ bg: 'red.500' }}
              rightIcon={<BiDonateHeart />}
            >
              <Link href={'https://numfocus.org/donate-to-xarray'}>Donate</Link>
            </Button>
          </Stack>
          <Stack flex={1} justify={'center'} align={'center'} w={'full'}>
            <Center
              as={Image}
              src={'/NumFOCUS_sponsored_project_logo.svg'}
              alt={'NumFocus logo'}
            ></Center>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
