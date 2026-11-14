
import React, { useEffect, useMemo, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors'
import { getAllBrainRegions } from '../../database/brainRegionQueries'

const categories = ['All', 'Major regions', 'Lobes', 'Structures']

// Identify the category of each brain region.
const getCategory = (name) => {
  const lowerName = name.toLowerCase()

  if (['cerebrum', 'cerebellum', 'brainstem'].includes(lowerName)) {
    return 'Major regions'
  }

  if (lowerName.includes('lobe')) {
    return 'Lobes'
  }

  return 'Structures'
}

const BrainExplorer = () => {
  const router = useRouter()

  const [brainRegions, setBrainRegions] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load brain regions from SQLite.
  useEffect(() => {
    let isMounted = true

    const loadRegions = async () => {
      try {
        const data = await getAllBrainRegions()

        if (isMounted) {
          setBrainRegions(data)
        }
      } catch (err) {
        console.error('Failed to load brain regions:', err)

        if (isMounted) {
          setError('Unable to load brain regions. Please try again.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadRegions()

    return () => {
      isMounted = false
    }
  }, [])

  // Search and filter brain regions.
  const filteredRegions = useMemo(() => {
    return brainRegions.filter((region) => {
      const searchText = search.trim().toLowerCase()

      const matchesSearch =
        region.name.toLowerCase().includes(searchText) ||
        region.short_description.toLowerCase().includes(searchText)

      const matchesCategory =
        selectedCategory === 'All' ||
        getCategory(region.name) === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [brainRegions, search, selectedCategory])

  // Open the detailed information screen.
  const openRegion = (region) => {
    router.push({
      pathname: '/topic-detail',
      params: {
        id: String(region.id),
        title: region.name,
        section: 'Brain Explorer',
      },
    })
  }

  // Loading screen.
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.navy} />
        <Text style={styles.message}>Loading brain regions...</Text>
      </View>
    )
  }

  // Error screen.
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>

      {/* Screen heading */}
      <Text style={styles.heading}>Explore the Brain</Text>

      <Text style={styles.subtitle}>
        Discover different brain regions and their functions.
      </Text>

      {/* Search bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search brain regions..."
        placeholderTextColor={Colors.textMuted}
        value={search}
        onChangeText={setSearch}
        clearButtonMode="while-editing"
      />

      {/* Category filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryList}
        contentContainerStyle={styles.categoryContent}
      >
        {categories.map((item) => (
          <Pressable
            key={item}
            style={[
              styles.categoryButton,
              selectedCategory === item && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(item)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === item && styles.selectedCategoryText,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Result count */}
      <Text style={styles.resultCount}>
        {filteredRegions.length} brain region(s) found
      </Text>

      {/* Brain region list */}
      <FlatList
        data={filteredRegions}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => openRegion(item)}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.regionName}>
                {item.name}
              </Text>

              <Text style={styles.arrow}>›</Text>
            </View>

            <Text style={styles.description}>
              {item.short_description}
            </Text>

            <Text style={styles.cardCategory}>
              {getCategory(item.name)}
            </Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No brain regions found.
            </Text>

            <Text style={styles.emptyHint}>
              Try another search or category.
            </Text>
          </View>
        }
      />
    </View>
  )
}

export default BrainExplorer

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

  searchInput: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 15,
    color: Colors.navy,
  },

  categoryList: {
    flexGrow: 0,
    flexShrink: 0,
    marginTop: 15,
    marginBottom: 12,
  },

  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingRight: 5,
  },

  categoryButton: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 9,
  },

  selectedCategory: {
    backgroundColor: Colors.navy,
    borderColor: Colors.navy,
  },

  categoryText: {
    color: Colors.navy,
    fontSize: 13,
    fontWeight: '600',
  },

  selectedCategoryText: {
    color: Colors.white,
  },

  resultCount: {
    color: Colors.textMuted,
    fontSize: 13,
    marginBottom: 10,
  },

  listContent: {
    paddingBottom: 30,
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

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  regionName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.navy,
    flex: 1,
  },

  arrow: {
    fontSize: 26,
    color: Colors.navyMid,
  },

  description: {
    color: Colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },

  cardCategory: {
    color: Colors.navyMid,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 12,
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
    color: Colors.navy,
    textAlign: 'center',
  },

  emptyContainer: {
    alignItems: 'center',
    padding: 25,
  },

  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.navy,
  },

  emptyHint: {
    color: Colors.textMuted,
    marginTop: 6,
  },
})
