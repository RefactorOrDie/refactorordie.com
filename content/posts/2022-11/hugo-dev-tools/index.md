---
title: "Hugo Dev Tools"
date: 2022-11-17T02:36:44-05:00
type: "post"
keywords: [hugo, dev-tools, meta]
draft: false
---

I have collected some of the dev tools I built while trying to update my Hugo templates.

To my disappointment, there does not yet exist a Hugo auto-completion extension for VS Code which would have been optimal for understanding what values have what properties and what functions are available. So in lieu of that, I’ve made some tools to improve the developer experience for myself.

## `partial dev.html .` to introspect

To address the problem of not knowing what values exist on different variables, I’ve made this fancy printer, which will only be included in Hugo drafts mode.

`/layouts/partials/dev.html`
```html
{{ if site.BuildDrafts }}
<details>
  <summary>{{ . }}</summary>
  {{ transform.Highlight (. | jsonify (dict "indent" "  ") | strings.ReplaceRE `[\n\r]+\s+([\]\}\{}])` " $1") "json" }}
</details>
{{ end }}
```

### Example

`/layouts/_default/single.html`
```html
{{ partial "header.html" . }}
{{ partial "dev.html" .Site }}
{{ partial "dev.html" . }}
<article class="written">{{ .Content }}</article>
```

{{< fig src="./dev.html-example-collapsed@2x.png" caption="A screenshot of the above example–it starts collapsed." >}}

{{< fig src="./dev.html-example-open@2x.png" caption="The same example after clicking, which opens the details." >}}

## Check grammar with your browser extensions.

Grammar is essential to me because incorrect grammar is very distracting. If something is misspelled or has the wrong punctuation, it can trip me up, and I might lose the author's train of thought.

I've added a simple parameter switch to enable Grammarly on the blog, which will change the entire blog page into a [`contenteditable`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable).
When you do this, it will signal to the Grammarly (or your favorite grammar checker) web extension that it should check the grammar of the page.
[Try adding ?check-grammar to this page](?check-grammar).

You can put this in a `<script>` in the `<head>` of your document or as its own js file.

```js
if (location.search.includes("check-grammar")) {
  // customize this selector for where your content is.
  // Unfortunately, Grammarly cannot work if you simply target `document.body`
  for (const item of document.queryAll(".written, article")) {
    item.contentEditable = "true"
  }
}
```

Then, I add a quick link at the top of my header to enable grammar checking.

`layouts/partials/header.html`
```html
<main>
{{ if site.BuildDrafts -}}
<a href="?check-grammar">Check Grammar</a>
{{- end }}
```


{{< fig src="./grammar-example@2x.png" caption="A screenshot of the above example link." >}}

{{< fig src="./grammar-example-enabled@2x.png" caption="The same instance after clicking, which adds ?check-grammar." >}}
