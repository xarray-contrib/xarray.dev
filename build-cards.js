const fs = require('fs')
const { chromium, devices } = require('playwright')

const { getAllPostsIds } = require('./src/lib/posts')
const cardsDir = './public/cards/'

async function main() {
  const contents = getAllPostsIds()

  if (!fs.existsSync(cardsDir)) {
    fs.mkdirSync(cardsDir)
  }

  for (const post of contents) {
    await getScreenshot(post.params.id)
  }

  process.exit()
}

const baseUrl = process.env.CARDS_BASE_URL || 'http://localhost:3000'
const device = devices['Desktop Safari']

async function getScreenshot(postId) {
  const browser = await chromium.launch()
  const context = await browser.newContext({ ...device, deviceScaleFactor: 2 })
  const page = await context.newPage()

  await page.goto(`${baseUrl}/cards/${postId}`)
  await page.waitForTimeout(2000) // wait for page to load fully (2 seconds). This is a hacky way to wait for GitHub Avatars to fully load.

  await page.screenshot({
    path: `${cardsDir}/${postId}.png`,
    fullPage: true,
  })
  await browser.close()
}

main()
