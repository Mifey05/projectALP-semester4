import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../constants/colors";

export default function TemplateCard({ title, desc, image }: any) {
  return (
    <View style={styles.card}>

      {}
      <View style={styles.imageWrapper}>
        <Image source={image} style={styles.image} />
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{desc}</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.btnText}>Gunakan</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    width: "48%",
    borderRadius: 18,
    padding: 10,
    overflow: "hidden",
    elevation: 3,
  },

  imageWrapper: {
    width: "100%",
    height: 200,          
    borderRadius: 12,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  title: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 6,
  },

  desc: {
    fontSize: 11,
    color: Colors.gray,
  },

  button: {
    backgroundColor: Colors.primaryDark,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 6,
  },

  btnText: {
    color: Colors.white,
    fontSize: 12,
    textAlign: "center",
  },
});