import { router } from 'expo-router';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.header}>
                <Text style={styles.greeting}>Travery Feed</Text>
                <TouchableOpacity onPress={() => router.push('/profile')} style={styles.profileBtn}>
                    <Text style={styles.profileBtnText}>Profile</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={HARDCODED_POSTS}
                keyExtractor={item => item.id}
                contentContainerStyle={{ padding: 20 }}
                // Tắt thanh cuộn ngang/dọc mặc định cho đẹp
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.postCard}>
                        <Text style={styles.postTitle}>{item.title}</Text>
                        <Text style={{ color: '#888', marginBottom: 10, fontSize: 12 }}>{item.date}</Text>
                        <Text style={{ color: '#333', lineHeight: 22 }}>{item.content}</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // Thêm căn giữa cho nút Profile cân đối
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
        borderRadius: 8, // Bo góc cho Card mềm mại hơn
        shadowColor: '#000', // Thêm tí bóng đổ nhẹ cho nổi bật
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2, // Đổ bóng cho Android
    },
    postTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 }
});