import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import Colors from "../../constants/colors";
import Fonts from "../../constants/font";

type Props = {
  name?: string;
  email?: string;
  role?: string;
  subscriptionStatus?: string;
};

export default function ProfileCard({
  name,
  email,
  role,
  subscriptionStatus = "Free",
}: Props) {

  const router = useRouter();
  const badgeLabel =
    subscriptionStatus === "Free" || subscriptionStatus === "0"
      ? "Free"
      : "Premium";

  return (
    <View style={styles.profileCard}>

      <Image
        source={require("../../assets/images/vivian.jpg")}
        style={styles.avatar}
      />

      <View style={{ flex: 1 }}>

        <Text style={styles.name}>
          {name || "User"}
        </Text>

        <Text style={styles.role}>
          {role || "Jenis Usaha"}
        </Text>

        <View style={[
          styles.badge,
          badgeLabel === "Free"
            ? styles.freeBadge
            : styles.paidBadge
        ]}>
          <Text style={[
            styles.badgeText,
            badgeLabel !== "Free" && styles.paidBadgeText
          ]}>
            {badgeLabel}
          </Text>
        </View>

      </View>

      <TouchableOpacity
        style={styles.editBtn}
        onPress={() =>
          router.push("/EditProfile")
        }
      >

        <Feather
          name="edit"
          size={14}
          color="#fff"
        />

        <Text style={styles.editText}>
          Edit Profile
        </Text>

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
    fontSize: 12,
    color: Colors.gray,
  },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 4,
    alignSelf: "flex-start",
  },

  freeBadge: {
    backgroundColor: '#D8ECE4',
  },

  paidBadge: {
    backgroundColor: '#D9E8FF',
  },

  badgeText: {
    color: "#157541",
    fontSize: 10,
    fontWeight: 'bold',
  },

  paidBadgeText: {
    color: "#1B4FA5",
  },

  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#157541',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },

  editText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
});