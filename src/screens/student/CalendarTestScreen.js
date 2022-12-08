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

export default function CalendarDetail({ dayOfWeek, apiData }) {



  const [listSchoolYear, setListSchoolYear] = useState([]);
  const [schoolYear, setSchoolYear] = useState(1);
  const [semester, setSemester] = useState(0);
  const [schoolYearName, setSchoolYearName] = useState("Năm học 2022-2023");
  const [semesterName, setSemesterName] = useState("Học kì 1");

  const [isFocus, setIsFocus] = useState(false);

  const data = {
    semester: [
      { value: 0, label: "Học kì 1" },
      { value: 1, label: "Học kì 2" },
      // { value: 2, label: "Cả năm" },
    ],
  }

  const apiData2 = [
    {
      "calendarEventId": 11,
      "calendarEvent": "Physic",
      "calendarEventType": "Study",
      "lessonStart": 6,
      "lessonFinish": 7,
      "timeStart": null,
      "timeFinish": null,
      "roomName": null,
      "subjectName": null,
      "calendarDate": "2022-10-20",
      "dayOfWeek": "Monday",
      "teacher": {
        "id": 92,
        "firstName": "Quân",
        "lastName": "Ngô Đình "
      },
      "clazz": null
    },
    {
      "calendarEventId": 14,
      "calendarEvent": "Literature",
      "calendarEventType": "Study",
      "lessonStart": 1,
      "lessonFinish": 1,
      "timeStart": null,
      "timeFinish": null,
      "roomName": null,
      "subjectName": "Literature",
      "calendarDate": null,
      "dayOfWeek": "Saturday",
      "teacher": {
        "id": 24,
        "firstName": "Tu Quyen",
        "lastName": "Dang Thi"
      },
      "clazz": null
    },
    {
      "calendarEventId": 19,
      "calendarEvent": "History",
      "calendarEventType": "Study",
      "lessonStart": 1,
      "lessonFinish": 2,
      "timeStart": "08:00",
      "timeFinish": "09:00",
      "roomName": null,
      "subjectName": "History",
      "calendarDate": null,
      "dayOfWeek": "Thursday",
      "teacher": {
        "id": 24,
        "firstName": "Tu Quyen",
        "lastName": "Dang Thi"
      },
      "clazz": null
    },
    {
      "calendarEventId": 25,
      "calendarEvent": "Maths",
      "calendarEventType": "Study",
      "lessonStart": 1,
      "lessonFinish": 1,
      "timeStart": null,
      "timeFinish": null,
      "roomName": null,
      "subjectName": "Maths",
      "calendarDate": null,
      "dayOfWeek": "Monday",
      "teacher": {
        "id": 27,
        "firstName": "Ngọc",
        "lastName": "Nguyễn Giáo"
      },
      "clazz": null
    },
    {
      "calendarEventId": 20,
      "calendarEvent": "Physic",
      "calendarEventType": "Study",
      "lessonStart": 7,
      "lessonFinish": 7,
      "timeStart": "08:00",
      "timeFinish": "09:00",
      "roomName": null,
      "subjectName": "Geographic",
      "calendarDate": null,
      "dayOfWeek": "Friday",
      "teacher": {
        "id": 108,
        "firstName": "Luận",
        "lastName": "Nguyễn Văn"
      },
      "clazz": null
    },
    {
      "calendarEventId": 10,
      "calendarEvent": "English",
      "calendarEventType": "Study",
      "lessonStart": 1,
      "lessonFinish": 1,
      "timeStart": null,
      "timeFinish": null,
      "roomName": null,
      "subjectName": null,
      "calendarDate": "2022-10-20",
      "dayOfWeek": "Tuesday",
      "teacher": {
        "id": 106,
        "firstName": "Peter",
        "lastName": "Parker"
      },
      "clazz": null
    },
    {
      "calendarEventId": 3,
      "calendarEvent": "Informatics",
      "calendarEventType": "Study",
      "lessonStart": 10,
      "lessonFinish": 10,
      "timeStart": null,
      "timeFinish": null,
      "roomName": null,
      "subjectName": null,
      "calendarDate": null,
      "dayOfWeek": "Tuesday",
      "teacher": {
        "id": 78,
        "firstName": "Huấn",
        "lastName": "Nguyễn Văn"
      },
      "clazz": null
    }
  ]
  const dataMorning = [

    { time: '10-01-2001', title: 'Toán', description: 'A101', timeStart: '10:00 AM', timeFinish: '11:00 AM' },
    { time: '10-01-2001', title: 'Toán', description: 'A101', timeStart: '10:00 AM', timeFinish: '11:00 AM' },
    { time: '10-01-2001', title: 'Toán', description: 'A101', timeStart: '10:00 AM', timeFinish: '11:00 AM' },
    { time: '10-01-2001', title: 'Toán', description: 'A101', timeStart: '10:00 AM', timeFinish: '11:00 AM' },
    { time: '10-01-2001', title: 'Toán', description: 'A101', timeStart: '10:00 AM', timeFinish: '11:00 AM' },

  ]


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
                handleLearningResult(item.value);
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
                setSemesterName(item.label);
                setIsFocus(false);
              }}
            />



          </View>

          <View >
            <Timeline
              style={styles.list}
              data={dataMorning}
              circleSize={20}
              // circleColor="#bcbcbc"
              // lineColor="#bcbcbc"
              timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
              timeStyle={{ textAlign: 'center', padding: 5, borderRadius: 13 }}
              descriptionStyle={{ color: 'black' }}
              options={{
                style: { paddingTop: 5 }
              }}
              // innerCircle='icon'
              renderDetail={renderDetail}
              separator={false}
              isUsingFlatlist={false}
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
      <Text style={[styles.textDescription]}>{rowData.timeStart} - {rowData.timeFinish} </Text>
    </View>
  )

  return (
    (
      <View style={styles.detailContainerStyle}>
        <View style={{ flex: 1 }}>
          {title}
          {desc}
        </View>
      </View>
    )

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
    // paddingRight: 50
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  textDescription: {
    flex: 1,
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
    paddingHorizontal: 8,
    marginBottom: 5,
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
