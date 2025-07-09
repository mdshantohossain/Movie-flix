
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <Stack 
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <StatusBar barStyle="light-content" className="bg-primary" /> */}

        <Stack.Screen name="sign-in" />
        <Stack.Screen name="sign-up" />
    </Stack>
  )
}

export default AuthLayout

const styles = StyleSheet.create({})