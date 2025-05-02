import { useLingui } from '@lingui/react/macro'

export function getMenuItems() {
  const { t } = useLingui()
  let menuItems = [
    { label: t`Features`, href: '/#features' },
    { label: t`Try`, href: '/#repl' },
    { label: t`Ecosystem`, href: '/#ecosystem' },
    { label: t`Sponsors`, href: '/#sponsors' },
    { label: t`Donate`, href: '/#donate' },
    { label: t`Blog`, href: '/blog' },
    { label: t`Documentation`, href: 'https://docs.xarray.dev' },
  ]
  return menuItems
}
