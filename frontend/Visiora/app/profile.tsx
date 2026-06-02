import {
  useCallback,
  useEffect,
  useState
} from "react";

import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

import {
  getProfile
} from "@/services/profile.services";
import { SubscriptionService } from "../services/SubscriptionServices";

import ProfileCard from "../components/profile/ProfileCard";
import PurchaseItem from "../components/profile/PurchaseItem";
import StatsSection from "../components/profile/StatsSection";

import Colors from "../constants/colors";

export default function ProfileScreen() {

  const router = useRouter();

  const [showLogoutModal, setShowLogoutModal] =
    useState(false);

  const [nama, setNama] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [jenisUsaha, setJenisUsaha] =
    useState("");

  const [subscriptionTier,
    setSubscriptionTier] =
    useState("Free");

  const fetchProfile = async () => {

    try {

      const response =
        await getProfile();

      console.log(response);

      setNama(
        response.data.name || ""
      );

      setEmail(
        response.data.email || ""
      );

      setJenisUsaha(
        response.data.enterprise_type || ""
      );

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Error",
        "Gagal mengambil profile"
      );
    }
  };

  const fetchSubscriptionTier = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      const tier = await SubscriptionService.getSubscriptionTier(token);
      setSubscriptionTier(tier);
    } catch (error) {
      console.log("fetchSubscriptionTier error:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchSubscriptionTier();
      return () => undefined;
    }, [])
  );

  const handleLogout = () => {

    setShowLogoutModal(false);

    router.replace("/");
  };

  return (
    <View style={styles.container}>

      <LinearGradient
        colors={[Colors.primary, "#e0f4f1"]}
        style={styles.header}
      >

        <TouchableOpacity
          style={styles.back}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={20}
            color="#0e0101"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Profil
        </Text>

      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        <ProfileCard
          name={nama}
          email={email}
          role={jenisUsaha}
          subscriptionStatus={subscriptionTier}
        />

        <StatsSection />

        <View style={styles.section}>

          <View style={styles.rowBetween}>

            <Text style={styles.sectionTitle}>
              Riwayat Pembelian
            </Text>

            <Text style={styles.seeAll}>
              Lihat Semua
            </Text>

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

        <TouchableOpacity
          style={styles.logout}
          onPress={() =>
            setShowLogoutModal(true)
          }
        >
          <Text style={styles.logoutText}>
            Logout
          </Text>
        </TouchableOpacity>

      </ScrollView>

      <Modal
        visible={showLogoutModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() =>
          setShowLogoutModal(false)
        }
      >

        <View style={styles.modalOverlay}>

          <View style={styles.modalContent}>

            <View style={styles.iconContainer}>

              <Ionicons
                name="log-out"
                size={50}
                color="#fff"
              />

            </View>

            <Text style={styles.modalTitle}>
              Logout Account
            </Text>

            <Text style={styles.modalSubtitle}>
              Apakah Anda Yakin Ingin Keluar Dari Akun Anda?
            </Text>

            <View style={styles.buttonContainer}>

              <TouchableOpacity
                style={styles.backButton}
                onPress={() =>
                  setShowLogoutModal(false)
                }
              >
                <Text style={styles.backButtonText}>
                  Back
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <Text style={styles.logoutButtonText}>
                  Logout
                </Text>
              </TouchableOpacity>

            </View>

          </View>

        </View>

      </Modal>

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

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 32,
    width: '85%',
    alignItems: 'center',
  },

  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#E63946',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },

  modalSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },

  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },

  backButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
  },

  backButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },

  logoutButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#E63946',
    alignItems: 'center',
  },

  logoutButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});