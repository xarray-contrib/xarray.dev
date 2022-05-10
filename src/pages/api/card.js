import { withOGImage } from "next-api-og-image"
import { Box, Flex } from "@chakra-ui/react"

export default withOGImage({
  template: {
    react: ({ title, description, isBlog = true }) => (
      <Flex
        flexDirection={"row"}
        px={"78px"}
        py={"7"}
        h={"100vh"}
        w={"100vw"}
        justifyContent={"space-between"}
      >
        <Flex flexDirection={"column"} justifyContent={"space-between"}>
          <Box>
            <Box
              letterSpacing={"smallcaps"}
              fontSize={"5"}
              mb={"3"}
              mt={"-10px"}
            >
              {isBlog ? "blog | Xarray" : "Xarray"}
            </Box>
            <Box
              as={"h1"}
              maxW={"800px"}
              fontSize={"70px"}
              mt={["42px", "42px", "42px", "42px"]}
            >
              {title}
            </Box>
          </Box>
        </Flex>
      </Flex>
    ),
  },
  cacheControl: "public, max-age=604800, immutable",
  dev: {
    inspectHtml: false,
  },
})
