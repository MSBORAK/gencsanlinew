import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Download, ChevronRight } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { MOCK_MAGAZINES, MOCK_BULLETINS } from '@/api/mockData';

const MagazineScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Keşfet</Text>
        </View>

        {/* Tarihi Mirasımız */}
        <Text style={styles.sectionTitle}>Tarihi Mirasımız</Text>
        <FlatList
          horizontal
          data={MOCK_MAGAZINES}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.heritageCard}>
              <Image source={{ uri: item.image }} style={styles.heritageImage} />
              <View style={styles.heritageOverlay} />
              <View style={styles.heritageTextContainer}>
                <Text style={styles.heritageTitle}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />

        {/* E-Dergi */}
        <Text style={styles.sectionTitle}>E-Dergi</Text>
        <TouchableOpacity style={styles.eDergiCard}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1593839238634-2b744a8677f5?q=80&w=2574&auto.format&fit=crop' }} 
            style={styles.eDergiImage} 
          />
        </TouchableOpacity>

        {/* Bulletins */}
        <Text style={styles.sectionTitle}>Bültenler</Text>
        <View style={styles.menuContainer}>
            {MOCK_BULLETINS.map((item, index) => (
                <TouchableOpacity key={item.id} style={[styles.bulletinRow, index === MOCK_BULLETINS.length - 1 && { borderBottomWidth: 0 }]}>
                    <View style={styles.bulletinLeft}>
                        <Download color="#6b7280" size={24} />
                        <Text style={styles.bulletinTitle}>{item.title}</Text>
                    </View>
                    <ChevronRight color="#9ca3af" size={24} />
                </TouchableOpacity>
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
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.darkGray,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#9ca3af',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  horizontalList: {
    paddingLeft: 20,
  },
  heritageCard: {
    width: 220,
    height: 160,
    marginRight: 16,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  heritageImage: {
    width: '100%',
    height: '100%',
  },
  heritageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  heritageTextContainer: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
  },
  heritageTitle: {
    fontWeight: '700',
    color: Colors.white,
    fontSize: 16,
  },
  eDergiCard: {
    height: 200,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  eDergiImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb'
  },
  menuContainer: {
      backgroundColor: Colors.white,
      borderRadius: 20,
      marginHorizontal: 20,
      borderWidth: 1,
      borderColor: '#e5e7eb'
  },
  bulletinRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#f3f4f6'
  },
  bulletinLeft: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  bulletinTitle: {
      fontSize: 16,
      marginLeft: 15,
      color: Colors.darkGray
  }
});

export default MagazineScreen;
