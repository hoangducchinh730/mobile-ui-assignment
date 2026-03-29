import { router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    const SettingRow = ({ icon, title, showArrow, children }: any) => (
        <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
                <Ionicons name={icon} size={24} color="#333" />
                <Text style={styles.settingText}>{title}</Text>
            </View>
            <View style={styles.settingRight}>
                {children}
                {showArrow && <Ionicons name="chevron-forward" size={20} color="#ccc" />}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                
                <Text style={styles.sectionTitle}>Tài Khoản</Text>
                <View style={styles.sectionGroup}>
                    <SettingRow icon="person-outline" title="Chỉnh sửa hồ sơ" showArrow />
                    <SettingRow icon="shield-checkmark-outline" title="Quyền riêng tư" showArrow />
                </View>

                <Text style={styles.sectionTitle}>Tùy Chọn Môi Trường</Text>
                <View style={styles.sectionGroup}>
                    <SettingRow icon="moon-outline" title="Giao diện tối (Dark Mode)" showArrow={false}>
                        <Switch
                            value={isDarkMode}
                            onValueChange={setIsDarkMode}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isDarkMode ? '#007AFF' : '#f4f3f4'}
                        />
                    </SettingRow>
                    <SettingRow icon="notifications-outline" title="Thông báo đẩy" showArrow={false}>
                        <Switch
                            value={notificationsEnabled}
                            onValueChange={setNotificationsEnabled}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={notificationsEnabled ? '#007AFF' : '#f4f3f4'}
                        />
                    </SettingRow>
                </View>

                <Text style={styles.sectionTitle}>Khác</Text>
                <View style={styles.sectionGroup}>
                    <SettingRow icon="information-circle-outline" title="Về ứng dụng Travery" showArrow />
                    <SettingRow icon="help-buoy-outline" title="Trung tâm trợ giúp" showArrow />
                </View>

                <TouchableOpacity style={styles.logoutBtn} onPress={() => router.replace('/')}>
                    <Text style={styles.logoutBtnText}>Đăng Xuất</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    container: {
        paddingVertical: 20,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#888',
        textTransform: 'uppercase',
        marginLeft: 20,
        marginBottom: 8,
        marginTop: 20,
    },
    sectionGroup: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f9f9f9',
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 15,
        fontWeight: '500',
    },
    settingRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    logoutBtn: {
        marginTop: 40,
        marginHorizontal: 20,
        backgroundColor: '#ff3b30',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    logoutBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
