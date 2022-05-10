import { withOGImage } from "next-api-og-image"

export default withOGImage({
  template: {
    react: ({ myQueryParam }) => <div>🔥 {myQueryParam}</div>,
  },
  cacheControl: "public, max-age=604800, immutable",
  dev: {
    inspectHtml: false,
  },
})
