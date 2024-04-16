import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/Globals/ScreenWrapper';
import HomeScreenHeader from '../components/HomeScreen/HomeScreenHeader';
import TripsList from '../components/HomeScreen/TripsList';

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <ScreenWrapper className='flex-1'>
      <HomeScreenHeader />
      <TripsList />
    </ScreenWrapper>
  );
};

export default HomeScreen;
