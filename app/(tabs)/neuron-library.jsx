
import React, { useMemo, useState } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../constants/Colors'

// Local neuron information. No internet connection is required.
const neuronTypes = [
  {
    id: '1',
    name: 'Sensory Neurons',
    subtitle: 'Carry information towards the brain and spinal cord.',
    description:
      'Sensory neurons detect information from the environment and the body. They carry signals from sensory receptors to the central nervous system.',
    function: 'Transmit sensory information such as touch, pain, temperature and sound.',
    example: 'Feeling the heat when you touch a hot object.',
    icon: 'eye-outline',
  },
  {
    id: '2',
    name: 'Motor Neurons',
    subtitle: 'Carry commands from the central nervous system.',
    description:
      'Motor neurons transmit signals from the brain and spinal cord to muscles or glands. They help the body produce actions and responses.',
    function: 'Control muscle movements and some gland activities.',
    example: 'Moving your hand to pick up a book.',
    icon: 'body-outline',
  },
  {
    id: '3',
    name: 'Interneurons',
    subtitle: 'Connect neurons within the central nervous system.',
    description:
      'Interneurons connect sensory neurons and motor neurons. They help process information and support communication within the brain and spinal cord.',
    function: 'Process information and connect different neurons.',
    example: 'Helping coordinate a quick withdrawal reflex.',
    icon: 'git-network-outline',
  },
]

const neuronParts = [
  {
    name: 'Dendrites',
    description: 'Receive signals from other neurons.',
  },
  {
    name: 'Cell body (Soma)',
    description: 'Contains the nucleus and maintains the neuron.',
  },
  {
    name: 'Axon',
    description: 'Carries electrical signals away from the cell body.',
  },
  {
    name: 'Myelin sheath',
    description: 'Insulates the axon and helps signals travel faster.',
  },
  {
    name: 'Axon terminals',
    description: 'Pass signals to another cell at a synapse.',
  },
]

const NeuronLibrary = () => {
  const [search, setSearch] = useState('')
  const [expandedId, setExpandedId] = useState(null)

  const filteredNeurons = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) return neuronTypes

    return neuronTypes.filter((neuron) =>
      `${neuron.name} ${neuron.subtitle} ${neuron.description} ${neuron.function}`
        .toLowerCase()
        .includes(query)
    )
  }, [search])

  const renderNeuron = ({ item }) => {
    const isExpanded = expandedId === item.id

    return (
      <View style={styles.neuronCard}>
        <Pressable
          style={styles.neuronHeader}
          onPress={() => setExpandedId(isExpanded ? null : item.id)}
        >
          <View style={styles.iconCircle}>
            <Ionicons name={item.icon} size={25} color={Colors.white} />
          </View>

          <View style={styles.neuronText}>
            <Text style={styles.neuronName}>{item.name}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>

          <Ionicons
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={21}
            color={Colors.navyMid}
          />
        </Pressable>

        {isExpanded && (
          <View style={styles.details}>
            <Text style={styles.detailHeading}>Description</Text>
            <Text style={styles.detailText}>{item.description}</Text>

            <Text style={styles.detailHeading}>Main function</Text>
            <Text style={styles.detailText}>{item.function}</Text>

            <Text style={styles.detailHeading}>Example</Text>
            <Text style={styles.detailText}>{item.example}</Text>
          </View>
        )}
      </View>
    )
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={filteredNeurons}
      keyExtractor={(item) => item.id}
      renderItem={renderNeuron}
      ListHeaderComponent={
        <View>
          <Text style={styles.heading}>Neuron Library</Text>
          <Text style={styles.intro}>
            Explore the main types of neurons and learn about their important
            parts.
          </Text>

          <View style={styles.searchBox}>
            <Ionicons name="search" size={20} color={Colors.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search neuron types..."
              placeholderTextColor={Colors.textMuted}
              value={search}
              onChangeText={setSearch}
            />
            {search.length > 0 && (
              <Pressable onPress={() => setSearch('')}>
                <Ionicons
                  name="close-circle"
                  size={20}
                  color={Colors.textMuted}
                />
              </Pressable>
            )}
          </View>

          <Text style={styles.sectionTitle}>Types of Neurons</Text>
          <Text style={styles.hint}>Tap a neuron to learn more.</Text>
        </View>
      }
      ListEmptyComponent={
        <Text style={styles.emptyText}>
          No neuron types found. Try another search.
        </Text>
      }
      ListFooterComponent={
        <View>
          <Text style={styles.sectionTitle}>Main Parts of a Neuron</Text>
          <Text style={styles.hint}>
            Learn the basic structures of a typical neuron.
          </Text>

          {neuronParts.map((part, index) => (
            <View key={part.name} style={styles.partCard}>
              <View style={styles.numberCircle}>
                <Text style={styles.number}>{index + 1}</Text>
              </View>
              <View style={styles.partText}>
                <Text style={styles.partName}>{part.name}</Text>
                <Text style={styles.detailText}>{part.description}</Text>
              </View>
            </View>
          ))}
        </View>
      }
    />
  )
}

export default NeuronLibrary

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBlue,
  },
  content: {
    padding: 18,
    paddingBottom: 30,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.navy,
  },
  intro: {
    fontSize: 14,
    lineHeight: 21,
    color: Colors.textMuted,
    marginTop: 6,
    marginBottom: 18,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 22,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 9,
    color: Colors.navy,
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: Colors.navy,
    marginBottom: 5,
    marginTop: 8,
  },
  hint: {
    fontSize: 13,
    color: Colors.textMuted,
    marginBottom: 12,
  },
  neuronCard: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 13,
    marginBottom: 12,
    overflow: 'hidden',
  },
  neuronHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.navyMid,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  neuronText: {
    flex: 1,
    marginRight: 8,
  },
  neuronName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.navy,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 3,
    lineHeight: 17,
  },
  details: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    padding: 14,
    backgroundColor: '#F7FAFF',
  },
  detailHeading: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.navyMid,
    marginTop: 8,
    marginBottom: 3,
  },
  detailText: {
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textMuted,
  },
  emptyText: {
    textAlign: 'center',
    color: Colors.textMuted,
    padding: 20,
  },
  partCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 13,
    marginBottom: 10,
  },
  numberCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  number: {
    color: Colors.navy,
    fontWeight: 'bold',
  },
  partText: {
    flex: 1,
  },
  partName: {
    color: Colors.navy,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 3,
  },
})
