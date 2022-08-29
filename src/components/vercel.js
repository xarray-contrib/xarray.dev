import { Link } from '@/components/mdx'
import { Box } from '@chakra-ui/react'

export function VercelCallout() {
  return (
    <Box
      my='6'
      fontSize='sm'
      fontWeight='semibold'
      display='inline-block'
      bg='black'
      color='white'
      px='4'
      py='2'
      rounded='lg'
    >
      {' '}
      <Link href='https://vercel.com?utm_source=xarray&utm_campaign=oss'>
        {'Powered by'}{' '}
        <span role='img' aria-label='Vercel logo'>
          ▲
        </span>{' '}
        Vercel
      </Link>
    </Box>
  )
}
