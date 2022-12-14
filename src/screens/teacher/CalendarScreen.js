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
import { Dropdown } from 'react-native-element-dropdown';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Timeline from 'react-native-timeline-flatlist'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MAPSUBJECTS } from '../../Constants';
console.log("hello")
// var apiData = [];




export default function CalendarScreen() {

    const [listSchoolYear, setListSchoolYear] = useState([]);
    const [schoolYear, setSchoolYear] = useState(1);
    const [semester, setSemester] = useState(1);
    const [schoolYearName, setSchoolYearName] = useState("Năm học 2022-2023");
    const [semesterName, setSemesterName] = useState("Học kì 1");

    const [isFocus, setIsFocus] = useState(false);
    const [apiData, setApiData] = useState([]);
    const data = {
        semester: [
            { value: 1, label: "Học kì 1" },
            { value: 2, label: "Học kì 2" },
            // { value: 2, label: "Cả năm" },
        ],
    }
    const layout = useWindowDimensions();
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get("schoolyear");
                // console.log(data);
                // console.log("test1");
                let res = data.data.items.sort((a, b) => {
                    const x = a.schoolYear;
                    const y = b.schoolYear;
                    if (x > y) {
                        return -1;
                    }
                    if (x < y) {
                        return 1;
                    }
                    return 0;
                });
                console.log(res)
                var count = Object.keys(res).length;
                let schoolYearArray = [];
                for (var i = 0; i < count; i++) {
                    schoolYearArray.push({
                        value: res[i].schoolYearId,
                        label: `Năm ${res[i].schoolYear}`,

                    });
                }
                setListSchoolYear(
                    schoolYearArray
                );
                setSchoolYear(schoolYearArray[0].value)
                // var idClass = data.data[0].classId
                // console.log("dataaa1", idClass)
                const dataCalendar = await axios.get(`users/calendar?schoolYearId=${schoolYearArray[0].value}&semesterId=1&calendarEventType=Teach`);
                console.log("apiinit", `users/calendar?schoolYearId=${schoolYearArray[0].value}&semesterId=1&calendarEventType=Teach`)
                // apiData = (dataCalendar.data.data.items)
                setApiData(dataCalendar.data.data.items);
            } catch (e) { }
        })();
    }, []);

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
    const handleLearningResult = async (schoolYearId, semesterId) => {
        const dataCalendar = await axios.get(`users/calendar?schoolYearId=${schoolYearId}&semesterId=${semesterId}&calendarEventType=Teach`);
        console.log("apicall", `users/calendar?schoolYearId=${schoolYearId}&semesterId=${semesterId}&calendarEventType=Teach`)
        // apiData = (dataCalendar.data.data.items)
        console.log("apicall", dataCalendar.data.data.items)

        setApiData(dataCalendar.data.data.items)
        // setLearningResult(dataLearningResult)
    }

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const { data } = await axios.get("users/classes");
    //             // console.log("dataaa1", data)

    //             var idClass = data.data[0].classId
    //             // console.log("dataaa1", idClass)
    //             const dataCalendar = await axios.get(`users/calendar?classId=${idClass}&calendarEventType=Study`);
    //             // console.log("dataaa", dataCalendar)
    //             apiData = (dataCalendar.data.data.items)
    //             setReload("a");
    //         } catch (e) { }
    //     })();
    // }, []);

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

            <View style={{
                flex: 1,
                flexDirection: "row",
                backgroundColor: '#fff',
                paddingTop: 5,
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 15,
                borderColor: 'gray',
                borderWidth: 0.5,
                borderRadius: 8,
            }}>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={listSchoolYear}
                    // data={data.country}
                    // search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    // placeholder={!isFocus ? 'Select country' : '...'}
                    searchPlaceholder="Search..."
                    value={schoolYear}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setSchoolYear(item.value);
                        // console.log(country);
                        handleLearningResult(item.value, semester);
                        setSchoolYearName(item.label);
                        // setLearningResult()
                        setIsFocus(false);
                    }}
                />

                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={data.semester}
                    // search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    // placeholder={!isFocus ? 'Select state' : '...'}
                    // searchPlaceholder="Search..."
                    value={semester}
                    // select
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}

                    onChange={item => {
                        setSemester(item.value);
                        // handleCity(country, item.value);
                        handleLearningResult(schoolYear, item.value);

                        setSemesterName(item.label);
                        setIsFocus(false);
                    }}
                />



            </View>

            <TabView
                renderTabBar={renderTabBar}
                // lazy
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                style={{ flex: 11 }}
            />
        </>
    );
}
export function CalendarDetail({ dayOfWeek, apiData }) {



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
            dataMorning[item.lessonStart].title = MAPSUBJECTS[item.subjectName?.replace(" ", "_")]
            dataMorning[item.lessonStart].description = `Lớp: ${item.clazz.name}`
            dataMorning[item.lessonStart].circleColor = 'rgb(0, 122, 255)'
            dataMorning[item.lessonStart].lineColor = 'rgb(0, 122, 255)'
            // circleColor: 'rgb(0, 122, 255)',
            // lineColor: 'rgb(0, 122, 255)'
        } else {
            dataAfternoon[item.lessonStart - 5].title = MAPSUBJECTS[item.subjectName?.replace(" ", "_")]
            dataAfternoon[item.lessonStart - 5].description = `Lớp: ${item.clazz.name}`
            dataAfternoon[item.lessonStart - 5].circleColor = 'rgb(0, 122, 255)'
            dataAfternoon[item.lessonStart - 5].lineColor = 'rgb(0, 122, 255)'
        }

    })

    // console.log("data", dataMorning)
    // console.log("dataApi", apiData)

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

                    {/* <StatusBar barStyle="light-content" /> */}



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
