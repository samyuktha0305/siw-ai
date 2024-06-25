import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [didEdit, setDidEdit] = useState({ email: false, password: false });

  const emailIsInvalid = didEdit.email && !email.includes("@");

  const handleLogin = () => {
    const isValidEmail = email.includes("@");
    const isValidPassword =
      password.length >= 8 &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password) &&
      /[0-9]/.test(password) &&
      /[A-Z]/.test(password);

    if (isValidEmail && isValidPassword) {
      // Handle login logic
      console.log('Email:', email);
      console.log('Password:', password);
      navigation.navigate('Home');
    } else {
      handleValidationError(isValidEmail, isValidPassword);
    }
  };

  const handleValidationError = (isValidEmail, isValidPassword) => {
    let errorMessage = "Please enter a valid email and ensure your password meets the following requirements:\n";
    if (!isValidEmail) errorMessage += "- Email must contain '@'.\n";
    if (password.length < 8) errorMessage += "- Password must be at least 8 characters long.\n";
    if (!/[A-Z]/.test(password)) errorMessage += "- Password must contain at least one uppercase letter.\n";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errorMessage += "- Password must contain at least one special character.\n";
    if (!/[0-9]/.test(password)) errorMessage += "- Password must contain at least one digit.\n";
    Alert.alert("Validation Error", errorMessage);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Smart iLab Works</Text>
      </View>
      <KeyboardAvoidingView style={styles.loginContainer} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.imageWrapper}>
              <Image source={require('../assets/images/illustration.jpg')} style={styles.logo} />
            </View>
            <View style={styles.formContainer}>
              <Text style={styles.loginTitle}>Login</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={(value) => {
                    setEmail(value);
                    setDidEdit((prevEdit) => ({ ...prevEdit, email: false }));
                  }}
                  onBlur={() => setDidEdit((prevEdit) => ({ ...prevEdit, email: true }))}
                  keyboardType="email-address"
                />
                {emailIsInvalid && <Text style={styles.errorText}>Invalid email address</Text>}
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  value={password}
                  onChangeText={(value) => {
                    setPassword(value);
                    setDidEdit((prevEdit) => ({ ...prevEdit, password: false }));
                  }}
                  onBlur={() => setDidEdit((prevEdit) => ({ ...prevEdit, password: true }))}
                  secureTextEntry
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonGoogle}>
                  <Text style={styles.buttonText}>Google</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    maxHeight: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#008080',
  },
  logoText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  loginContainer: {
    flex: 2,
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  imageWrapper: {
    alignItems: 'center',
  },
  loginTitle: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    marginLeft: '10%',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    marginLeft: '10%',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '10%',
    marginRight: '10%',
  },
  button: {
    width: 100,
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonGoogle: {
    width: 100,
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  signUpText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#008080',
  },
  logo: {
    width: 250,
    height: 250,
  },
  formContainer:{
    marginBottom:100,
  }
});

export default Login;
