import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

export const Spinner = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#470d3b" />
  </View>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f1e9',
  },
});