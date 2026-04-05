import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, RefreshControl } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../src/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { getPostsApi } from '../src/api/posts';
import PostCard from '../src/components/PostCard';
import CreatePostModal from '../src/components/CreatePostModal';

export default function HomeScreen() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    const fetchPosts = async () => {
        try {
            const data = await getPostsApi();
            setPosts(data);
        } catch (error: any) {
            console.error("Lỗi mạng: ", error.message);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchPosts();
    };

    const handleDeleteFromUI = (idToRemove: string) => {
        setPosts(prev => prev.filter(p => p.id !== idToRemove));
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={[styles.header, SHADOWS.soft]}>
                <Text style={styles.greeting}>Social Feed</Text>
                <View style={{ flexDirection: 'row', gap: 12 }}>
                    <TouchableOpacity onPress={() => router.push('/settings')} style={styles.iconBtn}>
                        <Ionicons name="settings-outline" size={24} color={COLORS.black} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('/profile')} style={styles.iconBtn}>
                        <Ionicons name="person-outline" size={24} color={COLORS.black} />
                    </TouchableOpacity>
                </View>
            </View>

            {loading ? (
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                    <Text style={{ marginTop: 10, color: COLORS.gray }}>Đang đồng bộ mạng lưới...</Text>
                </View>
            ) : (
                <FlatList
                    data={posts}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={{ padding: SIZES.padding }}
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
                    renderItem={({ item }) => (
                        <PostCard item={item} onDelete={handleDeleteFromUI} />
                    )}
                    ListEmptyComponent={() => (
                        <View style={styles.centerContainer}>
                            <Text style={{ color: COLORS.gray }}>Chưa có bài viết nào trền Server.</Text>
                        </View>
                    )}
                />
            )}

            {/* Nút lơ lửng tạo bài viết */}
            <TouchableOpacity style={[styles.fab, SHADOWS.medium]} onPress={() => setModalVisible(true)}>
                <Ionicons name="add" size={32} color={COLORS.white} />
            </TouchableOpacity>

            <CreatePostModal 
                visible={isModalVisible} 
                onClose={() => setModalVisible(false)} 
                onSuccess={() => onRefresh()} 
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { 
        flex: 1, 
        backgroundColor: COLORS.background 
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SIZES.padding,
        backgroundColor: COLORS.white,
        borderBottomLeftRadius: SIZES.radiusLarge,
        borderBottomRightRadius: SIZES.radiusLarge,
        zIndex: 10,
    },
    greeting: { fontSize: 24, fontWeight: '900', color: COLORS.primary },
    iconBtn: { 
        backgroundColor: COLORS.lightGray, 
        padding: 10, 
        borderRadius: SIZES.radiusPill 
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 64,
        height: 64,
        borderRadius: SIZES.radiusPill,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    }
});