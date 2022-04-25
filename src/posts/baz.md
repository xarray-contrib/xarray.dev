export const meta = {
title: 'How to parse (read) JavaScript code into your mind in order to understand what is going on!',
date: '2021-02-10',
authors: ['Foo Bar'],
summary: 'Another awesome post! This is the summary of our blog post! This is the summary of our blog post! This is the summary of our blog post!'
}

## I will show you how to read JavaScript code with the JavaScript engine’s eye, with the help of a piece of code that uses closures and callbacks to flatten the factor time in an asynchronous pattern!

## I am a professional JavaScript developer.

I work mainly with React and Node.

But as I discovered over the time, having bits of JavaScript knowledge missing is going to turn out in major flaws in my React applications also!

Then I run as fast as I can to fill those bits of knowledge missing!

Don’t get me wrong, I learned JavaScript before starting with React.

I knew enough JavaScript to learn React at some point in my career path.

But as many senior developers out there will agree with me, I hope, we never know enough JavaScript.

There is something to learn every time, every single day.

Some of us, just stop to learn when they get a job.

From my point of view, I want to be able to do my job well.

I know I had this piece of knowledge missing, even though I am already using React in a professional manner.

Therefor I keep on learning every day.

I repass somehow, even basic concepts like callbacks or asynchronus code sometimes!

One major issue for me when learning JavaScript, but I think for many as well, is how am I able to parse the code as JavaScript engine does.

This because parsing the code into my mind is the only way I have to follow what is going on with it.

**Nobody teaches you how to parse the code.**

Everyone teaches you how to code, but not how to read it.

_That’s something you learn alone at your peace, in time!_

As a matter of fact, is much harder to read the code in a logical way, as JavaScript engine does, than writing it.

**Especially if the factor time kicks in as well!**

When we write our code, we are focused on what we are writing at that moment in time, on that line of code.

We don’t know and don’t need to know what is going on with the entire program when we write each line of code.

But when reading it, we need to know what every line of code of an entire program does.

Otherwise, we can’t understand what will be the output of that program!

## I will show you my way of “parsing” a program to understand what it does.

Please note that, when I am saying a program here what I mean is a file, maybe only a function or an assembly of functions which together have the scope to create an output!

Let see if I can make you reason as I do!

## What are callbacks and what are they used for in JavaScript?

Callbacks are a pattern trough which we can “delegate” a function to bring us back some data from another part of our program.

Program that may not be running in the same thread with the part of our program where we need that data!

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

Beginning with: “from here - to here” marked in the code, we have a function declaration.

Which we then pass to anotherProgramPart function as cb when we call that function.

Inside anotherProgramPart function we call that cb - which is the same function marked with from here - to here, and pass it a value "x" which is equal to 10.

That value is the variable "a" in our function declaration, which we assign to an extern variable outPartofTheProgram.

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

This is the same code as above with a difference: we now wait for 1 second before calling cb function!

When we call the cb function after 1 second this executes and bring us back the "x" variable with its value of 10!

**But now something interesting is going on here!**

We can no longer assign an extern variable (ourPartOfTheProgarm) to be the value returned of "x" (the variable "a").

_I remeber how in my beginnigs as a devolper, I tried hard to pass a value coming from an asyncrounous function into the global scope! LOL!_

By the way, "a" and "x" is the same variable!

When we call "cb(x)", x is an argument passed to cb function declaration which takes it as an argument "a"!

Because now our code is asynchronous, an outside variable declaration, like it was: "let ourPartOfTheProgram;", won’t work anymore!

This because JavaScript engine has already “consumed” the let ourPartOfTheProgram variable and it was undefined by the time JavaScript engine consumed it.

So that variable gets garbage collected and will no longer be available by the time the "x" value arrives.

**Therefor ourPartOfTheProgram can’t be reassign!**

We have to make it a function which will be also called when the "x" value is available at the site-call of the anotheProgramPart function!

In this way we will have access to the value of "x" inside out new ourPartOfTheProgram function!

## That is in essence asynchronicity!

