import renderer from 'react-test-renderer';
import { ScrollView, StyleSheet, Text, TextInput, View,Image, Pressable , TouchableOpacity ,ActivityIndicator, Dimensions, Keyboard } from 'react-native'
import React,{useState, useRef, useEffect, useContext} from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTogglePasswordVisibility } from '../components/hooks/useTogglePasswordVisibility';
import axios from 'axios';
import { showMessage, hideMessage } from "react-native-flash-message";
import {AuthContext} from '../components/context/AuthContext';
import * as Keychain from 'react-native-keychain';
import {AxiosContext} from '../components/context/AxiosContext';
import { MMKV } from 'react-native-mmkv'
import NetInfo from "@react-native-community/netinfo";
import InternetCheck from '../components/InternetCheck';
import Loader from './Loader';
import messaging from '@react-native-firebase/messaging';
import StuLogin from './StuLogin';

jest.mock('react-native');
jest.mock('react-native-vector-icons/MaterialCommunityIcons');
jest.mock('../components/hooks/useTogglePasswordVisibility');
jest.mock('axios');
jest.mock("react-native-flash-message");
jest.mock('../components/context/AuthContext');
jest.mock('react-native-keychain');
jest.mock('../components/context/AxiosContext');
jest.mock('react-native-mmkv');
jest.mock("@react-native-community/netinfo");
jest.mock('../components/InternetCheck');
jest.mock('./Loader');
jest.mock('@react-native-firebase/messaging');

const renderTree = tree => renderer.create(tree);
describe('<StuLogin>', () => {
  it('should render component', () => {
    expect(renderTree(<StuLogin 
    />).toJSON()).toMatchSnapshot();
  });
  
});