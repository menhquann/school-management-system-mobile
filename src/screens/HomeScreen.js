import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MainContainerST from '../component/MainContainerST';
// import { auth } from '../firebase'
import AuthContext from '../context/AuthProvider';


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
      <MainContainerST />
    </>


  )
}

export default HomeScreen


