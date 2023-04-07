const { execSync } = require('child_process')
const { minify } = require('html-minifier')

const htmlFiles = execSync('git diff --cached --name-only --diff-filter=ACM')
  .toString()
  .trim()
  .split('\n')
  .filter((file) => file.endsWith('.html'))

htmlFiles.forEach((file) => {
  const originalContent = execSync(`git show :${file}`).toString()
  const minifiedContent = minify(originalContent, {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true,
  })

  execSync(`echo '${minifiedContent}' > ${file}`)
  execSync(`git add ${file}`)
})

console.log(`Minified ${htmlFiles.length} HTML file(s)`)
