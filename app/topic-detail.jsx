
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
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

const TopicDetail = () => {
  const { id, title } = useLocalSearchParams()

  const [region, setRegion] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isSaved, setIsSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadRegion = async () => {
      try {
        const regionId = Number(Array.isArray(id) ? id[0] : id)

        if (!Number.isInteger(regionId) || regionId <= 0) {
          throw new Error('Invalid brain region ID.')
        }

        const data = await getBrainRegionById(regionId)
        const saved = await isTopicSaved(regionId)

        if (!data) {
          throw new Error('Brain region not found.')
        }

        if (isMounted) {
          setRegion(data)
          setIsSaved(saved)
        }
      } catch (err) {
        console.error('Failed to load brain region:', err)

        if (isMounted) {
          setError(err.message || 'Unable to load information.')
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
  }, [id])

  const openSource = (url) => {
    Linking.openURL(url).catch((err) => {
      console.error('Unable to open source:', err)
    })
  }

  const toggleSave = async () => {
  if (!region || saving) return

  try {
    setSaving(true)

    if (isSaved) {
      await removeSavedTopic(region.id)
      setIsSaved(false)
    } else {
      await saveTopic(region.id)
      setIsSaved(true)
    }
  } catch (err) {
    console.error('Bookmark operation failed:', err)
  } finally {
    setSaving(false)
  }
}
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: region?.name || title || 'Brain Region',
        }}
      />

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.navy} />
          <Text style={styles.message}>Loading information...</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.error}>{error}</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Text style={styles.title}>{region.name}</Text>
            <Pressable
              onPress={toggleSave}
              disabled={saving}
              style={styles.bookmarkButton}
            >
              <Text style={styles.bookmarkText}>
                {saving
                  ? 'Please wait...'
                  : isSaved
                    ? '✓ Saved Topic'
                    : '☆ Save Topic'}
              </Text>
            </Pressable>
            <Text style={styles.shortDescription}>
              {region.short_description}
            </Text>

            <View style={styles.divider} />

            <Text style={styles.heading}>Overview</Text>
            <Text style={styles.body}>{region.description}</Text>

            <Text style={styles.heading}>Location</Text>
            <Text style={styles.body}>{region.location}</Text>

            <Text style={styles.heading}>Main Functions</Text>

            {region.functions.map((item, index) => (
              <View key={index} style={styles.functionRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.functionText}>{item}</Text>
              </View>
            ))}

            <View style={styles.divider} />

            <Text style={styles.heading}>References</Text>

            <Pressable
              onPress={() => openSource(region.source_url)}
              style={styles.sourceButton}
            >
              <Text style={styles.sourceName}>
                {region.source_name} ↗
              </Text>
            </Pressable>

            {region.additional_sources.map((source, index) => (
              <Pressable
                key={index}
                onPress={() => openSource(source.source_url)}
                style={styles.sourceButton}
              >
                <Text style={styles.sourceName}>
                  {source.source_name} ↗
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  )
}

export default TopicDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBlue,
    padding: 18,
  },
  card: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.navy,
  },
  shortDescription: {
    fontSize: 15,
    color: Colors.navyMid,
    lineHeight: 23,
    marginTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.navy,
    marginTop: 18,
    marginBottom: 9,
  },
  body: {
    fontSize: 15,
    color: Colors.textMuted,
    lineHeight: 24,
  },
  functionRow: {
    flexDirection: 'row',
    marginBottom: 9,
  },
  bullet: {
    color: Colors.navyMid,
    fontSize: 18,
    marginRight: 10,
  },
  functionText: {
    flex: 1,
    fontSize: 15,
    color: Colors.textMuted,
    lineHeight: 23,
  },
  sourceButton: {
    backgroundColor: Colors.lightBlue,
    borderRadius: 9,
    padding: 12,
    marginTop: 8,
  },
  sourceName: {
    color: Colors.navyMid,
    fontSize: 14,
    fontWeight: '600',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: 12,
    color: Colors.navy,
  },
  error: {
    color: Colors.navy,
    textAlign: 'center',
  },

  bookmarkButton: {
    backgroundColor: Colors.lightBlue,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: 12,
    marginTop: 14,
    alignItems: 'center',
  },

  bookmarkText: {
    color: Colors.navy,
    fontSize: 15,
    fontWeight: 'bold',
  },
})
