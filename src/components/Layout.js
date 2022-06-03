import { Container, Text } from "@chakra-ui/react"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { Banner } from "./banner"
import { Link } from "./mdx"
import Head from "next/head"

export const Layout = ({
  title,
  description,
  card,
  children,
  url = "https://xarray.dev",
}) => {
  const bannerTitle = ""
  const bannerDescription = ""
  const bannerChildren = (
    <Text fontWeight="medium">
      <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfnMd8UsC1XP1lPuFczl148VfpmwnFu4a0Z94odt1L6U0R0Pw/viewform">
        The 2022 Xarray User Survey is out! Please take ~5 minutes to help
        improve Xarray!
      </Link>
    </Text>
  )
  return (
    <>
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={card} />
        <meta property="og:url" content={url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={card} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@xarray_dev" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon.ico" />

        <title>{title}</title>
      </Head>
      <Container maxW={"full"} maxH={"full"}>
        <Header />

        <Container maxW={"6xl"} mt={10}>
          <Banner title={bannerTitle} description={bannerDescription}>
            {bannerChildren}
          </Banner>
          {children}
        </Container>
        <Footer />
      </Container>
    </>
  )
}

export default Layout
