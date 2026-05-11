import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import CategoryList from "../components/beranda/category";
import Header from "../components/beranda/Header";
import PremiumCard from "../components/beranda/premiumCard";
import TemplateCard from "../components/beranda/TemplateCard";
import Navbar from "../components/navbar/navbar";
import Colors from "../constants/colors";

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Makanan & Minuman");
  const templatesByCategory: Record<string, Array<{title: string, desc: string, image: any}>> = {
    "Makanan & Minuman": [
      {
        title: "diskon 50% Nasgor",
        desc: "Nasi goreng spesial dengan diskon 50% untuk pelanggan setia!",
        image: require("../assets/images/food1(1).jpg")
      },
      {
        title: "pisang sulawesi mantap",
        desc: "kicau kicauu harga namun rasa tetap mantap untuk pelanggan setia!",
        image: require("../assets/images/food1(2).jpg")
      },
      {
        title: "Mie Aceh Spesial",
        desc: "Mie aceh dengan cita rasa khas, potongan daging melimpah!",
        image: require("../assets/images/mie_aceh.jpg")
      },
      {
        title: "Nasi Ayam Bakar",
        desc: "Nasi ayam bakar dengan sambal matah yang nikmat!",
        image: require("../assets/images/nasi_ayam.jpg")
      }
    ],
    "Fashion": [
      {
        title: "Kaos Polos Premium",
        desc: "Kaos berkualitas tinggi, nyaman dipakai sehari-hari!",
        image: require("../assets/images/fashion1.jpg")
      },
      {
        title: "Jaket Denim Trendy",
        desc: "Jaket denim model terbaru untuk tampil keren!",
        image: require("../assets/images/fashion2.jpg")
      },
      {
        title: "Hoodie Casual",
        desc: "Hoodie dengan bahan tebal dan nyaman!",
        image: require("../assets/images/fashion3.jpg")
      },
      {
        title: "Kemeja Flanel",
        desc: "Kemeja flanel pria dengan motif kekinian!",
        image: require("../assets/images/fashion4.jpg")
      }
    ],
    "Kecantikan": [
      {
        title: "Skincare Routine",
        desc: "Paket skincare lengkap untuk wajah cerah!",
        image: require("../assets/images/kecantikan1.jpg")
      },
      {
        title: "Masker Wajah Alami",
        desc: "Masker dari bahan alami untuk kulit sehat!",
        image: require("../assets/images/kecantikan2.jpg")
      },
      {
        title: "Serum Vitamin C",
        desc: "Serum dengan vitamin C untuk kulit bercahaya!",
        image: require("../assets/images/kecantikan3.jpg")
      },
      {
        title: "Sunscreen SPF 50",
        desc: "Perlindungan maksimal dari sinar UV!",
        image: require("../assets/images/kecantikan4.jpg")
      }
    ],
    "Agribisnis": [
      {
        title: "Pupuk Organik",
        desc: "Pupuk berkualitas untuk hasil panen melimpah!",
        image: require("../assets/images/agribisnis1.jpg")
      },
      {
        title: "Bibit Unggul",
        desc: "Bibit tanaman dengan kualitas terbaik!",
        image: require("../assets/images/agribisnis2.jpg")
      },
      {
        title: "Alat Pertanian Modern",
        desc: "Peralatan pertanian canggih untuk hasil maksimal!",
        image: require("../assets/images/agribisnis3.jpg")
      },
      {
        title: "Sistem Irigasi",
        desc: "Sistem irigasi tetes hemat air dan efisien!",
        image: require("../assets/images/agribisnis4.jpg")
      }
    ]
  };

  const currentTemplates = templatesByCategory[selectedCategory] || templatesByCategory["Makanan & Minuman"];

  return (
    <View style={styles.container}>
      
      <Header />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <PremiumCard />
        <CategoryList onSelectCategory={setSelectedCategory} />

        <View style={styles.section}>
          
          <View>
            <Text style={styles.title}>Template {selectedCategory}</Text>
            <Text style={styles.subtitle}>
            </Text>
          </View>

          <View style={styles.grid}>
            {currentTemplates.map((template, index) => (
              <TemplateCard
                key={index}
                title={template.title}
                desc={template.desc}
                image={template.image}
              />
            ))}
          </View>

        </View>
      </ScrollView>

      <Navbar />

    </View>
  );
}

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
    marginTop: 3
  },

  subtitle: {
    fontSize: 12,
    color: Colors.gray,
    marginBottom: 10,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 16, 
    columnGap: 12, 
     marginTop: -8,
  },
});