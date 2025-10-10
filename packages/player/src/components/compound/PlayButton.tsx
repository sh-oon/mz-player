import { useMediaPlayerContext } from '../../context/MediaPlayerContext';

export interface PlayButtonProps {
  /** CSS 클래스명 */
  className?: string;
}

export function PlayButton({ className = '' }: Readonly<PlayButtonProps>) {
  const { state, togglePlay } = useMediaPlayerContext();

  return (
    <button
      type="button"
      onClick={togglePlay}
      className={`mz-player-button ${className}`}
      aria-label={state.isPlaying ? 'Pause' : 'Play'}
    >
      {state.isPlaying ? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <title>일시정지</title>
          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
        </svg>
      ) : (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <title>재생</title>
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  );
}
