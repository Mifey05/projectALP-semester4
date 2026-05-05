import { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function PembayaranBerhasil() {
  const router = useRouter();
  
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 7,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.animationContainer}>
          <Animated.View
            style={[
              styles.checkCircle,
              {
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <Ionicons name="checkmark" size={50} color="#FFF" />
          </Animated.View>
        </View>

        <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
          <Text style={styles.successTitle}>Payment Successful</Text>

          <View style={styles.receiptCard}>
            <View style={styles.row}>
              <Text style={styles.label}>Price</Text>
              <Text style={styles.value}>Rp100.000</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Tax 10%</Text>
              <Text style={styles.value}>Rp20.000</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>No. Order</Text>
              <Text style={styles.value}>1876543234567876</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Total items</Text>
              <Text style={styles.value}>2 Products</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Time</Text>
              <Text style={styles.value}>20.03.2022 - 19:28:30</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Payment Method</Text>
              <Text style={styles.value}>OVO</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>Vivian Wijaya</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>vivian.wijaya@student.browjiaya.ac.id</Text>
            </View>

            <View style={styles.divider} />

            <View style={[styles.row, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total Payment</Text>
              <Text style={styles.totalValue}>Rp120.000</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => router.replace("/beranda")}
          >
            <LinearGradient
              colors={["#157541", "#0e5530"]}
              style={styles.gradientButton}
            >
              <Text style={styles.homeButtonText}>Kembali ke Halaman Utama</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  animationContainer: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 20,
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#157541",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#157541",
  },
  receiptCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  value: {
    fontSize: 14,
    color: "#1F2937",
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 12,
  },
  totalRow: {
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#157541",
  },
  homeButton: {
    marginBottom: 30,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  gradientButton: {
    paddingVertical: 14,
    alignItems: "center",
  },
  homeButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});