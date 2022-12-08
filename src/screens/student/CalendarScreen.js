/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text, useWindowDimensions,
    View
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Timeline from 'react-native-timeline-flatlist'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MAPSUBJECTS } from '../../Constants';
console.log("hello")
var apiData = [];




export default function CalendarScreen() {

    const renderScene = ({ route }) => {

        switch (route.key) {
            case '1':
                return <CalendarDetail dayOfWeek="Monday" apiData={apiData} />;
            case '2':
                return <CalendarDetail dayOfWeek="Tuesday" apiData={apiData} />;

            case '3':
                return <CalendarDetail dayOfWeek="Wednesday" apiData={apiData} />;

            case '4':
                return <CalendarDetail dayOfWeek="Thursday" apiData={apiData} />;

            case '5':
                return <CalendarDetail dayOfWeek="Friday" apiData={apiData} />;

            case '6':

                return <CalendarDetail dayOfWeek="Saturday" apiData={apiData} />;

            default:
                return null;
        }


    };


    const [reload, setReload] = useState("");


    const layout = useWindowDimensions();
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get("users/classes");
                console.log("dataaa1", data)

                var idClass = data.data[0].classId
                console.log("dataaa1", idClass)
                const dataCalendar = await axios.get(`users/calendar?classId=${idClass}&calendarType=Study`);
                console.log("dataaa", dataCalendar)
                apiData = (dataCalendar.data.data.items)
                setReload("a");
            } catch (e) { }
        })();
    }, []);

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: '1', title: 'T2' },
        { key: '2', title: 'T3' },
        { key: '3', title: 'T4' },
        { key: '4', title: 'T5' },
        { key: '5', title: 'T6' },
        { key: '6', title: 'T7' },
    ]);

    const renderTabBar = props => (


        <TabBar
            {...props}
            // indicatorStyle={{
            //     width: 40, left: (Dimensions.get('window').width / 6 - 40) / 2
            // }}
            style={{
                backgroundColor: 'white',
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
        <TabView
            renderTabBar={renderTabBar}

            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    );
}
export function CalendarDetail({ dayOfWeek, apiData }) {


    // const apiData2 = [
    //     {
    //         "calendarEventId": 11,
    //         "calendarEvent": "Physic",
    //         "calendarEventType": "Study",
    //         "lessonStart": 6,
    //         "lessonFinish": 7,
    //         "timeStart": null,
    //         "timeFinish": null,
    //         "roomName": null,
    //         "subjectName": null,
    //         "calendarDate": "2022-10-20",
    //         "dayOfWeek": "Monday",
    //         "teacher": {
    //             "id": 92,
    //             "firstName": "Quân",
    //             "lastName": "Ngô Đình "
    //         },
    //         "clazz": null
    //     },
    //     {
    //         "calendarEventId": 14,
    //         "calendarEvent": "Literature",
    //         "calendarEventType": "Study",
    //         "lessonStart": 1,
    //         "lessonFinish": 1,
    //         "timeStart": null,
    //         "timeFinish": null,
    //         "roomName": null,
    //         "subjectName": "Literature",
    //         "calendarDate": null,
    //         "dayOfWeek": "Saturday",
    //         "teacher": {
    //             "id": 24,
    //             "firstName": "Tu Quyen",
    //             "lastName": "Dang Thi"
    //         },
    //         "clazz": null
    //     },
    //     {
    //         "calendarEventId": 19,
    //         "calendarEvent": "History",
    //         "calendarEventType": "Study",
    //         "lessonStart": 1,
    //         "lessonFinish": 2,
    //         "timeStart": "08:00",
    //         "timeFinish": "09:00",
    //         "roomName": null,
    //         "subjectName": "History",
    //         "calendarDate": null,
    //         "dayOfWeek": "Thursday",
    //         "teacher": {
    //             "id": 24,
    //             "firstName": "Tu Quyen",
    //             "lastName": "Dang Thi"
    //         },
    //         "clazz": null
    //     },
    //     {
    //         "calendarEventId": 25,
    //         "calendarEvent": "Maths",
    //         "calendarEventType": "Study",
    //         "lessonStart": 1,
    //         "lessonFinish": 1,
    //         "timeStart": null,
    //         "timeFinish": null,
    //         "roomName": null,
    //         "subjectName": "Maths",
    //         "calendarDate": null,
    //         "dayOfWeek": "Monday",
    //         "teacher": {
    //             "id": 27,
    //             "firstName": "Ngọc",
    //             "lastName": "Nguyễn Giáo"
    //         },
    //         "clazz": null
    //     },
    //     {
    //         "calendarEventId": 20,
    //         "calendarEvent": "Physic",
    //         "calendarEventType": "Study",
    //         "lessonStart": 7,
    //         "lessonFinish": 7,
    //         "timeStart": "08:00",
    //         "timeFinish": "09:00",
    //         "roomName": null,
    //         "subjectName": "Geographic",
    //         "calendarDate": null,
    //         "dayOfWeek": "Friday",
    //         "teacher": {
    //             "id": 108,
    //             "firstName": "Luận",
    //             "lastName": "Nguyễn Văn"
    //         },
    //         "clazz": null
    //     },
    //     {
    //         "calendarEventId": 10,
    //         "calendarEvent": "English",
    //         "calendarEventType": "Study",
    //         "lessonStart": 1,
    //         "lessonFinish": 1,
    //         "timeStart": null,
    //         "timeFinish": null,
    //         "roomName": null,
    //         "subjectName": null,
    //         "calendarDate": "2022-10-20",
    //         "dayOfWeek": "Tuesday",
    //         "teacher": {
    //             "id": 106,
    //             "firstName": "Peter",
    //             "lastName": "Parker"
    //         },
    //         "clazz": null
    //     },
    //     {
    //         "calendarEventId": 3,
    //         "calendarEvent": "Informatics",
    //         "calendarEventType": "Study",
    //         "lessonStart": 10,
    //         "lessonFinish": 10,
    //         "timeStart": null,
    //         "timeFinish": null,
    //         "roomName": null,
    //         "subjectName": null,
    //         "calendarDate": null,
    //         "dayOfWeek": "Tuesday",
    //         "teacher": {
    //             "id": 78,
    //             "firstName": "Huấn",
    //             "lastName": "Nguyễn Văn"
    //         },
    //         "clazz": null
    //     }
    // ]
    const dataMorning = [
        {
            header: "Sáng",
            title: '',
            // icon: <Ionicons name="location" size={40} color='rgb(0, 122, 255)' ></Ionicons>,
            circleColor: 'rgba(0, 0, 0,0)',
            lineColor: 'rgba(0, 0, 0,0)',
            // lineColor: 'rgb(0, 122, 255)',

        },
        { time: 'Tiết 1', title: '', description: '' },
        { time: 'Tiết 2', title: '', description: '' },
        { time: 'Tiết 3', title: '', description: '' },
        { time: 'Tiết 4', title: '', description: '' },
        { time: 'Tiết 5', title: '', description: '' }
    ]

    const dataAfternoon = [
        {
            header: "Chiều",
            // icon: <Ionicons name="location" size={40} color='rgb(0, 122, 255)' ></Ionicons>,
            circleColor: 'rgba(0, 0, 0,0)',
            lineColor: 'rgba(0, 0, 0,0)',
            // lineColor: 'rgb(0, 122, 255)',

        },
        { time: 'Tiết 6', title: '', description: '' },
        { time: 'Tiết 7', title: '', description: '' },
        { time: 'Tiết 8', title: '', description: '' },
        { time: 'Tiết 9', title: '', description: '' },
        { time: 'Tiết 10', title: '', description: '' },


    ];

    apiData.filter((itemFilter) => itemFilter["dayOfWeek"] == dayOfWeek).map((item) => {
        if (item.lessonStart <= 5) {
            dataMorning[item.lessonStart].title = MAPSUBJECTS[item.calendarEvent.replace(" ", "_")]
            dataMorning[item.lessonStart].description = MAPSUBJECTS[item.calendarEvent.replace(" ", "_")]
            dataMorning[item.lessonStart].circleColor = 'rgb(0, 122, 255)'
            dataMorning[item.lessonStart].lineColor = 'rgb(0, 122, 255)'
            // circleColor: 'rgb(0, 122, 255)',
            // lineColor: 'rgb(0, 122, 255)'
        } else {
            dataAfternoon[item.lessonStart - 5].title = MAPSUBJECTS[item.calendarEvent.replace(" ", "_")]
            dataAfternoon[item.lessonStart - 5].description = MAPSUBJECTS[item.calendarEvent.replace(" ", "_")]
            dataAfternoon[item.lessonStart - 5].circleColor = 'rgb(0, 122, 255)'
            dataAfternoon[item.lessonStart - 5].lineColor = 'rgb(0, 122, 255)'
        }

    })

    console.log("data", dataMorning)
    console.log("dataApi", apiData)

    // var count = Object.keys(apiData).length;
    // let calendarArray = [];
    // for (var i = 0; i < count; i++) {
    //     calendarArray.push({
    //         time: data[i].time,
    //         title: data[i].title,
    //         description: data[i].description,
    //     });
    // }



    return (
        <>
            <ScrollView>
                <View style={{ flex: 1 }}>


                    <View >
                        <Timeline
                            style={styles.list}
                            data={dataMorning}
                            circleSize={20}
                            circleColor="#bcbcbc"
                            lineColor="#bcbcbc"
                            timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
                            timeStyle={{ textAlign: 'center', padding: 5, borderRadius: 13 }}
                            descriptionStyle={{ color: 'black' }}
                            options={{
                                style: { paddingTop: 5 }
                            }}
                            innerCircle='icon'
                            renderDetail={renderDetail}
                            separator={false}
                            isUsingFlatlist={false}
                        />
                    </View>
                    <View >
                        <Timeline
                            style={styles.list}
                            data={dataAfternoon}
                            circleSize={20}
                            circleColor="#bcbcbc"
                            lineColor="#bcbcbc"
                            timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
                            timeStyle={{ textAlign: 'center', padding: 5, borderRadius: 13 }}
                            descriptionStyle={{ color: 'black' }}
                            options={{
                                style: { paddingTop: 5 }
                            }}
                            innerCircle='icon'
                            renderDetail={renderDetail}
                            separator={false}
                            isUsingFlatlist={true}

                        />
                    </View>
                </View>
            </ScrollView>

        </>

    );

}


function renderDetail(rowData, sectionID, rowID) {
    let title = <Text style={[styles.title]}>{rowData.title}</Text>
    var desc = null
    desc = (
        <View style={styles.descriptionContainer}>
            <Text style={[styles.textDescription]}>{rowData.description}</Text>
        </View>
    )

    return (
        rowData.header ? (
            <View >
                <Text style={styles.header}>{rowData.header}</Text>
            </View>) : rowData.title ? (
                <View style={styles.detailContainerStyle}>
                    <View style={{ flex: 1 }}>
                        {title}
                        {desc}
                    </View>
                </View>
            ) : (
            <View style={styles.detailContainerStyle2}>
                <View style={{ flex: 1 }}>

                </View>
            </View>)

    )
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
    }

});
