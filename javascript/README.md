# JavaScript Style Guide

이 가이드는 벤디스에서 Javascript로 문서를 작성할 때 기준이 되는 스타일을 설명한다.

> **노트**: 이 가이드는 [Airbnb React/JSX Style Guide](https://github.com/apple77y/javascript/blob/master/react/README.md) 를 기준으로 정리하였음

## Table of Contents

1. [JavaScript(ES5)](#javascriptes5)
    1. [References](#references)
    1. [Objects](#objects)
    1. [Strings](#strings)
    1. [Properties](#properties)
    1. [Variables](#variables)
    1. [Comparison Operators & Equality](#comparison-operators-equality)
    1. [Blocks](#blocks)
    1. [Comments](#comments)
    1. [Commas](#commas)
    1. [Naming Conventions](#naming-conventions)

2. [React](#react)
    1. [기본 규칙 (Basic Rules)](#basic-rules)
    1. [클래스(Class) vs React.createClass vs Stateless](#class)
    1. [선언(Declaration)](#declaration)
    1. [정렬(Aligment)](#aligment)
    1. [따옴표(Quotes)](#quotes)
    1. [띄어쓰기(Spacing)](#spacing)
    1. [속성(Props)](#props)
    1. [참조](#react-references)
    1. [괄호](#bracket)
    1. [태그](#tag)
    1. [메소드](#method)
    1. [순서](#list)
    1. [iMounted](#is-mounted)



<a name="javascriptes5"></a>
## JavaScript(ES5)


<a name="references"></a>
### References

모든 참조에는 var 대신 const를 사용하세요. _eslint: prefer-const, no-const-assign_

> **노트**: 왜? 참조를 재할당 할 수 없게 함으로써, 이해하기 어려운 동시에 버그로 이어지는 코드를 방지합니다.

```
// bad
var a = 1;
var b = 2;

// good
const a = 1;
const b = 2;

```

만약 참조를 재할당 해야 한다면 var 대신 let을 사용하세요. _eslint: no-var jscs: disallowVar_


> **노트**: 왜? var처럼 함수스코프를 취하는 것 보다는 블록스코프를 취하는 let이 더 낫습니다.

```
// bad
var count = 1;
if (true) {
  count += 1;
}

// good, use the let.
let count = 1;
if (true) {
  count += 1;
}
```

let 과 const 는 둘 다 블록스코프라는 것을 유의하세요.

```
// const와 let은 선언된 블록 안에서만 존재합니다.
{
  let a = 1;
  const b = 1;
}
console.log(a); // ReferenceError
console.log(b); // ReferenceError
```


<a name="objects"></a>
### Objects

객체를 생성할 때는 리터럴 구문을 사용. _eslint: no-new-object_

```
// bad
const item = new Object();

// good
const item = {};
```

동적 속성명을 갖는 객체를 생성할 때는 속성 계산명을 사용

```
function getKey(k) {
  return `a key named ${k}`;
}

// bad
const obj = {
  id: 5,
  name: 'San Francisco',
};
obj[getKey('enabled')] = true;

// good
const obj = {
  id: 5,
  name: 'San Francisco',
  [getKey('enabled')]: true,
};
```

메소드의 단축구문을 사용. _eslint: object-shorthand jscs: requireEnhancedObjectLiterals_

```
// bad
const atom = {
  value: 1,

  addValue: function (value) {
    return atom.value + value;
  },
};

// good
const atom = {
  value: 1,

  addValue(value) {
    return atom.value + value;
  },
};
```

속성의 단축구문을 사용. _eslint: object-shorthand jscs: requireEnhancedObjectLiterals_


```
const lukeSkywalker = 'Luke Skywalker';

// bad
const obj = {
  lukeSkywalker: lukeSkywalker,
};

// good
const obj = {
  lukeSkywalker,
};
```


속성의 단축구문은 객체 선언의 시작 부분에 그룹

```
const anakinSkywalker = 'Anakin Skywalker';
const lukeSkywalker = 'Luke Skywalker';

// bad
const obj = {
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  lukeSkywalker,
  episodeThree: 3,
  mayTheFourth: 4,
  anakinSkywalker,
};

// good
const obj = {
  lukeSkywalker,
  anakinSkywalker,
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  episodeThree: 3,
  mayTheFourth: 4,
};
```

유효하지 않은 식별자에만 따옴표 속성을 사용. _eslint: quote-props jscs: disallowQuotedKeysInObjects_

```
// bad
const bad = {
  'foo': 3,
  'bar': 4,
  'data-blah': 5,
};

// good
const good = {
  foo: 3,
  bar: 4,
  'data-blah': 5,
};
```


객체에 대해 얕은 복사를 할 때는 Object.assign대신 객체 전개 연산자를 사용. 특정 속성이 생략된 새로운 개체를 가져올 때는 객체 나머지 연산자(object rest operator)를 사용

```
// very bad
const original = { a: 1, b: 2 };
const copy = Object.assign(original, { c: 3 }); // this mutates `original` ಠ_ಠ
delete copy.a; // so does this

// bad
const original = { a: 1, b: 2 };
const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }

// good
const original = { a: 1, b: 2 };
const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }

const { a, ...noA } = copy; // noA => { b: 2, c: 3 }
```


<a name="strings"></a>
### Strings

문자열에는 작은 따옴표 ''를 사용. _eslint: quotes jscs: validateQuoteMarks_

```
// bad
const name = "Capt. Janeway";

// bad - template literals should contain interpolation or newlines
const name = `Capt. Janeway`;

// good
const name = 'Capt. Janeway';
```

100자가 넘는 문자열을 문자열 연결을 이용해 여러 줄에 걸쳐 쓰지 않는다.

```
// bad
const errorMessage = 'This is a super long error that was thrown because \
of Batman. When you stop to think about how Batman had anything to do \
with this, you would get nowhere \
fast.';

// bad
const errorMessage = 'This is a super long error that was thrown because ' +
  'of Batman. When you stop to think about how Batman had anything to do ' +
  'with this, you would get nowhere fast.';

// good
const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';
```


프로그램에서 문자열을 생성하는 경우, 문자열 연결 대신 템플릿 문자열을 사용. _eslint: prefer-template template-curly-spacing jscs: requireTemplateStrings_

```
// bad
function sayHi(name) {
  return 'How are you, ' + name + '?';
}

// bad
function sayHi(name) {
  return ['How are you, ', name, '?'].join();
}

// bad
function sayHi(name) {
  return `How are you, ${ name }?`;
}

// good
function sayHi(name) {
  return `How are you, ${name}?`;
}
```

절대로 문자열에 eval()을 사용하지 않는다. 이는 너무나도 많은 취약점을 만든다. eslint: no-eval


문자열에 불필요한 이스케이프 문자를 사용하지 않는다. _eslint: no-useless-escape_

```
// bad
const foo = '\'this\' \i\s \"quoted\"';

// good
const foo = '\'this\' is "quoted"';
const foo = `my name is '${name}'`;
```

<a name="properties"></a>
### Properties

속성에 접근할 때는 마침표를 사용. _eslint: dot-notation jscs: requireDotNotation_

```
const luke = {
  jedi: true,
  age: 28,
};

// bad
const isJedi = luke['jedi'];

// good
const isJedi = luke.jedi;
```

변수를 사용해 속성에 접근할 때는 대괄호 []를 사용

```
const luke = {
  jedi: true,
  age: 28,
};

function getProp(prop) {
  return luke[prop];
}

const isJedi = getProp('jedi');
```

제곱 계산을 할 때는 제곱 연산자 `**`을 사용. _eslint: no-restricted-properties._

```
// bad
const binary = Math.pow(2, 10);

// good
const binary = 2 ** 10;
```



<a name="variables"></a>
### Variables


변수를 선언할 때는 항상 const나 let을 사용. 이렇게 하지 않으면 전역 변수로 선언된다. 우리는 전역 네임스페이스를 오염시키지 않기를 바란다. Captain Planet이 우리에게 경고한다. _eslint: no-undef prefer-const_

```
// bad
superPower = new SuperPower();

// good
const superPower = new SuperPower();
```

하나의 변수에 하나의 const 또는 let을 사용. _eslint: one-var jscs: disallowMultipleVarDecl_

>**노트**: 왜? 이렇게 하면 쉽게 새로운 변수를 추가할 수 있고, ,를 ;로 바꿔버리는 것에 대해 걱정할 필요가 없다. 또한 한번에 모든 선언을 건너뛰는 대신 디버거를 사용해 각 선언을 단계별로 살펴볼 수 있다.

```
// bad
const items = getItems(),
    goSportsTeam = true,
    dragonball = 'z';

// bad
// (compare to above, and try to spot the mistake)
const items = getItems(),
    goSportsTeam = true;
    dragonball = 'z';

// good
const items = getItems();
const goSportsTeam = true;
const dragonball = 'z';
```

const를 그룹화한 다음에 let을 그룹화.

>**노트**: 왜? 이전에 할당한 변수에 대해 새 변수를 추가하는 경우 유용하기 때문이다.

```
// bad
let i, len, dragonball,
    items = getItems(),
    goSportsTeam = true;

// bad
let i;
const items = getItems();
let dragonball;
const goSportsTeam = true;
let len;

// good
const goSportsTeam = true;
const items = getItems();
let dragonball;
let i;
let length;
```

필요한 곳에서 변수를 할당하되, 합당한 곳에 둔다.

```
// bad - unnecessary function call
function checkName(hasName) {
  const name = getName();

  if (hasName === 'test') {
    return false;
  }

  if (name === 'test') {
    this.setName('');
    return false;
  }

  return name;
}

// good
function checkName(hasName) {
  if (hasName === 'test') {
    return false;
  }

  const name = getName();

  if (name === 'test') {
    this.setName('');
    return false;
  }

  return name;
}
```

변수 할당 체이닝을 하지 않는다. _eslint: no-multi-assign_

>**노트**: 왜? 변수 할당 체이닝은 암시적인 전역 변수를 만들기 때문.

```
// bad
(function example() {
  // JavaScript interprets this as
  // let a = ( b = ( c = 1 ) );
  // The let keyword only applies to variable a; variables b and c become
  // global variables.
  let a = b = c = 1;
}());

console.log(a); // throws ReferenceError
console.log(b); // 1
console.log(c); // 1

// good
(function example() {
  let a = 1;
  let b = a;
  let c = a;
}());

console.log(a); // throws ReferenceError
console.log(b); // throws ReferenceError
console.log(c); // throws ReferenceError

// the same applies for `const`
```

단항 증감 연산자(++, --)를 사용하지 않는다. _eslint no-plusplus_

>**노트**: 왜? eslint 문서에 따르면, 단항 증감 구문은 자동으로 세미콜론을 삽입하며, 어플리케이션에서 값을 증감할 때 오류를 일으킬 수 있다.

또한 num += 1과 같은 구문을 통해 값을 변경하는 것이 num++이나 num ++와 같은 구문을 사용하는 것보다 더 의미있는 일이라고 생각한다.

단항 증감 구문을 사용하지 않으면 프로그램에서 예기치 않은 동작을 일으키는 전위 증감 연산을 막을 수 있다.

```
// bad

const array = [1, 2, 3];
let num = 1;
num++;
--num;

let sum = 0;
let truthyCount = 0;
for (let i = 0; i < array.length; i++) {
  let value = array[i];
  sum += value;
  if (value) {
    truthyCount++;
  }
}

// good

const array = [1, 2, 3];
let num = 1;
num += 1;
num -= 1;

const sum = array.reduce((a, b) => a + b, 0);
const truthyCount = array.filter(Boolean).length;
```

값을 할당할 때 =의 앞 또는 뒤에서 줄바꿈을 하지 않는다. 만약 할당이 max-len을 넘기는 경우, 값을 괄호로 둘러싼다. _eslint operator-linebreak._

>**노트**: 왜? Linebreaks surrounding = can obfuscate the value of an assignment.

```
// bad
const foo =
  superLongLongLongLongLongLongLongLongFunctionName();

// bad
const foo
  = 'superLongLongLongLongLongLongLongLongString';

// good
const foo = (
  superLongLongLongLongLongLongLongLongFunctionName()
);

// good
const foo = 'superLongLongLongLongLongLongLongLongString';
```


<a name="comparison-operators-equality"></a>
### Comparison Operators & Equality

==나 !=보다는 ===와 !==를 사용한다.

조건식은ToBoolean 메소드에 의해 엄밀하게 비교됩니다. 항상 이 간단한 규칙에 따른다.

```
Objects evaluate to true
Undefined evaluates to false
Null evaluates to false
Booleans evaluate to the value of the boolean
Numbers evaluate to false if +0, -0, or NaN, otherwise true
Strings evaluate to false if an empty string '', otherwise true

if ([0]) {
  // true
  // An array is an object, objects evaluate to true
}
Use shortcuts.

// bad
if (name !== '') {
  // ...stuff...
}

// good
if (name) {
  // ...stuff...
}

// bad
if (collection.length > 0) {
  // ...stuff...
}

// good
if (collection.length) {
  // ...stuff...
}
```


<a name="blocks"></a>
### Blocks


복수행 블록은 중괄호({ }) 를 사용

```
// bad
if (test)
  return false;

// good
if (test) return false;

// good
if (test) {
  return false;
}

// bad
function () { return false; }

// good
function () {
  return false;
}
```

if와 else로 여러 줄의 블럭을 사용한다면 if 블럭의 닫는 중괄호와 같은 줄에 else를 넣는다.

```
// bad
if (test) {
  thing1();
  thing2();
}
else {
  thing3();
}

// good
if (test) {
  thing1();
  thing2();
} else {
  thing3();
}
```


<a name="comments"></a>
### Comments

복수행의 코멘트는 `/** ... */` 를 사용해 준다. 그 안에는 설명과 모든 매개 변수와 반환 값에 대한 형식과 값을 설명한다.

```
// bad
// make() returns a new element
// based on the passed in tag name
//
// @param {String} tag
// @return {Element} element
function make(tag) {

  // ...stuff...

  return element;
}

// good
/**
 * make() returns a new element
 * based on the passed in tag name
 *
 * @param {String} tag
 * @return {Element} element
 */
function make(tag) {

  // ...stuff...

  return element;
}
```


한 줄 주석에는//를 사용. 코멘트를 추가하고 싶은 코드의 상단에 작성. 또한 주석 앞에 빈 줄을 넣어준다

```
// bad
var active = true;  // is current tab

// good
// is current tab
var active = true;

// bad
function getType() {
  console.log('fetching type...');
  // set the default type to 'no type'
  var type = this._type || 'no type';

  return type;
}

// good
function getType() {
  console.log('fetching type...');

  // set the default type to 'no type'
  var type = this._type || 'no type';

  return type;
}
```


<a name="commas"></a>
### Commas

선두의 comma는 하지않는다.

```
// bad
var story = [
    once
  , upon
  , aTime
];

// good
var story = [
  once,
  upon,
  aTime
];

// bad
var hero = {
    firstName: 'Bob'
  , lastName: 'Parr'
  , heroName: 'Mr. Incredible'
  , superPower: 'strength'
};

// good
var hero = {
  firstName: 'Bob',
  lastName: 'Parr',
  heroName: 'Mr. Incredible',
  superPower: 'strength'
};
```


말미의 불필요한 쉼표도 하지 않는다. 이것은 IE6/7과 quirksmode의 IE9에서 문제를 일으킬 수 있다. 또한 ES3의 일부 구현에서 불필요한 쉼표가 있는 경우, 배열 길이를 추가. 이것은 ES5에서 분명해졌다.(source) 

```
// bad 
var story = [ 
  once, 
  upon,
]; 
// good 
var story = [
  once,
  upon,
];

// bad
var hero = { 
  firstName: 'Bob', 
  lastName: 'Parr', 
};

// good
var hero = { 
  firstName: 'Bob', 
  lastName: 'Parr'
};
```

<a name="naming-conventions"></a>
### Naming Conventions

한문자 이름은 피한다. 이름에서 의도를 읽을 수 있도록 한다.

```
// bad
function q() {
  // ...stuff...
}

// good
function query() {
  // ..stuff..
}
```

Object, 함수, 그리고 인스턴스로는 camelCase를 사용하십시오.

```
// bad
var OBJEcttsssss = {};
var this_is_my_object = {};
var o = {};
function c() {}

// good
var thisIsMyObject = {};
function thisIsMyFunction() {}
```

<a name="react"></a>
## React

<a name="basic-rules"></a>
### 기본 규칙 (Basic Rules)


기본 가이드는 Aribnb React/JSX Style Guide를 기준으로 한다.
파일당 하나의 컴포넌트 파일만 포함한다.
하지만, 다수의 Stateless, or Pure, Components 들은 파일에 존재해도 된다. eslint: react/no-multi-comp.
항상 JSX 구문을 사용한다.
만약 JSX를 이용해 앱을 개발 중이라면 React.createElement 구문을 사용하지 않는다.


<a name="class"></a>
### 클래스(Class) vs React.createClass vs Stateless

만약 소스 안에 `state`나 `refs`가 있으면, `React.createClass` 보다는 `class extends React.Component`를 선호하라. _eslint: react/prefer-es6-class react/prefer-stateless-function_

```
// bad
const Listing = React.createClass({
    //...
    render() {
      return <div>{this.state.hello}</div>;
    }
});

// good
class Listing extends React.Component {
  // ...
  render() {
    return <div>{this.state.hello}</div>;
  }
}
```

그리고 만약 소스 안에 `state`나 `refs`가 없다면, 일반 클래스 방식보다 `일반 함수(화살표 함수 아님)` 방식을 선호하라.:

```
// bad
class Listing extends React.Component {
  render() {
    return <div>{this.props.hello}</div>;
  }
}

// bad (relying on function name inference is discouraged)
const Listing = ({ hello }) => (
  <div>{hello}</div>
);

// good
function Listing({ hello }) {
  return <div>{hello}</div>;
}
```

컴포넌트 이름: 파일 이름과 동일하게 사용한다. 예를들어, ReservationCard.jsx 라는 파일 안에는 ReservationCard 라는 이름의 컴포넌트가 있어야 한다. 하지만, 폴더 내 루트 컴포넌트의 경우에는, 파일 이름을 index.jsx 로 작성하고, 폴더의 이름을 컴포넌트의 이름으로 작성한다.:

```
// bad
import Footer from './Footer/Footer';

// bad
import Footer from './Footer/index';

// good
import Footer from './Footer';
```

<a name="declaration"></a>
### 선언(Declaration)


컴포넌트의 이름을 지을 때  displayName 속성을 사용하지 않는다. 대신에 참조 값으로 컴포넌트의 이름을 짓는다.

```
// bad
export default React.createClass({
  displayName: 'ReservationCard',
});

// good
export default class ReservationCard extends React.Component {
}
```

<a name="aligment"></a>
### 정렬(Aligment)


JSX 구문에 따른 정렬 스타일을 사용합니다. _eslint: react/jsx-closing-bracket-locationreact/jsx-closing-tag-location_

```
<Foo superLongParam="bar"
         anotherSuperLongParam="baz" />

// good
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
/>

// props가 한 줄에 들어간다면 같은 줄에 정렬 하십시오.
<Foo bar="bar" />

// children는 들여쓰기는 합니다.
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
>
  <Quux />
</Foo>
```

<a name="quotes"></a>
### 따옴표(Quotes)


JSX 속성값에는 항상 쌍따옴표 (") 를 사용한다. 하지만 다른 자바스크립트에서는 홑따옴표를 사용한다. _eslint: jsx-quotes_

>**노트**: 왜? JSX 속성은 escaped quotes를 가질수 없다., 그래서 쌍따옴표는 해당 타입에 쉽게 "멈춤 or 그만"이라는 의미를 심어준다.

HTML 속성들도 보통 홑따옴표 대신 쌍따옴표를 사용한다. 그래서 JSX 속성은 이러한 컨벤션을 따라간다.

```
// bad
<Foo bar='bar' />

// good
<Foo bar="bar" />

// bad
<Foo style={{ left: "20px" }} />

// good
<Foo style={{ left: '20px' }} />
```


<a name="spacing"></a>
### 띄어쓰기(Spacing)


자신을 닫는(self-closing) 태그에는 항상 하나의 공백만을 사용한다. _eslint: no-multi-spaces, react/jsx-tag-spacing_

```
// bad
<Foo/>

// very bad
<Foo                 />

// bad
<Foo
 />

// good
<Foo />
```

JSX 중괄호에 공백을 넣지 않는다. _eslint: react/jsx-curly-spacing_

```
// bad
<Foo bar={ baz } />

// good
<Foo bar={baz} />
```


<a name="props"></a>
### 속성(Props)


props(속성) 이름은 항상 camelCase(소문자로 시작)를 사용한다.

```
// bad
<Foo
  UserName="hello"
  phone_number={12345678}
/>

// good
<Foo
  userName="hello"
  phoneNumber={12345678}
/>
```

만약 속성 값이 명확한 true 값이라면 생략한다. eslint: react/jsx-boolean-value

```
// bad
<Foo
  hidden={true}
/>

// good
<Foo
  hidden
/>

// good
<Foo hidden />
<img> 태그에는 항상 alt 속성을 작성한다. 만약 이미지가 표현 가능하다면, alt 값은 빈 문자열이 될 수 있거나 <img>는 반드시 role="presentation" 속성을 가지고 있어야 한다. eslint: jsx-a11y/img-has-alt)

// bad
<img src="hello.jpg" />

// good
<img src="hello.jpg" alt="Me waving hello" />

// good
<img src="hello.jpg" alt="" />

// good
<img src="hello.jpg" role="presentation" />
<img> 태그의 alt 속성 값으로 "image", "photo", "picture" 와 같은 단어를 사용하면 안 된다. eslint: jsx-a11y/img-redundant-alt
```

>**노트**: 왜? 스크린리더는 이미 img 태그를 이미지로 인지하고 있기 때문에, alt 속성 값에 반복으로 해당 정보를 포함할 필요가 없다.

```
// bad
<img src="hello.jpg" alt="Picture of me waving hello" />

// good
<img src="hello.jpg" alt="Me waving hello" />
role 속성 값으로는 검증이 가능하고, 추상적이지 않은 값을 사용하라. ARIA roles. eslint: jsx-a11y/aria-role

// bad - not an ARIA role
<div role="datepicker" />

// bad - abstract ARIA role
<div role="range" />

// good
<div role="button" />
엘리먼트에 accessKey 속성을 사용하면 안 된다. eslint: jsx-a11y/no-access-key
```

>**노트**: 왜? 키보드 단축값을 사용하는 스크린 리더 유저와 일반 키보드 유저간의 일관성이 없어져서 접근성을 복잡하게 만들기 때문이다.

```
// bad
<div accessKey="h" />

// good
<div />
배열의 인덱스를 key 속성 값으로 사용하는 것을 피하고, 유니크한 ID 값을 사용하라. (why?)

// bad
{todos.map((todo, index) =>
  <Todo
    {...todo}
    key={index}
  />
)}

// good
{todos.map(todo => (
  <Todo
    {...todo}
    key={todo.id}
  />
))}
```

<a name="react-references"></a>
### 참조

항상 참조 콜백 함수를 사용하라. _eslint: react/no-string-refs_

```
// bad
<Foo
  ref="myRef"
/>

// good
<Foo
  ref={(ref) => this.myRef = ref}
/>
```

<a name="bracket"></a>
### 괄호

만약 JSX 태그가 두 줄 이상으로 늘어난다면 괄호로 감싸야 한다. _eslint: react/wrap-multilines_

```
// bad
render() {
  return <MyComponent className="long body" foo="bar">
           <MyChild />
         </MyComponent>;
}

// good
render() {
  return (
    <MyComponent className="long body" foo="bar">
      <MyChild />
    </MyComponent>
  );
}

// good, 한 줄이라면 괜찮다.
render() {
  const body = <div>hello</div>;
  return <MyComponent>{body}</MyComponent>;
}
```

<a name="tag"></a>
### 태그

자식 컴포넌트가 없으면 항상 닫힘 태그를 사용한다. _eslint: react/self-closing-comp_

```
// bad
<Foo className="stuff"></Foo>

// good
<Foo className="stuff" />
만약 컴포넌트가 다수의 속성을 가졌다면, 닫힘 태그는 새로운 줄에 작성한다. eslint: react/jsx-closing-bracket-location

// bad
<Foo
  bar="bar"
  baz="baz" />

// good
<Foo
  bar="bar"
  baz="baz"
/>
```

<a name="method"></a>
### 메소드

지역 변수를 둘러싸기 위해서는 화살표 함수를 사용해라.

```
function ItemList(props) {
  return (
    <ul>
      {props.items.map((item, index) => (
        <Item
          key={item.key}
          onClick={() => doSomethingWith(item.name, index)}
        />
      ))}
    </ul>
  );
}
```

리엑트 컴포넌트의 내부 메소드를 위해 언더바 문자를 사용하면 안 된다.

```
// bad
React.createClass({
  _onClickSubmit() {
    // do stuff
  },

  // other stuff
});

// good
class extends React.Component {
  onClickSubmit() {
    // do stuff
  }

  // other stuff
}
```
render 메소드에서는 값을 리턴해야 한다. _eslint: require-render-return_

```
// bad
render() {
  (<div />);
}

// good
render() {
  return (<div />);
}
```
render 메소드에서는 값을 리턴해야 한다. _eslint: require-render-return_

```
// bad
render() {
  (<div />);
}

// good
render() {
  return (<div />);
}
```

<a name="list"></a>
### 순서


* class extends React.Component 를 위한 순서:
  1. 선택적인 static 메소드
  2. constructor
  3. getChildContext
  4. componentWillMount
  5. componentDidMount
  7. componentWillReceiveProps
  8. shouldComponentUpdate
  9. componentWillUpdate
  10. componentDidUpdate
  11. componentWillUnmount
  12. 클릭 핸들러나 이벤트 핸들러 like onClickSubmit() or onChangeDescription()
  13. render를 위한 게터 메소드 like getSelectReason() or getFooterContent()
  14. 선택적인 렌더 메소드 like renderNavigation() or renderProfilePicture()
  15. render
  
* propTypes, defaultProps, contextTypes, etc... 를 정의하는 방법
  
  ```
  import React, { PropTypes } from 'react';

  const propTypes = {
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    text: PropTypes.string,
  };

  const defaultProps = {
    text: 'Hello World',
  };

  class Link extends React.Component {
    static methodsAreOk() {
      return true;
    }

    render() {
      return <a href={this.props.url} data-id={this.props.id}>{this.props.text}</a>
    }
  }

  Link.propTypes = propTypes;
  Link.defaultProps = defaultProps;

  export default Link;
  ```

* React.createClass 를 위한 순서: _eslint: react/sort-comp_

  1. displayName
  2. propTypes
  3. contextTypes
  4. childContextTypes
  5. mixins
  6. statics
  7. defaultProps
  8. getDefaultProps
  9. getInitialState
  10. getChildContext
  11. componentWillMount
  12. componentDidMount
  13. componentWillReceiveProps
  14. shouldComponentUpdate
  15. componentWillUpdate
  16. componentDidUpdate
  17. componentWillUnmount
  18. 클릭 핸들러나 이벤트 핸들러 예시. onClickSubmit() 혹은 onChangeDescription()
  19. render를 위한 게터 메소드 예시. getSelectReason() 혹은 getFooterContent()
  20. 선택적인 렌더 메소드 예시. renderNavigation() 혹은 renderProfilePicture()
  21. render

<a name="is-mounted"></a>
## isMounted

isMounted 를 사용하면 안 된다. _eslint: react/no-is-mounted_

>**노트**: 왜? isMounted 은 안티 패턴이고, ES6 클래스 문법에 적용할 수 없을 뿐더러, 공식적으로 사라지게 될 예정이다.

