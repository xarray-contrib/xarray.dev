---
title: Elementum pretium sapien elementum hac nisl montes malesuada purus justo!
date: "2021-02-10"
authors:
  - Ashtoret Awiti
  - Gabriela Đurđa
  - Siarl Be
  - Ryan Abernathey
  - Patrick Allen
  - John Allen
  - Steve Allen
summary: Sit rhoncus justo aenean ullamcorper vulputate consectetur taciti aenean lacinia quam dui bibendum id mus etiam ut at mollis vitae eros himenaeos convallis suspendisse luctus mus nulla felis erat scelerisque!
---

## Scelerisque morbi purus porta nostra ultricies est purus justo per.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu feugiat pretium nibh ipsum consequat. Et ligula ullamcorper malesuada proin libero. Ac feugiat sed lectus vestibulum mattis ullamcorper velit. Lorem mollis aliquam ut porttitor leo a diam sollicitudin. Id aliquet lectus proin nibh nisl condimentum id venenatis. Gravida neque convallis a cras semper auctor neque vitae tempus. Ac felis donec et odio pellentesque diam volutpat commodo sed. Morbi non arcu risus quis varius quam. Tellus id interdum velit laoreet. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar.

Dignissim convallis aenean et tortor. Turpis massa sed elementum tempus egestas sed. Auctor elit sed vulputate mi sit amet mauris. Magna ac placerat vestibulum lectus mauris ultrices eros in. Purus in mollis nunc sed. Viverra vitae congue eu consequat. Quis commodo odio aenean sed adipiscing diam. Pharetra convallis posuere morbi leo. Urna nunc id cursus metus aliquam eleifend mi in. Eu nisl nunc mi ipsum faucibus vitae aliquet. Feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. Malesuada bibendum arcu vitae elementum curabitur. Nisl rhoncus mattis rhoncus urna neque viverra justo nec. Facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum. Id porta nibh venenatis cras sed felis. Nunc sed blandit libero volutpat sed cras. Sit amet commodo nulla facilisi. Bibendum enim facilisis gravida neque convallis a cras semper auctor. Aenean pharetra magna ac placerat vestibulum lectus. In metus vulputate eu scelerisque.

Sed elementum tempus egestas sed sed risus pretium quam vulputate. Non curabitur gravida arcu ac tortor dignissim convallis aenean et. Nullam ac tortor vitae purus faucibus ornare. Libero nunc consequat interdum varius sit amet mattis vulputate. Eget magna fermentum iaculis eu non. Quam quisque id diam vel quam. Tristique nulla aliquet enim tortor at. Iaculis eu non diam phasellus vestibulum. Morbi non arcu risus quis varius quam quisque id diam. Morbi tristique senectus et netus. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat. Varius sit amet mattis vulputate enim nulla. Venenatis urna cursus eget nunc scelerisque viverra. Cursus eget nunc scelerisque viverra mauris in. Etiam dignissim diam quis enim. Blandit cursus risus at ultrices mi tempus imperdiet. Eget nulla facilisi etiam dignissim diam. Odio morbi quis commodo odio aenean. Porttitor eget dolor morbi non arcu risus quis. Ac orci phasellus egestas tellus rutrum tellus pellentesque.

Netus et malesuada fames ac turpis egestas sed. Diam volutpat commodo sed egestas egestas fringilla. Eget nunc scelerisque viverra mauris in aliquam sem. Quisque id diam vel quam elementum pulvinar etiam non. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras. Integer vitae justo eget magna fermentum. Tortor id aliquet lectus proin nibh nisl condimentum id. Id diam maecenas ultricies mi eget mauris pharetra. Tortor condimentum lacinia quis vel eros donec ac. Volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Enim facilisis gravida neque convallis. Pellentesque adipiscing commodo elit at. Mollis aliquam ut porttitor leo a diam sollicitudin tempor id.

Volutpat ac tincidunt vitae semper. Duis convallis convallis tellus id interdum velit. Volutpat est velit egestas dui. Molestie a iaculis at erat pellentesque. Felis imperdiet proin fermentum leo vel. Sollicitudin tempor id eu nisl nunc mi ipsum. Ac placerat vestibulum lectus mauris ultrices eros in cursus turpis. Amet aliquam id diam maecenas ultricies mi eget mauris. Senectus et netus et malesuada fames. Urna nec tincidunt praesent semper feugiat nibh. Pulvinar mattis nunc sed blandit libero volutpat sed. In mollis nunc sed id semper risus. Magna ac placerat vestibulum lectus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat.

**Elit erat elit sapien egestas dui fames nec mollis dui..**

Elit erat elit sapien egestas dui fames nec mollis dui.

_Elit erat elit sapien egestas dui fames nec mollis dui.!_

## Penatibus magnis cum luctus quis hac euismod adipiscing diam sollicitudin!

- Est sed in sapien donec dignissim taciti viverra erat enim.
- Dui, sagittis pellentesque magna primis aptent curabitur commodo nec vehicula.
- Hac feugiat habitant risus ut tincidunt dictum cras molestie etiam.
- Etiam torquent phasellus ullamcorper nullam ultricies mollis ridiculus turpis hendrerit.
- Egestas elementum a, quam felis turpis tortor ligula conubia quam!

_We call "our part of the program", the part where we are in control; and "another part of the program", where the callback "is sent in delegation", a part we can’t control._

Take a look at this:

```javascript
const anotherProgramPart = (cb) => {
  const x = 10
  cb(x)
}

// the code here up is a part of our program meanwhile the part from here down is the other part!

let ourPartofTheProgram
anotherProgramPart(
  /*from here*/ (a) => {
    ourPartofTheProgram = a
  } /*to here*/
)

console.log(ourPartofTheProgram)
```

This is what a callback does.

_It brings us back the variable x from anotherProgramPart!_

Take a look again at this code:

```javascript
const anotherProgramPart = (cb) => {
  const x = 10
  setTimeout(() => {
    cb(x)
  }, 1000)
}

// the code here up is a part of our program meanwhile the part from here down is the other part!

const ourPartofTheProgram = (val) => {
  console.log(val) // 10
}

anotherProgramPart(
  /*from here*/ (a) => {
    ourPartofTheProgram(a)
  } /*to here*/
)
```

## Commodo fringilla egestas donec, penatibus ultricies primis nec tempus tortor.?

Please take a look at the code below:

```javascript
const anotherProgramPart = (value) => {
  return (cb) => {
    setTimeout(() => {
      cb(value)
    }, 1000)
  }
}

// the code here up is a part of our program meanwhile the part from here down is the other part!

const callSomeUtility = (val) => {
  console.log(val) // http://someurl
}

const url = "http://someurl"

/*line 17*/ const ourPartofTheProgram = anotherProgramPart(url)

ourPartofTheProgram((val) => {
  /*line 19*/ callSomeUtility(val)
})
```
