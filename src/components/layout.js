import { Banner } from '@/components/banner'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Link } from '@/components/mdx'
import { Box, Flex } from '@chakra-ui/react'
import Head from 'next/head'

export const Layout = ({
  title,
  description,
  card,
  children,
  url = 'https://xarray.dev',
  enableBanner = false,
  type = 'website',
  imageWidth,
  imageHeight,
  publishedTime,
  authors,
}) => {
  const bannerTitle = 'Check out the latest blog post:'
  // The first link will be the main description for the banner
  const bannerDescription = (
    <Link href='/blog/xarray-napari-plan' fontWeight='medium'>
      {' '}
      {/* Ensure it stands out a bit */}
      Xarray ❤️ napari: A plan for seamless integration
    </Link>
  )
  // The second link will be passed as children, styled to be smaller
  // const bannerChildren = (
  //   <Link
  //     href='https://docs.google.com/forms/d/e/1FAIpQLSeGvTLONF-24V7z2HoACm4MhEr82c2V-VIzA9eqM9-jt-Xh8g/viewform?usp=sharing&ouid=111570313164368772519'
  //     fontSize='sm'
  //   >
  //     {' '}
  //     {/* Add your second link here, smaller font */}
  //     <b>SciPy 2025</b> Click here for info about an Xarray for Bio Sprint!
  //   </Link>
  //)

  // Base URL is set via build command (DEPLOY_PRIME_URL for previews, production URL otherwise)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  // Canonical URL always points to production for SEO
  const canonicalBaseUrl = 'https://xarray.dev'
  const canonicalUrl = url.startsWith('http')
    ? url
    : `${canonicalBaseUrl}${url}`

  // Construct the full card URL
  const fullCardUrl = card.startsWith('http') ? card : `${baseUrl}${card}`
  // Construct the full URL for og:url (uses preview URL in previews, production in prod)
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`

  return (
    <>
      <Head>
        <meta content='IE=edge' httpEquiv='X-UA-Compatible' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={fullCardUrl} />
        {imageWidth && <meta property='og:image:width' content={imageWidth} />}
        {imageHeight && (
          <meta property='og:image:height' content={imageHeight} />
        )}
        <meta property='og:url' content={fullUrl} />
        <meta property='og:type' content={type} />
        {type === 'article' && publishedTime && (
          <meta property='article:published_time' content={publishedTime} />
        )}
        {type === 'article' &&
          authors &&
          authors.map((author) => (
            <meta
              key={author.github}
              property='article:author'
              content={`https://github.com/${author.github}`}
            />
          ))}
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={description} />
        <meta name='twitter:image' content={fullCardUrl} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@xarray_dev' />
        <link rel='canonical' href={canonicalUrl} />
        <link
          rel='icon'
          type='image/png'
          sizes='96x96'
          href='/Xarray-assets/Icon/Xarray_Icon_final.svg'
        />
        <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
        <link rel='icon' type='image/png' href='/favicon.png' />

        <title>{title}</title>
      </Head>
      <Flex
        direction={'column'}
        justify={'space-between'}
        gap={0}
        minHeight={'100vh'}
      >
        <Box>
          <Header />
          {enableBanner && (
            <Banner title={bannerTitle} description={bannerDescription}>
              {/* {bannerChildren} */}
            </Banner>
          )}
          {children}
        </Box>

        <Footer />
      </Flex>
    </>
  )
}

export default Layout
