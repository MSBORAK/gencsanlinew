import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Keyboard, ActivityIndicator, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MapPin, Star, Info, Maximize2, Minimize2 } from 'lucide-react-native';
import * as Location from 'expo-location';
import { Platform } from 'react-native';
import { Colors } from '@/constants/Colors';
import { MOCK_STOPS } from '@/data/transport';
import { estimateTime, calculateDistance } from '@/utils/estimateTime';
import { useThemeMode } from '@/context/ThemeContext';

const FAVORITE_STOPS = [
  { id: 'abide', name: 'Abide Durağı', lines: '63, 73, 90' },
  { id: 'osmanbey', name: 'Osmanbey Kampüsü', lines: '90, 90E, 90K' },
  { id: 'piazza', name: 'Piazza AVM', lines: '33, 36' },
];

const TransportScreen = () => {
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.162800,
    longitude: 38.793700,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [nearestStop, setNearestStop] = useState<typeof MOCK_STOPS[0] | null>(null);
  const [upcomingBuses, setUpcomingBuses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>(['abide', 'osmanbey']);
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  const toggleFavorite = (stopId: string) => {
    setFavorites((prev) => {
      if (prev.includes(stopId)) {
        return prev.filter((id) => id !== stopId);
      } else {
        return [...prev, stopId];
      }
    });
  };

  // Filtreleme mantığı
  const filteredStops = MOCK_STOPS.filter((stop) => {
    // 1. Bölge filtresi
    if (selectedArea && stop.region !== selectedArea) return false;

    // 2. Arama filtresi
    if (searchQuery) {
      const query = searchQuery.toLocaleLowerCase('tr-TR').trim();
      const matchName = stop.name.toLocaleLowerCase('tr-TR').includes(query);
      const matchLine = stop.buses.some(bus => 
        bus.line.toLocaleLowerCase('tr-TR').includes(query) || 
        bus.route.toLocaleLowerCase('tr-TR').includes(query)
      );
      return matchName || matchLine;
    }

    return true;
  });

  // Bölge değiştiğinde haritayı o bölgeye odakla ve ilk durağı seç
  useEffect(() => {
    if (selectedArea && filteredStops.length > 0) {
      const firstStop = filteredStops[0];
      
      // Haritayı odakla
      setMapRegion({
        latitude: firstStop.lat,
        longitude: firstStop.lng,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
      });

      // O bölgedeki ilk durağı otomatik seç (Böylece liste güncellenir)
      setNearestStop(firstStop);
    } else if (selectedArea === null && location) {
      // "Tümü" seçildiyse ve konum varsa, tekrar en yakın durağı bulmaya çalış (Opsiyonel ama hoş olur)
      // Şimdilik sadece haritayı biraz uzaklaştıralım
       setMapRegion({
        latitude: 37.1674,
        longitude: 38.7955,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
    }
  }, [selectedArea]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('İzin Gerekli', 'Konum izni olmadan en yakın durağı bulamayız.');
        // Varsayılan olarak Abide durağını seç
        setNearestStop(MOCK_STOPS[0]);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // En yakın durağı bul
      if (location) {
        let minDistance = Infinity;
        let closest = MOCK_STOPS[0];

        // Kullanıcı Şanlıurfa merkezden 50km uzakta mı?
        const distToCenter = calculateDistance(
          location.coords.latitude,
          location.coords.longitude,
          37.1674,
          38.7955
        );

        // Eğer yakındaysa haritayı kullanıcıya odakla
        if (distToCenter < 50) {
          setMapRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        }
        // Uzaktaysa (örn: İstanbul veya Simülatör/San Francisco), varsayılan Şanlıurfa kalır.

        MOCK_STOPS.forEach((stop) => {
          const dist = calculateDistance(
            location.coords.latitude,
            location.coords.longitude,
            stop.lat,
            stop.lng
          );
          if (dist < minDistance) {
            minDistance = dist;
            closest = stop;
          }
        });

        setNearestStop(closest);
      } else {
        // Konum yoksa varsayılan olarak Abide durağını seç
        setNearestStop(MOCK_STOPS[0]);
      }
      setIsLoading(false);
    })();
  }, []);

  // Nearest stop değiştiğinde otobüsleri güncelle
  useEffect(() => {
    if (nearestStop) {
      const buses = nearestStop.buses.map((bus: any) => ({
        ...bus,
        estimatedArrival: estimateTime(bus.baseTime),
      }));
      setUpcomingBuses(buses.sort((a, b) => a.estimatedArrival - b.estimatedArrival));
    }
  }, [nearestStop]);

  if (isLoading) {
    return (
      <View style={[styles.root, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={Colors.primary.indigo} />
        <Text style={{ marginTop: 12, color: Colors.darkGray, fontWeight: '500' }}>
          Konum ve duraklar yükleniyor...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.root, isDark && { backgroundColor: '#020617' }]}
      edges={['top']}
    >
      {/* Full Screen Map - Rendered at SafeAreaView level when expanded */}
      {isMapExpanded && (
        <View style={styles.mapExpanded}>
          <MapView
            provider={PROVIDER_DEFAULT}
            style={StyleSheet.absoluteFill}
            region={mapRegion}
            showsUserLocation={true}
            onRegionChangeComplete={(region) => setMapRegion(region)}
            mapType="standard"
            showsMyLocationButton={false}
            showsCompass={false}
            toolbarEnabled={false}
          >
            {filteredStops.map((stop) => (
              <Marker
                key={stop.id}
                coordinate={{ latitude: stop.lat, longitude: stop.lng }}
                title={stop.name}
                description={nearestStop?.id === stop.id ? "En yakın durak" : "Durak"}
                pinColor={nearestStop?.id === stop.id ? Colors.primary.indigo : "#ef4444"}
                onPress={() => setNearestStop(stop)}
              />
            ))}
          </MapView>
          
          <View style={styles.mapOverlayRow}>
            {location && (
              <View style={[styles.mapLocationPill, isDark && { backgroundColor: '#1e293b' }]}>
                <MapPin color={isDark ? '#a5b4fc' : Colors.primary.indigo} size={16} />
                <Text style={[styles.mapLocationText, isDark && { color: '#f8fafc' }]}>Konumunuz Alındı</Text>
              </View>
            )}
            {nearestStop && (
              <View style={[styles.mapStopPill, isDark && { backgroundColor: '#059669', opacity: 0.2 }]}>
                <Text style={[styles.mapStopLabel, isDark && { color: '#a7f3d0' }]}>En yakın durak</Text>
                <Text style={[styles.mapStopValue, isDark && { color: '#a7f3d0' }]}>{nearestStop.name}</Text>
              </View>
            )}
          </View>

          {/* Harita Tam Ekranken Görünecek Arama Çubuğu */}
          <View style={styles.expandedSearchWrapper}>
            <View style={styles.expandedSearchRow}>
              <View style={[styles.expandedSearchContainer, isDark && { backgroundColor: '#1e293b', borderColor: '#334155', borderWidth: 1 }]}>
                <Search color={isDark ? '#94a3b8' : '#9ca3af'} size={20} />
                <TextInput
                  placeholder="Haritada durak ara..."
                  style={[styles.searchInput, isDark && { color: '#f8fafc' }]}
                  placeholderTextColor={isDark ? '#64748b' : '#9ca3af'}
                  value={searchQuery}
                  onChangeText={(text) => {
                    setSearchQuery(text);
                    if (text.length > 0) setSelectedArea(null);
                  }}
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => { setSearchQuery(''); Keyboard.dismiss(); }}>
                    <Text style={{ color: isDark ? '#94a3b8' : '#9ca3af', fontSize: 20, marginLeft: 8 }}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>
              
              <TouchableOpacity 
                style={[styles.expandedMinimizeButton, isDark && { backgroundColor: '#1e293b', borderColor: '#334155', borderWidth: 1 }]}
                onPress={() => {
                  setIsMapExpanded(false);
                  setSearchQuery('');
                }}
              >
                <Minimize2 color={isDark ? '#94a3b8' : Colors.darkGray} size={24} />
              </TouchableOpacity>
            </View>

            {searchQuery.length > 0 && (
              <View style={[styles.expandedSearchResultsList, isDark && { backgroundColor: '#1e293b', borderColor: '#334155' }]}>
                <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={true}>
                  {filteredStops.length > 0 ? (
                    filteredStops.map((stop) => (
                      <TouchableOpacity
                        key={stop.id}
                        style={[styles.searchResultItem, isDark && { borderBottomColor: '#334155' }]}
                        onPress={() => {
                          setNearestStop(stop);
                          setSearchQuery('');
                          Keyboard.dismiss();
                          setMapRegion({
                            latitude: stop.lat,
                            longitude: stop.lng,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                          });
                        }}
                      >
                        <View style={[styles.searchResultIcon, isDark && { backgroundColor: '#334155' }]}>
                          <MapPin size={16} color={isDark ? '#a5b4fc' : Colors.primary.indigo} />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={[styles.searchResultTitle, isDark && { color: '#f8fafc' }]}>{stop.name}</Text>
                          <Text style={[styles.searchResultLines, isDark && { color: '#94a3b8' }]} numberOfLines={1}>
                            Hatlar: {stop.buses.map((b) => b.line).join(', ')}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <View style={styles.searchResultItem}>
                      <Text style={[styles.noResultText, isDark && { color: '#94a3b8' }]}>Sonuç bulunamadı</Text>
                    </View>
                  )}
                </ScrollView>
              </View>
            )}
          </View>
        </View>
      )}

      {/* Normal Content - Hidden when map is expanded */}
      {!isMapExpanded && (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
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

            {/* Map Preview */}
            <View style={styles.mapPreview}>
            <MapView
              provider={PROVIDER_DEFAULT}
              style={StyleSheet.absoluteFill}
              region={mapRegion}
              showsUserLocation={true}
              onRegionChangeComplete={(region) => setMapRegion(region)}
              mapType="standard"
              showsMyLocationButton={false}
              showsCompass={false}
              toolbarEnabled={false}
            >
              {filteredStops.map((stop) => (
                <Marker
                  key={stop.id}
                  coordinate={{ latitude: stop.lat, longitude: stop.lng }}
                  title={stop.name}
                  description={nearestStop?.id === stop.id ? "En yakın durak" : "Durak"}
                  pinColor={nearestStop?.id === stop.id ? Colors.primary.indigo : "#ef4444"}
                  onPress={() => setNearestStop(stop)}
                />
              ))}
            </MapView>
            
            <View style={styles.mapOverlayRow}>
              {location && (
                <View style={styles.mapLocationPill}>
                  <MapPin color={Colors.primary.indigo} size={16} />
                  <Text style={styles.mapLocationText}>Konumunuz Alındı</Text>
                </View>
              )}
              {nearestStop && (
                <View style={styles.mapStopPill}>
                  <Text style={styles.mapStopLabel}>En yakın durak</Text>
                  <Text style={styles.mapStopValue}>{nearestStop.name}</Text>
                </View>
              )}
            </View>

            {/* Expand Button */}
            <TouchableOpacity 
              style={styles.expandButton}
              onPress={() => setIsMapExpanded(true)}
            >
              <Maximize2 color={Colors.darkGray} size={20} />
            </TouchableOpacity>
          </View>

          {/* Search */}
          <View style={{ zIndex: 10 }}>
            <View style={[styles.searchContainer, isDark && { backgroundColor: '#1e293b' }]}>
              <Search color={isDark ? '#94a3b8' : '#9ca3af'} size={20} />
              <TextInput
                placeholder="Hat no veya durak adı ara..."
                style={[styles.searchInput, isDark && { color: '#f8fafc' }]}
                placeholderTextColor={isDark ? '#64748b' : '#9ca3af'}
                value={searchQuery}
                onChangeText={(text) => {
                  setSearchQuery(text);
                  // Arama yapıldığında bölge filtresini kaldır ki tüm şehirde arasın
                  if (text.length > 0) {
                    setSelectedArea(null);
                  }
                }}
              />
            </View>

            {/* Search Results Dropdown */}
            {searchQuery.length > 0 && (
              <View style={styles.searchResultsList}>
                <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={true}>
                  {filteredStops.length > 0 ? (
                    filteredStops.map((stop) => (
                      <TouchableOpacity
                        key={stop.id}
                        style={styles.searchResultItem}
                        onPress={() => {
                          setNearestStop(stop);
                          setSearchQuery(''); // Seçim yapınca aramayı kapat
                          Keyboard.dismiss(); // Klavyeyi kapat
                          setMapRegion({
                            latitude: stop.lat,
                            longitude: stop.lng,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                          });
                        }}
                      >
                        <View style={styles.searchResultIcon}>
                          <MapPin size={16} color={Colors.primary.indigo} />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.searchResultTitle}>{stop.name}</Text>
                          <Text style={styles.searchResultLines} numberOfLines={1}>
                            Hatlar: {stop.buses.map((b) => b.line).join(', ')}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <View style={styles.searchResultItem}>
                      <Text style={styles.noResultText}>Sonuç bulunamadı</Text>
                    </View>
                  )}
                </ScrollView>
              </View>
            )}
          </View>

          {/* Area pills */}
          <View style={styles.areaPillsRow}>
            {['Tümü', 'Merkez', 'Osmanbey', 'Karaköprü', 'Eyyübiye', 'Balıklıgöl'].map((area) => (
              <TouchableOpacity
                key={area}
                style={[
                  styles.areaPill,
                  isDark && { backgroundColor: '#1e293b' },
                  (selectedArea === area || (area === 'Tümü' && selectedArea === null)) && (isDark ? { backgroundColor: '#059669' } : styles.areaPillActive),
                ]}
                onPress={() => setSelectedArea(area === 'Tümü' ? null : area)}
              >
                <Text
                  style={[
                    styles.areaPillText,
                    isDark && { color: '#94a3b8' },
                    (selectedArea === area || (area === 'Tümü' && selectedArea === null)) && (isDark ? { color: 'white' } : styles.areaPillTextActive),
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
            {favorites.length > 0 ? (
              favorites.map((favId) => {
                const stop = MOCK_STOPS.find((s) => s.id === favId);
                if (!stop) return null;
                return (
                  <TouchableOpacity
                    key={stop.id}
                    style={[styles.favoriteCard, isDark && { backgroundColor: '#1e293b' }]}
                    onPress={() => {
                      setNearestStop(stop);
                      setMapRegion({
                        latitude: stop.lat,
                        longitude: stop.lng,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                      });
                    }}
                  >
                    <View style={[styles.favoriteIconCircle, isDark && { backgroundColor: '#334155' }]}>
                      <MapPin color={Colors.primary.indigo} size={18} />
                    </View>
                    <Text style={[styles.favoriteName, isDark && { color: '#f8fafc' }]}>{stop.name}</Text>
                    <Text style={[styles.favoriteLines, isDark && { color: '#94a3b8' }]} numberOfLines={1}>
                      {stop.buses.map((b) => b.line).join(', ')}
                    </Text>
                    <TouchableOpacity
                      style={styles.favoriteStar}
                      onPress={() => toggleFavorite(stop.id)}
                    >
                      <Star color="#facc15" size={16} fill="#facc15" />
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              })
            ) : (
              <Text style={{ color: '#9ca3af', marginLeft: 4, fontStyle: 'italic' }}>
                Henüz favori durak eklemediniz.
              </Text>
            )}
          </ScrollView>

          {/* Upcoming buses */}
          <View style={[styles.sectionHeaderRow, { marginTop: 24 }]}>
            <Text style={styles.sectionTitle}>Yaklaşan Otobüsler</Text>
            {nearestStop && (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <TouchableOpacity
                  onPress={() => toggleFavorite(nearestStop.id)}
                  style={{ padding: 4 }}
                >
                  <Star
                    color={favorites.includes(nearestStop.id) ? '#facc15' : '#9ca3af'}
                    size={20}
                    fill={favorites.includes(nearestStop.id) ? '#facc15' : 'transparent'}
                  />
                </TouchableOpacity>
                <View style={styles.nearestPill}>
                  <Text style={styles.nearestPillText}>{nearestStop.name}</Text>
                </View>
              </View>
            )}
          </View>
          
          <View style={styles.infoRow}>
            <Info size={14} color="#6b7280" />
            <Text style={styles.infoText}>Varış süreleri tahminidir, bilgilendirme amaçlıdır.</Text>
          </View>

          <View style={styles.busList}>
            {upcomingBuses.map((bus, index) => (
              <View
                key={index}
                style={[
                  styles.busCard, 
                  { borderColor: bus.color || Colors.primary.indigo },
                  isDark && { backgroundColor: '#1e293b', borderColor: '#334155' } // Dark modda border rengini yumuşat
                ]}
              >
                <View style={styles.busLeft}>
                  <View
                    style={[
                      styles.busNumberBadge,
                      { borderColor: bus.color || Colors.primary.indigo },
                      isDark && { backgroundColor: '#0f172a', borderColor: bus.color || Colors.primary.indigo }
                    ]}
                  >
                    <Text
                      style={[
                        styles.busNumberText,
                        { color: bus.color || Colors.primary.indigo },
                      ]}
                    >
                      {bus.line}
                    </Text>
                  </View>
                  <View>
                    <Text style={[styles.busDestination, isDark && { color: '#f8fafc' }]}>{bus.route}</Text>
                    <Text style={[styles.busTariff, isDark && { color: '#94a3b8' }]}>Tarife: Normal</Text>
                  </View>
                </View>

                {/* <View style={styles.busRight}>
                  <Text style={styles.busTime}>{bus.estimatedArrival} dk</Text>
                </View> */}
              </View>
            ))}
            {upcomingBuses.length === 0 && (
               <Text style={{ textAlign: 'center', color: '#6b7280', marginTop: 20 }}>
                 Bu durak için yaklaşan otobüs bulunamadı.
               </Text>
            )}
          </View>
        </View>
      </ScrollView>
      )}
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
  mapPreview: {
    height: 180,
    borderRadius: 48, // Daha da oval (32 -> 48)
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: '#e5f2ff',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  mapExpanded: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    borderRadius: 0, // Full screen - no rounded corners
    marginBottom: 0,
    overflow: 'hidden',
  },
  expandButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  expandedSearchWrapper: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20, // Tam ekran harita için üstten boşluk
    left: 16,
    right: 16,
    zIndex: 10000,
  },
  expandedSearchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  expandedSearchContainer: {
    flex: 1, // Kalan alanı kapla
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 15,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  expandedMinimizeButton: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  expandedSearchResultsList: {
    marginTop: 8,
    marginRight: 62, // Minimize butonunun hizasına kadar
    backgroundColor: 'white',
    borderRadius: 16,
    maxHeight: 250,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  mapOverlayRow: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  mapLocationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.95)',
  },
  mapLocationText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#111827',
    fontWeight: '500',
  },
  mapStopPill: {
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: 'rgba(15,118,110,0.1)',
  },
  mapStopLabel: {
    fontSize: 10,
    color: '#0f766e',
  },
  mapStopValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0f766e',
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
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  searchResultsList: {
    position: 'absolute',
    top: 55,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 16,
    maxHeight: 250, // Yüksekliği sınırla
    overflow: 'hidden', // Taşmayı engelle
    zIndex: 1000,
    elevation: 10, // Android gölge
    shadowColor: '#000', // iOS gölge
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  searchResultIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#eef2ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  searchResultTitle: {
    fontWeight: '600',
    color: Colors.darkGray,
    fontSize: 14,
  },
  searchResultLines: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  noResultText: {
    color: '#6b7280',
    textAlign: 'center',
    padding: 8,
  },
});

export default TransportScreen;
