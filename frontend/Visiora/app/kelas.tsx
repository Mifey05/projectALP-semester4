import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Navbar from '../components/navbar/navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../constants/api';

declare global {
  var isPremium: boolean | undefined;
}

globalThis.isPremium ??= false;

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

export default function Kelas() {
  const router = useRouter();

  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [savedCourses, setSavedCourses] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSavedCourses = async () => {
      try {
        const stored = await AsyncStorage.getItem("savedCourses");
        if (stored) {
          setSavedCourses(JSON.parse(stored));
        }
      } catch (err) {
        console.error("Failed to load saved courses", err);
      }
    };

    loadSavedCourses();

    const fetchAllCourses = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(`${BASE_URL}/api/courses`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch courses (${response.status})`);
        }

        const json = await response.json();
        
        if (json.data && Array.isArray(json.data)) {
          const coursesWithDetails = await Promise.all(
            json.data.map(async (course: any) => {
              try {
                const detailResponse = await fetch(`${BASE_URL}/api/courses/${course.course_id}`, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                });
                
                if (detailResponse.ok) {
                  const detailJson = await detailResponse.json();
                  return detailJson.data;
                }
                return course;
              } catch (err) {
                console.error(`Failed to fetch detail for course ${course.course_id}:`, err);
                return course;
              }
            })
          );
          
          setCourses(coursesWithDetails);
        } else {
          setCourses([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Gagal mengambil kelas');
      } finally {
        setLoading(false);
      }
    };

    fetchAllCourses();
  }, []);

  const handleDetailPress = (courseId: number) => {
    if (!globalThis.isPremium) {
      setShowPremiumModal(true);
      return;
    }

    router.push({
      pathname: '/detailKelas',
      params: { courseId: courseId.toString() },
    });
  };

  const toggleSaveCourse = async (courseId: number) => {
    const nextSavedState = !savedCourses[courseId];
    const updated = { ...savedCourses, [courseId]: nextSavedState };
    setSavedCourses(updated);

    try {
      await AsyncStorage.setItem("savedCourses", JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to save course", err);
    }
  };
  
  const getDuration = (startDate: string, endDate: string) => {
    const start = formatDate(startDate);
    const end = formatDate(endDate);
    if (start && end) {
      return `${start} - ${end}`;
    }
    return 'Durasi belum tersedia';
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#8CC8C0', '#EAF4F3']} style={styles.header}>
          <SafeAreaView>
            <TextInput placeholder="Cari Kelas" style={styles.search} />
          </SafeAreaView>
        </LinearGradient>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2E7D32" />
          <Text style={styles.loadingText}>Memuat kelas...</Text>
        </View>
        <Navbar />
      </View>
    );
  }

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
        {error ? (
          <View style={styles.messageBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : courses.length === 0 ? (
          <View style={styles.messageBox}>
            <Text style={styles.messageText}>Belum ada kelas tersedia.</Text>
          </View>
        ) : (
          courses.map((item) => (
            <View key={item.course_id} style={styles.card}>
              <Image
                source={
                  item.thumbnail_url
                    ? { uri: item.thumbnail_url }
                    : require('../assets/images/kelas1.jpg')
                }
                style={styles.image}
              />
              <View style={styles.content}>
                <View style={styles.textContent}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.desc} numberOfLines={2}>
                    {item.description || 'Deskripsi tidak tersedia'}
                  </Text>

                  <View style={styles.durationRow}>
                    <Ionicons name="time-outline" size={14} color="#777" />
                    <Text style={styles.durationText}>
                      {getDuration(item.start_date, item.end_date)}
                    </Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.info} numberOfLines={1}>
                      📍 {item.location || 'Lokasi tidak tersedia'}
                    </Text>
                  </View>
                </View>

                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleDetailPress(item.course_id)}
                  >
                    <Text style={styles.buttonText}>Lihat Detail Kelas</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => toggleSaveCourse(item.course_id)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Ionicons
                      name={savedCourses[item.course_id] ? 'bookmark' : 'bookmark-outline'}
                      size={22}
                      color={savedCourses[item.course_id] ? '#2E7D32' : '#2E7D32'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
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
              Detail lengkap dan fitur kelas hanya bisa diakses oleh pengguna berlangganan
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
  container: { 
    flex: 1, 
    backgroundColor: '#F5F5F5' 
  },
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
  textContent: {
    flex: 1,
  },
  title: { 
    fontWeight: 'bold', 
    fontSize: 14, 
    marginBottom: 4 
  },
  desc: { 
    fontSize: 12, 
    color: '#666', 
    marginBottom: 6,
    lineHeight: 16,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  durationText: {
    fontSize: 11,
    color: '#777',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  info: { 
    fontSize: 11, 
    color: '#777' 
  },
  messageBox: {
    paddingTop: 28,
    alignItems: 'center',
  },
  messageText: {   
    color: '#333',
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
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
  iconButton: {
    padding: 6,
    borderRadius: 12,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#666',
  },
});