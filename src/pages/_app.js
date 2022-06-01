import { ChakraProvider } from "@chakra-ui/react"
import { useEffect } from "react"
import { useRouter } from "next/router"
import Script from "next/script"
import theme from "../theme"
import { MDXComponentsProvider } from "components/mdx"
import * as gtag from "../lib/ga"

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on("routeChangeComplete", handleRouteChange)
    router.events.on("hashChangeComplete", handleRouteChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
      router.events.off("hashChangeComplete", handleRouteChange)
    }
  }, [router.events])

  return (
    <ChakraProvider resetCSS theme={theme}>
      {/* Google Tag Manager - Global base code */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
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
      <MDXComponentsProvider>
        <Component {...pageProps} />
      </MDXComponentsProvider>
    </ChakraProvider>
  )
}

export default MyApp
