import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import SignUp from './components/Signup';
import Home from './components/Home';
import ResumeWriting from './components/ResumeWriting';
// import SignUpScreen from './SignUpScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ResumeWriting" component={ResumeWriting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
