import fs from 'fs'
import path from 'path'

export function readHTMLFile(filePath) {
    const fullPath = path.join(process.cwd(), filePath)
    const html = fs.readFileSync(fullPath, 'utf8')
    return html
}
