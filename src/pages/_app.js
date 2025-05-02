import { I18nProvider } from '@lingui/react'
import { i18n } from '@lingui/core'

import * as gtag from '@/lib/ga'
import { customTheme } from '@/theme'
import { ChakraProvider } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useLinguiInit } from '../i18n'
import Script from 'next/script'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  useLinguiInit(pageProps.translation)
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <ChakraProvider resetCSS theme={customTheme}>
        <I18nProvider i18n={i18n}>
          {/* Google Tag Manager - Global base code */}
          <Script
            strategy='afterInteractive'
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
          />
          <Script
            id='gtag-init'
            strategy='afterInteractive'
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
            }}
          />
          <Component {...pageProps} />
        </I18nProvider>
      </ChakraProvider>
    </>
  )
}

export default MyApp
