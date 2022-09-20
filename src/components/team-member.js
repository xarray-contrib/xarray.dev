import { Image } from '@/components/mdx'
import { SocialLink } from '@/components/social-link'
import { Circle, Flex, Stack, Text } from '@chakra-ui/react'
import { BsBuilding } from 'react-icons/bs'
import { IoIosGlobe, IoLogoGithub, IoLogoTwitter } from 'react-icons/io'
import useSWR from 'swr'

export const TeamMember = ({ member }) => {
  const { data, error, isLoading } = useSWR(
    `https://api.github.com/users/${member.github}`,
    (url) => fetch(url).then((res) => res.json()),
  )

  if (error) return <div>failed to load</div>

  return (
    <Stack direction='row' spacing={6} align='flex-start'>
      <Circle overflow='hidden'>
        <Flex w={32} h={32} align={'center'} justify={'center'}>
          {' '}
          <Image
            src={`https://github.com/${member.github}.png`}
            alt={member.name}
          />
        </Flex>
      </Circle>

      <Stack spacing={4}>
        <Text fontWeight={'bold'}>{member.name}</Text>
        <Stack direction={'row'} align='center' spacing={2}>
          <SocialLink
            href={`https://github.com/${member.github}`}
            icon={IoLogoGithub}
            label={`View ${member.name}'s Github`}
          />

          {data?.blog && (
            <SocialLink
              href={data.blog}
              icon={IoIosGlobe}
              label={`View ${member.name}'s website`}
            />
          )}

          {data?.twitter_username && (
            <SocialLink
              href={`https://twitter.com/${data.twitter_username}`}
              icon={IoLogoTwitter}
              label={`View ${member.name}'s Twitter`}
            />
          )}
        </Stack>
        {data?.bio && (
          <Text fontSize='sm' color='fg-muted' noOfLines={2}>
            {data.bio}
          </Text>
        )}

        {!isLoading && data?.company && (
          <Stack direction={'row'} align='center' spacing={2}>
            <BsBuilding />
            <Text fontSize='sm' color='fg-muted'>
              {data.company}
            </Text>
          </Stack>
        )}
      </Stack>
    </Stack>
  )
}
