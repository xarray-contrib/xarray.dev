# Internationalization (i18n)

This site uses [Lingui](https://lingui.dev/) with Next.js for internationalization. Translation catalogs are `.po` files in `src/locales/`.

## Wrapping strings for translation

User-facing strings are wrapped with the `` t` ` `` tagged template from `useLingui()`:

```js
import { useLingui } from '@lingui/react/macro'

const MyComponent = () => {
  const { t } = useLingui()
  return <Text>{t`Hello world`}</Text>
}
```

Strings with dynamic values use interpolation inside the tagged template:

```js
{
  t`${count} items found`
}
```

Avoid concatenating translated fragments — use a single tagged template so translators see the full sentence:

```js
// Bad: translators get disconnected fragments
;`${value} ` + t`hours`

// Good: translators see the full string
t`${value} hours`
```

## Loading catalogs in pages

Any page that uses translated strings (directly or through shared components like Header/Footer) needs to load the translation catalog in `getStaticProps`:

```js
import { loadCatalog } from '../i18n'

export const getStaticProps = async (ctx) => {
  const translation = await loadCatalog(ctx.locale)
  return {
    props: {
      translation,
    },
  }
}
```

Without this, translations will not load when users visit the page directly. Blog posts are an exception — they are not translated and do not need this.

## Adding a new locale

1. Add the locale code to `src/config/i18n.mjs`
2. Run `npx lingui extract` to create the new `.po` file
3. The new locale will be available for translation on Crowdin after merging
