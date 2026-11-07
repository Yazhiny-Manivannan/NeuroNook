import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../constants/Colors'

// Reusable layout used by the placeholder screens in Milestone 01.
// Each real screen will replace this with its own content in a later milestone.
// Props:
//   title       - section name shown on the card
//   description - one line explaining what the screen will contain
//   icon        - Ionicons icon name
const PlaceholderScreen = ({ title, description, icon }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconCircle}>
          <Ionicons name={icon} size={36} color={Colors.white} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.badge}>Placeholder screen</Text>
      </View>

      {/* Opens app/topic-detail.jsx on top of the tabs (stack navigation).
          "params" are passed to the detail screen and read there with useLocalSearchParams. */}
      <Link
        href={{ pathname: '/topic-detail', params: { title: `${title} Detail`, section: title } }}
        asChild
      >
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Open sample detail screen</Text>
        </Pressable>
      </Link>
    </View>
  )
}

export default PlaceholderScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '100%',
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.navy,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
  badge: {
    marginTop: 16,
    fontSize: 12,
    color: Colors.navyMid,
    backgroundColor: Colors.lightBlue,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  button: {
    marginTop: 24,
    backgroundColor: Colors.navyMid,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 15,
  },
})
