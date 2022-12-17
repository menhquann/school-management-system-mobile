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
import AuthContext from '../../context/AuthProvider';
// import {BASE_URL, API_KEY} from '@env';
const MOCK_DATA = {
    "clazz": {
        "classId": 1,
        "className": "10/1"
    },
    "subject": {
        "subjectId": 1,
        "subject": "Maths"
    },
    "examResults": [
        {
            "student": {
                "studentId": 100,
                "lastName": "Ngô",
                "firstName": "San"
            },
            "scores": [
                {
                    "id": 85,
                    "score": 5.0,
                    "type": "A1"
                },
                {
                    "id": 85,
                    "score": 7.0,
                    "type": "A2"
                },
                {
                    "id": 85,
                    "score": 8.0,
                    "type": "A3"
                }
            ]
        },
        {
            "student": {
                "studentId": 138,
                "lastName": "Nguyễn Minh",
                "firstName": "Tuấn"
            },
            "scores": [
                {
                    "id": 84,
                    "score": 7.0,
                    "type": "A1"
                },
                {
                    "id": 88,
                    "score": 6.0,
                    "type": "B1"
                }
            ]
        },
        {
            "student": {
                "studentId": 102,
                "lastName": "Nguyễn",
                "firstName": "Huấn"
            },
            "scores": [
                {
                    "id": 82,
                    "score": 7.0,
                    "type": "A1"
                },
                {
                    "id": 86,
                    "score": 5.0,
                    "type": "B1"
                }
            ]
        },
        {
            "student": {
                "studentId": 104,
                "lastName": "Nguyễn Hữu",
                "firstName": "Hậu"
            },
            "scores": [
                {
                    "id": 83,
                    "score": 7.0,
                    "type": "A1"
                },
                {
                    "id": 87,
                    "score": 6.0,
                    "type": "B1"
                }
            ]
        }
    ]
}

const ResultScreen = () => {

    const { schoolYearContext, clazzContext, semesterContext, typeScoreContext } = useContext(AuthContext);

    const [data, setData] = useState([])
    const [inputs, setInputs] = useState({});

    useEffect(() => {
        (async () => {
            try {
                // console.log("dataApiaaaaaa", `examresults/class?schoolYearId=${schoolYearContext}&semesterId=${semesterContext}&classId=${clazzContext}`)
                const { data } = await axios.get(`examresults/class?schoolYearId=${schoolYearContext}&semesterId=${semesterContext}&classId=${clazzContext}`);
                // console.log("abcaaaaaaaaaaaaaa", data.data.examResults)
                // console.log("abcaaaaaaaaaaaaaa", 123)

                setData(data)
            } catch (e) { }
        })();
    }, [data]);

    return (
        <ScrollView>

            <View style={styles.container}>
                {/* <StatusBar barStyle="light-content" /> */}


                <TableView
                    appearance="light"
                    style={{
                        padding: 0,
                        margin: 0,
                        marginHorizontal: 15,
                    }}
                >


                    {console.log("studysScoresâa", data?.examResults)}

                    {data?.data?.examResults
                        ?.sort(
                            (a, b) => {
                                const x = a.student.studentId;
                                const y = b.student.studentId;

                                return x - y;
                            }
                        )
                        .map((item, index) => (

                            <Section
                                sectionPaddingBottom={0} marginBottom={10}
                                roundedCorners={true} hideSurroundingSeparators={true}
                                header={`${index + 1}.${item.student.lastName} ${item.student.firstName}`}
                                // sectionPaddingBottom={10}
                                headerTextStyle={{
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    color: "#000000"
                                }}>
                                {console.log(item?.scores?.filter((score) => (score.type[0] == "A")).map((score) => (score.score)).join(" "))}
                                <Cell cellStyle="RightDetail" title="Miệng:" detail={item?.scores?.filter((score) => (score.type[0] == "A")).map((score) => (score.score)).join("   ")} />
                                <Cell cellStyle="RightDetail" title="15 phút:" detail={item?.scores?.filter((score) => (score.type[0] == "B")).map((score) => (score.score)).join("   ")} />
                                <Cell cellStyle="RightDetail" title="1 tiết:" detail={item?.scores?.filter((score) => (score.type[0] == "D")).map((score) => (score.score)).join("   ")} />
                                <Cell cellStyle="RightDetail" title="Học kì:" detail={item?.scores?.filter((score) => (score.type[0] == "E")).map((score) => (score.score)).join("   ")} />
                                <Cell cellStyle="RightDetail" title="TBM:" detail={""} />

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
        // backgroundColor: '#FFFFFF',
        // padding: 16,
        // justifyContent: 'center',
        // alignContent: 'center',
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



