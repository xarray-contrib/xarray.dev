export const config = {
  runtime: 'edge',
}

export default async function handler(req, res) {
  const { searchParams } = new URL(req.url)

  const requestURL = searchParams.get('url')

  const headers = {
    Accept: 'application/vnd.github.v3+json',
    //'cache-control': 'public, s-maxage=600, stale-while-revalidate=300',
  }

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`
  }

  const result = await fetch(requestURL, { headers })
  return new Response(result.body, { status: result.status })
}
