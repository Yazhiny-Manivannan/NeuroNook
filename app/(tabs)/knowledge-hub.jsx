import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors'

const learningCards = [
  {
    title: 'Learning & Memory',
    description:
      'Explore how the brain learns, stores information and forms memories.',
    image: require('../../assets/knowledge-hub/brain-learning-memory.png'),
    route: '/learning-memory',
  },
  {
    title: 'Neurotransmission',
    description:
      'Discover how neurons communicate and transmit signals.',
    image: require('../../assets/knowledge-hub/neurotransmission.png'),
    route: '/neurotransmission',
  },
]

const KnowledgeHub = () => {
  const router = useRouter()

  const openQuiz = () => {
    router.push('/brain-knowledge-quiz')
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={true}
    >
      {/* Navy Blue Quiz Welcome Section */}
      <View style={styles.hero}>
        <Pressable
          onPress={openQuiz}
          accessibilityRole="button"
          accessibilityLabel="Open Brain Knowledge Quiz"
          style={({ pressed }) => [
            styles.heroImageButton,
            pressed && styles.cardPressed,
          ]}
        >
          <Image
            source={require('../../assets/knowledge-hub/neuroscience-quiz-welcome.png')}
            style={styles.heroImage}
            resizeMode="contain"
            accessibilityLabel="Neuroscience quiz welcome illustration"
          />
        </Pressable>

        <Text style={styles.heroTitle}>
          Brain Knowledge Quiz
        </Text>

        <Text style={styles.heroSubtitle}>
          Challenge your brain and test your neuroscience knowledge.
        </Text>
      </View>

      {/* Interactive Learning Lessons */}
      <View style={styles.learningSection}>
        <Text style={styles.sectionTitle}>
          Explore & Learn
        </Text>

        <Text style={styles.sectionSubtitle}>
          Discover more about how your nervous system works.
        </Text>

        {learningCards.map((item) => (
          <Pressable
            key={item.title}
            style={({ pressed }) => [
              styles.learningCard,
              pressed && styles.cardPressed,
            ]}
            onPress={() => router.push(item.route)}
            accessibilityRole="button"
            accessibilityLabel={`Explore ${item.title} lesson`}
          >
            <Image
              source={item.image}
              style={styles.learningImage}
              resizeMode="contain"
              accessibilityLabel={item.title}
            />

            <View style={styles.learningTextContainer}>
              <Text style={styles.learningTitle}>
                {item.title}
              </Text>

              <Text style={styles.learningDescription}>
                {item.description}
              </Text>

              <View style={styles.exploreButton}>
                <Text style={styles.exploreButtonText}>
                  Explore Lesson
                </Text>

                <Ionicons
                  name="arrow-forward"
                  size={17}
                  color={Colors.navyMid}
                />
              </View>
            </View>
          </Pressable>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Ionicons
          name="bulb-outline"
          size={19}
          color={Colors.navyMid}
        />

        <Text style={styles.footerText}>
          Learn something new with every question. Your brain is always growing!
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBlue,
  },

  content: {
    padding: 18,
    paddingBottom: 35,
  },

  // Navy Blue Hero Section
  hero: {
    backgroundColor: Colors.navy,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },

  heroImageButton: {
    width: '100%',
    alignItems: 'center',
  },

  heroImage: {
    width: '100%',
    height: 175,
    marginBottom: 12,
  },

  heroTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 8,
  },

  heroSubtitle: {
    color: Colors.lightBlue,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
  },

  // Learning Section
  learningSection: {
    marginTop: 10,
  },

  sectionTitle: {
    color: Colors.navy,
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  sectionSubtitle: {
    color: Colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 14,
  },

  learningCard: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 15,
    marginBottom: 14,
    elevation: 2,
  },

  cardPressed: {
    opacity: 0.8,
  },

  learningImage: {
    width: '100%',
    height: 165,
    marginBottom: 10,
  },

  learningTextContainer: {
    paddingHorizontal: 3,
    paddingBottom: 4,
  },

  learningTitle: {
    color: Colors.navy,
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  learningDescription: {
    color: Colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
  },

  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 12,
  },

  exploreButtonText: {
    color: Colors.navyMid,
    fontSize: 14,
    fontWeight: '700',
  },

  // Footer
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 16,
    marginTop: 8,
  },

  footerText: {
    flex: 1,
    color: Colors.textMuted,
    fontSize: 12,
    lineHeight: 19,
  },
})

export default KnowledgeHub
