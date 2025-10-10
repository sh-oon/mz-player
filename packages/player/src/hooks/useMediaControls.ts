import type { RefObject } from 'react';
import { useCallback, useEffect, useState } from 'react';
import type { MediaState, VideoTrack } from '../types';

export function useMediaControls(
  videoRef: RefObject<HTMLVideoElement | null>,
  containerRef?: RefObject<HTMLDivElement | null>,
  tracks: VideoTrack[] = [],
  useCustomSubtitle = false
) {
  const [state, setState] = useState<MediaState>(() => ({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
    isFullscreen: false,
    isLoading: true,
    currentTrack: tracks.findIndex((track) => track.default) ?? -1,
    availableTracks: tracks,
  }));

  // 재생/일시정지 토글
  const togglePlay = useCallback(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    if (videoElement.paused) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
  }, [videoRef]);

  // 시간 이동
  const seek = useCallback(
    (time: number) => {
      const videoElement = videoRef.current;
      if (!videoElement) return;
      videoElement.currentTime = time;
    },
    [videoRef]
  );

  // 볼륨 조절
  const setVolume = useCallback(
    (volume: number) => {
      const videoElement = videoRef.current;
      if (!videoElement) return;
      videoElement.volume = Math.max(0, Math.min(1, volume));
    },
    [videoRef]
  );

  // 음소거 토글
  const toggleMute = useCallback(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    videoElement.muted = !videoElement.muted;
  }, [videoRef]);

  // 자막 트랙 변경
  const setTrack = useCallback(
    (trackIndex: number) => {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const textTracks = videoElement.textTracks;
      if (!textTracks) return;

      // 모든 트랙 비활성화
      for (let i = 0; i < textTracks.length; i++) {
        textTracks[i].mode = 'hidden';
      }

      // 선택된 트랙 활성화 (커스텀 자막이 아닐 때만 showing으로)
      if (trackIndex >= 0 && trackIndex < textTracks.length) {
        textTracks[trackIndex].mode = useCustomSubtitle ? 'hidden' : 'showing';
      }

      setState((s) => ({ ...s, currentTrack: trackIndex }));
    },
    [videoRef, useCustomSubtitle]
  );

  // 전체화면 토글
  const toggleFullscreen = useCallback(async () => {
    // container가 있으면 container를, 없으면 video를 전체화면으로
    const targetElement = containerRef?.current || videoRef.current;
    if (!targetElement) return;

    try {
      // 전체화면 체크 (브라우저 호환성 고려)
      const isFullscreen =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;

      if (!isFullscreen) {
        // 전체화면 진입 (브라우저별 메서드)
        if (targetElement.requestFullscreen) {
          await targetElement.requestFullscreen();
        } else if (targetElement.webkitRequestFullscreen) {
          await targetElement.webkitRequestFullscreen();
        } else if (targetElement.mozRequestFullScreen) {
          await targetElement.mozRequestFullScreen();
        } else if (targetElement.msRequestFullscreen) {
          await targetElement.msRequestFullscreen();
        }
      } else {
        // 전체화면 해제
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          await document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          await document.msExitFullscreen();
        }
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  }, [videoRef, containerRef]);

  // 비디오 이벤트 리스너
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // 초기 상태 동기화
    setState((s) => ({
      ...s,
      volume: videoElement.volume,
      isMuted: videoElement.muted,
      currentTime: videoElement.currentTime,
      duration: videoElement.duration || 0,
    }));

    const handlePlay = () => setState((s) => ({ ...s, isPlaying: true }));
    const handlePause = () => setState((s) => ({ ...s, isPlaying: false }));
    const handleTimeUpdate = () =>
      setState((s) => ({ ...s, currentTime: videoElement.currentTime }));
    const handleDurationChange = () => setState((s) => ({ ...s, duration: videoElement.duration }));
    const handleVolumeChange = () =>
      setState((s) => ({
        ...s,
        volume: videoElement.volume,
        isMuted: videoElement.muted,
      }));
    const handleLoadStart = () => setState((s) => ({ ...s, isLoading: true }));
    const handleCanPlay = () => setState((s) => ({ ...s, isLoading: false }));
    const handleFullscreenChange = () => {
      const targetElement = containerRef?.current || videoElement;
      const isFullscreen =
        document.fullscreenElement === targetElement ||
        document.webkitFullscreenElement === targetElement ||
        document.mozFullScreenElement === targetElement ||
        document.msFullscreenElement === targetElement;

      setState((s) => ({
        ...s,
        isFullscreen,
      }));
    };

    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);
    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    videoElement.addEventListener('durationchange', handleDurationChange);
    videoElement.addEventListener('volumechange', handleVolumeChange);
    videoElement.addEventListener('loadstart', handleLoadStart);
    videoElement.addEventListener('canplay', handleCanPlay);

    // 전체화면 이벤트 리스너 (브라우저 호환성)
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      videoElement.removeEventListener('durationchange', handleDurationChange);
      videoElement.removeEventListener('volumechange', handleVolumeChange);
      videoElement.removeEventListener('loadstart', handleLoadStart);
      videoElement.removeEventListener('canplay', handleCanPlay);

      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, [videoRef, containerRef]);

  // 초기 트랙 활성화
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setState((s) => ({
      ...s,
      availableTracks: tracks,
      currentTrack: tracks.findIndex((track) => track.default) ?? -1,
    }));

    // 기본 트랙이 있으면 활성화
    const defaultTrackIndex = tracks.findIndex((track) => track.default);
    if (defaultTrackIndex >= 0) {
      const textTracks = video.textTracks;
      if (textTracks && textTracks[defaultTrackIndex]) {
        // 모든 트랙 비활성화
        for (let i = 0; i < textTracks.length; i++) {
          textTracks[i].mode = 'hidden';
        }
        // 기본 트랙만 활성화 (커스텀 자막이 아니면 showing)
        textTracks[defaultTrackIndex].mode = useCustomSubtitle ? 'hidden' : 'showing';
      }
    }
  }, [videoRef, useCustomSubtitle]);

  return {
    state,
    controls: {
      togglePlay,
      seek,
      setVolume,
      toggleMute,
      toggleFullscreen,
      setTrack,
    },
  };
}
