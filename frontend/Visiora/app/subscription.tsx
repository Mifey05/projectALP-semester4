import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {ScrollView, StyleSheet,   Text, TouchableOpacity, View, ActivityIndicator} from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constants/colors";
import Navbar from "../components/navbar/navbar";

import { SubscriptionService } from "../services/SubscriptionServices";
import { SubscriptionPlanModel } from "../models/SubscriptionPlanModel";

export default function SubscriptionScreen() {
  const router = useRouter();

  const [plans, setPlans] = useState<SubscriptionPlanModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          console.log("Token tidak ditemukan");
          return;
        }

        const data =
          await SubscriptionService.getSubscriptionPlans(token);

        setPlans(data);
      } catch (error) {
        console.log("Fetch subscription error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const getPriceText = (tier: string) => {
    if (tier === "0") return "Gratis";
    if (tier === "1") return "Rp49.000";
    if (tier === "2") return "Rp149.000";
    return "-";
  };

  const getDescription = (tier: string) => {
    if (tier === "0")
      return "Akses dasar untuk mencoba fitur Visiora";
    if (tier === "1")
      return "Untuk 2 device, caption lebih banyak + akses kelas dasar";
    if (tier === "2")
      return "Untuk 3 device, akses semua fitur premium";
    return "";
  };

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
        {loading && (
          <ActivityIndicator
            size="large"
            color={Colors.primary}
            style={{ marginTop: 40 }}
          />
        )}

        {!loading &&
          plans.map((plan) => (
            <View key={plan.id} style={styles.card}>
              <Text style={styles.cardTitle}>{plan.name}</Text>

              <Text style={styles.price}>
                {getPriceText(plan.tier)}
                <Text style={styles.perMonth}> / bulan</Text>
              </Text>

              <Text style={styles.description}>
                {getDescription(plan.tier)}
              </Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/pembayaran")}
              >
                <Text style={styles.buttonText}>Dapatkan Premium</Text>
              </TouchableOpacity>
            </View>
          ))}
      </ScrollView>

      <Navbar />
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
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  back: {
    position: "absolute",
    left: 16,
    top: 35,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 24,
    borderRadius: 12,
    shadowColor: "#474747",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#157541",
    marginBottom: 8,
    textAlign: "center",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 8,
    textAlign: "center",
  },
  perMonth: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#6b7280",
  },
  description: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
    marginBottom: 16,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#157541",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});