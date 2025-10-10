import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import type { HLSConfig } from '../types';

export function useHLS(
  videoRef: RefObject<HTMLVideoElement | null>,
  src: string,
  config?: HLSConfig
) {
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !src) return undefined;

    // HLS 스트림인지 확인 (.m3u8 확장자)
    const isHLS = src.includes('.m3u8');

    // HLS 스트림이고 HLS.js가 지원되는 경우
    if (isHLS && Hls.isSupported()) {
      const hls = new Hls({
        debug: config?.debug || false,
        enableWorker: config?.enableWorker ?? true,
        lowLatencyMode: config?.lowLatencyMode || false,
        backBufferLength: config?.backBufferLength || 90,
      });

      hls.loadSource(src);
      hls.attachMedia(videoElement);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log('HLS manifest loaded');
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.error('Network error encountered, trying to recover');
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.error('Media error encountered, trying to recover');
              hls.recoverMediaError();
              break;
            default:
              console.error('Fatal error encountered, cannot recover');
              hls.destroy();
              break;
          }
        }
      });

      hlsRef.current = hls;

      return () => {
        if (hlsRef.current) {
          hlsRef.current.destroy();
          hlsRef.current = null;
        }
      };
    }

    // HLS 스트림이고 네이티브로 지원되는 경우 (Safari) 또는 일반 비디오 파일
    videoElement.src = src;
    videoElement.load(); // 명시적으로 로드 시작

    return () => {
      // cleanup: src 제거
      if (videoRef.current) {
        videoRef.current.src = '';
        videoRef.current.load();
      }
    };
  }, [videoRef, src, config]);

  return hlsRef;
}
