import renderer from 'react-test-renderer';
import { StyleSheet, Text, View,ScrollView,FlatList, TouchableOpacity } from 'react-native'
import React,{useState,useRef,useEffect,useContext} from 'react'
import Resource from '../../components/Resource'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { storage } from '../StuLogin'
import { data } from '../../components/DepartmentData'
import { AxiosContext } from '../../components/context/AxiosContext'
import NetInfo from "@react-native-community/netinfo";
import InternetCheck from '../../components/InternetCheck';
import { showMessage, hideMessage } from "react-native-flash-message";
import LectureNotes from './LectureNotes';

jest.mock('react-native');
jest.mock('../../components/Resource');
jest.mock('react-native-vector-icons/MaterialCommunityIcons');
jest.mock('../StuLogin');
jest.mock('../../components/DepartmentData');
jest.mock('../../components/context/AxiosContext');
jest.mock("@react-native-community/netinfo");
jest.mock('../../components/InternetCheck');
jest.mock("react-native-flash-message");

const renderTree = tree => renderer.create(tree);
describe('<LectureNotes>', () => {
  it('should render component', () => {
    expect(renderTree(<LectureNotes 
    />).toJSON()).toMatchSnapshot();
  });
  
});