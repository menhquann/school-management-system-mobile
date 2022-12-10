import { useNavigation } from '@react-navigation/core'
import axios from "axios";
import React, { useContext, useEffect, useState } from 'react'
import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import { AsyncStorage } from '@react-native-community/async-strorage';

import AuthContext from '../context/AuthProvider';
import Background from './Background';
axios.defaults.baseURL = "http://ndkiet.us-east-1.elasticbeanstalk.com/api/";
const LoginScreen = () => {
  const { setAuth } = useContext(AuthContext);
  const [username, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()


  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(username)
    console.log(password)
    const { data } = await axios.post(
      "login",
      {
        username,
        password,
      }

    );

    console.log({ data });

    setAuth({ data });
    // 

    // setNavigate(lg);w

    console.log("compare", username.localeCompare("schooladmin1"))
    if (!username.localeCompare("teacher2@thpthoanghoatham"))
      navigation.replace("HomeTE")
    else navigation.replace("HomeST")
  };


  return (
    <Background>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <View >
          {/* <Text style={styles.logo}>SMS</Text> */}
          <Image
            style={styles.logo}
            source={require("../assets/logo.png")}
          />

        </View>
        <View style={styles.inputContainer}>

          <TextInput
            placeholder="Tên đăng nhập"
            placeholderTextColor="#000"
            value={username}
            onChangeText={text => setEmail(text)}
            style={styles.input}
          />

          <TextInput
            placeholder="Mật khẩu"
            placeholderTextColor="#000"
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleLogin}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Background>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    // width: 300,
    // height: 58,
    // flex: 1,
    justifyContent: "center",
    width: 100,
    height: 70,
    resizeMode: 'stretch',
    // fontSize: 60,
    // fontWeight: "bold",
    // fontFamily: "Cochin",
    // marginLeft: 85,
    paddingHorizontal: 15,
    paddingVertical: 60,
    marginTop: -80,
    marginBottom: 80,
    // color: "#FFBF00"
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'rgb(232, 240, 254)',

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

