
import React, { useState } from 'react'
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
import { Colors } from '../constants/Colors'

const questions = [
  {
    question: 'Which part of the brain controls balance and coordination?',
    options: ['Cerebrum', 'Cerebellum', 'Thalamus', 'Hypothalamus'],
    answer: 'Cerebellum',
    explanation: 'The cerebellum helps control balance, posture and coordination.',
  },
  {
    question: 'What is the basic structural and functional unit of the nervous system?',
    options: ['Neuron', 'Muscle', 'Bone', 'Blood cell'],
    answer: 'Neuron',
    explanation: 'Neurons are specialized cells that transmit nerve signals.',
  },
  {
    question: 'Which part of the brain controls breathing and heart rate?',
    options: ['Cerebrum', 'Amygdala', 'Brainstem', 'Hippocampus'],
    answer: 'Brainstem',
    explanation: 'The brainstem controls important automatic functions such as breathing and heart rate.',
  },
  {
    question: 'Which brain structure is important for memory formation?',
    options: ['Hippocampus', 'Cerebellum', 'Medulla', 'Spinal cord'],
    answer: 'Hippocampus',
    explanation: 'The hippocampus plays an important role in learning and forming new memories.',
  },
  {
    question: 'Which part of a neuron receives incoming signals?',
    options: ['Axon', 'Dendrites', 'Myelin sheath', 'Synaptic terminal'],
    answer: 'Dendrites',
    explanation: 'Dendrites receive signals from other neurons.',
  },
  {
    question: 'What protects the brain and spinal cord?',
    options: ['Peripheral nervous system', 'Central nervous system', 'Digestive system', 'Respiratory system'],
    answer: 'Central nervous system',
    explanation: 'The central nervous system consists of the brain and spinal cord.',
  },
  {
    question: 'Which brain lobe is mainly responsible for vision?',
    options: ['Frontal lobe', 'Temporal lobe', 'Occipital lobe', 'Parietal lobe'],
    answer: 'Occipital lobe',
    explanation: 'The occipital lobe processes visual information.',
  },
  {
    question: "Which neurotransmitter is commonly associated with Parkinson's disease?",
    options: ['Dopamine', 'Insulin', 'Adrenaline', 'Melatonin'],
    answer: 'Dopamine',
    explanation: "Parkinson's disease involves the loss of dopamine-producing neurons.",
  },
  {
    question: 'What is the junction between two neurons called?',
    options: ['Axon', 'Synapse', 'Dendrite', 'Nucleus'],
    answer: 'Synapse',
    explanation: 'A synapse is the junction where signals pass between neurons.',
  },
  {
    question: 'Which division controls voluntary skeletal muscle movement?',
    options: ['Autonomic nervous system', 'Somatic nervous system', 'Sympathetic nervous system', 'Parasympathetic nervous system'],
    answer: 'Somatic nervous system',
    explanation: 'The somatic nervous system controls voluntary skeletal muscle movements.',
  },
]

