---
title: The Ultimate Tech Stack
date: 2022-04-18
tags: [Dev, Tips]
---

If you just want my opinion and nothing else from this article, here it is:

- Frontend
  - Next.js (in TS) for the front-end "HTML"+js
  - Tailwind for the styling
- Backend
  - Postgres for database
  - Vercel/Netlify serverless functions (in TS)

Let's go over in detail why each of these decisions were made.

## Next.js?

Why not \[insert other web framework here\]?

While there is obviously some flexibility when it comes to picking your
front-end framework, I truly believe that for the near-to-medium term future
Next.js will end up on top.

The first argument for Next.js is that it's "just" a meta-framework on React.
React, to this day is still the most popular web framework, and unfortunately
when it comes to good decisions for tech it just ends up being a popularity
contest. Right now, React is winning this contest big time.

![](/images/popularity.png)

If you want to build a skill-set, people are hiring for React right now. If you
want to hire people, choosing React for your project guarentees a larger pool of
potential canididates. It's a vicious cycle.

On top of just being a meta-framework, its development is being generously
funded by the all-powerful [Vercel](https://vercel.com) (who recently raised
over $100 million). Due to an incredible development effort, its DX is
incredibly far ahead of the competition and I find it unlikely to lose this lead
anytime soon.

Next.js also comes with the flexibility that is generated from being open-source
and well documented. You COULD choose to manually deploy your app, or you could
choose from a range of tech startups like [Netlify](https://www.netlify.com) or
[Vercel](https://vercel.com) themselves.

What I've covered so far are the meta-reasons to use Next.js. In reality, there
are a ton of features which honestly make it amazing to use:

- File-system routing (No more `react-router`!)
- Dynamic routes
- Traditional Pre-rendering (either `SSG` or `SSR`)
- Font and Image Optimization
- Fast Refresh
- ESLint and Typescript support out of the box
- Polyfills for supporting **IE11 and all modern browsers**

It also comes with compatibility for some of the other technology on the list,
which makes it even more convienient.

- Support for Tailwind
- Serverless functions

## Tailwind?

Why not plain css or \[insert other css abstraction layer\]?

This is probably the most opinionated part of this whole article. Tailwind is
honestly one the best technologies I've recently discovered and I highly
recommend it for anyone trying to get something done _fast_ but with
customizability.

If you honestly don't care about customizability, I have two things to suggest:

1. If you don't NOW, you might LATER
2. Just use `react-bootstrap` for now

I'll give you the elevator pitch and move on:

- Build modern, responsive sites without having to leave HTML/JSX
- Because of the tailwind api automatically purging unused classes in
  production, your css bundle sizes will be tiny
- Support for customizible dark mode out of the box
- Highly configurable, in such a way that competitors feel like a walled garden
  in comparison
- Incredible IDE integration (seriously, this saves so much time.)

Quick Tip: I was originally going to write a whole section about `react-icons`
but honestly the name explains it perfectly. If you need icons quickly to
prototype and move on, use `react-icons`. Enough said, we're moving on to the
back-end.

## Postgres?

Why not \[insert other database solution here\]?

This one is also going to be pretty controversial, especially since I continue
to say, and have said in the past that you should use
[MongoDB](https://linolevan.com/blog/how_to_win_at_hackathons).

My philosophy when designing the ultimate tech stack is something that will
scale "good enough" while having a really good DX. MongoDB theoretically scales
better but the unorganized JSON data and lack of true SQL-like solutions really
makes it unfit for production applications in my opinion. Wrappers like
[Mongoose](https://mongoosejs.com) do a decent job at making it tolerable but
it's not really a true solution.

But once again to get back to features instead of comparisons with everything
else:

- Supports database functions for computed values, which can be written in a
  [ton of languages](https://www.prisma.io/dataguide/postgresql/benefits-of-postgresql)
- Full SQL compliance (so you don't need to relearn a whole new query language)
- Fully Open-Source
- Large number of native types
- Full text search
- Logging
- and even... STORING AND QUERYING JSONB DATA

The phenominal thing is that if your database ends up not scaling, you can
always move to something like
[Amazon Aurora](https://aws.amazon.com/rds/aurora/) which will deal with the
scaling for you. That's the magic of a universal querying language (though
honestly if your infrastructure relies on decentralized raw queries, you have
bigger problems).

## Serverless Backend

This serverless jamstack architecture has been overhyped for a while, but I
think that the technology is just now finally catching up to the ideals.

With technology like
[Edge Functions](https://vercel.com/features/edge-functions) finally filling the
performance gap between serverless and serverfull solutions, I think now is the
right time to start building apps using this power. The simplicity of an api
route being a single typescript file as well the infinite horizontal scaling of
these functions seem to make them the future of the web.

```typescript
// simply place this in pages/api/example.ts and watch the magic happen!
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  response.status(200).json({
    body: request.body,
    query: request.query,
    cookies: request.cookies,
  });
}
```

The future is now old man and here is your chance to grasp it.

## Conclusion

I truly believe that the tech stack I've presented is good enough to get someone
from an idea, all the way to 100 thousand users (which was the goal). Without
completely overengineering the stack, I think this is a good way to go about
making websites.

If you have different opinions, let me know! I'd love to have a dialogue and
hear your perspective.

If you're interested in more from me, subscribe to my blog! I post like twice a
month so honestly it's not going to fill your inbox.
