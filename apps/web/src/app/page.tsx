'use client';

import { MediaPlayer } from '@root/player';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-4">🎬 MZ Player</h1>
          <p className="text-xl text-gray-300 mb-2">HLS 기반의 React 웹 미디어 플레이어</p>
          <p className="text-gray-400">가볍고, 빠르고, 사용하기 쉬운 미디어 플레이어 컴포넌트</p>
        </header>

        {/* Demo Section - 기본 사용법 */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-2">기본 사용법</h2>
            <p className="text-gray-300 mb-6">간단한 props로 빠르게 시작하세요</p>
            <div className="aspect-video">
              <MediaPlayer
                src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                controls
                autoPlay
                muted
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
                  {
                    src: '/subtitles/ja.vtt',
                    kind: 'subtitles',
                    srclang: 'ja',
                    label: '日本語',
                  },
                ]}
                customSubtitle={(subtitle) => <div className="text-white">{subtitle}</div>}
              />
            </div>
          </div>
        </section>

        {/* Demo Section - 컴파운드 컴포넌트 */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-2">컴파운드 컴포넌트 패턴 🎨</h2>
            <p className="text-gray-300 mb-6">
              원하는 컨트롤만 자유롭게 조합하여 커스텀 UI를 만들 수 있습니다
            </p>
            <div className="aspect-video">
              <MediaPlayer
                src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                autoPlay
                muted
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
                  {
                    src: '/subtitles/ja.vtt',
                    kind: 'subtitles',
                    srclang: 'ja',
                    label: '日本語',
                  },
                ]}
                customSubtitle={(subtitle) => <div className="text-white">{subtitle}</div>}
              >
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
            </div>
            <div className="mt-4 p-4 bg-slate-950 rounded-lg">
              <pre className="text-blue-300 font-mono text-xs overflow-x-auto">
                {`<MediaPlayer src="...">
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
</MediaPlayer>`}
              </pre>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">주요 기능</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl mb-4">📡</div>
              <h3 className="text-xl font-bold text-white mb-2">HLS 스트리밍</h3>
              <p className="text-gray-300">HLS.js 기반으로 다양한 스트리밍 형식을 지원합니다</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-white mb-2">빠른 성능</h3>
              <p className="text-gray-300">최적화된 번들 크기와 빠른 로딩 속도를 제공합니다</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-white mb-2">커스터마이징</h3>
              <p className="text-gray-300">
                원하는 대로 스타일과 기능을 커스터마이즈할 수 있습니다
              </p>
            </div>
          </div>
        </section>

        {/* Installation Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">빠른 시작</h2>
          <div className="bg-slate-950 rounded-xl p-6 shadow-2xl">
            <div className="mb-6">
              <p className="text-gray-400 mb-2">설치</p>
              <code className="text-green-400 font-mono">npm install @root/player</code>
            </div>
            <div className="mb-6">
              <p className="text-gray-400 mb-2">기본 사용법</p>
              <pre className="text-blue-300 font-mono text-sm overflow-x-auto">
                {`import { MediaPlayer } from '@root/player';

function App() {
  return (
    <MediaPlayer
      src="https://example.com/video.m3u8"
      controls
      autoPlay={false}
    />
  );
}`}
              </pre>
            </div>
            <div>
              <p className="text-gray-400 mb-2">컴파운드 컴포넌트로 커스터마이징</p>
              <pre className="text-blue-300 font-mono text-sm overflow-x-auto">
                {`import { MediaPlayer } from '@root/player';

function CustomPlayer() {
  return (
    <MediaPlayer src="https://example.com/video.m3u8">
      <MediaPlayer.Controls>
        <MediaPlayer.TimeDisplay />
        <MediaPlayer.SeekBar />
        <MediaPlayer.ButtonGroup>
          <MediaPlayer.PlayButton />
          <MediaPlayer.VolumeControl />
          {/* 원하는 컨트롤만 선택 */}
        </MediaPlayer.ButtonGroup>
      </MediaPlayer.Controls>
    </MediaPlayer>
  );
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-400">
          <p>MIT License • Built with React & TypeScript</p>
        </footer>
      </div>
    </div>
  );
}
