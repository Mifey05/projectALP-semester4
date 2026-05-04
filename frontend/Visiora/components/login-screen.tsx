import { useState } from 'react';
import { Image, ImageBackground, Pressable, SafeAreaView, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('@/assets/images/bg.png')}
        resizeMode="cover"
        style={styles.background}
        imageStyle={styles.backgroundImage}>
        <View style={styles.container}>
          <View style={styles.panel}>
            <ThemedText type="title" style={styles.title}>
              Log In
            </ThemedText>
            <ThemedText style={styles.subtitle}>Log in to your account</ThemedText>

            <View style={styles.fieldGroup}>
              <ThemedText style={styles.fieldLabel}>Email</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Example@gmail.com"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.fieldGroup}>
              <ThemedText style={styles.fieldLabel}>Password</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Enter 8 characters"
                placeholderTextColor="#9ca3af"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <Pressable style={styles.forgotButton}>
                <ThemedText style={styles.forgotText}>Forgot Password?</ThemedText>
              </Pressable>
            </View>

            <Pressable
              style={styles.loginButton}
              onPress={() => navigation.navigate('beranda')}
            >
              <ThemedText style={styles.loginButtonText}>Log in</ThemedText>
            </Pressable>


            <View style={styles.orRow}>
              <View style={styles.line} />
              <ThemedText style={styles.orText}>Or</ThemedText>
              <View style={styles.line} />
            </View>

            <Pressable style={[styles.socialButton, styles.googleButton]}>
            <Image
                source={require('@/assets/images/google.png')}
                style={styles.iconLeft}
            />
            <ThemedText style={styles.socialButtonText}>
                Sign In via email
            </ThemedText>
            </Pressable>
            <Pressable style={[styles.socialButton, styles.phoneButton]}>
            <Image
                source={require('@/assets/images/phone.png')}
                style={[styles.iconLeft, { tintColor: '#fff' }]}
            />
            <ThemedText style={styles.socialButtonText}>
                Sign In via Phone Number
            </ThemedText>
            </Pressable>

            <View style={styles.footerRow}>
              <ThemedText style={styles.footerText}>Don't you have an account? </ThemedText>
              <Pressable onPress={() => navigation.navigate('Register')}>
                <ThemedText style={styles.signupText}>Sign up</ThemedText>
                </Pressable>
            </View>
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
  backgroundImage: {
    opacity: 0.95,
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
    color: '#166534',
    textAlign: 'center',
    marginBottom: 2,
    fontSize: 24,
  },
  subtitle: {
    color: '#166534',
    textAlign: 'center',
    marginBottom: 18,
    fontWeight: '400',
    fontSize: 13,
  },
  fieldGroup: {
    marginBottom: 12,
  },
  fieldLabel: {
    color: '#166534',
    fontWeight: '600',
    marginBottom: 6,
    fontSize: 13,
  },
  input: {
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
    paddingHorizontal: 14,
    color: '#111827',
    fontSize: 14,
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#166534',
  },
  orText: {
    marginHorizontal: 10,
    color: '#9ca3af',
    fontSize: 12,
    fontWeight: '500',
  },
  socialButton: {
  height: 46,
  borderRadius: 10,
  justifyContent: 'center', 
  alignItems: 'center',
  marginTop: 8,
  paddingHorizontal: 14,
  backgroundColor: '#166534',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.1,
  shadowRadius: 6,
  elevation: 3,
  },
  googleButton: {
    backgroundColor: '#166534',
  },
  phoneButton: {
    backgroundColor: '#166534',
  },
  socialButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotText: {
    color: '#166534',
    fontWeight: '400',
    fontSize: 13,
  },
  loginButton: {
    marginTop: 8,
    height: 46,
    borderRadius: 10,
    backgroundColor: '#166534',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  footerRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  footerText: {
    color: '#6b7280',
    fontSize: 13,
  },
  signupText: {
    color: '#166534',
    fontWeight: '400',
    fontSize: 13,
  },
  iconLeft: {
  position: 'absolute',
  left: 14,
  width: 18,
  height: 18,
  resizeMode: 'contain',
},
});
