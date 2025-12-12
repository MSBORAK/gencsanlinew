import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowUpRight, MapPin, Wifi } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { MOCK_USER, MOCK_PARTNERS } from '@/api/mockData';
import { DiscountPartner } from '@/types';
import { UrfaIcon_Balik, UrfaIcon_Gobeklitepe, UrfaIcon_Harran } from '@/components/icons/Custom/UrfaIcons';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '@/types/navigation';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useThemeMode } from '@/context/ThemeContext';


type Nav = StackNavigationProp<RootStackParamList>;

const GencKartScreen = () => {
  const navigation = useNavigation<Nav>();
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  const renderPartnerItem = (item: DiscountPartner) => {
    const Icon = item.icon; 
    return (
        <TouchableOpacity style={styles.partnerCard} activeOpacity={0.9} onPress={() => navigation.navigate('PartnerDetail', { partnerId: item.id })}>
            <View style={[styles.partnerIconContainer, { backgroundColor: item.bgColor }]}>
                <Icon color={item.iconColor} size={24}/>
            </View>
            <View style={styles.partnerInfo}>
                <Text style={styles.partnerName}>{item.name}</Text>
                <Text style={styles.partnerOffer}>{item.offer}</Text>
                <Text style={styles.partnerDesc}>{item.description}</Text>
            </View>
            <ArrowUpRight color={Colors.darkGray} size={24} />
        </TouchableOpacity>
    )
  };

  return (
    <SafeAreaView
      style={[styles.container, isDark && { backgroundColor: '#020617' }]}
      edges={['top']}
    >
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>ŞanlıGenç Kart</Text>
                <Text style={styles.headerSubtitle}>Şehrin anahtarı cebinde!</Text>
            </View>

            {/* Genç Kart */}
            <LinearGradient
                colors={['#374151', '#581c87', '#0f172a']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gencKart}
            >
                {/* Urfa Pattern Overlay - GÜLSÜZ & YOĞUN VERSİYON */}
                <View style={styles.patternContainer}>
                    {/* Arka plan büyük elemanlar */}
                    <UrfaIcon_Gobeklitepe size={85} opacity={0.15} style={{ position: 'absolute', top: 50, right: 15, transform: [{ rotate: '-15deg' }] }} />
                    <UrfaIcon_Harran size={75} opacity={0.12} style={{ position: 'absolute', bottom: 5, left: 10, transform: [{ rotate: '10deg' }] }} />

                    {/* Orta katman elemanlar */}
                    <UrfaIcon_Balik size={60} opacity={0.2} style={{ position: 'absolute', top: 15, left: 20, transform: [{ rotate: '25deg' }] }} />
                    <UrfaIcon_Balik size={50} opacity={0.18} style={{ position: 'absolute', bottom: 25, right: -10, transform: [{ rotate: '-20deg' }] }} />

                    {/* Küçük dolgu elemanları */}
                    <UrfaIcon_Gobeklitepe size={40} opacity={0.1} style={{ position: 'absolute', bottom: 85, left: 95, transform: [{ rotate: '20deg' }] }} />
                    <UrfaIcon_Balik size={35} opacity={0.15} style={{ position: 'absolute', top: 10, right: 100, transform: [{ rotate: '-5deg' }] }} />
                    <UrfaIcon_Harran size={45} opacity={0.12} style={{ position: 'absolute', bottom: 10, right: 130, transform: [{ rotate: '45deg' }] }} />
                    
                    {/* --- İLK EKLEME --- */}
                    <UrfaIcon_Harran size={35} opacity={0.08} style={{ position: 'absolute', top: 90, left: 15, transform: [{ rotate: '-10deg' }] }} />
                    <UrfaIcon_Balik size={25} opacity={0.1} style={{ position: 'absolute', bottom: 60, right: 80, transform: [{ rotate: '30deg' }] }} />
                    <UrfaIcon_Gobeklitepe size={30} opacity={0.1} style={{ position: 'absolute', top: 5, left: 120, transform: [{ rotate: '15deg' }] }} />
                    <UrfaIcon_Balik size={30} opacity={0.07} style={{ position: 'absolute', top: 120, right: 100, transform: [{ rotate: '-30deg' }] }} />
                    <UrfaIcon_Harran size={25} opacity={0.09} style={{ position: 'absolute', top: 140, left: 50, transform: [{ rotate: '15deg' }] }} />
                    <UrfaIcon_Gobeklitepe size={20} opacity={0.12} style={{ position: 'absolute', bottom: 5, right: 70, transform: [{ rotate: '-5deg' }] }} />

                    {/* --- İKİNCİ EKLEME (DAHA FAZLA YOĞUNLUK) --- */}
                    <UrfaIcon_Balik size={22} opacity={0.15} style={{ position: 'absolute', top: 80, right: 90, transform: [{ rotate: '180deg' }] }} />
                    <UrfaIcon_Gobeklitepe size={28} opacity={0.1} style={{ position: 'absolute', bottom: 60, left: 30, transform: [{ rotate: '-25deg' }] }} />
                    <UrfaIcon_Harran size={33} opacity={0.11} style={{ position: 'absolute', top: 40, left: 150, transform: [{ rotate: '35deg' }] }} />

                    {/* --- ÜÇÜNCÜ EKLEME (SON DOKUNUŞLAR) --- */}
                    <UrfaIcon_Gobeklitepe size={25} opacity={0.06} style={{ position: 'absolute', top: 130, left: 140, transform: [{ rotate: '-10deg' }] }} />
                    <UrfaIcon_Balik size={20} opacity={0.08} style={{ position: 'absolute', bottom: 45, left: 160, transform: [{ rotate: '10deg' }] }} />
                    
                    {/* --- DÖRDÜNCÜ EKLEME (MAKSİMUM YOĞUNLUK) --- */}
                    <UrfaIcon_Harran size={20} opacity={0.1} style={{ position: 'absolute', top: 160, right: 40, transform: [{ rotate: '-40deg' }] }} />
                    <UrfaIcon_Balik size={28} opacity={0.12} style={{ position: 'absolute', top: 60, left: 60, transform: [{ rotate: '60deg' }] }} />
                    <UrfaIcon_Gobeklitepe size={26} opacity={0.09} style={{ position: 'absolute', bottom: 90, right: 140, transform: [{ rotate: '5deg' }] }} />
                </View>

                <View style={styles.cardTop}>
                    <View>
                        <View style={styles.cardLogoContainer}>
                           <MapPin color={Colors.white} size={16}/>
                           <Text style={styles.cardLogoText}>ŞANLIGENÇ</Text>
                        </View>
                        <Text style={styles.cardAgeText}>◎ 16-30 YAŞ</Text>
                    </View>
                    <View style={styles.contactlessContainer}>
                        <Wifi color="rgba(255,255,255,0.6)" size={24} style={{ transform: [{ rotate: '90deg' }] }} />
                        <Text style={styles.cardYear}>2025</Text>
                    </View>
                </View>

                <View style={styles.cardBottom}>
                    <View>
                        <Text style={styles.cardHolderLabel}>KART SAHİBİ</Text>
                        <Text style={styles.cardHolderName}>MERT YILMAZ</Text>
                        <Text style={styles.cardId}>TR-63-9921</Text>
                    </View>
                </View>
            </LinearGradient>

            {/* Partner List */}
            <View style={styles.listHeader}>
                <Text style={styles.sectionTitle}>Anlaşmalı Mekanlar</Text>
                <Text style={styles.firsatCount}>{MOCK_PARTNERS.length} Fırsat</Text>
            </View>

            <View style={styles.listContainer}>
                {MOCK_PARTNERS.map((item) => (
                    <View key={item.id}>
                        {renderPartnerItem(item)}
                    </View>
                ))}
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
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.darkGray,
  },
  headerSubtitle: {
      fontSize: 16,
      color: '#6b7280',
      marginTop: 2,
  },
  gencKart: {
    borderRadius: 25,
    marginHorizontal: 20,
    padding: 20,
    height: 210,
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },
  patternContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
    overflow: 'hidden',
  },
  cardTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      zIndex: 1,
  },
  cardLogoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  cardLogoText: {
      color: Colors.white,
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 5,
  },
  cardAgeText: {
      color: '#9ca3af',
      fontSize: 12,
      marginLeft: 22,
      marginTop: 2
  },
  contactlessContainer: {
      alignItems: 'flex-end',
      gap: 5
  },
  cardYear: {
      color: Colors.white,
      backgroundColor: 'rgba(255,255,255,0.1)',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 8,
      overflow: 'hidden',
      fontSize: 12,
      fontWeight: 'bold'
  },
  cardBottom: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      zIndex: 1,
  },
  cardHolderLabel: {
      color: '#9ca3af',
      fontSize: 12,
  },
  cardHolderName: {
      color: Colors.white,
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 2
  },
  cardId: {
      color: '#9ca3af',
      fontSize: 12,
      marginTop: 2
  },
  listHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginTop: 30,
      marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkGray,
  },
  firsatCount: {
      color: '#6b7280',
      fontWeight: '600'
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  partnerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  partnerIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  partnerInfo: {
    flex: 1,
    marginLeft: 15,
  },
  partnerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.darkGray,
  },
  partnerOffer: {
      color: Colors.primary.indigo,
      fontWeight: 'bold'
  },
  partnerDesc: {
      color: '#6b7280',
      fontSize: 12,
      marginTop: 2,
  }
});

export default GencKartScreen;
