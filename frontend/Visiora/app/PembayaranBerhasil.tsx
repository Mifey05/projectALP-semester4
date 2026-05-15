import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from "react-native";

export default function PembayaranBerhasil() {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const dotAnim = useRef(new Animated.Value(0)).current;
  const receiptAnim = useRef(new Animated.Value(0)).current;

  const [isProcessing, setIsProcessing] = useState(true);
  const transactionId = 1;
  const MAX_RETRY = 10;
  const TOTAL_TIME = 2000;            
  const INTERVAL = TOTAL_TIME / MAX_RETRY; 

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

    Animated.loop(
      Animated.sequence([
        Animated.timing(dotAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(dotAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
    let attempt = 0;
    let finished = false;

    const checkPaymentStatus = async () => {
      if (finished) return;

      attempt++;
      console.log(`Cek status ke-${attempt}`);

      try {
        const response = await fetch(
          `/api/payment/status/${transactionId}`
        );
        const data = await response.json();

        if (data.status === "SUCCESS") {
          finished = true;
          clearInterval(intervalId);

          setIsProcessing(false);
          Animated.timing(receiptAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start();
        }
      } catch (error) {
        console.log("Error cek status:", error);
      }

      if (attempt >= MAX_RETRY) {
        clearInterval(intervalId);
      }
    };

    const intervalId = setInterval(checkPaymentStatus, INTERVAL);
    const timeoutId = setTimeout(() => {
      if (!finished) {
        clearInterval(intervalId);

        setIsProcessing(false);
        Animated.timing(receiptAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }
    }, TOTAL_TIME);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.animationContainer}>
          <Animated.View
            style={[
              styles.checkCircle,
              { transform: [{ scale: scaleAnim }] },
            ]}
          >
            <Ionicons
              name={isProcessing ? "time-outline" : "checkmark"}
              size={50}
              color="#FFF"
            />
          </Animated.View>
        </View>

        <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
          <Text style={styles.successTitle}>
            {isProcessing ? "Memproses Pembayaran" : "Pembayaran Berhasil!"}
          </Text>

          {isProcessing && (
            <View style={{ alignItems: "center", marginBottom: 20 }}>
              <View style={{ flexDirection: "row", gap: 8 }}>
                {[0, 1, 2].map((i) => (
                  <Animated.View
                    key={i}
                    style={[
                      styles.dot,
                      {
                        transform: [
                          {
                            translateY: dotAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, -6],
                            }),
                          },
                        ],
                        opacity: dotAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.3, 1],
                        }),
                      },
                    ]}
                  />
                ))}
              </View>
            </View>
          )}

          {!isProcessing && (
            <Animated.View style={{ opacity: receiptAnim }}>
              <View style={styles.receiptCard}>
                <View style={styles.row}>
                  <Text style={styles.label}>Harga</Text>
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
                  <Text style={styles.label}>Waktu</Text>
                  <Text style={styles.value}>20.03.2022 - 19:28:30</Text>
                </View>

                <View style={styles.divider} />

                <View style={[styles.row, styles.totalRow]}>
                  <Text style={styles.totalLabel}>Total Pembayaran</Text>
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
                  <Text style={styles.homeButtonText}>
                    Kembali ke Halaman Utama
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
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
  },
  value: {
    fontSize: 14,
    color: "#1F2937",
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
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#157541",
  },
});