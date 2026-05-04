import { ScrollView, StyleSheet, View } from "react-native";
import Colors from "../constants/colors";

import CategoryList from "../components/beranda/category";
import Header from "../components/beranda/Header";
import PremiumCard from "../components/beranda/premiumCard";
import TemplateCard from "../components/beranda/TemplateCard";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      
      <Header />

      <ScrollView showsVerticalScrollIndicator={false}>
        <PremiumCard />
        <CategoryList />

        {
      }
        <View style={styles.section}>
          
          <View>
            <Text style={styles.title}>Template</Text>
            <Text style={styles.subtitle}>
              Template terbaik untuk meningkatkan penjualanmu
            </Text>
          </View>

          <View style={styles.grid}>
            <TemplateCard
              title="Radiance Beauty"
              desc="Tampil lebih percaya diri dengan sentuhan kecantikan"
              image={require("../assets/images/food1(1).jpg")}
            />

            <TemplateCard
              title="Skin Care Sale 50%"
              desc="Saatnya skincare favorit dengan diskon hingga 50%!"
              image={require("../assets/images/food1(2).jpg")}
            />
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

import { Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  section: {
    paddingHorizontal: 16,
    marginTop: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
  },

  subtitle: {
    fontSize: 12,
    color: Colors.gray,
    marginBottom: 10,
  },

  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});