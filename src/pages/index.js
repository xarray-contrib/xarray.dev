import Head from "next/head"
import { Container, useColorModeValue } from "@chakra-ui/react"
import {
  Header,
  FeaturesSection,
  HeroBannerSection,
  EcosystemSection,
  SponsorsSection,
  DonateSection,
  Footer,
} from "components"

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>xarray: N-D labeled arrays and datasets in Python</title>
      </Head>
      <Container maxW={"full"} maxH={"full"}>
        <Header />
        <HeroBannerSection />
        <FeaturesSection />
        <EcosystemSection />
        <SponsorsSection />
        <DonateSection />
        <Footer />
      </Container>
    </>
  )
}
