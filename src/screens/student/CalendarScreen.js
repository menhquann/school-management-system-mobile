/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text, useWindowDimensions,
    View
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Timeline from 'react-native-timeline-flatlist'


const renderScene = SceneMap({
    1: CalendarDetail,
    2: CalendarDetail,
    3: CalendarDetail,
    4: CalendarDetail,
    5: CalendarDetail,

});

export default function CalendarScreen() {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: '1', title: 'Thứ 2' },
        { key: '2', title: 'Thứ 3' },
        { key: '3', title: 'Thứ 4' },
        { key: '4', title: 'Thứ 5' },
        { key: '5', title: 'Thứ 6' },
    ]);

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    );
}
export function CalendarDetail() {

    const data = [
        { time: 'Tiết 1', title: 'Toán', description: 'Nguyễn văn A' },
        { time: 'Tiết 2', title: 'Toán', description: 'Nguyễn văn A' },
        { time: 'Tiết 3', title: 'Văn', description: 'Nguyễn văn A' },
        { time: 'Tiết 4', title: 'Văn', description: 'Nguyễn văn A' },
        { time: 'Tiết 5', title: 'Anh', description: 'Nguyễn văn A' },
        { time: 'Tiết 6', title: '', description: '' },
        { time: 'Tiết 7', title: '', description: '' },
        { time: 'Tiết 8', title: 'Anh', description: 'Nguyễn văn A' },
        { time: 'Tiết 9', title: 'Anh', description: 'Nguyễn văn A' },
        { time: 'Tiết 10', title: 'Anh', description: 'Nguyễn văn A' },


    ];

    return (
        <View style={styles.container}>
            <Timeline
                style={styles.list}
                data={data}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 20,
        backgroundColor: 'white'
    },
    list: {
        flex: 1,
        marginTop: 20,
    },
});