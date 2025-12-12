import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { MOCK_MAGAZINES } from '@/api/mockData';
import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from '@/types/navigation';
import { useThemeMode } from '@/context/ThemeContext';

type Props = StackScreenProps<RootStackParamList, 'HeritageDetail'>;

const HeritageDetailScreen: React.FC<Props> = ({ route }) => {
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';
  const { id } = route.params;
  const place = MOCK_MAGAZINES.find(m => m.id === id);

  if (!place) {
    return (
      <SafeAreaView
        style={[styles.container, isDark && { backgroundColor: '#020617' }]}
        edges={['top']}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Keşfet</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.fallbackText}>Bu içerik bulunamadı.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const imageSource = typeof place.image === 'string' ? { uri: place.image } : place.image;

  return (
    <SafeAreaView
      style={[styles.container, isDark && { backgroundColor: '#020617' }]}
      edges={['top']}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{place.title}</Text>
        </View>

        <View style={styles.imageCard}>
          <Image source={imageSource} style={styles.image} />
        </View>

        <View style={styles.content}>
          {place.description && (
            <Text style={styles.description}>{place.description}</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
  imageCard: {
    marginHorizontal: 20,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  image: {
    width: '100%',
    height: 220,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#4b5563',
  },
  fallbackText: {
    fontSize: 16,
    color: '#6b7280',
  },
});

export default HeritageDetailScreen;

