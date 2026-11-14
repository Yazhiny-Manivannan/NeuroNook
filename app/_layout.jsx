
import React, { useEffect, useState } from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../constants/Colors'
import { initializeDatabase } from '../database/database'

const RootLayout = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Initialize SQLite when the application starts.
  useEffect(() => {
    let isMounted = true

    const prepareDatabase = async () => {
      try {
        await initializeDatabase()
      } catch (err) {
        console.error('Database initialization failed:', err)

        if (isMounted) {
          setError(err.message || 'An unexpected error occurred.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    prepareDatabase()

    return () => {
      isMounted = false
    }
  }, [])

  // Show a loading screen while the database initializes.
  if (isLoading) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <ActivityIndicator size="large" color={Colors.navy} />
        <Text style={styles.message}>Preparing NeuroNook...</Text>
      </View>
    )
  }

  // Show an error if database initialization fails.
  if (error) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <Text style={styles.errorTitle}>Database Error</Text>
        <Text style={styles.errorMessage}>{error}</Text>
      </View>
    )
  }

  // Display the normal application navigation.
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
        <Stack.Screen
          name="nervous-system"
          options={{ title: 'Nervous System' }}
        />
        <Stack.Screen
          name="neurological-conditions"
          options={{ title: 'Neurological Conditions' }}
        />
        <Stack.Screen
          name="topic-detail"
          options={{ title: 'Topic Detail' }}
        />
      </Stack>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  message: {
    marginTop: 16,
    color: Colors.navy,
    fontSize: 16,
  },
  errorTitle: {
    color: Colors.navy,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  errorMessage: {
    color: Colors.navy,
    fontSize: 14,
    textAlign: 'center',
  },
})

export default RootLayout
