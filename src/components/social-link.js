import { Link } from '@/components/mdx'
import { Icon, VisuallyHidden } from '@chakra-ui/react'

export const SocialLink = ({ icon, href, label }) => {
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
