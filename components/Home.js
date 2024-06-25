import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigation = useNavigation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (menuOpen) {
      setDropdownOpen(false); // Close dropdown when main menu is closed
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <View style={styles.homeContainer}>
      <View style={styles.logoContainer}>
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
          {/* <View style={styles.dropdown}>
            <TouchableOpacity onPress={toggleDropdown}>
              <Text style={styles.dropbtn}>Job Seeking Tools</Text>
            </TouchableOpacity>
            {dropdownOpen && ( */}
              <View style={styles.dropdownContent}>
                <TouchableOpacity onPress={() => navigation.navigate('ResumeWriting')}>
                  <Text style={styles.linkText}>Resume Writing</Text>
                </TouchableOpacity>
              </View>
          {/* //   )} */}
          {/* // </View> */}
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.mainContent}>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/images/Homepage.jpg')} style={styles.mainImage} />
        </View>
        <View style={styles.textContent}>
          <Text style={styles.heading}>Unlock Your Career Potential with AI-Driven Tools</Text>
          <Text style={styles.paragraph}>Get personalized career advice and job opportunities with our advanced AI technology.</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#008080',
    paddingHorizontal: 16,
    zIndex: 10,
  },
  logoText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  menuIcon: {
    padding: 10,
  },
  navLinks: {
    width:'60%',
    alignItems:'center',
    position: 'absolute',
    top: 60,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 4,
    elevation: 4,
    padding: 8,
    zIndex: 10,
  },
  linkText: {
    fontSize:16,
    padding: 8,
  },
  dropdown: {
    marginVertical: 8,
  },
  dropbtn: {
    padding: 8,
  },
  dropdownContent: {
    paddingLeft: 16,
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  textContent: {
    marginBottom: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
  },
  imageContainer: {
    alignItems: 'center',
  },
  mainImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  menuText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default Home;
