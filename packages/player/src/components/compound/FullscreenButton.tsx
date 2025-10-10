import { useMediaPlayerContext } from '../../context/MediaPlayerContext';

export interface FullscreenButtonProps {
  /** CSS 클래스명 */
  className?: string;
}

export function FullscreenButton({ className = '' }: Readonly<FullscreenButtonProps>) {
  const { state, toggleFullscreen } = useMediaPlayerContext();

  return (
    <button
      type="button"
      onClick={toggleFullscreen}
      className={`mz-player-button ${className}`}
      aria-label="Toggle fullscreen"
    >
      {state.isFullscreen ? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <title>전체화면 해제</title>
          <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
        </svg>
      ) : (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <title>전체화면</title>
          <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
        </svg>
      )}
    </button>
  );
}
