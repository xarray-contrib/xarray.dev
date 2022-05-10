import { Container } from "@chakra-ui/react"
import { Footer } from "./Footer"
import { Header } from "./Header"
import Head from "next/head"

export const Layout = ({ title, description, card, children }) => {
  return (
    <>
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={card} />
        <meta property="og:url" content="https://xarray.dev" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={card} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon.ico" />

        <title>{title}</title>
      </Head>
      <Container maxW={"full"} maxH={"full"}>
        <Header />
        <Container maxW={"6xl"} mt={10}>
          {children}
        </Container>
        <Footer />
      </Container>
    </>
  )
}

export default Layout
