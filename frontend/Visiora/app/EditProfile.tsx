import { Ionicons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { useEffect, useState } from "react";

import {
  updateProfile,
  getProfile
} from "@/services/profile.services";

import Colors from "../constants/colors";

export default function EditProfileScreen() {

  const router = useRouter();

  const [nama, setNama] =
    useState("");

  const [alamat, setAlamat] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [jenisUsaha, setJenisUsaha] =
    useState("");

  const [tiktok, setTiktok] =
    useState("");

  const [instagram, setInstagram] =
    useState("");

  const [noWa, setNoWa] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showExitModal, setShowExitModal] =
    useState(false);

  const [initialData, setInitialData] =
    useState({
      nama: "",
      alamat: "",
      email: "",
      jenisUsaha: "",
      tiktok: "",
      instagram: "",
      noWa: "",
    });

  const fetchProfile = async () => {

    try {

      const response =
        await getProfile();

      console.log(response);

      setNama(response.data.name || "");
      setEmail(response.data.email || "");
      setAlamat(response.data.address || "");

      setJenisUsaha(
        response.data.enterprise_type || ""
      );

      setTiktok(
        response.data.tiktok || ""
      );

      setInstagram(
        response.data.instagram || ""
      );

      setNoWa(
        response.data.whatsapp || ""
      );

      setInitialData({
        nama: response.data.name || "",
        alamat: response.data.address || "",
        email: response.data.email || "",
        jenisUsaha:
          response.data.enterprise_type || "",
        tiktok: response.data.tiktok || "",
        instagram:
          response.data.instagram || "",
        noWa: response.data.whatsapp || "",
      });

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchProfile();

  }, []);

  const hasChanges =
    nama !== initialData.nama ||
    alamat !== initialData.alamat ||
    email !== initialData.email ||
    jenisUsaha !== initialData.jenisUsaha ||
    tiktok !== initialData.tiktok ||
    instagram !== initialData.instagram ||
    noWa !== initialData.noWa;

  const handleSave = async () => {

    try {

      const response =
        await updateProfile({
          name: nama,
          email: email,
          address: alamat,
          enterprise_name: nama,
          enterprise_type: jenisUsaha,
          tiktok: tiktok,
          instagram: instagram,
          whatsapp: noWa,
        });

      console.log(response);

      Alert.alert(
        "Success",
        "Profile berhasil diupdate"
      );

      router.back();

    } catch (error: any) {

      console.log(error);

      Alert.alert(
        "Error",
        error?.message || "Update gagal"
      );
    }
  };

  return (
    <View style={styles.container}>

      <LinearGradient
        colors={[Colors.primary, "#e0f4f1"]}
        style={styles.header}
      >

        <TouchableOpacity
          style={styles.back}
          onPress={() => {
            if (hasChanges) {
              setShowExitModal(true);
            } else {
              router.back();
            }
          }}
        >
          <Ionicons
            name="arrow-back"
            size={20}
            color="#000000"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Edit Profil
        </Text>

      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.profileCard}>

          <Image
            source={require("../assets/images/vivian.jpg")}
            style={styles.avatar}
          />

          <View style={{ flex: 1 }}>
            <Text style={styles.name}>
              {nama || "User"}
            </Text>

            <Text style={styles.role}>
              {jenisUsaha || "Jenis Usaha"}
            </Text>
          </View>

        </View>

        <View style={styles.card}>

          <Text style={styles.sectionTitle}>
            Data Usaha Pribadi
          </Text>

          <View style={styles.fieldContainer}>

            <View style={styles.labelRow}>
              <Feather
                name="user"
                size={16}
                color="#157541"
              />

              <Text style={styles.label}>
                Nama :
              </Text>
            </View>

            <TextInput
              style={styles.input}
              value={nama}
              onChangeText={setNama}
              placeholder="Masukkan nama"
            />

          </View>

          <View style={styles.fieldContainer}>

            <View style={styles.labelRow}>
              <Ionicons
                name="location-outline"
                size={16}
                color="#157541"
              />

              <Text style={styles.label}>
                Alamat/Lokasi :
              </Text>
            </View>

            <TextInput
              style={styles.input}
              value={alamat}
              onChangeText={setAlamat}
              placeholder="Masukkan alamat"
            />

          </View>

          <View style={styles.fieldContainer}>

            <View style={styles.labelRow}>
              <Ionicons
                name="mail-outline"
                size={16}
                color="#157541"
              />

              <Text style={styles.label}>
                Email :
              </Text>
            </View>

            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Masukkan email"
              keyboardType="email-address"
              autoCapitalize="none"
            />

          </View>

          <View style={styles.fieldContainer}>

            <View style={styles.labelRow}>
              <Feather
                name="briefcase"
                size={16}
                color="#157541"
              />

              <Text style={styles.label}>
                Jenis Usaha :
              </Text>
            </View>

            <TextInput
              style={styles.input}
              value={jenisUsaha}
              onChangeText={setJenisUsaha}
              placeholder="Masukkan jenis usaha"
            />

          </View>

          <View style={styles.fieldContainer}>

            <View style={styles.labelRow}>
              <Ionicons
                name="logo-tiktok"
                size={16}
                color="#157541"
              />

              <Text style={styles.label}>
                Akun Tiktok :
              </Text>
            </View>

            <TextInput
              style={styles.input}
              value={tiktok}
              onChangeText={setTiktok}
              placeholder="Masukkan akun tiktok"
            />

          </View>

          <View style={styles.fieldContainer}>

            <View style={styles.labelRow}>
              <Ionicons
                name="logo-instagram"
                size={16}
                color="#157541"
              />

              <Text style={styles.label}>
                Akun Instagram :
              </Text>
            </View>

            <TextInput
              style={styles.input}
              value={instagram}
              onChangeText={setInstagram}
              placeholder="Masukkan akun instagram"
            />

          </View>

          <View style={styles.fieldContainer}>

            <View style={styles.labelRow}>
              <Ionicons
                name="logo-whatsapp"
                size={16}
                color="#157541"
              />

              <Text style={styles.label}>
                Nomor WA :
              </Text>
            </View>

            <TextInput
              style={styles.input}
              value={noWa}
              onChangeText={setNoWa}
              placeholder="Masukkan nomor WA"
              keyboardType="phone-pad"
            />

          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>
              Simpan Perubahan
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>

      <Modal
        visible={showExitModal}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>

            <Text style={styles.modalTitle}>
              Keluar?
            </Text>

            <Text style={styles.modalSubtitle}>
              Apakah Anda yakin keluar tanpa menyimpan perubahan?
            </Text>

            <View style={styles.buttonContainer}>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() =>
                  setShowExitModal(false)
                }
              >
                <Text style={styles.cancelButtonText}>
                  Tidak
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.exitButton}
                onPress={() => {
                  setShowExitModal(false);
                  router.back();
                }}
              >
                <Text style={styles.exitButtonText}>
                  Ya
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

  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },

  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },

  role: {
    fontSize: 12,
    color: Colors.gray,
    marginTop: 2,
  },

  card: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#157541',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    textAlign: 'center',
  },

  fieldContainer: {
    marginBottom: 16,
  },

  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B7162',
  },

  input: {
    backgroundColor: '#cfe9e5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#000',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },

  saveButton: {
    backgroundColor: '#157541',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },

  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },

  modalSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#6B7280',
    marginBottom: 24,
  },

  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },

  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },

  cancelButtonText: {
    color: '#374151',
    fontWeight: '600',
  },

  exitButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#E63946',
    alignItems: 'center',
  },

  exitButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});