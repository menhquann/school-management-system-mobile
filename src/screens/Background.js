import React from 'react';
import { View, ImageBackground, StyleSheet, Text } from 'react-native';



const App = ({ children }) => (
    <View style={styles.container}>
        <ImageBackground source={require("../assets/theme.jpg")} resizeMode="cover" style={styles.image}>
            {children}
        </ImageBackground>
    </View>
);


export default App;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    text: {
        color: "white",
        fontSize: 42,
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000c0"
    }
});