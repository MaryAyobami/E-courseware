import renderer from 'react-test-renderer';
import { StyleSheet, Text, View , Dimensions} from 'react-native'
import React from 'react'
import LottieView from "lottie-react-native";
import { useState } from "react";
import Loader from './Loader';

jest.mock('react-native');
jest.mock("lottie-react-native");

const renderTree = tree => renderer.create(tree);
describe('<Loader>', () => {
  it('should render component', () => {
    expect(renderTree(<Loader 
    />).toJSON()).toMatchSnapshot();
  });
  
});