---
title: Javascript Engines Do Too Much
date: 2024-01-19
tags: [Dev]
---

I've been thinking about Javascript engines a lot lately.

They take frankly gross user code with really hard to model semantics and turn
it into something that is somewhat fast and efficient.

I think that Javascript engines do too much. I think it should be up to the user
(or a compiler _hint hint_) to do the heavy lifting (inlining, loop unrolling,
etc).

## Blight

In the language that I'm working on, Blight, I'm trying to make the compiler do
as much work as possible. It should optimize away everything that it can, and
leave AS LITTLE WORK TO DO to the Javascript engine.

NOTE: It's still early days so all of the syntax is subject to change, but I
think it's pretty cool.

### Simple inlining

Let's take a simple example

```typescript
let x: int = 10 * 13 ** 4 + 15;
```

This is a pretty simple expression. It's just a bunch of operators. The compiler
should be able to optimize this down to a single number, and then just emit that
number. So let's run that through blight and see the result:

```javascript
```

Oh, the Blight compiler does dead code elimination. It's not even emitting the
variable declaration. Let's try fixing that:

```typescript
let x: int = 10 * 13 ** 4 + 15;
std.print(x);
```

and that results in:

```javascript
console.log(285625);
```

Here, the compiler has optimized the expression down to a single number and
inlined it into the print statement. Imagine this kind of thing over the scale
of a whole program. It's pretty cool.

### Deep inlining

The Blight compiler is really smart. It can do deep inlining. Let's take a look
at this example involving blocks:

```rust
let x: int = {
    let y: int = 10;
    let z: int = 15;
    y + z
};
```

This would be compiled to:

```javascript
```

Okay I learned nothing from literally the last section. Let's add a print
statement

```javascript
console.log(25);
```

I wanted to point out that it hoists the block up to the top level. Let's try
something else:

```rust
fn add(a: int, b: int) -> int {
    a + b
}

let x: string = {
    if add(10, 15) == 25 {
        "hello"
    } else {
        "world"
    }
};
std.print(x);
```

This would be compiled to:

```javascript
console.log("hello");
```

Okay, bad example. Let's try something else:

```rust
let x: int {
    if std.rand() < 0.5 {
        0
    } else {
        1
    }
};
std.print(x);
```

This gets compiled to:

```javascript
console.log(Math.random() < 0.5 ? 0 : 1);
```

Okay I give up. If I turn off a whole bunch of optimizations, I can get it to
emit the block:

```rust
let x: int = {
    let y: int = 10;
    let z: int = 15;
    y + z
};
```

becomes

```javascript
const y = 10;
const z = 15;
const x = y + z;
```

which makes it a lot more clear. The compiler inlines blocks in the right place,
renames variables, and does a whole bunch of other stuff and makes it work and
makes it work fast.

### Loop unrolling

The Blight compiler can do loop unrolling. Let's take a look at this example:

```rust
for i in 0..5 {
    std.print(i);
}
```

would be compiled to:

```javascript
console.log(0);
console.log(1);
console.log(2);
console.log(3);
console.log(4);
```

I'm still tuning the loop unrolling, but I think it's quite nice so far.

### Hehe funny tricks

Alright, so you may be thinking "this is all well and good, but I honestly don't
think this matters. Javascript engines do this anyways". Well, I'm glad you
pointed that out. Fortunately for me, we're kind of all js engine experts. Let's
see what happens when we run this code through the Blight compiler (after
disabling a bunch of optimizations):

```rust
let (x, y) = (10, 15);
```

this becomes

```javascript
const [x, y] = [10, 15];
```

right? Wrong. It becomes:

```javascript
const x = 10;
const y = 15;
```

OR in the non-inlining case:

```javascript
const { 0: x, 1: y } = [10, 15];
```

What? This is just one trick we are able to do because of deep knowledge of js
engine internals. Pointing this out to one group of friends got this result:

> what the f\*\*k
>
> what is this cursed bullsh\*t
>
> _time passes_
>
> hes right tho

Here's the image this friend posted:

![](/images/performance.webp)

## Conclusion

If any of that was vaguely interesting to you and you want to try it out or join
the beta, you can [join the discord](https://discord.gg/J4AczrGdkj)! I'll be
announcing another round of beta users at some point.

If you're a domain expert, please let me know! I'm not a compiler expert, I'm
just doing this project for fun. I'd love to hear your thoughts on the project
and how I can improve it.
