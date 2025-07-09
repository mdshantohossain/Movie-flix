import { Link, Redirect, router } from "expo-router";
import { Image, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import Button from "@/components/Button";

export default function Index() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <StatusBar barStyle="light-content" className="bg-primary" />
      <ScrollView contentContainerStyle={{ height: "100%", justifyContent: "center" }}>
        <View className="w-full justify-content-center items-center px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
           />

           <Image
           source={images.cards}
           className="w-[380px] h-[300px]"
           resizeMode="contain"
            />

            <View className="relative mt-5 mb-10">
                <Text className="text-3xl text-white font-bold text-center">
                    Discover Endless{"\n"} Possibilities With 
                    <Text className="text-secondary-200"> Movie Flix</Text> 
                </Text>

                <Image
                    source={images.path}
                    className="w-[166px] h-[22px] absolute -bottom-5 -right-8"
                    resizeMode="contain"
                />
            </View>

            <Text className="text-white text-center font-pregular text-gray-100">
                Where creativity meets innovation: embark on a journey of limitless exploration with Movie Flix
            </Text>

            <Button
                label="Continue with Email"
                onPress={() => router.push('/(auth)/sign-in')}
                containerStyles="w-full mt-10 h-[52px]"
            />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
