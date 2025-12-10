import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MapPin, Star } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { MOCK_BUSES } from '@/api/mockData';
import { Bus } from '@/types';

const FAVORITE_STOPS = [
  { id: '1', name: 'Abide Durağı', lines: '63, 73, 90' },
  { id: '2', name: 'Kampüs Giriş', lines: '90, 90B' },
  { id: '3', name: 'Piazza AVM', lines: '33, 36' },
];

const TransportScreen = () => {
  const [selectedArea, setSelectedArea] = useState('Osmanbey');

  const filteredBuses: Bus[] = MOCK_BUSES; // İleride alana göre filtre eklenebilir

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.title}>Ulaşım Rehberi</Text>
              <Text style={styles.subtitle}>Otobüsüm nerede?</Text>
            </View>
            <View style={styles.headerIcon}>
              <MapPin color={Colors.primary.indigo} size={22} />
            </View>
          </View>

          {/* Search */}
          <View style={styles.searchContainer}>
            <Search color="#9ca3af" size={20} />
            <TextInput
              placeholder="Hat no veya durak adı ara..."
              style={styles.searchInput}
              placeholderTextColor="#9ca3af"
            />
          </View>

          {/* Area pills */}
          <View style={styles.areaPillsRow}>
            {['Osmanbey', 'Karaköprü', 'Eyyübiye', 'Balıklıgöl'].map((area) => (
              <TouchableOpacity
                key={area}
                style={[
                  styles.areaPill,
                  selectedArea === area && styles.areaPillActive,
                ]}
                onPress={() => setSelectedArea(area)}
              >
                <Text
                  style={[
                    styles.areaPillText,
                    selectedArea === area && styles.areaPillTextActive,
                  ]}
                >
                  {area}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Favorite Stops */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Favori Duraklar</Text>
            <TouchableOpacity>
              <Text style={styles.editText}>Düzenle</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.favoriteRow}
          >
            {FAVORITE_STOPS.map((stop) => (
              <View key={stop.id} style={styles.favoriteCard}>
                <View style={styles.favoriteIconCircle}>
                  <MapPin color={Colors.primary.indigo} size={18} />
                </View>
                <Text style={styles.favoriteName}>{stop.name}</Text>
                <Text style={styles.favoriteLines}>{stop.lines}</Text>
                <View style={styles.favoriteStar}>
                  <Star color="#facc15" size={16} />
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Upcoming buses */}
          <View style={[styles.sectionHeaderRow, { marginTop: 24 }]}>
            <Text style={styles.sectionTitle}>Yaklaşan Otobüsler</Text>
            <TouchableOpacity style={styles.nearestPill}>
              <Text style={styles.nearestPillText}>En yakın durak</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.busList}>
            {filteredBuses.map((bus) => (
              <View
                key={bus.id}
                style={[styles.busCard, { borderColor: bus.lineColor }]}
              >
                <View style={styles.busLeft}>
                  <View
                    style={[
                      styles.busNumberBadge,
                      { borderColor: bus.lineColor },
                    ]}
                  >
                    <Text
                      style={[
                        styles.busNumberText,
                        { color: bus.lineColor },
                      ]}
                    >
                      {bus.lineNumber}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.busDestination}>{bus.destination}</Text>
                    <Text style={styles.busTariff}>Tarife: Normal</Text>
                  </View>
                </View>

                <View style={styles.busRight}>
                  <Text style={styles.busTime}>{bus.arrivalTime} dk</Text>
                  <Text style={styles.busTimeSub}>kaldı</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    paddingBottom: 110, // Tab Bar'ın altında kalmaması için ekstra boşluk
  },
  card: {
    // backgroundColor: Colors.white,
    // borderRadius: 32,
    // padding: 20,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 18 },
    // shadowOpacity: 0.16,
    // shadowRadius: 30,
    // elevation: 18,
    // marginTop: 8,
    // marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.darkGray,
  },
  subtitle: {
    color: '#9ca3af',
    marginTop: 4,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eef2ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: Colors.darkGray,
  },
  areaPillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  areaPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
  },
  areaPillActive: {
    backgroundColor: '#dcfce7',
  },
  areaPillText: {
    color: '#6b7280',
    fontWeight: '500',
  },
  areaPillTextActive: {
    color: '#16a34a',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.darkGray,
  },
  editText: {
    color: Colors.primary.indigo,
    fontWeight: '600',
  },
  favoriteRow: {
    paddingVertical: 16,
    gap: 12,
  },
  favoriteCard: {
    width: 150,
    marginRight: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 20,
    padding: 14,
    position: 'relative',
  },
  favoriteIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  favoriteName: {
    fontWeight: '600',
    color: Colors.darkGray,
  },
  favoriteLines: {
    color: '#9ca3af',
    marginTop: 4,
    fontSize: 12,
  },
  favoriteStar: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  nearestPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#dcfce7',
  },
  nearestPillText: {
    color: '#16a34a',
    fontWeight: '600',
    fontSize: 12,
  },
  busList: {
    marginTop: 16,
    gap: 12,
  },
  busCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 18,
    padding: 14,
    backgroundColor: Colors.white,
    borderWidth: 2,
  },
  busLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  busNumberBadge: {
    width: 46,
    height: 46,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  busNumberText: {
    fontSize: 18,
    fontWeight: '700',
  },
  busDestination: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.darkGray,
  },
  busTariff: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  busRight: {
    alignItems: 'flex-end',
  },
  busTime: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.darkGray,
  },
  busTimeSub: {
    fontSize: 12,
    color: '#9ca3af',
  },
});

export default TransportScreen;
