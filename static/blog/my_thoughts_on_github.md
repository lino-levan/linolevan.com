---
title: My Thoughts on Github
date: 2023-08-11
tags:
  - Dev
  - Life
---

I've been thinking more and more about breaking up with Github. You may be
asking: Why?

Well, Github as an organization is obviously not a single person which I hold
grudges for. It's a company. One who's primary incentivized and contractually
obliged to make money. Unfortunately, this doesn't really work super well
together with the open source community they try to maintain on their platform.
I believe that most of these issues stem from the
[Microsoft acquisition](https://news.microsoft.com/announcement/microsoft-acquires-github/)
of the company.

I'll focus on issues I've had with them personally, instead of general gripes
that people have (otherwise this article would go on forever!)

## Killed by G-

### Atom

Github isn't [Google](https://killedbygoogle.com/) or
[Microsoft](https://killedbymicrosoft.info/), but it sure doesn't have clean
hands. For one, they killed the editor I used to use, [Atom](https://atom.io).
Microsoft took a lot of the ideas that made Atom so popular and put them in
VSCode, which happens to be the editor I currently use. I have a few gripes with
VSCode, but it's overwhelming the most popular editor which makes working in
anything else rather challenging. I would consider using
[Lapce](https://github.com/lapce/lapce), but the team at Lapce doesn't want to
make workspaces a thing, and the Deno language server relies on workspace
support.

### GFM

Outside of Atom, Github has just silently stopped supporting some projects that
are kind of critical to the open source ecosystem. For instance, Github supports
(and recommends using) a unique flavor of markdown on their site. This is great,
because it means that we get a lot of features that don't come out of the box
with markdown. The core problem arises with the fact that there is no
specification for this "Github Flavored Markdown".

Sorry, there IS [a specification](https://github.github.com/gfm/), but it misses
huge chunks of the markdown they support and was last updated back in 2019. Had
I written this article a few months ago, I would happily have pointed out that
it's so outdated that links in the specification now point to sites hosting
viruses. Fortunately enough, the sites are now either dead completely or were
re-obtained by their original owners. Fortunately enough, we are lucky that
Github has an
[API endpoint](https://docs.github.com/en/rest/markdown?apiVersion=2022-11-28)
where you can convert your GFM to HTML. How fortunate we are that they are
willing to sell us this privilege.

### Pygments/PrettyLights/TreeLights

Github has syntax highlighting of code. This is great! I love the way the code
sparkles on the website when I view it, it becomes a lot easier to read.
However, let's suppose _we_ wanted to highlight code on our own websites. Heck,
I do it all of the time in my blogs. _Surely_, since they _**LOVE**_ open source
software, they would share their magic sauce right?

I wouldn't be writing this if this was the case. No, they don't. No, they won't.
Okay, here's a little context. Github used to use a library called "Pygments",
which is a nice open-source ruby (?) library. It works pretty well if you write
in Ruby, so I'd highly recommend checking it out.

Anyways, they wrote their own syntax highlighter from scratch, _promising_ that
they would release it as OSS. Not only that, they made the bold claim that
working on any other syntax highlighter would be a _**waste of time**_ because
they thought that their syntax highlighter would be so much better. Here's the
real quote. Unedited, though I could cut it down to make it sound a lot worse

> We could certainly spend our time reviewing and preparing Rouge to be run in
> production, but we'd rather work on open-sourcing our own syntax highlighter
> so people on all platforms can enjoy syntax highlighting at native speed
> without having to install other language runtimes. I'm 100% sure that once we
> release PrettyLights (our native highlighter), it will become the default in
> Jekyll, so wasting our time with a full audit and integration of Rouge can
> hardly be justified.

([source](https://github.com/github/pages-gem/pull/79#issuecomment-85997762))

Please read the thread if you have the time, people were very excited about it's
release. A few months later, someone opened
[this](https://github.com/github/pages-gem/issues/160) issue asking what ended
up happening with PrettyLights. Without any announcements whatsoever, they
cancelled the open sourcing of the project due to "licensing issues". They wrote
the project from scratch. They chose to have licensing issues.

The worst part? They are still claiming to be working on "releasing the project
as an MIT license". It's been ~8 years. Luckily for us, the source code is
readily available for Github enterprise!

> the library _is_ available as part of GitHub Enterprise's source code offer

([source](https://github.com/github/pages-gem/issues/160#issuecomment-134565796))

## AI Problems

I'll mention this briefly just because I think it's unethical. Github (through
Microsoft through OpenAI), uses all code published on their platform to train AI
models. I personally was not surprised to hear this, because that's the point of
being a large company. Your "moat" as a big company with a product that anyone
could make in two weeks IS your data. Github has a lot of data, and they handed
it (regardless of licensing) over to OpenAI to train their Github Copilot.

Don't get me wrong, I think Copilot is a fun tool that you _should_ use if
you're hacking together something that exists already. It's great at doing that.
Copilot really doesn't work well (for me) when it comes to languages I don't
know or languages that I'm an expert at. Maybe I'll write more about that in the
future, but I thought I'd mention it here.

## Conclusion

Even though I really think Github is an unethical company...

I'm sticking with them anyways.

Alternative git hosts exist, and have existed for years. I could always move to
GitLab, GitTea, Codeberg, or literal hundreds of other hosts. There are even
non-git version control options I could go to. There's always Mercurial which
I've used before when working on a Firefox related project. SVN looks nice too,
though I've never used it before.

Why am I sticking with Github? I stick with Github because they simply are the
best provider that exists at the moment... and all of the projects I care to
contribute to are on it. No one else even comes close to level of discovery and
integration that Github has. GitLab is probably the closest second place that
exists right now, but it does not remotely compare to Github in terms of
developer experience.

Hopefully someone at Github sees this and is motivated to trying to fix these
things. Even at a "bad egg" company, there are some good people.

That's it for the article. If you have any questions or concerns, don't hesitate
to reach out to me! I'd love to have a conversation.
