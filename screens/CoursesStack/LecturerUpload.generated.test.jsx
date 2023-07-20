import renderer from 'react-test-renderer';
import { StyleSheet, Text, View,TextInput,Pressable, TouchableOpacity, Dimensions, ScrollView} from 'react-native'
import React,{useState,useRef,useCallback,useContext} from 'react'
import {data} from '../../components/DepartmentData.js'
import { Spinner } from '../Spinner.jsx';
import {AxiosContext} from '../../components/context/AxiosContext.js';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import { showMessage, hideMessage } from "react-native-flash-message";
import DocumentPicker from 'react-native-document-picker';
import { AuthContext } from '../../components/context/AuthContext.js';
import Header from '../Header.jsx';
import { DrawerActions } from '@react-navigation/native';
import Pdf from 'react-native-pdf';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from '../Loader.jsx';
import LecturerUpload from './LecturerUpload';

jest.mock('react-native');
jest.mock('../../components/DepartmentData.js');
jest.mock('../Spinner.jsx');
jest.mock('../../components/context/AxiosContext.js');
jest.mock('axios');
jest.mock('react-native-element-dropdown');
jest.mock("react-native-flash-message");
jest.mock('react-native-document-picker');
jest.mock('../../components/context/AuthContext.js');
jest.mock('../Header.jsx');
jest.mock('@react-navigation/native');
jest.mock('react-native-pdf');
jest.mock('react-native-vector-icons/MaterialCommunityIcons');
jest.mock('../Loader.jsx');

const renderTree = tree => renderer.create(tree);
describe('<LecturerUpload>', () => {
  it('should render component', () => {
    expect(renderTree(<LecturerUpload 
    />).toJSON()).toMatchSnapshot();
  });
  
});