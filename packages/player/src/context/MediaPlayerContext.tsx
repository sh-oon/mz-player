import { createContext, useContext } from 'react';
import type { MediaState } from '../types';

export interface MediaPlayerContextValue {
  /** 현재 미디어 상태 */
  state: MediaState;
  /** 재생/일시정지 토글 */
  togglePlay: () => void;
  /** 시간 이동 */
  seek: (time: number) => void;
  /** 볼륨 조절 */
  setVolume: (volume: number) => void;
  /** 음소거 토글 */
  toggleMute: () => void;
  /** 전체화면 토글 */
  toggleFullscreen: () => void;
  /** PiP 모드 토글 */
  togglePiP: () => void;
  /** 자막 트랙 변경 */
  setTrack: (trackIndex: number) => void;
}

export const MediaPlayerContext = createContext<MediaPlayerContextValue | null>(null);

export function useMediaPlayerContext() {
  const context = useContext(MediaPlayerContext);
  if (!context) {
    throw new Error('useMediaPlayerContext must be used within MediaPlayer');
  }
  return context;
}
