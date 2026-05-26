import { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import CategoryList from "../components/beranda/category";
import Header from "../components/beranda/Header";
import PremiumCard from "../components/beranda/premiumCard";
import TemplateCard from "../components/beranda/TemplateCard";
import Navbar from "../components/navbar/navbar";
import Colors from "../constants/colors";
import { fetchTemplatesByCategory } from "../services/TemplateService";
import { TemplateModel } from "../models/ListTemplate";

const categoryMapping: Record<string, string> = {
  "FnB": "Makanan & Minuman",
  "Fashion": "Fashion",
  "Beauty": "Kecantikan",
  "Agribusiness": "Agribisnis",
  "Automotive": "Otomotif",
  "Trading": "Perdagangan",
  "Processing Industry": "Industri Pengolahan",
  "Agriculture": "Pertanian",
  "Plantation": "Perkebunan",
  "Farm": "Peternakan",
  "Fishery": "Perikanan",
  "Service": "Jasa",
  "Other": "Lainnya"
};

const categoryToEnglish: Record<string, string> = {
  "Makanan & Minuman": "FnB",
  "Fashion": "Fashion",
  "Kecantikan": "Beauty",
  "Agribisnis": "Agribusiness",
  "Otomotif": "Automotive",
  "Perdagangan": "Trading",
  "Industri Pengolahan": "Processing Industry",
  "Pertanian": "Agriculture",
  "Perkebunan": "Plantation",
  "Peternakan": "Farm",
  "Perikanan": "Fishery",
  "Jasa": "Service",
  "Lainnya": "Other"
};

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Makanan & Minuman");
  const [templates, setTemplates] = useState<TemplateModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTemplates();
  }, [selectedCategory]);

  const loadTemplates = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const englishCategory = categoryToEnglish[selectedCategory];
      const data = await fetchTemplatesByCategory(englishCategory);
      setTemplates(data);
    } catch (err) {
      setError("Gagal memuat template");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getAllCategories = () => {
    return Object.values(categoryMapping);
  };

  return (
    <View style={styles.container}>
      
      <Header />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <PremiumCard />
        <CategoryList 
          onSelectCategory={setSelectedCategory}
        
          categories={getAllCategories()}
        />

        <View style={styles.section}>
          
          <View>
            <Text style={styles.title}>Template {selectedCategory}</Text>
            <Text style={styles.subtitle}>
              {templates.length} template tersedia
            </Text>
          </View>

          {loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={Colors.primaryDark} />
              <Text style={styles.loaderText}>Memuat template...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : (
            <View style={styles.grid}>
              {templates.map((template) => (
                <TemplateCard
                  key={template.id}
                  id={template.id}
                  title={template.title}
                  desc={template.caption}
                  image={{ uri: template.thumbnail }}
                />
              ))}
            </View>
          )}

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

  loaderContainer: {
    padding: 40,
    alignItems: "center",
  },

  loaderText: {
    marginTop: 10,
    color: Colors.gray,
    fontSize: 14,
  },

  errorContainer: {
    padding: 40,
    alignItems: "center",
  },

  errorText: {
    color: "red",
    fontSize: 14,
  },
});