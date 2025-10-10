export interface MediaPlayerProps {
  /** 미디어 소스 URL (HLS 또는 일반 비디오) */
  src: string;
  /** 자동 재생 여부 */
  autoPlay?: boolean;
  /** 컨트롤 표시 여부 */
  controls?: boolean;
  /** 반복 재생 여부 */
  loop?: boolean;
  /** 음소거 여부 */
  muted?: boolean;
  /** 포스터 이미지 URL */
  poster?: string;
  /** 프리로드 옵션 ('none' | 'metadata' | 'auto') */
  preload?: 'none' | 'metadata' | 'auto';
  /** 너비 (CSS 값) */
  width?: string | number;
  /** 높이 (CSS 값) */
  height?: string | number;
  /** CSS 클래스명 */
  className?: string;
  /** 전체화면일 때 사용할 커스텀 컨트롤 */
  fullscreenControls?: (props: FullscreenControlsProps) => React.ReactNode;
  /** 재생 시작 이벤트 */
  onPlay?: () => void;
  /** 일시정지 이벤트 */
  onPause?: () => void;
  /** 재생 종료 이벤트 */
  onEnded?: () => void;
  /** 시간 업데이트 이벤트 */
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  /** 볼륨 변경 이벤트 */
  onVolumeChange?: (volume: number) => void;
  /** 에러 이벤트 */
  onError?: (error: Error) => void;
}

export interface FullscreenControlsProps {
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
}

export interface MediaState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;
  isLoading: boolean;
}

export interface HLSConfig {
  debug?: boolean;
  enableWorker?: boolean;
  lowLatencyMode?: boolean;
  backBufferLength?: number;
}
