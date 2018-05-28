# Markdown Style Guide

이 가이드는 벤디스에서 [Markdown](https://daringfireball.net/projects/markdown/) 또는 [CommonMark](http://commonmark.org/)로 문서를 작성할 때 기준이 되는 스타일을 설명한다.

> **노트**: 이 가이드는 [markdownlint](https://github.com/DavidAnson/markdownlint)를 사용한다고 가정한다.

## Table of Contents

1. [블록 요소(Block Elements)](#block-elements)
    1. [문단(Paragraphs)과 줄 바꿈(Line Breaks)](#paragraph-line-break)
    1. [제목(Headers)](#header)
    1. [인용 블록(Blockquotes)](#blockquote)
    1. [목록(Lists)](#list)
    1. [코드 블록(Code Blocks)](#code-block)
    1. [수평선(Horizontal Rules)](#horizontal-rule)
1. [스팬 요소(Span Elements)](#span-elements)
    1. [링크(Links)](#link)
    1. [강조(Emphasis)](#emphasis)
    1. [코드 스팬(Code Span)](#code-span)
    1. [이미지(Images)](#image)

<a name="block-element"></a>
## 블록 요소(Block Elements)

<a name="paragraph-line-break"></a>
### 문단(Paragraphs)과 줄 바꿈(Line Breaks)

<a name="no-trailing-spaces"></a><a name="1.1"></a>
- [1.1](#no-trailing-spaces) 두 개의 스페이스를 이용해 줄 바꿈하는 경우를 제외하고, 줄 끝에 스페이스를 사용하지 않는다. markdownlint: [`no-trailing-spaces`](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md#md009---trailing-spaces)

  ```markdown
  <!-- 잘못된 예 -->

  스페이스로 끝나는 줄⎵

  <!-- 올바른 예 -->

  줄 바꿈하기 위해 두 개의 스페이스를 사용한 줄⎵⎵
  끝에 스페이스를 사용하지 않은 줄
  ```

<a name="no-hard-tabs"></a><a name="1.2"></a>
- [1.2](#no-hard-tabs) 스페이스 대신 탭(tab)을 사용하지 않는다. markdownlint: [`no-hard-tabs`](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md#md010---hard-tabs)

  ```markdown
  <!-- 잘못된 예 -->

  문단 내용
  ⇥* 목록을 들여쓰기 위해 탭을 사용

  <!-- 올바른 예 -->

  문단 내용
  ⎵⎵* 목록을 들여쓰기 위해 스페이스를 사용
  ```

<a name="no-multiple-blanks"></a><a name="1.3"></a>
- [1.3](#no-multiple-blanks) 두 줄 이상 연속해 빈 줄을 사용하지 않는다. 단, 코드 블록은 예외로 한다. markdownlint: [`no-multiple-blanks`](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md#md012---multiple-consecutive-blank-lines)

  ```markdown
  <!-- 잘못된 예 -->

  문단 내용
  ↵
  ↵
  또 다른 문단 내용

  <!-- 올바른 예 -->

  문단 내용
  ↵
  또 다른 문단 내용
  ```

**[⬆ 맨 위로](#table-of-contents)**

<a name="header"></a>
### 제목(Header)

<a name="header-increment"></a><a name="2.1"></a>
- [2.1](#header-increment) 제목의 수준은 한 번에 한 단계씩 증가한다. markdownlint: [`header-increment`](https://github.com/markdownlint/markdownlint/blob/master/docs/RULES.md#md001---header-levels-should-only-increment-by-one-level-at-a-time)

  ```markdown
  <!-- 잘못된 예 -->

  # 제목 1

  ### 제목 3

  두 번째 단계의 제목을 건너 뛰었다.

  <!-- 올바른 예 -->

  # 제목 1

  ## 제목 2

  ### 제목 3

  #### 제목 4

  ## 또 다른 제목 2

  ### 또 다른 제목 3
  ```

<a name="first-header-h1"></a><a name="2.2"></a>
- [2.2](#first-header-h1) 문서의 첫 번째 제목은 최상위 수준으로 작성한다. markdownlint: [`first-header-h1`](https://github.com/markdownlint/markdownlint/blob/master/docs/RULES.md#md002---first-header-should-be-a-top-level-header)  
단, 최상위 수준의 제목이 존재하는 문서의 일부로 Markdown이 사용될 때는 예외로 한다.

  ```markdown
  <!-- 잘못된 예 -->

  ## H1 제목이 아님

  ### 또 다른 제목

  <!-- 올바른 예 -->

  # H1 제목으로 시작

  ## 이후 하위 섹션에 H2 제목을 사용
  ```

<a name="header-style"></a><a name="2.3"></a>
- [2.3](#header-style) 제목은 `#`으로 시작하는 [Atx](http://www.aaronsw.com/2002/atx/) 스타일을 따른다. markdownlint: [`header-style`](https://github.com/markdownlint/markdownlint/blob/master/docs/RULES.md#md003---header-style)

  ```markdown
  <!-- 잘못된 예 -->

  # ATX 스타일 H1

  ## 닫힌 ATX 스타일 H2 ##

  Setext 스타일 H1
  ================

  <!-- 올바른 예 -->

  # ATX 스타일 H1

  ## ATX 스타일 H2
  ```

<a name="no-missing-space-atx"></a><a name="2.4"></a>
- [2.4](#no-missing-space-atx) Atx 스타일 제목의 `#` 뒤에 스페이스를 사용한다. markdownlint: [`no-missing-space-atx`](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md#md018---no-space-after-hash-on-atx-style-heading)

  ```markdown
  <!-- 잘못된 예 -->

  #제목 1

  ##제목 2

  <!-- 올바른 예 -->

  # 제목 1

  ## 제목 2
  ```

<a name="no-multiple-space-atx"></a><a name="2.5"></a>
- [2.5](#no-multiple-space-atx) Atx 스타일 제목의 `#` 뒤에 여러 개의 스페이스를 사용하지 않는다. markdownlint: [`no-multiple-space-atx`](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md#md019---multiple-spaces-after-hash-on-atx-style-heading)

  ```markdown
  <!-- 잘못된 예 -->

  #⎵⎵제목 1

  ##⎵⎵제목 2

  <!-- 올바른 예 -->

  #⎵제목 1

  ##⎵제목 2
  ```

<a name="blanks-around-headers"></a><a name="2.6"></a>
- [2.6](#blanks-around-headers) 제목 앞뒤에 빈 줄을 사용한다. markdownlint: [`blanks-around-headers`](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md#md022---headings-should-be-surrounded-by-blank-lines)  
단, 제목 앞에 HTML 앵커가 존재할 수 있어 markdownlint의 규칙을 적용할 수 없다.

  ```markdown
  <!-- 잘못된 예 -->

  # 제목 1
  문단 내용
  ↵
  또 다른 문단 내용
  ## 제목 2

  <!-- 올바른 예 -->

  # 제목 1
  ↵
  문단 내용
  ↵
  또 다른 문단 내용
  ↵
  ## 제목 2
  ```

<a name="header-start-left"></a><a name="2.7"></a>
- [2.7](#header-start-left) 제목은 들여쓰기 없이 시작해야 한다. markdownlint: [`header-start-left`](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md#md023---headings-must-start-at-the-beginning-of-the-line)

  ```markdown
  <!-- 잘못된 예 -->

  문단 내용

    # 들여쓴 제목

  <!-- 올바른 예 -->

  문단 내용

  # 제목
  ```

<a name="no-duplicate-header"></a><a name="2.8"></a>
- [2.8](#no-duplicate-header) 모든 제목의 내용은 서로 달라야 한다. markdownlint: [`no-duplicate-header`](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md#md024---multiple-headings-with-the-same-content)

  ```markdown
  <!-- 잘못된 예 -->

  # 제목 내용

  ## 제목 내용

  <!-- 올바른 예 -->

  # 제목 내용

  ## 또 다른 제목 내용
  ```

<a name="single-h1"></a><a name="2.9"></a>
- [2.9](#single-h1) 최상위 수준의 제목은 문서에 단 한 개만 존재한다. markdownlint: [`single-h1`](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md#md025---multiple-top-level-headings-in-the-same-document)

  ```markdown
  <!-- 잘못된 예 -->

  # 최상위 수준의 제목

  # 또 다른 최상위 수준의 제목

  <!-- 올바른 예 -->

  # 문서 제목

  ## 제목

  ## 또 다른 제목
  ```

<a name="no-trailing-punctuation"></a><a name="2.10"></a>
- [2.10](#no-trailing-punctuation) 제목은 `.`, `,`, `;`, `:` 등의 구두점으로 끝내지 않는다. markdownlint: [`no-trailing-punctuation`](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md#md026---trailing-punctuation-in-heading)

  ```markdown
  <!-- 잘못된 예 -->

  # 이 것은 제목이다.

  <!-- 올바른 예 -->

  # 이 것은 제목이다
  ```

**[⬆ 맨 위로](#table-of-contents)**

<a name="blockquote"></a>
### 인용 블록(Blockquotes)

<a name="no-multiple-space-blockquote"></a><a name="3.1"></a>
- [3.1](#no-multiple-space-blockquote) 인용 블록을 나타내는 기호 `>` 뒤에는 한 개의 스페이스를 사용해야 한다. markdownlint: [`no-multiple-space-blockquote`](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md#md027---multiple-spaces-after-blockquote-symbol)

  ```markdown
  <!-- 잘못된 예 -->

  >⎵⎵잘못된 들여쓰기를 한 인용 블록
  >⎵⎵인용 블록을 나타내는 기호 뒤에는 한 개의 스페이스만 사용

  <!-- 올바른 예 -->

  >⎵올바른 들여쓰기를 한
  >⎵인용 블록
  ```

**[⬆ 맨 위로](#table-of-contents)**

<a name="list"></a>
## 목록(List)

<a name="ul-style"></a><a name="4.1"></a>
- [4.1](#ul-style) 순서 없는 목록은 `*`, `+`, `-`의 순서로 작성한다. markdownlint: [`ul-style`](https://github.com/markdownlint/markdownlint/blob/master/docs/RULES.md#md004---unordered-list-style)

  ```markdown
  <!-- 잘못된 예 -->

  - 항목 1
    * 항목 2
      + 항목 3
  * 항목 4
  + 항목 5

  <!-- 올바른 예 -->

  * 항목 1
    + 항목 2
      - 항목 3
    + 항목 4
  * 항목 4
    + 항목 5
  ```

<a name="list-indent"></a><a name="4.2"></a>
- [4.2](#list-indent) 목록에서 같은 수준의 항목은 같은 크기로 들여쓴다. markdownlint: [`list-indent`](https://github.com/markdownlint/markdownlint/blob/master/docs/RULES.md#md005---inconsistent-indentation-for-list-items-at-the-same-level)

  ```markdown
  <!-- 잘못된 예 -->

  * 항목 1
    * 중첩된 항목 1
    * 중첩된 항목 2
     * 잘못 정렬된 항목

  <!-- 올바른 예 -->

  * 항목 1
    * 중첩된 항목 1
    * 중첩된 항목 2
    * 중첩된 항목 3
  ```

<a name="ul-indent"></a><a name="4.3"></a>
- [4.3](#ul-indent) 순서 없는 목록의 들여쓰기는 상위 수준 항목과 정렬될 수 있도록 두 개의 스페이스로 한다. markdownlint: [`ul-indent`](https://github.com/markdownlint/markdownlint/blob/master/docs/RULES.md#md007---unordered-list-indentation)

  ```markdown
  <!-- 잘못된 예 -->

  * 항목
     * 세 개의 스페이스로 들여쓴 항목

  <!-- 올바른 예 -->

  * 항목
    * 두 개의 스페이스로 들여쓴 항목
  ```

<a name="ol-prefix"></a><a name="4.4"></a>
- [4.4](#ol-prefix) 순서 있는 목록의 항목은 순서와 상관없이 모두 `1.`로 표기한다. markdownlint: [`ol-prefix`](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md#md029---ordered-list-item-prefix)

  ```markdown
  <!-- 잘못된 예 -->

  1. 항목 1
  2. 항목 2
  3. 항목 3

  <!-- 올바른 예 -->

  1. 항목 1
  1. 항목 2
  1. 항목 3
  ```

<a name="list-marker-space"></a><a name="4.5"></a>
- [4.5](#list-marker-space) `-`, `*`, `+`, `1.` 등 목록의 항목을 나타내는 기호 뒤에는 한 개의 스페이스를 사용해야 한다. markdownlint: [`list-marker-space`](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md#md030---spaces-after-list-markers)

  ```markdown
  <!-- 잘못된 예 -->

  *⎵⎵항목 1
  *⎵⎵항목 2

  1.⎵⎵항목 3
    *⎵⎵항목 4
  2.⎵⎵항목 5

  <!-- 올바른 예 -->

  *⎵항목 1
  *⎵항목 2

  1.⎵항목 3
    *⎵항목 4
  2.⎵항목 5
  ```

<a name="blanks-around-lists"></a><a name="4.6"></a>
- [4.6](#blanks-around-lists) 목록 앞뒤에 빈 줄을 사용한다. markdownlint: [`blanks-around-lists`](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md#md032---lists-should-be-surrounded-by-blank-lines)  
  단, 목록 앞에 HTML 앵커가 존재할 수 있어 markdownlint의 규칙을 적용할 수 없다.

  ```markdown
  <!-- 잘못된 예 -->

  문단 내용
  * 항목
  * 또 다른 항목

  1. 항목
  1. 또 다른 항목
  문단 내용

  <!-- 올바른 예 -->

  문단 내용

  * 항목
  * 또 다른 항목

  1. 항목
  1. 또 다른 항목

  문단 내용
  ```

**[⬆ 맨 위로](#table-of-contents)**

<a name="code-block"></a>
### 코드 블록(Code Blocks)

<a name="blanks-around-fences"></a><a name="5.1"></a>
- [5.1](#blanks-around-fences) 코드 블록 앞뒤에 빈 줄을 사용한다. markdownlint: [`blanks-around-fences`](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md#md031---fenced-code-blocks-should-be-surrounded-by-blank-lines)

  ````markdown
  <!-- 잘못된 예 -->

  문단 내용
  ```
  코드 블록
  ```
  ↵
  ```
  또 다른 코드 블록
  ```
  또 다른 문단 내용

  <!-- 올바른 예 -->

  문단 내용
  ↵
  ```
  코드 블록
  ```
  ↵
  ```
  또 다른 코드 블록
  ```
  ↵
  또 다른 문단 내용
  ````

<a name="fenced-code-language"></a><a name="5.2"></a>
- [5.2](#fenced-code-language) 코드 블록을 사용할 때는 포함된 코드의 언어를 명시한다. markdownlint: [`fenced-code-language`](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md#md040---fenced-code-blocks-should-have-a-language-specified)

  ````markdown
  <!-- 잘못된 예 -->

  ```
  #!/bin/bash
  echo Hello world
  ```

  <!-- 올바른 예 -->

  ```bash
  #!/bin/bash
  echo Hello world
  ```
  ````

**[⬆ 맨 위로](#table-of-contents)**

<a name="horizontal-rule"></a>
### 수평선(Horizontal Rules)

<a name="hr-style"></a><a name="6.1"></a>
- [6.1](#hr-style) 수평선은 `---`으로 표기한다. markdownlint: [`hr-style`](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md#md035---horizontal-rule-style)

  ```markdown
  <!-- 잘못된 예 -->

  - - -

  ***

  * * *

  ****

  <!-- 올바른 예 -->

  ---
  ```

**[⬆ 맨 위로](#table-of-contents)**

<a name="span-element"></a>
## 스팬 요소(Span Elements)

<a name="link"></a>
### 링크(Links)

<a name="no-reversed-links"></a><a name="7.1"></a>
- [7.1](#no-reversed-links) Markdown의 링크 문법을 반대로 쓸 수 없다. markdownlint: [`no-reversed-links`](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md#md011---reversed-link-syntax)

  ```markdown
  <!-- 잘못된 예 -->

  (잘못된 링크 문법)[http://www.example.com/]

  <!-- 올바른 예 -->

  [올바른 링크 문법](http://www.example.com/)
  ```

<a name="no-bare-urls"></a><a name="7.2"></a>
- [7.2](#no-bare-urls) URL은 코드 스팬 없이 본문에 포함할 수 없고, 링크로 변경하고 싶은 경우에는 코드 스팬 대신 `<`와 `>`로 URL을 감싼다. markdownlint: [`no-bare-urls`](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md#md034---bare-url-used)

  ```markdown
  <!-- 잘못된 예 -->

  더 자세한 내용은 다음 URL을 참조하라. http://www.example.com/

  <!-- 올바른 예 -->

  더 자세한 내용은 다음 URL을 참조하라. <http://www.example.com/>
  ```

<a name="no-space-in-links"></a><a name="7.3"></a>
- [7.3](#no-space-in-links) 링크를 삽입할 때 링크 텍스트를 나타내는 기호 `[`의 뒤 또는 `]`의 앞에는 스페이스를 사용하지 않는다. markdownlint: [`no-space-in-links`](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md#md039---spaces-inside-link-text)

  ```markdown
  <!-- 잘못된 예 -->

  [ 참고 링크 ](http://www.example.com/)

  <!-- 올바른 예 -->

  [참고 링크](http://www.example.com/)
  ```

<a name="no-empty-links"></a><a name="7.3"></a>
- [7.3](#no-empty-links) 연결된 대상이 없는 빈 링크는 사용하지 않는다. markdownlint: [`no-empty-links`](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md#md042---no-empty-links)

  ```markdown
  <!-- 잘못된 예 -->

  [빈 링크]()
  [빈 프래그먼트](#)

  <!-- 올바른 예 -->

  [유효한 링크](https://example.com/)
  [유효한 프래그먼트](#fragment)
  ```

**[⬆ 맨 위로](#table-of-contents)**

<a name="emphasis"></a>
### 강조(Emphasis)

<a name="no-space-in-emphasis"></a><a name="8.1"></a>
- [8.1](#no-space-in-emphasis) `**`, `*`, `__`, `_` 등 볼드 또는 이탤릭 등 강조를 위한 기호 사이에 스페이스를 사용하지 않는다. markdownlint: [`no-space-in-emphasis`](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md#md037---spaces-inside-emphasis-markers)

  ```markdown
  <!-- 잘못된 예 -->

  ** 볼드로 ** 강조된 텍스트

  * 이탤릭으로 * 강조된 텍스트

  __ 볼드로 __ 강조된 텍스트

  _ 이탤릭으로 _ 강조된 텍스트

  <!-- 올바른 예 -->

  **볼드로** 강조된 텍스트

  *이탤릭으로* 강조된 텍스트

  __볼드로__ 강조된 텍스트

  _이탤릭으로_ 강조된 텍스트
  ```

**[⬆ 맨 위로](#table-of-contents)**

<a name="code-span"></a>
### 코드 스팬(Code Span)

<a name="no-space-in-code"></a><a name="9.1"></a>
- [9.1](#no-space-in-code) 코드 스팬에 사용하는 ````` 기호 사이에 스페이스를 사용하지 않는다. markdownlint: [`no-space-in-code`](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md#md038---spaces-inside-code-span-elements)

  ```markdown
  <!-- 잘못된 예 -->

  ` 코드 `

  `코드 `

  ` 코드`

  <!-- 올바른 예 -->

  `코드`
  ```

**[⬆ 맨 위로](#table-of-contents)**

<a name="image"></a>
## 이미지(Images)

<a name="no-alt-text"></a><a name="10.1"></a>
- [10.1](#no-alt-text) 이미지를 삽입하는 경우 이를 대체하기 위한 텍스트를 함께 명시한다. markdownlint: [`no-alt-text`](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md#md045---images-should-have-alternate-text-alt-text)

  ```markdown
  <!-- 잘못된 예 -->

  ![](image.jpg)

  <!-- 올바른 예 -->

  ![대체 텍스트](image.jpg)
  ```

**[⬆ 맨 위로](#table-of-contents)**
