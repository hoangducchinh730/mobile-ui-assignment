import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './index';

export default function RegisterScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp!');
            return;
        }
        try {
            const userData = { name, email, password };
            await AsyncStorage.setItem('USER_ACCOUNT', JSON.stringify(userData));
            Alert.alert('Thành công', 'Đăng ký xong! Vui lòng đăng nhập.');
            router.back();
        } catch (e) {
            Alert.alert('Lỗi', 'Không thể lưu dữ liệu');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.formContainer}>
                <Text style={styles.headerText}>Register</Text>

                <Text style={styles.label}>Name</Text>
                <TextInput style={styles.input} placeholder="John Doe" value={name} onChangeText={setName} />

                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} placeholder="test@mail.com" value={email} onChangeText={setEmail} autoCapitalize="none" />

                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input} placeholder="° ° ° °" secureTextEntry value={password} onChangeText={setPassword} />

                <Text style={styles.label}>Confirm Password</Text>
                <TextInput style={styles.input} placeholder="° ° ° °" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />

                <View style={styles.buttonWrapper}>
                    <TouchableOpacity style={styles.actionButton} onPress={handleRegister}>
                        <Text style={styles.actionButtonText}>Create</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={{ marginTop: 20, alignItems: 'center' }} onPress={() => router.back()}>
                    <Text style={{ color: '#555' }}>Đã có tài khoản? Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}