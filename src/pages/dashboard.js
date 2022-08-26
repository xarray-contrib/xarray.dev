import { IssueTracker, ProjectMetrics } from '@/components/dashboard'
import { Layout } from '@/components/Layout'

const DashboardPage = () => {
  return (
    <Layout
      title={'Xarray project statistics'}
      url={'https://xarray.dev/dashboard'}
      description={'Xarray project statistics'}
      card={
        'https://raw.githubusercontent.com/xarray-contrib/xarray.dev/main/public/dataset-diagram-logo.png'
      }
    >
      <ProjectMetrics />
      <IssueTracker />
    </Layout>
  )
}

export default DashboardPage
