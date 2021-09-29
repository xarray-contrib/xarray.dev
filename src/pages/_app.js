import { ChakraProvider } from "@chakra-ui/react"
import theme from "../theme"
import Layout from "components/Layout"

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default MyApp
