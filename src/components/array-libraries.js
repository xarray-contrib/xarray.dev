import {
  Box,
  Circle,
  Flex,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react'
import React from 'react'
import { IoIosGlobe, IoLogoGithub } from 'react-icons/io'

import { Image, Link } from '@/components/mdx'
import { Libraries as data } from '@/data/array-libraries'

const SocialLink = ({ icon, href, label }) => {
  return (
    <Link
      display='inline-flex'
      alignItems='center'
      justifyContent='center'
      rounded='full'
      href={href}
      isExternal
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      <Icon as={icon} fontSize='xl' color='accent' />
    </Link>
  )
}

const Library = ({ name, description, repo, url, logo }) => {
  return (
    <Stack direction='row' spacing={6} align='flex-start'>
      <Circle overflow='hidden'>
        <Flex w={32} h={32} align={'center'} justify={'center'}>
          {' '}
          <Image src={logo} alt={name} />
        </Flex>
      </Circle>
      <Stack spacing={4}>
        <Text fontWeight={'bold'}>{name}</Text>
        <Stack direction={'row'} align='center' spacing={2}>
          <SocialLink
            href={repo}
            icon={IoLogoGithub}
            label={`View ${name}'s Github`}
          />
          {url && (
            <SocialLink
              href={url}
              icon={IoIosGlobe}
              label={`View ${name}'s website`}
            />
          )}
        </Stack>
        <Text fontSize='sm' color='fg-muted'>
          {description}
        </Text>
      </Stack>
    </Stack>
  )
}

export const ArrayLibraries = () => {
  const libraries = React.useMemo(() => data, [])
  return (
    <Box my={8}>
      <Text fontSize={'lg'}>
        Xarray supports multiple array backends, allowing users to choose array
        types that work best for their application.
      </Text>

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={8}
        my={8}
        align={'left'}
      >
        {libraries.map((library, index) => (
          <Library
            key={index}
            name={library.name}
            description={library.description}
            logo={library.logo}
            url={library.url}
            repo={library.repo}
          />
        ))}
      </SimpleGrid>
    </Box>
  )
}
