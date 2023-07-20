import renderer from 'react-test-renderer';
import { StyleSheet, Text, View , TextInput, Pressable, Button, TouchableOpacity, Keyboard , FlatList,ActivityIndicator, ScrollView, Dimensions} from 'react-native'
import React, { useRef, useState,useContext, useEffect } from 'react'
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Resource from '../../components/Resource';
import {AxiosContext} from '../../components/context/AxiosContext';
import {data} from '../../components/DepartmentData.js'
import { Dropdown } from 'react-native-element-dropdown';
import CheckBox from '@react-native-community/checkbox';
import { Spinner } from '../Spinner';
import Loader from '../Loader';
import { showMessage, hideMessage } from "react-native-flash-message";
import NetInfo from "@react-native-community/netinfo";
import InternetCheck from '../../components/InternetCheck';
import { AuthContext } from '../../components/context/AuthContext';
import Search from './Search';

jest.mock('react-native');
jest.mock('axios');
jest.mock('react-native-vector-icons/MaterialCommunityIcons');
jest.mock('../../components/Resource');
jest.mock('../../components/context/AxiosContext');
jest.mock('../../components/DepartmentData.js');
jest.mock('react-native-element-dropdown');
jest.mock('@react-native-community/checkbox');
jest.mock('../Spinner');
jest.mock('../Loader');
jest.mock("react-native-flash-message");
jest.mock("@react-native-community/netinfo");
jest.mock('../../components/InternetCheck');
jest.mock('../../components/context/AuthContext');

const renderTree = tree => renderer.create(tree);
describe('<Search>', () => {
  it('should render component', () => {
    expect(renderTree(<Search 
    />).toJSON()).toMatchSnapshot();
  });
  
});