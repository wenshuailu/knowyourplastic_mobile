import React, { Component } from "react";
import HomeScreen from "./HomeScreen.js";
// import MainScreenNavigator from "../ChatScreen/index.js";
import Profile from "../ProfileScreen/index.js";
import SideBar from "../SideBar/SideBar.js";
import Camera from "../CameraScreen/index.js";
import Resource from "../ResourceScreen/index.js";
import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from "react-navigation-drawer";
const HomeScreenRouter = createDrawerNavigator(
  {
    Home: { screen: HomeScreen },
    Camera: { screen: Camera },
    Profile: { screen: Profile },
    Resource: { screen: Resource }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default createAppContainer(HomeScreenRouter);