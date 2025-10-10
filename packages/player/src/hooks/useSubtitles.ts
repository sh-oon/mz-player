import type { RefObject } from 'react';
import { useEffect, useState } from 'react';

interface SubtitleCue {
  start: number;
  end: number;
  text: string;
}

export function useSubtitles(
  videoRef: RefObject<HTMLVideoElement | null>,
  currentTime: number,
  currentTrackIndex: number
) {
  const [currentSubtitle, setCurrentSubtitle] = useState<string | null>(null);
  const [cues, setCues] = useState<SubtitleCue[]>([]);

  // track 변경 감지 및 cue 파싱
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tracks = video.textTracks;
    if (!tracks || tracks.length === 0 || currentTrackIndex < 0) {
      setCues([]);
      return;
    }

    const handleTrackLoad = () => {
      const track = tracks[currentTrackIndex];
      if (!track) return;

      // cue 파싱
      const parsedCues: SubtitleCue[] = [];
      if (track.cues) {
        for (let j = 0; j < track.cues.length; j++) {
          const cue = track.cues[j] as VTTCue;
          parsedCues.push({
            start: cue.startTime,
            end: cue.endTime,
            text: cue.text,
          });
        }
      }
      setCues(parsedCues);
    };

    const track = tracks[currentTrackIndex];
    if (track) {
      // track이 로드되었는지 확인
      if (track.cues && track.cues.length > 0) {
        handleTrackLoad();
      } else {
        // 아직 로드되지 않았으면 이벤트 대기
        track.addEventListener('load', handleTrackLoad);
      }
    }

    return () => {
      if (track) {
        track.removeEventListener('load', handleTrackLoad);
      }
    };
  }, [videoRef, currentTrackIndex]);

  // currentTime에 맞는 자막 찾기
  useEffect(() => {
    const activeCue = cues.find((cue) => currentTime >= cue.start && currentTime <= cue.end);
    setCurrentSubtitle(activeCue ? activeCue.text : null);
  }, [currentTime, cues]);

  return currentSubtitle;
}
