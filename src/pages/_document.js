import NextDocument, { Html, Head, Main, NextScript } from "next/document"
import { ColorModeScript } from "@chakra-ui/react"
export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Inter&display=optional"
            crossOrigin="anonymous"
          />
          <link
            rel="prefetch"
            href={"https://giscus.app/themes/light.css"}
            as="style"
            type="text/css"
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
