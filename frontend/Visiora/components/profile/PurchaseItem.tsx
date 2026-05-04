import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/colors";

interface PurchaseItemProps {
  title: string;
  image: any;
  date: string;
  price: string;
  id: string;
  monthYear: string;
}

export default function PurchaseItem({ title, image, date, price, id, monthYear }: PurchaseItemProps) {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.monthText}>{monthYear}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="calendar-outline" size={14} color={Colors.gray} />
          <Text style={styles.dateText}>{date}</Text>
        </View>

        {/* Baris ID dan Harga */}
        <View style={styles.rowBetween}>
          <Text style={styles.idText}>{id}</Text>
          <Text style={styles.priceText}>{price}</Text>
        </View>
      </View>
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
  content: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#157541', 
  },
  monthText: {
    fontSize: 12,
    color: '#157541', 
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
    color: Colors.gray,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  idText: {
    fontSize: 12,
    color: '#9ca3af', 
  },
  priceText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000', 
  },
});