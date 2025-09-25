import { Link } from '@/components/mdx'
import { Flex, Text } from '@chakra-ui/react'
import { IoGitBranchOutline } from 'react-icons/io5'

const sha = process.env.HEAD || ''
const repositoryUrl = process.env.REPOSITORY_URL || ''

// Extract owner and repo from REPOSITORY_URL (format: https://github.com/owner/repo)
const getRepoInfo = (url) => {
  if (!url) return { owner: '', slug: '' }
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+?)(?:\.git)?$/)
  return match ? { owner: match[1], slug: match[2] } : { owner: '', slug: '' }
}

const { owner, slug } = getRepoInfo(repositoryUrl)

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
