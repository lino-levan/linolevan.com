---
title: Duno.land - A new project.
date: 2022-08-23
tags: [Dev, Life]
---

A while back, I wrote
[an article](https://linolevan.com/blog/quick_guide_to_deno) about how Deno
works. Deno still isn't ready.

I say that in the nicest possible way. I love it when I get to use it, but I
don't get to use it often. I'll give an example of why.

## Using Deno is scary

Despite me being a huge advocate for Deno, I still don't feel comfortable
risking a project on it.

When I was working for [Gated](https://www.gated.com), I had to build a
[chrome extension](https://chrome.google.com/webstore/detail/the-conversation-by-gated/eglckmkkopeccondieabmbhdhibmmakj?hl=en&authuser=0)
that required a backend of some sort. Since I was working alone on this project,
I was able to learn some new stuff instead of using the old and reliable
"react + node" stack.

For the frontend, I picked [SolidJS](https://www.solidjs.com), which was new to
me but looked similar enough to React that I felt comfortable jumping in. I
considered Vue or Svelte instead but I disagree with Vue on a philosophical
level and Svelte still doesn't have the community needed for such an ambitious
framework.

When I got to the backend, I toyed around with [bun.sh](https://bun.sh) but it
crashed almost instantly, and it doesn't quite support node modules yet in the
way it claims it will. After that experience, I was going to go use Deno like I
always have and went looking for the modules I needed. For this specific
project, I had a non-negotiable need for airtable. The
[official airtable module](https://github.com/Airtable/airtable.js/tree/master/src)
obviously didn't work (much of the project hasn't been touched for over 2
years), and
[the community made one](https://github.com/grikomsn/airtable-deno#comparison-with-nodejs-version)
had a really weird quirk where it only supported one table per client?

To make a long story short, I couldn't in good faith use Deno for this project.
I ended up just using a standard node project, despite my best efforts to try
something new.

# What is duno.land

[Duno.land](https://duno.land) is my best attempt at getting these stumbling
blocks in one place, as a resource for the community to see if there are going
to be any hiccups in a project they are planning. I'm going to copy-paste the
mission statement from the site:

> The javascript community, and I personally, really want to see Deno succeed.
> This site is not intended to "dunk" on Deno in any way. It's simply my way of
> listing what I see as its current shortcomings and what I hope it can improve
> on.

Please star [the repo](https://github.com/lino-levan/duno.land) if you can. PRs
and issues would be phenomenal.

That's it for me! If you're interested in more from me, subscribe to my blog! I
try to post once month so honestly it's not going to fill your inbox.
