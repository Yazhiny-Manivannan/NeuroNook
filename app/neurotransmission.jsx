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

const steps = [
  {
    number: '01',
    title: 'Electrical signal arrives',
    description:
      'An electrical impulse travels along the axon and reaches the end of the presynaptic neuron.',
    icon: 'flash-outline',
  },
  {
    number: '02',
    title: 'Neurotransmitters are released',
    description:
      'Chemical messengers are released from small vesicles into the synaptic cleft.',
    icon: 'git-branch-outline',
  },
  {
    number: '03',
    title: 'Receptors receive the message',
    description:
      'Neurotransmitters cross the synaptic cleft and bind to matching receptors on the next cell.',
    icon: 'radio-outline',
  },
  {
    number: '04',
    title: 'The next cell responds',
    description:
      'Receptor activation changes the activity of the receiving cell. It may become more or less likely to produce an electrical signal.',
    icon: 'checkmark-circle-outline',
  },
]

const neurotransmitters = [
  {
    name: 'Dopamine',
    role: 'Involved in motivation, reward, movement and learning.',
    icon: 'trophy-outline',
  },
  {
    name: 'Serotonin',
    role: 'Helps regulate mood, sleep and appetite.',
    icon: 'sunny-outline',
  },
  {
    name: 'Acetylcholine',
    role: 'Important for muscle movement, attention and memory.',
    icon: 'body-outline',
  },
  {
    name: 'GABA',
    role: 'The main inhibitory neurotransmitter in the adult brain.',
    icon: 'pause-circle-outline',
  },
  {
    name: 'Glutamate',
    role: 'The main excitatory neurotransmitter in the brain.',
    icon: 'flash-outline',
  },
  {
    name: 'Norepinephrine',
    role: 'Helps regulate alertness, attention and the stress response.',
    icon: 'alert-circle-outline',
  },
]

const questions = [
  {
    question: 'What is neurotransmission?',
    options: [
      'The communication process between nerve cells',
      'The production of blood cells',
      'The digestion of food',
      'The movement of bones',
    ],
    answer: 0,
    explanation:
      'Neurotransmission is the process through which neurons communicate with other cells.',
  },
  {
    question: 'What is the small gap between two neurons called?',
    options: [
      'Axon',
      'Synaptic cleft',
      'Cell nucleus',
      'Myelin sheath',
    ],
    answer: 1,
    explanation:
      'The synaptic cleft is the tiny gap between the sending and receiving cells.',
  },
  {
    question: 'Which chemical messenger is strongly involved in reward and motivation?',
    options: ['GABA', 'Glutamate', 'Dopamine', 'Acetylcholine'],
    answer: 2,
    explanation:
      'Dopamine plays important roles in reward, motivation, movement and learning.',
  },
  {
    question: 'Which neurotransmitter is the main inhibitory messenger in the adult brain?',
    options: ['GABA', 'Glutamate', 'Dopamine', 'Serotonin'],
    answer: 0,
    explanation:
      'GABA is the main inhibitory neurotransmitter in the adult brain.',
  },
  {
    question: 'Where are neurotransmitters released from?',
    options: [
      'The nucleus',
      'Synaptic vesicles',
      'The cell membrane only',
      'The myelin sheath',
    ],
    answer: 1,
    explanation:
      'Neurotransmitters are stored in synaptic vesicles and released from the presynaptic terminal.',
  },
]

