import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export default function AppInput({ label, error, style, ...props }: AppInputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, error ? styles.inputError : null]}>
        <TextInput 
          placeholderTextColor={COLORS.gray}
          style={[styles.input, style]} 
          {...props} 
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%'
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 8,
    marginLeft: 4,
  },
  inputContainer: {
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    borderWidth: 1.5,
    borderColor: 'transparent',
    height: 56,
    justifyContent: 'center'
  },
  inputError: {
    borderColor: COLORS.danger,
    backgroundColor: '#FFF0F0'
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 15,
    color: COLORS.black
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  }
});
