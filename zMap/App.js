/**
 * Sample React Native App
 *
 * @format
 * @flow
 */

import React from 'react';
import {SafeAreaView, StyleSheet, View, StatusBar} from 'react-native';
import Map from './src/Map';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <Map />
      </SafeAreaView>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
