# @root/web

MZ Player 데모 웹 애플리케이션입니다. Next.js 15와 `mz-player` 패키지를 사용하여 HLS 미디어 플레이어의 기능을 시연합니다.

## 기술 스택

- **Next.js 15** - React 프레임워크 (App Router)
- **Turbopack** - 빠른 개발 서버 및 빌드
- **Tailwind CSS v4** - 유틸리티 우선 CSS 프레임워크
- **mz-player** - HLS 기반 미디어 플레이어 컴포넌트
- **TypeScript** - 타입 안정성

## 개발 서버 실행

모노레포 루트에서:

```bash
# 모든 앱 개발 서버 실행
yarn dev

# 또는 이 앱만 실행
yarn workspace @root/web dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 열어 확인하세요.

## 빌드

```bash
# 모노레포 루트에서
yarn build

# 또는 이 앱만 빌드
yarn workspace @root/web build
```

## 프로젝트 구조

```
apps/web/
├── src/
│   └── app/          # Next.js App Router 페이지
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## 의존성

이 앱은 다음 워크스페이스 패키지를 사용합니다:

- `mz-player` - HLS 미디어 플레이어
- `@root/ui-components` - 공유 UI 컴포넌트

## 로컬 개발

페이지를 수정하려면 `src/app/page.tsx`를 편집하세요. 파일을 저장하면 Turbopack이 자동으로 변경사항을 반영합니다.
