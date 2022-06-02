const fs = require("fs")
const glob = require("glob")
const { chromium } = require("playwright")

const { getAllPostsIds } = require("./src/lib/posts")
const cardsDir = "./public/cards/"

glob("./cards/**.png", async (err, files) => {
  const contents = getAllPostsIds()

  if (!fs.existsSync(cardsDir)) {
    fs.mkdirSync(cardsDir)
  }

  for (const post of contents) {
    await getScreenshot(post.params.id)
  }

  process.exit()
})

const baseUrl = process.env.CARDS_BASE_URL || "http://localhost:3000"

async function getScreenshot(postId) {
  const width = 1200
  const height = 630
  const browser = await chromium.launch()
  const context = await browser.newContext({ deviceScaleFactor: 2 })
  const page = await context.newPage()

  await page.setViewportSize({
    width: width,
    height: height,
  })
  await page.goto(`${baseUrl}/cards/${postId}`)

  await page.screenshot({
    path: `${cardsDir}/${postId}.png`,
    fullPage: true,
  })
  await browser.close()
}
