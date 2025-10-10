# @mz-player/player

HLS 기반의 React 웹 미디어 플레이어 컴포넌트 라이브러리입니다.

## 설치

```bash
npm install @mz-player/player
# or
yarn add @mz-player/player
# or
pnpm add @mz-player/player
```

## 사용법

```tsx
import { MediaPlayer } from '@mz-player/player';

function App() {
  return (
    <MediaPlayer
      src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
      controls
    />
  );
}
```

### 자동 재생 (AutoPlay)

브라우저의 autoplay 정책으로 인해 자동 재생하려면 `muted`와 함께 사용해야 합니다:

```tsx
<MediaPlayer
  src="https://example.com/video.mp4"
  autoPlay
  muted
  controls
/>
```

## 기능

- ✅ HLS 스트리밍 지원
- ✅ 반응형 디자인
- ✅ 커스텀 가능한 컨트롤
- ✅ TypeScript 지원
- ✅ 경량화된 번들 크기

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| src | string | required | 미디어 소스 URL (HLS 또는 일반 비디오) |
| autoPlay | boolean | false | 자동 재생 여부 (브라우저 정책상 muted와 함께 사용 권장) |
| controls | boolean | true | 컨트롤 표시 여부 |
| loop | boolean | false | 반복 재생 여부 |
| muted | boolean | false | 음소거 여부 |
| poster | string | undefined | 포스터 이미지 URL |
| preload | 'none' \| 'metadata' \| 'auto' | 'metadata' | 비디오 프리로드 옵션 |
| width | string \| number | '100%' | 플레이어 너비 |
| height | string \| number | 'auto' | 플레이어 높이 |
| className | string | '' | 추가 CSS 클래스 |
| onPlay | () => void | undefined | 재생 시작 이벤트 |
| onPause | () => void | undefined | 일시정지 이벤트 |
| onEnded | () => void | undefined | 재생 종료 이벤트 |
| onTimeUpdate | (currentTime, duration) => void | undefined | 시간 업데이트 이벤트 |
| onVolumeChange | (volume) => void | undefined | 볼륨 변경 이벤트 |
| onError | (error: Error) => void | undefined | 에러 이벤트 |

## 라이선스

MIT
