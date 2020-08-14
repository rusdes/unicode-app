import React, {Component} from 'react';
import ProfileScreen from '../profile/profileScreen';
import SideBar from '../sidebar/sidebar';
import {DrawerNavigator} from 'react-navigation';
const HomeScreenRouter = DrawerNavigator(
  {
    Home: {screen: ProfileScreen},
  },
  {
    contentComponent: (props) => <SideBar {...props} />,
  },
);
export default HomeScreenRouter;
