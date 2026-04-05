import { router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../src/constants/theme';
import AppButton from '../src/components/AppButton';

export default function SettingsScreen() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    const SettingRow = ({ icon, title, showArrow, children }: any) => (
        <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
                <Ionicons name={icon} size={24} color={COLORS.primary} />
                <Text style={styles.settingText}>{title}</Text>
            </View>
            <View style={styles.settingRight}>
                {children}
                {showArrow && <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
             <View style={styles.headerBar}>
                 <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
                     <Ionicons name="arrow-back" size={24} color={COLORS.black} />
                 </TouchableOpacity>
                 <Text style={styles.headerTitle}>Thiết Lập</Text>
                 <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.container}>
                
                <Text style={styles.sectionTitle}>Tài Khoản</Text>
                <View style={[styles.sectionGroup, SHADOWS.soft]}>
                    <SettingRow icon="person-outline" title="Chỉnh sửa hồ sơ" showArrow />
                    <SettingRow icon="shield-checkmark-outline" title="Quyền riêng tư" showArrow />
                </View>

                <Text style={styles.sectionTitle}>Tùy Chọn Môi Trường</Text>
                <View style={[styles.sectionGroup, SHADOWS.soft]}>
                    <SettingRow icon="moon-outline" title="Giao diện tối (Dark Mode)" showArrow={false}>
                        <Switch
                            value={isDarkMode}
                            onValueChange={setIsDarkMode}
                            trackColor={{ false: COLORS.gray, true: COLORS.primary }}
                            thumbColor={isDarkMode ? COLORS.white : '#f4f3f4'}
                        />
                    </SettingRow>
                    <SettingRow icon="notifications-outline" title="Thông báo đẩy" showArrow={false}>
                        <Switch
                            value={notificationsEnabled}
                            onValueChange={setNotificationsEnabled}
                            trackColor={{ false: COLORS.gray, true: COLORS.primary }}
                            thumbColor={notificationsEnabled ? COLORS.white : '#f4f3f4'}
                        />
                    </SettingRow>
                </View>

                <Text style={styles.sectionTitle}>Khác</Text>
                <View style={[styles.sectionGroup, SHADOWS.soft]}>
                    <SettingRow icon="information-circle-outline" title="Về ứng dụng Travery" showArrow />
                    <SettingRow icon="help-buoy-outline" title="Trung tâm trợ giúp" showArrow />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background
    },
    headerBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SIZES.padding,
    },
    iconBtn: { padding: 8, backgroundColor: COLORS.white, borderRadius: SIZES.radiusPill, ...SHADOWS.soft },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.black },
    container: {
        paddingHorizontal: SIZES.padding,
        paddingBottom: 40,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: COLORS.gray,
        textTransform: 'uppercase',
        marginLeft: 8,
        marginBottom: 8,
        marginTop: 20,
    },
    sectionGroup: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radiusLarge,
        overflow: 'hidden',
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 18,
        paddingHorizontal: 20,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.background,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingText: {
        fontSize: 16,
        color: COLORS.black,
        marginLeft: 15,
        fontWeight: '600',
    },
    settingRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    }
});
