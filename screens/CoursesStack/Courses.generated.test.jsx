import renderer from 'react-test-renderer';
import { ScrollView, StyleSheet, Text, TextInput, View, Dimensions ,FlatList, TouchableOpacity,Keyboard, Image, ActivityIndicator} from 'react-native'
import React,{useContext, useEffect,useRef,useState} from 'react'
import { AxiosContext} from '../../components/context/AxiosContext'
import { storage } from '../StuLogin';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader2 from '../Loader2';
import NetInfo from "@react-native-community/netinfo";
import InternetCheck from '../../components/InternetCheck';
import messaging from '@react-native-firebase/messaging';
import { showMessage, hideMessage } from "react-native-flash-message";
import {useFloating, shift} from '@floating-ui/react-native';
import Resource from '../../components/Resource';
import { set } from 'react-native-reanimated';
import Courses from './Courses';

jest.mock('react-native');
jest.mock('../../components/context/AxiosContext');
jest.mock('../StuLogin');
jest.mock('react-native-vector-icons/MaterialCommunityIcons');
jest.mock('../Loader2');
jest.mock("@react-native-community/netinfo");
jest.mock('../../components/InternetCheck');
jest.mock('@react-native-firebase/messaging');
jest.mock("react-native-flash-message");
jest.mock('@floating-ui/react-native');
jest.mock('../../components/Resource');
jest.mock('react-native-reanimated');

const renderTree = tree => renderer.create(tree);
describe('<Courses>', () => {
  it('should render component', () => {
    expect(renderTree(<Courses 
    />).toJSON()).toMatchSnapshot();
  });
  
});