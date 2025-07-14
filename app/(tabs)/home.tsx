import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import SearchInput from "@/components/SearchInput";
import LatestVideo from "@/components/LatestVideo";
import { VideoType } from "@/types";
import EmptyState from "@/components/EmptyState";
import useAppWrite from "@/hooks/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { getAllPosts, getLatestPosts } from "@/libs/appwrite";

const HomeScreen = () => {
  const [resfreshing, setRefreshing] = useState<boolean>(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const { data: posts, refetch: latestPostRefetch } = useAppWrite(getAllPosts);
  const { data: trendinPosts, refetch: trendingPostRefetch } = useAppWrite(getLatestPosts);

  console.log('home rendering...');

  const onRefresh = async () => {
    setRefreshing(true);
    await latestPostRefetch();
    await trendingPostRefetch();
    setRefreshing(false);
  }; 

  return (
    <SafeAreaView className="bg-primary flex-1">
      <FlatList
        data={posts}
        keyExtractor={(item: VideoType) => item.$id}
        renderItem={({ item, index }) => (
          <VideoCard
            key={index}
            video={item}
            isPlaying={activeVideoId === item.$id}
            onPlay={() => setActiveVideoId(item.$id)}
            onStop={() => setActiveVideoId(null)}
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 py-6">
            <View className="justify-between items-center flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-300">
                  Welcome Back
                </Text>
                <Text className="text-3xl font-psemibold text-white">
                  Movie Flix
                </Text>
              </View>

              <View>
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput
              onChangeText={() => console.log("change text")}
              handleSerch={() => console.log("pressed on icon")}
            />

            <View className=" flex-1 py-3 my-3">
              <Text className="text-white text-2xl">
                Latest Video
              </Text>
              <LatestVideo posts={trendinPosts} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subTitle="Be the first one to upload a video."
          />
        )}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={resfreshing}
            progressBackgroundColor="#FF9C01"
          />
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;