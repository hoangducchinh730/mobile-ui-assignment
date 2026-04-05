import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, Platform, ActivityIndicator, ScrollView } from 'react-native';
import { COLORS, SIZES } from '../src/constants/theme';
import AppInput from '../src/components/AppInput';
import AppButton from '../src/components/AppButton';
import { registerApi } from '../src/api/auth';

export default function RegisterScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async () => {
        if (!name || !email || !password || !description) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp!');
            return;
        }

        try {
            console.log('Đang gọi API Đăng ký...', { email, name });
            setIsLoading(true);
            await registerApi({ name, email, password, description });
            console.log('Đăng ký thành công!');
            
            if (Platform.OS === 'web') {
                window.alert('Thành công: Đăng ký xong! Vui lòng đăng nhập.');
            } else {
                Alert.alert('Thành công', 'Đăng ký xong! Vui lòng đăng nhập.');
            }
            router.back();
        } catch (e: any) {
            console.log('Lỗi Đăng ký:', e);
            if (Platform.OS === 'web') {
                window.alert('Lỗi đăng ký: ' + (e.message || 'Kiểm tra lỗi CORS trên trình duyệt'));
            } else {
                Alert.alert('Lỗi', e.message || 'Lỗi không xác định');
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
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Tạo Tài Khoản</Text>
                        <Text style={styles.subtitle}>Tham gia cộng đồng ngay hôm nay</Text>
                    </View>

                    <View style={styles.form}>
                        <AppInput 
                            label="Họ và tên"
                            placeholder="Ví dụ: John Doe"
                            value={name}
                            onChangeText={setName}
                        />

                        <AppInput 
                            label="Địa chỉ Email"
                            placeholder="test@mail.com"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />

                        <AppInput 
                            label="Mô tả bản thân"
                            placeholder="Ví dụ: Lập trình viên..."
                            value={description}
                            onChangeText={setDescription}
                        />

                        <AppInput 
                            label="Mật khẩu"
                            placeholder="••••••••"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />

                        <AppInput 
                            label="Xác nhận Mật khẩu"
                            placeholder="••••••••"
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />

                        {isLoading ? (
                            <ActivityIndicator size="large" color={COLORS.primary} style={{ marginVertical: 20 }} />
                        ) : (
                            <AppButton title="Tạo tài khoản" onPress={handleRegister} />
                        )}

                        <TouchableOpacity style={{ marginTop: 20, alignItems: 'center' }} onPress={() => router.back()}>
                            <Text style={{ color: COLORS.gray }}>Đã có tài khoản? <Text style={{ color: COLORS.primary, fontWeight: '700' }}>Đăng nhập</Text></Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
    },
    scrollContent: {
        padding: SIZES.padding,
        flexGrow: 1,
        justifyContent: 'center'
    },
    header: {
        marginBottom: 30,
        marginTop: 20,
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
    }
});