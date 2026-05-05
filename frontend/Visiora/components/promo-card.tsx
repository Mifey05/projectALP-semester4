import { View, Text, ImageBackground, StyleSheet, Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function PromoCard({ item, variant }: any) {
  const router = useRouter();
  const height = variant === 'tall' ? 255 : 195;

  return (
    <ImageBackground
      source={item.image}
      style={[styles.card, { height }]}
      imageStyle={styles.image}
    >

      {item.extraImage && (
        <Image source={item.extraImage} style={styles.extraImage} />
      )}

      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>

        <Pressable
          style={({ pressed }) => [
            styles.buttonWrapper,
            { transform: [{ scale: pressed ? 0.96 : 1 }] }
          ]}
          onPress={() => router.push('/edit-desain')}
        >
          <View style={styles.button}>

            <Text style={styles.buttonText}>Gunakan</Text>

          </View>
        </Pressable>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 10,
    justifyContent: 'flex-end',
  },

  image: {
    borderRadius: 14,
  },

  content: {
    paddingHorizontal: 8,
    paddingBottom: 8,
  },

  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  extraImage: {
    position: 'absolute',
    left: 0,
    top: 40,
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },

  buttonWrapper: {
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ffffff',
    overflow: 'hidden',
  },

  button: {
    backgroundColor: '#2F7D62',
    paddingVertical: 5,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
  },
});