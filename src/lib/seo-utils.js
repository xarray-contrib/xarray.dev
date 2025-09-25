export function getRootURL() {
  let url = 'https://xarray.dev'

  // Use Netlify URL environment variable for deploy previews and branch deploys
  if (process.env.NEXT_PUBLIC_SITE_URL && process.env.CONTEXT !== 'production') {
    url = process.env.NEXT_PUBLIC_SITE_URL
  } else if (process.env.URL && process.env.CONTEXT !== 'production') {
    url = process.env.URL
  }

  return url
}
