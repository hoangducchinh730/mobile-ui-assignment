import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../src/constants/theme';
import { getProfileApi } from '../src/api/auth';
import { Ionicons } from '@expo/vector-icons';
import AppButton from '../src/components/AppButton';

export default function ProfileScreen() {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userStr = await AsyncStorage.getItem('USER_ACCOUNT');
                if (userStr) {
                    const { email } = JSON.parse(userStr);
                    // Lấy profile từ Server bằng API GET
                    const data = await getProfileApi(email);
                    setProfile(data);
                }
            } catch (error: any) {
                Alert.alert('Lỗi', 'Không thể đồng bộ hồ sơ: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = () => {
        Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn thoát khỏi hệ thống?", [
            { text: "Hủy", style: "cancel" },
            {
                text: "Đồng ý", style: 'destructive',
                onPress: async () => {
                    await AsyncStorage.removeItem('USER_ACCOUNT');
                    router.replace('/');
                }
            }
        ]);
    };

    if (loading) {
        return (
            <SafeAreaView style={[styles.safeArea, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerBar}>
                 <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
                     <Ionicons name="arrow-back" size={24} color={COLORS.black} />
                 </TouchableOpacity>
                 <Text style={styles.headerTitle}>Hồ Sơ Của Bạn</Text>
                 <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.container}>
                {profile ? (
                    <View style={[styles.card, SHADOWS.soft]}>
                        <View style={styles.avatarContainer}>
                            <View style={styles.avatarCircle}>
                                <Ionicons name="person" size={50} color={COLORS.primary} />
                            </View>
                            <Text style={styles.name}>{profile.name}</Text>
                            <Text style={styles.email}>{profile.email}</Text>
                        </View>
                        
                        <View style={styles.infoSection}>
                            <Text style={styles.label}>Giới thiệu bản thân</Text>
                            <Text style={styles.description}>{profile.description || 'Chưa cung cấp mô tả nào.'}</Text>
                        </View>

                        <View style={styles.infoSection}>
                            <Text style={styles.label}>Tài khoản tạo lúc</Text>
                            <Text style={styles.description}>{profile.created_at ? new Date(profile.created_at).toLocaleString() : 'Không rõ'}</Text>
                        </View>
                        
                        <View style={styles.noteBox}>
                            <Ionicons name="information-circle" size={20} color={COLORS.gray} style={{ marginRight: 6 }}/>
                            <Text style={styles.readOnlyNote}>Theo cấu trúc Server API, thông tin của bạn hiện không thể chỉnh sửa, chỉ có dạng "Read-Only".</Text>
                        </View>

                    </View>
                ) : (
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>Không tìm thấy hồ sơ.</Text>
                )}
                
                <AppButton title="Đăng Xuất Tài Khoản" onPress={handleLogout} variant="outline" style={{ marginTop: 24, borderColor: COLORS.danger }} textStyle={{ color: COLORS.danger }} />

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: COLORS.background },
    headerBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SIZES.padding,
    },
    iconBtn: { padding: 8, backgroundColor: COLORS.white, borderRadius: SIZES.radiusPill, ...SHADOWS.soft },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.black },
    container: { padding: SIZES.padding },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radiusLarge,
        padding: 24,
    },
    avatarContainer: { alignItems: 'center', marginBottom: 30 },
    avatarCircle: {
        width: 100, height: 100,
        backgroundColor: COLORS.lightGray,
        borderRadius: 50,
        justifyContent: 'center', alignItems: 'center',
        marginBottom: 16
    },
    name: { fontSize: 24, fontWeight: '900', color: COLORS.black, marginBottom: 4 },
    email: { fontSize: 15, color: COLORS.primary, fontWeight: '600' },
    infoSection: { marginBottom: 20 },
    label: { fontSize: 13, color: COLORS.gray, textTransform: 'uppercase', fontWeight: 'bold', marginBottom: 8 },
    description: { fontSize: 16, color: COLORS.black, lineHeight: 24 },
    noteBox: {
        flexDirection: 'row',
        backgroundColor: COLORS.background,
        padding: 16,
        borderRadius: SIZES.radius,
        marginTop: 10,
    },
    readOnlyNote: { flex: 1, fontSize: 13, color: COLORS.gray, lineHeight: 20 }
});