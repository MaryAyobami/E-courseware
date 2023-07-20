import renderer from 'react-test-renderer';
import { StyleSheet, Text, View , Dimensions, TouchableOpacity} from 'react-native'
import React from 'react'
import LottieView from "lottie-react-native";
import { useState } from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader2 from './Loader2';

jest.mock('react-native');
jest.mock("lottie-react-native");
jest.mock('react-native-vector-icons/MaterialCommunityIcons');

const renderTree = tree => renderer.create(tree);
describe('<Loader2>', () => {
  it('should render component', () => {
    expect(renderTree(<Loader2 
    />).toJSON()).toMatchSnapshot();
  });
  
});