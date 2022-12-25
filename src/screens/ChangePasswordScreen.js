import { useNavigation } from '@react-navigation/core'
import axios from "axios";
import React, { useContext, useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message';

import { MAPERRORS } from '../Constants';
// import { AsyncStorage } from '@react-native-community/async-strorage';

import AuthContext from '../context/AuthProvider';
// const { auth } = useContext(AuthContext)
// axios.defaults.baseURL = "http://ndkiet.us-east-1.elasticbeanstalk.com/api/";
// const token = auth.data.access_token
// axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
const LoginScreen = () => {
  const { setAuth } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigation = useNavigation()



  const handleChangePassword = async (e) => {
    e.preventDefault();
    // console.log(currentPassword)
    // console.log(password)
    try {
      const { errorDTOs } = await axios.put(
        "users/password",
        {
          currentPassword,
          newPassword,
          confirmPassword,
        }

      );

      Toast.show({
        type: 'success',
        text1: 'Đổi mật khẩu thành công!',
        // text2: 'This is some something 👋',
        visibilityTime: 2000,
      });
      navigation.goBack();
      //  {}handle nativa

    } catch (error) {
      console.log("error 400", error.response);
      const key = error.response.data.errorDTOs[0].key
      const value = error.response.data.errorDTOs[0].value


      Toast.show({
        type: 'error',
        text1: 'Đổi mật khẩu thất bại!',
        text2: `${MAPERRORS[key]} ${MAPERRORS[value]}`,
        visibilityTime: 3500,
      });

    }

  };


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>

        <TextInput
          placeholder="Mật khẩu hiện tại"
          placeholderTextColor="#000"
          value={currentPassword}
          onChangeText={text => setCurrentPassword(text)}
          style={styles.input}
          secureTextEntry
        />

        <TextInput
          placeholder="Mật khẩu mới"
          placeholderTextColor="#000"
          value={newPassword}
          onChangeText={text => setNewPassword(text)}
          style={styles.input}
          secureTextEntry
        />

        <TextInput
          placeholder="Nhập lại mật khẩu mới"
          placeholderTextColor="#000"
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleChangePassword}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Đổi mật khẩu</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})
