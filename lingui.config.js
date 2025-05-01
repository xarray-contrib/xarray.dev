const nextConfig = require('./next.config')

console.log('nextConfig', nextConfig)

/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  locales: nextConfig.i18n.locales,
  pseudoLocale: 'pseudo',
  sourceLocale: nextConfig.i18n.defaultLocale,
  fallbackLocales: {
    default: 'en',
  },
  catalogs: [
    {
      path: 'src/locales/{locale}/messages',
      //   path: 'src/locales/{locale}',
      include: ['src/'],
    },
  ],
}
