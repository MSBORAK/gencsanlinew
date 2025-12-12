import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import HomeScreen from '@/screens/HomeScreen';
import TransportScreen from '@/screens/TransportScreen';
import GencKartScreen from '@/screens/GencKartScreen';
import AssistantScreen from '@/screens/AssistantScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import EventsScreen from '@/screens/EventsScreen';
import MagazineScreen from '@/screens/MagazineScreen';
import PartnerDetailScreen from '@/screens/PartnerDetailScreen';
import WelcomeScreen from '@/screens/WelcomeScreen';
import HeritageDetailScreen from '@/screens/HeritageDetailScreen';
import NotificationsScreen from '@/screens/NotificationsScreen';

// Custom Tab Bar
import CustomTabBar from './CustomTabBar';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Transport" component={TransportScreen} />
      <Tab.Screen name="GencKart" component={GencKartScreen} />
      <Tab.Screen name="Assistant" component={AssistantScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Events" component={EventsScreen} />
        <Stack.Screen name="Magazine" component={MagazineScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="PartnerDetail" component={PartnerDetailScreen} />
        <Stack.Screen name="HeritageDetail" component={HeritageDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
