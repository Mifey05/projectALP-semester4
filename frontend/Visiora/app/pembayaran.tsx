import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from "react-native";
import Colors from "../constants/colors";
import { PaymentService } from "../services/payment.services";
import { PaymentMethodModel } from "../models/PaymentMethodModel";

export default function PaymentScreen() {
  const router = useRouter();
  const { planId } = useLocalSearchParams<{ planId: string }>();
  const [selectedMethod, setSelectedMethod] = useState<number | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const methods = await PaymentService.getPaymentMethods();
        setPaymentMethods(methods);
        if (methods.length > 0) {
          setSelectedMethod(methods[0].id);
        }
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentMethods();
  }, []);

  const handlePay = async () => {
    if (!planId || selectedMethod === null) {
      console.error("Plan ID or payment method tidak tersedia.");
      return;
    }

    const selectedProvider = paymentMethods.find(
      (method) => method.id === selectedMethod
    )?.name;

    if (!selectedProvider) {
      console.error("Selected payment provider tidak ditemukan.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await PaymentService.createPayment(
        Number(planId),
        selectedProvider
      );

      const transactionId = result?.transaction_id ?? result?.transactionId;

      if (!transactionId) {
        console.error("createPayment tidak mengembalikan transaction_id", result);
        return;
      }

      router.push(`/PembayaranBerhasil?transactionId=${transactionId}`);
    } catch (error) {
      console.error("Error creating payment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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

          {loading ? (
            <View style={{alignItems: 'center', paddingVertical: 20}}>
              <ActivityIndicator size="large" color={Colors.primary} />
            </View>
          ) : paymentMethods.length === 0 ? (
            <Text style={{textAlign: 'center', color: '#6b7280', paddingVertical: 20}}>Tidak ada metode pembayaran</Text>
          ) : (
            paymentMethods.map((method, index) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentMethod,
                  index === paymentMethods.length - 1 && styles.lastPaymentMethod,
                ]}
                onPress={() => setSelectedMethod(method.id)}
              >
                <View style={styles.paymentLeft}>
                  <View
                    style={[
                      styles.circle,
                      selectedMethod === method.id && styles.radioSelected,
                    ]}
                  >
                    {selectedMethod === method.id && (
                      <View style={styles.radioInner} />
                    )}
                  </View>

                  <Image
                    source={
                      method.name.toUpperCase() === "OVO"
                        ? require("../assets/images/ovo.png")
                        : method.name.toUpperCase() === "GOPAY"
                        ? require("../assets/images/gopay.jpg")
                        : method.name.toUpperCase() === "DANA"
                        ? require("../assets/images/dana.png")
                        : require("../assets/images/ShopeePay.jpg")
                    }
                    style={styles.paymentLogo}
                  />

                  <Text style={styles.paymentName}>{method.name}</Text>
                </View>

                <Text style={styles.paymentNumber}>
                  {method.name} +{method.accountNumber}
                </Text>
              </TouchableOpacity>
            ))
          )}
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
          onPress={handlePay}
          disabled={loading || isSubmitting || selectedMethod === null}
        >
          <Text style={styles.payButtonText}>
            {isSubmitting ? "Memproses..." : "Bayar"}
          </Text>
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