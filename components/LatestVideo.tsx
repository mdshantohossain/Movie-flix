import { FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import { VideoType } from "@/types";

import LatestItem from "./LatestItem";

const LatestVideo = ({ posts }: { posts: VideoType[] }) => {
  if (posts.length === 0) return null;
  const [activeItem, setActiveItem] = useState(posts[0].$id || "");
  const [playingVideoId, setPlayingVideoId] = useState<string>("");

  const viewAbleItemsChanged = useCallback(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  }, []);

  // handle play video
  const handleToggle = (id: string) => {
    if (playingVideoId === id) {
      setPlayingVideoId("");
    } else {
      setPlayingVideoId(id);
      setActiveItem(id);
    }
  };

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={posts}
      renderItem={({ item }) => (
        <LatestItem
          key={item.$id}
          activeItem={activeItem}
          isPlaying={playingVideoId === item.$id}
          item={item}
          onToggle={() => handleToggle(item.$id)}
        />
      )}
      keyExtractor={(item) => item.$id}
      onViewableItemsChanged={viewAbleItemsChanged}
      viewabilityConfig={{ viewAreaCoveragePercentThreshold: 70 }}
    />
  );
};

export default LatestVideo;
