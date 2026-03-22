import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function ProfileScreen() {
    // Khởi tạo State cho các trường thông tin
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [description, setDescription] = useState('');

    // Tự động chạy khi màn hình được load lên
    useEffect(() => {
        const loadUserData = async () => {
            try {
                const savedUserString = await AsyncStorage.getItem('USER_ACCOUNT');
                if (savedUserString) {
                    const userData = JSON.parse(savedUserString);
                    setName(userData.name || '');
                    setEmail(userData.email || '');
                    setAddress(userData.address || '');
                    setAvatarUrl(userData.avatarUrl || '');
                    setDescription(userData.description || '');
                }
            } catch (error) {
                console.error("Lỗi khi load dữ liệu", error);
            }
        };

        loadUserData();
    }, []);

    // Hàm xử lý khi bấm nút "Save"
    const handleSave = async () => {
        try {
            const savedUserString = await AsyncStorage.getItem('USER_ACCOUNT');
            let userData = savedUserString ? JSON.parse(savedUserString) : {};

            // Cập nhật dữ liệu mới vào Object (Giữ nguyên password cũ)
            userData = {
                ...userData,
                name,
                address,
                avatarUrl,
                description
            };

            // Lưu lại xuống AsyncStorage
            await AsyncStorage.setItem('USER_ACCOUNT', JSON.stringify(userData));
            Alert.alert('Thành công', 'Thông tin của bạn đã được cập nhật!');
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể lưu thông tin. Vui lòng thử lại.');
        }
    };

    // Hàm Đăng xuất
    const handleLogout = () => {
        Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
            { text: "Hủy", style: "cancel" },
            {
                text: "Đồng ý",
                onPress: () => router.replace('/') // Đẩy về trang Login (index.tsx)
            }
        ]);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Dùng ScrollView để khi bàn phím bật lên không bị che mất nút Save */}
            <ScrollView contentContainerStyle={styles.container}>

                {/* Phần Header: Tên và Avatar */}
                <View style={styles.headerRow}>
                    <Text style={styles.greetingText}>{name}!</Text>
                    <View style={styles.avatarContainer}>
                        {avatarUrl ? (
                            <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
                        ) : (
                            <Text style={styles.avatarPlaceholder}>🖼️</Text> // Icon mặc định nếu chưa có link ảnh
                        )}
                    </View>
                </View>

                {/* Các Form Nhập Liệu */}
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={[styles.input, styles.inputDisabled]} // Email thường không cho sửa đổi nên bôi xám
                    value={email}
                    editable={false}
                />

                <Text style={styles.label}>Address</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Your Address"
                    value={address}
                    onChangeText={setAddress}
                />

                <Text style={styles.label}>Avatar URL</Text>
                <TextInput
                    style={styles.input}
                    placeholder="https://example.com/photo.jpg"
                    value={avatarUrl}
                    onChangeText={setAvatarUrl}
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Tell us about yourself..."
                    value={description}
                    onChangeText={setDescription}
                    multiline={true}
                    numberOfLines={4}
                />

                {/* Nút Save */}
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity style={styles.btnSave} onPress={handleSave}>
                        <Text style={styles.btnSaveText}>Save</Text>
                    </TouchableOpacity>
                </View>

                {/* Nút Đăng xuất (Tính năng thêm) */}
                <TouchableOpacity style={styles.btnLogout} onPress={handleLogout}>
                    <Text style={styles.btnLogoutText}>Đăng xuất khỏi hệ thống</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

// Khung CSS theo phong cách Minimalist giống bản thiết kế của bạn
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
        padding: 20,
        paddingBottom: 40
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30
    },
    greetingText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000'
    },
    avatarContainer: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    avatarImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    avatarPlaceholder: {
        fontSize: 24
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5
    },
    input: {
        borderWidth: 1,
        borderColor: '#333',
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 15,
        marginBottom: 15,
        color: '#000',
        backgroundColor: '#fff'
    },
    inputDisabled: {
        backgroundColor: '#f0f0f0',
        color: '#666'
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top' // Quan trọng: Đẩy chữ lên đầu góc trái cho khung Description
    },
    buttonWrapper: {
        alignItems: 'flex-start', // Nút Save căn trái theo ảnh mẫu
        marginTop: 10
    },
    btnSave: {
        borderWidth: 1.5,
        borderColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 40,
        backgroundColor: '#fff'
    },
    btnSaveText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    },
    btnLogout: {
        marginTop: 40,
        alignItems: 'center'
    },
    btnLogoutText: {
        color: 'red',
        fontSize: 14,
        textDecorationLine: 'underline'
    }
});