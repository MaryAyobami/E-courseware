import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

export const Spinner = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color='#ee6c4d' />
  </View>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#3d5a80',
  },
});