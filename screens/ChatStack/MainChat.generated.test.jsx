import renderer from 'react-test-renderer';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useRef, useContext, useState } from 'react'
import { storage } from '../StuLogin'
import { data } from '../../components/DepartmentData'
import { AxiosContext } from '../../components/context/AxiosContext'
import NetInfo from "@react-native-community/netinfo";
import InternetCheck from '../../components/InternetCheck';
import { showMessage, hideMessage } from "react-native-flash-message";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader2 from '../Loader2'
import Loader from '../Loader'
import MainChat from './MainChat';

jest.mock('react-native');
jest.mock('../StuLogin');
jest.mock('../../components/DepartmentData');
jest.mock('../../components/context/AxiosContext');
jest.mock("@react-native-community/netinfo");
jest.mock('../../components/InternetCheck');
jest.mock("react-native-flash-message");
jest.mock('react-native-vector-icons/MaterialCommunityIcons');
jest.mock('../Loader2');
jest.mock('../Loader');

const renderTree = tree => renderer.create(tree);
describe('<MainChat>', () => {
  it('should render component', () => {
    expect(renderTree(<MainChat 
    />).toJSON()).toMatchSnapshot();
  });
  
});