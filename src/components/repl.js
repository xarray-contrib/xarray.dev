import { AspectRatio, Box, Container, SimpleGrid, Text } from '@chakra-ui/react'

import { Code, Heading } from '@/components/mdx'
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/prism'

//TODO: We could remove xarrray installation step by requesting xarray to be added to the Pyodide standard lib
//TODO: Or wait until jupyterlite has streamlined the installation process of user-specified packages

// See: https://github.com/jupyterlite/jupyterlite/issues/151
const preRunCode = `%23%20Import%20packages%0Aimport%20xarray%20as%20xr%0Aimport%20numpy%20as%20np%0Aimport%20pandas%20as%20pd`

// https://github.com/jobovy/jupyterlite-repl-prerun
const jupyterliteInstance = 'https://jupyterlite.github.io/demo/repl'

const sampleCode = `"""
To try Xarray in the browser,
use the console located 👉 or 👇:
1. Type code in the input cell and press
   Shift + Enter to execute
2. Or copy paste the code, and click on
   the "Run" ▶ button in the toolbar
"""
import xarray as xr
import pandas as pd
import numpy as np

data = xr.DataArray(
    np.random.randn(3, 2, 3),
    dims=("time", "lat", "lon"),
    coords={
        "lat": [10, 20],
        "time": pd.date_range(
            "2020-01", periods=3, freq="MS"
        ),
    },
)

# positional and by integer label, like numpy
data[0, :]

# loc or "location": positional and
# coordinate label, like pandas
data.loc[:, 10]

# isel or "integer select": by dimension name
# and integer label
data.isel(lat=0)

# sel or "select": by dimension name and
# coordinate label
data.sel(time="2020-01")

# Data aggregations uses dimension names
# instead of axis numbers
data.mean(dim=["time", "lat"])

# quick and convenient visualizations
data.isel(lon=0).plot();

# Pretty neat, eh? :)
# For more, head over to the documentation page`

export const Repl = () => {
  return (
    <Box id={'repl'} as='section'>
      <Container maxW='container.lg' centerContent>
        <Heading as='h1' size='2xl'>
          Try Xarray
        </Heading>
        <Text fontSize={'lg'}>
          Try Xarray in a REPL directly in your browser (no installation
          needed)!
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} my={8}>
          <Code
            language='python'
            style={nord}
            showLineNumbers={true}
            wrapLongLines={false}
            //wrapLines
          >
            {sampleCode}
          </Code>

          <AspectRatio ratio={4 / 3}>
            <iframe
              title='repl'
              src={`${jupyterliteInstance}/?toolbar=1&kernel=python&code=${preRunCode}`}
              alt='demo'
            />
          </AspectRatio>
        </SimpleGrid>
      </Container>
    </Box>
  )
}
