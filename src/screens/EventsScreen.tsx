import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { MOCK_EVENTS } from '@/api/mockData';
import { Event } from '@/types';
import { useThemeMode } from '@/context/ThemeContext';

const CATEGORIES = ['Tümü', 'Konser', 'Gezi', 'Spor'];

const EventsScreen = () => {
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';
  const [activeTab, setActiveTab] = useState('Tümü');

  const renderEventItem = ({ item }: { item: Event }) => (
    <TouchableOpacity style={styles.eventCard}>
      <ImageBackground source={{ uri: item.image }} style={styles.eventImage} imageStyle={{ borderRadius: 20 }}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradientOverlay}
        />
        <View style={styles.badgeContainer}>
          <Text style={styles.categoryBadge}>{item.category}</Text>
        </View>
        <TouchableOpacity style={styles.likeButton}>
          <Heart color={Colors.white} size={24} fill={Colors.white} />
        </TouchableOpacity>
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <Text style={styles.eventDate}>{`${item.date} · ${item.location}`}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[styles.container, isDark && { backgroundColor: '#020617' }]}
      edges={['top']}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Etkinlikler</Text>
      </View>
      
      <View>
        <FlatList
            horizontal
            data={CATEGORIES}
            renderItem={({ item }) => (
            <TouchableOpacity 
                style={[styles.tab, activeTab === item && styles.activeTab]}
                onPress={() => setActiveTab(item)}
            >
                <Text style={[styles.tabText, activeTab === item && styles.activeTabText]}>{item}</Text>
            </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.pillsContainer}
        />
      </View>

        <FlatList
          data={MOCK_EVENTS}
          renderItem={renderEventItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
    </SafeAreaView>
  );
};

// Stiller önceki modern haliyle aynı kalıyor
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.darkGray,
  },
  pillsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tab: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
      marginRight: 10,
      backgroundColor: Colors.white,
      borderWidth: 1,
      borderColor: '#e5e7eb'
  },
  activeTab: {
      backgroundColor: Colors.primary.indigo,
      borderWidth: 0,
  },
  tabText: {
      fontWeight: '600',
      color: '#6b7280'
  },
  activeTabText: {
      color: Colors.white
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  eventCard: {
    height: 350,
    marginBottom: 20,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  eventImage: {
    flex: 1,
    justifyContent: 'flex-end',
    borderRadius: 20,
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
    borderRadius: 20,
  },
  badgeContainer: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  categoryBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    fontWeight: 'bold',
    overflow: 'hidden',
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
  },
  likeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 8,
    borderRadius: 20,
  },
  eventInfo: {
    padding: 20,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
  },
  eventDate: {
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
    fontWeight: '600'
  },
});

export default EventsScreen;
