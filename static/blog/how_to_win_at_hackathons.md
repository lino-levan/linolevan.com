---
title: How to Win at Hackathons
date: 2022-03-27
tags: [Hackathon, Life]
---

There are three big things that both hackathon participants, regardless of their
skill level, need to know to win:

1. Who is your audience?
2. What should I focus on?
3. What should my team look like?

We're going to go through each of these points 1 by 1.

![](/images/winning.png)

but first...

## Who am I?

I'm Lino Le Van, I am soon to be leaving high school and heading off to college
and I've organized ~three hackathons and participated in countless others.

In these next few headers I'm going to be bringing up anecdotes and examples
that may seem strange, though I promise all of these things are something that
I've experienced before.

Anyways, I'm not going to waste your time. If you really want to win, you must
understand that you're not going to have fun and you're not going to feel good.

If you agree to the terms and conditions, then feel free to read the rest of
this article.

## Who is your audience?

This is the number one mistake that I see hackathon participants make. I can't
tell you how many times someone will make a product that appeals to
their-subgroup specifically. Often times, as a student, we makes things like
notetaking apps or things to make being in long lectures easier... if these
things don't appeal to the judges, you're not going to win.

Let's do a quick case study. In this example there are two teams.

- One of them makes a fantastic note-taking app targeted at students.
- The other makes an app that uses machine learning to tell whether your boss is
  angry at you in an email or not.

If the judges are students (which is rare but does happen), the first one will
most likely win.

If the judges are adults, who have been working for ten - twenty years, they are
much more likely to select the second one.

The fact of the matter is that hackathon winners play the game the best, and one
of the easiest ways to do that is scope out who is going to be judging your
project. Most hackathons publish their judges weeks in advance, so if you want
to have the best shot at winning it's worth to do a little bit of
linkedin-stalking to find out who these judges are and what they stand for.

![](/images/manipulative.png)

Ethically, this advice seems questionable, but I promise you the teams that
don't do this don't win.

## What should I focus on?

Another question that gets brought up a lot, mostly by beginners, is "What
should I focus on to win, the idea or the product?".

The answer you get from hackathon organizers varies significantly. There is one
common answer which, in my opinion, is wrong.

> Focus on the idea, we're not grading you based on what prototype you are able
> to build in such a short time.

If you want someone to win a hackathon, this is completely the wrong advice to
give. Judges, whether they be students or employees, don't care about the idea
as much as how shiny your finished build looks like.

![](/images/shiny.png)

The idea doesn't have to be super in depth... it just has to look good on a
screen. This will come up later in the section where I talk about what your team
composition should look like, but for now hear me out.

My advice for teams that want to win through their product is as follows:

- Make a website. Apps take way too long to develop so unless you're already a
  professional app developer it's not worth it. It's also a lot easier to make a
  website look good than an app.
  - Due to the simplicity and lack of need for setup, I would recommend the tech
    stack of NextJS and TailwindCSS
  - DO NOT MAKE A CLI TOOL. I highly recommend avoiding Java / Python (unless
    you want to use it as a backend), because even if your idea is spectacular,
    judges will think it looks boring.
- Really make sure you NEED a database before adding one to your project.
  - A majority of the time you don't actually need a real database, something
    like localStorage should be good enough for the majority of people.
  - If you really NEED a database (your demo involves more than one computer
    being in sync), then stick to a noSQL db like MongoDB.
- Invest some time into making the product look good. It's often worth looking
  at how professionals have done something similar and borrow the style (for a
  solid example of this, compare my
  [OpenSearch](https://opensearch.linolevan.com/) to
  [Google](https://google.com)).
- Lie. Cheat. Decieve. And don't get caught.
  - I'm not going to call out any team specifically... but when I ran
    [GeomHacks](https://geomhacks.com), one of the teams created a project that
    was particularly impressive. The basic premise was that they trained a model
    to take the journal of a person who may be experiencing depression and be
    able to tell whether or not they were """just""" depressed, or if they were
    feeling suicidal. I believe they were going to win second place, but then
    one of the teams looked at their source code and discovered it was, in
    reality, just randomly picking between the two. They hard-coded the specific
    case they were doing in the demo video. That's actually a really clever way
    of cheating, but next time make sure to not publish that part of the code to
    github 😉.
- Make your demo interactive to the judges if at all possible.
  - When [Oleks](https://github.com/OlexG) and I won first place at
    BranhamHacks, we essentially made a kahoot / gimkit clone. It was later
    revealed that our project wasn't originally going to get first place, it was
    actually supposed to score much lower. Due to our demo allowing judeges to
    join the game directly from their phones, it actually changed their minds on
    the rankings and gave us an edge over other people.

Anyways, that was a lot of advice. Let's move on to the shortest section of them
all...

## What should my team look like?

![](/images/team.png)

This section is really simple and so I will keep it as short as possible.
There's really only two cases.

If there is a solo prize AND you know you can build a whole project by yourself:

- Go for the solo prize. You will statistically fare a lot better this way. This
  is risky however because if other people are going for the prize, they are
  very likely to be just as if not more talented then you in building projects.

In all other cases:

- Go for the maximum team size, it's usally four.
- I recommend a team with a skillset as follows
  - A front-end person. This person will be responsible for making the website
    work functionally.
  - A back-end person. This person will be responsible for the backend if you
    weren't listening to what I was saying above about not needing a back-end.
  - An artist. This person will design the site and make some art for it. This
    person will be the most free to attend talks and particpate in hackathon
    activities.
  - The all-rounder. This person is here for three reasons:
    - If someone doesn't show up or has to leave early, this person can take
      over the role of the person.
    - If someone is stuck on something (weird bug in code, can't find a good
      design), this person can help un-stuck people.
    - This person can get everyone food/water (This is mostly a joke)

## That's it!

![](/images/trophy.png)

This is as far as my experience can take you. All that's left is for you all to
take the advice I've given and go out there and practice it.

Personally, do I recommend doing what I say here? No, not really. No one fondly
remembers hackathons where they won by deception. I know you won't believe me if
you've made it this far, so go out there and have fun!

If anyone wins by following this advice, send me an email. I'd love to hear what
you did.
