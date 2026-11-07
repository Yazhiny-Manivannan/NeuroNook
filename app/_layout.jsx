import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Colors } from '../constants/Colors'

// Root layout: Expo Router loads this file first.
// It wraps every screen in a Stack navigator (screens open on top of each other
// and get a back button).
// The "(tabs)" folder is a route group: it holds the bottom tabs and is shown
// without a stack header, because the tabs draw their own header.
const RootLayout = () => {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Colors.navy },
          headerTintColor: Colors.white,
          contentStyle: { backgroundColor: Colors.lightBlue },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="nervous-system" options={{ title: 'Nervous System' }} />
        <Stack.Screen name="neurological-conditions" options={{ title: 'Neurological Conditions' }} />
        <Stack.Screen name="topic-detail" options={{ title: 'Topic Detail' }} />
      </Stack>
    </>
  )
}

export default RootLayout
