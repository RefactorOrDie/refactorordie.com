---
title: "I18n Could Be Simple"
date: 2019-07-27T16:22:51-04:00
type: "post"
draft: true
---

The way i18n works in most implementations I've seen consist of taking all natural language instances in an app and replacing them with some translation chooser which takes a translation key and looks up the corresponding natural language value for the current language.


So, lets say I have the following logic: `alert("I have ")` which sends a lovely message to the browser <button onClick="alert('Hello world!')">Send alert</button>


{{< dual >}}

Enabling an application to support many languages can be a deceptively simple.

For this reason it is an incredibly common pitfall for development teams 

<button onClick="alert('Hello world!')">Tell the people</button>

============

What starts as a kind blend of formatting and natural language...

```html
<p>Hello, world!</p>
```
...can easily become a mess of indirection.

```html
<p>{
  translate("helloWorldMsg")
}</p>
```

{{< /dual >}}
