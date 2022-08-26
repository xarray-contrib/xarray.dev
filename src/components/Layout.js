import { Banner } from '@/components/banner'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Link } from '@/components/mdx'
import { Container, Text } from '@chakra-ui/react'
import Head from 'next/head'

export const Layout = ({
  title,
  description,
  card,
  children,
  url = 'https://xarray.dev',
  enableBanner = false,
}) => {
  const bannerTitle = ''
  const bannerDescription = ''
  const bannerChildren = (
    <Text fontWeight='medium'>
      <Link href='/href-placeholder'>Text for a future announcement</Link>
    </Text>
  )
  return (
    <>
      <Head>
        <meta content='IE=edge' httpEquiv='X-UA-Compatible' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={card} />
        <meta property='og:url' content={url} />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={description} />
        <meta name='twitter:image' content={card} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@xarray_dev' />
        <link rel='icon' type='image/png' sizes='96x96' href='/favicon.ico' />

        <title>{title}</title>
      </Head>
      <Container
        maxW={'full'}
        maxH={'full'}
        backgroundImage={'/background.svg'}
      >
        <Header />

        <Container maxW={'6xl'} mt={10}>
          {enableBanner && (
            <Banner title={bannerTitle} description={bannerDescription}>
              {bannerChildren}
            </Banner>
          )}
          {children}
        </Container>
        <Footer />
      </Container>
    </>
  )
}

export default Layout