export default function Neurotransmission() {
  const router = useRouter()

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)

  const handleNext = () => {
    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore(score + 1)
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      setShowResults(true)
    }
  }

  const retryQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setShowResults(false)
  }

  const current = questions[currentQuestion]

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Neurotransmission',
          headerTintColor: Colors.navy,
          headerStyle: { backgroundColor: Colors.white },
        }}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={true}
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

        <View style={styles.hero}>
          <Image
            source={require('../assets/knowledge-hub/neurotransmission.png')}
            style={styles.heroImage}
            resizeMode="contain"
          />

          <Text style={styles.heroTitle}>Neurotransmission</Text>
          <Text style={styles.heroSubtitle}>
            Discover how neurons communicate and send messages throughout
            the nervous system.
          </Text>
        </View>

        <View style={styles.introCard}>
          <Text style={styles.sectionTitle}>What is Neurotransmission?</Text>
          <Text style={styles.bodyText}>
            Neurotransmission is the process by which neurons communicate
            with other neurons, muscles or glands.
          </Text>
          <Text style={styles.bodyText}>
            Neurons use electrical signals within the cell and chemical
            messengers to communicate across many synapses.
          </Text>
        </View>

        <Text style={styles.sectionHeading}>How Does It Work?</Text>

        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>The Chemical Synapse</Text>
          <Text style={styles.bodyText}>
            A chemical synapse is a junction where one neuron sends a
            chemical message to another cell.
          </Text>

          <View style={styles.synapsePart}>
            <Text style={styles.partTitle}>Presynaptic neuron</Text>
            <Text style={styles.partDescription}>
              The sending cell that releases neurotransmitters.
            </Text>
          </View>

          <View style={styles.synapseGap}>
            <Ionicons name="arrow-down" size={24} color={Colors.navyMid} />
            <Text style={styles.gapTitle}>Synaptic cleft</Text>
            <Text style={styles.gapDescription}>
              The tiny gap that neurotransmitters cross.
            </Text>
            <Ionicons name="arrow-down" size={24} color={Colors.navyMid} />
          </View>

          <View style={styles.synapsePart}>
            <Text style={styles.partTitle}>Postsynaptic cell</Text>
            <Text style={styles.partDescription}>
              The receiving cell with receptors that detect the chemical
              message.
            </Text>
          </View>
        </View>

        <Text style={styles.sectionHeading}>
          Steps of Neurotransmission
        </Text>

        {steps.map((item) => (
          <View style={styles.stepCard} key={item.number}>
            <View style={styles.stepIcon}>
              <Ionicons
                name={item.icon}
                size={25}
                color={Colors.navyMid}
              />
            </View>

            <View style={styles.stepContent}>
              <Text style={styles.stepNumber}>STEP {item.number}</Text>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.bodyText}>{item.description}</Text>
            </View>
          </View>
        ))}

        <Text style={styles.sectionHeading}>
          Important Neurotransmitters
        </Text>

        <Text style={styles.sectionDescription}>
          Different neurotransmitters have different roles in the brain
          and nervous system.
        </Text>

        {neurotransmitters.map((item) => (
          <View style={styles.transmitterCard} key={item.name}>
            <View style={styles.transmitterIcon}>
              <Ionicons
                name={item.icon}
                size={23}
                color={Colors.navyMid}
              />
            </View>
            <View style={styles.transmitterContent}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.bodyText}>{item.role}</Text>
            </View>
          </View>
        ))}

        <View style={styles.summaryCard}>
          <Ionicons
            name="bulb-outline"
            size={30}
            color={Colors.navyMid}
          />
          <Text style={styles.cardTitle}>Remember</Text>
          <Text style={styles.bodyText}>
            Neurotransmission allows the nervous system to coordinate
            movement, process information, regulate emotions and support
            many other important functions.
          </Text>
        </View>

        <View style={styles.quizCard}>
          <Text style={styles.sectionTitle}>Test Your Knowledge</Text>
          <Text style={styles.quizSubtitle}>
            Answer five questions to check your understanding.
          </Text>

          {!showResults ? (
            <>
              <View style={styles.progressRow}>
                <Text style={styles.progressText}>
                  Question {currentQuestion + 1} of {questions.length}
                </Text>
                <Text style={styles.progressText}>
                  {Math.round(
                    ((currentQuestion + 1) / questions.length) * 100
                  )}%
                </Text>
              </View>

              <View style={styles.progressBackground}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${
                        ((currentQuestion + 1) / questions.length) * 100
                      }%`,
                    },
                  ]}
                />
              </View>

              <Text style={styles.questionText}>{current.question}</Text>

              {current.options.map((option, index) => {
                const isSelected = selectedAnswer === index
                const isCorrect = current.answer === index

                return (
                  <Pressable
                    key={index}
                    style={[
                      styles.option,
                      isSelected && styles.selectedOption,
                      selectedAnswer !== null &&
                        isCorrect &&
                        styles.correctOption,
                      selectedAnswer === index &&
                        !isCorrect &&
                        styles.wrongOption,
                    ]}
                    onPress={() => {
                      if (selectedAnswer === null) {
                        setSelectedAnswer(index)
                      }
                    }}
                    disabled={selectedAnswer !== null}
                  >
                    <Text style={styles.optionText}>{option}</Text>

                    {selectedAnswer !== null && isCorrect && (
                      <Ionicons
                        name="checkmark-circle"
                        size={21}
                        color="#23845B"
                      />
                    )}

                    {isSelected && !isCorrect && (
                      <Ionicons
                        name="close-circle"
                        size={21}
                        color="#C64B4B"
                      />
                    )}
                  </Pressable>
                )
              })}

              {selectedAnswer !== null && (
                <View style={styles.feedback}>
                  <Text style={styles.feedbackTitle}>
                    {selectedAnswer === current.answer
                      ? 'Correct!'
                      : 'Not quite!'}
                  </Text>
                  <Text style={styles.feedbackText}>
                    {current.explanation}
                  </Text>
                </View>
              )}

              <Pressable
                style={[
                  styles.primaryButton,
                  selectedAnswer === null && styles.disabledButton,
                ]}
                onPress={handleNext}
                disabled={selectedAnswer === null}
              >
                <Text style={styles.primaryButtonText}>
                  {currentQuestion === questions.length - 1
                    ? 'See Results'
                    : 'Next Question'}
                </Text>
                <Ionicons
                  name="arrow-forward"
                  size={19}
                  color={Colors.white}
                />
              </Pressable>
            </>
          ) : (
            <View style={styles.resultContainer}>
              <Ionicons
                name="trophy-outline"
                size={55}
                color={Colors.navyMid}
              />
              <Text style={styles.resultTitle}>Quiz Completed!</Text>
              <Text style={styles.resultScore}>
                {score} / {questions.length}
              </Text>
              <Text style={styles.bodyText}>
                {score === questions.length
                  ? 'Excellent! You answered every question correctly.'
                  : score >= 3
                    ? 'Good work! Keep learning and improving.'
                    : 'Keep practising. Review the lesson and try again!'}
              </Text>

              <Pressable style={styles.primaryButton} onPress={retryQuiz}>
                <Text style={styles.primaryButtonText}>Try Again</Text>
                <Ionicons
                  name="refresh"
                  size={19}
                  color={Colors.white}
                />
              </Pressable>
            </View>
          )}
        </View>

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
    backgroundColor: Colors.white,
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
    alignItems: 'center',
    backgroundColor: Colors.lightBlue,
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
  },
  heroImage: {
    width: '100%',
    height: 185,
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.navy,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 21,
    marginTop: 8,
  },
  introCard: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    padding: 17,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.navy,
    marginBottom: 10,
  },
  sectionHeading: {
    fontSize: 21,
    fontWeight: 'bold',
    color: Colors.navy,
    marginTop: 12,
    marginBottom: 12,
  },
  sectionDescription: {
    color: Colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 12,
  },
  bodyText: {
    color: Colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 5,
  },
  infoCard: {
    backgroundColor: Colors.lightBlue,
    borderRadius: 16,
    padding: 17,
    marginBottom: 15,
  },
  cardTitle: {
    color: Colors.navy,
    fontSize: 16,
    fontWeight: 'bold',
  },
  synapsePart: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 15,
    marginTop: 12,
    alignItems: 'center',
  },
  partTitle: {
    color: Colors.navy,
    fontSize: 15,
    fontWeight: 'bold',
  },
  partDescription: {
    color: Colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 5,
  },
  synapseGap: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  gapTitle: {
    color: Colors.navy,
    fontWeight: 'bold',
    fontSize: 14,
  },
  gapDescription: {
    color: Colors.textMuted,
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 4,
  },
  stepCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 15,
    padding: 14,
    marginBottom: 12,
  },
  stepIcon: {
    width: 45,
    height: 45,
    borderRadius: 13,
    backgroundColor: Colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepContent: {
    flex: 1,
  },
  stepNumber: {
    fontSize: 11,
    fontWeight: 'bold',
    color: Colors.navyMid,
    marginBottom: 5,
  },
  transmitterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  transmitterIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: Colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transmitterContent: {
    flex: 1,
  },
  summaryCard: {
    backgroundColor: Colors.lightBlue,
    borderRadius: 16,
    padding: 18,
    marginTop: 15,
    marginBottom: 20,
  },
  quizCard: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 17,
    padding: 17,
    marginBottom: 20,
  },
  quizSubtitle: {
    color: Colors.textMuted,
    fontSize: 13,
    marginBottom: 17,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.navyMid,
  },
  progressBackground: {
    height: 7,
    backgroundColor: Colors.lightBlue,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressFill: {
    height: 7,
    backgroundColor: Colors.navyMid,
    borderRadius: 10,
  },
  questionText: {
    color: Colors.navy,
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 23,
    marginBottom: 13,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 11,
    padding: 13,
    marginBottom: 9,
  },
  selectedOption: {
    borderColor: Colors.navyMid,
    backgroundColor: Colors.lightBlue,
  },
  correctOption: {
    borderColor: '#23845B',
    backgroundColor: '#E8F5EE',
  },
  wrongOption: {
    borderColor: '#C64B4B',
    backgroundColor: '#FCEEEE',
  },
  optionText: {
    color: Colors.navy,
    fontSize: 13,
    flex: 1,
    marginRight: 8,
  },
  feedback: {
    backgroundColor: Colors.lightBlue,
    borderRadius: 11,
    padding: 13,
    marginTop: 7,
    marginBottom: 13,
  },
  feedbackTitle: {
    color: Colors.navy,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  feedbackText: {
    color: Colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: Colors.navyMid,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    gap: 8,
  },
  disabledButton: {
    opacity: 0.45,
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  resultContainer: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  resultTitle: {
    color: Colors.navy,
    fontSize: 21,
    fontWeight: 'bold',
    marginTop: 12,
  },
  resultScore: {
    color: Colors.navyMid,
    fontSize: 35,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    gap: 8,
  },
  backButtonText: {
    color: Colors.navyMid,
    fontWeight: 'bold',
    fontSize: 14,
  },
})