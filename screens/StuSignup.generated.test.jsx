import renderer from 'react-test-renderer';
import { ScrollView, StyleSheet, Text, TextInput, View,Image, Pressable, Button , TouchableOpacity} from 'react-native'
import React,{useState, useRef, useEffect, useContext} from 'react'
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import {data} from '../components/DepartmentData.js'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTogglePasswordVisibility } from '../components/hooks/useTogglePasswordVisibility';
import { showMessage, hideMessage } from "react-native-flash-message";
import { AxiosContext } from '../components/context/AxiosContext.js';
import NetInfo from "@react-native-community/netinfo";
import InternetCheck from '../components/InternetCheck';
import messaging from '@react-native-firebase/messaging';
import Loader from './Loader.jsx';
import StuSignup from './StuSignup';

jest.mock('react-native');
jest.mock('axios');
jest.mock('react-native-element-dropdown');
jest.mock('../components/DepartmentData.js');
jest.mock('react-native-vector-icons/MaterialCommunityIcons');
jest.mock('../components/hooks/useTogglePasswordVisibility');
jest.mock("react-native-flash-message");
jest.mock('../components/context/AxiosContext.js');
jest.mock("@react-native-community/netinfo");
jest.mock('../components/InternetCheck');
jest.mock('@react-native-firebase/messaging');
jest.mock('./Loader.jsx');

const renderTree = tree => renderer.create(tree);
describe('<StuSignup>', () => {
  it('should render component', () => {
    expect(renderTree(<StuSignup 
    />).toJSON()).toMatchSnapshot();
  });
  
});