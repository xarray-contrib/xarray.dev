import Head from "next/head"
import { Container, Stack } from "@chakra-ui/react"
import { NavBar } from "navbar"
import { HeroBannerSection } from "herobanner"
import { FeaturesSection } from "features"

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>xarray: N-D labeled arrays and datasets in Python</title>
      </Head>
      <Container maxW={"full"}>
        <NavBar />
        <HeroBannerSection />
        <FeaturesSection />
      </Container>
    </>
  )
}
