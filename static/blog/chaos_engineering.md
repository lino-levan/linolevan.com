---
title: Chaos and Building Anti-Fragile Systems
date: 2022-07-05
tags: [Dev]
---

How is it possible that companies build systems that are pratically
invulnerable?

Today we explore this concept in as much depth as I can muster. Let's get
started. To understand Chaos Engineering, we must first understand the basics to
Chaos Theory.

## Chaos Theory

> What in the world is Chaos Theory?

Chaos Theory is basically the science of chaos, or in other words,
unpredictability. Traditional science tends to state that things are predictable
with perfect little equations but in the real world, this is not the case.

Things are by nature unpredictable. A good proof of this is simply throwing a
baseball. Where will the ball end up? It's impossible to know without knowing
all of the starting conditions. It's impossible to know where all of the atoms
making up the air are at any given moment and even more impossible to know the
direction they are going. We can get a good estimate by trying to simplify
complex systems but we can never get the exact position of where the ball will
land.

This is what people are talking about when they talk about the "Butterfly
Effect". It's a cool subset of science and I recommend checking out
[this article](https://fractalfoundation.org/resources/what-is-chaos-theory/)
for more examples.

Now for the main meat of the article.

## Chaos Engineering

Chaos Engineering is quite simply, acknowledging that things will not always be
perfect. Your production system will sometimes go down. You database might
crash. Your code has a bug with an unintended and disastrous side effect.

This should be expected. Things go wrong in the real world. How can the
large-scale, distributed systems of the current world survive all of this? It
simply takes it into account during the engineering process.

Back in 2010, Netflix wrote a
[blog post](https://netflixtechblog.com/5-lessons-weve-learned-using-aws-1f2a28588e4c)
about their move to AWS. In it, they announced one of their bleeding edge
strategies to prevent total system collapse. It's name is Chaos Monkey.

![](/images/chaos_monkey.png)

Chaos Monkey essentially acts like a terrible employee. It's a small script that
goes around and randomly shuts down instances in production.

While at first that sounds really stupid, it's actually a really simple way to
forcefully build resiliency. Engineers are force to build their subsystems
knowing that one of their own, or perhaps another team's systems are unreliable.

For Netflix that meant always having an alternative to fetching data.

> If our recommendations system is down, we degrade the quality of our responses
> to our customers, but we still respond. We’ll show popular titles instead of
> personalized picks. If our search system is intolerably slow, streaming should
> still work perfectly fine.

## Final Thoughts

I wanted to write this article because the ideas that I learned were pretty
interesting in research and I thought that they may be interesting to you. I'm
by no means an expert in Chaos Engineering, so in case you wanted to read more
I'll leave some links to more reading below.

If you have any more information, let me know! I'd love to have a dialogue and
hear your perspective.

If you're interested in more from me, subscribe to my blog! I try to post once
month so honestly it's not going to fill your inbox.

## Further Reading

[Chaos Monkey Guide for Engineers](https://www.gremlin.com/chaos-monkey/)

[Principles of Chaos Engineering](https://principlesofchaos.org)

[What is Chaos Engineering?](https://www.dynatrace.com/news/blog/what-is-chaos-engineering/)
