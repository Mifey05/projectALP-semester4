import { ThemedText } from '@/components/themed-text';
import { useState } from 'react';
import {
    Alert,
    ImageBackground,
    Pressable,
    SafeAreaView,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';

export default function RegisterScreen({ navigation }: any) {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleRegister = () => {
    if (!nama || !email || !password || !confirm) {
      Alert.alert('Error', 'Semua field harus diisi!');
      return;
    }

    if (password !== confirm) {
      Alert.alert('Error', 'Password tidak sama!');
      return;
    }

    Alert.alert('Success', 'Registrasi berhasil!');
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('@/assets/images/bg.png')}
        style={styles.background}
        resizeMode="cover"
        imageStyle={{ opacity: 0.9 }}
      >
        <View style={styles.container}>
          <View style={styles.panel}>
            <ThemedText style={styles.title}>Registration</ThemedText>

            <View style={styles.field}>
              <ThemedText style={styles.label}>Nama Pemilik Usaha</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Nama pemilik usaha"
                value={nama}
                onChangeText={setNama}
                />
            </View>

            <View style={styles.field}>
              <ThemedText style={styles.label}>Email</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Masukkan gmail anda"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.field}>
              <ThemedText style={styles.label}>Kata sandi</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Masukkan kata sandi"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View style={styles.field}>
              <ThemedText style={styles.label}>Konfirmasi kata sandi</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Konfirmasi Kata Sandi"
                secureTextEntry
                value={confirm}
                onChangeText={setConfirm}
              />
            </View>

            <Pressable style={styles.button} onPress={handleRegister}>
              <ThemedText style={styles.buttonText}>Sign Up</ThemedText>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('Login')}>
              <ThemedText style={styles.loginText}>
                Do you have an account? Log In
              </ThemedText>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E8F7F1',
  },
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  panel: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.98)',
    paddingVertical: 22,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 18,
    elevation: 8,
    },
  title: {
    textAlign: 'center',
    color: '#166534',
    fontSize: 20,
    marginBottom: 18,
    fontWeight: '700',
  },
  field: {
    marginBottom: 10,
  },
  label: {
    color: '#166534',
    fontSize: 13,
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
    paddingHorizontal: 14,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#166534',
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  loginText: {
    textAlign: 'center',
    marginTop: 12,
    color: '#166534',
    fontSize: 13,
  },
});