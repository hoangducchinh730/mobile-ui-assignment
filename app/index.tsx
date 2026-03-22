import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const savedUserString = await AsyncStorage.getItem('USER_ACCOUNT');
      if (savedUserString) {
        const savedUser = JSON.parse(savedUserString);
        if (email === savedUser.email && password === savedUser.password) {
          // Thành công -> Sang trang Home
          router.replace('/home');
        } else {
          Alert.alert('Lỗi', 'Email hoặc mật khẩu không đúng!');
        }
      } else {
        Alert.alert('Lỗi', 'Chưa có tài khoản, vui lòng đăng ký!');
      }
    } catch (e) {
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi đọc dữ liệu.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>Login</Text>

        <Text style={styles.label}>Email/Username</Text>
        <TextInput style={styles.input} placeholder="test@mail.com" value={email} onChangeText={setEmail} autoCapitalize="none" />

        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} placeholder="° ° ° °" secureTextEntry value={password} onChangeText={setPassword} />

        <TouchableOpacity style={styles.forgotWrapper}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>

        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.actionButton} onPress={handleLogin}>
            <Text style={styles.actionButtonText}>Sign in</Text>
          </TouchableOpacity>
        </View>

        {/* Nút chuyển sang trang đăng ký */}
        <TouchableOpacity style={{ marginTop: 20, alignItems: 'center' }} onPress={() => router.push('/register')}>
          <Text style={{ color: '#007BFF' }}>Đăng ký tài khoản mới</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Bê nguyên style của bạn vào đây
export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f9f9f9', justifyContent: 'center', alignItems: 'center' },
  formContainer: { width: '90%', maxWidth: 350, borderWidth: 1.5, borderColor: '#333', padding: 25, backgroundColor: '#fff' },
  headerText: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: '#000' },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 5, color: '#000' },
  input: { borderWidth: 1, borderColor: '#000', paddingHorizontal: 12, paddingVertical: 8, fontSize: 15, marginBottom: 15, color: '#000' },
  forgotWrapper: { alignItems: 'flex-start', marginTop: -5, marginBottom: 20 },
  forgotText: { fontSize: 12, color: '#555' },
  buttonWrapper: { alignItems: 'center', marginTop: 10 },
  actionButton: { borderWidth: 1.5, borderColor: '#0056b3', paddingVertical: 10, paddingHorizontal: 35, backgroundColor: '#007BFF' },
  actionButtonText: { fontSize: 16, fontWeight: 'bold', color: '#fff' }
});