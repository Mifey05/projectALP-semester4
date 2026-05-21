import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/colors";

interface StatsCardProps {
  title: string;
}

export default function StatsCard({ title }: StatsCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text>10</Text>
        <Text>{title}</Text>
      </View>

      <View style={styles.card}>
        <Text>10</Text>
        <Text>Kelas yang diikuti</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  card: {
    backgroundColor: Colors.white,
    width: "48%",
    padding: 12,
    borderRadius: 12,
  },
});