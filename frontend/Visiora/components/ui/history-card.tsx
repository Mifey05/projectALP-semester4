import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

type Props = {
  title: string;
  desc: string;
  image: any;
};

export default function HistoryCard({ title, desc, image }: Props) {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{desc}</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Gunakan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 10,
    marginBottom: 14,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },

  image: {
    width: '100%',
    height: 110,
    borderRadius: 10,
    marginBottom: 8,
  },

  title: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },

  desc: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 8,
  },

  button: {
    backgroundColor: '#2F855A',
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});