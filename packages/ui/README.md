# @root/ui-components

MZ Player 모노레포 내에서 공유되는 React UI 컴포넌트 라이브러리입니다.

## 개발

```bash
# 개발 모드 (watch 모드로 빌드)
yarn workspace @root/ui-components dev

# 프로덕션 빌드
yarn workspace @root/ui-components build

# 타입 체크
yarn workspace @root/ui-components type-check

# 린트
yarn workspace @root/ui-components lint
```

## 사용법

이 패키지는 모노레포 내부의 다른 워크스페이스에서 사용됩니다:

```tsx
import { Button } from '@root/ui-components';

function App() {
  return <Button onClick={() => console.log('clicked')}>클릭</Button>;
}
```

## 빌드 설정

- **번들러**: tsup
- **출력 형식**: CommonJS, ESM
- **타입 정의**: 자동 생성 (.d.ts)
- **외부 의존성**: React (peer dependency)

## 새 컴포넌트 추가하기

1. `src/` 디렉토리에 컴포넌트 파일 생성
2. `src/index.ts`에서 export
3. 타입 안정성을 위해 TypeScript 사용
4. React 19+ 호환성 유지
