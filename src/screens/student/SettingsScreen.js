import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { Component, useContext, useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {
    Avatar,
    Title,
    Caption
} from 'react-native-paper';

import { Cell, Section, TableView } from 'react-native-tableview-simple';
import AuthContext from '../../context/AuthProvider';


// Example component for section:headerComponent
const CustomSectionHeader = () => (
    <View >
        <Text style={styles.textHeader}>Thông tin chung</Text>
    </View>
);
export default function ProfileScreen() {
    const { auth } = useContext(AuthContext)
    axios.defaults.baseURL = "http://ndkiet.us-east-1.elasticbeanstalk.com/api/";
    const token = auth.data.access_token

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [schoolName, setSchoolName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState(true);
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [placeOfBirth, setPlaceOfBirth] = useState("");
    const [nationality, setNationality] = useState("");
    const [street, setStreet] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");

    const navigation = useNavigation()

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get("users");
                console.log({ data })
                setFirstName(data.data.user.firstName);
                setLastName(data.data.user.lastName);
                setDisplayName(data.data.user.displayName);
                setSchoolName(data.data.user.schoolName);
                setPhone(data.data.user.phone);
                setEmail(data.data.user.email);
                setGender(data.data.user.gender);
                setDateOfBirth(data.data.user.dateOfBirth);
                setPlaceOfBirth(data.data.user.placeOfBirth);
                setNationality(data.data.user.nationality);
                setStreet(data.data.user.street);
                setDistrict(data.data.user.district);
                setCity(data.data.user.city);

            } catch (e) { }
        })();
    }, []);


    // const mockData = {
    //     "userId": 68,
    //     "username": "student1@thpthoanghoatham",
    //     "lastName": "Nguyen Tran Minh",
    //     "firstName": "Quan",
    //     "displayName": "Nguyen Tran Minh Quan",
    //     "phone": "123411",
    //     "email": "ntmquan@gmail.com",
    //     "avatar": null,
    //     "gender": true,
    //     "dateOfBirth": "2001-10-10",
    //     "placeOfBirth": "Hue",
    //     "nationality": "",
    //     "street": "Ngo Si Lien",
    //     "district": "Quan Lien Chieu",
    //     "city": "Thanh pho Da Nang",
    //     "job": "",
    //     "role": "STUDENT",
    //     "schoolId": 5,
    //     "schoolName": "THPT Hoang Hoa Tham",
    //     "studentId": "student1",
    //     "teacherId": ""
    // }


    return (
        <>
            <ScrollView>
                <View style={styles.userInfoSection}>

                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <Avatar.Text size={80} label={lastName[0] + firstName[0]} />
                        <View style={{ marginLeft: 20 }}>
                            <Title style={[styles.title, {
                                marginTop: 10,
                                marginBottom: 5,
                            }]}>{displayName}</Title>
                            <Caption style={styles.caption}>{schoolName}</Caption>
                        </View>
                    </View>
                </View>
                <TableView appearance="light">
                    <Section >
                        <Cell
                            cellStyle="Basic"
                            title="Đổi mật khẩu"
                            accessory="DisclosureIndicator"
                            onPress={() => navigation.push("ChangePassword")}
                        />
                    </Section>
                    <Section >
                        <Cell
                            cellStyle="Basic"
                            title="Đăng xuất"
                            accessory="DisclosureIndicator"
                            onPress={() => navigation.replace("Login")}
                        />
                    </Section>
                </TableView>

            </ScrollView>

        </>

    );
}
const styles = StyleSheet.create({
    textHeader: {
        backgroundColor: '#EFEFF4',
        paddingBottom: 15,
        fontSize: 20,
        paddingLeft: 12,
        color: '#1F24C4',
    },
    userInfoSection: {
        backgroundColor: '#ffffff',
        paddingTop: 10,
        paddingBottom: 20,
        paddingLeft: 20,

    }

});