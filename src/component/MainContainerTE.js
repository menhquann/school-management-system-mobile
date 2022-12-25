import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import ProfileScreen from '../screens/teacher/ProfileScreen';
import ResultScreen from '../screens/teacher/ResultScreen';
import CalendarScreen from '../screens/teacher/CalendarScreen';
import CalendarMeetingScreen from '../screens/teacher/CalendarMeetingScreen';
import SettingsScreen from '../screens/teacher/SettingsScreen';


//Screen names
const profileName = "Hồ sơ";
const resultName = "Nhập điểm";
const calendarName = "Lịch dạy";
const calendarMeetingName = "Lịch họp";
const settingsName = "Khác";

const Tab = createBottomTabNavigator();

function MainContainerTE() {
  return (
    // <NavigationContainer>
    <Tab.Navigator
      initialRouteName={profileName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === profileName) {
            iconName = focused ? 'person-circle' : 'person-circle-outline';

          } else if (rn === resultName) {
            iconName = focused ? 'book' : 'book-outline';

          } else if (rn === calendarName) {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (rn === calendarMeetingName) {
            iconName = focused ? 'time' : 'time-outline';

          } else if (rn === settingsName) {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'grey',
        labelStyle: { fontSize: 10 },
        style: { paddingTop: 10, height: 80 }
      }}>

      <Tab.Screen name={profileName} component={ProfileScreen} />
      <Tab.Screen name={resultName} component={ResultScreen} />
      <Tab.Screen name={calendarName} component={CalendarScreen} />
      <Tab.Screen name={calendarMeetingName} component={CalendarMeetingScreen} />
      <Tab.Screen name={settingsName} component={SettingsScreen} />



    </Tab.Navigator>
    // </NavigationContainer>
  );
}

export default MainContainerTE;