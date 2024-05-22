import { Box, Code as ChakraCode } from '@chakra-ui/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { CodeContainer } from './code-container'
import { CopyButton } from './copy-button'

export const Code = ({ className, ...props }) => {
  // extract language from className
  const match = /language-(\w+)/.exec(className || '')

  // check if classname is undefined and length of props.children contains single line
  // if so, render ChakraCode component

  return typeof className === 'undefined' && !props.children.includes('\n') ? (
    <ChakraCode fontSize='sm' {...props} />
  ) : (
    <Box position='relative' zIndex='0'>
      <CodeContainer px='0' overflow='hidden'>
        <SyntaxHighlighter
          language={props.language || (match ? match[1] : null)}
          {...props}
          style={nord}
          wrapLongLines={props.wrapLongLines ? !match : props.wrapLongLines} // enable this once https://github.com/react-syntax-highlighter/react-syntax-highlighter/issues/402 has been fixed
          showLineNumbers={props.showLineNumbers || !!match}
        />
        <CopyButton top='4' right='1' code={props.children} />
      </CodeContainer>
    </Box>
  )
}
