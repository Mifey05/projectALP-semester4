import { Ionicons } from "@expo/vector-icons";
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
  return (
    <View style={styles.container}>
      
      <LinearGradient
        colors={[Colors.primary, "#b7e4e0"]}
        style={styles.header}
      >
        <TouchableOpacity style={styles.back}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
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
            title="Warung Mas Aris"
            image={require("../assets/images/skincare1.jpg")}
            month="April"
          />
          <PurchaseItem
            title="Warung Ance Lory"
            image={require("../assets/images/skincare2.jpg")}
            month="Juni"
          />
          <PurchaseItem
            title="Warung Mas Dew"
            image={require("../assets/images/skincare3.jpg")}
            month="Juli"
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
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  back: {
    position: 'absolute',
    left: 16,
    top: 50,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
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
    color: Colors.primary,
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
  },
});