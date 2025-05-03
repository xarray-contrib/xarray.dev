import {
  Box,
  Button,
  Container,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'

import { LanguageSwitcher } from '@/components/language-switcher'

import { Heading, Image, Link } from '@/components/mdx'

import { BiDonateHeart } from 'react-icons/bi'
import { useLingui } from '@lingui/react/macro'

export const Donate = () => {
  const { t } = useLingui()
  return (
    <Box id={'donate'} as='section'>
      <Container maxW='container.lg' centerContent>
        <Heading as='h1' size='2xl'>
          {t`Donate`}
        </Heading>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={8}
          my={8}
          justify={'center'}
          alignItems={'center'}
        >
          <Stack
            flex={1}
            spacing={{ base: 5, md: 10 }}
            justify={'center'}
            align={'center'}
            position={'relative'}
          >
            <Text fontSize={'lg'}>
              {t`Xarray is a NumFOCUS Sponsored Project, a `}
              <Text
                as={Link}
                href={'https://en.wikipedia.org/wiki/501(c)(3)_organization'}
                color={'blue.400'}
                useExternalIcon
              >
                501(c)(3) nonprofit charity
              </Text>{' '}
              {t`in the United States. NumFOCUS provides Xarray with fiscal, legal,
              and administrative support to help ensure the health and
              sustainability of the project. For more information, visit `}
              <Text
                as={Link}
                useExternalIcon
                href={'https://numfocus.org/'}
                color={'blue.400'}
              >
                numfocus.org
              </Text>{' '}
              <br />
              <br />
              {t`If you like Xarray and want to support our mission, please consider making a donation to support our efforts.`}
            </Text>
            <Button
              as={Link}
              fontWeight={'normal'}
              colorScheme={'red'}
              bg={'red.400'}
              _hover={{ bg: 'red.500' }}
              rightIcon={<BiDonateHeart />}
              href={'https://numfocus.org/donate-to-xarray'}
            >
              {t`Donate`}
            </Button>
          </Stack>

          <Image
            src={'/NumFOCUS_sponsored_project_logo.svg'}
            alt={'NumFocus logo'}
          ></Image>
        </SimpleGrid>
      </Container>
    </Box>
  )
}
