---
title: "Start writing using dictation"
date: 2022-11-16T06:02:32-05:00
type: "post"
draft: false
---

> **TLDR** Using dictation enables me to get ideas onto the page without interrogating every character (which I believe is a strong habit formed from coding).


## I think of myself as a good communicator but just an okay writer.

Sitting down and writing an article to share ideas has been something I have struggled with for a long time.
I usually don't know where to start.
I don't know when to go deep on something or when to keep it high-level when I'm staring at an article I'm working on.
My experience writing has been the complete opposite of my experience talking with others on my team.

I have a wonderful time just talking to somebody.
I mean, put me in that video or voice call, and I will be running a mile a minute, sharing all sorts of ideas, and oftentimes, at the end of those real-time conversations, I wish I had them recorded–which would've been a lot easier for me to riff off of and distribute.

So with my write-ups, I'm trying to recreate that conversational aspect of communication, but _just on my own_.

I think that getting over the hurdle of whether I'm a good writer or not is one challenge I have to work on on my own, but I have a couple of other friction points with ideas on how I'm going to overcome them I want to share.

## Lonely typing

**Writing whole articles feels uncomfortable, but writing doc comments and long PR reviews feel easy and social.**

The first friction point I usually come up against is trying to type what my thoughts are. I think part of the challenge comes from the fact that most of my day-to-day typing is for coding. And in code, it’s important that every identifier and data structure is written thoughtfully to help the next programmer who has to fix some janky-ass bug at 1 am. Additionally, I am following the wisdom that our code is read 10 times more than it’s written. So, you can imagine that if I apply the same rigor to my prose, then I’m going to be at a standstill with everything that’s a bit longer-form and I’m not going to feel super confident about the quality of what I’m writing because I’ll constantly be second-guessing whether I could’ve written something more eloquently or clearly for a reader.

The longest form of content that I write on a regular basis is for merge request [PR] reviews or documentation comments, where I am usually explaining exactly how some specific thing works in the code or the business requirements. But still, the number of words I am writing for docs or PR reviews feels far fewer than all the words I have to put into a single technical write-up. I often write documentation comments while pairing, so it feels more like answering questions that my navigator or driver has about the code we are writing together. Similarly, when I am writing long responses in a PR review, it’s also conversational–I am answering questions or providing guidance for someone on my team, and that framing makes it much easier to share ideas in prose.

**I am attempting to address this initial hurdle by using dictation tools.**

Right now, I am talking into a markdown file in order to get over that initial discomfort of creating a long-form dialogue.
In programming, we have a version of this self-discussion that people call "[rubber ducking](https://en.wikipedia.org/wiki/Rubber_duck_debugging)."
What’s working really well about this right now is I’m getting words and thoughts out onto the page. I am getting to a starting point where I previously didn’t have one because I was so overwhelmed with the amount of content that I wanted to put into the document.

I am just using the [macOS built-in dictation tool](https://support.apple.com/guide/mac-help/use-dictation-mh40584/mac). And it's pretty nice that I can just double-tap the <kbd>control</kbd> key, and it will allow me to start dictating and getting some work on the page.


## Not as good as my favorite writers, but am I good enough to get the point across?

I think another problem that comes around when just considering how to write an article is that I am scared about not being that good of a long-form writer in comparison to my other skills. I am a lot more confident in my skills as an engineer, project manager, and designer. But when it comes to long-form writing, I feel like I am going to be creating something that isn't going to meet the standards I have for myself.

Is that actually what’s going to happen? Am I going to be looked down on for having more verbose language than the articles I admire from [Ink & Switch](https://www.inkandswitch.com/) or [Scott Wlaschin](https://fsharpforfunandprofit.com/site-contents/)? Logically: probably not. And, if it does put someone off that my long-form writing was not very good, then that probably shouldn't stop me from trying and practicing.

I feel comfortable sharing ideas in person, and I appreciate how I communicate verbally, so to get over this “fear,” I should remind myself that I am a confident verbal communicator. That means I start with dictation. I’ll have more to edit, but it breaks me out of a cycle of interrogating every word, and character typed that is required with programming.

One other small thing I can feel comfortable about myself with is that I am not selling myself as an amazing technical writer in interviews and introductions. I believe people will evaluate my writing based on the merits of what I’m saying, and hopefully, people can put up with more verbose language.

I grew up with different English teachers who appreciated my conversational style of writing. But at that time, I was writing those things I wasn’t dictating; I think I was just writing very similar to how I would say things. With where I am right now and learning to write long-form, I need to trust that I am a good enough speaker to start with to create long-form content in the same way that I would record my voice or tell someone in person. And perhaps this process will help me learn to be more thoughtful in my speech as well because I don’t want to have to go through and do a ton of edits because I started with dictation.

## Aside: Grammar

I’ll mention it shortly; editing is a lot of work for long-form. I have a hard time keeping a lot of context in my head. So I usually resort to outliners when creating more structured content. And that way, I don’t have to worry about editing the flow of something (which, similarly to in code, sounds like a lot more work to rework than just rewrite it). But you know, if you have a bunch of words and they were dictated as I mentioned I’m doing, then I’m gonna use Grammarly to help me at least ensure all the punctuation and most of the words are correct.

As well, grammar is important to me because incorrect grammar is very distracting. I am not sure if that’s because of my background in programming, where any small mistake has to stick out like a sore thumb so we can fix the syntax or catch a type error, but for me, at least if something is misspelled or has the wrong punctuation then it can trip me up, and I might lose the author's train of thought. It would be like if the author randomly inserted a word that doesn’t follow at all. I’m going to trip over that word.

> I've added a simple parameter switch to enable Grammarly on the blog, which will change the entire blog page into a [`contenteditable`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable).
When you do this, it will signal to the Grammarly web extension that it should check the grammar of the page.
[Try adding ?grammarly to this page](?grammarly).
```javascript
if (location.search.includes("grammarly")) {
  for (const item of document.getElementsByClassName("written")) {
    item.contentEditable = "true"
  }
}
```
