import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { MOCK_PARTNERS } from '@/api/mockData';
import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from '@/types/navigation';

type Props = StackScreenProps<RootStackParamList, 'PartnerDetail'>;

const PartnerDetailScreen: React.FC<Props> = ({ route }) => {
  const { partnerId } = route.params;
  const partner = MOCK_PARTNERS.find(p => p.id === partnerId);

  if (!partner) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mekan Bulunamadı</Text>
        </View>
      </SafeAreaView>
    );
  }

  const Icon = partner.icon;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{partner.name}</Text>
          <Text style={styles.headerSubtitle}>Genç Kart'a özel fırsat</Text>
        </View>

        <View style={styles.card}>
          <View style={[styles.iconContainer, { backgroundColor: partner.bgColor }]}>
            <Icon color={partner.iconColor} size={32} />
          </View>
          <Text style={styles.offer}>{partner.offer}</Text>
          <Text style={styles.description}>{partner.description}</Text>
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
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.darkGray,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  card: {
    marginHorizontal: 20,
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  offer: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.darkGray,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default PartnerDetailScreen;

