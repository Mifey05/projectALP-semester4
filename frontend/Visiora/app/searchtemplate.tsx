import { View, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PromoCard from '@/components/promo-card';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const DATA = [
  {
    id: '1',
    image: require('../assets/images/coffee1.jpg'),
  },
  {
    id: '2',
    image: require('../assets/images/coffee2.jpg'),
  },
  {
    id: '3',
    image: require('../assets/images/pudding.jpg'),
  },
  {
    id: '4',
    image: require('../assets/images/menu.jpeg'),
  },
  {
    id: '5',
    image: require('../assets/images/drink.jpg'),
  },
  {
    id: '6',
    image: require('../assets/images/ice.jpg'),
  },
  {
    id: '7',
    image: require('../assets/images/coffee3.jpg'),
  },
];

export default function HomeScreen() {
  const router = useRouter();

  const leftColumn = DATA.filter((_, i) => i % 2 === 0);
  const rightColumn = DATA.filter((_, i) => i % 2 !== 0);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>

      <LinearGradient
        colors={['#8cc8c0', '#FFFFFF']}
        style={styles.topSection}
      >

        <View style={styles.header}>
          <Pressable
            style={styles.backBtn}
            onPress={() => router.replace('/beranda')}
          >
            <Ionicons name="arrow-back" size={16} color="#fff" />
          </Pressable>

          <TextInput
            placeholder="promosi kopi"
            placeholderTextColor="#888"
            style={styles.search}
          />
        </View>

      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>

          <View style={styles.column}>
            {leftColumn.map((item) => (
              <PromoCard key={item.id} item={item} variant="short" />
            ))}
          </View>

          <View style={styles.column}>
            {rightColumn.map((item) => (
              <PromoCard key={item.id} item={item} variant="tall" />
            ))}
          </View>

        </View>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  topSection: {
    paddingTop: 45,
    paddingBottom: 15,
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2F7D62',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },

  search: {
    flex: 1,
    height: 36,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    paddingHorizontal: 14,
    fontSize: 12,
  },

  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingTop: 10, 
  },

  column: {
    width: '48%',
  },
});