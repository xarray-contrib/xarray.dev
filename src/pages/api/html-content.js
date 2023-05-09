import { readHTMLFile } from '@/lib/read-html-file'

export default async function handler(req, res) {
  const { filePath } = req.query
  try {
    const html = await readHTMLFile(filePath)
    res.status(200).json({ html })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
