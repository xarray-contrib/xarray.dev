import NextDocument, { Html, Head, Main, NextScript } from "next/document"
import Script from "next/script"

import { ColorModeScript } from "@chakra-ui/react"
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
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />

          <Script id="google-analytics" strategy="lazyOnload">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
                `}
          </Script>
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
