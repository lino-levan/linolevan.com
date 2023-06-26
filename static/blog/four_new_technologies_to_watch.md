---
title: Four New(ish) Technologies to Watch
date: 2022-03-25
tags: [Dev]
---

I'm not going to clickbait you. If you just want to know what technologies I'll
be talking about, it's just:

- Tauri: [https://tauri.studio/](https://tauri.studio/)
- Deno: [https://deno.land/](https://deno.land/)
- AlephJS: [https://alephjs.org/](https://alephjs.org/)
- Oak: [https://github.com/oakserver/oak/](https://github.com/oakserver/oak/)

Let's look at each of these individually. I am going to do the more exciting
ones first and then move on to the things I am less confident about.

## Tauri

Tauri is something I've been waiting for, for a while.

According to their website, they are a way to

> Build smaller, faster, and more secure desktop applications with a web
> frontend

![](/images/tauri.png)

Essentially, Tauri is a way to build "native" applications using a web frontend.
What's the difference between this and Electron? There are three big ones:

1. It's a lot more disk efficient because it doesn't bundle in a whole chromium
   environment
2. It's a lot more memory efficient because it doesn't bundle in a whole
   chromium environment
3. It'll eventually run on mobile devices

According to
[this article](https://medium.com/geekculture/the-end-of-electron-is-near-310467d6415)
from January, it's up to 44x more space efficient and up to 2x more memory
efficient!

The article is a lot more optimistic on the takeover of Tauri, but I think it's
a lot more reasonable to believe that it will mostly be relevant for big
enterprise. Tauri brings the promise of true multiplatform apps (like Flutter)
with a Javascript and Rust back-end. Deno support is coming soon... but what is
Deno?

## Deno

Deno is also a web developer's dream. Before I get too much into the advantages,
let me explain the dream. Imagine a world where you could run typescript
natively. A world where security issues would not end with customer data being
stolen. A world where `package.json` files are obsolete and bundlers like
webpack and rollup aren't needed anymore.

That's the promise of Deno.

![](/images/deno.png)

For a little backstory, Deno was announced at a talk by Ryan Dahl (the creator
of a small project called `node.js`) in which he described the 10 biggest
regrets he had with how he originally made node. It was essentially Dahl's
attempt at fixing all of the mistakes he made originally with node by starting
fresh. Originally written in Go, and eventually rewritten finally in Rust, Deno
1.0 released in May, 2020. There has been 20 major revisions since then and the
audience has grown immensely. Deno is officially a funded company now, and has
been and is picking up a lot of traction.

I'm not going to go super in depth on how Deno actually works here (send me an
email if you're interested), but essentially modules are just links. Here is an
example hello-world project from their website:

```typescript
import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

console.log("Listening on http://localhost:8000");
serve((_req) => {
  return new Response("Hello World!", {
    headers: { "content-type": "text/plain" },
  });
});
```

## AlephJS

The rest of the tools on this list are deno specific, including this one.
AlephJS is heavily inspired by NextJS (which is a phenomenal meta-framework and
I even use it for this very site) which means that it gets a lot of things
right. Right off the bat, it has all of the features you would expect:

- Typescript (through Deno)
- ES module imports (through Deno)
- file-system routing (much like NextJS)
- SSR & SSG
- HMR with Fast Refresh
- No config
- Plugin ecosystem

![](/images/aleph.jpeg)

One of the features that I'm really in love with is the `useDeno` hook.

```typescript
export default function Page() {
  const isLogined = useDeno((req) => {
    return req.headers.get("Auth") === "XXX";
  }, { revalidate: true });
  return <p>isLogined: {isLogined}</p>;
}
```

It allows you to specify code that is meant to be ran during SSR, either once
and cached or on every request with `revalidate: true`. I'm super excited to see
this framework move forward and it seems the main dev has some exciting plans
for the future. I'll leave you with this quote:

> ...\[on the\] alephjs side, \[I\] decided to re-design the framework. \[T\]he
> new system will be powdered by wasm that can run any edge network, for example
> deno deploy, and it will support any UI \[framework\] like
> react/vue/\[svelte\]... \[I have\] almost finish\[ed\] the compiler layer MVP,
> will publish it soon.

## Oak

Oak is one of the few cases where I'm really unsure what the future will hold.
Oak looks quite nice, though it feels like it's going to have a really hard time
competiting with packages like Express in the programmatic webserver space. I'm
still including it here because:

1. It's made with Deno in mind
2. I like the syntax

For those of you who are curious, the syntax is somewhat similar to express,
except it is significantly more promise-based:

```typescript
import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

await app.listen({ port: 8000 });
```

In the near-term future I'd love to make a Deno-specific project to see if it's
really up to par with where the node.js ecosystem currently is but that's for a
future article.

Thanks for reading!
