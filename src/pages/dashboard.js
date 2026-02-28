import { IssueTracker, ProjectMetrics } from '@/components/dashboard'
import { Layout } from '@/components/layout'
import { useLingui } from '@lingui/react/macro'
import { loadCatalog } from '../i18n'

export const getStaticProps = async (ctx) => {
  const translation = await loadCatalog(ctx.locale)
  return {
    props: {
      translation,
    },
  }
}

const DashboardPage = () => {
  const { t } = useLingui()
  return (
    <Layout
      title={t`Xarray project statistics`}
      url={`/dashboard`}
      description={t`Xarray project statistics`}
      card={
        'https://raw.githubusercontent.com/xarray-contrib/xarray.dev/main/public/Xarray-assets/Icon/Xarray_Icon_Final.png'
      }
    >
      <ProjectMetrics />
      <IssueTracker />
    </Layout>
  )
}

export default DashboardPage
