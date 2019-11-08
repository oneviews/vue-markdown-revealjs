---
title: Sample Text
subtitle: Subtitle
author: Author
affiliation: Affiliation
date: 1996/02/27
---

## Section

### Subsection

Sample text

***

**Bold text**

*Italic text*

~~Strikethrough~~

> Blockquotes

- Create a list by starting a line with `+`, `-`, or `*`
  - Marker character change forces new list start:

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

---

### Code

Inline `code`

Block code

```
Sample text here...
```

Syntax highlighting

``` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

---

### Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

---

### Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)


### Images

![](./imgs/logo.png)

---

## Plugins

The killer feature of `markdown-it` is very effective support of
[syntax plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin).

### markdown-it-emoji

:thinking:

### markdown-it-sub / markdown-it-sup

- H~2~O
- 19^th^

### markdown-it-mark

==Marked text==

### markdown-it-underline

_Text with underline_

---

### markdown-it-imsize

![](./imgs/logo.png =400x80)

### markdown-it-attrs

![](./imgs/logo.png) {.R}

Floated image

### KaTeX

Inline

$F = ma + \hoge$

Display

$$
\begin{aligned}
E &= mc^2 \\
e^{i \pi} + 1 &= 0
\end{aligned}
$$