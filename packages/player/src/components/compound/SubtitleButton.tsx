import { useState } from 'react';
import { useMediaPlayerContext } from '../../context/MediaPlayerContext';

export interface SubtitleButtonProps {
  /** CSS 클래스명 */
  className?: string;
}

export function SubtitleButton({ className = '' }: Readonly<SubtitleButtonProps>) {
  const { state, setTrack } = useMediaPlayerContext();
  const [showTrackMenu, setShowTrackMenu] = useState(false);

  if (state.availableTracks.length === 0) {
    return null;
  }

  return (
    <div className={`mz-player-subtitle-menu ${className}`}>
      <button
        type="button"
        onClick={() => setShowTrackMenu(!showTrackMenu)}
        className="mz-player-button"
        aria-label="Subtitles"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <title>자막</title>
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 12h4v2H4v-2zm10 6H4v-2h10v2zm6 0h-4v-2h4v2zm0-4H10v-2h10v2z" />
        </svg>
      </button>

      {showTrackMenu && (
        <div className="mz-player-track-menu">
          <button
            type="button"
            className={`mz-player-track-item ${state.currentTrack === -1 ? 'active' : ''}`}
            onClick={() => {
              setTrack(-1);
              setShowTrackMenu(false);
            }}
          >
            자막 끄기
          </button>
          {state.availableTracks.map((track, index) => (
            <button
              key={`track-${track.src}-${index}`}
              type="button"
              className={`mz-player-track-item ${state.currentTrack === index ? 'active' : ''}`}
              onClick={() => {
                setTrack(index);
                setShowTrackMenu(false);
              }}
            >
              {track.label || `자막 ${index + 1}`}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

