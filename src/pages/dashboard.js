import { IssueTracker, ProjectMetrics } from '@/components/dashboard'
import { Layout } from '@/components/layout'

const DashboardPage = () => {
  return (
    <Layout
      title={'Xarray project statistics'}
      url={`/dashboard`}
      description={'Xarray project statistics'}
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
