module.exports = {
  parserPreset: {
    parserOpts: {
      issuePrefixes: [
        "#",
        "gh-",
        "PROD-"
      ]
    }
  },
  // 명확한 설정을 위해 가능한 모든 규칙을 나열(http://marionebl.github.io/commitlint/#/reference-rules)
  rules: {
    // `body` 앞에 빈 줄 사용
    // http://marionebl.github.io/commitlint/#/reference-rules?id=body-leading-blank
    'body-leading-blank': [2, 'always'],

    // `body`의 최대 길이
    // http://marionebl.github.io/commitlint/#/reference-rules?id=body-max-length
    'body-max-length': [0, 'always', Infinity],

    // `body`의 최소 길이
    // http://marionebl.github.io/commitlint/#/reference-rules?id=body-min-length
    'body-min-length': [0, 'always', 0],

    // `footer` 앞에 빈 줄 사용
    // http://marionebl.github.io/commitlint/#/reference-rules?id=footer-leading-blank
    'footer-leading-blank': [2, 'always'],

    // `footer`의 최대 길이
    // http://marionebl.github.io/commitlint/#/reference-rules?id=footer-max-length
    'footer-max-length': [0, 'always', Infinity],

    // `footer`의 최소 길이
    // http://marionebl.github.io/commitlint/#/reference-rules?id=footer-min-length
    'footer-min-length': [0, 'always', 0],

    // `header`의 최대 길이
    // http://marionebl.github.io/commitlint/#/reference-rules?id=header-max-length
    'header-max-length': [2, 'always', 72],

    // `header`의 최소 길이
    // http://marionebl.github.io/commitlint/#/reference-rules?id=header-min-length
    'header-min-length': [2, 'always', 1],

    // 이슈에 대한 참조를 반드시 포함
    // http://marionebl.github.io/commitlint/#/reference-rules?id=references-empty
    'references-empty': [0, 'never'],

    // `scope`에 사용할 수 있는 값
    // http://marionebl.github.io/commitlint/#/reference-rules?id=scope-enum
    'scope-enum': [0, 'always', []],

    // `scope`의 대소문자 구분
    // http://marionebl.github.io/commitlint/#/reference-rules?id=scope-case
    'scope-case': [2, 'always', 'upper-case'],

    // `scope` 생략 가능
    // http://marionebl.github.io/commitlint/#/reference-rules?id=scope-empty
    'scope-empty': [0, 'never'],

    // `scope`의 최대 길이
    // http://marionebl.github.io/commitlint/#/reference-rules?id=scope-max-length
    'scope-max-length': [0, 'always', Infinity],

    // `scope`의 최소 길이
    // http://marionebl.github.io/commitlint/#/reference-rules?id=scope-min-length
    'scope-min-length': [0, 'always', 0],

    // `subject`의 대소문자 구분
    // http://marionebl.github.io/commitlint/#/reference-rules?id=subject-case
    'subject-case': [0, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],

    // `subject` 생략 가능
    // http://marionebl.github.io/commitlint/#/reference-rules?id=subject-empty
    'subject-empty': [2, 'never'],

    // `subject` 끝의 마침표 사용 가능
    // http://marionebl.github.io/commitlint/#/reference-rules?id=subject-full-stop
    'subject-full-stop': [2, 'never', '.'],

    // `subject`의 최대 길이
    // http://marionebl.github.io/commitlint/#/reference-rules?id=subject-max-length
    'subject-max-length': [0, 'always', Infinity],

    // `subject`의 최소 길이
    // http://marionebl.github.io/commitlint/#/reference-rules?id=subject-min-length
    'subject-min-length': [2, 'always', 1],

    // `type`에 사용할 수 있는 값
    // http://marionebl.github.io/commitlint/#/reference-rules?id=type-enum
    'type-enum': [2, 'always', [
        'revert',
        'build',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'style',
        'test',
      ],
    ],

    // `type`의 대소문자 구분
    // http://marionebl.github.io/commitlint/#/reference-rules?id=type-case
    'type-case': [2, 'always', 'lower-case'],

    // `type` 생략 가능
    // http://marionebl.github.io/commitlint/#/reference-rules?id=type-empty
    'type-empty': [2, 'never'],

    // `type`의 최대 길이
    // http://marionebl.github.io/commitlint/#/reference-rules?id=type-max-length
    'type-max-length': [0, 'always', Infinity],

    // `type`의 최소 길이
    // http://marionebl.github.io/commitlint/#/reference-rules?id=type-min-length
    'type-min-length': [2, 'always', 1],

    // 커밋 메시지의 서명
    // http://marionebl.github.io/commitlint/#/reference-rules?id=signed-off-by
    'signed-off-by': [0, 'always', 'Signed-off-by:'],
  },
};
