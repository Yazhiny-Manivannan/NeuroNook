
import React, { useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../constants/Colors'

const concepts = [
  {
    number: '01',
    title: 'What is Learning?',
    description:
      'Learning is the process of gaining new knowledge or skills through experience, practice and study.',
    example:
      'When you practise riding a bicycle, your brain gradually learns the movements needed to maintain balance.',
    icon: 'school-outline',
  },
  {
    number: '02',
    title: 'What is Memory?',
    description:
      'Memory is the ability of the brain to encode, store and retrieve information when it is needed.',
    example:
      "Remembering your friend's name or recalling what you studied yesterday are examples of memory.",
    icon: 'albums-outline',
  },
  {
    number: '03',
    title: 'The Hippocampus',
    description:
      'The hippocampus is an important brain structure involved in forming new memories and supporting learning.',
    example:
      'It helps you form memories about a new place you visit or a new subject you study.',
    icon: 'brain',
  },
  {
    number: '04',
    title: 'Neuroplasticity',
    description:
      'Neuroplasticity is the ability of the brain to change and adapt by modifying connections between neurons.',
    example:
      'Repeatedly practising a new skill can strengthen the neural connections involved in that skill.',
    icon: 'git-network-outline',
  },
]

const memoryTypes = [
  {
    title: 'Sensory Memory',
    duration: 'Very brief',
    description:
      'Temporarily holds information received through the senses, such as a sound or image.',
  },
  {
    title: 'Short-Term Memory',
    duration: 'Seconds',
    description:
      'Holds a small amount of information temporarily, such as remembering a phone number.',
  },
  {
    title: 'Long-Term Memory',
    duration: 'Long-lasting',
    description:
      'Stores information for extended periods, from days to many years.',
  },
]

const stages = [
  {
    title: 'Encoding',
    description:
      'The brain receives and processes new information.',
    icon: 'create-outline',
  },
  {
    title: 'Storage',
    description:
      'Information is maintained over time.',
    icon: 'save-outline',
  },
  {
    title: 'Retrieval',
    description:
      'Stored information is accessed when needed.',
    icon: 'search-outline',
  },
]

const quizQuestions = [
  {
    question: 'Which brain structure is especially important for forming new memories?',
    options: ['Cerebellum', 'Hippocampus', 'Brainstem', 'Thalamus'],
    answer: 'Hippocampus',
    explanation:
      'The hippocampus plays an important role in forming new memories.',
  },
  {
    question: 'What are the three basic memory processes?',
    options: [
      'Seeing, hearing and touching',
      'Encoding, storage and retrieval',
      'Thinking, walking and speaking',
      'Learning, sleeping and eating',
    ],
    answer: 'Encoding, storage and retrieval',
    explanation:
      'Memory involves encoding information, storing it and retrieving it later.',
  },
  {
    question: 'Which type of memory can store information for many years?',
    options: [
      'Sensory memory',
      'Short-term memory',
      'Long-term memory',
      'Temporary memory',
    ],
    answer: 'Long-term memory',
    explanation:
      'Long-term memory can retain information for extended periods.',
  },
  {
    question: 'What does neuroplasticity mean?',
    options: [
      'The brain cannot change',
      'The brain can adapt and change',
      'The brain stops learning',
      'The brain controls digestion',
    ],
    answer: 'The brain can adapt and change',
    explanation:
      "Neuroplasticity describes the brain's ability to modify its connections and adapt.",
  },
  {
    question: 'Which activity can help strengthen learning?',
    options: [
      'Regular practice',
      'Avoiding revision',
      'Ignoring feedback',
      'Never repeating a skill',
    ],
    answer: 'Regular practice',
    explanation:
      'Practice and repeated learning help strengthen relevant neural connections.',
  },
]

export default function LearningMemory() {
  const router = useRouter()

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const question = quizQuestions[currentQuestion]
  const isCorrect = selectedAnswer === question.answer

  const handleAnswer = (option) => {
    if (selectedAnswer !== null) return

    setSelectedAnswer(option)

    if (option === question.answer) {
      setScore((previous) => previous + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion === quizQuestions.length - 1) {
      setFinished(true)
    } else {
      setCurrentQuestion((previous) => previous + 1)
      setSelectedAnswer(null)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setFinished(false)
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Learning & Memory',
          headerTintColor: Colors.navy,
          headerTitleStyle: { fontWeight: '700' },
        }}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Back Button */}
        <Pressable
          style={styles.topBackButton}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Back to Knowledge Hub"
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color={Colors.navy}
          />
          <Text style={styles.topBackText}>Knowledge Hub</Text>
        </Pressable>

        {/* Hero */}
        <View style={styles.hero}>
          <Image
            source={require('../assets/knowledge-hub/brain-learning-memory.png')}
            style={styles.heroImage}
            resizeMode="contain"
            accessibilityLabel="Brain learning and memory illustration"
          />

          <Text style={styles.heroTitle}>Learning & Memory</Text>

          <Text style={styles.heroSubtitle}>
            Discover how your brain learns, stores information and
            remembers experiences.
          </Text>
        </View>

        {/* Introduction */}
        <View style={styles.introCard}>
          <Text style={styles.sectionTitle}>Introduction</Text>

          <Text style={styles.bodyText}>
            Your brain is constantly learning. Every new experience,
            skill and piece of information can change the way your
            brain processes and stores information.
          </Text>
        </View>

        {/* Main Concepts */}
        <Text style={styles.sectionTitle}>Explore the Concepts</Text>

        {concepts.map((item) => (
          <View key={item.number} style={styles.conceptCard}>
            <View style={styles.conceptHeader}>
              <View style={styles.numberBadge}>
                <Text style={styles.numberText}>{item.number}</Text>
              </View>

              <Text style={styles.conceptTitle}>{item.title}</Text>
            </View>

            <Text style={styles.bodyText}>{item.description}</Text>

            <View style={styles.exampleBox}>
              <Ionicons
                name="bulb-outline"
                size={18}
                color={Colors.navyMid}
              />

              <View style={styles.exampleContent}>
                <Text style={styles.exampleTitle}>Real-life example</Text>
                <Text style={styles.exampleText}>{item.example}</Text>
              </View>
            </View>
          </View>
        ))}

        {/* Memory Types */}
        <Text style={styles.sectionTitle}>Types of Memory</Text>

        <Text style={styles.sectionSubtitle}>
          Memory can be understood through different storage systems.
        </Text>

        {memoryTypes.map((item, index) => (
          <View key={item.title} style={styles.memoryCard}>
            <View style={styles.memoryNumber}>
              <Text style={styles.memoryNumberText}>{index + 1}</Text>
            </View>

            <View style={styles.memoryContent}>
              <Text style={styles.memoryTitle}>{item.title}</Text>

              <Text style={styles.duration}>{item.duration}</Text>

              <Text style={styles.bodyText}>{item.description}</Text>
            </View>
          </View>
        ))}

        {/* Memory Process */}
        <Text style={styles.sectionTitle}>How Memory Works</Text>

        <Text style={styles.sectionSubtitle}>
          Three important processes help us remember information.
        </Text>

        <View style={styles.processCard}>
          {stages.map((item, index) => (
            <View key={item.title}>
              <View style={styles.processRow}>
                <View style={styles.processIcon}>
                  <Ionicons
                    name={item.icon}
                    size={23}
                    color={Colors.navyMid}
                  />
                </View>

                <View style={styles.processContent}>
                  <Text style={styles.processTitle}>{item.title}</Text>
                  <Text style={styles.bodyText}>
                    {item.description}
                  </Text>
                </View>
              </View>

              {index !== stages.length - 1 && (
                <View style={styles.processConnector} />
              )}
            </View>
          ))}
        </View>

        {/* Learning Tips */}
        <View style={styles.tipsCard}>
          <Ionicons
            name="star-outline"
            size={24}
            color={Colors.navyMid}
          />

          <Text style={styles.tipsTitle}>Tips for Better Learning</Text>

          {[
            'Review information regularly.',
            'Practise recalling information without looking at notes.',
            'Get enough sleep to support learning and memory.',
            'Connect new information with things you already know.',
          ].map((tip, index) => (
            <View key={index} style={styles.tipRow}>
              <Ionicons
                name="checkmark-circle"
                size={18}
                color={Colors.navyMid}
              />
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* Knowledge Check */}
        <View style={styles.quizHeader}>
          <Text style={styles.sectionTitle}>Test Your Knowledge</Text>
          <Text style={styles.sectionSubtitle}>
            Answer five questions to check what you have learned.
          </Text>
        </View>

        {!finished ? (
          <View style={styles.quizCard}>
            <View style={styles.quizStats}>
              <Text style={styles.quizLabel}>
                QUESTION {currentQuestion + 1}/{quizQuestions.length}
              </Text>

              <Text style={styles.quizLabel}>Score: {score}</Text>
            </View>

            <View style={styles.progressBackground}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${
                      ((currentQuestion + 1) / quizQuestions.length) * 100
                    }%`,
                  },
                ]}
              />
            </View>

            <Text style={styles.questionText}>
              {question.question}
            </Text>

            {question.options.map((option, index) => {
              const selected = selectedAnswer === option
              const correct = question.answer === option

              return (
                <Pressable
                  key={option}
                  onPress={() => handleAnswer(option)}
                  disabled={selectedAnswer !== null}
                  style={[
                    styles.option,
                    selected && correct && styles.correctOption,
                    selected && !correct && styles.wrongOption,
                    selectedAnswer !== null &&
                      correct &&
                      styles.correctOption,
                  ]}
                >
                  <Text style={styles.optionLetter}>
                    {String.fromCharCode(65 + index)}
                  </Text>

                  <Text style={styles.optionText}>{option}</Text>

                  {selectedAnswer !== null && correct && (
                    <Ionicons
                      name="checkmark-circle"
                      size={21}
                      color="#18864B"
                    />
                  )}

                  {selected && !correct && (
                    <Ionicons
                      name="close-circle"
                      size={21}
                      color="#D14343"
                    />
                  )}
                </Pressable>
              )
            })}

            {selectedAnswer !== null && (
              <View
                style={[
                  styles.feedback,
                  isCorrect
                    ? styles.correctFeedback
                    : styles.wrongFeedback,
                ]}
              >
                <Text style={styles.feedbackTitle}>
                  {isCorrect ? 'Correct answer!' : 'Not quite!'}
                </Text>

                <Text style={styles.feedbackText}>
                  {question.explanation}
                </Text>
              </View>
            )}

            {selectedAnswer !== null && (
              <Pressable
                style={styles.primaryButton}
                onPress={handleNext}
              >
                <Text style={styles.primaryButtonText}>
                  {currentQuestion === quizQuestions.length - 1
                    ? 'View Results'
                    : 'Next Question'}
                </Text>

                <Ionicons
                  name="arrow-forward"
                  size={19}
                  color={Colors.white}
                />
              </Pressable>
            )}
          </View>
        ) : (
          <View style={styles.resultCard}>
            <Ionicons
              name="trophy-outline"
              size={55}
              color={Colors.navyMid}
            />

            <Text style={styles.resultTitle}>Lesson Completed!</Text>

            <Text style={styles.resultScore}>
              {score} / {quizQuestions.length}
            </Text>

            <Text style={styles.resultMessage}>
              {score === quizQuestions.length
                ? 'Excellent! You answered every question correctly.'
                : score >= 3
                  ? 'Good work! Keep practising to improve your knowledge.'
                  : 'Keep learning! Review the lesson and try again.'}
            </Text>

            <Pressable
              style={styles.primaryButton}
              onPress={handleRestart}
            >
              <Ionicons
                name="refresh"
                size={19}
                color={Colors.white}
              />
              <Text style={styles.primaryButtonText}>Try Again</Text>
            </Pressable>
          </View>
        )}

        {/* Bottom Back Button */}
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={19}
            color={Colors.navyMid}
          />

          <Text style={styles.backButtonText}>
            Back to Knowledge Hub
          </Text>
        </Pressable>
      </ScrollView>
    </>
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
  topBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 9,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 12,
  },
  topBackText: {
    color: Colors.navy,
    fontSize: 15,
    fontWeight: '700',
  },
  hero: {
    backgroundColor: Colors.navy,
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: 190,
    marginBottom: 12,
  },
  heroTitle: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    color: Colors.lightBlue,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  introCard: {
    backgroundColor: Colors.white,
    padding: 18,
    borderRadius: 16,
    marginBottom: 22,
  },
  sectionTitle: {
    color: Colors.navy,
    fontSize: 21,
    fontWeight: '800',
    marginBottom: 12,
  },
  sectionSubtitle: {
    color: Colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 14,
  },
  bodyText: {
    color: Colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
  },
  conceptCard: {
    backgroundColor: Colors.white,
    padding: 17,
    borderRadius: 16,
    marginBottom: 13,
  },
  conceptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 11,
  },
  numberBadge: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: Colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    color: Colors.navy,
    fontWeight: '800',
    fontSize: 14,
  },
  conceptTitle: {
    color: Colors.navy,
    fontSize: 17,
    fontWeight: '700',
    flex: 1,
  },
  exampleBox: {
    flexDirection: 'row',
    backgroundColor: Colors.lightBlue,
    padding: 12,
    borderRadius: 12,
    marginTop: 14,
    gap: 9,
  },
  exampleContent: {
    flex: 1,
  },
  exampleTitle: {
    color: Colors.navy,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  exampleText: {
    color: Colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
  },
  memoryCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 15,
    marginBottom: 11,
    gap: 12,
  },
  memoryNumber: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: Colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memoryNumberText: {
    color: Colors.navy,
    fontWeight: '800',
  },
  memoryContent: {
    flex: 1,
  },
  memoryTitle: {
    color: Colors.navy,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  duration: {
    color: Colors.navyMid,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 7,
  },
  processCard: {
    backgroundColor: Colors.white,
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
  },
  processRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
  },
  processIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: Colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  processContent: {
    flex: 1,
  },
  processTitle: {
    color: Colors.navy,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  processConnector: {
    height: 22,
    width: 2,
    backgroundColor: Colors.border,
    marginLeft: 20,
    marginVertical: 5,
  },
  tipsCard: {
    backgroundColor: Colors.white,
    padding: 18,
    borderRadius: 16,
    marginBottom: 23,
  },
  tipsTitle: {
    color: Colors.navy,
    fontSize: 17,
    fontWeight: '800',
    marginTop: 9,
    marginBottom: 13,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 9,
    marginBottom: 11,
  },
  tipText: {
    flex: 1,
    color: Colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
  },
  quizHeader: {
    marginBottom: 5,
  },
  quizCard: {
    backgroundColor: Colors.white,
    padding: 18,
    borderRadius: 17,
  },
  quizStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  quizLabel: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
  },
  progressBackground: {
    height: 7,
    backgroundColor: Colors.border,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 18,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.navyMid,
  },
  questionText: {
    color: Colors.navy,
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 25,
    marginBottom: 17,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 11,
    padding: 12,
    marginBottom: 10,
    gap: 10,
  },
  optionLetter: {
    width: 28,
    height: 28,
    borderRadius: 9,
    backgroundColor: Colors.lightBlue,
    color: Colors.navy,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '700',
    overflow: 'hidden',
    paddingTop: 5,
  },
  optionText: {
    flex: 1,
    color: Colors.navy,
    fontSize: 13,
  },
  correctOption: {
    borderColor: '#18864B',
    backgroundColor: '#E9F7EF',
  },
  wrongOption: {
    borderColor: '#D14343',
    backgroundColor: '#FCECEC',
  },
  feedback: {
    padding: 13,
    borderRadius: 11,
    marginTop: 6,
    marginBottom: 12,
  },
  correctFeedback: {
    backgroundColor: '#E9F7EF',
  },
  wrongFeedback: {
    backgroundColor: '#FCECEC',
  },
  feedbackTitle: {
    color: Colors.navy,
    fontWeight: '800',
    fontSize: 14,
    marginBottom: 5,
  },
  feedbackText: {
    color: Colors.navy,
    fontSize: 13,
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: Colors.navy,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    marginTop: 8,
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  resultCard: {
    backgroundColor: Colors.white,
    padding: 25,
    borderRadius: 17,
    alignItems: 'center',
  },
  resultTitle: {
    color: Colors.navy,
    fontSize: 22,
    fontWeight: '800',
    marginTop: 12,
  },
  resultScore: {
    color: Colors.navyMid,
    fontSize: 40,
    fontWeight: '800',
    marginVertical: 10,
  },
  resultMessage: {
    color: Colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 15,
  },
  backButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 9,
    padding: 16,
    marginTop: 16,
  },
  backButtonText: {
    color: Colors.navyMid,
    fontSize: 14,
    fontWeight: '700',
  },
})
