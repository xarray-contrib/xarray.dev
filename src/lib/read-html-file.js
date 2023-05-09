import fs from 'fs'
import path from 'path'

export function readHTMLFile(filePath) {
    const fullPath = path.join(process.cwd(), 'public', filePath)
    // check if file exists
    if (!fs.existsSync(fullPath)) {
        throw new Error(`File not found: ${fullPath}`)
    }
    const html = fs.readFileSync(fullPath, 'utf8')
    return html
}
