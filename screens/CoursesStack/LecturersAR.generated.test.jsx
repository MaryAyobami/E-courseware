import renderer from 'react-test-renderer';
import { ScrollView, StyleSheet, Text, View ,TouchableOpacity,Modal, Dimensions} from 'react-native'
import React , {useRef, useState, useEffect} from 'react'
import Resource from '../../components/Resource'
import { storage } from '../StuLogin'
import { data } from '../../components/DepartmentData'
import { AxiosContext } from '../../components/context/AxiosContext'
import NetInfo from "@react-native-community/netinfo";
import InternetCheck from '../../components/InternetCheck';
import { showMessage, hideMessage } from "react-native-flash-message";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlatList } from 'react-native-gesture-handler'
import LecturersAR from './LecturersAR';

jest.mock('react-native');
jest.mock('../../components/Resource');
jest.mock('../StuLogin');
jest.mock('../../components/DepartmentData');
jest.mock('../../components/context/AxiosContext');
jest.mock("@react-native-community/netinfo");
jest.mock('../../components/InternetCheck');
jest.mock("react-native-flash-message");
jest.mock('react-native-vector-icons/MaterialCommunityIcons');
jest.mock('react-native-gesture-handler');

const renderTree = tree => renderer.create(tree);
describe('<LecturersAR>', () => {
  it('should render component', () => {
    expect(renderTree(<LecturersAR 
    />).toJSON()).toMatchSnapshot();
  });
  
});