import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AppInput from './AppInput';
import AppButton from './AppButton';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { createPostApi } from '../api/posts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function CreatePostModal({ visible, onClose, onSuccess }: any) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePost = async () => {
    if (!title || !desc) {
      Alert.alert('Thiếu thông tin', 'Vui lòng nhập đủ các trường');
      return;
    }
    try {
      setIsLoading(true);
      const userStr = await AsyncStorage.getItem('USER_ACCOUNT');
      const email = userStr ? JSON.parse(userStr).email : 'unknown@mail.com';

      await createPostApi(title, desc, email);
      setTitle('');
      setDesc('');
      onSuccess();
      onClose();
    } catch (e: any) {
      Alert.alert('Lỗi', e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <View style={[styles.modalContainer, SHADOWS.medium]}>
            <View style={styles.header}>
              <Text style={styles.modalTitle}>Tạo bài viết mới</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Ionicons name="close" size={24} color={COLORS.black} />
              </TouchableOpacity>
            </View>

            <AppInput 
              label="Tiêu đề bài viết"
              placeholder="Hôm nay bạn thấy thế nào?"
              value={title}
              onChangeText={setTitle}
            />

            <AppInput 
              label="Nội dung"
              placeholder="Chia sẻ kỷ niệm của bạn..."
              value={desc}
              onChangeText={setDesc}
              multiline
              style={{ height: 120, alignItems: 'flex-start', paddingTop: 16 }}
            />

            {isLoading ? (
              <ActivityIndicator size="large" color={COLORS.primary} style={{ marginVertical: 20 }} />
            ) : (
              <AppButton title="Đăng bài" onPress={handlePost} />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: SIZES.radiusLarge,
    borderTopRightRadius: SIZES.radiusLarge,
    padding: SIZES.padding,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.black,
  },
  closeBtn: {
    padding: 4,
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radiusPill,
  }
});
