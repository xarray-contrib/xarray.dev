import { sanitizeHTML } from '@/lib/sanitize-html'
import useSWR from 'swr'

async function fetcher(url) {
  const response = await fetch(url)
  const data = await response.json()
  return data.html
}

export const RawHTML = ({ filePath }) => {
  const { data: htmlContent, error } = useSWR(
    `/api/html-content?filePath=${encodeURIComponent(filePath)}`,
    fetcher,
  )
  if (error) {
    return <div>Error loading content</div>
  }
  if (!htmlContent) {
    return <div>Loading...</div>
  }

  const html = sanitizeHTML(htmlContent)

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
