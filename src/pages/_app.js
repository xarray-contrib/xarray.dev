import { ChakraProvider } from "@chakra-ui/react"
import { useEffect } from "react"
import { useRouter } from "next/router"
import Script from "next/script"
import theme from "../theme"
import { MDXComponentsProvider } from "components/mdx"
import { GTM_ID, pageview } from "../lib/gtm"

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    router.events.on("routeChangeComplete", pageview)
    return () => {
      router.events.off("routeChangeComplete", pageview)
    }
  }, [router.events])

  return (
    <ChakraProvider resetCSS theme={theme}>
      {/* Google Tag Manager - Global base code */}
      <Script
        id="gtag-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GTM_ID}');
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
