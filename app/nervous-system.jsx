
import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../constants/Colors'

// Reusable heading for each section.
const SectionHeading = ({ title }) => (
  <Text style={styles.sectionHeading}>{title}</Text>
)

// Reusable information card.
const InfoCard = ({ icon, title, description, points }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={25} color={Colors.white} />
      </View>

      <Text style={styles.cardTitle}>{title}</Text>
    </View>

    <Text style={styles.description}>{description}</Text>

    {points?.map((point, index) => (
      <View style={styles.pointRow} key={index}>
        <Ionicons
          name="checkmark-circle"
          size={17}
          color={Colors.navyMid}
        />
        <Text style={styles.pointText}>{point}</Text>
      </View>
    ))}
  </View>
)

const NervousSystem = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Introduction */}
      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <Ionicons
            name="git-network"
            size={42}
            color={Colors.white}
          />
        </View>

        <Text style={styles.heroTitle}>The Nervous System</Text>

        <Text style={styles.heroDescription}>
          Discover how the brain, spinal cord and nerves
          communicate to control and coordinate the human body.
        </Text>
      </View>

      {/* Overview */}
      <View style={styles.overviewCard}>
        <Text style={styles.overviewTitle}>What is the Nervous System?</Text>

        <Text style={styles.description}>
          The nervous system is the body's communication and
          control network. It receives information, processes it
          and sends signals to different parts of the body.
        </Text>
      </View>

      {/* Main divisions */}
      <SectionHeading title="Main Divisions" />

      <InfoCard
        icon="hardware-chip"
        title="Central Nervous System (CNS)"
        description="The CNS is the main control centre of the body. It consists of two major parts:"
        points={[
          'Brain – processes information, controls thoughts, memory and body activities.',
          'Spinal cord – carries signals between the brain and the rest of the body.',
        ]}
      />

      <InfoCard
        icon="git-network"
        title="Peripheral Nervous System (PNS)"
        description="The PNS includes all nerves outside the brain and spinal cord. It connects the CNS with the rest of the body."
        points={[
          'Carries sensory information towards the CNS.',
          'Carries motor commands from the CNS to muscles and glands.',
        ]}
      />

      {/* PNS subdivisions */}
      <SectionHeading title="Divisions of the PNS" />

      <InfoCard
        icon="body"
        title="Somatic Nervous System"
        description="Responsible for voluntary movements and communication with skeletal muscles."
        points={[
          'Helps you walk, write and move your hands.',
          'Carries sensory information such as touch and temperature.',
        ]}
      />

      <InfoCard
        icon="pulse"
        title="Autonomic Nervous System"
        description="Controls many involuntary activities of internal organs."
        points={[
          'Regulates heart rate and digestion.',
          'Controls activities of smooth muscles and glands.',
          'Includes sympathetic and parasympathetic divisions.',
        ]}
      />

      {/* Autonomic divisions */}
      <SectionHeading title="Autonomic Nervous System" />

      <View style={styles.comparisonCard}>
        <View style={styles.comparisonItem}>
          <View style={styles.comparisonIcon}>
            <Ionicons
              name="flash"
              size={25}
              color={Colors.navyMid}
            />
          </View>

          <Text style={styles.comparisonTitle}>Sympathetic</Text>

          <Text style={styles.description}>
            Prepares the body for stressful or demanding situations.
          </Text>

          <Text style={styles.exampleTitle}>Examples</Text>
          <Text style={styles.exampleText}>
            • Increases heart rate
          </Text>
          <Text style={styles.exampleText}>
            • Dilates pupils
          </Text>
          <Text style={styles.exampleText}>
            • Reduces digestive activity
          </Text>
        </View>

        <View style={styles.verticalDivider} />

        <View style={styles.comparisonItem}>
          <View style={styles.comparisonIcon}>
            <Ionicons
              name="leaf"
              size={25}
              color={Colors.navyMid}
            />
          </View>

          <Text style={styles.comparisonTitle}>Parasympathetic</Text>

          <Text style={styles.description}>
            Supports relaxation, recovery and normal body functions.
          </Text>

          <Text style={styles.exampleTitle}>Examples</Text>
          <Text style={styles.exampleText}>
            • Slows heart rate
          </Text>
          <Text style={styles.exampleText}>
            • Supports digestion
          </Text>
          <Text style={styles.exampleText}>
            • Conserves energy
          </Text>
        </View>
      </View>

      {/* Signal pathway */}
      <SectionHeading title="How Do Nerve Signals Travel?" />

      <View style={styles.card}>
        <Text style={styles.description}>
          The nervous system receives information and produces
          responses through a coordinated pathway.
        </Text>

        {[
          ['1', 'Receptor', 'Detects a stimulus such as heat or touch.'],
          ['2', 'Sensory neuron', 'Carries information towards the CNS.'],
          ['3', 'CNS', 'Processes the information and coordinates a response.'],
          ['4', 'Motor neuron', 'Carries commands towards an effector.'],
          ['5', 'Effector', 'A muscle or gland performs the response.'],
        ].map((step, index) => (
          <View style={styles.stepRow} key={step[0]}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{step[0]}</Text>
            </View>

            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>{step[1]}</Text>
              <Text style={styles.stepDescription}>{step[2]}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Quick fact */}
      <View style={styles.factCard}>
        <Ionicons
          name="bulb"
          size={27}
          color={Colors.navy}
        />

        <View style={styles.factContent}>
          <Text style={styles.factTitle}>Did You Know?</Text>
          <Text style={styles.factText}>
            Some reflex actions are coordinated by the spinal
            cord without waiting for the brain to process the
            response first.
          </Text>
        </View>
      </View>

      <Text style={styles.footer}>
        NeuroNook • Explore. Learn. Understand.
      </Text>
    </ScrollView>
  )
}

export default NervousSystem

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
    padding: 24,
    alignItems: 'center',
    marginBottom: 18,
  },
  heroIcon: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: Colors.navyMid,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  heroTitle: {
    fontSize: 23,
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
  overviewCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 18,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.navy,
    marginBottom: 9,
  },
  sectionHeading: {
    fontSize: 19,
    fontWeight: 'bold',
    color: Colors.navy,
    marginBottom: 12,
    marginTop: 5,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 17,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: Colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.navy,
  },
  description: {
    fontSize: 14,
    color: Colors.textMuted,
    lineHeight: 22,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 11,
  },
  pointText: {
    flex: 1,
    marginLeft: 9,
    fontSize: 13,
    lineHeight: 20,
    color: Colors.navy,
  },
  comparisonCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 15,
    marginBottom: 18,
    flexDirection: 'row',
  },
  comparisonItem: {
    flex: 1,
  },
  comparisonIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  comparisonTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.navy,
    marginBottom: 8,
  },
  exampleTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.navy,
    marginTop: 12,
    marginBottom: 5,
  },
  exampleText: {
    fontSize: 12,
    lineHeight: 20,
    color: Colors.textMuted,
  },
  verticalDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 12,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 17,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.navy,
  },
  stepDescription: {
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textMuted,
    marginTop: 3,
  },
  factCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.skyBlue,
    borderRadius: 14,
    padding: 17,
    marginTop: 5,
  },
  factContent: {
    flex: 1,
    marginLeft: 12,
  },
  factTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.navy,
    marginBottom: 5,
  },
  factText: {
    fontSize: 13,
    lineHeight: 21,
    color: Colors.navy,
  },
  footer: {
    textAlign: 'center',
    color: Colors.textMuted,
    fontSize: 12,
    marginTop: 25,
  },
})
