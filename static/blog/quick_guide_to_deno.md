---
title: A Quick Guide to Deno
date: 2022-05-19
tags: [Dev, Tips]
---

I've been using Deno for a while now and I am really enjoying it.

This article is actually created based on a talk I did, so just keep that in
mind for context.

## The Folly of Man

> Why NodeJS is terrible

- Run Javascript on the server!
- Tired of having a fast and secure server environment? We have the solution!
- Make sure to use proprietary module loading formats for extra confusion!

```js
const fs = require("fs"); // What is this?
```

- Cross-compatibility? What’s that? We load weird binaries constantly with .node
  files!
- :node_modules: ![](/images/node_modules.png)

## That was dumb

![](/images/deno.png)

- Run, Bundle, and Compile Typescript (or Javascript).
- Security is built-in. Everything is sandboxed.
- Uses official ECMAscript syntax for imports.
- WebAssembly for modules with speed (no proprietary formats)
- Caches all modules in one centralized location. No more gigabytes of downloads
  per project.

## Install

- Installing Deno does not require a custom installer because it’s literally
  just one executable.

Quick Install Script:

```bash
curl -fsSL https://deno.land/x/install/install.sh | sh
```

Breakdown (for those of us who aren't linux experts):

- curl: download script from URL
- |: pipe the output to the next program
- sh: run a bash script

## Overview

### Deno namespace

- If you want to do something closer to system-level, Deno provides a number of
  APIs through the “Deno” namespace

```typescript
Deno.env.get("TMPDIR"); // get environment variable
```

### Deno built-in library

- Deno, unlike Node does not treat built-in modules any differently than
  anything else.
- Deno does provide modules built by the team publicly but it is referred to as
  the “Standard Library” (presumably to make it more similar to other better
  languages)
- [Deno STD](https://deno.land/std) isn’t stable yet
  - This doesn’t mean it can’t be used in production, it just means
    functionality/existence of a feature might change in future versions
- Deno’s STD is heavily inspired by [Go](https://pkg.go.dev/std)’s which makes
  it very complete
- At the time of writing, it is currently at v0.140.0

### Deno module resolution

- Modules are defined by links pointing to js or ts files.

```ts
import { Application } from "https://deno.land/x/oak/mod.ts";
```

- The first time a module is used, it is fetched and compiled by Deno and is
  then never re-downloaded again.
  - This means that if the web server hosting the module goes down, your code
    still works.
- Integrity checking is important.
  - Deno supports and encourages using a lock file (a json with links and the
    hash of the file contents)

```jsonc
// lock.json
{
  "https://deno.land/std@0.139.0/textproto/mod.ts": "3118d7a42c03c242c5a49c2ad91c8396110e14acca1324e7aaefd31a999b71a4",

  "https://deno.land/std@0.139.0/io/util.ts": "ae133d310a0fdcf298cea7bc09a599c49acb616d34e148e263bcb02976f80dee",

  "https://deno.land/std@0.139.0/async/delay.ts": "35957d585a6e3dd87706858fb1d6b551cb278271b03f52c5a2cb70e65e00c26a"
}
```

Okay but how do I use them in my code?

> “URL imports are a nightmare for version control” - Matt Two main methods

- dep.ts
  - Create a typescript file that imports and re-exports only the parts that you
    need

```ts
// dep.ts
export { Application } from "https://deno.land/x/oak/mod.ts";

// main.ts
import { Application } from "./dep.ts";
// ...
```

- import_map.jsonc
  - Store all of your dependencies in an import map, import modules from that
    path

```ts
// import_map.jsonc
{
	"imports": {
		"oak/": "https://deno.land/x/oak/"
	}
}

// main.ts
import { Application } from 'oak/mod.ts'
// ...
```

Quick Note: In both cases you would want to version your module:

```ts
import { Application } from "https://deno.land/x/oak@10.5.1/";
```

### Testing in Deno

No more third-party frameworks for testing!!!

- Just run `deno test`

```ts
import { assertEquals } from "https://deno.land/std@0.140.0/testing/asserts.ts";

Deno.test(() => {
  assertEquals("monkey", "monkey"); // success!
});
```

### Linting/Formatting in Deno

It’s built in. Finally.

- Use the `deno lint` and `deno fmt` commands to do this.
- The defaults are pretty good, and are probably what you want anyways.
  - Personally, I always hated setting up eslint and finding which rules I liked
    best.
  - Customizable with the deno.json file.

### Bundling in Deno

Guess what? It’s built in.

- NO MORE WEBPACK!
- Just run `deno bundle`
  - By default this will just output the result in stdout, you can specify a
    file name if you want it to be saved. Otherwise, you could pipe the result
    somewhere else (maybe to something like babel).

### Compiling in Deno

What?

- You can compile your Deno utilities straight down to an executable. This is
  more of a cool feature than something particularly useful but why not

## Common Doubts

“Cool, but useless with an Ecosystem”

- Usually this would be a big concern for a new runtime since usually it implies
  a new language.
- Deno just runs typescript (or javascript), the code is already out there!
- You want to use a node module in deno? You have two options:
  - Skypack
    - Allows you to import basically all ESM node modules just like any other
      file!
  - DNT
    - A command-line tool that allows you to transform a node module into a deno
      module by some magic and inserting shims when necessary
- If you prefer the workflow of Deno, NOTHING IS STOPPING YOU FROM USING IT NOW

“It doesn’t really run Typescript, it’s lying”

- This is fundamentally just nitpicking but I’ll elaborate anyways. I think
  quoting the manual explains it best.

> “But wait a minute, does Deno really run TypeScript? you might be asking
> yourself. Well, depends on what you mean by run. One could argue that in a
> browser you don't actually run JavaScript either. The JavaScript engine in the
> browser translates the JavaScript to a series of operation codes, which it
> then executes in a sandbox”

- Deno uses a combination of TSC and SWC to translate your code to javascript in
  real time.
  - Tip: Type checking can be slow, so if you want to avoid waiting you could
    just use the `--no-check` flag in dev and remove it for tests in prod.

“Okay but I use X obscure feature with Typescript. Now what?”

- You can configure Typescript using a tsconfig file like any other system.
  - Tip: You can also use deno.json to customize your typescript!

“How is the module resolution any better than Node”

- This is mostly a matter of perspective. “Better” is a judgement.
- In my opinion, URL imports are a significantly better idea for any developer
  who supports freedom because it removes the need for centralized package
  managers.
  - Package managers do exist if you really want them, but personally I do not
    recommend using them with Deno
- You don’t need to download the module every time you need it. If it’s the same
  module as before, why waste your precious disk space.
- The lock file REALLY is a lock file with no magic upgrading of modules.

“URL imports are bad because what if host server goes down”

- True.
- How is this any different than NPM? Or Rust Crates? Or literally anything on
  the internet?
- You can mitigate the dangers of this by using some stuff we’ve already talked
  about
  - Use a lock file. Make sure that if the web-server somehow gets hacked,
    you’ll be fine.
- Mission-critical programs already have a solution to this. You have two
  options:
  - Bundle your program using built-in tools to remove need for this
  - Simply put the modules in your version control. Yes, Deno does support this.

“I miss my package.json because I want my npm scripts”

- Deno has a configuration file (which should be named deno.json or deno.json5)
  that allows for a ton of tweaking with options.
  - You explicitly do NOT need it. Everything that you could want to do can be
    done by passing in arguments
- Deno.json has a “task” system very similar to npm scripts. Just run
  `deno task x`

```json
{
 "tasks": {
   "test": "deno test",
   "giveup": "rm -rf /*”
 }
}
```

## Conclusion

I believe that Deno has a good chance of making it big, especially in enterprise
with it's focus on security, reliability, and customer support. While I don't
think Deno will ever really replace Node, I truly think it has a good shot of
being a popular alternative.

If you have different opinions, let me know! I'd love to have a dialogue and
hear your perspective.

If you're interested in more from me, subscribe to my blog! I post like twice a
month so honestly it's not going to fill your inbox.
