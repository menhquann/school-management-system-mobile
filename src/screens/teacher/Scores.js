/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import axios from 'axios';
import React, { Component, useContext, useEffect, useState } from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text, useWindowDimensions,
    View
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Timeline from 'react-native-timeline-flatlist'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MAPSUBJECTS } from '../../Constants';
import InputScores from './InputScores'
import ClassScores from './ClassScoresDetail'
import AuthContext from '../../context/AuthProvider';
console.log("hello")
// var apiData = [];




export default function CalendarScreen() {

    const { schoolYearContext, clazzContext, semesterContext, typeScoreContext } = useContext(AuthContext);
    console.log("context", schoolYearContext, clazzContext, semesterContext, typeScoreContext)
    const [apiData, setApiData] = useState([]);
    const data = {
        semester: [
            { value: 1, label: "Học kì 1" },
            { value: 2, label: "Học kì 2" },
            // { value: 2, label: "Cả năm" },
        ],
    }
    const layout = useWindowDimensions();

    const renderScene = ({ route }) => {

        switch (route.key) {
            case '1':
                return <InputScores />;
            case '2':
                return <ClassScores />;


            default:
                return null;
        }


    };


    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: '1', title: 'Nhập điểm' },
        { key: '2', title: 'Điểm chi tiết' },

    ]);

    const renderTabBar = props => (


        <TabBar
            {...props}
            // indicatorStyle={{
            //     width: 40, left: (Dimensions.get('window').width / 6 - 40) / 2
            // }}
            style={{
                backgroundColor: 'white',
                // borderColor: 'gray',
                // borderWidth: 0.5,
                borderRadius: 8,
            }}
            // tabStyle={{
            //     width: 45,
            //     marginHorizontal: 8,
            //     backgroundColor: 'rgb(107,132,243)'
            // }}
            // contentContainerStyle={{
            //     justifyContent: 'center',
            // }}
            labelStyle={{
                fontSize: 20,
                fontWeight: '600',
                textTransform: 'capitalize',
            }}
            indicatorStyle={{
                height: 3,
                bottom: 6,
                backgroundColor: 'rgb(107,132,243)',
            }}
            activeColor={'rgb(107,132,243)'}

            inactiveColor={'rgb(168,170,199)'}
        />
    );

    return (
        <>


            <TabView
                renderTabBar={renderTabBar}
                // lazy
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            // style={{ flex: 11 }}
            />
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 10,
        // height:
        // backgroundColor: "#CECECE"
    },
    list: {
        flex: 1,
        marginTop: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    descriptionContainer: {
        flexDirection: 'row',
        paddingRight: 50
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    textDescription: {
        marginLeft: 10,
        // color: 'gray'
    },
    detailContainerStyle: {
        marginTop: -5,
        marginBottom: 5,
        marginRight: 15,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: "#BBDAFF",
        borderRadius: 10
    },
    detailContainerStyle2: {
        marginTop: -5,
        marginBottom: 5,
        marginRight: 15,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: "#bcbcbc",
        borderRadius: 10
    },
    detail: { paddingTop: 10, paddingBottom: 10 },
    header: {
        fontSize: 25,
        fontWeight: "bold",
        // fontFamily: "Cochin",
        marginLeft: 85,
        marginTop: -10,
        color: "#FFBF00"
    },
    dropdown: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 4,
        // marginBottom: 10,
        // padding: 16,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
        paddingLeft: 15,
    },
    selectedTextStyle: {
        paddingLeft: 15,
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },

});
