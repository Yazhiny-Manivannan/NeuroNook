import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../constants/Colors'

// A tappable card used on the Home screen to open one section of the app.
// Props:
//   href        - route to open, e.g. '/brain-explorer'
//   title       - section name
//   description - short explanation
//   icon        - Ionicons icon name
// <Link asChild> makes the Pressable behave like a link, so the card navigates
// when tapped without us writing an onPress function.
const SectionCard = ({ href, title, description, icon }) => {
  return (
    <Link href={href} asChild>
      <Pressable style={styles.card}>
        <View style={styles.iconBox}>
          <Ionicons name={icon} size={24} color={Colors.white} />
        </View>
        <View style={styles.textBox}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={Colors.skyBlue} />
      </Pressable>
    </Link>
  )
}

export default SectionCard

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: Colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  textBox: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.navy,
  },
  description: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 2,
  },
})
