
import React, { useCallback, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { useFocusEffect, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors'
import {
  getSavedTopics,
  removeSavedTopic,
} from '../../database/savedTopicQueries'

const SavedTopics = () => {
  const router = useRouter()

  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load saved topics whenever this screen becomes active.
  useFocusEffect(
    useCallback(() => {
      let isMounted = true

      const loadTopics = async () => {
        try {
          setLoading(true)
          setError(null)

          const data = await getSavedTopics()

          if (isMounted) {
            setTopics(data)
          }
        } catch (err) {
          console.error('Failed to load saved topics:', err)

          if (isMounted) {
            setError('Unable to load saved topics.')
          }
        } finally {
          if (isMounted) {
            setLoading(false)
          }
        }
      }

      loadTopics()

      return () => {
        isMounted = false
      }
    }, [])
  )

  // Open the selected brain region.
  const openTopic = (topic) => {
    router.push({
      pathname: '/topic-detail',
      params: {
        id: String(topic.id),
        title: topic.name,
        section: 'Saved Topics',
      },
    })
  }

  // Remove a topic from bookmarks.
  const deleteTopic = async (regionId) => {
    try {
      await removeSavedTopic(regionId)

      setTopics((previousTopics) =>
        previousTopics.filter((topic) => topic.id !== regionId)
      )
    } catch (err) {
      console.error('Failed to remove saved topic:', err)
      setError('Unable to remove this topic. Please try again.')
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.navy} />
        <Text style={styles.message}>Loading saved topics...</Text>
      </View>
    )
  }

  if (error && topics.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Saved Topics</Text>

      <Text style={styles.subtitle}>
        Your bookmarked brain regions, ready to explore again.
      </Text>

      {error && (
        <Text style={styles.error}>{error}</Text>
      )}

      <FlatList
        data={topics}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Pressable
              style={styles.topicContent}
              onPress={() => openTopic(item)}
            >
              <Text style={styles.topicName}>{item.name}</Text>

              <Text style={styles.description}>
                {item.short_description}
              </Text>

              <Text style={styles.openText}>
                Read topic →
              </Text>
            </Pressable>

            <Pressable
              style={styles.removeButton}
              onPress={() => deleteTopic(item.id)}
            >
              <Text style={styles.removeText}>
                Remove
              </Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>☆</Text>

            <Text style={styles.emptyTitle}>
              No saved topics yet
            </Text>

            <Text style={styles.emptyText}>
              Explore the brain and tap Save Topic
              to bookmark your favourite regions.
            </Text>
          </View>
        }
      />
    </View>
  )
}

export default SavedTopics

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBlue,
    paddingHorizontal: 18,
    paddingTop: 20,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.navy,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: 6,
    marginBottom: 18,
    lineHeight: 21,
  },
  listContent: {
    paddingBottom: 25,
    flexGrow: 1,
  },
  card: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  topicContent: {
    flex: 1,
  },
  topicName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.navy,
  },
  description: {
    fontSize: 14,
    color: Colors.textMuted,
    lineHeight: 21,
    marginTop: 7,
  },
  openText: {
    color: Colors.navyMid,
    fontWeight: '600',
    marginTop: 12,
  },
  removeButton: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.lightBlue,
    borderRadius: 8,
    paddingHorizontal: 13,
    paddingVertical: 8,
    marginTop: 12,
  },
  removeText: {
    color: Colors.navy,
    fontWeight: '600',
    fontSize: 13,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  emptyIcon: {
    fontSize: 48,
    color: Colors.navyMid,
  },
  emptyTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: Colors.navy,
    marginTop: 15,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 8,
  },
  center: {
    flex: 1,
    backgroundColor: Colors.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  message: {
    color: Colors.navy,
    marginTop: 12,
  },
  error: {
    color: '#B42318',
    marginBottom: 10,
  },
})
