---
title: Transpiling to Javascript
date: 2024-01-18
tags: [Dev]
---

There are way too many languages that transpile to Javascript.

None of them are very good. Let's break down why.

## The Landscape

Right now, there are a lot of languages that transpile to Javascript. Here's a
list of some of them:

- [Typescript](https://www.typescriptlang.org/)
- [Flow](https://flow.org/)
- [CoffeeScript](https://coffeescript.org/) and friends
- [ClojureScript](https://clojurescript.org/)
- [Elm](https://elm-lang.org/)
- [PureScript](https://www.purescript.org/)
- [ReasonML](https://reasonml.github.io/)
- [Rescript](https://rescript-lang.org/)
- [Gleam](https://gleam.run/)

There are also languages that aren't... really designed to transpile to
Javascript, but can:

- [Scala.js](https://www.scala-js.org/)
- [Kotlin/JS](https://kotlinlang.org/docs/js-overview.html)
- [Dart](https://dart.dev/)
- [Haxe](https://haxe.org/)
- [Fable](https://fable.io/)
- [Nim](https://nim-lang.org/)

And just for the sake of completeness (and because I know someone's going to
call me out for not including their favorite language), here is all of them I
could find online: Coco, LiveScript, IcedCoffeeScript, Parsec CoffeeScript,
Contracts.coffee, Uberscript, ToffeeScript, Caffeine, heap.coffee, EmberScript,
BlackCoffee, Storymatic, Civet, NodeScript, Bizubee, Kaffeine, Moescript,
pogoscript, LispyScript, Hot Cocoa Lisp, Sibilant, ki, jisp, Ham, GorillaScript,
RedScript, Daonode, LiteScript, ColaScript, ... just kidding. There are way too
many to list here.

Check out
[this list](https://github.com/jashkenas/coffeescript/wiki/List-of-languages-that-compile-to-JS).

## Usage

Let's try each of the languages in the first list, to get a feel for how they
work. I think a good test is writing fibonacci in each language.

### Typescript

```typescript
function fib(n: number): number {
  if (n == 0) {
    return 0;
  } else if (n == 1) {
    return 1;
  } else {
    return fib(n - 1) + fib(n - 2);
  }
}
```

Typescript is... kind of just the standard nowadays. It gets the job done, and
it's popular because it's literally just javascript++. It doesn't stray _at all_
from javascript, which is both a blessing and a curse. The typescript compiler
is super slow, which is a common theme among these transpilers.

### Flow

```javascript
function fib(n: number): number {
  if (n == 0) {
    return 0;
  } else if (n == 1) {
    return 1;
  } else {
    return fib(n - 1) + fib(n - 2);
  }
}
```

Flow is basically just Typescript, but worse. In this case, it's literally
identical. Wouldn't you know it, the flow compiler is also super slow. Enough
said.

### CoffeeScript

```coffeescript
fib = (n) ->
  if n == 0
    0
  else if n == 1
    1
  else
    fib(n - 1) + fib(n - 2)
```

CoffeeScript is... interesting. The syntax is at least a little bit different
from javascript. Stylistically, it's a lot more like python. I'm not a huge fan.
Bonus points: it's also super slow.

### ClojureScript

```clojure
(defn fib [n]
  (if (= n 0)
    0
    (if (= n 1)
      1
      (+ (fib (- n 1)) (fib (- n 2))))))
```

ClojureScript is... well it's a lot like Clojure. It's a Lisp, so it's got that
going for it.
[I really, truly don't think that Lisp is a good language](https://wiki.c2.com/?WhyWeHateLisp)
period, much less for the web.

### Elm

```elm
fib : Int -> Int
fib n =
  if n == 0 then
    0
  else if n == 1 then
    1
  else
    fib (n - 1) + fib (n - 2)
```

Elm is quite the interesting language. I like that it's opinionated. I don't
really like that it's a functional language. It's unfortunately gone through
[quite a lot of drama](https://lukeplant.me.uk/blog/posts/why-im-leaving-elm/)
over the years, and I don't think it's a good choice in terms of ecosystem.

### PureScript

```purescript
fib :: Int -> Int
fib n =
  if n == 0 then
    0
  else if n == 1 then
    1
  else
    fib (n - 1) + fib (n - 2)
```

Yet another functional language. I don't really have much to say about this one.
It's a lot like Elm, but it's not as opinionated. It's also not as popular. Okay
I guess.

### ReasonML

```reason
let rec fib = (n) =>
  if (n == 0) {
    0;
  } else if (n == 1) {
    1;
  } else {
    fib(n - 1) + fib(n - 2);
  };
```

Ah, the OCAML fans are entering the chat. ReasonML is a lot like OCAML, but it's
got a javascript-like syntax. Kind of a yapfest. It's okay. The syntax is fine I
guess. Not the way I would have done it, but it's not bad.

### Rescript

```rescript
let rec fib = (n: int) =>
  if (n == 0) {
    0;
  } else if (n == 1) {
    1;
  } else {
    fib(n - 1) + fib(n - 2);
  };
```

Finally an interesting language. Fun trivia about Rescript: it used to be called
Bucklescript, and it was a transpiler for OCAML. It's very opinionated, and it's
got a lot of cool features. I like it a lot. It's also pretty fast.

Unfortunately, it has potentially the worst import syntax I have EVER seen. I
don't know how a human being thought this was a good idea:

```rescript
```

That's right. Nothing. To something exported in `School.res`, you have to do
this:

```rescript
let schoolName = School.name
```

??? What? Why? What if I want to have two files with the same name?

Oh and by the way, EVERYTHING is exported by default. Wanted to not do that? Use
a `.resi` file. What's a `.resi` file? GREAT QUESTION!

This language was so close to being good. It's a shame.

### Gleam

```gleam
pub fn fib(n: Int) -> Int {
  if n == 0 {
    0
  } else if n == 1 {
    1
  } else {
    fib(n - 1) + fib(n - 2)
  }
}
```

Gleam is a language that's very similar to Rust. Finally! Syntax that might
actually be good! It's got a lot of cool features, and it's got a lot of
potential. Unfortunately, it's trying to be a polyglot language. It compiles to
javascript, but it also compiles to beam bytecode :(. The focus on concurrency
is unlucky, and the import syntax is kind of mid. It's not as bad as Rescript,
but it's not as good as [ECMAScript](https://tinyclouds.org/trademark).

## Conclusion

I think that transpiling to Javascript is a great idea. It allows you to write
code in a language that's half decent, and run it natively on the web.
Unfortunately, all of the options out there are either unmaintained, too slow,
or just not my cup of tea. I think that if we can fix these problems, we can
make transpiling to Javascript a viable option for web development.

I'm working on my own project to try and fix these problems. It's in early beta,
but the feedback I've gotten so far has been pretty good. It's sort of a mix of
Rust, Zig, and Javascript.

For completeness, here's the fib function in my language:

```rust
fn fib(n: int) -> int {
    match n {
        0 | 1 => n,
        _ => fib(n - 1) + fib(n - 2)
    }
}
```

If you want to join me in this quest, please join the discord of a new project
I'm working on called [Blight](https://discord.gg/J4AczrGdkj). I'd love to get
your feedback on what a good transpiled language should look like.
