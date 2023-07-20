import renderer from 'react-test-renderer';
import { StyleSheet, Text, TouchableOpacity, Dimensions,View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Verification from './Verification';

jest.mock('react-native');
jest.mock('react-native-vector-icons/MaterialCommunityIcons');

const renderTree = tree => renderer.create(tree);
describe('<Verification>', () => {
  it('should render component', () => {
    expect(renderTree(<Verification 
    />).toJSON()).toMatchSnapshot();
  });
  
});