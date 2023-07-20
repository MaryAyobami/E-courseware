import renderer from 'react-test-renderer';
import { Pressable, StyleSheet, Text, View, Image , Dimensions} from 'react-native'
import React from 'react'
import Login from './Login';

jest.mock('react-native');

const renderTree = tree => renderer.create(tree);
describe('<Login>', () => {
  it('should render component', () => {
    expect(renderTree(<Login 
    />).toJSON()).toMatchSnapshot();
  });
  
});