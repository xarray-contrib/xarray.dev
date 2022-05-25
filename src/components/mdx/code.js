import React from "react"
import { Stack } from "@chakra-ui/react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { nord } from "react-syntax-highlighter/dist/cjs/styles/prism"

export const Code = ({ className, ...props }) => {
  const match = /language-(\w+)/.exec(className || "")

  return match ? (
    <Stack>
      <SyntaxHighlighter
        language={match[1]}
        PreTag="div"
        {...props}
        style={nord}
        //wrapLongLines={true}
        showLineNumbers={true} // enable this once https://github.com/react-syntax-highlighter/react-syntax-highlighter/issues/402 has been fixed
      />
    </Stack>
  ) : (
    <Stack>
      <SyntaxHighlighter
        PreTag="div"
        {...props}
        style={nord}
        wrapLongLines={true}
      />
    </Stack>
  )
}
