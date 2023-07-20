import renderer from 'react-test-renderer';
import { StyleSheet, Text, View ,Image, Dimensions, TouchableOpacity, ScrollView} from 'react-native'
import React,{useCallback,useContext,useEffect,useState,useRef} from 'react'
import * as Keychain from 'react-native-keychain';
import { Spinner } from '../screens/Spinner';
import {AxiosContext} from '../components/context/AxiosContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { storage } from './StuLogin';
import { DrawerActions } from '@react-navigation/native';
import Profile from './Profile';

jest.mock('react-native');
jest.mock('react-native-keychain');
jest.mock('../screens/Spinner');
jest.mock('../components/context/AxiosContext');
jest.mock('react-native-vector-icons/MaterialCommunityIcons');
jest.mock('axios');
jest.mock('./StuLogin');
jest.mock('@react-navigation/native');

const renderTree = tree => renderer.create(tree);
describe('<Profile>', () => {
  it('should render component', () => {
    expect(renderTree(<Profile 
    />).toJSON()).toMatchSnapshot();
  });
  
});