#!/usr/bin/env node

const { spawnSync } = require('child_process')
const fs = require('fs')

const gitDiffOutput = spawnSync('git', [
  'diff',
  '--cached',
  '--name-only',
  '--diff-filter=ACM',
])
const htmlFiles = gitDiffOutput.stdout
  .toString()
  .trim()
  .split('\n')
  .filter((file) => file.endsWith('.html'))

htmlFiles.forEach((file) => {
  const gitShowOutput = spawnSync('git', ['show', `:${file}`])
  const originalContent = gitShowOutput.stdout.toString()
  const compressedContent = originalContent.replace(/\r?\n|\r/g, '')

  try {
    fs.writeFileSync(file, compressedContent)
    const gitAddOutput = spawnSync('git', ['add', file])

    if (gitAddOutput.error) {
      console.error(`Error adding ${file} to git:`, gitAddOutput.error)
    }
  } catch (error) {
    console.error(`Error writing compressed content to ${file}:`, error)
  }
})

console.log(`Compressed ${htmlFiles.length} HTML file(s) into single lines`)
