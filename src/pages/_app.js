import { ChakraProvider } from "@chakra-ui/react"
import theme from "../theme"
import MDXComponentsProvider from "components/MDXComponentsProvider"

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <MDXComponentsProvider>
        <Component {...pageProps} />
      </MDXComponentsProvider>
    </ChakraProvider>
  )
}

export default MyApp
