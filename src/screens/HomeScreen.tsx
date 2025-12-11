import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Calendar, BookOpen, MessageSquare, User, Megaphone, Palette, Bus, Users, Sun, Flame, QrCode } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';
import { MOCK_USER, MOCK_BUSES } from '@/api/mockData';
import { HomeScreenProps, MainTabParamList } from '@/types/navigation'; // MainTabParamList'i import ediyoruz

const HEADER_NAV = [
    { name: 'Başkan', icon: User, image: 'https://images.unsplash.com/photo-1560250056-07ba64664864?q=80&w=2574&auto=format&fit=crop' },
    { name: 'Duyurular', icon: Megaphone, image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2670&auto=format&fit=crop' },
    { name: 'Kültür Sanat', icon: Palette, image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=2670&auto=format&fit=crop' },
    { name: 'Ulaşım', icon: Bus, image: 'https://images.unsplash.com/photo-1570125909232-eb263c1869e7?q=80&w=2670&auto=format&fit=crop' },
    { name: 'Gençlik', icon: Users, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2670&auto=format&fit=crop' },
]

const QUICK_ACCESS_NAV = [
    { name: 'Etkinlik', icon: Calendar, color: '#fee2e2', iconColor: '#ef4444', screen: 'Events', type: 'stack' },
    { name: 'Keşfet', icon: BookOpen, color: '#dbeafe', iconColor: '#3b82f6', screen: 'Magazine', type: 'stack' },
    { name: 'Genç Kart', icon: QrCode, color: '#e0e7ff', iconColor: Colors.primary.indigo, screen: 'GencKart', type: 'tab' },
];

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenProps['navigation']>();
  const nextBus = MOCK_BUSES[0];

  const handleNavigation = (item: typeof QUICK_ACCESS_NAV[0]) => {
      if(item.type === 'tab') {
          // Tip güvenliği için ekran adını MainTabParamList'ten geldiğini belirtiyoruz
          navigation.navigate('Main', { screen: item.screen as keyof MainTabParamList });
      } else {
          navigation.navigate(item.screen as 'Events' | 'Magazine');
      }
  }

  return (
    <View style={styles.root}>
      {/* Sadece status bar alanı mor */}
      <SafeAreaView style={styles.statusBarArea} edges={['top']} />

      {/* İçerik kısmı eski haliyle açık gri */}
      <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
        <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[Colors.primary.violet, Colors.primary.indigo]}
          style={styles.header}
        >
          <View style={styles.headerTop}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>◎ ŞANLIURFA</Text>
            </View>
            <View style={styles.avatar}>
                <Text style={styles.avatarLetter}>M</Text>
            </View>
          </View>
          <Text style={styles.greeting}>Selam, Mert! 👋</Text>
          
          {/* Header Navigation */}
          <View style={styles.headerNavContainer}>
              {HEADER_NAV.map(item => (
                  <TouchableOpacity key={item.name} style={styles.headerNavItem}>
                      <LinearGradient
                        colors={[Colors.primary.indigo, Colors.primary.violet, Colors.accent.rose]}
                        style={styles.storyBorder}
                      >
                        <Image source={{ uri: item.image }} style={styles.headerNavImage} />
                      </LinearGradient>
                      <Text style={styles.headerNavText}>{item.name}</Text>
                  </TouchableOpacity>
              ))}
          </View>
        </LinearGradient>

        {/* Dashboard alanı */}
        <View style={styles.dashboardInner}>
          {/* Floating summary card: Genç Kart + Sıradaki Otobüs */}
          <View style={styles.statsCard}>
              <TouchableOpacity
                style={styles.statsLeft}
                activeOpacity={0.9}
                onPress={() =>
                  navigation.navigate('Main', { screen: 'GencKart' as keyof MainTabParamList })
                }
              >
                  <Text style={styles.statsTitle}>GENÇ KART</Text>
                  <Text style={styles.statsValue}>Göster & Geç</Text>
              </TouchableOpacity>
              <View style={styles.statsDivider} />
              <TouchableOpacity
                style={styles.statsRight}
                activeOpacity={0.9}
                onPress={() =>
                  navigation.navigate('Main', { screen: 'Transport' as keyof MainTabParamList })
                }
              >
                  <Text style={styles.statsTitle}>SIRADAKİ OTOBÜS</Text>
                  <Text style={styles.statsValue}>
                    {nextBus.lineNumber} • {nextBus.arrivalTime} dk
                  </Text>
              </TouchableOpacity>
          </View>

          <View style={styles.content}>
            {/* Quick Access */}
            <Text style={styles.sectionTitle}>HIZLI ERİŞİM</Text>
            <View style={styles.quickAccessContainer}>
                {QUICK_ACCESS_NAV.map(item => (
                    <TouchableOpacity 
                        key={item.name} 
                        style={styles.quickAccessItem}
                        onPress={() => handleNavigation(item)}
                    >
                        {/* Arka plan rengini View'dan alıp BlurView'e taşıyoruz ve alpha ekliyoruz */}
                        <View style={styles.quickAccessIcon}>
                            <BlurView intensity={90} tint="light" style={styles.blurView}>
                                <View style={[styles.colorOverlay, { backgroundColor: item.color, opacity: 0.6 }]} />
                                <item.icon color={item.iconColor} size={24} />
                            </BlurView>
                        </View>
                        <Text style={styles.quickAccessText}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            
            <View style={styles.widgetsContainer}>
                {/* Weather Widget */}
                <LinearGradient
                    colors={['#fbbf24', '#f59e0b']}
                    style={[styles.widgetCard, styles.weatherCard]}
                >
                    <View>
                        <Text style={styles.widgetLabel}>HAVA</Text>
                        <Text style={styles.weatherTemp}>14°</Text>
                        <Text style={styles.weatherDesc}>Parçalı Bulutlu</Text>
                    </View>
                    <Sun color={Colors.white} size={48} />
                </LinearGradient>

                {/* Quote of the day Widget */}
                <TouchableOpacity style={[styles.widgetCard, styles.quoteCard]}>
                    <Text style={[styles.widgetLabel, styles.widgetLabelQuote]}>GÜNÜN SÖZÜ</Text>
                    <Flame color={Colors.accent.rose} size={32} />
                    <Text style={styles.quoteText}>"Bugün Urfa'yı keşfet!"</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: Colors.primary.violet },
    statusBarArea: { backgroundColor: Colors.primary.violet },
    container: { flex: 1, backgroundColor: Colors.lightGray },
    dashboardInner: {
      paddingBottom: 24,
    },
    header: { borderBottomLeftRadius: 40, borderBottomRightRadius: 40, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 60 },
    headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    badge: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
    badgeText: { color: Colors.white, fontWeight: 'bold' },
    avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.accent.amber, justifyContent: 'center', alignItems: 'center' },
    avatarLetter: { color: Colors.white, fontSize: 20, fontWeight: 'bold' },
    greeting: { fontSize: 32, fontWeight: 'bold', color: Colors.white, marginTop: 10 },
    headerNavContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
    headerNavItem: { alignItems: 'center' },
    storyBorder: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerNavImage: { 
      width: 54, 
      height: 54, 
      borderRadius: 27, 
      borderWidth: 2, 
      borderColor: '#43389F' // A dark color from the gradient to blend well
    },
    headerNavText: { color: Colors.white, marginTop: 8, fontWeight: '600' },
    statsCard: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderRadius: 20,
        marginHorizontal: 20,
        marginTop: -50,
        height: 100,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 15,
        alignItems: 'center',
    },
    statsLeft: { flex: 1, alignItems: 'center' },
    statsRight: { flex: 1, alignItems: 'center' },
    statsDivider: { width: 1, backgroundColor: '#e5e7eb', height: '60%' },
    statsTitle: { color: '#9ca3af', fontWeight: '600', fontSize: 12 },
    statsValue: { fontSize: 16, fontWeight: 'bold', color: Colors.darkGray },
    content: { paddingVertical: 20 },
    sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#9ca3af', paddingHorizontal: 20, marginBottom: 15 },
    quickAccessContainer: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 20 },
    quickAccessItem: { alignItems: 'center', flex: 1 },
    quickAccessIcon: { 
        width: 60, 
        height: 60, 
        borderRadius: 20, 
        overflow: 'hidden', // Important for BlurView's corners
        borderWidth: 1, // Hafif bir kenarlık ekleyelim
        borderColor: 'rgba(255, 255, 255, 0.5)', // Kenarlık rengi
    },
    blurView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    colorOverlay: {
        ...StyleSheet.absoluteFillObject, // BlurView'ın tamamını kapla
    },
    quickAccessText: { marginTop: 8, fontWeight: '600', color: Colors.darkGray },
    widgetsContainer: { flexDirection: 'row', paddingHorizontal: 20, marginTop: 20, justifyContent: 'space-between' },
    widgetCard: { borderRadius: 20, padding: 15, width: '48%', height: 150 },
    widgetLabel: { color: 'rgba(255,255,255,0.8)', fontWeight: '600', marginBottom: 10 },
    weatherCard: { justifyContent: 'space-between', flexDirection: 'row' },
    weatherTemp: { color: Colors.white, fontSize: 36, fontWeight: 'bold' },
    weatherDesc: { color: Colors.white, fontWeight: '600' },
    quoteCard: { 
      backgroundColor: '#c7d2fe', // daha koyu mor ton
      borderRadius: 20,
    },
    widgetLabelQuote: { color: Colors.primary.indigo },
    quoteText: { marginTop: 10, fontSize: 16, fontWeight: '600', color: '#111827' },
});

export default HomeScreen;
