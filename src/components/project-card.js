import { DomainsTags } from '@/components/domains-tags'
import { Image, Link } from '@/components/mdx'
import { Box, LinkBox, LinkOverlay, Stack, Text } from '@chakra-ui/react'

export const ProjectCard = ({
  name,
  description,
  domains,
  repo,
  homepage,
  logo,
}) => {
  return (
    <LinkBox
      p={4}
      rounded='lg'
      transitionProperty='all'
      transitionDuration='slower'
      transitionTimingFunction='ease-out'
      bg='gray.50'
      _dark={{ bg: 'gray.700' }}
      _hover={{
        transform: 'scale(1.025)',
        boxShadow: 'md',
      }}
    >
      <Stack spacing={2} direction={'column'} justify={'space-between'} gap={0}>
        <LinkOverlay
          href={repo || homepage}
          as={Link}
          _hover={{
            textDecoration: 'none',
          }}
          justify={'left'}
        >
          <Box>
            <Image
              h={'55'}
              w={'full'}
              src={logo}
              alt={name}
              layout='fill'
              objectFit='contain'
            />

            <Text my={4} noOfLines={2}>
              {description}
            </Text>
          </Box>

          <Box>
            <DomainsTags domains={domains} />
          </Box>
        </LinkOverlay>
      </Stack>
    </LinkBox>
  )
}
