import {
  Donate,
  Ecosystem,
  Features,
  HeroBanner,
  Repl,
  Sponsors,
} from '@/components'

import { useLingui } from '@lingui/react/macro'

import { Layout } from '@/components/layout'

import { loadCatalog } from '../i18n'

export const getStaticProps = async (ctx) => {
  const translation = await loadCatalog(ctx.locale)
  return {
    props: {
      translation,
    },
  }
}
export default function IndexPage() {
  const { t } = useLingui()
  return (
    <Layout
      url={`/`}
      title={'Xarray: N-D labeled arrays and datasets in Python'}
      card={
        'https://raw.githubusercontent.com/xarray-contrib/xarray.dev/main/public/Xarray-assets/Icon/Xarray_Icon_Final.png'
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
