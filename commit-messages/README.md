# Commit Message Style Guide

이 가이드는 벤디스에서 VCS (Version Control System)를 사용하며 변경이력을 작성할 때 기준이 되는 스타일을 설명한다.

코드를 비교하는 `diff`는 변경된 코드가 무엇인지만 보여줄 뿐 변경이 일어난 배경(context)을 설명하는 것은 커밋 메시지(commit message)다. 그리고 커밋 메시지를 더 쉽게 읽을 수 있도록 작성할 때, 이를 통해 더 나은 정보를 제공할 수 있다.

> **노트**: 이 가이드는 [commitlint](http://marionebl.github.io/commitlint/)를 사용한다고 가정한다.

## Table of Contents

1. [원자적 커밋(Atomic Commit)](#atomic-commit)
1. [커밋 메시지 형식](#message-format)
1. [Header](#header)
1. [Body](#body)
1. [Footer](#footer)
1. [도움이 되는 글](#references)

<a name="atomic-commit"></a>
## 원자적 커밋(Atomic Commit)

"원자적(atomic)" 커밋은 잘못 커밋한 코드를 쉽게 복원(revert)할 수 있는 단위로 커밋하는 것을 의미하며, 하나의 버그 수정 또는 하나의 기능 추가를 중심으로 한 변경이 그 단위가 된다. 따라서 하나의 기능에 대해 여러 번의 수정이 있을 때도 기능을 쉽게 제거할 수 있게 한 번만 커밋하는 것이 좋다. 또, 원자적 커밋은 다른 변경 사항의 반영이나 다른 브랜치와의 통합(merge)를 쉽게 할 수 있도록 돕는다.

* 각 버그 수정 또는 작업을 독립된 변화로 커밋
* 업무의 한 덩어리가 완료될 때 커밋
* UI 레이아웃의 변경은 각각 분리해 커밋
* 레이아웃 파일, 관련된 코드, 추가된 리소스를 함께 커밋

**[⬆ 맨 위로](#table-of-contents)**

<a name="message-format"></a>
## 커밋 메시지 형식

<a name="message-components"></a><a name="2.1"></a>
* [2.1](#message-components) 커밋 메시지는 크게 `header`, `body`, `footer`로 구성된다.

  ```markdown
  {header}

  {body}

  {footer}
  ```

<a name="min-length"></a><a name="2.2"></a>
* [2.2](#min-length) 커밋 메시지에 `header`는 반드시 존재해야 하며, `body`, `footer`는 생략 가능하다. commitlint: [`header-min-length`](http://marionebl.github.io/commitlint/#/reference-rules?id=header-min-length), [`body-min-length`](http://marionebl.github.io/commitlint/#/reference-rules?id=body-min-length), [`footer-min-length
`](http://marionebl.github.io/commitlint/#/reference-rules?id=footer-min-length
)

  ```markdown
  <!-- 잘못된 예 -->

  {body}

  {footer}

  <!-- 올바른 예 -->

  {header}

  {body}

  {footer}
  ```

<a name="body-leading-blank"></a><a name="2.3"></a>
* [2.3](#body-leading-blank) `body` 앞에 빈 줄을 사용한다. commitlint: [`body-leading-blank`](http://marionebl.github.io/commitlint/#/reference-rules?id=body-leading-blank)

  ```markdown
  <!-- 잘못된 예 -->

  {header}
  {body}

  <!-- 올바른 예 -->

  {header}
  ↵
  {body}
  ```

<a name="footer-leading-blank"></a><a name="2.4"></a>
* [2.4](#footer-leading-blank) `footer` 앞에 빈 줄을 사용한다. commitlint: [`footer-leading-blank`](http://marionebl.github.io/commitlint/#/reference-rules?id=footer-leading-blank)

  ```markdown
  <!-- 잘못된 예 -->

  {header}
  ↵
  {body}
  {footer}

  <!-- 올바른 예 -->

  {header}
  ↵
  {body}
  ↵
  {footer}
  ```

<a name="max-line-length"></a><a name="2.5"></a>
* [2.5](#max-line-length) 커밋 메시지의 한 줄이 한글 36자를 넘으면 줄 바꿈을 한다.

  ```markdown
  <!-- 잘못된 예 -->

  일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십

  <!-- 올바른 예 -->

  일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육
  칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십
  ```

**[⬆ 맨 위로](#table-of-contents)**

<a name="header"></a>
## Header

<a name="header-format"></a><a name="3.1"></a>
* [3.1](#header-format) `header`는 `type`, `scope`, `subject`로 구성된다.

  ```markdown
  {type}({scope}): {subject}
  
  {body}
  
  {footer}
  ```

<a name="type-empty"></a><a name="3.2"></a>
* [3.2](#type-empty) `type`은 반드시 존재해야 한다. commitlint: [`type-empty`](http://marionebl.github.io/commitlint/#/reference-rules?id=type-empty), [`type-min-length`](http://marionebl.github.io/commitlint/#/reference-rules?id=type-min-length)

  ```markdown
  <!-- 잘못된 예 -->

  ({scope}): {subject}
  
  <!-- 올바른 예 -->
  
  {type}({scope}): {subject}
  ```

<a name="type-enum"></a><a name="3.3"></a>
* [3.3](#type-enum) `type`은 커밋되는 변경 내용에 따라 다음 중 하나로 명시한다. commitlint: [`type-enum`](http://marionebl.github.io/commitlint/#/reference-rules?id=type-enum)
  - `revert`: 기존 커밋으로 복구하는 경우
  - `build`: 빌드 시스템 또는 외부 의존성과 연관된 변화
  - `ci`: CI 설정 파일 또는 스크립트와 관련된 변화
  - `docs`: 문서의 변경만 포함
  - `feat`: 한 가지 새로운 기능
  - `fix`: 한 가지 버그 수정
  - `perf`: 성능을 개선하기 위한 코드 변경
  - `refactor`: 버그의 수정 또는 기능의 추가가 아닌 코드 수정
  - `style`: 코드의 의미에 영향을 끼치지 않는 변경
  - `test`: 누락된 테스트 추가 또는 기존 테스트의 수정

  ```markdown
  <!-- 잘못된 예 -->

  chore({scope}): {subject}
  
  <!-- 올바른 예 -->
  
  build({scope}): {subject}
  ```

<a name="type-case"></a><a name="3.4"></a>
* [3.4](#type-case) `type`은 반드시 소문자로 작성한다. commitlint: [`type-case`](http://marionebl.github.io/commitlint/#/reference-rules?id=type-case)

  ```markdown
  <!-- 잘못된 예 -->

  DOCS({scope}): {subject}
  
  <!-- 올바른 예 -->
  
  docs({scope}): {subject}
  ```

<a name="scope-empty"></a><a name="3.5"></a>
* [3.5](#scope-empty) `scope`은 관련된 이슈 식별자로 지정하며, 특정하기 어려운 경우 생략할 수 있다. commitlint: [`scope-empty`](http://marionebl.github.io/commitlint/#/reference-rules?id=scope-empty), [`scope-min-length`](http://marionebl.github.io/commitlint/#/reference-rules?id=scope-min-length)

  ```markdown
  <!-- GitHub 이슈의 예 -->

  build(#1): {subject}

  <!-- Jira 이슈의 예 -->

  build(ISSUE-1): {subject}
  ```

<a name="scope-case"></a><a name="3.6"></a>
* [3.6](#scope-case) `scope`은 반드시 대문자로 작성한다. commitlint: [`scope-case`](http://marionebl.github.io/commitlint/#/reference-rules?id=scope-case)

  ```markdown
  <!-- 잘못된 예 -->

  docs(issue-1): {subject}
  
  <!-- 올바른 예 -->
  
  docs(ISSUE-1): {subject}
  ```

<a name="subject-empty"></a><a name="3.7"></a>
* [3.7](#subject-empty) `subject`는 반드시 존재해야 하며, 변경 내용에 대한 간결한 설명을 포함한다. commitlint: [`subject-empty`](http://marionebl.github.io/commitlint/#/reference-rules?id=subject-empty), [`subject-min-length`](http://marionebl.github.io/commitlint/#/reference-rules?id=subject-min-length
)

  ```markdown
  <!-- 잘못된 예 -->

  docs(ISSUE-1)
  
  <!-- 올바른 예 -->
  
  docs(ISSUE-1): {subject}
  ```

<a name="subject-full-stop"></a><a name="3.8"></a>
* [3.8](#subject-full-stop) `subject`는 현재형, 개조식으로 작성하며, 마지막에 마침표를 찍지 않는다. commitlint: [`subject-full-stop`](http://marionebl.github.io/commitlint/#/reference-rules?id=subject-full-stop)  
  `type`이 `revert`인 경우 `subject`에는 복원되는 커밋의 `SHA` 해쉬를 명시한다.

  ```markdown
  <!-- 잘못된 예 -->

  docs(ISSUE-1): 변경 내용을 반영한다.
  
  <!-- 올바른 예 -->
  
  docs(ISSUE-1): 변경 내용을 반영
  ```

**[⬆ 맨 위로](#table-of-contents)**

<a name="body"></a>
## Body

<a name="body-content"></a><a name="4.1"></a>
* [4.1](#body-content) `body`는 변경이 일어난 이유와 기존 동작과의 차이 등을 설명하며, 현재형, 명령형으로 작성한다.

  ```markdown
  <!-- 잘못된 예 -->

  docs(ISSUE-1): 변경 내용을 반영

  문서를 변경했다.

  <!-- 올바른 예 -->

  docs(ISSUE-1): 변경 내용을 반영
  
  문서의 가독성을 높이기 위해 제목의 스타일을 변경한다.
  ```

**[⬆ 맨 위로](#table-of-contents)**

<a name="footer"></a>
## Footer

<a name="footer-references"></a><a name="5.1"></a>
* [5.1](#footer-references) `footer`는 커밋을 통해 종료(close)되는 이슈를 참조한다.

  ```markdown
  docs(ISSUE-1): 변경 내용을 반영
  
  문서의 가독성을 높이기 위해 제목의 스타일을 변경한다.
  
  Closes ISSUE-1
  ```

<a name="footer-breaking-changes"></a><a name="5.2"></a>
* [5.2](#footer-breaking-changes) 하위 호환성을 깨트리는 커밋은 `footer`에 관련된 정보를 기술해야 하며, 깨진 호환성에 대한 정보는 `BREAKING CHANGE:`와 하나의 스페이스 또는 두 개의 줄 바꿈으로 시작한다.

  ```markdown
  docs(ISSUE-1): 변경 내용을 반영

  문서의 가독성을 높이기 위해 제목의 스타일을 변경한다.

  BREAKING CHANGE: 기존과 목차가 달라지고, 섹션으로 가기 위한 링크가 변경된다.

  Closes ISSUE-1
  ```

**[⬆ 맨 위로](#table-of-contents)**

<a name="references"></a>
## 도움이 되는 글

* [How to Write a Git Commit Message -- Chris Beams](https://chris.beams.io/posts/git-commit/)
* [On commit messages -- Peter Hutterer](https://who-t.blogspot.kr/2009/12/on-commit-messages.html) ([번역](https://www.haruair.com/blog/2683))
* [Developer Tip: Keep Your Commits “Atomic” -- Sean Patterson](https://www.freshconsulting.com/atomic-commits/)
* [Writing Good Commit Messages -- D.J. Marcolesco](https://github.com/erlang/otp/wiki/Writing-good-commit-messages) ([번역](http://www.haruair.com/blog/2738))
* [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit)
* [AngularJS Git Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/) ([번역](http://dogfeet.github.io/articles/2013/angularjs-git-commit-message-conventions.html))
* [Conventional Commits](http://conventionalcommits.org/)

**[⬆ 맨 위로](#table-of-contents)**
