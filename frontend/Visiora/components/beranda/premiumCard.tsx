import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PremiumCard() {
  const router = useRouter();
  const premiumPackages = [
    {
      title: "Jualan lebih laris\n dalam sekali klik",
      desc: "Kelola platform, strategi promosi\n yang siap dipakai untuk UMKM",
    },
    {
      title: "Promosi otomatis\ntanpa ribet",
      desc: "Template AI & caption otomatis\nsiap digunakan kapan saja",
    },
    {
      title: "Pantau penjualan\nsecara real-time",
      desc: "Laporan performa bisnis\nlangsung dari dashboard",
    },
  ];

  return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 8,
          paddingTop: 15,     
          paddingBottom: 4,
        }}
      >
      {premiumPackages.map((item, index) => (
        <LinearGradient
          key={index}
          colors={["#5fb3a9", "#7fc8c2"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <View style={styles.row}>
            <View style={styles.content}>
              <Text style={styles.premium}>⭐ PREMIUM</Text>

              <Text style={styles.title}>{item.title}</Text>

              <Text style={styles.desc}>{item.desc}</Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/subscription")}
              >
                <Text style={styles.btnText}>Coba Fitur Premium</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Image
            source={require("../../assets/images/HOOK VISIORA.png")}
            style={styles.image}
          />
        </LinearGradient>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 360,            
    marginHorizontal: 8,
    borderRadius: 20,
    padding: 16,
    position: "relative",
  },

  row: {
    flexDirection: "row",
  },

  content: {
    flex: 1,
    paddingRight: -10,
  },

  premium: {
    color: "white",
    fontSize: 11,
    fontWeight: "600",
  },

  title: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
    marginTop: 6,
  },

  desc: {
    color: "white",
    fontSize: 12,
    marginTop: 6,
    opacity: 0.9,
  },

  button: {
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 10,
    alignSelf: "flex-start",
  },

  btnText: {
    color: "#5fb3a9",
    fontSize: 12,
    fontWeight: "600",
  },

  image: {
    position: "absolute",
    right: -20,
    bottom: -27,
    width: 185,
    height: 180,
    resizeMode: "contain",
  },
});