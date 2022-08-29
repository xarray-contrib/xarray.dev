import { Alert, useColorMode } from '@chakra-ui/react'

export const Quote = (props) => {
  const { colorMode } = useColorMode()
  const bgColor = {
    light: 'blue.50',
    dark: 'blue.900',
  }

  return (
    <Alert
      mt={4}
      w='98%'
      bg={bgColor[colorMode]}
      variant='left-accent'
      status='info'
      css={{
        '> *:first-of-type': {
          marginTop: 0,
          marginLeft: 8,
        },
      }}
      {...props}
    />
  )
}
