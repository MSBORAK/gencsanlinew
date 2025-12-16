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
import { 
  Calendar, BookOpen, User, Megaphone, Palette, Bus, Users, 
  Flame, QrCode, X, ChevronLeft, ChevronRight,
  CloudRain, Sun, Cloud, CloudSnow, CloudLightning, CloudDrizzle 
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';
import { MOCK_BUSES, MOCK_PARTNERS } from '@/api/mockData';
import { HomeScreenProps, MainTabParamList } from '@/types/navigation';
import { useThemeMode } from '@/context/ThemeContext';
import MustafaImage from '../assets/images/mustafa.jpg';

const HEADER_NAV = [
    { name: 'Başkan', icon: User, image: MustafaImage },
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
  Başkan: { description: 'Başkanın gençlere özel mesajlarını ve projelerini keşfet.' },
  Duyurular: { description: 'Şanlıurfa’da gençleri ilgilendiren en güncel haber ve duyurular.' },
  'Kültür Sanat': { description: 'Konserler, sergiler, tiyatrolar ve çok daha fazlası burada.' },
  Ulaşım: { description: 'Otobüs hatları, seferler ve kampüs ulaşımı hakkında hızlı bilgiler.' },
  Gençlik: { description: 'Gençlik merkezleri, kulüpler ve etkinliklerden haberdar ol.' },
};

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenProps['navigation']>();
  const nextBus = MOCK_BUSES[0];
  const quoteOfDay = QUOTES_OF_DAY[new Date().getDate() % QUOTES_OF_DAY.length];
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [storyProgress, setStoryProgress] = useState(0); 
  const rainAnim = useRef(new Animated.Value(0)).current;
  
  // Takvim Modal State
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [calendarView, setCalendarView] = useState<'month' | 'year'>('month');
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
  const DAYS = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    let startDay = firstDay.getDay() - 1;
    if (startDay < 0) startDay = 6;
    
    const days: (number | null)[] = [];
    for (let i = 0; i < startDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  };
  
  const changeMonth = (delta: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setSelectedDate(newDate);
  };
  
  const changeYear = (delta: number) => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(newDate.getFullYear() + delta);
    setSelectedDate(newDate);
  };

  // --- HAVA DURUMU KISMI ---
  const [weatherData, setWeatherData] = useState<any>(null);
  const API_KEY = "86c0bfac95367500f94f82e107ad2332"; 
  const SEHIR_KOORDINAT = { lat: 37.1674, lon: 38.7955 };

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${SEHIR_KOORDINAT.lat}&lon=${SEHIR_KOORDINAT.lon}&units=metric&lang=tr&appid=${API_KEY}`
      );
      const data = await response.json();
      if (data.cod !== 200) {
          console.log("Hava durumu API hatası:", data.message);
      } else {
          setWeatherData(data);
      }
    } catch (error) {
      console.log("Hava durumu hatası:", error);
    }
  };

  const getWeatherIcon = (size = 26, color = Colors.white) => {
    if (!weatherData) return <Cloud color={color} size={size} />;
    const conditionId = weatherData.weather[0].id;
    if (conditionId === 800) return <Sun color={color} size={size} />;
    if (conditionId >= 200 && conditionId < 300) return <CloudLightning color={color} size={size} />;
    if (conditionId >= 300 && conditionId < 500) return <CloudDrizzle color={color} size={size} />;
    if (conditionId >= 500 && conditionId < 600) return <CloudRain color={color} size={size} />;
    if (conditionId >= 600 && conditionId < 700) return <CloudSnow color={color} size={size} />;
    if (conditionId >= 700 && conditionId < 800) return <Cloud color={color} size={size} />;
    return <Cloud color={color} size={size} />;
  };

  const handleWeatherDetail = () => {
    if (weatherData) {
      navigation.navigate('WeatherDetail', { weatherData });
    } else {
      navigation.navigate('WeatherDetail');
    }
  };

  const activeStory = activeStoryIndex !== null ? HEADER_NAV[activeStoryIndex] : null;

  const handleNavigation = (item: typeof QUICK_ACCESS_NAV[0]) => {
      if(item.type === 'tab') {
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
      case 'Ulaşım': navigation.navigate('Main', { screen: 'Transport' as keyof MainTabParamList }); break;
      case 'Kültür Sanat': navigation.navigate('Magazine'); break;
      case 'Gençlik':
      case 'Duyurular': navigation.navigate('Events'); break;
      default: navigation.navigate('Profile'); break;
    }
    setActiveStoryIndex(null);
  };

  useEffect(() => {
    if (activeStoryIndex === null) {
      setStoryProgress(0);
      return;
    }
    setStoryProgress(0);
    const totalDuration = 5000;
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
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 10,
      onPanResponderRelease: (_, gestureState) => {
        const { dy } = gestureState;
        if (dy < -40) handleStoryDetail();
        else if (dy > 40) setActiveStoryIndex(null);
        else handleNextStory();
      },
    })
  ).current;

  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  return (
    <View style={[styles.root, isDark && { backgroundColor: Colors.black }]}>
      <SafeAreaView style={[styles.statusBarArea, isDark && { backgroundColor: Colors.black }]} edges={['top']} />
      <SafeAreaView style={[styles.container, isDark && { backgroundColor: '#020617' }]} edges={['left', 'right', 'bottom']}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Header */}
        <LinearGradient
          colors={isDark ? ['#020617', '#1f2937'] : [Colors.primary.violet, Colors.primary.indigo]}
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
                        <Image source={typeof item.image === 'string' ? { uri: item.image } : item.image} style={styles.headerNavImage} />
                      </LinearGradient>
                      <Text style={styles.headerNavText}>{item.name}</Text>
                  </TouchableOpacity>
              ))}
          </View>
        </LinearGradient>

        {/* Dashboard */}
        <View style={styles.dashboardInner}>
          <LinearGradient
            colors={isDark ? ['#1e293b', '#334155'] : [Colors.primary.indigo, Colors.primary.violet]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.statsCard}
          >
              {/* Hava Durumu */}
              <TouchableOpacity
                style={styles.statsSection}
                activeOpacity={0.9}
                onPress={handleWeatherDetail}
              >
                  <Text style={styles.statsTitleWhite}>HAVA DURUMU</Text>
                  <View style={styles.weatherStatsRow}>
                    {getWeatherIcon(22, '#fbbf24')}
                    <Text style={[styles.statsValueWhite, { marginLeft: 6 }]}>
                      {weatherData ? `${Math.round(weatherData.main.temp)}°` : '--'}
                    </Text>
                  </View>
              </TouchableOpacity>
              
              <View style={styles.statsDividerWhite} />
              
              {/* Takvim */}
              <TouchableOpacity
                style={styles.statsSection}
                activeOpacity={0.9}
                onPress={() => setCalendarVisible(true)}
              >
                  <Text style={styles.statsTitleWhite}>TAKVİM</Text>
                  <View style={styles.calendarStatsRow}>
                    <Calendar color="#818cf8" size={22} />
                    <Text style={[styles.statsValueWhite, { marginLeft: 6 }]}>
                      {new Date().getDate()} {['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'][new Date().getMonth()]}
                    </Text>
                  </View>
              </TouchableOpacity>
          </LinearGradient>

          <View style={styles.content}>
            <Text style={[styles.sectionTitle, isDark && { color: '#94a3b8' }]}>HIZLI ERİŞİM</Text>
            <View style={styles.quickAccessContainer}>
                {QUICK_ACCESS_NAV.map(item => (
                    <TouchableOpacity key={item.name} style={styles.quickAccessItem} onPress={() => handleNavigation(item)}>
                        <View style={styles.quickAccessIcon}>
                            <BlurView intensity={90} tint="light" style={styles.blurView}>
                                <View style={[styles.colorOverlay, { backgroundColor: item.color, opacity: 0.6 }, isDark && { backgroundColor: '#334155', opacity: 0.8 }]} />
                                <item.icon color={isDark ? '#e2e8f0' : item.iconColor} size={24} />
                            </BlurView>
                        </View>
                        <Text style={[styles.quickAccessText, isDark && { color: '#f8fafc' }]}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.widgetsContainer}>
                {/* Quote of the day Widget - Full Width */}
                <TouchableOpacity style={[styles.widgetCard, styles.quoteCard, { width: '100%' }, isDark && { backgroundColor: '#312e81' }]}>
                    <View style={styles.quoteHeaderRow}>
                      <Text style={[styles.widgetLabel, styles.widgetLabelQuote, isDark && { color: '#a5b4fc' }]}>GÜNÜN SÖZÜ</Text>
                      <Flame color={isDark ? '#fb7185' : Colors.accent.rose} size={20} />
                    </View>
                    <Text style={[styles.quoteText, isDark && { color: '#e0e7ff' }]} numberOfLines={2}>"{quoteOfDay}"</Text>
                </TouchableOpacity>
            </View>

            <Text style={[styles.sectionTitle, { marginTop: 28 }, isDark && { color: '#94a3b8' }]}>Genç Kart indirimleri</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.partnersScrollContent}>
              {MOCK_PARTNERS.map(partner => {
                const Icon = partner.icon;
                return (
                  <TouchableOpacity
                    key={partner.id}
                    style={[styles.partnerCard, { backgroundColor: partner.bgColor }, isDark && { backgroundColor: '#1e293b', borderWidth: 1, borderColor: '#334155' }]}
                    activeOpacity={0.9}
                    onPress={() => navigation.navigate('PartnerDetail', { partnerId: partner.id })}
                  >
                    <View style={[styles.partnerIconWrapper, isDark && { backgroundColor: '#334155' }]}><Icon color={isDark ? '#e2e8f0' : partner.iconColor} size={22} /></View>
                    <Text style={[styles.partnerName, isDark && { color: '#f8fafc' }]} numberOfLines={1}>{partner.name}</Text>
                    <Text style={[styles.partnerOffer, isDark && { color: '#cbd5e1' }]}>{partner.offer}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>

        {/* Story Modal */}
        <Modal visible={activeStoryIndex !== null} animationType="fade" transparent onRequestClose={() => setActiveStoryIndex(null)}>
          <View style={styles.storyModalBackdrop}>
            {activeStory && (
              <View style={styles.storyModalCard} {...panResponder.panHandlers}>
                <View style={styles.storyProgressBarBackground}>
                  <View style={[styles.storyProgressBarFill, { width: `${storyProgress * 100}%` }]} />
                </View>
                <TouchableOpacity style={StyleSheet.absoluteFill} onPress={handleNextStory} activeOpacity={1}>
                  <Image source={typeof activeStory.image === 'string' ? { uri: activeStory.image } : activeStory.image} style={styles.storyImage} />
                </TouchableOpacity>
                <View style={styles.storyTextOverlay}>
                  <Text style={styles.storyTitle}>{activeStory.name}</Text>
                  {STORY_DETAILS[activeStory.name]?.description && <Text style={styles.storyDescription}>{STORY_DETAILS[activeStory.name].description}</Text>}
                  <View style={styles.storyCtaRow}>
                    <Text style={styles.storyHintText}>Yukarı kaydır → Detay</Text>
                    <TouchableOpacity style={styles.storyCtaButton} activeOpacity={0.9} onPress={handleStoryDetail}>
                      <Text style={styles.storyCtaText}>
                        {activeStory.name === 'Kültür Sanat' || activeStory.name === 'Gençlik' ? 'Etkinliklere Git' : activeStory.name === 'Ulaşım' ? 'Ulaşım Ekranına Git' : 'Detaya Git'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </View>
        </Modal>

        {/* Calendar Modal */}
        <Modal visible={calendarVisible} animationType="slide" transparent onRequestClose={() => setCalendarVisible(false)}>
          <View style={styles.calendarModalBackdrop}>
            <View style={[styles.calendarModalCard, isDark && { backgroundColor: '#1e293b' }]}>
              {/* Header */}
              <View style={styles.calendarHeader}>
                <Text style={[styles.calendarTitle, isDark && { color: '#f8fafc' }]}>
                  {calendarView === 'month' ? 'Aylık Takvim' : 'Yıllık Takvim'}
                </Text>
                <TouchableOpacity onPress={() => setCalendarVisible(false)} style={styles.calendarCloseBtn}>
                  <X color={isDark ? '#94a3b8' : '#6b7280'} size={24} />
                </TouchableOpacity>
              </View>

              {/* View Toggle */}
              <View style={[styles.calendarToggle, isDark && { backgroundColor: '#0f172a' }]}>
                <TouchableOpacity
                  style={[styles.calendarToggleBtn, calendarView === 'month' && styles.calendarToggleBtnActive]}
                  onPress={() => setCalendarView('month')}
                >
                  <Text style={[styles.calendarToggleText, calendarView === 'month' && styles.calendarToggleTextActive, isDark && calendarView !== 'month' && { color: '#94a3b8' }]}>Aylık</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.calendarToggleBtn, calendarView === 'year' && styles.calendarToggleBtnActive]}
                  onPress={() => setCalendarView('year')}
                >
                  <Text style={[styles.calendarToggleText, calendarView === 'year' && styles.calendarToggleTextActive, isDark && calendarView !== 'year' && { color: '#94a3b8' }]}>Yıllık</Text>
                </TouchableOpacity>
              </View>

              {/* Month View */}
              {calendarView === 'month' && (
                <View style={styles.calendarContent}>
                  <View style={styles.calendarNavRow}>
                    <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.calendarNavBtn}>
                      <ChevronLeft color={isDark ? '#94a3b8' : '#6b7280'} size={24} />
                    </TouchableOpacity>
                    <Text style={[styles.calendarMonthText, isDark && { color: '#f8fafc' }]}>
                      {MONTHS[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                    </Text>
                    <TouchableOpacity onPress={() => changeMonth(1)} style={styles.calendarNavBtn}>
                      <ChevronRight color={isDark ? '#94a3b8' : '#6b7280'} size={24} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.calendarDaysHeader}>
                    {DAYS.map((day) => (
                      <Text key={day} style={[styles.calendarDayName, isDark && { color: '#94a3b8' }]}>{day}</Text>
                    ))}
                  </View>

                  <View style={styles.calendarGrid}>
                    {getDaysInMonth(selectedDate).map((day, index) => {
                      const isToday = day === new Date().getDate() && 
                        selectedDate.getMonth() === new Date().getMonth() && 
                        selectedDate.getFullYear() === new Date().getFullYear();
                      return (
                        <View key={index} style={styles.calendarDayCell}>
                          {day && (
                            <View style={[styles.calendarDay, isToday && styles.calendarDayToday]}>
                              <Text style={[styles.calendarDayText, isToday && styles.calendarDayTextToday, isDark && !isToday && { color: '#f8fafc' }]}>
                                {day}
                              </Text>
                            </View>
                          )}
                        </View>
                      );
                    })}
                  </View>
                </View>
              )}

              {/* Year View */}
              {calendarView === 'year' && (
                <View style={styles.calendarContent}>
                  <View style={styles.calendarNavRow}>
                    <TouchableOpacity onPress={() => changeYear(-1)} style={styles.calendarNavBtn}>
                      <ChevronLeft color={isDark ? '#94a3b8' : '#6b7280'} size={24} />
                    </TouchableOpacity>
                    <Text style={[styles.calendarYearText, isDark && { color: '#f8fafc' }]}>
                      {selectedDate.getFullYear()}
                    </Text>
                    <TouchableOpacity onPress={() => changeYear(1)} style={styles.calendarNavBtn}>
                      <ChevronRight color={isDark ? '#94a3b8' : '#6b7280'} size={24} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.calendarMonthsGrid}>
                    {MONTHS.map((month, index) => {
                      const isCurrentMonth = index === new Date().getMonth() && selectedDate.getFullYear() === new Date().getFullYear();
                      return (
                        <TouchableOpacity
                          key={month}
                          style={[
                            styles.calendarMonthCell, 
                            isCurrentMonth && styles.calendarMonthCellActive,
                            isDark && !isCurrentMonth && { backgroundColor: '#334155' }
                          ]}
                          onPress={() => {
                            const newDate = new Date(selectedDate);
                            newDate.setMonth(index);
                            setSelectedDate(newDate);
                            setCalendarView('month');
                          }}
                        >
                          <Text style={[
                            styles.calendarMonthName, 
                            isCurrentMonth && styles.calendarMonthNameActive, 
                            isDark && !isCurrentMonth && { color: '#f8fafc' }
                          ]}>
                            {month.slice(0, 3)}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              )}

              {/* Go to Events Button */}
              <TouchableOpacity
                style={styles.calendarEventsBtn}
                onPress={() => {
                  setCalendarVisible(false);
                  navigation.navigate('Events');
                }}
              >
                <Text style={styles.calendarEventsBtnText}>Etkinliklere Git</Text>
              </TouchableOpacity>
            </View>
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
    dashboardInner: { paddingBottom: 24 },
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
    storyBorder: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center' },
    headerNavImage: { width: 54, height: 54, borderRadius: 27, borderWidth: 2, borderColor: '#43389F' },
    headerNavText: { color: Colors.white, marginTop: 8, fontWeight: '600' },
    statsCard: { flexDirection: 'row', borderRadius: 20, marginHorizontal: 20, marginTop: -50, height: 100, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 15, alignItems: 'center', overflow: 'hidden' },
    statsSection: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    statsLeft: { flex: 1, alignItems: 'center' },
    statsRight: { flex: 1, alignItems: 'center' },
    statsDivider: { width: 1, backgroundColor: '#e5e7eb', height: '60%' },
    statsDividerWhite: { width: 1, backgroundColor: 'rgba(255,255,255,0.3)', height: '60%' },
    statsTitle: { color: '#9ca3af', fontWeight: '600', fontSize: 10, marginBottom: 4 },
    statsTitleWhite: { color: 'rgba(255,255,255,0.9)', fontWeight: '700', fontSize: 12, marginBottom: 4 },
    statsValue: { fontSize: 14, fontWeight: 'bold', color: Colors.darkGray },
    statsValueWhite: { fontSize: 18, fontWeight: 'bold', color: Colors.white },
    weatherStatsRow: { flexDirection: 'row', alignItems: 'center' },
    calendarStatsRow: { flexDirection: 'row', alignItems: 'center' },
    content: { paddingVertical: 20 },
    sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#9ca3af', paddingHorizontal: 20, marginBottom: 15 },
    quickAccessContainer: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 20 },
    quickAccessItem: { alignItems: 'center', flex: 1 },
    quickAccessIcon: { width: 60, height: 60, borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.5)' },
    blurView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    colorOverlay: { ...StyleSheet.absoluteFillObject },
    quickAccessText: { marginTop: 8, fontWeight: '600', color: Colors.darkGray },
    partnersScrollContent: { paddingHorizontal: 20, paddingVertical: 4 },
    partnerCard: { width: 170, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 14, marginRight: 12, justifyContent: 'space-between' },
    partnerIconWrapper: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.9)', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
    partnerName: { fontSize: 14, fontWeight: '600', color: Colors.darkGray, marginBottom: 4 },
    partnerOffer: { fontSize: 13, fontWeight: '500', color: '#4b5563' },
    widgetsContainer: { flexDirection: 'row', paddingHorizontal: 20, marginTop: 12, justifyContent: 'space-between' },
    // widgetCard styles (General shape)
    widgetCard: { borderRadius: 18, paddingHorizontal: 10, paddingVertical: 8, width: '48%', height: 70 },
    widgetLabel: { color: 'rgba(255,255,255,0.9)', fontWeight: '600', marginBottom: 4, fontSize: 10 },
    // Weather card internals (Layout)
    weatherCard: { justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' },
    weatherTemp: { color: Colors.white, fontSize: 24, fontWeight: 'bold' },
    weatherIconWrapper: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
    quoteCard: { backgroundColor: '#c7d2fe', borderRadius: 18, paddingHorizontal: 10, paddingVertical: 8, justifyContent: 'flex-start' },
    quoteHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    widgetLabelQuote: { color: Colors.primary.indigo },
    quoteText: { marginTop: 4, fontSize: 11, lineHeight: 15, fontWeight: '600', color: '#111827' },
    storyModalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
    storyModalCard: { width: '100%', maxWidth: 420, aspectRatio: 9 / 16, borderRadius: 26, overflow: 'hidden', backgroundColor: Colors.black },
    storyProgressBarBackground: { position: 'absolute', top: 10, left: 12, right: 12, height: 3, borderRadius: 999, backgroundColor: 'rgba(148,163,184,0.6)', overflow: 'hidden', zIndex: 2 },
    storyProgressBarFill: { height: '100%', backgroundColor: Colors.white, borderRadius: 999 },
    storyImage: { width: '100%', height: '100%', position: 'absolute' },
    storyTextOverlay: { position: 'absolute', left: 16, right: 16, bottom: 20 },
    storyTitle: { fontSize: 18, fontWeight: '700', color: Colors.white, marginBottom: 4 },
    storyDescription: { fontSize: 14, color: 'rgba(249,250,251,0.9)' },
    storyCtaRow: { marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    storyHintText: { fontSize: 11, color: 'rgba(209,213,219,0.9)' },
    storyCtaButton: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 999, backgroundColor: 'rgba(79,70,229,0.9)' },
    storyCtaText: { fontSize: 12, fontWeight: '600', color: Colors.white },
    // Calendar Modal Styles
    calendarModalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    calendarModalCard: { backgroundColor: Colors.white, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20, paddingBottom: 40 },
    calendarHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    calendarTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.darkGray },
    calendarCloseBtn: { padding: 8 },
    calendarToggle: { flexDirection: 'row', backgroundColor: '#f3f4f6', borderRadius: 12, padding: 4, marginBottom: 20 },
    calendarToggleBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
    calendarToggleBtnActive: { backgroundColor: Colors.primary.indigo },
    calendarToggleText: { fontWeight: '600', color: '#6b7280' },
    calendarToggleTextActive: { color: Colors.white },
    calendarContent: { marginBottom: 20 },
    calendarNavRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    calendarNavBtn: { padding: 8 },
    calendarMonthText: { fontSize: 18, fontWeight: 'bold', color: Colors.darkGray },
    calendarYearText: { fontSize: 24, fontWeight: 'bold', color: Colors.darkGray },
    calendarDaysHeader: { flexDirection: 'row', marginBottom: 10 },
    calendarDayName: { flex: 1, textAlign: 'center', fontSize: 12, fontWeight: '600', color: '#9ca3af' },
    calendarGrid: { flexDirection: 'row', flexWrap: 'wrap' },
    calendarDayCell: { width: '14.28%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center' },
    calendarDay: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
    calendarDayToday: { backgroundColor: Colors.primary.indigo },
    calendarDayText: { fontSize: 14, fontWeight: '500', color: Colors.darkGray },
    calendarDayTextToday: { color: Colors.white, fontWeight: 'bold' },
    calendarMonthsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    calendarMonthCell: { width: '30%', paddingVertical: 20, borderRadius: 16, backgroundColor: '#f3f4f6', alignItems: 'center', marginBottom: 12 },
    calendarMonthCellActive: { backgroundColor: Colors.primary.indigo },
    calendarMonthName: { fontSize: 16, fontWeight: '600', color: Colors.darkGray },
    calendarMonthNameActive: { color: Colors.white },
    calendarEventsBtn: { backgroundColor: Colors.primary.indigo, paddingVertical: 16, borderRadius: 16, alignItems: 'center' },
    calendarEventsBtnText: { color: Colors.white, fontSize: 16, fontWeight: 'bold' },
});

export default HomeScreen;