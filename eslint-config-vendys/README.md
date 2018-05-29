# eslint-config-vendys

## Usage

현재는 테스트 버전이라 `eslint-config-zlatjs2` 로 올라가 있음

```
  npm install --save-dev eslint-config-vendys
```

프로젝트 내부에 `.eslintrc` 파일 생성 후 아래 코드 추가

```
  {
    "extends": "package",
    "settings": {
      "import/resolver": {
        node: { paths: [path.resolve('./src')] }
      }
    }
  }
```

현재 admin-web eslint 브랜치에 적용되어 있음
