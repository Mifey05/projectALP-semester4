import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../constants/colors";

type Props = {
  onSelectCategory: (category: string) => void;
  selectedCategory?: string;
  categories?: string[];
};

const iconMap: Record<string, string> = {
  "Makanan & Minuman": "fast-food-outline",
  Fashion: "shirt-outline",
  Kecantikan: "rose-outline",
  Agribisnis: "leaf-outline",
  Otomotif: "car-outline",
  Perdagangan: "cart-outline",
  "Industri Pengolahan": "construct-outline",
  Pertanian: "nutrition-outline",
  Perkebunan: "tree-outline",
  Peternakan: "paw-outline",
  Perikanan: "fish-outline",
  Jasa: "briefcase-outline",
  Lainnya: "albums-outline",
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

export default function CategoryList({ onSelectCategory, selectedCategory, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategory ?? "Makanan & Minuman");

  useEffect(() => {
    if (selectedCategory) {
      setActiveCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const data = (categories && categories.length > 0
    ? categories
    : Object.keys(iconMap)
  ).map((label) => ({
    label,
    icon: iconMap[label] ?? "ellipse-outline",
  }));

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