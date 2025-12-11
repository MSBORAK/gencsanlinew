import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { ChevronRight, Bell, ShieldCheck, LogOut, User as UserIcon, X } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { MOCK_USER } from '@/api/mockData';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '@/types/navigation';

type Nav = StackNavigationProp<RootStackParamList>;

const ProfileScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<Nav>();

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  };

  const MenuItem = ({ label, icon, onPress, isLast, isDestructive }: { label: string, icon: React.ReactNode, onPress?: () => void, isLast?: boolean, isDestructive?: boolean }) => (
    <TouchableOpacity style={[styles.menuItem, isLast && { borderBottomWidth: 0 }]} onPress={onPress}>
        <View style={styles.menuItemLeft}>
            {icon}
            <Text style={[styles.menuItemText, isDestructive && { color: Colors.accent.rose }]}>{label}</Text>
        </View>
      <ChevronRight color="#9ca3af" size={24} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profil</Text>
        </View>

        {/* User Info Card (Glassmorphism) */}
        <View style={styles.userInfoWrapper}>
          <BlurView intensity={30} tint="light" style={styles.userInfoCard}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: MOCK_USER.avatar }} style={styles.avatar} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.userName}>{MOCK_USER.name}</Text>
              <View style={styles.userMetaRow}>
                <Text style={styles.userStatus}>{MOCK_USER.status}</Text>
              </View>
            </View>
          </BlurView>
        </View>

        {/* Verification Alert */}
        {!MOCK_USER.isVerified && (
          <TouchableOpacity style={styles.alertCard} onPress={() => setModalVisible(true)} activeOpacity={0.9}>
            <View style={styles.alertIconContainer}>
              <ShieldCheck color={'#f59e0b'} size={24} />
            </View>
            <Text style={styles.alertTitle}>Hesabın doğrulanmadı</Text>
            <Text style={styles.alertText}>
              Avantajlardan yararlanmak için hesabını doğrula.
            </Text>
            <View style={styles.alertButton}>
              <Text style={styles.alertButtonText}>Doğrula</Text>
            </View>
          </TouchableOpacity>
        )}
        
        {/* Settings Group */}
        <Text style={styles.sectionTitle}>Ayarlar</Text>
        <View style={styles.menuContainer}>
          <MenuItem label="Kişisel Bilgiler" icon={<UserIcon color="#6b7280" size={24} />} />
          <MenuItem label="Bildirimler" icon={<Bell color="#6b7280" size={24} />} isLast />
        </View>

        <Text style={styles.sectionTitle}>Diğer</Text>
        <View style={styles.menuContainer}>
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
            <View style={styles.modalView}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <X color="#9ca3af" size={24} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>TC Kimlik Doğrulama</Text>
              <Text style={styles.modalSubtitle}>Avantajlardan yararlanmak için kimlik bilgilerinizi doğrulamanız gerekmektedir.</Text>
              <TextInput
                placeholder="TC Kimlik Numaranız"
                style={styles.modalInput}
                keyboardType="numeric"
                maxLength={11}
              />
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Doğrula ve Devam Et</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  userInfoWrapper: {
    marginHorizontal: 20,
    marginTop: 10,
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
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 2,
    borderColor: '#E5E7EB',
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
