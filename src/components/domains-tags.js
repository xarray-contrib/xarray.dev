import { Box, SimpleGrid, Tag, TagLabel } from '@chakra-ui/react'

export const DomainsTags = ({ domains }) => {
  const length = domains.length
  return (
    <SimpleGrid
      my={2}
      spacing={2}
      columns={{
        base: 1,
        md: 1,
        lg: length > 1 ? 2 : 1,
        xl: length > 1 ? 2 : 1,
      }}
      align={'center'}
      justify={'center'}
    >
      {domains.map((domain, key) => {
        return (
          <Box key={key}>
            <Tag
              size={'md'}
              align={'center'}
              justify={'center'}
              borderRadius='full'
              variant='solid'
            >
              <TagLabel>{domain}</TagLabel>
            </Tag>
          </Box>
        )
      })}
    </SimpleGrid>
  )
}
