import renderer from 'react-test-renderer';
import { StyleSheet, Text, View, TouchableOpacity , Dimensions} from 'react-native'
import React, { useEffect,useContext, useState } from 'react'
import { AxiosContext} from '../../components/context/AxiosContext'
import { storage } from '../StuLogin';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader2 from '../Loader2';
import NetInfo from "@react-native-community/netinfo";
import InternetCheck from '../../components/InternetCheck';
import messaging from '@react-native-firebase/messaging';
import { ScrollView } from 'react-native-gesture-handler';
import { showMessage, hideMessage } from "react-native-flash-message";
import Loader from '../Loader';
import LecturerView from './LecturerView';

jest.mock('react-native');
jest.mock('../../components/context/AxiosContext');
jest.mock('../StuLogin');
jest.mock('react-native-vector-icons/MaterialCommunityIcons');
jest.mock('../Loader2');
jest.mock("@react-native-community/netinfo");
jest.mock('../../components/InternetCheck');
jest.mock('@react-native-firebase/messaging');
jest.mock('react-native-gesture-handler');
jest.mock("react-native-flash-message");
jest.mock('../Loader');

const renderTree = tree => renderer.create(tree);
describe('<LecturerView>', () => {
  it('should render component', () => {
    expect(renderTree(<LecturerView 
    />).toJSON()).toMatchSnapshot();
  });
  
});