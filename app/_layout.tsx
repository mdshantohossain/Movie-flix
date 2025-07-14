import React, { useEffect } from 'react';
import { Slot, SplashScreen, Stack } from 'expo-router';
import '@/global.css';
import {useFonts} from 'expo-font';
import GlobalProvider from '@/context/GlobalProvider';
import { StatusBar } from 'react-native';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if(fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  return (
    <GlobalProvider>
       {/* status bar handle */}
       <StatusBar barStyle={'light-content'}  className='bg-primary'/>
        <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
       
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
      </Stack>
    </GlobalProvider>
  )
}

export default RootLayout
