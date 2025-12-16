import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, ScrollView, Platform, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight, Bell, ShieldCheck, LogOut, User as UserIcon, X, Calendar, MapPin, Star, Award, Settings, HelpCircle, Info } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { MOCK_USER } from '@/api/mockData';
import { useThemeMode } from '@/context/ThemeContext';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '@/types/navigation';

type Nav = StackNavigationProp<RootStackParamList>;

const ProfileScreen = () => {
  const { mode, toggleTheme } = useThemeMode();
  const [modalVisible, setModalVisible] = useState(false);
  const [privacyModalVisible, setPrivacyModalVisible] = useState(false);
  const [eventNotificationsEnabled, setEventNotificationsEnabled] = useState(true);
  const [discountNotificationsEnabled, setDiscountNotificationsEnabled] = useState(true);
  const [locationNotificationsEnabled, setLocationNotificationsEnabled] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [personalizationEnabled, setPersonalizationEnabled] = useState(true);
  const navigation = useNavigation<Nav>();

  const userInitial = (MOCK_USER.name?.charAt(0) ?? '').toUpperCase();

  // Mock istatistikler
  const stats = {
    eventsAttended: 12,
    favoriteStops: 3,
    daysActive: 45,
    profileCompletion: 75,
  };

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  };

  const MenuItem = ({ label, icon, onPress, isLast, isDestructive }: { label: string, icon: React.ReactNode, onPress?: () => void, isLast?: boolean, isDestructive?: boolean }) => (
    <TouchableOpacity style={[styles.menuItem, isLast && { borderBottomWidth: 0 }, isDark && { borderBottomColor: '#334155' }]} onPress={onPress}>
        <View style={styles.menuItemLeft}>
            {icon}
            <Text style={[styles.menuItemText, isDark && { color: '#f8fafc' }, isDestructive && { color: Colors.accent.rose }]}>{label}</Text>
        </View>
      <ChevronRight color={isDark ? '#64748b' : '#9ca3af'} size={24} />
    </TouchableOpacity>
  );

  const isDark = mode === 'dark';

  return (
    <View style={[styles.root, isDark && { backgroundColor: Colors.black }]}>
      {/* Üstteki status bar alanı mor */}
      <SafeAreaView
        style={[styles.statusBarArea, isDark && { backgroundColor: Colors.black }]}
        edges={['top']}
      />
      {/* Alt içerik alanı */}
      <SafeAreaView
        style={[styles.container, isDark && { backgroundColor: '#020617' }]}
        edges={['left', 'right', 'bottom']}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
        {/* Colorful Header + User Card */}
        <View style={styles.headerSection}>
          <LinearGradient
            colors={
              isDark
                ? ['#020617', '#1f2937']
                : [Colors.primary.violet, Colors.primary.indigo]
            }
            style={styles.headerGradient}
          >
            <Text style={styles.headerTitle}>Profil</Text>

            {/* User Info Card (Glassmorphism) */}
            <View style={styles.userInfoWrapper}>
              <BlurView intensity={30} tint="light" style={styles.userInfoCard}>
                <View style={styles.avatarWrapper}>
                  <LinearGradient
                    colors={['#8b5cf6', '#ec4899', '#f59e0b']}
                    style={styles.avatarGradientBorder}
                  >
                    <View style={styles.avatarContainer}>
                      <Text style={styles.avatarInitial}>{userInitial}</Text>
                    </View>
                  </LinearGradient>
                </View>
                <View style={{ flex: 1, marginLeft: 15 }}>
                  <View style={styles.userNameRow}>
                    <Text
                      style={[
                        styles.userName,
                        isDark && { color: Colors.white },
                      ]}
                    >
                      {MOCK_USER.name}
                    </Text>
                    {MOCK_USER.isVerified && (
                      <View style={styles.verifiedBadge}>
                        <ShieldCheck color={Colors.white} size={14} fill={Colors.white} />
                      </View>
                    )}
                  </View>
                  <Text style={[styles.userStatus, isDark && { color: 'rgba(255,255,255,0.7)' }]}>{MOCK_USER.status}</Text>
                  <View style={styles.profileProgressContainer}>
                    <View style={styles.profileProgressBar}>
                      <View style={[styles.profileProgressFill, { width: `${stats.profileCompletion}%` }]} />
                    </View>
                    <Text style={styles.profileProgressText}>{stats.profileCompletion}% Tamamlandı</Text>
                  </View>
                </View>
              </BlurView>
            </View>

            {/* İstatistik Kartları */}
            <View style={styles.statsContainer}>
              <TouchableOpacity 
                style={[styles.statCard, isDark && { backgroundColor: '#1e293b', borderColor: '#334155' }]}
                activeOpacity={0.8}
              >
                <View style={[styles.statIconContainer, { backgroundColor: '#e0e7ff' }, isDark && { backgroundColor: '#334155' }]}>
                  <Calendar color={Colors.primary.indigo} size={20} />
                </View>
                <Text style={[styles.statValue, isDark && { color: '#f8fafc' }]}>{stats.eventsAttended}</Text>
                <Text style={[styles.statLabel, isDark && { color: '#94a3b8' }]}>Etkinlik</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.statCard, isDark && { backgroundColor: '#1e293b', borderColor: '#334155' }]}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Main', { screen: 'Transport' })}
              >
                <View style={[styles.statIconContainer, { backgroundColor: '#dcfce7' }, isDark && { backgroundColor: '#334155' }]}>
                  <MapPin color="#10b981" size={20} />
                </View>
                <Text style={[styles.statValue, isDark && { color: '#f8fafc' }]}>{stats.favoriteStops}</Text>
                <Text style={[styles.statLabel, isDark && { color: '#94a3b8' }]}>Favori Durak</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.statCard, isDark && { backgroundColor: '#1e293b', borderColor: '#334155' }]}
                activeOpacity={0.8}
              >
                <View style={[styles.statIconContainer, { backgroundColor: '#fef3c7' }, isDark && { backgroundColor: '#334155' }]}>
                  <Award color="#f59e0b" size={20} />
                </View>
                <Text style={[styles.statValue, isDark && { color: '#f8fafc' }]}>{stats.daysActive}</Text>
                <Text style={[styles.statLabel, isDark && { color: '#94a3b8' }]}>Gün Aktif</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Verification Alert */}
        {!MOCK_USER.isVerified && (
          <TouchableOpacity 
            style={[styles.alertCard, isDark && { backgroundColor: '#422006', borderColor: '#78350f' }]} 
            onPress={() => setModalVisible(true)} 
            activeOpacity={0.9}
          >
            <View style={[styles.alertIconContainer, isDark && { backgroundColor: '#78350f' }]}>
              <ShieldCheck color={isDark ? '#fbbf24' : '#f59e0b'} size={24} />
            </View>
            <Text style={[styles.alertTitle, isDark && { color: '#fcd34d' }]}>Hesabın doğrulanmadı</Text>
            <Text style={[styles.alertText, isDark && { color: '#fde68a' }]}>
              Avantajlardan yararlanmak için hesabını doğrula.
            </Text>
            <View style={[styles.alertButton, isDark && { backgroundColor: '#fbbf24' }]}>
              <Text style={[styles.alertButtonText, isDark && { color: '#422006' }]}>Doğrula</Text>
            </View>
          </TouchableOpacity>
        )}
        
        {/* Account Info */}
        <Text style={[styles.sectionTitle, isDark && { color: '#94a3b8' }]}>Hesap Bilgileri</Text>
        <View style={[styles.menuContainer, isDark && { backgroundColor: '#1e293b' }]}>
          <View style={[styles.infoRow, isDark && { borderBottomColor: '#334155' }]}>
            <Text style={[styles.infoLabel, isDark && { color: '#94a3b8' }]}>Ad Soyad</Text>
            <Text style={[styles.infoValue, isDark && { color: '#f8fafc' }]}>{MOCK_USER.name}</Text>
          </View>
          <View style={[styles.infoRow, isDark && { borderBottomColor: '#334155' }]}>
            <Text style={[styles.infoLabel, isDark && { color: '#94a3b8' }]}>Doğum Yılı</Text>
            <Text style={[styles.infoValue, isDark && { color: '#f8fafc' }]}>{MOCK_USER.dob}</Text>
          </View>
          <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
            <Text style={[styles.infoLabel, isDark && { color: '#94a3b8' }]}>Durum</Text>
            <Text style={[styles.infoValue, isDark && { color: '#f8fafc' }]}>{MOCK_USER.status}</Text>
          </View>
        </View>

        {/* Hızlı Erişim */}
        <Text style={[styles.sectionTitle, isDark && { color: '#94a3b8' }]}>Hızlı Erişim</Text>
        <View style={styles.quickAccessContainer}>
          <TouchableOpacity 
            style={[styles.quickAccessCard, isDark && { backgroundColor: '#1e293b', borderColor: '#334155' }]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Main', { screen: 'Transport' })}
          >
            <View style={[styles.quickAccessIcon, { backgroundColor: '#e0e7ff' }, isDark && { backgroundColor: '#334155' }]}>
              <MapPin color={Colors.primary.indigo} size={24} />
            </View>
            <Text style={[styles.quickAccessText, isDark && { color: '#f8fafc' }]}>Favori Duraklar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.quickAccessCard, isDark && { backgroundColor: '#1e293b', borderColor: '#334155' }]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Events')}
          >
            <View style={[styles.quickAccessIcon, { backgroundColor: '#fee2e2' }, isDark && { backgroundColor: '#334155' }]}>
              <Calendar color="#ef4444" size={24} />
            </View>
            <Text style={[styles.quickAccessText, isDark && { color: '#f8fafc' }]}>Etkinliklerim</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.quickAccessCard, isDark && { backgroundColor: '#1e293b', borderColor: '#334155' }]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Main', { screen: 'GencKart' })}
          >
            <View style={[styles.quickAccessIcon, { backgroundColor: '#dcfce7' }, isDark && { backgroundColor: '#334155' }]}>
              <Star color="#10b981" size={24} fill="#10b981" />
            </View>
            <Text style={[styles.quickAccessText, isDark && { color: '#f8fafc' }]}>Genç Kart</Text>
          </TouchableOpacity>
        </View>

        {/* Settings Group */}
        <Text style={[styles.sectionTitle, isDark && { color: '#94a3b8' }]}>Ayarlar</Text>
        <View style={[styles.menuContainer, isDark && { backgroundColor: '#1e293b' }]}>
          <MenuItem label="Kişisel Bilgiler" icon={<UserIcon color={isDark ? '#94a3b8' : '#6b7280'} size={24} />} />
          <MenuItem
            label="Bildirimler"
            icon={<Bell color={isDark ? '#94a3b8' : '#6b7280'} size={24} />}
            onPress={() => navigation.navigate('Notifications')}
            isLast
          />
        </View>

        <Text style={[styles.sectionTitle, isDark && { color: '#94a3b8' }]}>Bildirim Tercihleri</Text>
        <View style={[styles.menuContainer, isDark && { backgroundColor: '#1e293b' }]}>
          <View style={[styles.switchRow, isDark && { borderBottomColor: '#334155' }]}>
            <View style={styles.switchTextWrapper}>
              <Text style={[styles.switchTitle, isDark && { color: '#f8fafc' }]}>Etkinlik bildirimleri</Text>
              <Text style={[styles.switchSubtitle, isDark && { color: '#94a3b8' }]}>Yeni etkinlikler ve hatırlatmalar</Text>
            </View>
            <Switch
              value={eventNotificationsEnabled}
              onValueChange={setEventNotificationsEnabled}
              thumbColor={eventNotificationsEnabled ? Colors.primary.indigo : '#e5e7eb'}
              trackColor={{ false: '#d1d5db', true: '#c7d2fe' }}
            />
          </View>
          <View style={[styles.switchRow, isDark && { borderBottomColor: '#334155' }]}>
            <View style={styles.switchTextWrapper}>
              <Text style={[styles.switchTitle, isDark && { color: '#f8fafc' }]}>İndirim bildirimleri</Text>
              <Text style={[styles.switchSubtitle, isDark && { color: '#94a3b8' }]}>Anlaşmalı mekân ve kampanyalar</Text>
            </View>
            <Switch
              value={discountNotificationsEnabled}
              onValueChange={setDiscountNotificationsEnabled}
              thumbColor={discountNotificationsEnabled ? Colors.primary.indigo : '#e5e7eb'}
              trackColor={{ false: '#d1d5db', true: '#c7d2fe' }}
            />
          </View>
          <View style={[styles.switchRow, { borderBottomWidth: 0 }]}>
            <View style={styles.switchTextWrapper}>
              <Text style={[styles.switchTitle, isDark && { color: '#f8fafc' }]}>Konum bazlı bildirimler</Text>
              <Text style={[styles.switchSubtitle, isDark && { color: '#94a3b8' }]}>Yakınındaki indirimleri haber ver</Text>
            </View>
            <Switch
              value={locationNotificationsEnabled}
              onValueChange={setLocationNotificationsEnabled}
              thumbColor={locationNotificationsEnabled ? Colors.primary.indigo : '#e5e7eb'}
              trackColor={{ false: '#d1d5db', true: '#c7d2fe' }}
            />
          </View>
        </View>

        <Text style={[styles.sectionTitle, isDark && { color: '#94a3b8' }]}>Veri Gizliliği</Text>
        <View style={[styles.menuContainer, isDark && { backgroundColor: '#1e293b' }]}>
          <View style={[styles.switchRow, isDark && { borderBottomColor: '#334155' }]}>
            <View style={styles.switchTextWrapper}>
              <Text style={[styles.switchTitle, isDark && { color: '#f8fafc' }]}>Analiz verilerini paylaş</Text>
              <Text style={[styles.switchSubtitle, isDark && { color: '#94a3b8' }]}>Uygulamanın geliştirilmesine anonim katkı sağlar</Text>
            </View>
            <Switch
              value={analyticsEnabled}
              onValueChange={setAnalyticsEnabled}
              thumbColor={analyticsEnabled ? Colors.primary.indigo : '#e5e7eb'}
              trackColor={{ false: '#d1d5db', true: '#c7d2fe' }}
            />
          </View>
          <View style={[styles.switchRow, isDark && { borderBottomColor: '#334155' }]}>
            <View style={styles.switchTextWrapper}>
              <Text style={[styles.switchTitle, isDark && { color: '#f8fafc' }]}>Kişiselleştirilmiş içerik</Text>
              <Text style={[styles.switchSubtitle, isDark && { color: '#94a3b8' }]}>İlgi alanlarına göre öneriler göster</Text>
            </View>
            <Switch
              value={personalizationEnabled}
              onValueChange={setPersonalizationEnabled}
              thumbColor={personalizationEnabled ? Colors.primary.indigo : '#e5e7eb'}
              trackColor={{ false: '#d1d5db', true: '#c7d2fe' }}
            />
          </View>
          <TouchableOpacity
            style={[styles.menuItem, { borderBottomWidth: 0 }, isDark && { borderBottomColor: '#334155' }]}
            onPress={() => setPrivacyModalVisible(true)}
            activeOpacity={0.8}
          >
            <View style={styles.menuItemLeft}>
              <ShieldCheck color={isDark ? '#94a3b8' : '#6b7280'} size={24} />
              <Text style={[styles.menuItemText, isDark && { color: '#f8fafc' }]}>Gizlilik Politikası</Text>
            </View>
            <ChevronRight color={isDark ? '#64748b' : '#9ca3af'} size={24} />
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, isDark && { color: '#94a3b8' }]}>Görünüm</Text>
        <View style={[styles.menuContainer, isDark && { backgroundColor: '#1e293b' }]}>
          <View style={[styles.switchRow, { borderBottomWidth: 0 }]}>
            <View style={styles.switchTextWrapper}>
              <Text style={[styles.switchTitle, isDark && { color: '#f8fafc' }]}>Karanlık Mod</Text>
              <Text style={[styles.switchSubtitle, isDark && { color: '#94a3b8' }]}>
                Uygulamayı koyu tema ile kullan
              </Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              thumbColor={isDark ? Colors.primary.indigo : '#e5e7eb'}
              trackColor={{ false: '#d1d5db', true: '#c7d2fe' }}
            />
          </View>
        </View>

        <Text style={[styles.sectionTitle, isDark && { color: '#94a3b8' }]}>Yardım & Destek</Text>
        <View style={[styles.menuContainer, isDark && { backgroundColor: '#1e293b' }]}>
          <MenuItem
            label="Yardım Merkezi"
            icon={<HelpCircle color={isDark ? '#94a3b8' : '#6b7280'} size={24} />}
            onPress={() => {}}
          />
          <MenuItem
            label="Hakkında"
            icon={<Info color={isDark ? '#94a3b8' : '#6b7280'} size={24} />}
            onPress={() => {}}
            isLast
          />
        </View>

        <Text style={[styles.sectionTitle, isDark && { color: '#94a3b8' }]}>Diğer</Text>
        <View style={[styles.menuContainer, isDark && { backgroundColor: '#1e293b' }]}>
          <MenuItem
            label="Çıkış Yap"
            icon={<LogOut color={Colors.accent.rose} size={24} />}
            onPress={handleLogout}
            isDestructive
            isLast
          />
        </View>
        

        {/* Verification Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.modalBackdrop}>
            <View style={[styles.modalView, isDark && { backgroundColor: '#1e293b' }]}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <X color={isDark ? '#94a3b8' : '#9ca3af'} size={24} />
              </TouchableOpacity>
              <Text style={[styles.modalTitle, isDark && { color: '#f8fafc' }]}>TC Kimlik Doğrulama</Text>
              <Text style={[styles.modalSubtitle, isDark && { color: '#94a3b8' }]}>Avantajlardan yararlanmak için kimlik bilgilerinizi doğrulamanız gerekmektedir.</Text>
              <TextInput
                placeholder="TC Kimlik Numaranız"
                placeholderTextColor={isDark ? '#64748b' : '#9ca3af'}
                style={[styles.modalInput, isDark && { backgroundColor: '#334155', color: '#f8fafc' }]}
                keyboardType="numeric"
                maxLength={11}
              />
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Doğrula ve Devam Et</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Privacy Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={privacyModalVisible}
          onRequestClose={() => setPrivacyModalVisible(!privacyModalVisible)}
        >
          <View style={styles.modalBackdrop}>
            <View style={[styles.modalView, isDark && { backgroundColor: '#1e293b' }]}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setPrivacyModalVisible(false)}>
                <X color={isDark ? '#94a3b8' : '#9ca3af'} size={24} />
              </TouchableOpacity>
              <Text style={[styles.modalTitle, isDark && { color: '#f8fafc' }]}>Veri Gizliliği</Text>
              <Text style={[styles.modalSubtitle, isDark && { color: '#94a3b8' }]}>
                Uygulama; konum, kullanım ve tercih bilgilerini yalnızca hizmetleri
                iyileştirmek ve sana daha uygun içerikler göstermek için işler.
                Ayarlardan analiz ve kişiselleştirme tercihlerini dilediğin zaman
                değiştirebilirsin.
              </Text>
              <TouchableOpacity style={styles.modalButton} onPress={() => setPrivacyModalVisible(false)}>
                <Text style={styles.modalButtonText}>Anladım</Text>
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
  root: {
    flex: 1,
    backgroundColor: Colors.primary.violet,
  },
  statusBarArea: {
    backgroundColor: Colors.primary.violet,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  headerSection: {
    marginBottom: 24,
  },
  headerGradient: {
    paddingTop: 16,
    paddingBottom: 32,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.white,
  },
  userInfoWrapper: {
    marginTop: 18,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  userInfoCard: {
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.accent.amber,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarInitial: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.darkGray,
  },
  userMetaRow: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userStatus: {
    color: '#6b7280',
    fontSize: 14,
    marginTop: 2,
  },
  avatarWrapper: {
    marginRight: 0,
  },
  avatarGradientBorder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  verifiedBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary.indigo,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileProgressContainer: {
    marginTop: 12,
  },
  profileProgressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 4,
  },
  profileProgressFill: {
    height: '100%',
    backgroundColor: Colors.white,
    borderRadius: 2,
  },
  profileProgressText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    ...Platform.select({
      ios: {
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  quickAccessContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  quickAccessCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    ...Platform.select({
      ios: {
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  quickAccessIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickAccessText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.darkGray,
    textAlign: 'center',
  },
  alertCard: {
    backgroundColor: '#fffbeb',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginHorizontal: 20,
    marginTop: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fef3c7',
    ...Platform.select({
      ios: {
        shadowColor: '#FBBF24',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 18,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  alertIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertTitle: {
    color: '#92400e',
    fontWeight: '600',
    fontSize: 15,
    marginTop: 4,
  },
  alertText: {
    color: '#b45309',
    fontSize: 13,
    marginTop: 6,
    lineHeight: 18,
    textAlign: 'center',
  },
  alertButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: '#fbbf24',
  },
  alertButtonText: {
    color: '#78350f',
    fontSize: 14,
    fontWeight: '600',
  },
  menuContainer: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  sectionTitle: {
    marginTop: 32,
    marginBottom: 8,
    marginHorizontal: 24,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.4,
    color: '#9ca3af',
    textTransform: 'uppercase',
  },
  menuItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 18,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#f3f4f6'
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
      fontSize: 16,
      marginLeft: 15,
      color: Colors.darkGray,
      fontWeight: '600'
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  infoLabel: {
    fontSize: 13,
    color: '#6b7280',
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.darkGray,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  switchTextWrapper: {
    flex: 1,
    marginRight: 12,
  },
  switchTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.darkGray,
  },
  switchSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: '#6b7280',
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    paddingTop: 15,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: Colors.darkGray,
  },
  modalSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: 25,
  },
  modalInput: {
    width: '100%',
    height: 55,
    backgroundColor: '#f3f4f6',
    borderRadius: 15,
    marginBottom: 15,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  modalButton: {
      width: '100%',
      height: 55,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      backgroundColor: Colors.primary.indigo,
  },
  modalButtonText: {
      color: Colors.white,
      fontSize: 16,
      fontWeight: 'bold'
  },
});

export default ProfileScreen;
