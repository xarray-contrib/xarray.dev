import { extendTheme } from "@chakra-ui/react"

// https://copypalette.app/ can be handy for color palette generation
const colors = {
  primary: {
    100: "#FFFFFF",
    200: "#FFFFFF",
    300: "#FFFFFF",
    400: "#E3F1F1",
    500: "#BFDFDF",
    600: "#9BCDCD",
    700: "#7CBDBD",
    800: "#61AFAF",
    900: "#509D9D",
  },
}

const customTheme = extendTheme({ colors })

export default customTheme
