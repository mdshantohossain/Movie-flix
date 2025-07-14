
import { StyleSheet } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <Stack 
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_left'
      }}
    >
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="sign-up" />
    </Stack>
  )
}

export default AuthLayout

const styles = StyleSheet.create({})


/*

package name: com.jsm.movieflix


*/