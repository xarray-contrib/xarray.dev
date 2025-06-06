import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  Container,
  useDisclosure,
} from '@chakra-ui/react'

export const Banner = ({ title, description, children }) => {
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true })

  return isVisible ? (
    <Box pt={16}>
      {' '}
      {/* This Box provides top padding to clear the header */}
      <Container maxW='container.lg'>
        {' '}
        {/* Constrains the width of the banner */}
        <Alert
          status='info'
          variant='solid'
          alignItems='flex-start' // Align icon nicely with multi-line text
          borderRadius='md' // Added rounded corners
        >
          <AlertIcon />
          <Box flex='1' ml={3}>
            {' '}
            {/* Container for text content, allows vertical flow */}
            <AlertTitle>{title}</AlertTitle>
            {description && (
              <AlertDescription mt={1}>{description}</AlertDescription>
            )}
            <Box mt={2}>
              {' '}
              {/* Wrapper for children, e.g., links */}
              {children}
            </Box>
          </Box>
          <CloseButton
            position='absolute' // Position absolutely within the Alert
            alignSelf='flex-start'
            right='8px' // Adjust as needed
            top='8px' // Adjust as needed
            onClick={onClose}
          />
        </Alert>
      </Container>
    </Box>
  ) : (
    <></>
  )
}
