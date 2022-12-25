import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';
import Scores from './src/screens/teacher/Scores';
import HomeScreen from './src/screens/HomeScreen';
import { AuthProvider } from './src/context/AuthProvider';
import MainContainerST from './src/component/MainContainerST';
import MainContainerTE from './src/component/MainContainerTE';

import Toast from 'react-native-toast-message';
const Stack = createNativeStackNavigator();
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by messager
LogBox.ignoreAllLogs();//Ignore all log notifications
export default function App() {
  return (
    <AuthProvider>
      {/* <ScrollView> */}
      <View style={{ flex: 1 }}>
        <NavigationContainer style={{ flex: 1 }}>
          <Stack.Navigator style={{ flex: 1 }}>
            <Stack.Screen style={{ flex: 1 }} options={{ headerShown: false }} name="Login" component={LoginScreen} />
            <Stack.Screen style={{ flex: 1 }} options={{
              title: 'Hệ Thống Quản Lý Trường Học',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
              name="ChangePassword" component={ChangePasswordScreen} />
            <Stack.Screen style={{ flex: 1 }} options={{
              title: 'Hệ Thống Quản Lý Trường Học',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
              name="Scores" component={Scores} />
            <Stack.Screen
              options={{
                title: 'Hệ Thống Quản Lý Trường Học',
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },

              }}
              name="HomeST"
              component={MainContainerST}
              style={{ flex: 1 }} />
            <Stack.Screen
              style={{ flex: 1 }}
              options={{
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
      </View>

      {/* </ScrollView> */}
      <Toast />
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