_Getting a value that arrives from some part of program which we do not control and which is set later inside the part of code we control!_

Please note that in this example we wrote the anotheProgramPart function so it looks like we control it.

But in a real-world scenario that function will be most probably an API call and the "x" value will be the data arriving from some back-end.

_Now we can understand why we can’t control that part of the code!_

All we can do is sit here and wait for our cb to get called with the "x" value for us, and bring back that value in the part of the program which we control!

**That will happen at an unknown (for us) time!**

## The way I read this code is like this:

I see the anotherProgramPart function declaration and I look what it does roughly at a first glance!

I see it takes a callback which is called when a variable "x" is ready!

Then I look where anoterProgramPart function is called.

I already know that at the site-call, the anotherProgramPart called function will take a parameter which will be a function!

That function will execute when I call cb inside anotherProgramPart function declaration!

Then I will look at what that parameter function does inside the call-site of the anotherProgramPart function.

I see it calls an external function, ourPartofTheProgram function with the value of "x", when "x" will arrive inside the site-call!

_This is hard as I was saying!_

And here we have a very banal and simple code example!

This “reading” will be much harder when we will have to look to some very complex code sample with a lot going on!

It is a process which requires time and a lot of practice!

In time we will see how we are more able, day by day, to “read” the code!

That’s way there is so much talk about “clean code”, or “readability”.

Because a human mind, yourself or others, will have to, at a certain point in time, read that code and “parse” it as the JavaScript engine does!

## So, what if we have a closure with a callback? What happens then?

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

In the code above the **"http://someurl"** is our value.

Let’s say it is an url that an API needs to make the call!

In this case we fake that with the setTimeout with 1 second delay!

**But here we introduce something new: a closure!**

Now the value in anoterProgramParte function becomes a closure value.

It is preserved in time over the anotherProgramPart function return.

If you want to learn more about the closures, [I wrote an article about them!](https://bogdan.digital/aprile-2021/clousers/clousers)

## Let’s try to parse (read) this code in our mind!

We see first the closure.

Now the anotherProgramPart returns a function.

The returning function closes over the value variable.

We move forward where the anotherProgramPart is called on line number 17 (image above)

Here we pass to the anotherProgramPart function (which is the closure wrapper function also), a value string which is an url example (just to mimic an API call).

On line 17 the anotherProgramFunction executes and sets the value argument to the url variable and returns a function which we name ourPartofTheProgram.

We have to look now where we call the ourPartofTheProgram function to see what happens next!

That is on line 19.

The ourPartOfTheProgram takes as argument a function which we pass to the enclosing function declaration in anotherProgramPart.

Please make sure you understand that, the function took as argument when calling the ourPartOfTheProgram function is the same function declared in anotherProgramPart returning statement named cb!

The returning function from anotherProgramPart is the ourPartOfTheProgram unction itself, but the argument is the cb function!

Try to wrap your head around that! (It was hard for me so I guess is hard for you too!).

So, when we call ourPartOfTheProgram function, we get back what is given to us by the returning function statement in anotheProgramPart enclosing function.

Which is another function named cb!

So, the function ourPartofTheProgram took as argument at the call-site another function named cb!

We call the cb in anotherProgramPart returning function with the value and that gives us back the value to the call-site of the returning function!

Now we pass further that value to someUtility function which can do something with it!

If you don’t get it first, re-read it and try to understand it!

**Callbacks are a core concept in JavaScript!**

Next, I will make a video, as good as I can because I am not a content maker, where I will take a piece of code from Kyle Simpson “Rethinking Asynchronous Programming” course, and try to explain live how I parse (read) it for you!

The piece of code you’ll see was kind of challenging for me to understand, but once I did was like something clicking for me with an “AHAH” moment!

After I understood this pattern, I could much easily understand Promises and asynchronous programming!

I hope you do understand them too!

![CallBacks](youtube-callbacks.png)(https://youtu.be/uY5Ut4iZXIs)

[Github repository](https://github.com/bogadrian/callbacks) for the code in the video!
