import { useEffect, useRef, useState } from 'react';
import { useHLS } from '../hooks/useHLS';
import { useMediaControls } from '../hooks/useMediaControls';
import { useSubtitles } from '../hooks/useSubtitles';
import type { MediaPlayerProps } from '../types';
import { Controls } from './Controls';

export function MediaPlayer({
  src,
  autoPlay = false,
  controls = true,
  loop = false,
  muted = false,
  poster,
  preload = 'metadata',
  tracks = [],
  customSubtitle,
  width = '100%',
  height = 'auto',
  className = '',
  fullscreenControls,
  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
  onVolumeChange,
  onError,
}: Readonly<MediaPlayerProps>) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 상태 표시 아이콘 (재생/일시정지)
  const [statusIcon, setStatusIcon] = useState<'play' | 'pause' | null>(null);
  const [animationKey, setAnimationKey] = useState(0); // 애니메이션 재시작용 키

  // HLS 초기화
  useHLS(videoRef, src);

  // 미디어 컨트롤
  const { state, controls: mediaControls } = useMediaControls(
    videoRef,
    containerRef,
    tracks,
    !!customSubtitle
  );

  // 자막 처리 (항상 호출, 사용 여부는 아래에서 결정)
  const subtitleText = useSubtitles(videoRef, state.currentTime, state.currentTrack);
  const currentSubtitle = customSubtitle ? subtitleText : null;

  // 재생 상태 변경 시 아이콘 표시
  useEffect(() => {
    // 재생 시작
    if (state.isPlaying) {
      setStatusIcon('play');
      setAnimationKey((prev) => prev + 1); // 애니메이션 재시작
      const timer = setTimeout(() => {
        setStatusIcon(null);
      }, 600); // 유튜브 스타일: 0.6초
      return () => clearTimeout(timer);
    }
    // 일시정지 (비디오가 로드된 후)
    else if (state.currentTime > 0) {
      setStatusIcon('pause');
      setAnimationKey((prev) => prev + 1); // 애니메이션 재시작
      const timer = setTimeout(() => {
        setStatusIcon(null);
      }, 600); // 유튜브 스타일: 0.6초
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [state.isPlaying]);

  // props 초기값 설정 (마운트 시 한 번만)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 초기값 설정
    video.muted = muted;
    video.loop = loop;
  }, []); // 의도적으로 빈 배열 - 마운트 시에만 실행

  // 커스텀 자막 사용 시 네이티브 자막 숨김
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const textTracks = video.textTracks;
    if (!textTracks) return;

    if (customSubtitle) {
      // 커스텀 자막 사용 시: 모든 네이티브 자막을 hidden으로 설정
      for (let i = 0; i < textTracks.length; i++) {
        textTracks[i].mode = 'hidden';
      }
    }
  }, [customSubtitle, state.currentTrack]);

  // autoPlay 처리
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !autoPlay) return undefined;

    const attemptAutoPlay = async () => {
      try {
        await video.play();
      } catch (error) {
        console.warn('AutoPlay was prevented. User interaction may be required.', error);
      }
    };

    // 비디오가 로드되면 자동 재생 시도
    if (video.readyState >= 3) {
      // HAVE_FUTURE_DATA
      attemptAutoPlay();
      return undefined;
    }

    video.addEventListener('canplay', attemptAutoPlay, { once: true });
    return () => video.removeEventListener('canplay', attemptAutoPlay);
  }, [autoPlay]);

  // 이벤트 핸들러
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => onPlay?.();
    const handlePause = () => onPause?.();
    const handleEnded = () => onEnded?.();
    const handleTimeUpdate = () => onTimeUpdate?.(video.currentTime, video.duration);
    const handleVolumeChange = () => onVolumeChange?.(video.volume);
    const handleError = () => onError?.(new Error('Video playback error'));

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('volumechange', handleVolumeChange);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('volumechange', handleVolumeChange);
      video.removeEventListener('error', handleError);
    };
  }, [onPlay, onPause, onEnded, onTimeUpdate, onVolumeChange, onError]);

  return (
    <div
      ref={containerRef}
      className={`mz-player ${className}`}
      style={{
        width,
        height,
        aspectRatio: height === 'auto' ? '16 / 9' : undefined,
      }}
    >
      <video
        ref={videoRef}
        className="mz-player-video"
        loop={loop}
        muted={muted}
        poster={poster}
        playsInline
        preload={preload}
        crossOrigin="anonymous"
        onClick={mediaControls.togglePlay}
      >
        {tracks.map((track, index) => (
          <track
            key={`${track.src}-${index}`}
            src={track.src}
            kind={track.kind || 'subtitles'}
            srcLang={track.srclang}
            label={track.label}
            default={track.default}
          />
        ))}
      </video>

      {/* 커스텀 자막만 렌더링 (customSubtitle prop이 있을 때만) */}
      {customSubtitle && currentSubtitle && state.currentTrack !== -1 && (
        <div className="mz-player-custom-subtitle">{customSubtitle(currentSubtitle)}</div>
      )}

      {controls &&
        (state.isFullscreen && fullscreenControls ? (
          // 전체화면일 때 커스텀 컨트롤 사용
          fullscreenControls({
            state,
            togglePlay: mediaControls.togglePlay,
            seek: mediaControls.seek,
            setVolume: mediaControls.setVolume,
            toggleMute: mediaControls.toggleMute,
            toggleFullscreen: mediaControls.toggleFullscreen,
            setTrack: mediaControls.setTrack,
          })
        ) : (
          // 일반 모드에서는 기본 컨트롤 사용
          <Controls
            state={state}
            onPlayPause={mediaControls.togglePlay}
            onSeek={mediaControls.seek}
            onVolumeChange={mediaControls.setVolume}
            onToggleMute={mediaControls.toggleMute}
            onToggleFullscreen={mediaControls.toggleFullscreen}
            onTrackChange={mediaControls.setTrack}
          />
        ))}

      {state.isLoading && (
        <div className="mz-player-loading">
          <div className="mz-player-spinner" />
        </div>
      )}

      {/* 재생/일시정지 상태 표시 */}
      {statusIcon && (
        <div
          key={animationKey}
          className="mz-player-status-overlay"
        >
          <div className="mz-player-status-icon">
            {statusIcon === 'play' ? (
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="white"
              >
                <title>재생</title>
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="white"
              >
                <title>일시정지</title>
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
