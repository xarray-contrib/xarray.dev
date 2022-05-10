import { withOGImage } from "next-api-og-image"
import { Box, Flex, Wrap, WrapItem, Avatar } from "@chakra-ui/react"

export default withOGImage({
  template: {
    react: ({ title, description, authors, date, isBlog = true }) => (
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
          <Box>
            {authors
              ? () => (
                  <Box>
                    <Wrap spacing={2}>
                      {authors.map((author) => {
                        return (
                          <WrapItem key={author}>
                            <Flex
                              align={"center"}
                              mt={1}
                              direction={"column"}
                              key={author}
                            >
                              <Avatar name={author} mb={1} />
                            </Flex>
                          </WrapItem>
                        )
                      })}
                    </Wrap>
                  </Box>
                )
              : null}
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
