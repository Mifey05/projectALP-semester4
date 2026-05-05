import { useState } from "react";
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

export default function PaymentScreen() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState("OVO");

  return (
    <View style={styles.container}>
      <LinearGradient colors={[Colors.primary, "#FFFFFF"]} style={styles.header}>
        <TouchableOpacity style={styles.back} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Pembayaran</Text>
        <View style={{ width: 24 }} />
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Metode Pembayaran</Text>

          <TouchableOpacity
            style={styles.paymentMethod}
            onPress={() => setSelectedMethod("OVO")}
          >
            <View style={styles.paymentLeft}>
              <View
                style={[
                  styles.circle,
                  selectedMethod === "OVO" && styles.radioSelected,
                ]}
              >
                {selectedMethod === "OVO" && (
                  <View style={styles.radioInner} />
                )}
              </View>

              <Image
                source={require("../assets/images/ovo.png")}
                style={styles.paymentLogo}
              />

              <Text style={styles.paymentName}>OVO</Text>
            </View>

            <Text style={styles.paymentNumber}>OVO +628987****1</Text>
          </TouchableOpacity>

          {/* GOPAY */}
          <TouchableOpacity
            style={styles.paymentMethod}
            onPress={() => setSelectedMethod("GOPAY")}
          >
            <View style={styles.paymentLeft}>
              <View
                style={[
                  styles.circle,
                  selectedMethod === "GOPAY" && styles.radioSelected,
                ]}
              >
                {selectedMethod === "GOPAY" && (
                  <View style={styles.radioInner} />
                )}
              </View>

              <Image
                source={require("../assets/images/gopay.jpg")}
                style={styles.paymentLogo}
              />

              <Text style={styles.paymentName}>GOPAY</Text>
            </View>

            <Text style={styles.paymentNumber}>GOPAY +628987****1</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.paymentMethod}
            onPress={() => setSelectedMethod("DANA")}
          >
            <View style={styles.paymentLeft}>
              <View
                style={[
                  styles.circle,
                  selectedMethod === "DANA" && styles.radioSelected,
                ]}
              >
                {selectedMethod === "DANA" && (
                  <View style={styles.radioInner} />
                )}
              </View>

              <Image
                source={require("../assets/images/dana.png")}
                style={styles.paymentLogo}
              />

              <Text style={styles.paymentName}>DANA</Text>
            </View>

            <Text style={styles.paymentNumber}>DANA +628987****1</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.paymentMethod, styles.lastPaymentMethod]}
            onPress={() => setSelectedMethod("ShopeePay ")}
          >
            <View style={styles.paymentLeft}>
              <View
                style={[
                  styles.circle,
                  selectedMethod === "ShopeePay " && styles.radioSelected,
                ]}
              >
                {selectedMethod === "ShopeePay " && (
                  <View style={styles.radioInner} />
                )}
              </View>

              <Image
                source={require("../assets/images/ShopeePay.jpg")}
                style={styles.paymentLogo}
              />

              <Text style={styles.paymentName}>ShopeePay</Text>
            </View>

            <Text style={styles.paymentNumber}>ShopeePay +628987****1</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Ringkasan Pembayaran</Text>

          <View style={styles.rowBetween}>
            <Text style={styles.rowLabel}>Order Subtotal (1 items)</Text>
            <Text style={styles.rowValue}>Rp29.000</Text>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.rowLabel}>Pajak 10%</Text>
            <Text style={styles.rowValue}>Rp2.900</Text>
          </View>

          <View style={[styles.rowBetween, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Pembayaran</Text>
            <Text style={styles.totalValue}>Rp31.900</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.payButton}
          onPress={() => {
            router.push("/PembayaranBerhasil");
          }}
        >
          <Text style={styles.payButtonText}>Bayar</Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>
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
    paddingTop: 20,
  },
  back: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  card: {
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4},
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  paymentMethod: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  lastPaymentMethod: {
    borderBottomWidth: 0,
  },
  paymentLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  paymentLogo: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#d1d1d1",
    justifyContent: "center",
    alignItems: "center",
  },
  radioSelected: {
    borderColor: "#157541",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#157541",
  },
  paymentName: {
    fontSize: 14,
    fontWeight: "500",
  },
  paymentNumber: {
    fontSize: 12,
    color: "#6b7280",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  rowLabel: {
    fontSize: 14,
    color: "#6b7280",
  },
  rowValue: {
    fontSize: 14,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#157541",
  },
  payButton: {
    backgroundColor: "#157541",
    marginHorizontal: 16,
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 3,
  },
  payButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});