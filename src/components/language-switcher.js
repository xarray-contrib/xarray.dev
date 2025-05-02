import { Select } from '@chakra-ui/react'
import { useLingui } from '@lingui/react/macro'
import { i18n } from "@lingui/core";
import { useRouter } from 'next/navigation'

export const LanguageSwitcher = () => {
  const { t } = useLingui()

  async function dynamicActivate(event) {
    const locale = event.target.value
    const catalog = await import(`../locales/${locale}/messages.js`)
    i18n.load(locale, catalog.messages);
    i18n.activate(locale);
  }
  return (
    <Select variant='flushed' size='xs' defaultValue="en" onChange={dynamicActivate}>
      <option value='en'>{t`English`}</option>
      <option value='es'>{t`Spanish`}</option>
      <option value='pt'>{t`Portuguese`}</option>
    </Select>
  )
}
