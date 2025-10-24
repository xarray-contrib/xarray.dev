import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

export function Note({ title, children, status = 'info' }) {
  return (
    <Alert status={status} variant='left-accent' my={4}>
      <AlertIcon />
      <div>
        {title && <AlertTitle>{title}</AlertTitle>}
        <AlertDescription>{children}</AlertDescription>
      </div>
    </Alert>
  )
}
