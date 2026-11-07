import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import SectionCard from '../../components/SectionCard'

// Every section reachable from the Home screen.
// "href" is the route path, which comes from the file name inside app/.
// (The "(tabs)" folder name is not part of the path.)
const sections = [
  { href: '/brain-explorer', title: 'Brain Explorer', description: 'Regions of the brain', icon: 'search' },
  { href: '/neuron-library', title: 'Neuron Library', description: 'Neuron types and structure', icon: 'library' },
  { href: '/nervous-system', title: 'Nervous System', description: 'Central and peripheral systems', icon: 'git-network' },
  { href: '/neurological-conditions', title: 'Neurological Conditions', description: 'Common conditions explained', icon: 'medkit' },
  { href: '/knowledge-hub', title: 'Knowledge Hub', description: 'Quizzes to test yourself', icon: 'school' },
  { href: '/saved-topics', title: 'Saved Topics', description: 'Your bookmarked topics', icon: 'bookmark' },
]

const Home = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Welcome to NeuroNook</Text>
      <Text style={styles.subheading}>
        An offline guide to the brain, neurons and the nervous system.
      </Text>

      {sections.map((item) => (
        <SectionCard
          key={item.href}
          href={item.href}
          title={item.title}
          description={item.description}
          icon={item.icon}
        />
      ))}
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBlue,
  },
  content: {
    padding: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.navy,
  },
  subheading: {
    fontSize: 15,
    color: Colors.textMuted,
    marginTop: 6,
    marginBottom: 20,
    lineHeight: 22,
  },
})
