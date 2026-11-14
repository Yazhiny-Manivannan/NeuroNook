import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../constants/Colors'

const conditions = [
  {
    id: 'migraine',
    title: 'Migraine',
    image: require('../assets/conditions/migraine.png'),
    description:
      'Migraine is a neurological headache disorder that can cause repeated episodes of moderate or severe headache.',
    symptoms: [
      'Throbbing or severe headache',
      'Sensitivity to light and sound',
      'Nausea in some people',
    ],
    affected: 'Brain and its sensory processing pathways',
    fact: 'Some people experience warning symptoms called an aura before a migraine headache.',
  },
  {
    id: 'epilepsy',
    title: 'Epilepsy',
    image: require('../assets/conditions/epilepsy.png'),
    description:
      'Epilepsy is a neurological condition involving a tendency to have recurrent seizures caused by abnormal electrical activity in the brain.',
    symptoms: [
      'Seizures',
      'Temporary changes in awareness',
      'Unusual movements or sensations',
    ],
    affected: 'Brain electrical activity',
    fact: 'Seizures can look different from person to person. Not all seizures involve shaking.',
  },
  {
    id: 'parkinsons',
    title: "Parkinson's Disease",
    image: require('../assets/conditions/parkinsons-disease.png'),
    description:
      'Parkinson’s disease is a progressive neurological disorder that affects movement. It is associated with the loss of dopamine-producing neurons.',
    symptoms: [
      'Tremors',
      'Muscle stiffness',
      'Slowness of movement',
    ],
    affected: 'Dopamine-producing neurons, especially in the substantia nigra',
    fact: 'Dopamine is an important chemical messenger involved in controlling movement.',
  },
  {
    id: 'alzheimers',
    title: "Alzheimer's Disease",
    image: require('../assets/conditions/alzheimers-disease.png'),
    description:
      'Alzheimer’s disease is a progressive brain disorder that affects memory, thinking and other cognitive abilities.',
    symptoms: [
      'Memory difficulties',
      'Confusion',
      'Problems with thinking and daily activities',
    ],
    affected: 'Brain regions involved in memory and thinking',
    fact: 'The hippocampus is one of the brain regions affected early in Alzheimer’s disease.',
  },
  {
    id: 'multiple-sclerosis',
    title: 'Multiple Sclerosis (MS)',
    image: require('../assets/conditions/multiple-sclerosis.png'),
    description:
      'Multiple sclerosis is an immune-mediated condition in which the protective myelin covering of nerve fibres in the central nervous system is damaged.',
    symptoms: [
      'Vision problems',
      'Numbness or tingling',
      'Muscle weakness and balance difficulties',
    ],
    affected: 'Myelin covering nerve fibres in the brain and spinal cord',
    fact: 'Damage to myelin can interfere with the transmission of nerve signals.',
  },
]

const SectionHeading = ({ title }) => (
  <Text style={styles.sectionHeading}>{title}</Text>
)

const ConditionCard = ({ condition, number }) => (
  <View style={styles.conditionCard}>
    <View style={styles.cardHeader}>
      <View style={styles.numberBadge}>
        <Text style={styles.numberText}>{number}</Text>
      </View>

      <Text style={styles.conditionTitle}>
        {condition.title}
      </Text>
    </View>

    <Image
      source={condition.image}
      style={styles.conditionImage}
      resizeMode="cover"
      accessibilityLabel={`${condition.title} medical illustration`}
    />

    <Text style={styles.description}>
      {condition.description}
    </Text>

    <View style={styles.detailBox}>
      <Text style={styles.detailTitle}>Common Symptoms and Effects</Text>

      {condition.symptoms.map((symptom, index) => (
        <View style={styles.pointRow} key={index}>
          <Ionicons
            name="checkmark-circle"
            size={17}
            color={Colors.navyMid}
          />
          <Text style={styles.pointText}>{symptom}</Text>
        </View>
      ))}
    </View>

    <View style={styles.affectedBox}>
      <Ionicons
        name="hardware-chip-outline"
        size={19}
        color={Colors.navy}
      />

      <View style={styles.affectedContent}>
        <Text style={styles.affectedTitle}>
          Main Area Affected
        </Text>
        <Text style={styles.affectedText}>
          {condition.affected}
        </Text>
      </View>
    </View>

    <View style={styles.factBox}>
      <Ionicons
        name="bulb-outline"
        size={21}
        color={Colors.navy}
      />

      <View style={styles.factContent}>
        <Text style={styles.factTitle}>Did You Know?</Text>
        <Text style={styles.factText}>{condition.fact}</Text>
      </View>
    </View>
  </View>
)

