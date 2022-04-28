---
title: Iaculis platea habitasse suscipit lorem et dictum magnis hac nullam
authors: [Gualberto Detta, Juvenal George, Manius Mstislavn]
date: "2021-05-05"
summary: Proin integer vestibulum phasellus facilisi imperdiet quam conubia blandit dapibus!
---

import {Image, Button, Stack} from "@chakra-ui/react"
import { MdBuild , MdCall } from "react-icons/md"

This is my first post!

<hr />

<Image
borderRadius='full'
boxSize='150px'
src="https://www.nasa.gov/sites/default/files/1-bluemarble_west.jpg"
alt="nasa"
/>

Welcome to another awesome blog post!

```js
const hello = "Hello, world!"
var x = 6

if (x > 5) console.log(hello)
```

<div style={{ color: 'red', fontSize: '30px' }}>I am red and big</div>

<Stack direction='row' spacing={4}>
  <Button leftIcon={<MdBuild />} colorScheme='pink' variant='solid'>
    Settings
  </Button>
  <Button rightIcon={<MdCall />} colorScheme='blue' variant='outline'>
    Call us
  </Button>
</Stack>
