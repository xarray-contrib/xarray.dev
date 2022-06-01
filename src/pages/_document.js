import NextDocument, { Html, Head, Main, NextScript } from "next/document"

import { ColorModeScript } from "@chakra-ui/react"
import { GTM_ID } from "../lib/ga"
export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
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
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
