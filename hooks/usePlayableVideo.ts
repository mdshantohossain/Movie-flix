import { useVideoPlayer } from "expo-video";
import { useCallback, useEffect } from "react";

export const usePlayableVideo = (videoSource: string, isPlay: boolean) => {
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.pause();
  });

  useEffect(() => {
    isPlay ? player.play() : player.pause();
  }, [isPlay]);
  
  const togglePlayBack = useCallback(() => {
    isPlay ? player.play() : player.pause();
  }, [player]);

  return {
    player,
    togglePlayBack,
  };
};
