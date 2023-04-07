import { sanitizeHTML } from '@/lib/sanitize-html'
import useSWR from 'swr'

async function fetcher(url) {
  const response = await fetch(url)
  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!response.ok) {
    const error = new Error(
      `An error occurred while fetching data from URL: ${url}`,
    )
    // Attach extra info to the error object.
    error.info = await response.json()
    error.status = response.status
    throw error
  }
  const data = await response.json()
  return data.html
}

export const RawHTML = ({ filePath }) => {
  const { data: htmlContent, error } = useSWR(
    `/api/html-content?filePath=${encodeURIComponent(filePath)}`,
    fetcher,
    { dedupingInterval: 60 * 60 * 1000 }, // 1 hour in milliseconds
  )

  if (error) {
    return <div>Error loading content</div>
  }

  if (!htmlContent) {
    return <div>Loading data...</div>
  }

  const html = sanitizeHTML(htmlContent)

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
