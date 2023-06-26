---
title: Tea - A new age of package managers
date: 2023-01-28
tags: [Dev]
---

I've used a lot of package managers in my day, but tea is the first one where I
am legitimately excited to see the future.

## Acknowledgements

Before I go on to explain why I really like tea, I do want to note some subtle
issues that I have with the surrounding context. Tea is positioned as a "web-3"
package manager but in all honesty this does nothing but bring it down in my
eyes. It does not have to be "edgy", the product speaks for itself.

I would also like to mention that I semi-actively contribute to this project.
According to
[Github statistics](https://github.com/teaxyz/cli/graphs/contributors), I am
currently the fourth place contributor (Tea v0 will be written in Deno, so I
can't _not_ contribute).

With that being said, let's get started with what it is and why I like it.

## The Lore

Tea was made by the author of brew (Max Howell) as a sort of follow up to what
he believes brew should have been (in a very similar way to Ryan Dahl with
Deno).

Here is the pitch:

- A cross-platform package manager (even for windows\*)
- Supporting all versions of packages
- With magic built-in\*\*

With Tea, the concept is everything "just works". The package manager gets out
of your way and you can move on with your day. And it does this through "magic".

\* Native windows support coming soon \*\* Not a joke, the actual name of this
feature

## Magic

Here's a small section from [the README](https://github.com/teaxyz/cli#faq):

> \[T\]ea can determine the tools a project directory needs and provide that
> virtual environment. With our shell magic just step into the project directory
> and type commands; tea automatically fetches the specific versions those
> projects need and runs them.

So what does that mean in practice? It means no more installing packages, or at
least no more install packages in the traditional way. Let's say I wanted to use
Deno\*, if I were using a package manager like homebrew, I would need to:

```bash
$ brew install deno
==> Fetching deno
==> Downloading https://ghcr.io/v2/homebrew/core/deno/manifests/1.30.0
==> Downloading https://ghcr.io/v2/homebrew/core/deno/blobs/sha256:ac49fe5c99e88
==> Pouring deno--1.30.0.arm64_ventura.bottle.tar.gz
==> Summary
🍺  /opt/homebrew/Cellar/deno/1.30.0: 10 files, 71.2MB
$ deno run mod.ts
Hello World!
```

If I were using Tea with magic enabled, I could simple do:

```bash
$ deno run mod.ts
installed: ~/.tea/deno.land/v1.30.0
Hello World!
```

Tea hooks into your shells "command not found" functionality and searches to see
if it has the package. If it does, it will automatically download it and run
your command without erroring out!

\* As I do quite frequently, if you haven't given it a try, please do. You'll
thank me.

## Packages

Another aspect that I really appreciate about Tea is the way it handles its
package management. In something like homebrew, there is a central repository
(called a tap) somewhere with a ruby build script for the latest version of
every package. What if that version is broken\*? Tough.

With Tea, they have a similar structure called a pantry. Pantries contain simple
YAML describing some rules on how every package should be... well... packaged.
Because of this, they actually store not only the latest version, but EVERY
version of a module. What if I need to revert from Deno `1.27.3` to `1.27.2`
because of a breaking change or buggy websockets? I can do that trivially.

They also put a lot of work into automating this. Tea waits for packages to
release new github tags and automatically rebuilds the newest version within
minutes. With brew, every package update requires someone to make a PR, and for
that PR to be tested and reviewed and merged. This is a nightmare. I used to
have to wait between 2-10 days for each version of Deno to be released on brew.
This isn't to say that brew isn't a good project, it's the second best package
manager! It just relies on an old way of thinking that isn't up-to-date with
what we can do nowadays with technology.

\* You may be thinking: "How often does this happen to you?". For some reason
this happens a lot. I choose not to think about why this is the case.

## Checking something out

Every few months or so I'll suddenly decide to finally try learning rust. Don't
get me wrong, I love the concept, I can borderline understand the syntax, but I
cannot write it for the life of me. When I do decide to try rust, I'll generally
go through the whole installing process and then after a few hours give up yet
again.

We can definitely optimize this. With Tea (because it doesn't "install"
anything\*), we can make sandboxes to test out a certain module or its
functionality. If I wanted to try rust again, I could do something like this:

```bash
$ which rustc
rustc not found

$ tea +rust-lang.org^1.67 sh
this is a temporary shell containing the following packages:
tea.xyz/gx/cc=0.1.3, zlib.net=1.2.13, rust-lang.org=1.67.0
when done type: `exit'

tea ~ rustc --version
rustc 1.67.0-dev (fc594f156 2023-01-24) (built from a source tarball)
tea ~ exit

$ which rustc
rustc not found
```

Much better!

\* Nothing is added to your PATH

## Magic (part 2)

The magic continues. The idea is for your tools to get out of your way when you
are trying to be creative, and Tea takes this to another level. Let's say you
are using git through Tea. It automatically ignores `.DS_Store`. That seems so
obvious, but this sort of thing is sprinkled everywhere throughout the project
(and will continue to expand I'm sure).

One of the other cool things with Tea is that it encourages (but doesn't force)
proper documentation of dependencies. If we `cd` into a directory with a README
file, Tea will read the file, looking for something like the following:

```
## Dependencies

| Project   | Version |
| --------- | ------- |
| deno.land | 1.27   |
```

In this case, it would know that:

- This folder requires Deno as a dependency
- The version of Deno it needs to get is exactly `1.27` for one reason or
  another (we could use `^1.27` to specify "higher than" but in this case we
  chose not to).

It will automatically stow the right version of Deno so that when we run `deno`
(without "installing" anything), we know our environment will be correct. The
years of an out of date ten page document explaining the onboarding process for
a project may finally be running out. I will not miss them.

## Conclusion

Tea has a few other features that I didn't have time to write about today (such
as the magic one-liner and the magic piping), but I hope that you've seen enough
to at least be interested in the project. I have personally switched to Tea for
packages as much as I can just to get a feeling for how it is progressing over
time.

Outside of this article, I have a big project that I'm going to announce so keep
in touch!

If you have any questions, please let me know! I'd love to have a dialogue and
hear your perspective. If you're interested in more from me, subscribe to my
blog! I try to post once month so honestly it's not going to fill your inbox.

Cheers!
