import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Header() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#7fc8c2", "#b7e4e0"]}
      style={styles.header}
    >
      <View style={styles.topRow}>
        <TouchableOpacity onPress={() => router.push("/profile")}>
          <Image
            source={require("../../assets/images/vivian.jpg")}
            style={styles.avatar}
          />
        </TouchableOpacity>

        <View>
          <Text style={styles.greeting}>Hai, Vivian Wijaya 👋</Text>
          <Text style={styles.sub}>Pemilik UMKM Kuliner</Text>
        </View>

      </View>

      <View style={styles.searchBox}>
        <TextInput placeholder="Cari Template" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingTop: 25,
    paddingBottom: 16,  
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center", 
    gap: 12,              
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "white",
  },

  greeting: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },

  sub: {
    color: "white",
    fontSize: 12,
  },

  searchBox: {
    marginTop: 12,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 8,      
    paddingHorizontal: 16, 
  },
});