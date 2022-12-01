/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import {
    StyleSheet,
    Text, useWindowDimensions,
    View
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Timeline from 'react-native-timeline-flatlist'


// var apiData = [
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
// ];


// // const renderScene = async () => {
// //     try {
// //         const { data } = await axios.get("users/classes");
// //         console.log("dataaa1", data)

// //         var idClass = data.data[0].classId
// //         console.log("dataaa1", idClass)
// //         const dataCalendar = await axios.get(`users/calendar?classId=${idClass}&calendarType=Study`);
// //         console.log("dataaa", dataCalendar)
// //         var apiData = dataCalendar.data.data.items
// //     } catch (e) { }

// //     SceneMap({
// //         1: () => CalendarDetail("Monday", apiData),
// //         2: () => CalendarDetail("Tuesday", apiData),
// //         3: () => CalendarDetail("Wednesday", apiData),
// //         4: () => CalendarDetail("Thursday", apiData),
// //         5: () => CalendarDetail("Friday", apiData),
// //         6: () => CalendarDetail("Saturday", apiData),

// //     });
// // }
console.log("hello")
var apiData = [];
// async function getData() {

//     try {
//         const { data } = await axios.get("users/classes");
//         console.log("dataaa1", data)

//         var idClass = data.data[0].classId
//         console.log("dataaa1", idClass)
//         const dataCalendar = await axios.get(`users/calendar?classId=${idClass}&calendarType=Study`);
//         console.log("dataaa", dataCalendar)
//         apiData = (dataCalendar.data.data.items)
//     } catch (e) { }
// }


const renderScene = ({ route }) => {
    // // console.log("1232131")
    // (async () => {

    //     try {
    //         const { data } = await axios.get("users/classes");
    //         console.log("dataaa1", data)

    //         var idClass = data.data[0].classId
    //         console.log("dataaa1", idClass)
    //         const dataCalendar = await axios.get(`users/calendar?classId=${idClass}&calendarType=Study`);
    //         console.log("dataaa", dataCalendar)
    //         apiData = (dataCalendar.data.data.items)
    //     } catch (e) { }



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
export default function CalendarScreen() {
    // getData();

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
        { key: '1', title: 'Thứ 2' },
        { key: '2', title: 'Thứ 3' },
        { key: '3', title: 'Thứ 4' },
        { key: '4', title: 'Thứ 5' },
        { key: '5', title: 'Thứ 6' },
        { key: '6', title: 'Thứ 7' },
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
export function CalendarDetail({ dayOfWeek, apiData }) {


    // const apiData = [
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
    const data = [
        { time: 'Tiết 1', title: '', description: '' },
        { time: 'Tiết 2', title: '', description: '' },
        { time: 'Tiết 3', title: '', description: '' },
        { time: 'Tiết 4', title: '', description: '' },
        { time: 'Tiết 5', title: '', description: '' },
        { time: 'Tiết 6', title: '', description: '' },
        { time: 'Tiết 7', title: '', description: '' },
        { time: 'Tiết 8', title: '', description: '' },
        { time: 'Tiết 9', title: '', description: '' },
        { time: 'Tiết 10', title: '', description: '' },


    ];

    apiData.filter((itemFilter) => itemFilter["dayOfWeek"] == dayOfWeek).map((item) => {
        data[item.lessonStart - 1].title = item.calendarEvent
        data[item.lessonStart - 1].description = item.calendarEvent
    })

    console.log("data", data)
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