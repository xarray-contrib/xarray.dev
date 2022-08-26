import {
  DonateSection,
  EcosystemSection,
  FeaturesSection,
  HeroBannerSection,
  ReplSection,
  SponsorsSection,
} from '@/components'

import { Layout } from '@/components/Layout'

export default function IndexPage() {
  return (
    <Layout
      title={'Xarray: N-D labeled arrays and datasets in Python'}
      card={
        'https://raw.githubusercontent.com/xarray-contrib/xarray.dev/main/public/dataset-diagram-logo.png'
      }
    >
      <HeroBannerSection />
      <FeaturesSection />
      <ReplSection />
      <EcosystemSection />
      <SponsorsSection />
      <DonateSection />
    </Layout>
  )
}
