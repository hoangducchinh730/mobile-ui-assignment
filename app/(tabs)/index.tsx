import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const LoginForm = () => {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.headerText}>Login</Text>

      <Text style={styles.label}>Email/Username</Text>
      <TextInput style={styles.input} placeholder="test@mail.com" />

      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} placeholder="° ° ° °" secureTextEntry={true} />

      <TouchableOpacity style={styles.forgotWrapper}>
        <Text style={styles.forgotText}>Forgot password?</Text>
      </TouchableOpacity>

      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const RegisterForm = () => {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.headerText}>Register</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} placeholder="test" />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} placeholder="test@mail.com" />

      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} placeholder="° ° ° °" secureTextEntry={true} />

      <Text style={styles.label}>Confirm Password</Text>
      <TextInput style={styles.input} placeholder="° ° ° °" secureTextEntry={true} />

      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* <LoginForm /> */}
        <RegisterForm />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 350,
    borderWidth: 1.5,
    borderColor: '#333',
    padding: 25,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#000',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
    marginBottom: 15,
    color: '#000',
  },
  forgotWrapper: {
    alignItems: 'flex-start',
    marginTop: -5,
    marginBottom: 20,
  },
  forgotText: {
    fontSize: 12,
    color: '#555',
  },
  buttonWrapper: {
    alignItems: 'center',
    marginTop: 10,
  },
  actionButton: {
    borderWidth: 1.5,
    borderColor: '#0056b3',
    paddingVertical: 10,
    paddingHorizontal: 35,
    backgroundColor: '#007BFF',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  }
});