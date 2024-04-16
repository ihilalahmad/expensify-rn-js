import { StatusBar, SafeAreaView, Platform } from 'react-native';
import React from 'react';

const ScreenWrapper = ({ children }) => {
  const statusBarHeight = StatusBar.currentHeight
    ? StatusBar.currentHeight
    : Platform.OS == 'ios'
    ? 30
    : 0;
  return (
    <SafeAreaView style={{ paddingTop: statusBarHeight }}>
      {children}
    </SafeAreaView>
  );
};

export default ScreenWrapper;
