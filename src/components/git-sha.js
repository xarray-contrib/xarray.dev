import { Link } from '@/components/mdx'
import { Flex, Text } from '@chakra-ui/react'
import { IoGitBranchOutline } from 'react-icons/io5'

const sha = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || ''
const owner = process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER || ''
const slug = process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG || ''

export const GitSHA = () => {
  if (!sha || !owner || !slug) {
    return null
  }

  return (
    <Flex
      align='center'
      as={Link}
      href={`https://github.com/${owner}/${slug}/tree/${sha}`}
      fontSize='sm'
    >
      <IoGitBranchOutline />
      <Text ml={1}>{sha.substring(0, 7)}</Text>
    </Flex>
  )
}
