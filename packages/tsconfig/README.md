# @root/tsconfig

MZ Player 모노레포 전체에서 사용하는 공유 TypeScript 설정 패키지입니다.

## 설정 파일

- **`base.json`** - 기본 TypeScript 설정 (모든 프로젝트의 베이스)
- **`nextjs.json`** - Next.js 앱용 설정 (App Router 지원)
- **`react-library.json`** - React 라이브러리용 설정 (컴포넌트 패키지)

## 사용법

### Next.js 앱 (@root/web)

```json
{
  "extends": "@root/tsconfig/nextjs.json",
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

### React 라이브러리 (mz-player, @root/ui-components)

```json
{
  "extends": "@root/tsconfig/react-library.json",
  "compilerOptions": {
    "outDir": "./dist"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

### 일반 라이브러리 (@root/utils)

```json
{
  "extends": "@root/tsconfig/base.json",
  "compilerOptions": {
    "outDir": "./dist"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

## 주요 설정

모든 설정은 다음을 포함합니다:

- **Strict 모드** - 엄격한 타입 체크
- **ESNext 타겟** - 최신 JavaScript 기능 사용
- **모듈 해석** - Node.js 스타일 모듈 해석
- **Path 매핑** - 워크스페이스 간 타입 해석 지원
