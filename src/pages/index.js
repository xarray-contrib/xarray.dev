import Head from "next/head"
import { Container } from "@chakra-ui/react"
import {
  FeaturesSection,
  HeroBannerSection,
  NavBar,
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
      <Container maxW={"full"}>
        <NavBar />
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
