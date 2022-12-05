import { useNavigation } from '@react-navigation/core'
import axios from "axios";
import React, { useContext, useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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
    const { data } = await axios.put(
      "user/password",
      {
        currentPassword,
        newPassword,
        confirmPassword,
      }

    );

    console.log({ data });
    navigation.goBack();
    //  {}handle nativa
  };


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>

        <TextInput
          placeholder="Mật khẩu hiện tại"
          value={currentPassword}
          onChangeText={text => setCurrentPassword(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Mật khẩu mới"
          value={newPassword}
          onChangeText={text => setNewPassword(text)}
          style={styles.input}
          secureTextEntry
        />

        <TextInput
          placeholder="Nhập lại mật khẩu mới"
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
