import { Feather } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../constants/colors";
import Fonts from "../../constants/font";

export default function ProfileCard() {
  return (
    <View style={styles.profileCard}>
      <Image
        source={require("../../assets/images/vivian.jpg")}
        style={styles.avatar}
      />

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>Ahmad Sahroni</Text>
        <Text style={styles.role}>Penjual Sambel Bebek</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Free</Text>
        </View>
      </View>


      <TouchableOpacity style={styles.editBtn}>
        <Feather name="edit" size={14} color="#fff" />
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  role: {
    fontSize: 14,
    color: Colors.gray,
  },

  /* 🔥 JANGAN UBAH INI */
  badge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 4,
    alignSelf: "flex-start",
  },
  badgeText: {
    color: "#157541",
    fontSize: 10,
    fontFamily: Fonts.semiBold,
  },

  /* 🔥 JANGAN UBAH INI */
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  editText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
  },
});