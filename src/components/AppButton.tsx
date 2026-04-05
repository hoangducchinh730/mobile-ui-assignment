import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary' | 'outline';
}

export default function AppButton({ title, onPress, style, textStyle, variant = 'primary' }: AppButtonProps) {
  const getBtnStyle = () => {
    switch(variant) {
      case 'secondary': return styles.secondary;
      case 'outline': return styles.outline;
      default: return styles.primary;
    }
  }

  const getTextStyle = () => {
    switch(variant) {
      case 'outline': return { color: COLORS.primary };
      default: return { color: COLORS.white };
    }
  }

  return (
    <TouchableOpacity style={[styles.btn, getBtnStyle(), variant !== 'outline' ? SHADOWS.medium : null, style]} onPress={onPress}>
      <Text style={[styles.text, getTextStyle(), textStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    height: 56,
    borderRadius: SIZES.radiusLarge,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});
