---
title: "Stop Lying to Yourself"
date: 2022-11-16T13:37:00-05:00
type: "post"
draft: true
---

# How to "fix it later" when later is 6 months from now or never.

**RE: [Stop lying to yourself – you will never "fix it later"](https://uselessdevblog.wordpress.com/2022/11/10/stop-lying-to-yourself-you-will-never-fix-it-later/)**
![Cole's screen capture of Stop lying to yourself – you will never “fix it later” – The Useless Dev blog 2022-11-16 at 05.09.17@2x.png](./Stop-lying-to-yourself-–-you-will-never-fix-it-later–The-Useless-Dev-blog@2x.png)

Read the <a href="https://uselessdevblog.wordpress.com/2022/11/10/stop-lying-to-yourself-you-will-never-fix-it-later/">original article</a> ([web.archive.org](https://web.archive.org/web/20221116101813/https://uselessdevblog.wordpress.com/2022/11/10/stop-lying-to-yourself-you-will-never-fix-it-later/)) and [original Reddit thread](https://www.reddit.com/r/programming/comments/yv0zy5/stop_lying_to_yourself_you_will_never_fix_it_later/) for more thoughts.

So fundamentally the author of stop lying to yourself you will never fix it later is trying to make a point that the team is always going to say give us a little bit more time and it won't actually happen or let me just put in this hack and move on. The there's obviously a fundamental issue with a team saying they're just need a little more time, and missing a delivery. But the other problem of putting in a hack to just "fix it later", is some thing I think we can move the bar on. And it all starts with how we're writing the code and how we are writing our documentation.

Essentially in my experience and engineering, the biggest struggle that people have in delivering their code is that sort of sometimes a shame that's tied to the fact that this code is probably not very good. In the majority of cases we merge code into the code base that is not very good. The thing I don't see enough of and some of that I've started doing for all of my teams is I've encouraged, and given everyone sort of a permission that you can commit and contribute code that sucks. With the caveat… That you document why it sucks. If you're documenting why it sucks everyone can engage with that now and can engage with it in the future. Now in the article the idea was we're documenting that it sucks in the , which is good but we need to actually take that documentation and put it next to the code. We need to put it somewhere it's discoverable. And in my experience, working on many different codebases and excepting and reviewing hundreds of PR's those PR's never come up again. You wrote that in this PR that there was some hack just to do this and this is why put that in the code because no one's going to read this PR again in a future. But somebody who is working on this piece of code you just wrote in the future is going to see your comment in the code. 
 
 Now I'm exaggerating a little bit, people may review your PR come back to it or use you know I get blame to figure out when this Pesic code was merged, you know and the subsequent PR that I was tied to to see the PR review but I've already created so many steps in describing what's going to happen that I can assure you you're gonna have 10 times name out on success by just putting your thoughts and ideas into the code, so how do we do that?

 Well, the first idea that I am going to share in this response is an idea that we've been using for the last few projects. I've been on called progress comments.
Well, the first idea that I am going to share in this response is an idea that we've been using for the last few projects. I've been on called progress comments.
And a progress comment is essentially a number from 0 to 10 that's going to indicate how confident and stable we feel the code is that we just wrote and usually we will also accompany this progress comment value with a pros and cons list. This is what I like about the code. They just wrote here are some things I didn't like. Here are some caveat maybe also include various notes.
