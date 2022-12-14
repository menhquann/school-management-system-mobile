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

export default function CalendarDetail() {



  const [listSchoolYear, setListSchoolYear] = useState([]);
  const [schoolYear, setSchoolYear] = useState(1);
  const [semester, setSemester] = useState(1);
  const [schoolYearName, setSchoolYearName] = useState("Năm học 2022-2023");
  const [semesterName, setSemesterName] = useState("Học kì 1");

  const [apiData, setApiData] = useState([]);

  const [isFocus, setIsFocus] = useState(false);

  const data = {
    semester: [
      { value: 1, label: "Học kì 1" },
      { value: 2, label: "Học kì 2" },
      // { value: 2, label: "Cả năm" },
    ],
  }


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
        const dataCalendar = await axios.get(`users/calendar?schoolYearId=${schoolYearArray[0].value}&semesterId=1&calendarEventType=Meeting`);
        console.log("apiinit", `users/calendar?schoolYearId=${schoolYearArray[0].value}&semesterId=1&calendarEventType=Meeting`)
        // apiData = (dataCalendar.data.data.items)
        setApiData(dataCalendar.data.data.items);
      } catch (e) { }
    })();
  }, []);

  const handleLearningResult = async (schoolYearId, semesterId) => {
    const dataCalendar = await axios.get(`users/calendar?schoolYearId=${schoolYearId}&semesterId=${semesterId}&calendarEventType=Meeting`);
    console.log("apicall", `users/calendar?schoolYearId=${schoolYearId}&semesterId=${semesterId}&calendarEventType=Meeting`)
    // apiData = (dataCalendar.data.data.items)
    console.log("apicall", dataCalendar.data.data.items)

    setApiData(dataCalendar.data.data.items)
    // setLearningResult(dataLearningResult)
  }

  var dataCalendar = [

    // { time: '10-01-2001', title: 'Toán', description: 'A101', timeStart: '10:00 AM', timeFinish: '11:00 AM' },


  ]
  console.log("sort ", apiData[0]?.calendarDate)
  apiData.sort(
    (a, b) => {
      const x = a.calendarDate;
      const y = b.calendarDate;
      if (x > y) {
        return 1;
      }
      if (x < y) {
        return -1;
      }
      return 0;
    }
  ).forEach(item => {
    dataCalendar.push({ time: item.calendarDate, title: `${item.calendarEvent}`, description: `Phòng: ${item.roomName}`, timeStart: item.timeStart, timeFinish: item.timeFinish })
  })


  // console.log("data", dataCalendar)
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
                handleLearningResult(schoolYear, item.value);
                // handleCity(country, item.value);
                setSemesterName(item.label);
                setIsFocus(false);
              }}
            />



          </View>

          <View >
            <Timeline
              style={styles.list}
              data={dataCalendar}
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
    paddingHorizontal: 4,
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
