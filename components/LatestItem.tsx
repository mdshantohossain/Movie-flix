import { icons } from "@/constants";
import { usePlayableVideo } from "@/hooks/usePlayableVideo";
import { VideoType } from "@/types";
import { useVideoPlayer, VideoView } from "expo-video";
import { memo, useEffect } from "react";
import { Image, Pressable } from "react-native";
import * as Animatable from "react-native-animatable";

const zoomIn = {
  0: {
    opacity: 0.5,
    scale: 0.8,
  },
  1: {
    opacity: 1,
    scale: 1,
  },
};

const zoomOut = {
  0: {
    opacity: 1,
    scale: 1,
  },
  1: {
    opacity: 0.5,
    scale: 0.8,
  },
};

const videoFile = require("@/assets/video/pal.mp4");

const LatestItem = ({
  activeItem,
  isPlaying,
  item,
  onToggle
}: {
  activeItem: string;
  isPlaying: boolean;
  item: VideoType;
  onToggle: () => void;
}) => {
  const { player, togglePlayBack } = usePlayableVideo(videoFile, isPlaying);

  const hanleToggle = () => {
    togglePlayBack();
    onToggle();
  }

  return (
    <Animatable.View
      className="mx-3"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      <Pressable
        style={{
          width: 208,
          height: 288,
          borderRadius: 35,
          marginVertical: 20,
          overflow: "hidden",
          position: "relative",
        }}
        onPress={hanleToggle}
      >
        <VideoView
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 35,
            opacity: isPlaying ? 1 : 0,
          }}
          player={player}
          allowsFullscreen
          nativeControls={false}
          contentFit="fill"
        />

        {!isPlaying && (
        
          <>
            <Image
              source={{ uri: item.thumbnail }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: 35,
              }}
              resizeMode="cover"
            />

            <Image
              source={icons.play}
              style={{
                position: "absolute",
                width: 48,
                height: 48,
                top: "50%",
                left: "50%",
                marginLeft: -24,
                marginTop: -24,
                zIndex: 2,
              }}
              resizeMode="contain"
            />
          </>
        )}
      </Pressable>
    </Animatable.View>
  );
};

export default memo(LatestItem);
