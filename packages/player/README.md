# @root/player

HLS 기반의 React 웹 미디어 플레이어 컴포넌트 라이브러리입니다.

## 설치

```bash
npm install @root/player
# or
yarn add @root/player
# or
pnpm add @root/player
```

## 사용법

### 기본 사용법

```tsx
import { MediaPlayer } from '@root/player';

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

원하는 컨트롤만 선택하여 자유롭게 UI를 구성할 수 있습니다:

```tsx
import { MediaPlayer } from '@root/player';

function CustomPlayer() {
  return (
    <MediaPlayer src="https://example.com/video.mp4">
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

#### 사용 가능한 컴파운드 컴포넌트

- `MediaPlayer.Controls` - 컨트롤 컨테이너
- `MediaPlayer.ButtonGroup` - 버튼 그룹 컨테이너
- `MediaPlayer.PlayButton` - 재생/일시정지 버튼
- `MediaPlayer.VolumeControl` - 볼륨 컨트롤 (버튼 + 슬라이더)
- `MediaPlayer.SeekBar` - 시간 탐색 바
- `MediaPlayer.TimeDisplay` - 시간 표시
- `MediaPlayer.SubtitleButton` - 자막 선택 버튼
- `MediaPlayer.PiPButton` - Picture-in-Picture 버튼
- `MediaPlayer.FullscreenButton` - 전체화면 버튼

각 컴포넌트는 `className` prop을 받아 스타일을 커스터마이징할 수 있습니다.

### 자막 추가

```tsx
<MediaPlayer
  src="https://example.com/video.mp4"
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
  src="https://example.com/video.mp4"
  tracks={[...]}
  customSubtitle={(subtitle) => (
    <div style={{ color: 'yellow', fontSize: '24px' }}>
      {subtitle}
    </div>
  )}
/>
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
- ✅ 컴파운드 컴포넌트로 자유로운 커스터마이징
- ✅ 다국어 자막 지원
- ✅ Picture-in-Picture 모드
- ✅ 전체화면 지원
- ✅ TypeScript 지원
- ✅ 경량화된 번들 크기

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| src | string | required | 미디어 소스 URL (HLS 또는 일반 비디오) |
| autoPlay | boolean | false | 자동 재생 여부 (브라우저 정책상 muted와 함께 사용 권장) |
| controls | boolean | true | 컨트롤 표시 여부 (children이 있으면 무시됨) |
| loop | boolean | false | 반복 재생 여부 |
| muted | boolean | false | 음소거 여부 |
| poster | string | undefined | 포스터 이미지 URL |
| preload | 'none' \| 'metadata' \| 'auto' | 'metadata' | 비디오 프리로드 옵션 |
| tracks | VideoTrack[] | [] | 자막 트랙 목록 |
| customSubtitle | (subtitle: string \| null) => ReactNode | undefined | 커스텀 자막 렌더링 함수 |
| width | string \| number | '100%' | 플레이어 너비 |
| height | string \| number | 'auto' | 플레이어 높이 |
| className | string | '' | 추가 CSS 클래스 |
| children | ReactNode | undefined | 컴파운드 컴포넌트를 사용한 커스텀 컨트롤 |
| fullscreenControls | (props) => ReactNode | undefined | 전체화면일 때 사용할 커스텀 컨트롤 |
| onPlay | () => void | undefined | 재생 시작 이벤트 |
| onPause | () => void | undefined | 일시정지 이벤트 |
| onEnded | () => void | undefined | 재생 종료 이벤트 |
| onTimeUpdate | (currentTime, duration) => void | undefined | 시간 업데이트 이벤트 |
| onVolumeChange | (volume) => void | undefined | 볼륨 변경 이벤트 |
| onError | (error: Error) => void | undefined | 에러 이벤트 |

## 라이선스

MIT
