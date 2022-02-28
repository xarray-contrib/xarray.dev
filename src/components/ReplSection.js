import React from "react"
import {
  AspectRatio,
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism"

//TODO: We could remove xarrray installation step by requesting xarray to be added to the Pyodide standard lib
//TODO: Or wait until jupyterlite has streamlined the installation process of user-specified packages
// See: https://github.com/jupyterlite/jupyterlite/issues/151
const preRunCode = `import%20micropip%0Aawait%20micropip.install%28%5B%27xarray%27%5D%29%0Aimport%20xarray%20as%20xr%0Aimport%20numpy%20as%20np%0Aimport%20pandas%20as%20pd`

const sampleCode = `"""
To try the examples in the browser,
use the console 👉 or 👇:
1. Type code in the input cell and press
   Shift + Enter to execute
2. Or copy paste the code, and click on
   the "Run" button in the toolbar
""".
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

# isel or "integer select":  by dimension name
# and integer label
data.isel(lat=0)

# sel or "select": by dimension name and
# coordinate label
data.sel(time="2020-01")

# Data aggregations uses dimension names
# instead of axis numbers
data.mean(dim="time")

# quick and convenient visualizations
data.isel(lon=0).plot()

# Pretty neat, eh? :)
# For more, head over to the documentation page`

export const ReplSection = () => {
  return (
    <Box>
      <Container maxW={"6xl"} py={"4"}>
        <Stack spacing={4} as={Container} maxW={"6xl"} textAlign={"center"}>
          <Heading textAlign={"center"} fontSize={"5xl"}>
            Try Xarray
          </Heading>
          <Text fontSize={"lg"}>
            Try Xarray in a REPL directly in your browser(no installation
            needed)!
          </Text>
        </Stack>
        <SimpleGrid minChildWidth="400px" spacing="40px" mt={10}>
          <Stack>
            <Stack direction="column">
              <SyntaxHighlighter
                language="python"
                style={a11yDark}
                showLineNumbers
                wrapLongLines={false}
              >
                {sampleCode}
              </SyntaxHighlighter>
            </Stack>
          </Stack>

          <AspectRatio ratio={4 / 3}>
            <iframe
              src={`https://jupyterlite.github.io/demo/repl/?toolbar=1&kernel=python&code=${preRunCode}`}
              alt="demo"
            />
          </AspectRatio>
        </SimpleGrid>
      </Container>
    </Box>
  )
}
