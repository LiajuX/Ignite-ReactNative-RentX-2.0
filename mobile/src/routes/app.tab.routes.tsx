import React from 'react';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AppStackRoutes } from './app.stack.routes';

import { MyCars } from '../screens/MyCars';
import { Profile } from '../screens/Profile';

import HomeSvg from '../assets/home.svg';
import ProfileSvg from '../assets/people.svg';
import CarSvg from '../assets/car.svg';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
  const theme = useTheme();

  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.main,
        inactiveTintColor: theme.colors.text_detail,
        showLabel: false,
        style: {
          paddingVertical: Platform.OS === 'ios' ? 28 : 0,
          height: 78,
          backgroundColor: theme.colors.background_primary,
        },
      }}
    >
      <Screen 
        name="Home" 
        component={AppStackRoutes} 
        options={{
          tabBarIcon: (({ color }) => (
            <HomeSvg width={24} height={24} fill={color} />
          ))
        }}
      />
      
      <Screen 
        name="MyCars" 
        component={MyCars} 
        options={{
          tabBarIcon: (({ color }) => (
            <CarSvg width={24} height={24} fill={color} />
          ))
        }}
      /> 
      
      <Screen 
        name="Profile" 
        component={Profile} 
        options={{
          tabBarIcon: (({ color }) => (
            <ProfileSvg width={24} height={24} fill={color} />
          ))
        }}
      />
    </Navigator>
  );
}
