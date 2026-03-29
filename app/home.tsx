import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import * as SQLite from 'expo-sqlite';

const HARDCODED_POSTS = [
    {
        id: '1',
        title: 'Khám phá Vũng Tàu',
        date: '21/03/2026',
        content: 'Biển hôm nay rất êm. Hải sản chợ đêm thì tươi ngon tuyệt vời! 🌊🦀'
    },
    {
        id: '2',
        title: 'Cà phê cuối tuần',
        date: '22/03/2026',
        content: 'Một góc nhỏ bình yên giữa lòng thành phố nhộn nhịp. Lên đồ đi chill thôi mọi người ơi. ☕🌿'
    },
    {
        id: '3',
        title: 'Săn mây Tà Xùa',
        date: '24/03/2026',
        content: 'Dậy từ 4h sáng lóc cóc chạy xe máy, lạnh cóng nhưng nhìn biển mây cuồn cuộn thì đáng giá từng giây! ☁️🏍️'
    },
    {
        id: '4',
        title: 'Foodtour Hải Phòng',
        date: '26/03/2026',
        content: 'Bánh mì cay, bún cá cay, dừa dầm... Ăn sập Hải Phòng trong 24h là có thật các bác ạ. Bụng no căng! 🥖🥥'
    },
    {
        id: '5',
        title: 'Cắm trại Hồ Trị An',
        date: '28/03/2026',
        content: 'Dựng lều, đốt lửa trại, nướng thịt và ngắm bầu trời đầy sao. Một trải nghiệm chữa lành tuyệt đối. 🔥⛺'
    },
];

export default function HomeScreen() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        async function initDB() {
            try {
                // 1. Mở kết nối Database
                const db = await SQLite.openDatabaseAsync('posts-data.db');
                
                // 2. Tạo bảng nếu chưa có
                const query = `CREATE TABLE IF NOT EXISTS posts (
                    id TEXT PRIMARY KEY NOT NULL,
                    title TEXT NOT NULL,
                    date TEXT NOT NULL,
                    content TEXT NOT NULL
                );`;
                
                await db.execAsync(query);

                // 3. Select để kiểm tra dữ liệu
                let results = await db.getAllAsync<any>('SELECT * FROM posts');
                
                // Nếu rỗng, Insert dữ liệu mồi y hệt code thầy cho (bằng lệnh INSERT)
                if (results.length === 0) {
                    console.log('Chưa có data, đang tiến hành Insert dữ liệu mẫu...');
                    for (const post of HARDCODED_POSTS) {
                        await db.runAsync(
                            'INSERT INTO posts (id, title, date, content) VALUES (?, ?, ?, ?)',
                            [post.id, post.title, post.date, post.content]
                        );
                    }
                    // Lấy ra lại sau khi thêm
                    results = await db.getAllAsync<any>('SELECT * FROM posts');
                }

                if (isMounted) {
                    setPosts(results);
                }
            } catch (error) {
                console.error("Lỗi thao tác SQLite: ", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        initDB();

        return () => { isMounted = false; }
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.header}>
                <Text style={styles.greeting}>Travery Feed</Text>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <TouchableOpacity onPress={() => router.push('/settings')} style={[styles.profileBtn, { backgroundColor: '#f0f0f0' }]}>
                        <Text style={[styles.profileBtnText, { color: '#000' }]}>Cài đặt</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('/profile')} style={styles.profileBtn}>
                        <Text style={styles.profileBtnText}>Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#000" />
                    <Text style={{ marginTop: 10 }}>Đang tải dữ liệu từ cục bộ...</Text>
                </View>
            ) : (
                <FlatList
                    data={posts}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={{ padding: 20 }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.postCard}>
                            <Text style={styles.postTitle}>{item.title}</Text>
                            <Text style={{ color: '#888', marginBottom: 10, fontSize: 12 }}>{item.date}</Text>
                            <Text style={{ color: '#333', lineHeight: 22 }}>{item.content}</Text>
                        </View>
                    )}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderColor: '#eee'
    },
    greeting: { fontSize: 22, fontWeight: 'bold' },
    profileBtn: { backgroundColor: '#000', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 5 },
    profileBtnText: { color: '#fff', fontWeight: 'bold' },
    postCard: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    postTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 }
});