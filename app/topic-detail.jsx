import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { Colors } from '../constants/Colors'

// Generic detail screen opened on top of the tabs (stack navigation).
// useLocalSearchParams reads the values sent by the Link that opened this screen.
const TopicDetail = () => {
  const { title = 'Topic Detail', section = 'Unknown' } = useLocalSearchParams()

  return (
    <View style={styles.container}>
      {/* Sets the header title to the value we received */}
      <Stack.Screen options={{ title }} />

      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.section}>Opened from: {section}</Text>
        <Text style={styles.body}>
          Real topic content will appear here in a later milestone.
          Use the back arrow in the header to return.
        </Text>
      </View>
    </View>
  )
}

export default TopicDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBlue,
    padding: 24,
  },
  card: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.navy,
  },
  section: {
    fontSize: 14,
    color: Colors.navyMid,
    marginTop: 6,
    marginBottom: 16,
  },
  body: {
    fontSize: 15,
    color: Colors.textMuted,
    lineHeight: 22,
  },
})
