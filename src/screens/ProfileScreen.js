import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {
    Avatar,
    Title,
    Caption,
} from 'react-native-paper';

import { Cell, Section, TableView } from 'react-native-tableview-simple';


// Example component for section:headerComponent
const CustomSectionHeader = () => (
    <View >
        <Text style={styles.text}>Thông tin chung</Text>
    </View>
);
export default function ProfileScreen() {

    const mockData = {
        "userId": 68,
        "username": "student1@thpthoanghoatham",
        "lastName": "Nguyen Tran",
        "firstName": "Minh Quan",
        "displayName": "Nguyen Tran Minh Quan",
        "phone": "123411",
        "email": "ntmquan@gmail.com",
        "avatar": null,
        "gender": true,
        "dateOfBirth": "2001-10-10",
        "placeOfBirth": "Hue",
        "nationality": "",
        "street": "Ngo Si Lien",
        "district": "Quan Lien Chieu",
        "city": "Thanh pho Da Nang",
        "job": "",
        "role": "STUDENT",
        "schoolId": 5,
        "schoolName": "THPT Hoang Hoa Tham",
        "studentId": "student1",
        "teacherId": ""
    }
    return (
        <>
            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Avatar.Text size={80} label="XD" />
                    <View style={{ marginLeft: 20 }}>
                        <Title style={[styles.title, {
                            marginTop: 15,
                            marginBottom: 5,
                        }]}>John Doe</Title>
                        <Caption style={styles.caption}>@j_doe</Caption>
                    </View>
                </View>
            </View>
            <TableView appearance="light">
                <Section headerComponent={<CustomSectionHeader />}>
                    <Cell cellStyle="RightDetail" title="Họ và tên" detail={mockData.displayName} />
                    <Cell cellStyle="RightDetail" title="Số điện thoại" detail={mockData.phone} />
                    <Cell cellStyle="RightDetail" title="Email" detail={mockData.email} />
                    <Cell cellStyle="RightDetail" title="Giới tính" detail={mockData.gender ? "Nam" : "Nữ"} />
                    <Cell cellStyle="RightDetail" title="Ngày sinh" detail={mockData.dateOfBirth} />
                    <Cell cellStyle="RightDetail" title="Nơi sinh" detail={mockData.placeOfBirth} />
                    <Cell cellStyle="RightDetail" title="Quốc tịch" detail={mockData.nationality} />
                    <Cell cellStyle="RightDetail" title="Đường" detail={mockData.street} />
                    <Cell cellStyle="RightDetail" title="Quận/Huyện" detail={mockData.district} />
                    <Cell cellStyle="RightDetail" title="Tỉnh/Thành phố" detail={mockData.city} />

                    {/* <Section headerComponent={<CustomSectionHeader />}> */}
                </Section>
            </TableView>
        </>

    );
}
const styles = StyleSheet.create({
    text: {
        backgroundColor: '#EFEFF4',
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 20,
        color: '#1F24C4',
    },

});