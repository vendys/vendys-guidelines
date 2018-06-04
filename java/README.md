# Java Code Style Guide

이 가이드는 벤디스에서 Java로 구성된 코드를 작성할 때 기준이 되는 스타일을 설명한다.

> **노트**: 이 가이드 기준은 같은 path의 checkstyle.xml와 일치시킨다.

## Table Of Contents

1. [소개](#introduction)
   1. [용어정리](#terms)
   1. [Guide notes](#guide-notes)
1. [Source file basics](#source-file-basics)
   1. [파일 명(File name)](#file-name)
   1. [File encoding: UTF-8](#file-encoding)
   1. [특수문자](#special-character)
      1. [공백 문자](#empty-space)
      1. [Special escape sequences](#special-escape-sequences)
      1. [Non-ASCII characters](#non-ascii-characters)
1. [소스 파일 구조](#source-file-structure)
   1. [License 또는 copyright](#license-copyright)
   1. [패키지 - Package](#package)
   1. [임포트 - Import](#import)
      1. [* 를 사용하지 말하주세요](#import-asterisk)
      1. [줄바꿈](#line-alignment)
      1. [순서 및 간격](#alignment-gap)
      1. [Static import 를 사용하지 마세요](#static-import)
   1. [Class 정의](#class-declaration)
      1. [Exactly one top-level class declaration](#one-top-class)
      1. [Class의 내용 작성 순서](#class-contents-alignment)
         1. [Overloads: 나누지 마세요](#class-declaration-overloads)
1. [양식: Formatting](#formatting)
   1. [중괄호 (Braces, { })](#formatting-braces)
      1. [중괄호 사용](#formatting-braces-usage)
      1. [비어있지 않은 블록들: K & R style를 사용해요 ~](#formatting-braces-knr)
      1. [공백블럭 : 간결해 보일 수 있어요](#formatting-braces-empty-block)
   1. [블럭 들여쓰기: +4 Space](#formatting-indentation)
   1. [한 라인에는 한 구문 (One statement per line)](formatting-statement)
   1. [Column 제한: 130 (Column limit: 130)](#formatting-column)
   1. [줄바꿈 (Line-wrapping)](#formatting-line-wrapping)
      1. [어디서 줄바꿈 할까요?](#formatting-line-wrapping-usage)
      1. [개행은 최소 +4 Space 이상씩](#formatting-line-wrapping-indentation)
   1. [공백](#formatting-empty-space)
      1. [빈 줄: Blank-line](#formatting-empty-space-black-line)
      1. [공백문자](#formatting-empty-space-character)
      1. [수평 정렬](#formatting-empty-space-horizontal)
   1. [연산구문에 괄호 삽입: 추천!](#formatting-parenthesis)
   1. [구체적인 생성자](#formatting-constructor)
      1. [Enum classes](#formatting-constructor-enum)
      1. [변수 선언](#formatting-constructor-variables)
         1. [하나의 선언에 하나의 변수](#formatting-constructor-variables-per-declaration)
         1. [필요시 선언](#formatting-constructor-variables-need)
      1. [배열](#formatting-constructor-array)
         1. [배열 초기화: 블럭 스타일 가능](#formatting-constructor-array-style)
         1. [C언어 스타일로 배열선언하지 않는다 No C-style array declarations](#formatting-constructor-array-c-style)
      1. [Switch 구문](#formatting-constructor-switch)
         1. [들여쓰기](#formatting-constructor-switch-indentation)
         1. [실패 표기: commented](#formatting-constructor-switch-commented)
         1. [default case의 표현 The default case is present](#formatting-constructor-switch-default-case)
      1. [Annotations](#formatting-constructor-annotations)
      1. [Comments](#formatting-constructor-comments)
         1. [블럭 주석 스타일](#formatting-constructor-comments-block)
      1. [접근제어자](#formatting-constructor-access-modifier)
      1. [숫자](#formatting-constructor-number)
1. [이름짓기: Naming](#naming)
   1. [식별자 이름의 짓기](#naming-name)
   1. [식별자 타입 규칙](#naming-types)
      1. [Package 명](#naming-types-package)
      1. [Class 명](#naming-types-class)
      1. [Method 명](#naming-types-method)
      1. [Constant(상수) 명](#naming-types-constant)
      1. [Non-constant field 명](#naming-types-non-constant)
      1. [Parameter 명](#naming-types-parameter)
      1. [Local variable 명](#naming-types-local-variable)
      1. [Type variable 명](#naming-types-type-variable))
   1. [Camel case: 정의](#naming-camel)
1. [Programming Practices](#practices)
   1. [@Override: 항상 사용하세요](#practices-override)
   1. [예와처리: Caught exceptions: 제발 무시하지 마세요](#practices-excaption)
   1. [정적 멤버: Static members: class 명시하기](#practices-static)
   1. [Finalizers: 그냥 쓰지 마세요](#practices-finalizers)
1. [Javadoc](#javadoc)

## 배경

```markdown
벤디스에서는 Java언어를 기반으로 Spring Framework 또는 Android 개발업무를 진행한다
어느정도 초안이 잡힌 후 git 저장소로 이동할 예정이다
```

<a name="introduction"></a>
## [1](#introduction) 소개(Introduction)

```markdown
벤디스 Java code style 을 정의하기 위한 문서, 이 코드 스타일은 개발자간의 협의를 통해 변경 발전시키며,
서로 이해하기 쉬운 코드, 오류를 줄여줄 수 있는 코드
작성을 목적으로 한다
```

<a name="terms"></a>
### [1.1](#terms) 용어정리

다른 정의가 있지 않는 한 이 분서 안에서는 아래 정의를 따른다:

* class : 보편적인 class를 포함하여 enum class, interface, annotation type 모두를 포함한다
* member(멤버) : 중첩된 클래스를 포함하며, 필드변수, 메서드, 생성자 등 코멘트와 초기화구문은 제외하고 상위클레스에 포함된 모든것을 뜻한다
* comment : 문서화 될 수 있는 (주석을 제외한) 문구만을 뜻한다. "documentation comment" 대신 "javadoc"을 사용하기도 한다

<a name="guide-notes"></a>
### [1.2](guide-notes) Guide notes

예제코드는 엄격하게 지겨질 필요는 없으며, 예는 예로 받아들이자, 예제에 작성된 포멧은 임의로 지정된것이며 룰로서 적용하지 않는다

<a name="source-file-basics"></a>
## [2.](#source-file-basics) Source file basics

<a name="file-name"></a>
### [2.1](#file-name) 파일 명(File name)

.java 확장자를 이용하며, 대소문자를 구분하여 파일명과 같은 top-level class의 명칭과 같아야 한다.

<a name="file-encoding"></a>
### [2.2](#file-encoding) File encoding: UTF-8

UTF-8로 엔코딩 하자.

<a name="special-character"></a>
### [2.3](#special-character) 특수문자

<a name="empty-space"></a>
#### [2.3.1](#empty-space) 공백 문자

* 개행문자를 제외하고, ASCII horizontal space character (0x20)만을 이용하여 공백을 표현한다
* 문자열 안에 존재하는 모든 다른 공백문자는 그대로 사용한다.
* Tab characters를 indentation에 사용하지 않는다

<a name="special-escape-sequences"></a>
#### [2.3.2](#special-escape-sequences) Special escape sequences

특수문자는 특수치환문자를 이용하여 기록한다 (\b, \t, \n, \f, \r, \", \' and \\), (e.g. /012, /u000a)

<a name="non-ascii-characters"></a>
#### [2.3.3](#non-ascii-characters) Non-ASCII characters

**읽기 쉽고 이해하기 쉬운 코드로 대체한다.(유니코드 가능)**

예로 ∞ 그대로 표현할 수 있지만 상황에 따라 \u221e 으로 표현할 수도 있으나 만드시 뒤에 그에 대한 해석을 주석으로 작성하자.

Examples:

|Example|Discussion|
|-|-|
|String unitAbbrev = "μs";| 멋져! : 별다른 주석없이 그대로 쓰세요|
|String unitAbbrev = "μs"; // "s" |허용, why not?|
|String unitAbbrev = "\u03bcs"; // Greek letter mu, "s" |허용, 그러나 좀 어색하고 실수할수도..|
|String unitAbbrev = "\u03bcs"; |최악! : 어디다 넣어봐야하나?|
|return '\ufeff' + content; // byte order mark |굳! : 출력가능한 문자를 사용하라 그리고 주석 필수!|
**Tip:** 코드의 가독성을 절대 낮추지 마세요. 몇몇 프로그램들이 ASCII에 속하지 않는 문자를 제대로 다루지 못할수도 있지만, 그 프로그램은 **고장났거나**, **고쳐지거나**, 그 프로그램을 **떠나겠지요.**

<a name="source-file-structure"></a>
## [3](#source-file-structure) 소스 파일 구조

순서는 아래와 같은 순서로 구성해 주세요

1. 제공되어야 한다면, 라이센스 또는 카피라이트 정보
1. 패키지
1. 임포트
1. 하나의 top-level class 선언

**정확하게 하나의 개행** 으로 각 섹션을 구분하여 선언되어야 한다.

<a name="license-copyright"></a>
### [3.1](#license-copyright) License 또는 copyright 정보를 제공해야 한다면

파일 내에 license 또는 copyright 정보를 제공해야 한다면, 가장 위에 주석으로 작성해주세요

<a name="package"></a>
### [3.2](#package) 패키지 - Package

패키지 구문은 줄바꿈 없이 작성해 주세요. 열의 제한(Section4.4, limit: 130)은 패키지 구문에서 예외입니다.

<a name="import"></a>
### [3.3](#import) 임포트 - Import

<a name="import-asterisk"></a>
#### [3.3.1](#import-asterisk)  * 를 사용하지 말하주세요

Wildcard(\*), static import는 금지합니다. 소스코드가 어떤 클래스를 이용하는지 불명확해져요.

예외: JUnit test 에서는 허용해 드릴께요 :)

<a name="line-alignment"></a>
#### [3.3.2](#line-alignment) 줄바꿈

import 문은 줄바꿈하지 마세요. Section 4.4의 규칙에 적용되지 않아요

<a name="alignment-gap"></a>
#### [3.3.3](#alignment-gap) 순서 및 간격

* import java.*
* import javax.*
* import org.springframework.*
* blank line
* import all other imports
* blank line
* import com.vendys.*
* blank line
* import static all other imports (junit 에서서만 사용하세요)

<a name="static-import"></a>
#### [3.3.4](#static-import) Static import 를 사용하지 마세요

[Static import를 사용하면?](https://xxxelppa.tistory.com/38)

링크와 같이 메소드를 class참조 없이 사용할 경우 class내의 메소드로 오해할 수 있어요

예외: 위에도 있지만 JUnit test 에는 자유롭게 쓰세요 :)

<a name="class-declaration"></a>
### [3.4](#class-declaration) Class 정의

#### [3.4.1](#one-top-class) Exactly one top-level class declaration

하나의 파일에는 정확히 하나의 top-level class만 작성해 주세요.

Nested class는 괜찮습니다 :)

<a name="class-contents-alignment"></a>
#### [3.4.2](#class-contents-alignment) Class의 내용 작성 순서

1. static fields 변수
1. normal fields 변수
1. 객체 생성자(optional)
1. 다른 메소드 (논리적 순서에 따라 작성하세요)
1. equals, hashCode, toString

class안에 member가 어떻게 위치하냐에 따라서 읽는 사람이 이해하는 속도에 큰 영향을 줄 수 있어요. 이에 명확하고 올바는 방법은 없어요. class마다 다른 순서로
작성될 꺼에요.

중요한 점은 각 class는 유지보수를 담당하는 사람이 설명할 수 있을정도로 논리적인 순서에 따라 작성된다는 점 입니다.

예로, 습관적으로 새로운 메소드를 class 끝에 작성하는 경우입니다. 논리적 순서에 따라 작성해 주세요.

<a name="class-declaration-overloads"></a>
##### [3.4.2.1](#class-declaration-overloads) Overloads: 나누지 마세요

같은 이름을 가진 생성자들 및 오버로딩된 메서드들은 같은 곳에 작성해주세요.

만약 여러개의 생성자를 가진 class나 같은 이름의 메소드등을 연속적으로 작성해주세요. 그 사이에는 private member라도 쓰시면 안돼요.

<a name="formatting"></a>
## [4](#formatting) 양식: Formatting

용어 참고: 블럭은 class의 내용, 하나의 메서드 또는 생성자를 뜻합니다. Array의 초기화 부분은 하나의 블럭으로 해석될 수 있어요.

<a name="formatting-braces"></a>
### [4.1](#formatting-braces) 중괄호 (Braces, { })

<a name="formatting-braces-usage"></a>
#### [4.1.1](#formatting-braces-usage) 중괄호 사용

if, else, for, do, while에 사용할 경우에는 내용이 없거나 한줄의 구문만 있더라도 중괄호를 작성해주세요.

해당 명령어의 scope가 명확해져요.

<a name="formatting-braces-knr"></a>
#### [4.1.2](#formatting-braces-knr) 비어있지 않은 블록들: K & R style를 사용해요 ~

Kernighan 과 Ritchie 스타일("Egyptian brackets")를 블록에 사용해주세요. 내용이 있어도, 혹은 없더라도요.

* 중괄호 시작전에 개행을 하지 마세요.
* 시작 중괄호 이후에 개행 해주세요.
* 종료 중괄호 이전에 개행 해주세요.
* 종료 중괄호가 명령어 구문, 메소드, 생성자, 클래스의 종료인 경우 개행해주세요. 예로, 종료 중괄호 뒤에 else나 ,가 올 경우 개행하지 않아요.

Examples:

```java
return () -> {
    while (condition()) {
        method();
    }
};

return new MyClass() {
    @Override public void method() {
        if (condition()) {
            try {
                something();
            } catch (ProblemException e) {
                recover();
            }
        } else if (otherCondition()) {
            somethingElse();
        } else {
            lastThing();
        }
    }
};
```

Enum 클래스(Section 4.8.1) 및 lambda(4.5.1) 표현식에는 예외가 있어요.

<a name="formatting-braces-empty-block"></a>
#### [4.1.3](#formatting-braces-empty-block) 공백블럭 : 간결해 보일 수 있어요 (Empty blocks: may be concise)

빈 블럭이나 생성자 블럭도 K & R 스타일로 해도 좋아요. 그러나 내용에 아무것도 없다면 쓸모가 없잖아요? 다중 블럭 구문(if/else, try/catch/finally)을
제외하고는 아래와 같이 허용해요.

Examples:

```java
// 가능 !
void doNothing() {}

// 물론 가능 !
void doNothingElse() {
}

// 이건 안되요 ~ if/else도 하면 안됩니다
try {
    doSomething();
} catch (Exception e) {}
```

<a name="formatting-indentation"></a>
### [4.2](#formatting-indentation) 블럭 들여쓰기: +4 Space

각 블럭은 4 space로 들여쓰기 하세요

<a name="formatting-statement"></a>
### [4.3](formatting-statement) 한 라인에는 한 구문 (One statement per line)

명령 구문마다 개행 해주세요. 세미콜론으로 개행 해주시면 되겠죠?

<a name="formatting-column"></a>
### [4.4](#formatting-column) Column 제한: 130 (Column limit: 130)

1 Column은 하나의 유니코드 기준으로 하나의 글자를 뜻해요. 이 기준으로 한줄에 130이 넘지 않게 해주세요.

이 기준은 엄격히 지켜주세요. 개발자 뿐만이 아니라 reviewer, 다양한 방법으로 코드를 읽는 사람들을 배려하기 위해서에요.

우리는 github에서 보여기는 Column 기준으로 설정했어요.

예외:

* Javadoc의 url이나, JSNI의 긴 메소드 참조에는 줄바꿈하지 마세요.
* Swagger fox annotation으로 API문서 생성을 위한 코드도 줄바꿈하지 안하도 좋아요.
* package나 import 구문도 하지 마세요 (Section 3.2, Section 3.3)
* 코멘트에 작성된 명령어 라인들도 줄바꿈 하지 마세요 shell에 cut-and-pasted 하기 좋게요.

<a name="formatting-line-wrapping"></a>
### [4.5](#formatting-line-wrapping) 줄바꿈 (Line-wrapping)

**용어 참고:** 한 줄로 표현할 수 있는 코드를 여러줄로 나누는것은 줄바꿈 이라고 해요.

모든 상황에 정확히 옳은 방식으로 줄바꿈하는 공식은 없어요. 그래도 대부분 적절한 경우가 많은 몇가지 기준은 있어요.

**참고:** 줄바꿈은 대부분 열의 제한을 넘어서 바꾸는 경우가 많지만, 실제로 열제한 내에 들어가더라도 작성자의 재량에 따라 줄바꿈 할 수 있어요.

**팀:** 메서드 또는 로컬변수를 발췌하면 줄바꿈 하지 않을수도 있어요.

<a name="formatting-line-wrapping-usage"></a>
#### [4.5.1](#formatting-line-wrapping-usage) 어디서 줄바꿈 할까요?

줄바꿈의 중요한 규칙은 **명령구문의 높은 단계**에서 수행하는 거에요. 쉽게는 아래의 우선순위로 개행하면 좋아요.

```java
public void static main(
                        String[] args,
                        Member[] members
                        ) throws Exception {
    // [1]
    if (isLoginClient
            || isLogoutPermission
            || isLogoutPermission) {
        operationMethod();
    }

    // [2]
    list.stream()
            .each(x -> {
                // statements
            }).map();
    // [3]
    list.stream()
            .each(x -> {
                // statements
            })
            .map();
    int a
            = "abcd";
}
```

1. 연산자( .  ::  &  |  ) 앞에서 개행하세요.
1. 메서드와 명령어(if, while 등)의 파라메터를 개행 할 경우 연산자 앞에서 개행하고 해당 block에서 2단계 들여쓰기 해주세요.
1. 변수 할당이 아닌 연산자의 줄바꿈은 연산자 전에서 개행 해주세요
  * 이 규칙은 연산자와 같은 모든 문자에 적용됩니다.
    1. 닷 연산자 (.)
    1. 메소드 참조 연산자 (::)
    1. ampersand 연산자 (<T extends Foo & Bar>)
    1. catch 블록의 파이프
    1. (catch (FooException | BarException e))
1. 변수 할당 연산자의 경우에는 해당 연상자 뒤에서 개행해주세요. 그러나 전에 하여도 상관은 없어요
  * 이 규칙은 for, foreach 문에서의 콜론에도 해당됩니다
  * A a = "ddddd";
1. 생성자와 메소드명의 시작 괄호(()는 메소드명 뒤에 공백없이 붙여주세요
1. 콤마(,)를 사용할 경우 해당 앞문자에 공백없이 붙여주세요
1. 람다 화살표에 인접하여 개행을 하지 말아주세요. 단, 람다식이 하나의 구문만 있을경우 Bracer({})를 생략하고 화살표에서 개행할 수 있어요
  * 예:

```java
MyLambda<String, Long, Object> lambda =
    (String label, Long value, Object obj) -> {
        ...
    };
```

```java
Predicate<String> predicate = str ->
        longExpressionInvolving(str);
```

**참고:** 제일 중요한 목표는 깨끗한 코드를 쓰기 위함이에요. 절대로 적은 라인의 코드를 작성하기 위해서가 아님을 기억 해 주세요.

<a name="formatting-line-wrapping-indentation"></a>
#### [4.5.2](#formatting-line-wrapping-indentation) 개행은 최소 +4 Space 이상씩 들여쓰기 하기

개행을 할 경우 최소 4space 이상씩 들여쓰기를 해주세요

여러단계 이상 들여쓰기 할경우 최소 4space이상이 필요해요. 보통 두 단계를 들여쓰기 할 경우 논리적으로 평행한 요소끼리 정렬 해 주세요

Section 4.6.3 처럼 이전 라인과 기준이 맞도록 수평정렬 해주세요.

<a name="formatting-line-wrapping-indentation"></a>
### [4.6](#formatting-empty-space) 공백

빈 줄과, 공백문자를 사용하는 규칙을 정의해 Boa yo.

<a name="formatting-empty-space-black-line"></a>
#### [4.6.1](#formatting-empty-space-black-line) 빈 줄: Blank-line

Blank-line 을 넣는 기준은 아래와 같아요

1. 필드변수 선언, 메소드, 중첩클래스, static 구문 객체 초기화의 사이에 넣어주세요.
  * 예외: 필드변수 선언을 연달아 선언하더라도, 그 사이에 논리적 구분에 따라 변수들은 그룹지어 사이에 빈 줄을 추가할 수 있어요. 단, 그 사이 다른
소스코드는 작성하지 마세요.
  * 예외: enum의 내용사이에 공백이 들어갈 수 있어요. 자세한 내용은 Section 4.8.1을 참조해주세요.
1. 한 블럭 안에 있는 명령어 라인 사이사이에 논리적 항목에 따라 자유롭에 넣어 주세요.
1. class의 첫 번째줄, 또는 블럭내 첫번째 라인에 빈 줄을 넣을 수 있어요. 그렇지만 이 기준을 장려하거나 제한하지 않기로 해요.
1. 위 내용 외 다른 Section에서 정의한 내용대로 넣어주세요. (소스파일구조:Section3 또는 import 구문:Section 3.3)

2줄 이상의 빈줄을 추가하셔도 좋아요. 어느곳도 필수가 아니에요.

<a name="formatting-empty-space-character"></a>
#### [4.6.2](#formatting-empty-space-character) 공백문자

아래에 정의하는 언어 및 스타일에 따라서 하나의 ASCII 공백문자를 넣어 주세요.

1. 예약어(if, for, catch)와 시작 소괄호 사이
  * if (
1. 예약어(else, catch)의 종료 중괄호 사이
  * } else
1. 모든 시작 중괄호({) 앞, 단 2개의 예외가 있어요.
  * @SomeAnnotation({a, b}) 경우 공백문자를 삽입하지 않아요
  * String[][] x = {{"foo"}}; 경우 공백문자를 삽입하지 않아도 돼요. 9번항목을 참고해 주세요
1. 연산자 문자 앞뒤로 한개씩 공백문자를 넣어주세요
  * Ampersend(&) 앞 뒤: <T extends Foo & Bar>
  * Pipe(|) 앞 뒤: catch (FooException | BarException e)
  * for문(foreach)에 쓰이는 Colon(:) 앞 뒤
  * lambda 표현식에서 arrow function 앞뒤: (String str) -> str.length()
  * 예외
    1. 두개의 Colon(::)으로 메서드를 참조할 경우 : Object::toString
    1. Dot(.)을 사용한 표현일 경우: object.toString()
1. ( , : ; ) 앞의 각 문자 다음 (단, 명령줄이 끝나는 ; 뒤에는 공백문자를 넣지 않아요)
1. 타입 캐스팅시의 종료 소괄호()) 다음
1. 두개의 슬래시(//)의 내용에 시작과 끝에 삽입한다. 여러개의 공백도 허용하나 필수는 아니에요
1. 변수의 타입과 선언의 사이: List<String> list
1. 배열 초기화시 선택적으로 중괄호에 공백을 넣을 수도 있어요.
  * new int[] { 5 , 6 } 와 new int[] { 5 , 6 } 모두 괜찮아요.

각 줄의 시작이나 끝에 추가적인 공백을 넣지 않는 규칙은 다른 어떤 규칙에도 우선순위로 작용하는 점 기억해 주세요.

<a name="formatting-empty-space-horizontal"></a>
#### [4.6.3](#formatting-empty-space-horizontal) 수평 정렬

**용어 참고:** 수평 정렬은 이전 혹은 다음라인과 붙어있을 경우 몇개의 추가적인 공백을 소스코드에 삽입하는것을 말해요.

이런 공백들은 허용하나 필수는 아니에요. 따라서 이미 수평정렬을 쓰거나 쓰지 않았다고 해서 수정할 필요는 없어요.

아래는 정렬의 적용 여부에 따른 예시에요. 단, 타입과 변수명 사이는 수평정렬하지 마세요.

```java
private int x; // this is fine
private Color color; // this too

private int x; // permitted, but future edits
private Color color; // may leave it unaligned
```

이 정렬은 어떤 변태적인 포멧팅 욕구를 가진 변태들을 만족시키기도 해요.

추후 긴 이름의 변수를 추가할 경우에 다른줄도 정렬하는 불필요한 업무가 늘어나고, 버전관리 정보의 정확성 저하, 리뷰속도 저하, merge conflict를 발생시킬 수
있어요.

그러나 정렬하지 않는 경우에도 유지보수시 가독성을 어렵게 할 수도 있어요.

그래서 이건 여러분의 선택에 맡길게요 !

<a name="formatting-parenthesis"></a>
### [4.7](#formatting-parenthesis) 연산구문에 괄호 삽입: 추천!

모든 사람이 Java의 연산자 우선순위 테이블을 기억하고 있지 않아요. 알고 있다고 하더라도 소괄호로 구분된 것이 이해하는 속도가 빨라요.

그러니까, 적극적 사용 추천 !

예: ( a + (b + c) + d)

<a name="formatting-constructor"></a>
### [4.8](#formatting-constructor) 구체적인 생성자

<a name="formatting-constructor-enum"></a>
#### [4.8.1](#formatting-constructor-enum) Enum classes

enum class 내용중 콤마 뒤에 개행을 하거나 하지 않는것은 취향에 따라 하세요 ~

아래와 같이 사용할 때는 하나의 빈 줄을 추가해도 좋아요

```java
private enum Answer {
    YES {
        @Override public String toString() {
            return "yes";
        }
    },

    NO,
    MAYBE
}
```

enum class에 주석이나 메서드가 없을경우 아래와 같이 작성해 좋아요.

private enum Suit { CLUBS, HEARTS, SPADES, DIAMONDS }

하지만 주석이나 메서드 등이 들어갈 경우 다른 class와 같은 포멧팅 규칙을 지켜주세요.

<a name="formatting-constructor-variables"></a>
#### [4.8.2](#formatting-constructor-variables) 변수 선언

<a name="formatting-constructor-variables-per-declaration"></a>
##### [4.8.2.1](#formatting-constructor-variables-per-declaration) 하나의 선언에 하나의 변수

변수의 선언시 반드시 하나만 선언해 주세요. int a, b; 는 안되요.

예외: for문의 header에는 여러개의 동시선언을 허용합니다 : for(int i = 0, j = 0; i<10; i++)

<a name="formatting-constructor-variables-need"></a>
##### [4.8.2.2](#formatting-constructor-variables-need) 필요시 선언

메서드 내에서 로컬 변수를 습관적으로 생성자처럼 시작에 모두 선언하는 분들이 계세요.

하지만 우리는 그 변수가 처음 사용이 시작되는 부분에 선언하기로 해요.

해당 변수에 접근할 수 있는 범위를 취소화 할수록 버그 확율이나 오해의 확율도 적어지기 때문이에요

우리는 최소한 선언한 다음 10줄 이내 변수를 사용하도록 체크해요.

이 항목이 제약으로 작용하여 필요한 로직을 구현하지 못할 수 있는 경우에는 넘어도 좋아요

<a name="formatting-constructor-array"></a>
#### [4.8.3](#formatting-constructor-array) 배열

<a name="formatting-constructor-array-style"></a>
##### [4.8.3.1](#formatting-constructor-array-style) 배열 초기화: 블럭 스타일 가능

모든 배열의 초기화를 아래중 이해하고 작성하기 편한 방법으로 작성해 주세요.

다만 아래의 예를 엄격하게 따를 필요는 없어요. 비스므리하게, 목표는 언제나 이해하기 쉽게 !

```java
new int[] {
    0 , 1 , 2 , 3
};

new int[] {
    0 ,
    1 ,
    2 ,
    3 ,
};

new int[] {
0 , 1 ,
2 , 3
};

new int[]
    { 0 , 1 , 2 , 3 };
```

<a name="formatting-constructor-array-c-style"></a>
##### [4.8.3.2](#formatting-constructor-array-c-style) C언어 스타일로 배열선언하지 않는다 No C-style array declarations

배열 선언시에는 변수가 아닌 타입에 대괄호를 넣어 배열을 선언해주세요

우리는 배열 '타입'을 선언하니까요

String[] args, not String args[].

<a name="formatting-constructor-switch"></a>
#### [4.8.4](#formatting-constructor-switch) Switch 구문

용어 참고: Switch 블록의 중괄호 안에는 하나 이상의 명령문 그룹이 있어요. 각 명령문 그룹은 하나 이상의 case( case FOO: or default: )다음에 작성하고,
마지막 case의 경우 0개 이상의 명령문 그룹으로 작성해요.

<a name="formatting-constructor-switch-indentation"></a>
##### [4.8.4.1](#formatting-constructor-switch-indentation) 들여쓰기

모든 블록의 들여쓰기는 +4 Sapce로 들여쓰기 해주세요

case 이후 새 블록이 생건것과 같이 개행을하고 +4 Space로 들여쓰기 합니다. 다음 case 는 블록이 닫인것처럼 이전 들여쓰기 수준으로 돌아가 주세요

<a name="formatting-constructor-switch-commented"></a>
##### [4.8.4.2](#formatting-constructor-switch-commented) 실패 표기: commented

해당 명령문 블록에서 해당 case에서 다음 명령문 그룹으로 계속될 수 있는 경우 주석으로 표기하기로 해요.

사람의 욕심은 끝이 없고 같은 실수를 반복하기 때문에 break; 와 반대되는 표시를 주석으로 적어주세요.

```java
switch (input) {
    case 1 :
    case 2 :
        prepareOneOrTwo();
        // fall through
    case 3 :
        handleOneTwoOrThree();
        break;
    default:
        handleLargeNumber(input);
}
```

case 1 :, 의 경우에는 주석이 필요하지 않아요. 오직 명령문 그룹의 끝에만 작성해 주세요

<a name="formatting-constructor-switch-default-case"></a>
##### [4.8.4.3](#formatting-constructor-switch-default-case) default case의 표현 The default case is present

default case 에 명령문 그룹이 없는 경우에도 default case는 무.조.건 작성해 주세요

<a name="formatting-constructor-annotations"></a>
#### [4.8.5](#formatting-constructor-annotations) Annotations

Annotation은 클래스, 메서드, 생성자 등에 적용되고 각 한줄당 하나의 Annotation으로 작성해주세요.

Annotation은 줄바꿈 규칙이 적용되지 않습니다. 아래는 작성 예입니다.

```java
@Override
@Nullable
public String getNameIfPresent() { ... }
```

**예외:** 하나의 Annotation은 아래와 같이 첫 라인에 같이 사용할 수 있어요.

```java
@Override public int hashCode() { ... }
```

Annotations을 필드변수에 적용할 경우에는 문서화(javadoc)부분 바로 다음에 작성하고, 여러개인 경우에 같은 줄에 나열할 수 있어요.

```java
@Partial @Mock DataLoader loader;
```

파라메터, 로컬변수 타입에 붙는 Annotation에 자세한 규칙은 없으니 읽기 편하도록 작성해 주세요

Annotation의 변수와 타입에는 정확한 룰이 없습니다

<a name="formatting-constructor-comments"></a>
#### [4.8.6](#formatting-constructor-comments) Comments

javadoc으로 출력되는 주석에 대해서는 Section 7 에서 자세히 다룰께요

주석안에는 공백문자와 줄 바꿈을 자유롭게 쓰실 수 있다는것만 기억해 주세요.

<a name="formatting-constructor-comments-block"></a>
##### [4.8.6.1](#formatting-constructor-comments-block) 블럭 주석 스타일

블럭 주석은 코드와 같은 들여쓰기 단계에서 작성해 주세요. 다중라인 구성시에는 항상 \*으로 라인을 시작해주세요. \*은 이전 라인의
\* 과 같은 column으로 맞추어 주세요

```java
/*
 * This is
 * okay.
 */

// And so
// is this.

/* Or you can
 * even do this. */
```

주석 작성시 * 이나 다른 어떤 문자로도 박스를 그리지 마세요.

Tip: 여러 줄을 이용할 경우 /* ... \*/ 를 이용하고 //로 여러줄을 구성하지 않습니다.

<a name="formatting-constructor-access-modifier"></a>
#### [4.8.7](#formatting-constructor-access-modifier) 접근제어자

클래스나 멤버의 접근제어자는 자바언어 스팩과 같이 아래와 같은 순서로 작성해 주세요.

public protected private abstract default static final transient volatile synchronized native strictfp

<a name="formatting-constructor-number"></a>
#### [4.8.8](#formatting-constructor-number) 숫자

long L. 1.

예) 3000000000L, not 3000000000l;

<a name="naming"></a>
## [5](#naming) 이름짓기: Naming

<a name="naming-name"></a>
### [5.1](#naming-name) 식별자 이름의 짓기

식별자는 아스키 문자와 숫자만 사용하고, 아래에 정의하는 경우에 따라서는 '\_'을 사용할 수 있어요. 식별자 이름은 정규식 \w+ 와 일치해요.

예로 name\_, mName, s_name, kName같은 특수 접두사 또는 접미사는 사용하지 마세요.

<a name="naming-types"></a>
### [5.2](#naming-types) 식별자 타입 규칙

<a name="naming-types-package"></a>
#### [5.2.1](#naming-types-package) Package 명

패키지명은 모두 소문자로 구성하며, 연속단어는 '\_' 없이 연속으로 붙여 작성해주세요.

예로, com.example.deepsleelp, not com.example.deepSleep 이나 com.example.deep_sleep

<a name="naming-types-class"></a>
#### [5.2.2](#naming-types-class) Class 명

클래스명은 UpperCamelCase로 작성해 주세요.

클래스 이름은 일반적으로 명사 또는 명사구로 작성하나, 때로는 형용사를 쓰셔도 좋습니다. 예: ImmutableList, Readable

Annocation class 의 명명법은 특정 규칙이나 잘 정립된 내용이 없으니, 여러분들의 선택을 믿겠어요.

Test 클래스는 테스트할 클래스의 이름으로 시작하여 Test로 끝나도록 작성해 주세요.

<a name="naming-types-method"></a>
#### [5.2.3](#naming-types-method) Method 명

메서드 명은 lowerCamelCase로 작성해주세요.

메서드 명은 일반적으로 동사나 동사구로 작성합니다.

'\_'는 JUnit 테스트에만 사용하고, 각 내용은 lowerCamelCase로 작성해주세요

전형적인 패턴중 하나는 <methodUnderTest>\_<state>로 작성하는 경우입니다, 예로 pop_emptyStack이 있어요.

테스트명의 명명규칙도 특별히 올바른 방법이 없어요. 한글을 쓰셔도 좋습니다.

<a name="naming-types-constant"></a>
#### [5.2.4](#naming-types-constant) Constant(상수) 명

상수 이름은 CONSTANT_CASE 로 모두 대문자로 사용하며 단어는 '\_'로 구분합니다, 그러나 어떤게 상수일까요?

상수는 static final 변수가 정말로 불변이고, 부작용이 있을 수 없는 변수입니다. 상수에는 primitive 타입 및 문자열 immutable type과
변경불가능한(Immutable) collection도 포함되요.

만약 객체가 변할 수 있는 것들은 상수가 아니에요. 상수는 객체를 변경하지 마세요 라는 의미로는 충분하지 않습니다.

```java
// Constants
static final int NUMBER = 5 ;
static final ImmutableList<String> NAMES = ImmutableList.of("Ed", "Ann");
static final ImmutableMap<String, Integer> AGES = ImmutableMap.of("Ed", 35 , "Ann", 32 );
static final Joiner COMMA_JOINER = Joiner.on(','); // because Joiner is immutable
static final SomeMutableType[] EMPTY_ARRAY = {};
enum SomeEnum { ENUM_CONSTANT }

// Not constants
static String nonFinal = "non-final";
final String nonStatic = "non-static";
static final Set<String> mutableCollection = new HashSet<String>();
static final ImmutableSet<SomeMutableType> mutableElements = ImmutableSet.of(mutable);
static final ImmutableMap<String, SomeMutableType> mutableValues =
ImmutableMap.of("Ed", mutableInstance, "Ann", mutableInstance2);
static final Logger logger = Logger.getLogger(MyClass.getName());
static final String[] nonEmptyArray = {"these", "can", "change"};
```

상수의 이름은 보통 명사과 명사구로 이루어집니다

<a name="naming-types-non-constant"></a>
#### [5.2.5](#naming-types-non-constant) Non-constant field 명

static또는 다른 필드 변수도 모두 lowerCamelCase로 작성해 주세요.

보통 명사와 명사구로 이루어집니다.

예외: Spring framework에서 사용하는 properties 에 대응하는 필드 변수는 Upper case로 사용하며 단어는  '\_' 로 구분합니다. 해당 변수는 명령어 구문 내
재할당을 하지 마세요.

<a name="naming-types-parameter"></a>
#### [5.2.6](#naming-types-parameter) Parameter 명

파라메터명은 lowerCamelCase로 작성해 주세요

public 메서드의 파라메터를 하나의 문자로 표현하는것은 가능한 피해야 합니다

catch 문의 파라메터도 이에 포함되요

<a name="naming-types-local-variable"></a>
#### [5.2.7](#naming-types-local-variable) Local variable 명

로컬 변수는 lowerCamelCase로 작성해 주세요.

변경불가능한 상수일지라도 필드 상수의 스타일을 따르지 않아요.

<a name="naming-types-type-variable"></a>
#### [5.2.8](#naming-types-type-variable)) Type variable 명

아래의 스타일 중 하나를 따라 주세요.

* 하나의 대문자를 이용하고 하나의 숫자를 붙일 수 있다 ( E, T, X, T2)
* class 명의 스타일을 따르되, 대문자 T를 접미사로 활용한다(예: RequestT, FooBarT)

<a name="naming-camel"></a>
### [5.3](#naming-camel) Camel case: 정의

영어를 Camel case로 작성할 경우 camel case보다 더 가독성이 좋은 경우도 존재해요. 예로 "IPv6"나 "iOS"의 경우이죠. 하지만, 예측 가능성을 높이기 위하여
아래의 스타일을 따르기로 해요.

Camel case로 이름 작성하기:

1. 모든 문구를 ASCII 코드로 전환하고 (') 를 모두 제거해주세요. 예로 "Mller's algorithm" 를 전환하면 "Muellers algorithm"가 돼요.
1. 각 단어별로 분리하여 공백 또는 구분점을 넣어주세요.
  * 추천: 단어가 이미 camel-case의 구조를 가지고 있다면 단어의 구성요소로 나누어 주세요. (e.g., "AdWords" → "ad words"). 확실히
말하자면 "iOS"는 camel-case가 아니에요. "iOS"에는 이 방법을 적용하지 마세요.
1. 이제 각 단어의 첫 글자를 대문자로 바꿔주세요
  * Upper camel case 라면 모든 단어에 적용하세요
  * Lower camel case 라면 첫 단어를 제외하고, 모든단어에 적용하세요
1. 마지막으로, 이제 구분점을 제거하고 붙여주세요

확실히 말하지만 본래 단어의 대소문자는 모두 무시됩니다.

Examples:

|Prose form|Correct|Incorrect|
|-|-|-|
|"XML HTTP request"|XmlHttpRequest|XMLHTTPRequest|
|"new customer ID"|newCustomerId|newCustomerID|
|"inner stopwatch"|innerStopwatch|innerStopWatch|
|"supports IPv6 on iOS?"|supportsIpv6OnIos|supportsIPv6OnIOS|
|"YouTube importer"|YouTubeImporter YoutubeImporter*||

\*표시된 항목은 가능은 하나 가능하면 추천하지 않아요

**주:** 일부 단어는 모호하게 하이픈을 사용하여 표시됩니다. 예로 "nonempty"와 "none-empty"는 모두 맞으므로, "checkNonempty", "checkNonEmpty" 모두
가능해요.

<a name="practices"></a>
## [6](#practices) Programming Practices

<a name="practices-override"></a>
### [6.1](#practices-override) @Override: 항상 사용하세요

메소드에 @Override를 메소드에 사용하는것은 좋습니다. superclass의 메소드를 overriding 하는것, interface 메소드를 구현하거나 재정의 하는 경우에는 @Override를 사용해 주세요

**예외:** @Deprecated와 함께 쓰일경우 @Override은 누락해도 좋습니다.

<a name="practices-excaption"></a>
### [6.2](#practices-excaption) 예와처리: Caught exceptions: 제발 무시하지 마세요

모든 catch 블럭에는 그 상황에 따른 처리를 해주셔야 합니다.

다만, 아주 가끔 일어나는 아래와 같은 상황은 catch 블럭에 아무 내용도 들어가지 않습니다. (보통 내용으로는 로그, 불가능한 경우에는 AssertionError를
rethrow 합니다)

정말로 진짜로 누가생각해도 catch 블럭에 아무 명령문도 필요없을 때만 비워주세요. 그 이유는 아래와 같이 주석으로 설명해주세요.

```java
try {
    int i = Integer.parseInt(response);
    return handleNumericResponse(i);
} catch (NumberFormatException ok) {
    // it's not numeric; that's fine, just continue
}
return handleTextResponse(response);
```

**예외:** 테스트에서는 catch된 예외가 이름만으로 충분히 이해 가능할 경우 주석없이 무시될 수 있습니다. 아래 예는 catch 문구가 에러를 예상할수 있는 경우입니다.

```java
try {
    emptyStack.pop();
    fail();
} catch (NoSuchElementException expected) {
}
```

<a name="practices-static"></a>
### [6.3](#practices-static) 정적 멤버: Static members: class 명시하기

static 멤버(필드변수, 메소드, 클래스)의 경우 반드시 명시해 주세요.

반드시 클래스이름으로 명시해야 합니다.

참조 혹은 다른 표현으로 클래스를 표현하지 마세요.

```java
Foo aFoo = ...;
Foo.aStaticMethod(); // good
aFoo.aStaticMethod(); // bad
somethingThatYieldsAFoo().aStaticMethod(); // very bad
```

<a name="practices-finalizers"><a/>
### [6.4](#practices-finalizers) Finalizers: 그냥 쓰지 마세요

[쓰지않는이유](http://www.yunsobi.com/blog/429)

아주 드문 이유로 Object.finalize override.

<a name="javadoc"></a>
## [7](#javadoc) Javadoc

> **노트**: Javadoc은 공동으로 정의하지 않고 프로젝트 마다 다르게 정의한다

<a name="javadoc-formatting"></a>
### [7.1](#javadoc-formatting) Formatting

<a name="javadoc-formatting-form"></a>
#### [7.1.1](#javadoc-formatting-form) General form

The basic formatting of Javadoc blocks is as seen in this example:

/**
\* Multiple lines of Javadoc text are written here,
\* wrapped normally...
\*/
public int method(String p1) { ... }

... or in this single-line example:

/** An especially short bit of Javadoc. \*/

The basic form is always acceptable. The single-line form may be substituted when the entirety of the Javadoc block (including comment
markers) can fit on a single line. Note that this only applies when there are no block tags such as @return.

<a name="javadoc-formatting-paragraphs"></a>
#### [7.1.2](#javadoc-formatting-paragraphs) Paragraphs

One blank line—that is, a line containing only the aligned leading asterisk (\*)—appears between paragraphs, and before the group of block
tags if present. Each paragraph but the first has <p> immediately before the first word, with no space after.

<a name="javadoc-formatting-block"></a>
#### [7.1.3](#javadoc-formatting-block) Block tags

Any of the standard "block tags" that are used appear in the order @param, @return, @throws, @deprecated, and these four types never
appear with an empty description. When a block tag doesn't fit on a single line, continuation lines are indented four (or more) spaces from the
position of the @.

<a name="javadoc-summary"></a>
### [7.2](#javadoc-summary) The summary fragment

Each Javadoc block begins with a brief summary fragment. This fragment is very important: it is the only part of the text that appears in
certain contexts such as class and method indexes.

This is a fragment—a noun phrase or verb phrase, not a complete sentence. It does not begin with A {@code Foo} is a..., or This
method returns..., nor does it form a complete imperative sentence like Save the record.. However, the fragment is capitalized and
punctuated as if it were a complete sentence.

Tip: A common mistake is to write simple Javadoc in the form /** @return the customer ID \*/. This is incorrect, and should be
changed to /** Returns the customer ID. \*/.

<a name="javadoc-where"></a>
### [7.3](#javadoc-where) Where Javadoc is used

At the minimum, Javadoc is present for every public class, and every public or protected member of such a class, with a few exceptions
noted below.

Additional Javadoc content may also be present, as explained in Section 7.3.4, Non-required Javadoc.

<a name="javadoc-where-method"></a>
#### [7.3.1](#javadoc-where-method) Exception: self-explanatory methods

Javadoc is optional for "simple, obvious" methods like getFoo, in cases where there really and truly is nothing else worthwhile to say but
"Returns the foo".

Important: it is not appropriate to cite this exception to justify omitting relevant information that a typical reader might need to know. For
example, for a method named getCanonicalName, don't omit its documentation (with the rationale that it would say only /** Returns
the canonical name. \*/) if a typical reader may have no idea what the term "canonical name" means!

<a name="javadoc-where-overrides"></a>
#### [7.3.2](#javadoc-where-overrides) Exception: overrides

Javadoc is not always present on a method that overrides a supertype method.

<a name="javadoc-where-not-required"></a>
#### [7.3.4](#javadoc-where-not-required) Non-required Javadoc

Other classes and members have Javadoc as needed or desired.

Whenever an implementation comment would be used to define the overall purpose or behavior of a class or member, that comment is
written as Javadoc instead (using /\**).

Non-required Javadoc is not strictly required to follow the formatting rules of Sections 7.1.2, 7.1.3, and 7.2, though it is of course
recommended.
