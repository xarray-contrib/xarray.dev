import { ChakraProvider } from "@chakra-ui/react"
import { useEffect } from "react"
import { useRouter } from "next/router"
import theme from "../theme"
import { MDXComponentsProvider } from "components/mdx"
import * as ga from "../lib/ga"

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url)
    }
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events])

  return (
    <ChakraProvider resetCSS theme={theme}>
      <MDXComponentsProvider>
        <Component {...pageProps} />
      </MDXComponentsProvider>
    </ChakraProvider>
  )
}

export default MyApp
