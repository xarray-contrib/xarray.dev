import Head from "next/head"
import { Container, VStack, Stack } from "@chakra-ui/react"
import { NavBar } from "navbar"
import { HeroBanner } from "herobanner"

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>xarray: N-D labeled arrays and datasets in Python</title>
      </Head>
      <Container maxW={"3xl"}>
        <Stack direction="row">
          <NavBar />
          <HeroBanner />
        </Stack>
      </Container>
    </>
  )
}
