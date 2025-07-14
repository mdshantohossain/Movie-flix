import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import React, { memo, useState } from "react";
import { VideoType } from "@/types";
import { icons } from "@/constants";

type Props = {
  video: VideoType;
  isPlaying: boolean;
  onPlay: () => void;
  onStop: () => void;
}
const VideoCard = ({ video, isPlaying, onPlay, onStop }: Props) => {

  // handle play video
  
  return (
    <View className="flex-col items-center px-4 mb-4">
      <View className="flex-row gap-3 items-start justify-center">
        <View className="flex-1 flex-row justify-center items-center">
          <View className="w-[50px] h-[50px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: video.creator?.avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text className="font-psemibold text-white" numberOfLines={1}>{video.title}</Text>
            <Text className="text-sm text-gray-300" numberOfLines={1}>{video.creator?.username}</Text>
          </View>
        </View>

        <View className="pt-2 ">
          <Image
            source={icons.menu}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </View>
      </View>

      {isPlaying ? (
        <Pressable className="w-full h-60 rounded-xl mt-3 justify-center items-center bg-black bg-opacity-10" onPress={onStop}>
            <Text className="text-white ">Playing</Text>
        </Pressable>
      ) : (
        <TouchableOpacity
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
          activeOpacity={0.7}
          onPress={onPlay}
        >
          <Image
            source={{ uri: video.thumbnail }}
            className="w-full h-full rounded-xl"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />

          
        </TouchableOpacity>
      )}
    </View>
  )
};

export default memo(VideoCard);
