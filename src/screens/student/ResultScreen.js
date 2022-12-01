import React, { useEffect, useState } from 'react';
import {
    Alert,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
// import {BASE_URL, API_KEY} from '@env';

const ResultScreen = () => {

    const [listSchoolYear, setListSchoolYear] = useState([]);
    const [learningResult, setLearningResult] = useState();

    const [schoolYear, setSchoolYear] = useState(1);
    const [semester, setSemester] = useState(1);
    const [schoolYearName, setSchoolYearName] = useState("Năm học 2022-2023");
    const [semesterName, setSemesterName] = useState("Học kì 1");

    const [isFocus, setIsFocus] = useState(false);

    var mapSubjects = {
        Biological: "Sinh học",
        Chemistry: "Hóa học",
        Civic_Education: "Giáo dục công dân",
        Defense_Education: "Giáo dục quốc phòng",
        English: "Tiếng Anh",
        Geographic: "Địa lý",
        History: "Lịch Sử",
        Informatics: "Tin học",
        Literature: "Ngữ văn",
        Maths: "Toán học",
        Physic: "Vật lý",
        Physical_Education: "Thể dục",
        Technology: "Tin học"
    }
    console.log("map", "Civic Education".replace(" ", "_"))
    const data = {
        semester: [
            { value: 0, label: "Học kì 1" },
            { value: 1, label: "Học kì 2" },
            { value: 2, label: "Cả năm" },
        ],
    }

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get("students/profile");
                console.log(data.data.learningResults);
                console.log("test1");
                let res = data.data.learningResults.sort((a, b) => {
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
                        value: res[i].learningResultId,
                        label: res[i].schoolYear,
                    });
                }
                setListSchoolYear(
                    schoolYearArray
                );
                setSchoolYear(schoolYearArray[0].value)
                const dataLearningResult = await axios.get(`learningresults/${schoolYearArray[0].value}`);
                console.log("learning", dataLearningResult.data.data)

                setLearningResult(dataLearningResult)
            } catch (e) { }
        })();
    }, []);
    console.log("test 2");


    const handleLearningResult = async (learningResultId) => {
        const dataLearningResult = await axios.get(`learningresults/${learningResultId}`);
        // console.log("learning", dataLearningResult.data.data)

        setLearningResult(dataLearningResult)
    }



    const res = [1, 2, 3]
    return (
        <ScrollView>

            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style={{
                    // backgroundColor: '#fff',
                    paddingTop: 20,
                    paddingLeft: 20,
                    paddingRight: 20,
                    borderRadius: 15
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
                            setLearningResult()
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


                <TableView appearance="light" style={{
                    padding: 0,
                    margin: 0,
                }}>
                    <Section sectionPaddingBottom={0} marginBottom={10}>
                        <Cell cellStyle="RightDetail" title="Tb các môn" detail={learningResult?.data.data.learningResult.averageScore} />
                        <Cell cellStyle="RightDetail" title="Học lực" detail={learningResult?.data.data.learningResult.averageScore} />
                        <Cell cellStyle="RightDetail" title="Hạnh kiểm" detail={learningResult?.data.data.learningResult.conduct} />
                        <Cell cellStyle="RightDetail" title="Danh hiệu" detail={learningResult?.data.data.learningResult.learningGrade} />


                        {/* <Section headerComponent={<CustomSectionHeader />}> */}
                    </Section>
                    {console.log("studyScores", learningResult?.data.data.studyScores)}
                    {learningResult?.data.data.studyScores.map((item) => (

                        <Section header={mapSubjects[item.subject.subject.replace(" ", "_")]} sectionPaddingBottom={0} headerTextStyle={{
                            fontSize: 20,
                            fontWeight: "bold",
                            color: "#000000"
                        }}>
                            {/* {console.log(item.semesters[0].exams[1].score)} */}
                            <Cell cellStyle="RightDetail" title="Miệng:" detail={item?.semesters[semester]?.exams[0].scores.join(" ")} />
                            <Cell cellStyle="RightDetail" title="15 phút:" detail={item?.semesters[semester]?.exams[1].scores.join(" ")} />
                            <Cell cellStyle="RightDetail" title="1 tiết:" detail={item?.semesters[semester]?.exams[2].scores.join(" ")} />
                            <Cell cellStyle="RightDetail" title="Học kì:" detail={item?.semesters[semester]?.exams[3].scores.join(" ")} />
                            <Cell cellStyle="RightDetail" title="TBM:" detail={item?.semesters[semester]?.averageScore} />

                            {/* <Section headerComponent={<CustomSectionHeader />}> */}
                        </Section>

                    ))}

                </TableView>



            </View >
        </ScrollView>
    );
};

export default ResultScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,


        // flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        // padding: 16,
        // justifyContent: 'center',
        // alignContent: 'center',
    },
    dropdown: {
        flex: 1,
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        // paddingHorizontal: 8,
        marginBottom: 10,
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



