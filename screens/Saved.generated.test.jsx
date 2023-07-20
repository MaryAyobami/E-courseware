import renderer from 'react-test-renderer';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Empty from './Empty'
import Header from './Header'
import { storage } from './StuLogin'
import Resource from '../components/Resource'
import { DrawerActions } from '@react-navigation/native';
import FileViewer from 'react-native-file-viewer';
import { concat } from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Saved from './Saved';

jest.mock('react-native');
jest.mock('./Empty');
jest.mock('./Header');
jest.mock('./StuLogin');
jest.mock('../components/Resource');
jest.mock('@react-navigation/native');
jest.mock('react-native-file-viewer');
jest.mock('react-native-reanimated');
jest.mock('react-native-vector-icons/MaterialCommunityIcons');

const renderTree = tree => renderer.create(tree);
describe('<Saved>', () => {
  it('should render component', () => {
    expect(renderTree(<Saved 
    />).toJSON()).toMatchSnapshot();
  });
  
});