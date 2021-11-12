import { ChakraProvider } from "@chakra-ui/react"
import theme from "../theme"
import Layout from "components/layout"
import Head from "next/head"

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Head>
        <title>xarray: N-D labeled arrays and datasets in Python</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default MyApp