const BrainKnowledgeQuiz = () => {
  const router = useRouter()

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const question = questions[currentQuestion]
  const isCorrect = selectedAnswer === question.answer

  const handleAnswer = (option) => {
    if (selectedAnswer !== null) return

    setSelectedAnswer(option)

    if (option === question.answer) {
      setScore((previous) => previous + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion === questions.length - 1) {
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator
    >
      {/* Back Button */}
      <Pressable
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={21} color={Colors.navy} />
        <Text style={styles.backText}>Knowledge Hub</Text>
      </Pressable>

      {/* Quiz Hero */}
      <View style={styles.hero}>
        <Image
          source={require('../assets/knowledge-hub/brain-knowledge-quiz.png')}
          style={styles.heroImage}
          resizeMode="contain"
        />

        <Text style={styles.heroTitle}>Brain Knowledge Quiz</Text>

        <Text style={styles.heroSubtitle}>
          Test your knowledge of the brain and nervous system!
        </Text>
      </View>

      {!finished ? (
        <>
          {/* Quiz Statistics */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {currentQuestion + 1}/{questions.length}
              </Text>
              <Text style={styles.statLabel}>Question</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{score}</Text>
              <Text style={styles.statLabel}>Score</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                },
              ]}
            />
          </View>

          {/* Question Card */}
          <View style={styles.quizCard}>
            <Text style={styles.questionLabel}>
              QUESTION {currentQuestion + 1}
            </Text>

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
                    selectedAnswer !== null && correct && styles.correctOption,
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

            {/* Answer Feedback */}
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

            {/* Next Question */}
            {selectedAnswer !== null && (
              <Pressable
                style={styles.nextButton}
                onPress={handleNext}
              >
                <Text style={styles.nextButtonText}>
                  {currentQuestion === questions.length - 1
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
        </>
      ) : (
        /* Quiz Results */
        <View style={styles.resultCard}>
          <Ionicons name="trophy" size={58} color={Colors.navyMid} />

          <Text style={styles.resultTitle}>Quiz Completed!</Text>

          <Text style={styles.resultScore}>
            {score} / {questions.length}
          </Text>

          <Text style={styles.resultMessage}>
            {score === questions.length
              ? 'Excellent! You answered every question correctly.'
              : score >= 7
                ? 'Great work! You have a strong understanding.'
                : score >= 4
                  ? 'Good effort! Keep learning and improving.'
                  : 'Keep practising! Every attempt helps you learn.'}
          </Text>

          <Pressable
            style={styles.nextButton}
            onPress={handleRestart}
          >
            <Ionicons name="refresh" size={19} color={Colors.white} />
            <Text style={styles.nextButtonText}>Try Again</Text>
          </Pressable>
        </View>
      )}
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 18,
    paddingVertical: 8,
  },
  backText: {
    color: Colors.navy,
    fontSize: 15,
    fontWeight: '600',
  },
  hero: {
    backgroundColor: Colors.navy,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  heroImage: {
    width: 220,
    height: 180,
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    marginTop: 5,
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    color: Colors.lightBlue,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.navy,
  },
  statLabel: {
    color: Colors.textMuted,
    fontSize: 12,
    marginTop: 4,
  },
  progressBackground: {
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 18,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.navyMid,
    borderRadius: 10,
  },
  quizCard: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 18,
  },
  questionLabel: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 10,
  },
  questionText: {
    color: Colors.navy,
    fontSize: 19,
    fontWeight: 'bold',
    lineHeight: 27,
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 13,
    marginBottom: 11,
    gap: 11,
  },
  optionLetter: {
    width: 29,
    height: 29,
    borderRadius: 9,
    backgroundColor: Colors.lightBlue,
    color: Colors.navy,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    overflow: 'hidden',
    paddingTop: 5,
  },
  optionText: {
    flex: 1,
    color: Colors.navy,
    fontSize: 14,
    fontWeight: '500',
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
    padding: 14,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 15,
  },
  correctFeedback: {
    backgroundColor: '#E9F7EF',
  },
  wrongFeedback: {
    backgroundColor: '#FCECEC',
  },
  feedbackTitle: {
    color: Colors.navy,
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 5,
  },
  feedbackText: {
    color: Colors.navy,
    fontSize: 13,
    lineHeight: 20,
  },
  nextButton: {
    backgroundColor: Colors.navy,
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 8,
  },
  nextButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 15,
  },
  resultCard: {
    backgroundColor: Colors.white,
    padding: 28,
    borderRadius: 18,
    alignItems: 'center',
  },
  resultTitle: {
    color: Colors.navy,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
  },
  resultScore: {
    color: Colors.navyMid,
    fontSize: 42,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  resultMessage: {
    color: Colors.textMuted,
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
    marginBottom: 18,
  },
})

export default BrainKnowledgeQuiz
