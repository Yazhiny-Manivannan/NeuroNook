import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../constants/Colors'

// Bottom tab bar for the five main sections.
// Each Tabs.Screen "name" is the file name inside app/(tabs)/ (index = Home).
// Nervous System and Neurological Conditions are NOT tabs: they live in app/
// and open as stack screens from the Home screen.
// "title" is the header text, "tabBarLabel" is the shorter text under the icon.
const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: Colors.navy },
        headerTintColor: Colors.white,
        tabBarStyle: { backgroundColor: Colors.navy, borderTopColor: Colors.navy },
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: Colors.skyBlue,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'NeuroNook',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="brain-explorer"
        options={{
          title: 'Brain Explorer',
          tabBarLabel: 'Brain',
          tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="neuron-library"
        options={{
          title: 'Neuron Library',
          tabBarLabel: 'Neurons',
          tabBarIcon: ({ color, size }) => <Ionicons name="library" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="knowledge-hub"
        options={{
          title: 'Knowledge Hub',
          tabBarLabel: 'Knowledge',
          tabBarIcon: ({ color, size }) => <Ionicons name="school" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="saved-topics"
        options={{
          title: 'Saved Topics',
          tabBarLabel: 'Saved',
          tabBarIcon: ({ color, size }) => <Ionicons name="bookmark" size={size} color={color} />,
        }}
      />
    </Tabs>
  )
}

export default TabsLayout
