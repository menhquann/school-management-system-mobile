import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import { AuthProvider } from './src/context/AuthProvider';
import MainContainerST from './src/component/MainContainerST';
import MainContainerTE from './src/component/MainContainerTE';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      {/* <ScrollView> */}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen options={{
            title: 'Hệ Thống Quản Lý Trường Học',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },

          }} name="HomeST" component={MainContainerST} />
          <Stack.Screen options={{
            title: 'Hệ Thống Quản Lý Trường Học',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },

          }} name="HomeTE" component={MainContainerTE} />
        </Stack.Navigator>
      </NavigationContainer>
      {/* </ScrollView> */}

    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