const NeurologicalConditions = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={true}
    >
      {/* Hero section */}
      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <Ionicons
            name="medkit"
            size={40}
            color={Colors.white}
          />
        </View>

        <Text style={styles.heroTitle}>
          Neurological Conditions
        </Text>

        <Text style={styles.heroDescription}>
          Explore common conditions affecting the brain,
          spinal cord and nervous system.
        </Text>
      </View>

      {/* Introduction */}
      <View style={styles.introCard}>
        <Text style={styles.introTitle}>
          What are Neurological Conditions?
        </Text>

        <Text style={styles.description}>
          Neurological conditions are disorders that affect
          the nervous system. They may influence movement,
          memory, sensation, communication and other body
          functions.
        </Text>
      </View>

      {/* Conditions */}
      <SectionHeading title="Explore Conditions" />

      <Text style={styles.sectionDescription}>
        Learn about five common neurological conditions,
        their symptoms and the areas they affect.
      </Text>

      {conditions.map((condition, index) => (
        <ConditionCard
          key={condition.id}
          condition={condition}
          number={index + 1}
        />
      ))}

      {/* Educational note */}
      <View style={styles.noteCard}>
        <Ionicons
          name="information-circle"
          size={27}
          color={Colors.navy}
        />

        <View style={styles.noteContent}>
          <Text style={styles.noteTitle}>
            Important to Remember
          </Text>

          <Text style={styles.noteText}>
            Neurological conditions can affect people
            differently. The symptoms listed here are
            educational examples and are not a diagnostic
            checklist. Diagnosis and treatment require
            professional medical assessment.
          </Text>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        NeuroNook • Explore. Learn. Understand.
      </Text>
    </ScrollView>
  )
}

export default NeurologicalConditions

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBlue,
  },
  content: {
    padding: 18,
    paddingBottom: 35,
  },
  hero: {
    backgroundColor: Colors.navy,
    borderRadius: 18,
    padding: 23,
    alignItems: 'center',
    marginBottom: 18,
  },
  heroIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.navyMid,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 13,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
  },
  heroDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.skyBlue,
    textAlign: 'center',
    marginTop: 10,
  },
  introCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 18,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  introTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.navy,
    marginBottom: 9,
  },
  sectionHeading: {
    fontSize: 19,
    fontWeight: 'bold',
    color: Colors.navy,
    marginBottom: 8,
    marginTop: 5,
  },
  sectionDescription: {
    fontSize: 14,
    lineHeight: 21,
    color: Colors.textMuted,
    marginBottom: 14,
  },
  conditionCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 15,
    marginBottom: 18,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  numberBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },
  numberText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 15,
  },
  conditionTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.navy,
  },
  conditionImage: {
    width: '100%',
    height: 175,
    borderRadius: 12,
    backgroundColor: Colors.lightBlue,
    marginBottom: 13,
  },
  description: {
    fontSize: 14,
    color: Colors.textMuted,
    lineHeight: 22,
  },
  detailBox: {
    backgroundColor: Colors.lightBlue,
    borderRadius: 11,
    padding: 13,
    marginTop: 14,
  },
  detailTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.navy,
    marginBottom: 5,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
  },
  pointText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 13,
    lineHeight: 20,
    color: Colors.navy,
  },
  affectedBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 11,
    padding: 12,
    marginTop: 12,
  },
  affectedContent: {
    flex: 1,
    marginLeft: 9,
  },
  affectedTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.navy,
    marginBottom: 4,
  },
  affectedText: {
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textMuted,
  },
  factBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.skyBlue,
    borderRadius: 11,
    padding: 13,
    marginTop: 12,
  },
  factContent: {
    flex: 1,
    marginLeft: 9,
  },
  factTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.navy,
    marginBottom: 4,
  },
  factText: {
    fontSize: 13,
    lineHeight: 20,
    color: Colors.navy,
  },
  noteCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    marginTop: 5,
  },
  noteContent: {
    flex: 1,
    marginLeft: 10,
  },
  noteTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.navy,
    marginBottom: 5,
  },
  noteText: {
    fontSize: 13,
    lineHeight: 21,
    color: Colors.textMuted,
  },
  footer: {
    textAlign: 'center',
    color: Colors.textMuted,
    fontSize: 12,
    marginTop: 25,
  },
})
