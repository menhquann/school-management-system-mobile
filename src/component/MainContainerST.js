import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import ProfileScreen from '../screens/student/ProfileScreen';
import ResultScreen from '../screens/student/ResultScreen';
import CalendarScreen from '../screens/student/CalendarScreen';
import SettingsScreen from '../screens/student/SettingsScreen';


//Screen names
const profileName = "Hồ sơ";
const resultName = "Điểm";
const calendarName = "TKB";
const settingsName = "Cài đặt";

const Tab = createBottomTabNavigator();

function MainContainerST() {
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
        labelStyle: { paddingBottom: 10, fontSize: 10 },
        style: { padding: 10, height: 70 }
      }}
    >

      <Tab.Screen name={profileName} component={ProfileScreen} />
      <Tab.Screen name={resultName} component={ResultScreen} />
      <Tab.Screen name={calendarName} component={CalendarScreen} />
      <Tab.Screen name={settingsName} component={SettingsScreen} />



    </Tab.Navigator>
    // </NavigationContainer>
  );
}

export default MainContainerST;
