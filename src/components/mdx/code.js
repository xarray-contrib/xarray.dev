import React from "react"
import { Stack, Box } from "@chakra-ui/react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { nord } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { CodeContainer } from "./code-container"
import { CopyButton } from "./copy-button"

export const Code = ({ className, ...props }) => {
  const match = /language-(\w+)/.exec(className || "")

  return (
    <Box position="relative" zIndex="0">
      <CodeContainer px="0" overflow="hidden">
        <SyntaxHighlighter
          language={props.language ? props.language : match ? match[1] : null}
          {...props}
          style={nord}
          wrapLongLines={
            props.wrapLongLines ? props.wrapLongLines : match ? false : true
          } // enable this once https://github.com/react-syntax-highlighter/react-syntax-highlighter/issues/402 has been fixed
          showLineNumbers={
            props.showLineNumbers ? props.showLineNumbers : match ? true : false
          }
        />
        <CopyButton top="5" code={props.children} />
      </CodeContainer>
    </Box>
  )
}
