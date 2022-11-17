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
    const [countryData, setCountryData] = useState([]);
    const [stateData, setStateData] = useState([]);
    const [cityData, setCityData] = useState([]);
    const [country, setCountry] = useState(1);
    const [state, setState] = useState(1);
    const [city, setCity] = useState(null);
    const [countryName, setCountryName] = useState("Năm học 2022-2023");
    const [stateName, setStateName] = useState("Học kì 1");
    const [cityName, setCityName] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const data = {
        country: [
            { value: 1, label: "Năm học 2022-2023" },
            { value: 2, label: "Năm học 2021-2022" },
            { value: 3, label: "Năm học 2020-2021" },
        ],
        state: [
            { value: 1, label: "Học kì 1" },
            { value: 2, label: "Học kì 2" },
            { value: 3, label: "Cả năm" },
        ],
    }

    //   axios(config)
    //     .then(response => {
    //       console.log(JSON.stringify(response.data));
    //       var count = Object.keys(response.data).length;
    //       let countryArray = [];
    //       for (var i = 0; i < count; i++) {
    //         countryArray.push({
    //           value: response.data[i].iso2,
    //           label: response.data[i].name,
    //         });
    //       }
    //       setCountryData(countryArray);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // }, []);


    // const handleCity = (countryCode, stateCode) => {
    //   var config = {
    //     method: 'get',
    //     url: `${BASE_URL}/countries/${countryCode}/states/${stateCode}/cities`,
    //     headers: {
    //       'X-CSCAPI-KEY': API_KEY,
    //     },
    //   };

    //   axios(config)
    //     .then(function (response) {
    //       console.log(JSON.stringify(response.data));
    //       var count = Object.keys(response.data).length;
    //       let cityArray = [];
    //       for (var i = 0; i < count; i++) {
    //         cityArray.push({
    //           value: response.data[i].id,
    //           label: response.data[i].name,
    //         });
    //       }
    //       setCityData(cityArray);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // };
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
                        data={data.country}
                        // search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        // placeholder={!isFocus ? 'Select country' : '...'}
                        searchPlaceholder="Search..."
                        value={country}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setCountry(item.value);
                            console.log(country);
                            // handleState(item.value);
                            setCountryName(item.label);
                            setIsFocus(false);
                        }}
                    />
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={data.state}
                        // search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        // placeholder={!isFocus ? 'Select state' : '...'}
                        // searchPlaceholder="Search..."
                        value={state}
                        // select
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}

                        onChange={item => {
                            setState(item.value);
                            // handleCity(country, item.value);
                            setStateName(item.label);
                            setIsFocus(false);
                        }}
                    />
                    {/* <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={data.state}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select city' : '...'}
                    searchPlaceholder="Search..."
                    value={city}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setCity(item.value);
                        setCityName(item.label);
                        setIsFocus(false);
                    }}
                /> */}
                    {/* <TouchableOpacity
                    style={{
                        backgroundColor: '#0F3460',
                        padding: 20,
                        borderRadius: 15,
                        alignItems: 'center',
                    }}
                    onPress={() =>
                        Alert.alert(
                            `You have selected\nCountry: ${countryName}\nState: ${stateName}\nCity: ${cityName}`,
                        )
                    }>
                    <Text
                        style={{
                            color: '#fff',
                            textTransform: 'uppercase',
                            fontWeight: '600',
                        }}>
                        Submit
                    </Text>
                </TouchableOpacity> */}


                </View>


                <TableView appearance="light" style={{
                    padding: 0,
                    margin: 0,
                }}>
                    <Section sectionPaddingBottom={0} marginBottom={10}>
                        <Cell cellStyle="RightDetail" title="Tb các môn" detail="Chưa có" />
                        <Cell cellStyle="RightDetail" title="Học lực" detail="Chưa có" />
                        <Cell cellStyle="RightDetail" title="Hạnh kiểm" detail="Chưa có" />
                        <Cell cellStyle="RightDetail" title="Danh hiệu" detail="Chưa có" />


                        {/* <Section headerComponent={<CustomSectionHeader />}> */}
                    </Section>
                    <Section header='Toán học' sectionPaddingBottom={0} headerTextStyle={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#000000"
                    }}>
                        <Cell cellStyle="RightDetail" title="Miệng:" detail={res.join(" ")} />
                        <Cell cellStyle="RightDetail" title="15 phút:" detail="Chưa có" />
                        <Cell cellStyle="RightDetail" title="1 tiết:" detail="Chưa có" />
                        <Cell cellStyle="RightDetail" title="Học kì:" detail="Chưa có" />
                        <Cell cellStyle="RightDetail" title="TBM:" detail="Chưa có" />

                        {/* <Section headerComponent={<CustomSectionHeader />}> */}
                    </Section>
                    <Section header='Vật lý' sectionPaddingBottom={0} headerTextStyle={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#000000"
                    }}>
                        <Cell cellStyle="RightDetail" title="Miệng:" detail="Chưa có" />
                        <Cell cellStyle="RightDetail" title="15 phút:" detail="Chưa có" />
                        <Cell cellStyle="RightDetail" title="1 tiết:" detail="Chưa có" />
                        <Cell cellStyle="RightDetail" title="Học kì:" detail="Chưa có" />
                        <Cell cellStyle="RightDetail" title="TBM:" detail="Chưa có" />

                        {/* <Section headerComponent={<CustomSectionHeader />}> */}
                    </Section>
                    <Section header='Hóa học' sectionPaddingBottom={0} headerTextStyle={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#000000"
                    }}>
                        <Cell cellStyle="RightDetail" title="Miệng:" detail="Chưa có" />
                        <Cell cellStyle="RightDetail" title="15 phút:" detail="Chưa có" />
                        <Cell cellStyle="RightDetail" title="1 tiết:" detail="Chưa có" />
                        <Cell cellStyle="RightDetail" title="Học kì:" detail="Chưa có" />
                        <Cell cellStyle="RightDetail" title="TBM:" detail="Chưa có" />

                        {/* <Section headerComponent={<CustomSectionHeader />}> */}
                    </Section>
                    <Section header='Sinh học' sectionPaddingBottom={0} headerTextStyle={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#000000"
                    }}>
                        <Cell cellStyle="RightDetail" title="Miệng:" detail="Chưa có" />
                        <Cell cellStyle="RightDetail" title="15 phút:" detail="Chưa có" />
                        <Cell cellStyle="RightDetail" title="1 tiết:" detail="Chưa có" />
                        <Cell cellStyle="RightDetail" title="Học kì:" detail="Chưa có" />
                        <Cell cellStyle="RightDetail" title="TBM:" detail="Chưa có" />

                        {/* <Section headerComponent={<CustomSectionHeader />}> */}
                    </Section>
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



