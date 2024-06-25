import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useNavigation } from '@react-navigation/native';

const ResumeWriting = ({}) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigation = useNavigation(); // Use the hook to get navigation object

  const handleChange = (text) => {
    setPrompt(text);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post('https://ai.siw.sg/ResumeWriting', { prompt });
      setResponse(res.data.response);
      setSubmitted(true);
    } catch (error) {
      console.error('Error:', error.message);
      Alert.alert('Error', 'Failed to get response from server. Please try again later.');
    }
  };

  const handleNew = () => {
    setPrompt('');
    setResponse('');
    setSubmitted(false);
  };

  const handleDownload = async () => {
    if (response) {
      const fileUri = FileSystem.documentDirectory + 'resume_response.txt';
      await FileSystem.writeAsStringAsync(fileUri, response, { encoding: FileSystem.EncodingType.UTF8 });
      await Sharing.shareAsync(fileUri);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoText}>Smart iLab Works</Text>
        <TouchableOpacity style={styles.menuIcon} onPress={toggleMenu}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
      </View>
      {menuOpen && (
        <View style={styles.navLinks}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.linkText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Logout</Text>
          </TouchableOpacity>
          {/* Add other navigation links here */}
        </View>
      )}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.heading}>Resume Writing</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            value={prompt}
            onChangeText={handleChange}
            placeholder="Enter your job title"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleNew}>
              <Text style={styles.buttonText}>New</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
        {response && (
          <View style={styles.responseContainer}>
            {response.split('\n').map((line, index) => (
              <Text key={index} style={styles.responseText}>{line}</Text>
            ))}
            <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
              <Text style={styles.downloadButtonText}>Download Response</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#008080',
    paddingHorizontal: 16,
  },
  logoText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  menuIcon: {
    padding: 10,
  },
  menuText: {
    fontSize: 24,
    color: '#ffffff',
  },
  navLinks: {
    // position: 'absolute',
    width:'40%',
    alignItems:'center',
    position: 'absolute',
    top: 60,
    right: 16,
    backgroundColor: '#fff',
    
    borderRadius: 4,
    elevation: 10,
    padding: 8,
    zIndex: 10,
    // backgroundColor: '#ffffff',
    padding: 16,
  },
  linkText: {
    fontSize: 16,
    paddingVertical: 8,
    color: '#000',
  },
  contentContainer: {
    alignItems: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333333',
  },
  formContainer: {
    width: '80%',
    height: 200,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  buttonContainer: {
    marginTop:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#d9783f',
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  responseContainer: {
    width: '80%',
    marginTop: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  responseText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333333',
  },
  downloadButton: {
    backgroundColor: '#008080',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  downloadButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ResumeWriting;
