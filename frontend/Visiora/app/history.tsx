import { LinearGradient } from 'expo-linear-gradient';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import Navbar from '../components/navbar/navbar';

const DATA = [
  {
    id: '1',
    title: 'Nasi Ayam Gila',
    desc: 'Dua tiga sendok terjatuh, Nasi Ayam gila hangat bikin perut luluh.',
    image: require('../assets/images/nasi_ayam.jpg'),
  },
  {
    id: '2',
    title: 'Indomie Aceh',
    desc: 'Pergi ke pasar beli serai, Mie Aceh pedas bikin nagih!',
    image: require('../assets/images/mie_aceh.jpg'),
  },
  {
    id: '3',
    title: 'Nasi Ayam Belada',
    desc: 'Pedasnya nampol, bikin nagih tiap hari.',
    image: require('../assets/images/nasi_ayam_belada.jpg'),
  },
  {
    id: '4',
    title: 'Nasi Kuning',
    desc: 'Nasi gurih dengan lauk lengkap.',
    image: require('../assets/images/nasi_kuning.jpg'),
  },
  {
    id: '5',
    title: 'Batagor',
    desc: 'Gurih, renyah, dan saus kacang mantap.',
    image: require('../assets/images/batagor.jpg'),
  },
  {
    id: '6',
    title: 'Ayam Goreng',
    desc: 'Ayam crispy dengan bumbu spesial.',
    image: require('../assets/images/ayam.jpg'),
  },
];

export default function History() {
  return (
    <View style={{ flex: 1 }}>
      
      <LinearGradient
        colors={['#8CC8C0', '#ffffff']}
        style={styles.headerContainer}
      >
        <Text style={styles.header}>History</Text>

        <View style={styles.subtitleContainer}>
          <View style={styles.line} />
          <Text style={styles.subtitle}>Design Yang Saya Buat</Text>
          <View style={styles.line} />
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <FlatList
          data={DATA}
          numColumns={2}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ justifyContent: 'space-between' }}

          contentContainerStyle={{ paddingBottom: 120 }}

          renderItem={({ item }) => (
            <View style={styles.card}>
              
              <Image source={item.image} style={styles.image} />

              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.desc} numberOfLines={2}>
                  {item.desc}
                </Text>
              </View>

              <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Gunakan</Text>
              </Pressable>

            </View>
          )}
        />
      </View>
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },

  header: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },

  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  subtitle: {
    marginHorizontal: 10,
    fontSize: 13,
    color: '#2f6f68',
    fontWeight: '500',
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#7db3aa',
  },

  content: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    marginBottom: 16,
    elevation: 4,
    flex: 1,
  },

  image: {
    width: '100%',
    height: 150,
    borderRadius: 12,
  },

  cardTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 8,
  },

  desc: {
    fontSize: 12,
    color: '#555',
    marginVertical: 6,
  },

  button: {
    backgroundColor: '#2f6f68',
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 6,
  },

  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
});