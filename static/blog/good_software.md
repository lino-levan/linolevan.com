---
title: Good Software
date: 2023-11-19
tags: [Life]
---

I am so sick and tired of bad software.

I geniunely could complain about bad software for hours. Why is it the case that
almost all software is awful to use? Why is it always so slow? Why does it
always take so much memory? Why does it always require me to hunt down
documentation? Why does it always require so much mental overhead? Why does it
always seem to do the opposite of what I want it to do?

It doesn't have to be like this. All software doesn't have to be bad. I'd like
to spend some time talking about good software and how I strive to write it.

## Love your user

The prereq to writing any good software is actually caring about your user. This
sounds stupid, but a lot of people fail at this step.

Let's take a few specific examples. My most-starred library is currently
[Astral](https://astral.deno.dev). It's a browser automation library written for
native support in Deno, kind of like Puppeteer / Playwright.

Let's run through the process of launching a browser and taking a screenshot
with Astral. Just run this code in Deno:

```ts
import { launch } from "https://deno.land/x/astral/mod.ts";

const browser = await launch();
const page = await browser.newPage("https://google.com");
await Deno.writeFile("screenshot.png", await page.screenshot());
await browser.close();
```

That's it. There's no `PUPPETEER_PRODUCT`. There's no explicit install step like
`npx playwright install`. It just works (or at least, it should).

When writing software you should, as the interface, "eat the curb" when it comes
to complexity. Making Astral so easy to use is _painful_. With an explicit
install step, you have the advantage of being able to blame the user for "doing
things wrong". Without it, you're forced to deal with edgecases like parallel
downloads and file locks.

All complexity should be hidden at the interface layer.

## Make good guesses

I'm working on a cloud service platform at the moment, built with this
philosophy in mind. One of the services I'm working on implementing is Cron jobs
(ex: "make an http request to this URL on this schedule"). It sounds simple, and
it is.

That being said, there's a lot of thinking that must be done as the interface.
For example: How should users be able to specify the schedule?

There's a few options on how to approach this problem:

1. Allow them to write raw cron strings
2. Allow them to select the timing in some UI
3. Allow them to write text

Each approach has issues:

1. What if the user doesn't know the cron string format?
2. How can I design a UI that is expressive enough to encompass complex
   scheduling but not so expressive to scare a user?
3. What if the user needs more precision than english text will provide?

It seems we're at a roadblock where we need to weigh expressivness with
user-friendliness. Here, I decided to pick 1 & 3. The solution I ended up with
was just a text box, in which users could either type a cron string, or a
description of how often they'd like the schedule to run (ex: "twice a day",
"once a month", "every monday"). Users who want explicit control get their
control, and others just get to write text that human beings understand.

## Avoid relying on "powerful" features

It's too easy to fall into the trap of relying on "powerful" features. A great
example of this is macros in programming languages. Making expressive macros is
trivial:

Let's design a hypothetical language with hyper-expressive macros:

```rust
macro macro_name!(input: String) -> String {
  let output = input;
  // ... some processing ...
  return output; 
}

macro_name!(any text here);
```

This macro system can express anything, though writing macros clearly seems
awful. You'd have to handle all parsing of the input yourself.

Don't rely on features just because they're powerful and "can do anything".
Think. Please.

For Astral, I wrote a script that generates strongly-typed bindings for the
whole Chrome Devtools Protocol. It is an incredibly powerful tool that allows
for full control over chrome or firefox. That being said, it's an awful
interface to expose to every end user. Most of Astral is really just a nice
layer of the CDP. Every time someone comes to me with a specific need for
something, I focus on how I could implement this is the most user-friendly way.

With all that being said, the take away is to avoid RELYING on powerful
features. Sometimes users have really niche usecases which don't make sense to
expose as sensible APIs.

In [Puppeteer](https://pptr.dev/api/puppeteer.cdpsession) or
[Playwright](https://playwright.dev/docs/api/class-cdpsession), if you have
these weird needs, they drop you off in the middle of the desert with no
assistance. You get a "send" and "receive" protocol with no understanding of
what you should send or receive, and no clues on what most methods even do.

With Astral, we expose our internal
["Celestial" bindings](https://deno.land/x/astral@0.3.1/bindings/celestial.ts?s=Celestial),
which are fully typed and JSDoc'd using the `unsafelyGetCelestialBindings()`
API. It's still like throwing someone into a dark cave, but I choose to at least
give them a flashlight.

## Conclusion

Those are my core principles when developing my software.

It's easy for me to sit high up on my chair and say "all software is bad". I
belive that it's true. All software _is_ bad. Even my software is bad.
Especially my software.

BUT, we should at the same time not accept the status quo.
