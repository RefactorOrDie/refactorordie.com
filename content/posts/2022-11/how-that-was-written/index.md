---
title: "Start writing using dictation"
date: 2022-11-16T06:02:32-05:00
type: "post"
draft: true
---

TLDR;

 * I think having a background programming makes me feel like I need to be super thoughtful of every word and punctuation I use,  because that's what's required for the code to compile, and for the code to be understandable.
 * I'm trying out using dictation to get the ideas onto the page.

# I don't think of myself as a good writer.

Sitting down and writing an article to share ideas has been something I have struggled with for a long time.
I usually don't know where to start.
I don't know when to go deep on something or keep something else high-level without another person to read facial cues from.
I have a wonderful time just talking to somebody. I mean, put me in that video or voice call and I will be running a mile a minute, sharing all sorts of ideas and often times at the end those conversations that I get to have with people in real time, I wish I had like a recording of something that could've captured what we discussed and that would've been a lot easier for me to distribute.
So with the articles, I'm working on right now, I'm going to try mimicking that conversational aspect of communication, but doing so on my own. So, you might say what I'm trying to do is going to look like a ["rubber duck"](https://en.wikipedia.org/wiki/Rubber_duck_debugging) for just anything I try to write about.

So let's start with some of my friction points and break it down from there.

## Typing into a blank page

The first friction point I usually come up against is  trying to type what my thoughts are. I think part of the challenge that comes from is that most of my typing is for code. And in code, it's important to me that every word and name of a variable and data structure is incredibly cursed and eloquent, and well thought through, because I am following the wisdom that code is read 10 times more than it's written. So at, you can imagine that if I apply the same rigor to my pros, I'm going to be in the stands still with the document and not ever feel super confident yet about what I'm about the quality of what I'm writing, because I will be constantly second-guessing whether I could've said something more eloquently that would be clearer for a reader. But honestly I'm not that practiced in writing out longform content. The longest form content that I write and I'm practiced in is in documentation comments where I'm explaining exactly how some very specific thing works in the code or some data structure, etc.

I am attempting to address this initial hurdle by using dictation tools. And I am here right now talking into a markdown file in order to get me over that initial discomfort of creating a longform dialogue. And I am in someways now rubber ducking to my computer, and I am reading it back and editing the words that I just said to make sure that I can keep some semblance of reason in case dictation fails. But, which working really well about this right now is I'm getting hired at onto the page. I am getting a starting point. And previously I didn't even have a starting point I didn't have anything because I was so overwhelmed with the amount of contact that I wanted to put into the document. So, this is good we are going to use Dictation to try to solve that initial problem.

I am just using the [macOS built in dictation tool](https://support.apple.com/guide/mac-help/use-dictation-mh40584/mac). And, it's pretty nice that I can just double tap <kbd>control</kbd> key and it will allow me to start speaking and dictating and getting some work on the page.


## Fear of eloquence

I think another problem that comes around, when just considering how to write an article is that I am scared about not being that good of a longform writer by comparison to my other skills. I am a lot more confident in my skills as a engineer, and as a project manager, and designer. But when it comes to longform writing, I feel like I am going to be creating something that tarnishes my overall quality or perceived reputation or something like that.  is that actually what's going to happen? Am I going to be locked down upon for having a wisp your language than you know the articles that I really admire from Lincoln switch. Or? Probably not. Logically probably not. At the very least, if it does put someone off that my longform writing was not very good, then that does not matter enough for me to not keep practicing and not keep sharing.

I, this is a fear that logically rationally doesn't make sense. I understand that practice will improve my eloquence. And I think here as well, using a Dictation tool is already going to help me feel more comfortable with sharing ideas with others. I feel pretty comfortable just sharing ideas in person, and I appreciate how I communicate verbally, so to get over this "" fear I am going to remind myself that at least when I am talking I do like that, but what I'm saying, and if the penalty is longer content because I didn't interrogate each and every word like I am used to in programming then it's OK.

One other small thing here is my main skill set that I sell my cell phone when I am talking to new people when I'm interviewing that skill set does not include tech, write ups and longform writing. So, it's very different for me to publish content while not trying to say, I'm really great at that thing, but just publishing the continent because the thing behind the medium, the actual thoughts are when I'm trying to put out there and I believe people will evaluate my writing based on the merits of what I'm saying and hopefully people will put up with more verbose language.

I grew up with different English teachers, appreciating my conversational style of writing. But at that time I was writing those things I wasn't dictating, I think I just write very similarly to how I would say things. With where I am right now and learning to write long form, I need to trust that I am a good enough speaker to start with to create longform contact in the same way that I would record my voice or tell someone in person. And, perhaps this process will help me learn to be more thoughtful in my speech as well, because I don't want to have to go through and do a ton of edits because I started with dictation.

## Grammar

I'll mention it shortly, editing is a lot of work for our longform. I have a hard time. Keeping a lot of context in my head. So I am usually resort to resorting to outliners on when creating more structured content. And that way, I don't have to worry about editing the flow of something. But you know if you have a bunch of words and they were dictated as I mentioned I'm doing, then I'm gonna use Grammarly to help me at least ensure all the punctuation and most of the words are correct. And I believe grammar is important in to me, because incorrect grammar is very distracting. I am not sure if that's because of the background and programming where any small mistake hast to like stick out like a sore thumbSo that you can fix the syntax or catch that type air, but for me, at least if somethings misspelled or wrong punctuation, or it can trip me up, and I can lose the train of thought from the author. It would be like if the author randomly inserted a word that doesn't follow at all. I'm going to trip over that word.

> I've added a simple parameter switch to enable Grammarly on the blog, which will change the entire blog page into a [`contenteditable`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable). When you do this, it will signal to the Grammarly web extension that it should check the grammar of the page. [Try it](?grammarly)
```javascript
if (location.search.includes("grammarly")) {
  document.body.contentEditable = "true"
}
```
