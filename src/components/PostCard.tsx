import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { deletePostApi } from '../api/posts';

export default function PostCard({ item, onDelete }: any) {
  const handleDelete = () => {
    Alert.alert('Xoá bài viết?', 'Thao tác này không thể hoàn tác.', [
      { text: 'Huỷ', style: 'cancel' },
      { text: 'Xoá ngay', style: 'destructive', onPress: async () => {
          try {
            await deletePostApi(item.id);
            onDelete(item.id); // Call callback to remove from UI efficiently
          } catch (e: any) {
            Alert.alert('Lỗi', e.message);
          }
      }}
    ])
  }

  return (
    <View style={[styles.card, SHADOWS.soft]}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.email}>Bởi: {item.creator_email}</Text>
        </View>
        <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={20} color={COLORS.danger} />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.content}>{item.description}</Text>
      
      <View style={styles.footer}>
        <Text style={styles.date}>{new Date(item.created_at).toLocaleString()}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    padding: SIZES.padding,
    borderRadius: SIZES.radiusLarge,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  deleteBtn: {
    padding: 6,
    backgroundColor: '#FFF0F0',
    borderRadius: SIZES.radius,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 4,
  },
  email: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '600',
  },
  content: {
    fontSize: 15,
    color: COLORS.black,
    lineHeight: 22,
    marginBottom: 16,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
    alignItems: 'flex-end'
  },
  date: {
    fontSize: 12,
    color: COLORS.gray,
  }
});
