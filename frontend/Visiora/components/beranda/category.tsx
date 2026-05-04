import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/colors";

export default function CategoryList() {
  const data = [
    { label: "Fashion", icon: "shirt-outline" },
    { label: "Kuliner", icon: "restaurant-outline" },
    { label: "Kecantikan", icon: "rose-outline" },
    { label: "Lainnya", icon: "apps-outline" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kategori</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item) => (
          <View key={item.label} style={styles.item}>
            <Ionicons
              name={item.icon as any}
              size={14}
              color={Colors.primaryDark}
              style={styles.icon}
            />
            <Text style={styles.text}>{item.label}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
  },

  item: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: Colors.lightGray,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,

    borderWidth: 1.5,                
    borderColor: Colors.primaryDark,  

    marginRight: 10,
    marginTop: 10,
  },

  icon: {
    marginRight: 6,
  },

  text: {
    fontSize: 12,
    color: Colors.primaryDark,
    fontWeight: "500",
  },
});

