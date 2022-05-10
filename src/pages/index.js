import {
  FeaturesSection,
  HeroBannerSection,
  EcosystemSection,
  SponsorsSection,
  DonateSection,
  ReplSection,
} from "components"

import { Layout } from "components/Layout"

export default function IndexPage() {
  return (
    <Layout title={"Xarray: N-D labeled arrays and datasets in Python"}>
      <HeroBannerSection />
      <FeaturesSection />
      <ReplSection />
      <EcosystemSection />
      <SponsorsSection />
      <DonateSection />
    </Layout>
  )
}
