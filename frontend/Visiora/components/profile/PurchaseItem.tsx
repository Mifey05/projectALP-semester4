import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/colors";

interface PurchaseItemProps {
  title: string;
  image: any;
  month: string;
}

export default function PurchaseItem({ title, image, month }: PurchaseItemProps) {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <Text>{title}</Text>
      <Text>{month}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
});