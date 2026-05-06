import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import Colors from "../constants/colors";

import Navbar from "../components/navbar/navbar";

export default function SubscriptionScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, "#FFFFFF"]}
        style={styles.header}
      >
        <TouchableOpacity style={styles.back} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Langganan Visiora</Text>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Warung Start</Text>
          <Text style={styles.price}>Rp29.000 <Text style={styles.perMonth}>/ bulan</Text></Text>
          <Text style={styles.description}>
            Untuk 1 device, mulai jualan dengan AI caption & template siap pakai + akses kelas dasar
          </Text>
           <TouchableOpacity style={styles.button} onPress={() => router.push("/pembayaran")}>
            <Text style={styles.buttonText}>Dapatkan Premium</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Naik Level</Text>
          <Text style={styles.price}>Rp49.000 <Text style={styles.perMonth}>/ bulan</Text></Text>
          <Text style={styles.description}>
            Untuk 2 device, lebih fleksibel dengan caption lebih banyak + akses kelas dasar
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => router.push("/pembayaran")}>
            <Text style={styles.buttonText}>Dapatkan Premium</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Laris Manis</Text>
          <Text style={styles.price}>Rp79.000 <Text style={styles.perMonth}>/ bulan</Text></Text>
          <Text style={styles.description}>
            Untuk 3 device, scale + akses semua konten premium & kelas ahli
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => router.push("/pembayaran")}>
            <Text style={styles.buttonText}>Dapatkan Premium</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Naik Level</Text>
          <Text style={styles.price}>Rp100.000 <Text style={styles.perMonth}>/ bulan</Text></Text>
          <Text style={styles.description}>
            Untuk 2 device, lebih fleksibel dengan caption lebih banyak + akses kelas dasar
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => router.push("/pembayaran")}>
            <Text style={styles.buttonText}>Dapatkan Premium</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Naik Level</Text>
          <Text style={styles.price}>Rp125.000 <Text style={styles.perMonth}>/ bulan</Text></Text>
          <Text style={styles.description}>
            Untuk 2 device, lebih fleksibel dengan caption lebih banyak + akses kelas dasar
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => router.push("/pembayaran")}>
            <Text style={styles.buttonText}>Dapatkan Premium</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  back: {
    position: 'absolute',
    left: 16,
    top: 35,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 24,
    borderRadius: 12,
    shadowColor: '#474747',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,      
    shadowRadius: 5,        
    elevation: 15,      
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#157541',
    marginBottom: 8,
    textAlign: 'center',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',  
  },
  perMonth: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#6b7280',
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#157541',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});