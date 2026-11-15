
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router'
import { Colors } from '../constants/Colors'
import { getBrainRegionById } from '../database/brainRegionQueries'
import {
  saveTopic,
  removeSavedTopic,
  isTopicSaved,
} from '../database/savedTopicQueries'

const regionImages = {
  amygdala: require('../assets/brain-regions/amygdala.png'),
  brainstem: require('../assets/brain-regions/brainstem.png'),
  cerebellum: require('../assets/brain-regions/cerebellum.png'),
  cerebrum: require('../assets/brain-regions/cerebrum.png'),
  'frontal lobe': require('../assets/brain-regions/frontal-lobe.png'),
  hippocampus: require('../assets/brain-regions/hippocampus.png'),
  hypothalamus: require('../assets/brain-regions/hypothalamus.png'),
  'parietal lobe': require('../assets/brain-regions/parietal-lobe.png'),
  'temporal lobe': require('../assets/brain-regions/temporal-lobe.png'),
  thalamus: require('../assets/brain-regions/thalamus.png'),
}

export default function TopicDetail() {
  const { id, title } = useLocalSearchParams()
  const regionId = Number(id)

  const [region, setRegion] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isSaved, setIsSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadRegion = async () => {
      try {
        const data = await getBrainRegionById(regionId)
        const saved = await isTopicSaved(regionId)

        if (isMounted) {
          setRegion(data)
          setIsSaved(saved)
        }
      } catch (err) {
        if (isMounted) {
          setError('Unable to load this brain region.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadRegion()

    return () => {
      isMounted = false
    }
  }, [regionId])

  const openSource = async (url) => {
    if (!url) return

    try {
      await Linking.openURL(url)
    } catch (err) {
      console.log('Unable to open reference:', err)
    }
  }

  const toggleSave = async () => {
    if (!region || saving) return

    try {
      setSaving(true)

      if (isSaved) {
        await removeSavedTopic(regionId)
        setIsSaved(false)
      } else {
        await saveTopic(regionId)
        setIsSaved(true)
      }
    } catch (err) {
      console.log('Unable to update saved topic:', err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.navy} />
        <Text style={styles.loadingText}>Loading topic...</Text>
      </View>
    )
  }

  if (error || !region) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          {error || 'Brain region not found.'}
        </Text>
      </View>
    )
  }

  const regionImage =
    regionImages[region.name.toLowerCase().trim()]

  return (
    <>
      <Stack.Screen
        options={{
          title: title || region.name,
          headerTintColor: Colors.navy,
          headerTitleStyle: { fontWeight: '700' },
        }}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.title}>{region.name}</Text>

          {regionImage && (
            <View style={styles.imageContainer}>
              <Image
                source={regionImage}
                style={styles.regionImage}
                resizeMode="contain"
                accessibilityLabel={`${region.name} brain illustration`}
              />
            </View>
          )}

          <Pressable
            style={[
              styles.saveButton,
              isSaved && styles.savedButton,
              saving && styles.disabledButton,
            ]}
            onPress={toggleSave}
            disabled={saving}
          >
            <Text
              style={[
                styles.saveButtonText,
                isSaved && styles.savedButtonText,
              ]}
            >
              {saving
                ? 'Updating...'
                : isSaved
                  ? '✓ Saved Topic'
                  : '☆ Save Topic'}
            </Text>
          </Pressable>

          <Text style={styles.description}>
            {region.short_description}
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.bodyText}>{region.overview}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            <Text style={styles.bodyText}>{region.location}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Main Functions</Text>

            {region.functions?.map((item, index) => (
              <View key={index} style={styles.functionRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.functionText}>{item}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>References</Text>

            {region.references?.map((reference, index) => (
              <Pressable
                key={index}
                style={styles.referenceButton}
                onPress={() => openSource(reference.url)}
              >
                <Text style={styles.referenceText}>
                  {reference.title} ↗
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
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
    padding: 16,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 20,
    elevation: 3,
  },
  title: {
    fontSize: 25,
    fontWeight: '800',
    color: Colors.navy,
    marginBottom: 16,
  },
  imageContainer: {
    width: '100%',
    height: 220,
    backgroundColor: Colors.lightBlue,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  regionImage: {
    width: '100%',
    height: '100%',
  },
  saveButton: {
    backgroundColor: Colors.navy,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 18,
  },
  savedButton: {
    backgroundColor: Colors.lightBlue,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  disabledButton: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  savedButtonText: {
    color: Colors.navy,
  },
  description: {
    fontSize: 16,
    lineHeight: 25,
    color: Colors.textMuted,
    marginBottom: 20,
  },
  section: {
    marginTop: 18,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: Colors.navy,
    marginBottom: 9,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 24,
    color: Colors.textMuted,
  },
  functionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 18,
    color: Colors.navyMid,
    marginRight: 9,
    lineHeight: 23,
  },
  functionText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 23,
    color: Colors.textMuted,
  },
  referenceButton: {
    backgroundColor: Colors.lightBlue,
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  referenceText: {
    color: Colors.navyMid,
    fontSize: 14,
    fontWeight: '600',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightBlue,
    padding: 20,
  },
  loadingText: {
    color: Colors.navy,
    marginTop: 12,
    fontSize: 15,
  },
  errorText: {
    color: Colors.navy,
    fontSize: 16,
    textAlign: 'center',
  },
})
