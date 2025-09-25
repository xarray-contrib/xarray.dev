import { Link } from '@/components/mdx'
import { Box } from '@chakra-ui/react'

export function NetlifyCallout() {
  return (
    <a href='https://www.netlify.com'>
      <img
        src='https://www.netlify.com/assets/badges/netlify-badge-color-bg.svg'
        alt='Deploys by Netlify'
      />
    </a>
  )
}
