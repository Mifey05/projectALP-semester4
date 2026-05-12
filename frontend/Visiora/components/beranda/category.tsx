import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../constants/colors";

type Props = {
  onSelectCategory: (category: string) => void;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8, 
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
  itemActive: {
    backgroundColor: Colors.primaryDark, 
    borderColor: Colors.primaryDark,
  },
  icon: {
    marginRight: 6,
  },
  textActive: {
    color: Colors.white,
  },
  text: {
    fontSize: 12,
    color: Colors.primaryDark,
    fontWeight: "500",
  },
});

export default function CategoryList({ onSelectCategory }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("Makanan & Minuman");

  const data = [
    { label: "Makanan & Minuman", icon: "fast-food-outline" },
    { label: "Fashion", icon: "shirt-outline" },
    { label: "Kecantikan", icon: "rose-outline" },
    { label: "Agribisnis", icon: "leaf-outline" },
    { label: "Otomotif", icon: "car-outline" },
    { label: "Perdagangan", icon: "cart-outline" },
    { label: "Industri Pengolahan", icon: "construct-outline" },
    { label: "Pertanian", icon: "nutrition-outline" },
    { label: "Perkebunan", icon: "tree-outline" },
    { label: "Peternakan", icon: "paw-outline" },
    { label: "Perikanan", icon: "fish-outline" },
    { label: "Jasa", icon: "briefcase-outline" },
  ];
  const handlePress = (label: string) => {
    setActiveCategory(label); 
    onSelectCategory(label);  
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kategori</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item) => {
          const isActive = activeCategory === item.label;
          
          return (
            <TouchableOpacity
              key={item.label}
              style={[styles.item, isActive && styles.itemActive]}
              onPress={() => handlePress(item.label)} 
            >
              <Ionicons
                name={item.icon as any}
                size={14}
                color={isActive ? Colors.white : Colors.primaryDark} 
                style={styles.icon}
              />
              <Text style={[styles.text, isActive && styles.textActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}