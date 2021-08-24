import { extendTheme } from "@chakra-ui/react"

const config = {
  useSystemColorMode: true,
}

// https://copypalette.app/ can be handy for color palette generation
const colors = {
  white: {
    100: "#F2F2F2",
  },
  gray: {
    100: "#BFBFBF",
    200: "#C5CFDC",
    300: "#6B6B6B",
  },
  dark: "#262626",
  green: {
    400: "#43CEA2",
    500: "#38B19F",
  },
  blue: {
    100: "#3196b3",
  },
  yellow: {
    100: "#F7CC42",
    200: "#F9B52A",
  },
}

const fonts = {
  body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
  heading: "Work Sans, system-ui, sans-serif",
}
const customTheme = extendTheme({
  config,
  colors,
  fonts,
  styles: {
    global: {
      html: {
        scrollBehavior: "smooth",
      },
    },
  },
})

export default customTheme
