# MZ Player

[![CI](https://github.com/sh-oon/mz-player/actions/workflows/ci.yml/badge.svg)](https://github.com/sh-oon/mz-player/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/mz-player.svg)](https://www.npmjs.com/package/mz-player)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)

HLS 스트리밍을 지원하는 React 기반의 커스터마이징 가능한 미디어 플레이어 컴포넌트입니다.

## ✨ 주요 기능

- ✅ **HLS 스트리밍 지원** - hls.js 기반의 안정적인 HLS 재생
- ✅ **컴파운드 컴포넌트 패턴** - 원하는 UI를 자유롭게 구성
- ✅ **다국어 자막 지원** - VTT 포맷의 다중 자막 트랙
- ✅ **Picture-in-Picture** - PiP 모드 지원
- ✅ **전체화면** - 전체화면 재생 지원
- ✅ **반응형 디자인** - 모든 화면 크기에 대응
- ✅ **TypeScript** - 완전한 타입 안정성
- ✅ **경량화** - 최소한의 번들 크기

## 📦 설치

```bash
# npm
npm install mz-player

# yarn
yarn add mz-player

# pnpm
pnpm add mz-player
```

## 🚀 빠른 시작

### 기본 사용법

```tsx
import { MediaPlayer } from 'mz-player';
import 'mz-player/styles.css';

function App() {
  return (
    <MediaPlayer
      src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
      controls
    />
  );
}
```

### 컴파운드 컴포넌트로 커스터마이징

원하는 컨트롤만 선택하여 UI를 자유롭게 구성할 수 있습니다:

```tsx
import { MediaPlayer } from 'mz-player';
import 'mz-player/styles.css';

function CustomPlayer() {
  return (
    <MediaPlayer src="https://example.com/video.m3u8">
      <MediaPlayer.Controls>
        <MediaPlayer.TimeDisplay />
        <MediaPlayer.SeekBar />
        <MediaPlayer.ButtonGroup>
          <MediaPlayer.PlayButton />
          <MediaPlayer.VolumeControl />
          <MediaPlayer.SubtitleButton />
          <MediaPlayer.PiPButton />
          <MediaPlayer.FullscreenButton />
        </MediaPlayer.ButtonGroup>
      </MediaPlayer.Controls>
    </MediaPlayer>
  );
}
```

## 📖 사용 가능한 컴포넌트

### 컴파운드 컴포넌트

- `MediaPlayer.Controls` - 컨트롤 컨테이너
- `MediaPlayer.ButtonGroup` - 버튼 그룹 컨테이너
- `MediaPlayer.PlayButton` - 재생/일시정지 버튼
- `MediaPlayer.VolumeControl` - 볼륨 컨트롤 (버튼 + 슬라이더)
- `MediaPlayer.SeekBar` - 시간 탐색 바
- `MediaPlayer.TimeDisplay` - 현재 시간/전체 시간 표시
- `MediaPlayer.SubtitleButton` - 자막 선택 버튼
- `MediaPlayer.PiPButton` - Picture-in-Picture 버튼
- `MediaPlayer.FullscreenButton` - 전체화면 버튼

각 컴포넌트는 `className` prop을 통해 스타일을 커스터마이징할 수 있습니다.

## 🎬 자막 추가

```tsx
<MediaPlayer
  src="https://example.com/video.m3u8"
  tracks={[
    {
      src: '/subtitles/ko.vtt',
      kind: 'subtitles',
      srclang: 'ko',
      label: '한국어',
      default: true,
    },
    {
      src: '/subtitles/en.vtt',
      kind: 'subtitles',
      srclang: 'en',
      label: 'English',
    },
  ]}
/>
```

### 커스텀 자막 렌더링

```tsx
<MediaPlayer
  src="https://example.com/video.m3u8"
  tracks={[...]}
  customSubtitle={(subtitle) => (
    <div style={{ color: 'yellow', fontSize: '24px' }}>
      {subtitle}
    </div>
  )}
/>
```

## ⚙️ Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| src | string | required | 미디어 소스 URL (HLS 또는 일반 비디오) |
| autoPlay | boolean | false | 자동 재생 여부 |
| controls | boolean | true | 기본 컨트롤 표시 여부 |
| loop | boolean | false | 반복 재생 여부 |
| muted | boolean | false | 음소거 여부 |
| poster | string | undefined | 포스터 이미지 URL |
| preload | 'none' \| 'metadata' \| 'auto' | 'metadata' | 비디오 프리로드 옵션 |
| tracks | VideoTrack[] | [] | 자막 트랙 목록 |
| customSubtitle | (subtitle: string \| null) => ReactNode | undefined | 커스텀 자막 렌더 함수 |
| width | string \| number | '100%' | 플레이어 너비 |
| height | string \| number | 'auto' | 플레이어 높이 |
| className | string | '' | 추가 CSS 클래스 |
| children | ReactNode | undefined | 커스텀 컨트롤 UI |
| onPlay | () => void | undefined | 재생 시작 이벤트 |
| onPause | () => void | undefined | 일시정지 이벤트 |
| onEnded | () => void | undefined | 재생 종료 이벤트 |
| onTimeUpdate | (currentTime, duration) => void | undefined | 시간 업데이트 이벤트 |
| onVolumeChange | (volume) => void | undefined | 볼륨 변경 이벤트 |
| onError | (error: Error) => void | undefined | 에러 이벤트 |

## 🎨 스타일 커스터마이징

각 컴포넌트는 `className` prop을 지원합니다:

```tsx
<MediaPlayer src="..." className="my-player">
  <MediaPlayer.Controls className="my-controls">
    <MediaPlayer.PlayButton className="my-play-btn" />
  </MediaPlayer.Controls>
</MediaPlayer>
```

기본 스타일을 override하거나 완전히 새로운 스타일을 적용할 수 있습니다.

## 🔧 고급 사용법

### 자동 재생 (AutoPlay)

브라우저의 autoplay 정책으로 인해 자동 재생하려면 `muted`와 함께 사용해야 합니다:

```tsx
<MediaPlayer
  src="https://example.com/video.m3u8"
  autoPlay
  muted
  controls
/>
```

### 이벤트 핸들링

```tsx
<MediaPlayer
  src="https://example.com/video.m3u8"
  onPlay={() => console.log('재생 시작')}
  onPause={() => console.log('일시정지')}
  onEnded={() => console.log('재생 완료')}
  onTimeUpdate={(currentTime, duration) => {
    console.log(`${currentTime} / ${duration}`);
  }}
  onVolumeChange={(volume) => {
    console.log('볼륨:', volume);
  }}
  onError={(error) => {
    console.error('에러 발생:', error);
  }}
/>
```

### 전체화면 커스텀 컨트롤

전체화면 모드에서 다른 UI를 보여줄 수 있습니다:

```tsx
<MediaPlayer
  src="https://example.com/video.m3u8"
  fullscreenControls={(props) => (
    <div className="fullscreen-controls">
      {/* 커스텀 전체화면 UI */}
    </div>
  )}
/>
```

## 🎯 TypeScript 지원

완전한 TypeScript 지원으로 타입 안정성을 제공합니다:

```tsx
import type { MediaPlayerProps, VideoTrack } from 'mz-player';

const tracks: VideoTrack[] = [
  {
    src: '/subtitles/ko.vtt',
    kind: 'subtitles',
    srclang: 'ko',
    label: '한국어',
  },
];

const playerProps: MediaPlayerProps = {
  src: 'https://example.com/video.m3u8',
  tracks,
  autoPlay: false,
};
```

## 🌐 브라우저 지원

- Chrome/Edge (최신 2개 버전)
- Firefox (최신 2개 버전)
- Safari (최신 2개 버전)
- iOS Safari (최신 2개 버전)
- Android Chrome (최신 2개 버전)

HLS 스트리밍은 hls.js를 통해 지원됩니다.

## 📚 예제

데모 애플리케이션은 `apps/web`에서 확인할 수 있습니다:

```bash
git clone https://github.com/sh-oon/mz-player.git
cd mz-player
corepack enable
yarn install
yarn dev
```

브라우저에서 `http://localhost:3000`을 열어 확인하세요.

## 🤝 기여하기

기여는 언제나 환영합니다! 이슈를 생성하거나 Pull Request를 보내주세요.

### 개발 환경 설정

```bash
# 저장소 클론
git clone https://github.com/sh-oon/mz-player.git
cd mz-player

# 의존성 설치
corepack enable
yarn install

# 개발 서버 실행
yarn dev

# 빌드
yarn build

# 린트 및 타입 체크
yarn lint
yarn type-check
```

## 📄 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능합니다.

## 🙋‍♂️ 문의 및 지원

- **GitHub Issues**: [https://github.com/sh-oon/mz-player/issues](https://github.com/sh-oon/mz-player/issues)
- **npm**: [https://www.npmjs.com/package/mz-player](https://www.npmjs.com/package/mz-player)

---

Made with ❤️ by [sh-oon](https://github.com/sh-oon)
