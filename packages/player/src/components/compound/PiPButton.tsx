import { useMediaPlayerContext } from '../../context/MediaPlayerContext';

export interface PiPButtonProps {
  /** CSS 클래스명 */
  className?: string;
}

export function PiPButton({ className = '' }: Readonly<PiPButtonProps>) {
  const { state, togglePiP } = useMediaPlayerContext();

  return (
    <button
      type="button"
      onClick={togglePiP}
      className={`mz-player-button ${className}`}
      aria-label="Toggle Picture-in-Picture"
    >
      {state.isPiP ? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <title>PiP 해제</title>
          <path d="M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98V5c0-1.1-.9-2-2-2zm0 16.01H3V4.98h18v14.03z" />
        </svg>
      ) : (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <title>PiP</title>
          <path d="M19 11h-8v6h8v-6zm4-6H1v14h22V5zm-2 12H3V7h18v10z" />
        </svg>
      )}
    </button>
  );
}
