import {
  Donate,
  Ecosystem,
  Features,
  HeroBanner,
  Repl,
  Sponsors,
} from '@/components'

import { Layout } from '@/components/layout'

export default function IndexPage() {
  return (
    <Layout
      title={'Xarray: N-D labeled arrays and datasets in Python'}
      card={
        'https://raw.githubusercontent.com/xarray-contrib/xarray.dev/main/public/dataset-diagram-logo.png'
      }
      enableBanner
    >
      <HeroBanner />
      <Features />
      <Repl />
      <Ecosystem />
      <Sponsors />
      <Donate />
    </Layout>
  )
}
