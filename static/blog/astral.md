---
title: Astral v0.3.0 Release
date: 2023-10-26
tags: [Dev]
---

[Astral v0.3.0](https://github.com/lino-levan/astral/releases/tag/0.3.0) is now
released! This release includes a lot of new features and bug fixes. Here's a
quick rundown of the changes:

## What is Astral?

Before we go into the changes, let's talk about what Astral is. Astral is a
[Deno](https://deno.com/) library (soon to be framework) for browser automation.
If you've used tools like puppeteer or playwright before, you'll feel right at
home with Astral. It's a simple, easy to use library that allows you to automate
the browser.

I wrote it from scratch in a couple of weeks and it's been a blast to work on.

## What's new?

Since this is the first release with a blog post, let's go over the features
that have been added since the v0.2.0 release:

- feat: page.setViewportSize by @lino-levan in #35
- feat: support sandbox mode by @lowlighter in #34
- feat: add console and pageerror events by @lino-levan in #36
- feat: allow for multiple browsers by @lino-levan in #26
- fix: possible leaks due to websocket closing delay by @lowlighter in #27
- fix: don't crash if chrome singletonlock is already removed after detection by
  @lowlighter in #28
- feat: support different cache installation by @lowlighter in #29
- feat: support shared browser install for concurrent getBinary() calls by
  @lowlighter in #25
- feat: support existing ws endpoint by @lowlighter in #31
- fix: don't require --allow-env perms when cache param is specified by
  @lowlighter in #32
- feat: file chooser api + page.waitForEvent by @lino-levan in #15
- feat: add page.setContent by @lowlighter in #17
- feat: improve install progress and native unzip by @lowlighter in #18
- feat: add dialog handling by @lino-levan in #14
- feat: url property to page by @lino-levan in #11
- feat: ElementHandle.innerText/HTML by @lino-levan in #9
- feat: launch args by @lino-levan in #7
- feat: user agent stealth by @lino-levan in #8
- chore: initial work on firefox support by @lino-levan in #6

That's quite a lot! Let's show off two of the cooler new features.

## Showcase

### Connect to remote browser

One of the big complaints that we originally saw with Astral was that it didn't
work in Deno Deploy. This is a relatively challenging issue since Deno Deploy
doesn't allow you to run a subprocess. However, with the new `wsEndpoint`
option, you can connect to a remote browser instance. This means that you can
run Astral in Deno Deploy! There are a ton of CDP-compatible tools that are out
there for hosting, but the most popular tool that I've seen is
[browserless.io](https://www.browserless.io/).

```ts
// Import Astral
import { launch } from "https://deno.land/x/astral@0.3.0/mod.ts";

// Connect to remote endpoint
const browser = await launch({
  wsEndpoint: "wss://remote-browser-endpoint.example.com",
});

// Do stuff
const page = await browser.newPage("http://example.com");
console.log(await page.evaluate(() => document.title));

// Close connection
await browser.close();
```

### Sandbox Mode

One of the core selling points of Deno is that is has a great built-in
permission system. By default, the browser subprocess escapes this sandbox, but
with a lot of work by @lowlight on github, we now have a sandbox mode that
allows you to run the browser in a sort of sandboxed environment. In sandbox
mode, the browser will not be able to make requests to websites and files
without `--allow-net` and `--allow-read` permissions.

```ts
// Import Astral
import { launch } from "https://deno.land/x/astral@0.3.0/mod.ts";
import { fromFileUrl } from "https://deno.land/std@0.204.0/path/from_file_url.ts";

// Launch browser
const browser = await launch();

// Open the page if permission granted, or throws Deno.errors.PermissionDenied
const { state } = await Deno.permissions.request({
  name: "net",
  path: "example.com",
});
await browser.newPage("https://example.com", { sandbox: true });

// Close browser
await browser.close();
```

## Conclusion

That's all for this blog post. I'm excited to see more community adoption for
Astral. If you have any questions, feel free to reach out to me on
[twitter](https://twitter.com/lino_levan) or on the
[Deno Discord](https://discord.gg/deno).
