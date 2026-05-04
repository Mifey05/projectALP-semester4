import { Feather, Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Fonts from "../../constants/font";

export default function StatsSection() {
  return (
    <View style={styles.statsRow}>
      
      <TouchableOpacity style={styles.simpleCard}>
        <View>
          <View style={styles.topRowCard}>
            <Feather name="bookmark" size={22} color="#1E824C" />
            <Text style={styles.bigNumber}>10</Text>
          </View>

          <Text style={styles.titleCard}>Kelas yang disimpan</Text>
          <Text style={styles.descCard}>
            Lihat semua kelas yang sudah anda simpan
          </Text>
        </View>

        <Ionicons 
          name="chevron-forward" 
          size={22} 
          color="#3B7162"
          style={styles.arrowCenter}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.simpleCard}>
        <View>
          <View style={styles.topRowCard}>
            <Feather name="grid" size={22} color="#1E824C" />
            <Text style={styles.bigNumber}>10</Text>
          </View>

          <Text style={styles.titleCard}>Total Design</Text>
          <Text style={styles.descCard}>
            Lihat semua design yang sudah anda buat
          </Text>
        </View>

        <Ionicons 
          name="chevron-forward" 
          size={22} 
          color="#3B7162"
          style={styles.arrowCenter}
        />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 10,
  },
  simpleCard: {
    width: "48%",
    aspectRatio: 1,
    backgroundColor: "#F4F9F7",
    padding: 12,
    borderRadius: 12,
    justifyContent: "space-between",
  },
  topRowCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  bigNumber: {
    fontSize: 30,
    fontFamily: Fonts.semiBold,
    color: "#1E824C",
  },
  titleCard: {
    fontSize: 12,
    fontFamily: Fonts.semiBold,
    color: "#000",
    marginTop: 4,
  },
  descCard: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: "#6b7280",
    marginTop: 2,
  },
  arrowCenter: {
    position: "absolute",
    right: 12,
    top: "30%",
    transform: [{ translateY: -11 }],
  },
});