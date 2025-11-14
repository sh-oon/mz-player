# @root/utils

MZ Player 모노레포 내에서 공유되는 유틸리티 함수 라이브러리입니다.

## 개발

```bash
# 개발 모드 (watch 모드로 빌드)
yarn workspace @root/utils dev

# 프로덕션 빌드
yarn workspace @root/utils build

# 타입 체크
yarn workspace @root/utils type-check

# 린트
yarn workspace @root/utils lint
```

## 사용법

이 패키지는 모노레포 내부의 다른 워크스페이스에서 사용됩니다:

```ts
import { formatDate, debounce } from '@root/utils';

const today = formatDate(new Date());
const debouncedFn = debounce(() => console.log('실행!'), 300);
```

## 빌드 설정

- **번들러**: tsup
- **출력 형식**: CommonJS (`dist/index.js`), ESM (`dist/index.mjs`)
- **타입 정의**: 자동 생성 (`dist/index.d.ts`)
- **외부 의존성**: 없음 (순수 유틸리티)

## 코드 품질

이 패키지는 더 엄격한 Biome 규칙을 적용합니다:

- `noExplicitAny`: **error** (다른 패키지는 warn)
- `noUnusedVariables`: **error** (다른 패키지는 warn)

## 새 유틸리티 추가하기

1. `src/` 디렉토리에 유틸리티 파일 생성
2. `src/index.ts`에서 export
3. 순수 함수로 작성 (부작용 없이)
4. 완전한 타입 정의 제공 (any 사용 금지)
5. JSDoc 주석으로 사용법 문서화
