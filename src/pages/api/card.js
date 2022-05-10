import { withOGImage } from "next-api-og-image"
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  Image,
} from "@chakra-ui/react"

export default withOGImage({
  template: {
    react: ({ title, description }) => (
      <Center py={6}>
        <Box
          maxW={"445px"}
          w={"full"}
          oxShadow={"2xl"}
          rounded={"md"}
          p={6}
          overflow={"hidden"}
        >
          <Box
            h={"210px"}
            bg={"gray.100"}
            mt={-6}
            mx={-6}
            mb={6}
            pos={"relative"}
          >
            {" "}
            <Image
              src={
                "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              }
              layout={"fill"}
              alt={title}
            />
          </Box>
        </Box>
      </Center>
    ),
  },
  cacheControl: "public, max-age=604800, immutable",
  dev: {
    inspectHtml: false,
  },
})
