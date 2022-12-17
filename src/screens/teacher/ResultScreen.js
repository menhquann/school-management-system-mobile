import React, { useContext, useEffect, useState } from 'react';
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
import { MAPSUBJECTS } from '../../Constants';
import { useNavigation } from '@react-navigation/native';
// import {BASE_URL, API_KEY} from '@env';
import AuthContext from '../../context/AuthProvider';
const ResultScreen = () => {

    const { teachSubjectContext, setSchoolYearContext, setClazzContext, setSemesterContext, setTypeScoreContext } = useContext(AuthContext);
    const [listSchoolYear, setListSchoolYear] = useState([]);
    const [listClass, setListClass] = useState([]);
    const [learningResult, setLearningResult] = useState();

    const [schoolYear, setSchoolYear] = useState(1);
    const [clazz, setClazz] = useState(1);
    // const [class, setClass] = useState(1);
    const [semester, setSemester] = useState(1);
    const [typeScore, setTypeScore] = useState("A1");
    const [schoolYearName, setSchoolYearName] = useState("Năm học 2022-2023");
    const [semesterName, setSemesterName] = useState("Học kì 1");

    const [isFocus, setIsFocus] = useState(false);
    // const { teachSubjectContext } = useContext(AuthContext);

    const navigation = useNavigation()
    console.log("map", "Civic Education".replace(" ", "_"))
    console.log("typeScore", typeScore)
    const data = {
        semester: [
            { value: 1, label: "Học kì 1" },
            { value: 2, label: "Học kì 2" },
            // { value: 2, label: "Cả năm" },
        ],
        typeScore: [
            { value: "A1", label: "Điểm miệng lần 1" },
            { value: "A2", label: "Điểm miệng lần 2" },
            { value: "A3", label: "Điểm miệng lần 3" },
            { value: "B1", label: "Điểm 15 phút lần 1" },
            { value: "B2", label: "Điểm 15 phút lần 2" },
            { value: "B3", label: "Điểm 15 phút lần 3" },
            { value: "B4", label: "Điểm 15 phút lần 4" },
            { value: "C1", label: "Điểm thục hành " },
            { value: "D1", label: "Điểm 1 tiết lần 1" },
            { value: "D2", label: "Điểm 1 tiết lần 2" },
            { value: "D3", label: "Điểm 1 tiết lần 3" },
            { value: "D4", label: "Điểm 1 tiết lần 4" },
            { value: "E1", label: "Điểm cuối kì " },


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

                const dataClass = await axios.get(`classes?schoolYearId=${schoolYearArray[0].value}`);
                console.log("dataClass", dataClass);
                // console.log("test1");
                let resClass = dataClass.data.data.items.sort((a, b) => {
                    const x = a.clazz;
                    const y = b.clazz;
                    if (x > y) {
                        return 1;
                    }
                    if (x < y) {
                        return -1;
                    }
                    return 0;
                });
                console.log("resClass", resClass)
                var count = Object.keys(resClass).length;
                let classArray = [];
                for (var i = 0; i < count; i++) {
                    // if (classArray.find((item) => (item?.value == resClass[i].classId)))
                    classArray.push({
                        value: resClass[i].classId,
                        label: `Lớp ${resClass[i].clazz}`,

                    });

                }
                // classArray = [... new { classArray }]
                console.log("classArray", new Set(classArray))
                setListClass(
                    classArray
                );
                setClazz(classArray[0].value)





            } catch (e) { }
        })();
    }, []);
    console.log("test 2");



    const handleOnChangeYear = async (schoolYearId) => {
        const dataClass = await axios.get(`classes?schoolYearId=${schoolYearId}`);
        console.log("dataClass", dataClass);
        let resClass = dataClass.data.data.items.sort((a, b) => {
            const x = a.clazz;
            const y = b.clazz;
            if (x > y) {
                return 1;
            }
            if (x < y) {
                return -1;
            }
            return 0;
        });
        console.log("resClass", resClass)
        var count = Object.keys(resClass).length;
        let classArray = [];
        if (count == 0) {
            classArray.push({
                value: 0,
                label: `Không có dữ liệu năm học này`,

            });
        }
        else {
            for (var i = 0; i < count; i++) {
                // if (classArray.find((item) => (item?.value == resClass[i].classId)))
                classArray.push({
                    value: resClass[i].classId,
                    label: `Lớp ${resClass[i].clazz}`,

                });

            }
        }

        setListClass(
            classArray
        );
        setClazz(classArray[0].value)

    }

    const handleSubmit = () => {

        setSchoolYearContext(schoolYear)
        setClazzContext(clazz)
        setSemesterContext(semester)
        setTypeScoreContext(typeScore)

        navigation.push("Scores")
    }

    return (
        <ScrollView>

            <View style={styles.container}>
                {/* <StatusBar barStyle="light-content" /> */}
                <View style={{
                    flex: 1,
                    // flexDirection: "row",
                    backgroundColor: '#fff',
                    paddingTop: 5,
                    paddingBottom: 10,
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
                            setSchoolYearName(item.label);
                            handleOnChangeYear(item.value);
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
                        data={listClass}
                        // search
                        // maxHeight={300}
                        labelField="label"
                        valueField="value"
                        // placeholder={!isFocus ? 'Select state' : '...'}
                        // searchPlaceholder="Search..."
                        value={clazz}
                        // select
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}

                        onChange={item => {
                            setClazz(item.value);
                            // handleCity(country, item.value);
                            // setSemesterName(item.label);
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
                        // maxHeight={300}
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
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={[{
                            value: 1,
                            label: `${MAPSUBJECTS[teachSubjectContext.replace(" ", "_")]}`,
                        }]}
                        disable
                        // search
                        // maxHeight={300}
                        labelField="label"
                        valueField="value"
                        // placeholder={!isFocus ? 'Select state' : '...'}
                        // searchPlaceholder="Search..."
                        value={1}
                        // select
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}

                        onChange={item => {
                            setClazz(item.value);
                            // handleCity(country, item.value);
                            // setSemesterName(item.label);
                            setIsFocus(false);
                        }}
                    />
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={data.typeScore}
                        // search
                        // maxHeight={300}
                        labelField="label"
                        valueField="value"
                        // placeholder={!isFocus ? 'Select state' : '...'}
                        // searchPlaceholder="Search..."
                        value={typeScore}
                        // select
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}

                        onChange={item => {
                            setTypeScore(item.value);
                            // handleCity(country, item.value);
                            // setSemesterName(item.label);
                            setIsFocus(false);
                        }}
                    />




                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Nhập điểm</Text>
                    </TouchableOpacity>
                </View>




            </View >
        </ScrollView >
    );
};


export default ResultScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',

        // flexDirection: 'row',
        // backgroundColor: '#FFFFFF',
        // padding: 16,
        // justifyContent: 'center',
        // alignContent: 'center',
    },
    dropdown: {
        flex: 1,
        height: 60,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 4,
        marginBottom: 10,
        padding: 16,
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
    buttonContainer: {
        // flex: 1,
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginLeft: 75
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
});



