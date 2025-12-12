import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  PanResponder,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Calendar, BookOpen, MessageSquare, User, Megaphone, Palette, Bus, Users, CloudRain, Flame, QrCode } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';
import { MOCK_USER, MOCK_BUSES, MOCK_PARTNERS } from '@/api/mockData';
import { HomeScreenProps, MainTabParamList } from '@/types/navigation'; // MainTabParamList'i import ediyoruz
import { useThemeMode } from '@/context/ThemeContext';

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

const QUOTES_OF_DAY = [
  'Bugün Urfa\'yı keşfet!',
  'Küçük bir adım, büyük bir değişimin başlangıcı olabilir.',
  'Şehrini ne kadar tanırsan, o kadar çok seversin.',
  'Bir etkinlik, bir arkadaşlık, bir anı demek.',
  'Gençken gez, gör, dene; sonrası kendiliğinden gelir.',
];

const STORY_DETAILS: Record<string, { description: string }> = {
  Başkan: {
    description: 'Başkanın gençlere özel mesajlarını ve projelerini keşfet.',
  },
  Duyurular: {
    description: 'Şanlıurfa’da gençleri ilgilendiren en güncel haber ve duyurular.',
  },
  'Kültür Sanat': {
    description: 'Konserler, sergiler, tiyatrolar ve çok daha fazlası burada.',
  },
  Ulaşım: {
    description: 'Otobüs hatları, seferler ve kampüs ulaşımı hakkında hızlı bilgiler.',
  },
  Gençlik: {
    description: 'Gençlik merkezleri, kulüpler ve etkinliklerden haberdar ol.',
  },
};

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenProps['navigation']>();
  const nextBus = MOCK_BUSES[0];
  const quoteOfDay = QUOTES_OF_DAY[new Date().getDate() % QUOTES_OF_DAY.length];
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [storyProgress, setStoryProgress] = useState(0); // 0 - 1
  const rainAnim = useRef(new Animated.Value(0)).current;

  const activeStory =
    activeStoryIndex !== null ? HEADER_NAV[activeStoryIndex] : null;

  const handleNavigation = (item: typeof QUICK_ACCESS_NAV[0]) => {
      if(item.type === 'tab') {
          // Tip güvenliği için ekran adını MainTabParamList'ten geldiğini belirtiyoruz
          navigation.navigate('Main', { screen: item.screen as keyof MainTabParamList });
      } else {
          navigation.navigate(item.screen as 'Events' | 'Magazine');
      }
  }

  const handleNextStory = () => {
    if (activeStoryIndex === null) return;
    const nextIndex = activeStoryIndex + 1;
    if (nextIndex < HEADER_NAV.length) {
      setActiveStoryIndex(nextIndex);
    } else {
      setActiveStoryIndex(null);
    }
  };

  const handleStoryDetail = () => {
    if (activeStoryIndex === null) return;
    const story = HEADER_NAV[activeStoryIndex];

    switch (story.name) {
      case 'Ulaşım':
        navigation.navigate('Main', { screen: 'Transport' as keyof MainTabParamList });
        break;
      case 'Kültür Sanat':
        navigation.navigate('Magazine');
        break;
      case 'Gençlik':
      case 'Duyurular':
        navigation.navigate('Events');
        break;
      default:
        navigation.navigate('Profile');
        break;
    }

    setActiveStoryIndex(null);
  };

  // 5 saniyelik otomatik geçiş için zamanlayıcı
  useEffect(() => {
    if (activeStoryIndex === null) {
      setStoryProgress(0);
      return;
    }

    setStoryProgress(0);
    const totalDuration = 5000; // 5 sn
    const intervalMs = 50;

    const startedAt = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const ratio = Math.min(1, elapsed / totalDuration);
      setStoryProgress(ratio);
      if (ratio >= 1) {
        clearInterval(timer);
        handleNextStory();
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [activeStoryIndex]);

  // Hava durumu için yağmur animasyonu
  useEffect(() => {
    Animated.loop(
      Animated.timing(rainAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();
  }, [rainAnim]);

  const rainTranslate = rainAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 8],
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > 10,
      onPanResponderRelease: (_, gestureState) => {
        const { dy } = gestureState;
        if (dy < -40) {
          // Yukarı kaydır: detay sayfasına git
          handleStoryDetail();
        } else if (dy > 40) {
          // Aşağı kaydır: kapat
          setActiveStoryIndex(null);
        } else {
          // Hafif dokunuş: sonraki story
          handleNextStory();
        }
      },
    })
  ).current;

  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  return (
    <View style={[styles.root, isDark && { backgroundColor: Colors.black }]}>
      {/* Sadece status bar alanı */}
      <SafeAreaView
        style={[styles.statusBarArea, isDark && { backgroundColor: Colors.black }]}
        edges={['top']}
      />

      {/* İçerik kısmı */}
      <SafeAreaView
        style={[styles.container, isDark && { backgroundColor: '#020617' }]}
        edges={['left', 'right', 'bottom']}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
        {/* Header */}
        <LinearGradient
          colors={
            isDark
              ? ['#020617', '#1f2937']
              : [Colors.primary.violet, Colors.primary.indigo]
          }
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
          <Text style={styles.greetingSub}>Bugün nasıl gidiyor?</Text>

          {/* Header Navigation */}
          <View style={styles.headerNavContainer}>
              {HEADER_NAV.map((item, index) => (
                  <TouchableOpacity
                    key={item.name}
                    style={styles.headerNavItem}
                    activeOpacity={0.9}
                    onPress={() => setActiveStoryIndex(index)}
                  >
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
                    </View>
                    <View style={styles.weatherIconWrapper}>
                      <Animated.View style={{ transform: [{ translateY: rainTranslate }] }}>
                        <CloudRain color={Colors.white} size={26} />
                      </Animated.View>
                    </View>
                </LinearGradient>

                {/* Quote of the day Widget */}
                <TouchableOpacity style={[styles.widgetCard, styles.quoteCard]}>
                    <View style={styles.quoteHeaderRow}>
                      <Text style={[styles.widgetLabel, styles.widgetLabelQuote]}>GÜNÜN SÖZÜ</Text>
                      <Flame color={Colors.accent.rose} size={20} />
                    </View>
                    <Text style={styles.quoteText} numberOfLines={2}>
                      "{quoteOfDay}"
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Discount Partners Carousel */}
            <Text style={[styles.sectionTitle, { marginTop: 28 }]}>Genç Kart indirimleri</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.partnersScrollContent}
            >
              {MOCK_PARTNERS.map(partner => {
                const Icon = partner.icon;
                return (
                  <TouchableOpacity
                    key={partner.id}
                    style={[styles.partnerCard, { backgroundColor: partner.bgColor }]}
                    activeOpacity={0.9}
                    onPress={() => navigation.navigate('PartnerDetail', { partnerId: partner.id })}
                  >
                    <View style={styles.partnerIconWrapper}>
                      <Icon color={partner.iconColor} size={22} />
                    </View>
                    <Text style={styles.partnerName} numberOfLines={1}>
                      {partner.name}
                    </Text>
                    <Text style={styles.partnerOffer}>{partner.offer}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>

        {/* Story Modal */}
        <Modal
          visible={activeStoryIndex !== null}
          animationType="fade"
          transparent
          onRequestClose={() => setActiveStoryIndex(null)}
        >
          <View style={styles.storyModalBackdrop}>
            {activeStory && (
              <View style={styles.storyModalCard} {...panResponder.panHandlers}>
                {/* Progress bar */}
                <View style={styles.storyProgressBarBackground}>
                  <View
                    style={[
                      styles.storyProgressBarFill,
                      { width: `${storyProgress * 100}%` },
                    ]}
                  />
                </View>

                <Image source={{ uri: activeStory.image }} style={styles.storyImage} />
                <View style={styles.storyTextOverlay}>
                  <Text style={styles.storyTitle}>{activeStory.name}</Text>
                  {STORY_DETAILS[activeStory.name]?.description ? (
                    <Text style={styles.storyDescription}>
                      {STORY_DETAILS[activeStory.name].description}
                    </Text>
                  ) : null}

                  <View style={styles.storyCtaRow}>
                    <Text style={styles.storyHintText}>Yukarı kaydır → Detay</Text>
                    <TouchableOpacity
                      style={styles.storyCtaButton}
                      activeOpacity={0.9}
                      onPress={handleStoryDetail}
                    >
                      <Text style={styles.storyCtaText}>
                        {activeStory.name === 'Kültür Sanat' || activeStory.name === 'Gençlik'
                          ? 'Etkinliklere Git'
                          : activeStory.name === 'Ulaşım'
                          ? 'Ulaşım Ekranına Git'
                          : 'Detaya Git'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </View>
        </Modal>

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
    greetingSub: { fontSize: 16, color: 'rgba(255,255,255,0.85)', marginTop: 4 },
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
    partnersScrollContent: {
      paddingHorizontal: 20,
      paddingVertical: 4,
    },
    partnerCard: {
      width: 170,
      borderRadius: 20,
      paddingHorizontal: 14,
      paddingVertical: 14,
      marginRight: 12,
      justifyContent: 'space-between',
    },
    partnerIconWrapper: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: 'rgba(255,255,255,0.9)',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    partnerName: {
      fontSize: 14,
      fontWeight: '600',
      color: Colors.darkGray,
      marginBottom: 4,
    },
    partnerOffer: {
      fontSize: 13,
      fontWeight: '500',
      color: '#4b5563',
    },
    widgetsContainer: { flexDirection: 'row', paddingHorizontal: 20, marginTop: 12, justifyContent: 'space-between' },
    widgetCard: { borderRadius: 18, paddingHorizontal: 10, paddingVertical: 8, width: '48%', height: 70 },
    widgetLabel: { color: 'rgba(255,255,255,0.9)', fontWeight: '600', marginBottom: 4, fontSize: 10 },
    weatherCard: { justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' },
    weatherTemp: { color: Colors.white, fontSize: 24, fontWeight: 'bold' },
  weatherIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
    quoteCard: { 
      backgroundColor: '#c7d2fe', // daha koyu mor ton
      borderRadius: 18,
      paddingHorizontal: 10,
      paddingVertical: 8,
      justifyContent: 'flex-start',
    },
    quoteHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    widgetLabelQuote: { color: Colors.primary.indigo },
    quoteText: { marginTop: 4, fontSize: 11, lineHeight: 15, fontWeight: '600', color: '#111827' },
    storyModalBackdrop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.6)',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
    },
    storyModalCard: {
      width: '100%',
      maxWidth: 420,
      aspectRatio: 9 / 16,
      borderRadius: 26,
      overflow: 'hidden',
      backgroundColor: Colors.black,
    },
    storyProgressBarBackground: {
      position: 'absolute',
      top: 10,
      left: 12,
      right: 12,
      height: 3,
      borderRadius: 999,
      backgroundColor: 'rgba(148,163,184,0.6)',
      overflow: 'hidden',
      zIndex: 2,
    },
    storyProgressBarFill: {
      height: '100%',
      backgroundColor: Colors.white,
      borderRadius: 999,
    },
    storyImage: {
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
    storyTextOverlay: {
      position: 'absolute',
      left: 16,
      right: 16,
      bottom: 20,
    },
    storyTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: Colors.white,
      marginBottom: 4,
    },
    storyDescription: {
      fontSize: 14,
      color: 'rgba(249,250,251,0.9)',
    },
    storyCtaRow: {
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    storyHintText: {
      fontSize: 11,
      color: 'rgba(209,213,219,0.9)',
    },
    storyCtaButton: {
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: 999,
      backgroundColor: 'rgba(79,70,229,0.9)',
    },
    storyCtaText: {
      fontSize: 12,
      fontWeight: '600',
      color: Colors.white,
    },
});

export default HomeScreen;
