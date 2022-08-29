import { Box, Heading as ChakraHeading } from '@chakra-ui/react'

export const Heading = (props) => (
  <ChakraHeading
    css={{
      scrollMarginTop: '100px',
      scrollSnapMargin: '100px',
      '&[id]': {
        pointerEvents: 'none',
      },
      '&[id]:before': {
        display: 'block',
        height: ' 6rem',
        marginTop: '-6rem',
        visibility: 'hidden',
        content: `""`,
      },
      '&[id]:hover a': { opacity: 1 },
    }}
    {...props}
    mb='1em'
    mt='2em'
  >
    <Box pointerEvents='auto'>
      {props.children}
      {props.id && (
        <Box
          aria-label='anchor'
          as='a'
          color='blue.500'
          fontWeight='normal'
          outline='none'
          _focus={{
            opacity: 1,
            boxShadow: 'outline',
          }}
          opacity='0'
          ml='0.375rem'
          href={`#${props.id}`}
        >
          #
        </Box>
      )}
    </Box>
  </ChakraHeading>
)
