import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { COLORS, SIZES } from '../src/constants/theme';
import AppInput from '../src/components/AppInput';
import AppButton from '../src/components/AppButton';
import { loginApi } from '../src/api/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    try {
      setIsLoading(true);
      console.log('Đang gọi API Login...');
      const data = await loginApi(email, password);
      console.log('Login thành công:', data);
      
      // Thành công, lấy email và name lưu vào AsyncStorage định danh
      await AsyncStorage.setItem('USER_ACCOUNT', JSON.stringify({
        email: email,
        name: data.name
      }));
      
      router.replace('/home');
    } catch (e: any) {
      console.log('Lỗi Login:', e);
      if (Platform.OS === 'web') {
        window.alert('Lỗi đăng nhập: ' + (e.message || 'Vui lòng kiểm tra lại cấu hình mạng/CORS'));
      } else {
        Alert.alert('Lỗi đăng nhập', e.message || 'Lỗi không xác định');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Đăng nhập để kết nối với mọi người</Text>
        </View>

        <View style={styles.form}>
          <AppInput 
            label="Địa chỉ Email"
            placeholder="name@example.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <AppInput 
            label="Mật khẩu"
            placeholder="••••••••"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.forgotPass}>
            <Text style={styles.forgotText}>Quên mật khẩu?</Text>
          </TouchableOpacity>

          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} style={{ marginVertical: 20 }} />
          ) : (
            <AppButton title="Đăng nhập" onPress={handleLogin} />
          )}

          <View style={styles.footer}>
             <Text style={styles.footerText}>Chưa có tài khoản? </Text>
             <TouchableOpacity onPress={() => router.push('/register')}>
               <Text style={styles.registerText}>Đăng ký ngay</Text>
             </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: COLORS.background 
  },
  container: {
    flex: 1,
    padding: SIZES.padding,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.black,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray,
  },
  form: {
    backgroundColor: COLORS.white,
    padding: SIZES.padding,
    borderRadius: SIZES.radiusLarge,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  forgotPass: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: COLORS.gray,
  },
  registerText: {
    color: COLORS.primary,
    fontWeight: '700',
  }
});