import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";  // ← tambah ini
import { LinearGradient } from "expo-linear-gradient";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import ProfileCard from "../components/profile/ProfileCard";
import PurchaseItem from "../components/profile/PurchaseItem";
import StatsSection from "../components/profile/StatsSection";

import Colors from "../constants/colors";

export default function ProfileScreen() {
  const router = useRouter();  
  return (
    <View style={styles.container}>
      
      <LinearGradient
         colors={[Colors.primary, "#e0f4f1"]}
        style={styles.header}
      >
        <TouchableOpacity style={styles.back} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color="#0e0101" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Profil</Text>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileCard />
        <StatsSection />

        <View style={styles.section}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Riwayat Pembelian</Text>
            <Text style={styles.seeAll}>Lihat Semua</Text>
          </View>

        <PurchaseItem
            title="Kelas Menaikkan UMKM"
            image={require("../assets/images/kelas1.jpg")}
            date="28 April 2026"
            price="Rp79.000 / bulan"
            id="ID235681824"
            monthYear="April"
        />
        <PurchaseItem
            title="Tips menarik pelanggan"
            image={require("../assets/images/kelas2.jpg")}
            date="29 April 2026"
            price="Rp79.000 / bulan"
            id="ID235681824"
            monthYear="Juni"
        />
        <PurchaseItem
            title="Cara membuat konten menarik"
            image={require("../assets/images/kelas3.jpg")}
            date="20 April 2026"
            price="Rp79.000 / bulan"
            id="ID235681824"
            monthYear="Juli"
        />
        </View>

        <TouchableOpacity style={styles.logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  back: {
    position: 'absolute',
    left: 16,
    top: 30,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  section: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: 14,
    color: '#27AB64',
  },
  logout: {
    backgroundColor: '#ff4444',
    marginHorizontal: 16,
    marginVertical: 20,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});