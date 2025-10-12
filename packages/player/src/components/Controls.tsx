import type React from 'react';
import { useState } from 'react';
import type { MediaState } from '../types';

interface ControlsProps {
  state: MediaState;
  onPlayPause: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
  onToggleFullscreen: () => void;
  onTogglePiP: () => void;
  onTrackChange: (trackIndex: number) => void;
}

export function Controls({
  state,
  onPlayPause,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onToggleFullscreen,
  onTogglePiP,
  onTrackChange,
}: Readonly<ControlsProps>) {
  const [showTrackMenu, setShowTrackMenu] = useState(false);
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

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSeek(Number(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    onVolumeChange(newVolume);
    if (newVolume > 0 && state.isMuted) {
      // 볼륨을 0 이상으로 변경하면 자동으로 unmute
      onToggleMute();
    }
  };

  return (
    <div className="mz-player-controls">
      <div className="mz-player-progress">
        <div className="mz-player-time">
          <span>{formatTime(state.currentTime)}</span>
          <span>{formatTime(state.duration)}</span>
        </div>
        <input
          type="range"
          min="0"
          max={state.duration || 0}
          value={state.currentTime}
          onChange={handleSeekChange}
          className="mz-player-progress-bar"
        />

        <div className="mz-player-buttons">
          <button
            type="button"
            onClick={onPlayPause}
            className="mz-player-button"
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

          <div className="mz-player-volume">
            <button
              type="button"
              onClick={onToggleMute}
              className="mz-player-button"
              aria-label={state.isMuted ? 'Unmute' : 'Mute'}
            >
              {state.isMuted || state.volume === 0 ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <title>음소거 해제</title>
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <title>음소거</title>
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={state.isMuted ? 0 : state.volume}
              onChange={handleVolumeChange}
              className="mz-player-volume-bar"
            />
          </div>

          {/* 자막 버튼 */}
          {state.availableTracks.length > 0 && (
            <div className="mz-player-subtitle-menu">
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
                      onTrackChange(-1);
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
                        onTrackChange(index);
                        setShowTrackMenu(false);
                      }}
                    >
                      {track.label || `자막 ${index + 1}`}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={onTogglePiP}
            className="mz-player-button"
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

          <button
            type="button"
            onClick={onToggleFullscreen}
            className="mz-player-button"
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
        </div>
      </div>
    </div>
  );
}
