import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import ProfileScreen from './appAttRafael/components/ProfileScreen';
import ScrollScreen from './appAttRafael/components/ScrollScreen';
const Drawer = createDrawerNavigator();
export default function AppNavigator({ setIsAuthenticated }) {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home">
                {() => <HomeScreen setIsAuthenticated={setIsAuthenticated} />}
            </Drawer.Screen>
            <Drawer.Screen name="Profile">
                {() => <ProfileScreen setIsAuthenticated={setIsAuthenticated} />}
            </Drawer.Screen>
            <Drawer.Screen name="Scroll">
                {() => <ScrollScreen setIsAuthenticated={setIsAuthenticated} />}
            </Drawer.Screen>
        </Drawer.Navigator>
    );
}