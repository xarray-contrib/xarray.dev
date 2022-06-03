import React from "react"
import {
  AspectRatio,
  Box,
  Container,
  Text,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { nord } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { Heading, Code } from "components/mdx"

//TODO: We could remove xarrray installation step by requesting xarray to be added to the Pyodide standard lib
//TODO: Or wait until jupyterlite has streamlined the installation process of user-specified packages
// See: https://github.com/jupyterlite/jupyterlite/issues/151
const preRunCode = `%22%22%22%0AThe%20next%20two%20commands%20are%20only%20needed%20on%20this%20webpage%0APlease%20do%20not%20try%20to%20run%20them%20outside%20of%20this%20webpage%2C%20otherwise%20you%20will%20get%20an%20error%0A%22%22%22%0Aimport%20micropip%0Aawait%20micropip.install%28%5B%27xarray%27%5D%29%0A%0A%23%20Import%20packages%0Aimport%20xarray%20as%20xr%0Aimport%20numpy%20as%20np%0Aimport%20pandas%20as%20pd%0A%25matplotlib%20inline`

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

export const ReplSection = () => {
  return (
    <Box id={"repl"}>
      <Container maxW={"6xl"} py={"4"}>
        <Stack spacing={4} as={Container} maxW={"6xl"} textAlign={"center"}>
          <Heading as="h1" size="2xl" my={4}>
            Try Xarray
          </Heading>
          <Text fontSize={"lg"}>
            Try Xarray in a REPL directly in your browser (no installation
            needed)!
          </Text>
        </Stack>
        <SimpleGrid minChildWidth="400px" spacing="40px" mt={10}>
          <Stack>
            <Stack direction="column">
              <Code
                language="python"
                style={nord}
                showLineNumbers={true}
                wrapLongLines={false}
                //wrapLines
              >
                {sampleCode}
              </Code>
            </Stack>
          </Stack>

          <AspectRatio ratio={4 / 3}>
            <iframe
              title="repl"
              src={`https://jupyterlite.github.io/demo/repl/?toolbar=1&kernel=python&code=${preRunCode}`}
              alt="demo"
            />
          </AspectRatio>
        </SimpleGrid>
      </Container>
    </Box>
  )
}
