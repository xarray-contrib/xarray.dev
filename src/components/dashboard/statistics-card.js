import {
  Box,
  Flex,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

export const StatisticsCard = ({ title, stat, icon, diff, link }) => {
  let diffElement
  if (diff) {
    let color
    if (diff.type === 'increase') {
      color = 'red.500'
    } else {
      color = 'green.500'
    }
    diffElement = (
      <StatHelpText>
        <StatArrow type={diff.type} color={color} />
        {diff.value}
      </StatHelpText>
    )
  } else {
    diffElement = <Text>{''}</Text>
  }
  return (
    <StatGroup>
      <Stat
        as={'a'}
        href={link || null}
        px={{ base: 2, md: 4 }}
        py={'5'}
        shadow={'xl'}
        border={'1px solid'}
        borderColor={useColorModeValue('gray.800', 'gray.500')}
        rounded={'lg'}
      >
        <Flex justifyContent={'space-between'}>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={'medium'}>{title}</StatLabel>
            <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
              {stat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </StatNumber>
            {diffElement}
          </Box>
          <Box
            my={'auto'}
            color={useColorModeValue('gray.800', 'gray.200')}
            alignContent={'center'}
          >
            {icon}
          </Box>
        </Flex>
      </Stat>
    </StatGroup>
  )
}
