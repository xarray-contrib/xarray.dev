import { useLingui } from '@lingui/react/macro'

export const getFooterItems = () => {
  const { t } = useLingui()
  let footerItems = {
    xarray: [
      { label: t`Dashboard`, href: '/dashboard' },
      { label: t`Blog`, href: '/blog' },
      { label: t`Team`, href: '/team' },
      {
        label: t`Citing Xarray`,
        href: 'https://docs.xarray.dev/en/stable/getting-started-guide/faq.html#how-should-i-cite-xarray',
      },
      {
        label: t`Roadmap`,
        href: 'https://docs.xarray.dev/en/stable/roadmap.html',
      },
      {
        label: t`Brand Assets`,
        href: 'https://github.com/xarray-contrib/xarray.dev/tree/main/public/Xarray-assets',
      },
    ],

    resources: [
      { label: t`Documentation`, href: 'https://docs.xarray.dev/en/stable/' },
      {
        label: t`Tutorials`,
        href: 'https://docs.xarray.dev/en/stable/tutorials-and-videos.html',
      },
      {
        label: t`Example Gallery`,
        href: 'https://docs.xarray.dev/en/stable/gallery.html',
      },
      {
        label: t`Compatible Projects`,
        href: 'https://github.com/xarray-contrib',
      },
    ],

    community: [
      {
        label: t`Contribute`,
        href: 'https://docs.xarray.dev/en/stable/contributing.html',
      },
      {
        label: t`GitHub Discussions`,
        href: 'https://github.com/pydata/xarray/discussions',
      },
      {
        label: t`Issue Tracker`,
        href: 'https://github.com/pydata/xarray/issues',
      },
      {
        label: t`Stack Overflow`,
        href: 'https://stackoverflow.com/questions/tagged/python-xarray',
      },
      {
        label: t`Mailing List`,
        href: 'https://groups.google.com/forum/#!forum/xarray',
      },
    ],
  }
  return footerItems
}
