'use client'
import { Select } from '@chakra-ui/react'
import { useLingui } from '@lingui/react/macro'
import { i18n } from '@lingui/core'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export const LanguageSwitcher = () => {
  const { t } = useLingui()
  const router = useRouter()
  const pathname = usePathname()
  const [selectedValue, setSelectedValue] = useState('')

  async function changeLocale(event) {
    const localeString = event.target.value
    setSelectedValue(localeString)
    localStorage.setItem('locale', localeString)
    const catalog = await import(`../locales/${localeString}/messages.js`)
    i18n.load(localeString, catalog.messages)
    i18n.activate(localeString)
    router.push(pathname, { locale: localeString })
  }

  useEffect(() => {
    const storedLocale = localStorage.getItem('locale')
    if (storedLocale && storedLocale !== router.locale) {
      changeLocale({ target: { value: storedLocale } })
    }
  }, [])
  return (
    <Select
      name='selectedLocale'
      variant='flushed'
      size='xs'
      value={selectedValue}
      onChange={changeLocale}
    >
      <option value='en'>{t`English`}</option>
      <option value='es'>{t`Spanish`}</option>
      <option value='pt'>{t`Portuguese`}</option>
    </Select>
  )
}
