import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native'

import { Colors } from '../../constants/Colors'
import SectionCard from '../../components/SectionCard'

const sections = [
  {
    href: '/brain-explorer',
    title: 'Brain Explorer',
    description: 'Regions of the brain',
    icon: 'search',
  },
  {
    href: '/neuron-library',
    title: 'Neuron Library',
    description: 'Neuron types and structure',
    icon: 'library',
  },
  {
    href: '/nervous-system',
    title: 'Nervous System',
    description: 'Central and peripheral systems',
    icon: 'git-network',
  },
  {
    href: '/neurological-conditions',
    title: 'Neurological Conditions',
    description: 'Common conditions explained',
    icon: 'medkit',
  },
  {
    href: '/knowledge-hub',
    title: 'Knowledge Hub',
    description: 'Quizzes to test yourself',
    icon: 'school',
  },
  {
    href: '/saved-topics',
    title: 'Saved Topics',
    description: 'Your bookmarked topics',
    icon: 'bookmark',
  },
]

const Home = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={true}
    >
      {/* Welcome section */}
      <Text style={styles.heading}>
        Welcome to NeuroNook
      </Text>

      <Text style={styles.subheading}>
        An offline guide to the brain, neurons and the nervous system.
      </Text>

      {/* Main hero card */}
      <View style={styles.heroCard}>
        <Image
          source={require('../../assets/home/neuroscience-welcome.png')}
          style={styles.heroImage}
          resizeMode="contain"
          accessibilityLabel="Neuroscience brain illustration"
        />

        <Text style={styles.heroTitle}>
          Discover the World of Your Brain
        </Text>

        <Text style={styles.heroDescription}>
          Explore the structures, functions and fascinating science
          behind the human nervous system.
        </Text>
      </View>

      {/* Navigation sections */}
      <Text style={styles.sectionHeading}>
        Explore NeuroNook
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
    paddingBottom: 30,
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

  heroCard: {
    backgroundColor: Colors.navy,
    borderRadius: 20,
    padding: 16,
    marginBottom: 26,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },

  heroImage: {
    width: '100%',
    height: 175,
    marginBottom: 12,
  },

  heroTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 8,
  },

  heroDescription: {
    fontSize: 14,
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 21,
  },

  sectionHeading: {
    fontSize: 21,
    fontWeight: 'bold',
    color: Colors.navy,
    marginBottom: 14,
  },
})
