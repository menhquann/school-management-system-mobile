import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import { auth } from '../firebase'
import MainContainer from "../component/MainContainer";

const HomeScreen = () => {
  const navigation = useNavigation()

  const handleSignOut = () => {
    // auth
    //   .signOut()
    //   .then(() => {
    navigation.replace("Login")
    //   })
    //   .catch(error => alert(error.message))
  }

  return (
    <>
      <MainContainer />
    </>


  )
}

export default HomeScreen


