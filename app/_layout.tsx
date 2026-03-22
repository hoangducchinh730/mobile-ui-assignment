import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    // Stack này chính là cái hộp chứa tất cả các màn hình của bạn
    <Stack>
      {/* Cấu hình cho màn hình Login (index.tsx) */}
      <Stack.Screen
        name="index"
        options={{ headerShown: false }} // Ẩn thanh header trên cùng
      />

      {/* Cấu hình cho màn hình Register (register.tsx) */}
      <Stack.Screen
        name="register"
        options={{ headerShown: false }} // Ẩn thanh header
      />

      {/* Cấu hình cho màn hình Home (home.tsx) */}
      <Stack.Screen
        name="home"
        options={{
          title: 'Travery', // Đổi tên hiển thị trên thanh tiêu đề
          headerBackVisible: false, // Ẩn nút Back (vì đã vào Home thì không vuốt lại Login được)
        }}
      />

      {/* Cấu hình cho màn hình Profile (profile.tsx) */}
      <Stack.Screen
        name="profile"
        options={{
          title: 'Hồ sơ cá nhân',
          headerBackTitle: 'Back' // Chữ hiện cạnh nút back (cho iOS)
        }}
      />
    </Stack>
  );
}