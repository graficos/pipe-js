# Pipe JS

![Unit Tests](https://github.com/graficos/pipe-js/workflows/Unit%20Tests/badge.svg)

## Installation

```
npm i @graficos/pipe-js
```

## Intro

Pipes are a pattern of function composition. They enable you to do several transformations to a value in 1 step.

You pass a number of functions and a parameter that will be consumed by these functions, so you can make some transformations to this value.

### How are they useful?

For example, let's imagine this scenario, where you're applying the result of a function to another function:

```js
var result = f(g(x))
```

I bet you have seen it multiple times. And something even more scary:

```js
var result = f(g(h(i(j(x))))) // 🤔
```

How are you supposed to read or even debug that? This is where **pipes** are useful:

```js
// The first example would be the same as:
var result = pipe(g, f)(x)

// and the second example:
var result = pipe(j, i, h, g, f)(x)
```

You'll notice that with pipe, we read the transformations left-to-right (which was the same as "from the inside to
the outside" in the initial examples), which **improves the readability**.

Don't be scared about the `(...)(x)` syntax, that's how you call "a function that returns a function", which is what
`pipe` is. It's also called a "Higher Order Function", because you pass functions as parameters.

## How to debug pipes

If you need to see what's happening on each step, you can create what we usually call a `tap` function ("tap", "pipe",
...see the correlation? ;)). Imagine we have the following example:

```js
import { pipe } from '@graficos/pipe-js'

// `formatText` is the combination of other "transformations" applied sequentially.
const formatText = pipe(removeHTMLTags, formatAuthorInfo, addFooterText)

const myFormattedText = formatText(sourceText)
```

We could debug each step with the `tap` function:

```js
import { pipe } from '@graficos/pipe-js'

const tap = (currentValue) => {
  console.log(currentValue)
  return currentValue // remember, all your functions must return the value to be passed to the next function
}

// `formatText` is the combination of other "transformations" applied sequentially.
const formatText = pipe(
  removeHTMLTags,
  tap,
  formatAuthorInfo,
  tap,
  addFooterText
)

const myFormattedText = formatText(sourceText)
console.log({ myFormattedText })
```

## What if my functions are asynchronous?

That's why `pipe-js` comes also with an `asyncPipe` method (tree-shakeable if you don't use it).

Example:

```js
import { asyncPipe } from '@graficos/pipe-js'

const someAsyncFunction = (value) =>
  new Promise((resolve) => resolve(value + 2))
const someOtherAsyncOperation = (value) =>
  new Promise((resolve) => resolve(value * 3))

const result = await asyncPipe(someAsyncFunction, someOtherAsyncOperation)(1) // -> result === 9
```

Just remember that just like `pipe` always returned a function, `asyncPipe` will always return a `Promise`. You, you need to uwrap the value that it'll return with `async`/`await` or using `.then()`.

### About the library

- It's done in JS and using [JSDoc](jsdoc.app/), so you'll have proper autocompletion in your editor.

- You can see some tests to see more examples in [/src](./src) (the `*.spec.js` files).

- You can use it both in the browser and in node, as it is exported as UMD, ESM and CJS.

## Read more about "pipes":

- [A simple explanation of functional pipe in JavaScript ](https://dev.to/benlesh/a-simple-explanation-of-functional-pipe-in-javascript-2hbj) by Ben Lesh
- [What is Function Composition?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-function-composition-20dfb109a1a0) by Eric Elliott
