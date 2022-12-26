
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import AuthContext from '../../context/AuthProvider';
import Toast from 'react-native-toast-message';
var type = "A1"
export default function App() {
    const { schoolYearContext, clazzContext, semesterContext, typeScoreContext } = useContext(AuthContext);
    const [inputs, setInputs] = useState({});

    const [username, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [data, setData] = useState([])
    console.log("aaaaaaaaaaaaaaaa")
    const handleChange = (value, name) => {
        // const name = event.target.name;
        // const value = e.target.value;
        console.log("name", name)
        console.log("value", value)
        setInputs(values => ({ ...values, [name]: (value) }))
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
                        tempInputs[`${element.student.studentId}${element2.type}`] = `${element2.score}`
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
            if (parseFloat(inputs[key].replace(",", ".")) > 10) {
                Toast.show({
                    type: 'error',
                    text1: 'Điểm phải bé hơn 10!',
                    // text2: 'Tài khoản hoặc mật khẩu không chính xác!',
                    visibilityTime: 3500,
                    // autoHide: true
                });
                return
            }
            if (studentScores.find((item) => item?.studentId === key.slice(0, -2)))

                studentScores
                    .find((item) => item?.studentId === key.slice(0, -2))
                    .scores.push({
                        score: (inputs[key]).replace(",", "."),
                        type: key.slice(-2),
                    });
            else
                studentScores.push({
                    studentId: key.slice(0, -2),
                    scores: [
                        {
                            score: (inputs[key]).replace(",", "."),

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
        try {
            await axios.post("inputscores", dataUpdate);
            Toast.show({
                type: 'success',
                text1: 'Nhập điểm thành công!',
                // text2: 'Tài khoản hoặc mật khẩu không chính xác!',
                visibilityTime: 2000,
                // autoHide: true
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Định dạng điểm không đúng!',
                // text2: 'Tài khoản hoặc mật khẩu không chính xác!',
                visibilityTime: 3500,
                // autoHide: true
            });
        }


    };
    return (
        <View style={styles.container}>
            <View style={{ flex: 5 }}>
                <FlatList
                    // style={{ flex: 1 }}
                    data={data}
                    renderItem={({ item, index }) => <Item item={item} index={index} inputs={inputs} typeScoreContext={typeScoreContext}
                        handleChange={handleChange} />
                    }
                // keyExtractor={item => item.email}
                />
            </View>


            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Lưu</Text>
                </TouchableOpacity>
            </View>
        </View>

    );

}

function Item({ item, index, handleChange, inputs, typeScoreContext }) {
    { console.log(`${item.id}${typeScoreContext}`, inputs[`${item.id}${typeScoreContext}`]) }
    return (

        <View style={styles.listItem}>
            <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>{`${index + 1}.${item.name}`}</Text>
            </View>
            <TextInput
                style={styles.input}
                value={inputs[`${item.id}${typeScoreContext}`]}
                // value={1}

                onChangeText={(text) => handleChange(text, `${item.id}${typeScoreContext}`)}

                keyboardType="numeric"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        marginTop: 10
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
        // paddingVertical: 10,
        borderRadius: 10,
        // marginTop: 5,
        width: 60
    },
    buttonContainer: {
        flex: 3,
        width: '60%',
        // justifyContent: 'center',
        // alignItems: 'center',
        paddingTop: 40,
        marginBottom: 20,
        marginLeft: 75
    },
    button: {
        // flex: 1,
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