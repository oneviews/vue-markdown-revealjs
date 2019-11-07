---
title: Sample Text
subtitle: Subtitle
author: Author
date: 1996/02/27
---

## Heading

# h1 Heading 8-)
## h2 Heading
### h3 Heading

---

## Horizontal Rules

***

---

## Emphasis

**This is bold text**

*This is italic text*

~~Strikethrough~~

---

## Blockquotes

> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.

---

## Lists

Unordered

+ Create a list by starting a line with `+`, `-`, or `*`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

---

## Code

Inline `code`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"

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

## Tables

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

## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)


## Images

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

### markdown-it-imsize

![](./imgs/logo.png =400x80)

### markdown-it-attrs

Center {.center}

Left {.left}

Right {.right}

![](./imgs/logo.png) {.center}


### KaTeX

Inline

$F = ma + \error$

Display

$$
\begin{aligned}
E &= mc^2 \\
e^{i \pi} + 1 &= 0
\end{aligned}
$$