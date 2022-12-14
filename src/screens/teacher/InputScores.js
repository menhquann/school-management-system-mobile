
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import AuthContext from '../../context/AuthProvider';
var type = "A1"
export default function App() {
    const { schoolYearContext, clazzContext, semesterContext, typeScoreContext } = useContext(AuthContext);
    const [inputs, setInputs] = useState({});

    const [username, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [data, setData] = useState([])

    const handleChange = (value, name) => {
        // const name = event.target.name;
        // const value = e.target.value;
        console.log("name", name)
        console.log("value", value)
        setInputs(values => ({ ...values, [name]: parseFloat(value) }))
    }
    const MOCK_DATA = {
        "clazz": {
            "classId": 1,
            "className": "10/1"
        },
        "subject": {
            "subjectId": 3,
            "subject": "Chemistry"
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
                        "score": 7.0,
                        "type": "A1"
                    },
                    {
                        "score": 8.0,
                        "type": "B2"
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
                        "score": 8.0,
                        "type": "A1"
                    },
                    {
                        "score": 10.0,
                        "type": "C1"
                    }
                ]
            },
            {
                "student": {
                    "studentId": 104,
                    "lastName": "Nguyễn Hữu",
                    "firstName": "Hậu"
                },
                "scores": []
            }
        ]
    }


    useEffect(() => {
        (async () => {
            try {
                // console.log("dataApi", `examresults/class?schoolYearId=${schoolYearContext}&semesterId=${semesterContext}&classId=${clazzContext}`)
                const { data } = await axios.get(`examresults/class?schoolYearId=${schoolYearContext}&semesterId=${semesterContext}&classId=${clazzContext}`);
                // console.log("abc", data)
                const tempInputs = {}
                const tempData = []
                data.data.examResults.forEach(element => {
                    tempData.push({
                        id: element.student.studentId,
                        name: `${element.student.lastName} ${element.student.firstName}`
                    })
                    element.scores.forEach(element2 => {
                        tempInputs[`${element.student.studentId}${element2.type}`] = element2.score
                    })
                });
                console.log("tempInputs", tempInputs)
                setInputs(tempInputs)

                setData(tempData.sort(
                    (a, b) => {
                        const x = a.id;
                        const y = b.id;

                        return x - y;
                    }
                )
                )
            } catch (e) { }
        })();
    }, []);

    console.log("inputs", inputs)


    const handleSubmit = async (event) => {
        event.preventDefault();
        const studentScores = [];
        for (let key in inputs) {
            if (studentScores.find((item) => item?.studentId === key.slice(0, -2)))
                studentScores
                    .find((item) => item?.studentId === key.slice(0, -2))
                    .scores.push({
                        score: parseFloat(inputs[key]),
                        type: key.slice(-2),
                    });
            else
                studentScores.push({
                    studentId: key.slice(0, -2),
                    scores: [
                        {
                            score: parseFloat(inputs[key]),

                            type: key.slice(-2),
                        },
                    ],
                });
        }
        const dataUpdate = {
            schoolYearId: schoolYearContext,
            semesterId: semesterContext,
            studentScores: studentScores,
        };
        console.log(dataUpdate);
        const { data } = await axios.post("inputscores", dataUpdate);
        console.log(data);
    };
    return (
        <View style={styles.container}>
            <FlatList
                style={{ flex: 1 }}
                data={data}
                renderItem={({ item, index }) => <Item item={item} index={index} inputs={inputs} typeScoreContext={typeScoreContext}
                    handleChange={handleChange} />
                }
            // keyExtractor={item => item.email}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Nhập điểm</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

}

function Item({ item, index, handleChange, inputs, typeScoreContext }) {

    return (
        <View style={styles.listItem}>
            <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>{`${index + 1}.${item.name}`}</Text>
            </View>
            <TextInput
                value={inputs[`${item.id}${typeScoreContext}`] || ""}
                onChangeText={(text) => handleChange(text, `${item.id}${typeScoreContext}`)}
                style={styles.input}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        marginTop: 60
    },
    listItem: {
        margin: 5,
        padding: 10,
        backgroundColor: "#FFF",
        width: "80%",
        flex: 1,
        alignSelf: "center",
        flexDirection: "row",
        borderRadius: 5,
        height: 50

    },
    input: {
        backgroundColor: 'rgb(232, 240, 254)',

        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        width: 40
    },
    buttonContainer: {
        flex: 1,
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
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