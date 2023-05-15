import { sanitizeHTML } from '@/lib/sanitize-html'
import { Box } from '@chakra-ui/react'
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

  return (
    <Box
      as='section'
      width={'100%'}
      backgroundColor={'rgba(255, 255, 255, 0.9)'} // Add a semi-transparent white background
      padding={'1rem'} // Add some padding around the content
      boxShadow={'0px 4px 6px rgba(0, 0, 0, 0.1)'} // Add a subtle box shadow
      borderRadius={'0.5rem'} // Add rounded corners to the box
      overflow={'auto'} // Add a scrollbar if the content overflows
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Box>
  )
}
