import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

import { ColorModeScript } from '@chakra-ui/react'
export default class Document extends NextDocument {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link
            rel='prefetch'
            href={'https://giscus.app/themes/light.css'}
            as='style'
            type='text/css'
            crossOrigin='anonymous'
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
