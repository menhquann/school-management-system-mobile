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
import { MAPSUBJECTS } from '../../Constants';
import AuthContext from '../../context/AuthProvider';


// Example component for section:headerComponent
const CustomSectionHeader = ({ name }) => (
    <View >
        <Text style={styles.textHeader}>{name}</Text>
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
    const [teachSubject, setTeachSubject] = useState("");

    const [dadFirstName, setDadFirstName] = useState("");
    const [dadLastName, setDadLastName] = useState("");
    const [dadDisplayName, setDadDisplayName] = useState("");
    const [dadDayOfBirth, setDadDayOfBirth] = useState("");
    const [dadPhone, setDadPhone] = useState("");
    const [dadJob, setDadJob] = useState("");
    const [dadStreet, setDadStreet] = useState("");
    const [dadDistrict, setDadDistrict] = useState("");
    const [dadCity, setDadCity] = useState("");

    const [momFirstName, setMomFirstName] = useState("");
    const [momLastName, setMomLastName] = useState("");
    const [momDisplayName, setMomDisplayName] = useState("");
    const [momPhone, setMomPhone] = useState("");
    const [momDayOfBirth, setMomDayOfBirth] = useState("");
    const [momJob, setMomJob] = useState("");
    const [momStreet, setMomStreet] = useState("");
    const [momDistrict, setMomDistrict] = useState("");
    const [momCity, setMomCity] = useState("");
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
                setTeachSubject(data.data.user.teachSubject);
                const profileData = await axios.get("students/profile");
                setDadFirstName(profileData.data.data.student.parents[0].firstName);
                setDadLastName(profileData.data.data.student.parents[0].lastName);
                setDadDisplayName(`${profileData.data.data.student.parents[0].lastName} ${profileData.data.data.student.parents[0].firstName} `);
                setDadDayOfBirth(profileData.data.data.student.parents[0].dayOfBirth);
                setDadPhone(profileData.data.data.student.parents[0].phone);
                setDadJob(profileData.data.data.student.parents[0].job);
                setDadStreet(profileData.data.data.student.parents[0].street);
                setDadDistrict(profileData.data.data.student.parents[0].district);
                setDadCity(profileData.data.data.student.parents[0].city);

                setMomFirstName(profileData.data.data.student.parents[1].firstName);
                setMomLastName(profileData.data.data.student.parents[1].lastName);
                setMomDisplayName(`${profileData.data.data.student.parents[1].lastName} ${profileData.data.data.student.parents[1].firstName}`);
                setMomPhone(profileData.data.data.student.parents[1].phone);
                setMomDayOfBirth(profileData.data.data.student.parents[1].dayOfBirth);
                setMomJob(profileData.data.data.student.parents[1].job);
                setMomStreet(profileData.data.data.student.parents[1].street);
                setMomDistrict(profileData.data.data.student.parents[1].district);
                setMomCity(profileData.data.data.student.parents[1].city);

            } catch (e) { }
        })();
    }, []);


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
                <TableView appearance="light"
                    style={{
                        padding: 0,
                        margin: 0,
                        marginHorizontal: 15,
                    }}>
                    <Section headerComponent={<CustomSectionHeader name="Thông tin cá nhân" />}
                        roundedCorners={true} hideSurroundingSeparators={true}>
                        <Cell cellStyle="RightDetail" title="Họ và tên" detail={displayName} />
                        <Cell cellStyle="RightDetail" title="Số điện thoại" detail={phone} />
                        <Cell cellStyle="RightDetail" title="Email" detail={email} />
                        <Cell cellStyle="RightDetail" title="Giới tính" detail={gender ? "Nam" : "Nữ"} />
                        <Cell cellStyle="RightDetail" title="Ngày sinh" detail={dateOfBirth} />
                        <Cell cellStyle="RightDetail" title="Nơi sinh" detail={placeOfBirth} />
                        {/* <Cell cellStyle="RightDetail" title="Quốc tịch" detail={nationality} /> */}
                        <Cell cellStyle="RightDetail" title="Địa chỉ" detail={street} />
                        <Cell cellStyle="RightDetail" title="Quận/Huyện" detail={district} />
                        <Cell cellStyle="RightDetail" title="Tỉnh/Thành phố" detail={city} />

                        {/* <Section headerComponent={<CustomSectionHeader />}> */}
                    </Section>

                    <Section headerComponent={<CustomSectionHeader name="Thông tin cha" />}
                        roundedCorners={true} hideSurroundingSeparators={true}>
                        <Cell cellStyle="RightDetail" title="Họ và tên" detail={dadDisplayName} />
                        <Cell cellStyle="RightDetail" title="Số điện thoại" detail="0378844750" />
                        <Cell cellStyle="RightDetail" title="Nghề nghiệp" detail={dadJob} />
                        <Cell cellStyle="RightDetail" title="Địa chỉ" detail={dadStreet} />
                        <Cell cellStyle="RightDetail" title="Quận/Huyện" detail={dadDistrict} />
                        <Cell cellStyle="RightDetail" title="Tỉnh/Thành phố" detail={dadCity} />

                        {/* <Section headerComponent={<CustomSectionHeader />}> */}
                    </Section>

                    <Section headerComponent={<CustomSectionHeader name="Thông tin mẹ" />}
                        roundedCorners={true} hideSurroundingSeparators={true}>
                        <Cell cellStyle="RightDetail" title="Họ và tên" detail={momDisplayName} />
                        <Cell cellStyle="RightDetail" title="Số điện thoại" detail="0794433571" />
                        <Cell cellStyle="RightDetail" title="Nghề nghiệp" detail={momJob} />
                        <Cell cellStyle="RightDetail" title="Địa chỉ" detail={momStreet} />
                        <Cell cellStyle="RightDetail" title="Quận/Huyện" detail={momDistrict} />
                        <Cell cellStyle="RightDetail" title="Tỉnh/Thành phố" detail={momCity} />
                        {/* <Section headerComponent={<CustomSectionHeader />}> */}
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