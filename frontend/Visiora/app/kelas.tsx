import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Navbar from '../components/navbar/navbar';

export default function Kelas() {
  const router = useRouter();

  const [isPremium, setIsPremium] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const data = [
    {
      id: 1,
      title: 'Dasar Jualan UMKM',
      desc: 'Mulai dari nol, pelajari cara menemukan ide jualan yang menarik pembeli dan membangun dasar usaha yang',
      image: require('../assets/images/kelas1.jpg')
    },
    {
      id: 2,
      title: 'Dasar Jualan UMKM',
      desc: 'Mulai dari nol, pelajari cara menemukan ide jualan yang menarik pembeli dan membangun dasar usaha yang',
      image: require('../assets/images/kelas2.jpg')
    },
    {
      id: 3,
      title: 'Dasar Jualan UMKM',
      desc: 'Mulai dari nol, pelajari cara menemukan ide jualan yang menarik pembeli dan membangun dasar usaha yang',
      image: require('../assets/images/kelas3.jpg')
    },
    {
      id: 4,
      title: 'Dasar Jualan UMKM',
      desc: 'Mulai dari nol, pelajari cara menemukan ide jualan yang menarik pembeli dan membangun dasar usaha yang',
      image: require('../assets/images/kelas4.jpg')
    },
  ];

  const handleDetailPress = () => {
    if (isPremium) {
      router.push('/kelas');
    } else {
      setShowPremiumModal(true);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient 
        colors={['#8CC8C0', '#EAF4F3']} 
        style={styles.header}>
        <SafeAreaView>
          <TextInput 
            placeholder="Cari Kelas" 
            style={styles.search} />
        </SafeAreaView>
      </LinearGradient>

      <ScrollView
        style={styles.list}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {data.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.content}>
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>{item.desc}</Text>

                <View style={styles.infoRow}>
                  <Text style={styles.info}>👥 126 Orang</Text>
                  <Text style={styles.info}>⏱️ 1 Jam 30 Menit</Text>
                </View>
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleDetailPress}
                >
                <Text style={styles.buttonText}>Lihat Detail Kelas</Text>
                </TouchableOpacity>

                <Ionicons 
                  name="bookmark-outline" 
                  size={22}
                  color="#2E7D32" />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal visible={showPremiumModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>

            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setShowPremiumModal(false)}
            >
              <Ionicons 
                name="close" 
                size={30}
                color="#333" />
            </TouchableOpacity>

            <Image
              source={require('../assets/images/GambarLock.png')}
              style={styles.lockImage}
            />
            <Text style={styles.modalTitle}>Khusus langganan</Text>
            <Text style={styles.modalDesc}>
              Detail lengkap dan fitu kels hanya bisa diakses oleh pengguna berlangganan
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setShowPremiumModal(false);
                router.push('/subscription');
              }}
            >
              <Ionicons 
                name="star" 
                size={18} 
                color="#fff" />
              <Text style={styles.modalButtonText}>Langganan sekarang</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Navbar />
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: 
  { 
    flex: 1, 
    backgroundColor: '#F5F5F5' },
    header: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  search: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginTop: 25,
  },
  list: { 
    padding: 16 
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    marginBottom: 16,
    elevation: 3,
    alignItems: 'stretch',
  },
  image: {
    width: 100,
    height: '100%',
    borderRadius: 12,
  },
  content: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  title: { 
    fontWeight: 'bold', 
    fontSize: 14, 
    marginBottom: 4 
  },
  desc: { 
    fontSize: 12, 
    color: '#666', 
    marginBottom: 6 
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  info: { 
    fontSize: 11, 
    color: '#777' 
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  button: {
    flex: 1,
    backgroundColor: '#2E7D32',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 20, 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  lockImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: -50,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    marginBottom: 8,
  },
  modalDesc: {
    fontSize: 12,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#2E7D32',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});