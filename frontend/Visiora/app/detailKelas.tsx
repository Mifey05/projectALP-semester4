import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

import Colors from "../constants/colors";

export default function DetailKelasScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient colors={[Colors.primary, "#e0f4f1"]} style={styles.header}>
        <TouchableOpacity style={styles.back} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Detail Kelas</Text>
        <View style={{ width: 24 }} />
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/kelas4.jpg")}
            style={styles.classImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.content}>

          <Text style={styles.classTitle}>Dasar Jualan UMKM</Text>
          <Text style={styles.description}>
            Mulai dari nol, pelajari cara menemukan ide jualan, menarik pembeli pertama, dan membangun dasar usaha yang kuat.
          </Text>

          <View style={styles.divider} />
          <View style={styles.scheduleRow}>
            <Ionicons name="calendar-outline" size={20} color={Colors.primary} />
            <Text style={styles.scheduleText}>
              Minggu 12 April 2026 | Pukul 14.00 WITA (Zoom)
            </Text>
          </View>

          <View style={styles.scheduleRow}>
            <Ionicons name="location-outline" size={20} color={Colors.primary} />
            <Text style={styles.locationText}>
              RCMM+MPH, JL A. P. Pettarani No, Banta-Bantaeng, Kec. Rappocini, Kota Makassar, Sulawesi Selatan 90222
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomButton}>
        <TouchableOpacity style={styles.daftarButton}>
          <LinearGradient
            colors={["#0e5530", "#0e5530"]}
            style={styles.gradientButton}
          >
            <Text style={styles.daftarButtonText}>Daftar</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  back: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 12,
    marginBottom: 15,
  },
  classImage: {
    width: 300,             
    height: 410,             
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  tagGratisText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 12,
  },
  classTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
    textAlign: "center",
  },
  promoBox: {
    backgroundColor: "#F0FDF4",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  promoText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  promoBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  promoBadgeText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 12,
  },
  promoSubText: {
    fontSize: 12,
    color: "#6B7280",
  },
  description: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 18,
    marginBottom: 16,
    textAlign: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 12,
  },
  scheduleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 16,
  },
  scheduleText: {
    flex: 1,
    fontSize: 14,
    color: "#374151",
  },
  locationText: {
    flex: 1,
    fontSize: 14,
    color: "#374151",
  },
  bottomButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  daftarButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  gradientButton: {
    paddingVertical: 14,
    alignItems: "center",
  },
  daftarButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});