# Java Code Style Guide

이 가이드는 벤디스에서 [Java](http://www.oracle.com/java/)로 코드를 작성할 때 기준이 되는 스타일을 설명한다. 본 문서는 [Google Java Style Guide](https://google.github.io/styleguide/javaguide.html)를 바탕으로 작성되었다.

> **노트**: 이 가이드는 [checkstyle](http://checkstyle.sourceforge.net)을 사용한다고 가정한다.

## Table of Contents

1. [소개](#introduction)
    1. [용어](#terminology)
    1. [안내](#guide-notes)
1. [소스 파일 기본사항](#source-file-basics)
    1. [파일명](#file-name)
    1. [파일 인코딩: UTF-8](#file-encoding)
    1. [특수 문자](#special-characters)
1. [소스 파일 구조](#source-file-structure)
    1. [라이선스 또는 저작권 정보(존재하는 경우)](#copyright-statement)
    1. [패키지 문장](#package-statement)
    1. [임포트 문장](#import-statements)
    1. [클래스 선언](#class-declaration)
1. [형식](#formatting)
    1. [중괄호](#braces)
    1. [블록 들여쓰기: +4 스페이스](#block-indentation)
    1. [한 줄에 하나의 문장](#one-statement-per-line)
    1. [열 제한: 130](#column-limit)
    1. [줄 바꿈](#line-wrapping)
    1. [공백](#whitespace)
    1. [괄호 묶기: 추천](#grouping-parentheses)
    1. [특정 요소](#specific-constructs)
1. [이름 지정](#naming)
    1. [모든 식별자에 적용되는 공통 규칙](#identifier-names)
    1. [식별자의 종류에 따른 규칙](#specific-identifier-names)
    1. [Camel case: 정의](#camel-case)
1. [프로그래밍 관행](#programming-practices)
    1. [`@Override`: 항상 사용](#override-annotation)
    1. [예외 처리: 무시하지 않음](#caught-exceptions)
    1. [정적 멤버: 클래스와 사용](#static-members)
    1. [소멸자: 사용 안 함](#finalizers)
1. [Javadoc](#javadoc)

<a name="introduction"></a>
## 소개

이 가이드는 개발자의 기여를 통해 발전하며, 이해하기 쉽고 오류를 줄일 수 있는 코드를 작성하는 데 도움이 되고자 한다.

<a name="terminology"></a>
### 용어

이 문서는 별도로 정의하지 않는 한 아래 용어 정의를 따른다.

* 클래스(class): 보편적인 클래스, 열거형(enum) 클래스, 인터페이스(interface), 어노테이션 타입(annotation type) 등을 모두 포함한다.
* (클래스의) 멤버(member): 중첩된 클래스, 필드, 메소드, 생성자 등을 모두 포함한다. 즉, 초기화블럭(initializer)과 주석을 제외하고 클래스의 최상위 콘텐츠 전부에 해당한다.
* 주석(comment): 구현에 대한 주석만을 의미한다. 문서화를 위한 주석은 `comment`가 아니라 `javadoc`이라는 일반적인 용어를 사용한다.

<a name="guide-notes"></a>
### 안내

이 문서에 포함된 예제는 비규범적(non-normative)이다. 즉, 본 문서에 포함된 예제는 이 가이드를 따르지만, 코드가 작성되어야 하는 유일한 방법을 보여주는 것이 아니다. 예제에서 사용된 선택적 형식은 규칙으로 강요되는 것이 아니다.

<a name="source-file-basics"></a>
## 소스 파일 기본사항

<a name="file-name"></a>
### 파일명

checkstyle: [`OuterTypeFilename`](http://checkstyle.sourceforge.net/config_misc.html#OuterTypeFilename)

소스 파일명은 포함된 최상위 클래스의 대소문자를 구분한 이름과 같아야 하며, 확장자는 `.java`를 사용한다.

<a name="file-encoding"></a>
### 파일 인코딩: UTF-8

소스 파일은 **UTF-8**로 인코딩된다.

<a name="special-characters"></a>
### 특수 문자

<a name="whitespace-characters"></a>
#### 공백 문자

checkstyle: [`FileTabCharacter`](http://checkstyle.sourceforge.net/config_whitespace.html#FileTabCharacter)

소스 코드에 포함될 수 있는 공백 문자는 개행 문자를 제외하고 ASCII 수평 공백(horizontal space) 문자(0x20) 뿐이다. 이는 다음을 의미한다.

* 문자열과 문자 리터럴의 모든 공백 문자는 이스케이프한다.
* 들여쓰기를 위해 탭 문자를 사용하지 않는다.

<a name="special-escape-sequences"></a>
#### 특수 이스케이프 시퀀스

checkstyle: [`IllegalTokenText`](http://checkstyle.sourceforge.net/config_coding.html#IllegalTokenText)

[특수 이스케이프 시퀀스](https://docs.oracle.com/javase/tutorial/java/data/characters.html)를 갖는 문자(`\b`, `\t`, `\n`, `\f`, `\r`, `\"`, `\'` and `\\`)는 8진수(예, `\012`) 또는 유니코드(예, `\u000a`) 이스케이프가 아니라 해당 시퀀스를 사용한다.

<a name="non-ascii-characters"></a>
#### 비ASCII 문자

checkstyle: [`AvoidEscapedUnicodeCharacters`](http://checkstyle.sourceforge.net/config_misc.html#AvoidEscapedUnicodeCharacters)

나머지 비ASCII 문자는 실제 유니코드 문자(예, `∞`) 또는 그에 해당하는 유니코드 이스케이프(예, `\u221e`)를 사용한다. 문자열 리터럴과 주석이 아닌 곳에 유니코드 이스케이프를 사용하는 것은 추천되지 않지만, 둘 중 **코드의 가독성이 높은 방법**을 사용해야 한다.

> **팁**: 유니코드 이스케이프 또는 실제 유니코드 문자를 사용하는 경우에도 문자의 설명을 위한 주석은 매우 큰 도움이 된다.

예제:

| 예제 | 논의 |
| - | - |
| `String unitAbbrev = "μs";` | 최선: 주석 없이도 명확함 |
| `String unitAbbrev = "\u03bcs"; // "μs"` | 허용되지만, 이렇게 쓸 이유가 없음 |
| `String unitAbbrev = "\u03bcs"; // Greek letter mu, "s"` | 허용되지만, 어색하고 실수하기 쉬움 |
| `String unitAbbrev = "\u03bcs";` | 최악: 읽는 사람이 무엇인지 알 수 없음 |
| `return '\ufeff' + content; // byte order mark` | 좋음: 출력할 수 없는 문자는 이스케이프를 사용하고, 필요한 경우 주석을 추가 |

> **팁**: 어떤 프로그램이 비ASCII 문자를 잘 처리하지 못할 것이라는 두려움 때문에 코드의 가독성을 해치면 절대 안 된다. 만약 이런 일이 일어난다면 그 프로그램이 **고장**난 것이고, 그 프로그램을 **고쳐**야 한다.

<a name="source-file-structure"></a>
## 소스 파일 구조

소스 파일은 다음 내용을 **순서대로** 포함한다.
1. 라이선스 또는 저작권 정보(존재하는 경우)
1. 패키지 문장
1. 임포트 문장
1. 반드시 한 개의 최상위 클래스

각 섹션은 **반드시 하나의 빈 줄**로 구분해야 한다.

<a name="copyright-statement"></a>
### 라이선스 또는 저작권 정보(존재하는 경우)

파일 내에 라이선스 또는 저작권 정보가 포함된다면, 여기 포함한다.

<a name="package-statement"></a>
### 패키지 문장

checkstyle: [`NoLineWrap`](http://checkstyle.sourceforge.net/config_whitespace.html#NoLineWrap)

패키지 문장은 **줄 바꿈 없이** 작성한다. 열 제한([열 제한: 130](#column-limit))은 패키지 문장에 적용되지 않는다.

<a name="import-statements"></a>
### 임포트 문장

<a name="wildcard-imports"></a>
#### 와일드카드 임포트 금지

정적(static)이든 아니든 **와일드카드 임포트는 사용하지 않는다**.

<a name="import-line-wrapping"></a>
#### 줄 바꿈 금지

checkstyle: [`NoLineWrap`](http://checkstyle.sourceforge.net/config_whitespace.html#NoLineWrap)

임포트 문장은 **줄 바꿈 없이** 작성한다. 열 제한([열 제한: 130](#column-limit))은 임포트 문장에 적용되지 않는다.

<a name="import-ordering-and-spacing"></a>
#### 순서 및 간격

checkstyle: [`CustomImportOrder`](http://checkstyle.sourceforge.net/config_imports.html#CustomImportOrder)

임포트는 다음 순서를 따른다.

1. `import java.*`
1. `import javax.*`
1. `import org.springframework.*`
1. `com.vendys.*`를 제외한 정적이 아닌 그 외 임포트
1. `import com.vendys.*`
1. 모든 정적 임포트

각 순서에 해당하는 임포트는 하나의 블록에 작성해야 하고, 각 블록은 하나의 빈 줄로 구분한다. 임포트 문장 사이에 그 외의 빈 줄은 사용하지 않는다.

<a name="import-not-static"></a>
#### 정적 임포트 금지

checkstyle: [`AvoidStarImport`](http://checkstyle.sourceforge.net/config_imports.html#AvoidStarImport)

클래스를 명시하지 않고, [정적 임포트된 메소드를 사용](https://xxxelppa.tistory.com/38)하는 경우 실수하기 쉬워 정적 임포트는 사용하지 않는다. 단, 테스트를 작성하는 경우는 예외로 한다.

<a name="class-declaration"></a>
### 클래스 선언

<a name="one-top-level-class"></a>
#### 정확히 한 개의 최상위 클래스 선언

checkstyle: [`OneTopLevelClass`](http://checkstyle.sourceforge.net/config_design.html#OneTopLevelClass)

각 최상위 클래스는 자신의 소스 파일 내에 포함되어야 한다.

<a name="ordering-class-contents"></a>
#### 클래스 내용의 순서

클래스 내용은 다음 순서를 따른다.

1. 정적 필드
1. 정적이 아닌 필드
1. 생성자
1. 그 외 다른 메소드
1. `equals`, `hashCode`, `toString`

클래스의 멤버와 이니셜라이저의 작성 순서는 내용을 학습하는 데 큰 영향을 미칠 수 있다. 하지만, 어떻게 작성할지 결정하는 한 가지 방법이 존재하는 것은 아니다. 서로 다른 클래스는 서로 다른 방법으로 내용을 작성할 수 있다.

중요한 것은 각 클래스가 유지보수를 담당하는 사람이 설명할 수 있는 **논리적인 순서**로 작성된다는 점이다. 예를 들어, 단순히 습관 때문에 새로운 메소드를 클래스의 마지막에 추가하는 건 "추가된 날짜에 따른 시간 순서"를 만들지만, 이는 논리적인 순서가 아니다.

##### 오버로드: 절대 나누지 않음

클래스가 여러 개의 생성자를 갖거나 같은 이름의 메소드 여러 개를 갖는 경우 순서대로 나타나야 하고, 그 사이 다른 코드(프라이빗 멤버 포함)가 삽입되면 안된다.

<a name="formatting"></a>
## 형식

> **용어 노트**: 블록 같은 요소는 클래스, 메소드, 생성자 등의 본문을 의미한다. 참고로 [배열 초기화](#array-initializers)도 선택적으로 블록 같은 요소인 것처럼 다뤄질 수 있다.

<a name="braces"></a>
### 중괄호

<a name="braces-always-used"></a>
#### 항상 중괄호 사용

checkstyle: [`NeedBraces`](http://checkstyle.sourceforge.net/config_blocks.html#NeedBraces)

중괄호(`{}`)는 본문이 비어 있거나 단 하나의 문장만 포함하는 경우에도 `if`, `else`, `for`, `do`, `while` 등의 문장에서 항상 사용된다.

<a name="blocks-k-r-style"></a>
#### 비어 있지 않은 블록: K & R 스타일

checkstyle: [`LeftCurly`](http://checkstyle.sourceforge.net/config_blocks.html#LeftCurly), [`RightCurly`](http://checkstyle.sourceforge.net/config_blocks.html#RightCurly)

비어 있지 않은 블록과 블록 같은 요소의 중괄호는 Kernighan & Ritchie 스타일("[이집트 브라켓](http://www.codinghorror.com/blog/2012/07/new-programming-jargon.html)")을 따른다.

* 여는 중괄호 전에 개행을 하지 않음
* 여는 중괄호 뒤에 개행
* 닫는 중괄호 앞에 개행
* 닫는 중괄호가 해당 문장 또는 메소드, 생성사, 이름 있는 클래스 등의 본문을 끝내는 경우에만 닫는 중괄호 뒤에 개행(예를 들어, `else` 또는 쉼표가 뒤에 나타나는 경우 닫는 중괄호 뒤에 개행을 하지 않는다.)

예제:

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

[열거형 클래스](#enum-classes)에는 몇 가지 예외가 존재한다.

<a name="braces-empty-blocks"></a>
#### 빈 블록: 간결하게 표현 가능

checkstyle: [`EmptyBlock`](http://checkstyle.sourceforge.net/config_blocks.html#EmptyBlock), [`WhitespaceAround`](http://checkstyle.sourceforge.net/config_whitespace.html#WhitespaceAround)

빈 블록 또는 블록 같은 요소는 K & R 스타일로 작성할 수 있다. 하지만, 다중 블록 문장(직접 여러 개의 블록을 포함하는 문장: `if`/`else` 또는 `try`/`catch`/`finally`)이 아니라면 사이에 문자나 개행 없이 여는 중괄호 뒤 바로 닫는 중괄호를 사용할 수 있다({}).

예제:

```java
// 아래 형식은 가능
void doNothing() {}

// 아래 형식도 역시 가능
void doNothingElse() {
}
```

```java
// 아래 형식은 허용되지 않음: 다중 블록 문장은 간결한 빈 블록을 사용할 수 없음
try {
    doSomething();
} catch (Exception e) {}
```

<a name="block-indentation"></a>
### 블록 들여쓰기: +4 스페이스

checkstyle: [`Indentation`](http://checkstyle.sourceforge.net/config_misc.html#Indentation)

새로운 블록 또는 블록 같은 요소를 시작할 때, 들여쓰기는 네 개의 스페이스만큼 증가한다. 블록이 끝날 때, 들여쓰기는 이전 들여쓰기 수준으로 돌아온다. 들여쓰기 수준은 블록의 코드와 주석 모두에 적용된다([비어 있지 않은 블록: K & R 스타일](blocks-k-r-style)의 예제를 참조).

<a name="one-statement-per-line"></a>
### 한 줄에 하나의 문장

checkstyle: [`OneStatementPerLine`](http://checkstyle.sourceforge.net/config_coding.html#OneStatementPerLine)

각 문장 뒤에서 줄 바꿈을 한다.

<a name="column-limit"></a>
### 열 제한: 130

checkstyle: [`LineLength`](http://checkstyle.sourceforge.net/config_sizes.html#LineLength)

Java 코드는 130자의 열 제한을 갖는다. "문자"는 유니코드 코드 포인트를 의미한다. 아래 나열된 예외를 제외하고, 이 제한을 넘는 각 줄은 반드시 [줄 바꿈](#line-wrapping)에서 설명한 방법으로 줄을 바꿔 작성해야 한다.

> 화면에 보여지는 넓이가 크거나 작더라도 각 유니코드 코드 포인트는 하나의 문자로 계산한다. 예를 들어, [전각(fullwith) 문자](https://en.wikipedia.org/wiki/Halfwidth_and_fullwidth_forms)를 사용하는 경우 이 규칙이 강하게 요구되는 곳보다 더 일찍 줄 바꿈을 할 수도 있다.

예외:

1. 열 제한을 지키는 것이 불가능한 경우(예, Javadoc의 긴 URL 또는 긴 JSNI 메소드 참조)
1. 패키지 및 임포트 문장([패키지 문장](#package-statement) 및 [임포트 문장](#import-statements) 참고)
1. 쉘에 잘라서 붙여넣기 할 수 있는 주석의 명령줄

<a name="line-wrapping"></a>
### 줄 바꿈

> **용어 노트**: 한 줄에 적을 수 있는 코드를 여러 줄로 나눈 경우 이를 줄 바꿈(line-wrapping)이라 한다.

모든 경우에 어떻게 줄 바꿈해야 하는지 보여주는 완전하고, 결정적 공식은 존재하지 않는다. 같은 코드를 줄 바꿈하는 적절한 방식이 여러개 존재하는 경우는 매우 자주 나타난다.

> **노트**: 일반적으로 줄 바꿈을 하는 이유는 열 제한을 넘지 않기 위함이지만, 실제로 열 제한에 맞춰 코드를 작성할 수 있음에도 작성자의 재량에 따라 줄 바꿈을 할 수도 있다.

> **팁**: 메소드 또는 지역 변수를 밖으로 빼면 줄 바꿈을 하지 않고 문제가 해결될 수도 있다.

<a name="line-wrapping-where-to-break"></a>
#### 어디서 줄을 나누는가

checkstyle: [`OperatorWrap`](http://checkstyle.sourceforge.net/config_whitespace.html#OperatorWrap), [`SeparatorWrap`](http://checkstyle.sourceforge.net/config_whitespace.html#SeparatorWrap)

줄 바꿈의 가장 중요한 지침은 **높은 구문 수준**에서 나누는 것이 선호된다는 점이다.

```java
public void static main(
        String[] args,
        Member[] members
        ) throws Exception {
    if (isLoginClient
            || isLogoutPermission
            || isLogoutPermission) {
        operationMethod();
    }

    list.stream()
            .each(x -> {
                // statements
            }).map();
}
```

1. 메소드의 파라미터나 `if`, `while` 등의 구문 조건을 줄 바꿈하는 경우 연산자 앞에서 개행하고, 해당 블록을 두 단계 들여쓰기한다.
1. 할당 연산자가 아닌 연산자에서 줄 바꿈을 하는 경우 심볼 앞에서 줄 바꿈을 한다.
  * 이 규칙은 다음의 "연산자 같은" 심볼에도 적용된다.
    - 점 구분자(`.`)
    - 메소드 참조의 쌍점 두 개(`::`)
    - 형 한정(type bound)의 앤드 기호(`<T extends Foo & Bar>`)
    - `catch` 블록의 파이프 기호(`catch (FooException | BarException e)`)
1. 할당 연산자에서 줄 바꿈을 하는 경우 일반적으로 심볼 뒤에서 줄 바꿈을 하지만, 심볼 앞에서 줄 바꿈을 하는 것도 허용된다.
  * 이 규칙은 또한 향상된 `for` ("foreach") 문장의 "할당 연산자 같은" 쌍점에도 적용된다.
1. 메소드 또는 생성자 이름은 뒤에 오는 여는 괄호(`(`)와 붙인다.
1. 쉼표(`,`)는 앞에 오는 토큰과 붙인다.
1. 람다의 화살표 근처에서 줄 바꿈을 할 수 없다. 단, 람다의 본문이 하나의 괄호 없는 표현인 경우 화살표 바로 뒤에서 줄 바꿈을 하는 것은 가능하다. 예제:

  ```java
  MyLambda<String, Long, Object> lambda =
          (String label, Long value, Object obj) -> {
              ...
          };

  Predicate<String> predicate = str ->
          longExpressionInvolving(str);
  ```

> **노트**: 줄 바꿈의 주요 목적은 깨끗한 코드를 작성하는 것이지, 짧은 줄의 코드를 작성하고자 하는 것은 아니다.

<a name="line-wrapping-indent"></a>
#### 지속되는 줄은 최소 +8 스페이스로 들여쓰기

줄 바꿈을 할 때, 첫 번째 줄 이후의 줄(각 지속되는 줄)은 최소 +8 스페이스를 들여쓴다.

여러 개의 지속되는 줄이 있는 경우 필요에 따라 들여쓰기가 +8보다 클 수 있다. 두 개의 지속되는 줄은 일반적으로 병렬적 구문 요소로 시작할 때만 같은 수준의 들여쓰기를 사용한다.

[수평 정렬](#horizontal-alignment)에 대한 내용에서 이전 줄과 특정 토큰을 정렬하기 위해 다양한 수의 스페이스를 사용하는 안 좋은 방법에 대해 설명한다.

<a name="whitespace"></a>
### 공백

<a name="vertical-whitespace"></a>
#### 수직 공백

다음 경우에는 항상 하나의 빈 줄이 사용된다.

1. 클래스의 연속된 멤버 또는 이니셜라이저 사이: 필드, 생성자, 메소드, 중첩 클래스, 정적 이니셜라이저, 인스턴스 이니셜라이저
  * **예외**: 두 개의 연속된 필드 사이(그 사이 다른 코드는 없음) 빈 줄은 선택적이다. 이러한 빈 줄은 필드의 논리적 그룹을 만들기 위해 사용된다.
  * **예외**: 열거형 상수(enum constants) 사이의 빈 줄은 [열거형 클래스](#enum-classes)에 대한 내용에서 다뤄진다.
1. 본 문서의 다른 절([소스 파일 구조](#source-file-structure) 또는 [임포트 문장](#import-statements))에서 요구되는 경우

빈 줄은 가독성을 높일 수 있는 곳이면 어디에나 사용될 수 있다. 예를 들어, 문장 사이에 빈 줄을 사용해 코드를 논리적인 단위로 작게 나눌 수 있다. 첫 번째 멤버 또는 이니셜라이저의 앞이나 클래스의 마지막 멤버 또는 이니셜라이저 뒤에 사용된 빈 줄은 추천되는 것도 추천되지 않는 것도 아니다.

여러 개의 연속된 빈 줄을 사용하는 것은 가능하지만, 요구되는(또는 추천되는) 것은 아니다.

<a name="horizontal-whitespace"></a>
#### 수평 공백

checkstyle: [`GenericWhitespace`](http://checkstyle.sourceforge.net/config_whitespace.html#GenericWhitespace), [`MethodParamPad`](http://checkstyle.sourceforge.net/config_whitespace.html#MethodParamPad), [`NoWhitespaceBefore`](http://checkstyle.sourceforge.net/config_whitespace.html#NoWhitespaceBefore), [`ParenPad`](http://checkstyle.sourceforge.net/config_whitespace.html#ParenPad)

언어나 다른 스타일 규칙에 의해 필요한 경우가 아니거나 리터럴, 주석, Javadoc 등에 해당하지 않을 때, 다음 경우에만 하나의 ASCII 스페이스가 사용된다.

1. `if`, `for`, `catch`같은 예약어를 그 다음에 나오는 같은 줄의 여는 괄호(`(`)로부터 구분하는 경우
1. `else` 또는 `catch`같은 예약어를 같은 줄의 앞에 나오는 닫는 중괄호(`}`)로부터 구분하는 경우
1. 여는 중괄호(`{`)의 앞(단, 다음 두 가지 경우는 예외)
  * `@SomeAnnotation({a, b})` (스페이스를 사용하지 않음)
  * `String[][] x = {{"foo"}};` (8에 의해 `{{` 사이에 스페이스를 사용하지 않음)
1. 이항(binary) 또는 삼항(ternary) 연산자의 앞뒤. 이 규칙은 다음의 "연산자 같은" 심볼에도 적용된다.
  * 결합 형 한정(conjunctive type bound)의 앤드 기호: `<T extends Foo & Bar>`
  * 여러 개의 예외를 다루는 `catch` 블록을 위한 파이프 기호: `catch (FooException | BarException e)`
  * 향상된 `for` ("foreach") 문장의 쌍점(`:`)
  * 람다 표현의 화살표: `(String str) -> str.length()`

  단, 다음은 해당하지 않는다.
  * `Object::toString`처럼 작성된 메소드 참조의 두 쌍점(`::`)
  * `object.toString()`처럼 작성된 점 구분자(`.`)
1. `,:;` 또는 형 변환(cast)의 닫는 괄호(`)`) 뒤
1. 줄 끝(end-of-line) 주석을 시작하는 이중 슬래시(`//`)의 앞뒤. 이 경우 여러 개의 스페이스를 사용할 수 있지만, 요구되는 것은 아니다.
1. 선언문의 타입과 변수 사이: `List<String> list`
1. (_선택적_) 배열 이니셜라이저의 두 괄호 안
  * `new int[] {5, 6}`와 `new int[] { 5, 6 }` 둘 다 유효하다.
1. 타입 어노테이션과 `[]` 또는 `...` 사이

이 규칙은 줄의 시작 또는 끝에 추가적인 스페이스를 요구하거나 금지하는 것으로 해석되면 안된다. 이 규칙은 내부에 사용된 스페이스만 다룬다.

<a name="horizontal-alignment"></a>
#### 수평 정렬: 절대 요구되지 않음

**용어 노트**: 수평 정렬은 특정 토큰을 이전 줄의 또 다른 특정 토큰 바로 아래 두기 위해 코드에 다양한 수의 스페이스를 추가하는 방법을 말한다.

이 방법은 허용되지만, 본 스타일 가이드에서 **요구하는 것은 절대 아니다**. 이미 수평 정렬이 사용되고 있는 곳에서도 수평 정렬을 유지할 것이 요구되지는 않는다.

다음은 수평 정렬을 사용하지 않은 예와 사용한 예를 보여준다.

```java
private int x; // 이 경우는 괜찮다.
private Color color; // 이 경우 역시 괜찮다.

private int   x;     // 허용되지만, 향후 수정할 때
private Color color; // 정렬되지 않도록 놔둬도 무방하다.
```

> **팁**: 정렬은 가독성을 높일 수 있지만, 향후 유지보수에 문제를 만든다. 이후의 변경이 한 줄만 수정한다고 가정하자. 이 변경은 기존에는 기분 좋게 만들던 형식을 엉망으로 만들겠지만, 이런 변경은 허용된다. 종종 코딩하는 사람(아마 당신)은 주변 줄의 공백을 조정하고 싶은 유혹을 받을 것이고, 이 때문에 연쇄적인 형식 변환이 일어날 수도 있다. 그 한 줄의 변경은 이제 "폭발 반경"을 갖는다. 이러한 현상은 최악의 경우 의미 없이 바쁜 업무를 만들 수 있고, 최선의 경우에도 여전히 버전 변경이력 정보를 파괴하며, 리뷰를 느리게 만들고 병합 충돌(merge conflicts)을 늘린다.

<a name="grouping-parentheses"></a>
### 괄호 묶기: 추천

선택적 괄호 묶기는 저자 또는 리뷰어가 괄호 없이 코드를 잘 못 해석할 납득할만한 이유가 없다는 데 동의한 경우 또는 코드를 더 읽기 쉽게 만든 경우에만 생략한다. 코드를 읽는 모든 사람이 모든 Java 연산자의 우선순위표를 외우고 있다고 가정하는 것은 합리적이지 않다.

<a name="specific-constructs"></a>
### 특정 요소

<a name="enum-classes"></a>
#### 열거형 클래스

열거형 상수 뒤의 각 쉼표 뒤에서 줄 바꿈을 하는 것은 선택적이다. 추가적인 빈 줄(일반적으로는 하나)도 허용된다. 다음은 하나의 가능한 경우를 보여준다.

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

메소드와 클래스의 상수에 대한 설명을 포함하지 않는 열거형 클래스는 선택적으로 [배열 이니셜라이저](#array-initializers)처럼 작성될 수 있다.

```java
private enum Suit { CLUBS, HEARTS, SPADES, DIAMONDS }
```

열거형 클래스도 클래스이기 때문에 이 밖의 클래스에 대한 모든 규칙은 동일하게 적용된다.

<a name="variable-declarations"></a>
#### 변수 선언

##### 선언 당 하나의 변수

checkstyle: [`MultipleVariableDeclarations`](http://checkstyle.sourceforge.net/config_coding.html#MultipleVariableDeclarations)

모든 변수 선언(필드 또는 지역 변수)은 반드시 하나의 변수만 선언한다: `int a, b;`같은 선언은 사용되지 않는다.

**예외**: `for` 루프의 헤더에는 여러 개의 변수 선언이 허용된다.

##### 필요 시 선언

checkstyle: [`VariableDeclarationUsageDistance`](http://checkstyle.sourceforge.net/config_coding.html#VariableDeclarationUsageDistance)

지역 변수를 습적으로 이를 포함한 블록 또는 블록 같은 요소의 시작에 선언하지 **않는다**. 대신 지역 변수는 그 범위(scope)를 최소화 하기 위해 처음 사용되는 곳(이유를 알 수 있는 곳)과 가깝게 선언한다. 지역 변수 선언은 일반적으로 초기화 구문을 갖거나 선언 직후 초기화된다.

<a name="arrays"></a>
#### 배열

##### 배열 초기화 구문: 블럭 같은 선언 가능

선택적으로 어떤 배열 초기화 구문이든 "블록 같은 요소"인 것처럼 작성할 수 있다. 예를 들어, 다음은 모두 유효한 방법이다(모든 경우를 다 포함한 것은 **아니다**).

```java
new int[] {           new int[] {
    0, 1, 2, 3            0,
}                         1,
                          2,
new int[] {               3,
    0, 1,             }
    2, 3
}                     new int[]
                              {0, 1, 2, 3}
```

##### C언어 스타일 배열 선언 금지

checkstyle: [`ArrayTypeStyle`](http://checkstyle.sourceforge.net/config_misc.html#ArrayTypeStyle)

대괄호는 변수가 아니라 타입의 일부를 구성한다: `String args[]`가 아닌 `String[] args`.

<a name="switch"></a>
#### Switch 문장

> **용어 노트**: switch 블록의 중괄호 안에는 하나 이상의 문장 그룹이 있다. 각 문장 그룹은 하나 이상의 switch 레이블(`case FOO:` 또는 `default:`)과 하나 이상의 문장(또는 마지막 문장 그룹의 경우에는 0 개 이상의 문장)으로 구성된다.

##### 들여쓰기

다른 블록과 마찬가지로 switch 블록은 +4 스페이스만큼 들여쓴다.

Switch 레이블 뒤에는 개행을 하고, 새로운 블록이 시작되는 것처럼 +4 스페이스 만큼 들여쓰기 수준을 증가시킨다. 그 다음의 switch 레이블은 블록이 닫힌 것처럼 다시 이전의 들여쓰기 수준으로 돌아온다.

##### Fall-through: 주석 추가

checkstyle: [`FallThrough`](http://checkstyle.sourceforge.net/config_coding.html#FallThrough)

Switch 블록 안에서 각 문장 그룹은 (`break`, `continue`, `return` 또는 예외 발생 등으로) 바로 종료하거나 다음 문장 그룹으로 실행이 지속된다는 것을 알리는 주석을 추가해 표시한다. Fall-through를 알릴 수 있는 어떤 방식이든 주석으로 추가할 수 있다(일반적으로 `// fall through`). 이 특별한 주석은 switch 블록의 마지막 문장 그룹에는 필요 없다. 예시:

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

`case 1:` 뒤에는 주석이 필요 없고, 문장 그룹의 끝에만 필요하다는 점을 주목하라.

##### default case

checkstyle: [`MissingSwitchDefault`](http://checkstyle.sourceforge.net/config_coding.html#MissingSwitchDefault)

각 switch 문장은 코드를 포함하지 않더라도 `default` 문장 그룹을 갖는다.

**예외**: `enum` 타입을 위한 switch 문장은 해당 타입의 가능한 모든 값을 처리하는 case가 명시적으로 존재할 때 `default` 문장 그룹을 생략할 수 있다. 이는 IDE 또는 정적 분석 도구가 case가 모두 포괄하지 못할 때 경고하도록 만든다.

<a name="annotations"></a>
#### 어노테이션

checkstyle: [`AnnotationLocation`](http://checkstyle.sourceforge.net/config_annotation.html#AnnotationLocation)

클래스, 메소드, 생성자에 대한 어노테이션은 설명 블록 직후에 나타나며, 각 어노테이션은 한 줄에 하나씩 나열된다. 이 때의 개행은 [줄 바꿈](#line-wrapping)으로 생각하지 않기 때문에 들여쓰기 수준은 증가하지 않는다. 예시:

```java
@Override
@Nullable
public String getNameIfPresent() { ... }
```

**예외**: 파라미터가 없는 단일 어노테이션은 시그니처의 첫 줄에 함께 나타날 수 있다. 예시:

```java
@Override public int hashCode() { ... }
```

필드에 적용되는 어노테이션도 설명 블록 직후에 나타나지만, 이 경우 여러 개의 (파리미터를 가질 수도 있는) 어노티이션이 같은 줄에 나열될 수 있다. 예시:

```java
@Partial @Mock DataLoader loader;
```

파라미터, 지역 변수, 타입 등에 대한 어노테이션의 형식을 규정하는 특별한 규칙은 존재하지 않는다.

<a name="comments"></a>
#### 주석

본 절은 구현에 대한 주석을 다루며, Javadoc에 대한 내용은 다루지 않는다.

줄 바꿈 앞에는 임의의 공백과 함께 구현에 대한 주석이 나타날 수 있다. 이러한 주석은 행을 비어있지 않게 만든다.

##### 블록 주석 스타일

checkstyle: [`CommentsIndentation`](http://checkstyle.sourceforge.net/config_misc.html#CommentsIndentation)

블록 주석은 주변 코드와 같은 수준으로 들여쓰기한다. 블록 주석은 `/* ... */` 스타일 또는 `// ...` 스타일로 작성된다. 여러 줄의 `/* ... */` 주석은 이어지는 줄이 이전 줄의 `*`과 정렬된 `*`으로 시작해야 한다.

```java
/*
 * 이런 주석은
 * 괜찮다.
 */

// 이 또한
// 괜찮다.

/* 또는 이런 형태로
 * 작성할 수 있다. */
```

주석은 `*` 또는 다른 기호로 만든 상자로 둘러싸지 않는다.

> **팁**: 여러 줄의 주석을 작성하는 경우 코드 형식 자동 변환기가 필요할 때 (문단 스타일로) 줄 바꿈을 하길 원한다면 `/* ... */` 스타일을 사용하라. 대부분의 변환기는 `// ...` 스타일 주석 블록에 대해 자동으로 줄 바꿈을 하지 않는다.

<a name="modifiers"></a>
#### 제어자(modifiers)

checkstyle: [`ModifierOrder`](http://checkstyle.sourceforge.net/config_modifier.html#ModifierOrder)

클래스 및 멤버 제어자는 존재하는 경우 Java 언어 명세서에서 추천하는 다음 순서에 따라 나타난다.

> public protected private abstract default static final transient volatile synchronized native strictfp

<a name="numeric-literals"></a>
#### 숫자 리터럴

checkstyle: [`UpperEll`](http://checkstyle.sourceforge.net/config_misc.html#UpperEll)

`long` 타입의 정수 리터럴은 대문자 `L`을 접미어로 사용하며, (숫자 1과 혼동하지 않도록) 절대 소문자를 사용하지 않는다. 예를 들어, `3000000000l`이 아니라 `3000000000L`로 표기한다.

<a name="naming"></a>
## 이름 지정

<a name="identifier-names"></a>
### 모든 식별자에 적용되는 공통 규칙

식별자는 ASCII 문자와 숫자만 사용하며, 아래 명시된 몇 가지 경우에 밑줄을 허용한다. 따라서 유효한 식별자 이름 각각은 정규표현식 `\w+`에 매칭된다.

이 코드 스타일에서 특별한 접두어 및 접미어는 사용되지 않는다. 예를 들어, 다음 이름은 이 코드 스타일을 따르는 것이 아니다: `name_`, `mName`, `s_name`, `kName`.

<a name="specific-identifier-names"></a>
### 식별자의 종류에 따른 규칙

<a name="package-names"></a>
#### 패키지명

checkstyle: [`PackageName`](http://checkstyle.sourceforge.net/config_naming.html#PackageName)

패키지명은 모두 소문자로 지정하며, 연속된 단어는 밑줄 없이 단순히 붙여 쓴다. 예를 들어, `com.example.deepSpace` 또는 `com.example.deep_space`가 아니라 `com.example.deepspace`처럼 지정한다.

<a name="class-names"></a>
#### 클래스명

checkstyle: [`TypeName`](http://checkstyle.sourceforge.net/config_naming.html#TypeName)

클래스명은 [UpperCamelCase](#camel-case)로 작성한다.

클래스명은 일반적으로 명사 또는 명사구로 작성한다. 예를 들어, `Character` 또는 `ImmutableList`와 같은 형태가 된다. 인터페이스명 또한 명사 또는 명사구로 작성하지만(예, `List`), 때로는 형용사 또는 형용사구로 작성할 수도 있다(예, `Readable`).

어노테이션 타입의 이름을 지정하기 위한 특별한 규칙이나 잘 알려진 방법은 없다.

테스트 클래스의 이름은 테스트 대상 클래스의 이름으로 시작하며, `Test`로 끝난다. 예를 들어, `HashTest` 또는 `HashIntegrationTest`와 같은 형태가 된다.

<a name="method-names"></a>
#### 메소드명

checkstyle: [`MethodTypeParameterName`](http://checkstyle.sourceforge.net/config_naming.html#MethodTypeParameterName), [`MethodName`](http://checkstyle.sourceforge.net/config_naming.html#MethodName)

메소드명은 [lowerCamelCase](#camel-case)로 작성한다.

메소드명은 일반적으로 동사 또는 동사구로 작성한다. 예를 들어, `sendMessage` 또는 `stop`과 같은 형태가 된다.

밑줄은 이름의 논리적인 요소를 구분하기 위해 Junit 테스트 메소드 이름에 쓰일 수 있고, 각 요소는 [lowerCamelCase](#camel-case)로 작성된다. 한 가지 일반적인 패턴은 `<methodUnderTest>_<state>`으로 예를 들어 `pop_emptyStack`같은 형태를 말한다. 테스트 메소드의 이름을 지정하는 한 가지 올바른 방법은 존재하지 않는다.

<a name="constant-names"></a>
#### 상수명

상수명은 `CONSTANT_CASE`를 사용한다. 즉, 모두 대문자로 작성하고, 단어는 하나의 밑줄로 구분한다. 하지만 상수는 정확히 무엇일까?

상수는 내용이 깊은 불변성(deeply immutable)을 가지며, 그 메소드가 알아챌 수 있는 부작용을 갖지 않는 static final 필드를 말한다. 이는 기본 요소, 문자열, 불변형, 불변형의 불변 컬렉션 등을 포함한다. 만약 인스턴스의 식별할 수 있는 상태 중 무언가가 변할 수 있다면 이는 상수가 아니다. 단순히 오브젝트를 변경시키지 않기 위한 의도만으로는 불충분하다. 예시:

```java
// 상수
static final int NUMBER = 5;
static final ImmutableList<String> NAMES = ImmutableList.of("Ed", "Ann");
static final ImmutableMap<String, Integer> AGES = ImmutableMap.of("Ed", 35, "Ann", 32);
static final Joiner COMMA_JOINER = Joiner.on(','); // Joiner가 불변이기 때문
static final SomeMutableType[] EMPTY_ARRAY = {};
enum SomeEnum { ENUM_CONSTANT }

// 상수가 아닌 것
static String nonFinal = "non-final";
final String nonStatic = "non-static";
static final Set<String> mutableCollection = new HashSet<String>();
static final ImmutableSet<SomeMutableType> mutableElements = ImmutableSet.of(mutable);
static final ImmutableMap<String, SomeMutableType> mutableValues =
    ImmutableMap.of("Ed", mutableInstance, "Ann", mutableInstance2);
static final Logger logger = Logger.getLogger(MyClass.getName());
static final String[] nonEmptyArray = {"these", "can", "change"};
```

상수명은 일반적으로 명사 또는 명사구로 작성한다.

<a name="non-constant-field-names"></a>
#### 상수가 아닌 필드명

checkstyle: [`MemberName`](http://checkstyle.sourceforge.net/config_naming.html#MemberName)

상수가 아닌 필드명(static 또는 그 외)은 [lowerCamelCase](#camel-case)로 작성한다.

상수가 아닌 필드명은 일반적으로 명사 또는 명사구로 작성한다. 예를 들어, `computedValues` 또는 `index`와 같은 형태가 된다.

**예외**: 스프링 프레임워크에서 사용하는 프로퍼티에 대응하는 필드명은 대문자로 작성되며, 단어 사이를 밑줄로 구분한다. 이 경우 필드를 구문 내에서 재할당하면 안된다.

<a name="parameter-names"></a>
#### 파라미터명

checkstyle: [`ParameterName`](http://checkstyle.sourceforge.net/config_naming.html#ParameterName), [`CatchParameterName`](http://checkstyle.sourceforge.net/config_naming.html#CatchParameterName), [`ClassTypeParameterName`](http://checkstyle.sourceforge.net/config_naming.html#ClassTypeParameterName), [`InterfaceTypeParameterName`](http://checkstyle.sourceforge.net/config_naming.html#InterfaceTypeParameterName)

파라미터명은 [lowerCamelCase](#camel-case)로 작성한다.

한 글자 파라미터명은 public 메소드에서 사용하면 안된다.

<a name="local-variable-name"></a>
#### 지역 변수명

checkstyle: [`LocalVariableName`](http://checkstyle.sourceforge.net/config_naming.html#LocalVariableName)

지역 변수명은 [lowerCamelCase](#camel-case)로 작성한다.

final과 불변하는 경우여도 지역 변수명은 상수로 여기지 않으며, 상수처럼 이름을 지정하면 안된다.

<a name="type-variable-names"></a>
#### 타입 변수명

각 타입 변수는 다음 줄 한 가지 스타일로 작성한다.

* 한 개의 대문자와 그 후 선택적으로 하나의 숫자를 사용(예, `E`, `T`, `X`, `T2`)
* [클래스명](#class-names)에 사용된 형태의 이름과 그 뒤 대분자 `T`를 사용(예, `RequestT`, `FooBarT`)

<a name="camel-case"></a>
### Camel case: 정의

checkstyle: [`AbbreviationAsWordInName`](http://checkstyle.sourceforge.net/config_naming.html#AbbreviationAsWordInName)

"IPv6" 또는 "iOS"처럼 축약어나 일반적이지 않은 요소가 존재할 때 영어 구문을 camel case로 변환하는 적절한 방법이 하나 이상 존재하기도 한다. 예측 가능성을 높이기 위해 본 스타일은 다음과 같이 (거의) 결정적인 방법을 정한다.

이름의 산문체로 시작:

1. 문구를 일반적인 ASCII 문자로 바꾸고 어퍼스트로피를 제거한다. 예를 들어, "Müller's algorithm"은 "Muellers algorithm"이 된다.
1. 결과를 스페이스와 남아있는 구두점(일반적으로 하이픈)에서 분리해 단어로 나눈다.
  * 추천: 단어가 이미 일반적인 쓰임에 있어 평범한 camel-case처럼 보인다면, 이를 그 구성요소로 나눈다(예, "AdWords"는 "ad words"가 된다). "iOS"와 같은 단어는 실제로 camel case가 아니며, 평범한 경우가 아니기 때문에 이러한 내용이 적용되지 않는다.
1. 이제 모두 소문자로 바꾼다(축약어 포함).
  * UpperCamelCase를 만들기 위해서는 각 단어의 첫 번째 글자를 대문자로 바꾼다.
  * lowerCamelCase를 만들기 위해서는 첫 번째 단어를 빼고 각 단어의 첫 번째 글자를 대문자로 바꾼다.
1. 마지막으로 모든 단어를 하나의 식별자로 합친다.

원래 단어의 대소문자는 거의 다 무시된다는 점을 눈여겨 봐라.

예시:

|산문체|올바른 형태|잘못된 형태|
|-|-|-|
|"XML HTTP request"|`XmlHttpRequest`|`XMLHTTPRequest`|
|"new customer ID"|`newCustomerId`|`newCustomerID`|
|"inner stopwatch"|`innerStopwatch`|`innerStopWatch`|
|"supports IPv6 on iOS?"|`supportsIpv6OnIos`|`supportsIPv6OnIOS`|
|"YouTube importer"|`YouTubeImporter`<br>`YoutubeImporter`*|&nbsp;|

\*표시된 항목은 사용할 수 있으나 추천되지 않음

> **노트**: 어떤 단어는 영어에서 모호하게 하이픈이 사용된다. 예를 들어, "nonempty"와 "none-empty"는 모두 올바르기 때문에 메소드명 `checkNonempty`와 `checkNonEmpty` 모두 잘못된 것은 아니다.

<a name="programming-practices"></a>
## 프로그래밍 관행

<a name="override-annotation"></a>
### `@Override`: 항상 사용

적법한 경우에는 항상 `@Override` 어노테이션으로 메소드를 표시한다. 이는 슈퍼클래스의 메소드를 오버라이딩하는 클래스 메소드, 인터페이스 메소드를 구현한 클래스 메소드, 슈퍼인터페이스 메소드를 다시 정의한 인터페이스 메소드를 포함한다.

**예외**: 부모 메소드가 `@Deprecated`된 경우 `@Override`는 생략할 수 있다.

<a name="caught-exceptions"></a>
### 예외 처리: 무시하지 않음

checkstyle: [`EmptyCatchBlock`](http://checkstyle.sourceforge.net/config_blocks.html#EmptyCatchBlock)

아래 예외를 제외하고, 예외가 발생한 경우 아무 것도 하지 않는 게 옳은 경우는 매우 드물다. (일반적으로 예외에 대한 응답을 로그로 남기거나 이 게 불가능한 경우 `AssertionError`를 다시 발생시킨다.)

정말 catch 블록에서 아무 것도 하지 않는 것이 적절할 때는 그 이유를 주석으로 설명한다.

```java
try {
    int i = Integer.parseInt(response);
    return handleNumericResponse(i);
} catch (NumberFormatException ok) {
    // 숫자가 아닌 경우 발생되는 예외로 무시하고, 계속 진행해도 좋다.
}
return handleTextResponse(response);
```

**예외**: 테스트에서 처리하는 예외의 이름을 통해 예상 가능한 경우는 주석을 생략할 수 있다. 다음은 테스트하는 코드가 예상되는 타입의 예외를 발생시킬 것을 확실하게 하는 매우 일반적인 이름으로 별도의 주석은 필요 없다.

```java
try {
    emptyStack.pop();
    fail();
} catch (NoSuchElementException expected) {
}
```

<a name="static-members"></a>
### 정적 멤버: 클래스와 사용

정적 클래스 멤버에 대한 참조를 한정해야 하는 경우 클래스 이름으로 하며, 해당 클래스 타입의 참조나 표현으로 하지 않는다.

```java
Foo aFoo = ...;
Foo.aStaticMethod(); // 좋음
aFoo.aStaticMethod(); // 나쁨
somethingThatYieldsAFoo().aStaticMethod(); // 매우 나쁨
```

<a name="finalizers"><a/>
### 소멸자: 사용 안 함

checkstyle: [`NoFinalizer`](http://checkstyle.sourceforge.net/config_coding.html#NoFinalizer)

`Object.finalize`를 오버라이드하는 경우는 굉장히 드물다.

> **팁**: 사용하지 말아라. 반드시 써야 한다면 먼저 [이펙티브 자바](http://books.google.com/books?isbn=8966261167) 규칙 7, "종료자 사용을 피하라"를 자세히 읽고 이해한 후 사용하지 말아라. 사용하면 안 되는 이유에 대해 설명한 [블로그 글](http://www.yunsobi.com/blog/429)도 있다.

<a name="javadoc"></a>
## Javadoc

> **노트**: Javadoc의 작성에 대한 내용은 추후 정의할 예정이다.
