import { useMediaPlayerContext } from '../../context/MediaPlayerContext';

export interface TimeDisplayProps {
  /** CSS 클래스명 */
  className?: string;
}

export function TimeDisplay({ className = '' }: Readonly<TimeDisplayProps>) {
  const { state } = useMediaPlayerContext();

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds)) return '0:00';

    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`mz-player-time ${className}`}>
      <span>{formatTime(state.currentTime)}</span>
      <span>{formatTime(state.duration)}</span>
    </div>
  );
}
