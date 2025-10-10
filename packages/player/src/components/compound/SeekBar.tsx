import type React from 'react';
import { useMediaPlayerContext } from '../../context/MediaPlayerContext';

export interface SeekBarProps {
  /** CSS 클래스명 */
  className?: string;
}

export function SeekBar({ className = '' }: Readonly<SeekBarProps>) {
  const { state, seek } = useMediaPlayerContext();

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(Number(e.target.value));
  };

  return (
    <input
      type="range"
      min="0"
      max={state.duration || 0}
      value={state.currentTime}
      onChange={handleSeekChange}
      className={`mz-player-progress-bar ${className}`}
    />
  );
}

