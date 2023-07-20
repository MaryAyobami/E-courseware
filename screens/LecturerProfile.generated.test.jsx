import renderer from 'react-test-renderer';
import { StyleSheet, Text, View ,Image, Alert, Dimensions, TouchableOpacity, ScrollView} from 'react-native'
import React,{useCallback,useContext,useEffect,useState,useRef} from 'react'
import * as Keychain from 'react-native-keychain';
import { Spinner } from '../screens/Spinner';
import {AxiosContext} from '../components/context/AxiosContext';
import { AuthContext } from '../components/context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { storage } from './StuLogin';
import { DrawerActions } from '@react-navigation/native';
import LecturerProfile from './LecturerProfile';

jest.mock('react-native');
jest.mock('react-native-keychain');
jest.mock('../screens/Spinner');
jest.mock('../components/context/AxiosContext');
jest.mock('../components/context/AuthContext');
jest.mock('react-native-vector-icons/MaterialCommunityIcons');
jest.mock('axios');
jest.mock('./StuLogin');
jest.mock('@react-navigation/native');

const renderTree = tree => renderer.create(tree);
describe('<LecturerProfile>', () => {
  it('should render component', () => {
    expect(renderTree(<LecturerProfile 
    />).toJSON()).toMatchSnapshot();
  });
  
});