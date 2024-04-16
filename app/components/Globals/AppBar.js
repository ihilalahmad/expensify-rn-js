import { TouchableOpacity, View, Text } from 'react-native';
import React from 'react';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme';

const AppBar = ({ header, subtitle }) => {
  const navigation = useNavigation();
  return (
    <View className='flex-row justify-between mt-5'>
      <TouchableOpacity
        className='bg-white rounded-full h-8 w-8 '
        onPress={() => {
          navigation.goBack();
        }}
      >
        <ChevronLeftIcon size={30} color={colors.button} />
      </TouchableOpacity>
      <View>
        <Text className={`${colors.heading} text-xl font-bold text-center`}>
          {header}
        </Text>
        <Text className={`${colors.heading} text-xs  text-center`}>
          {subtitle}
        </Text>
      </View>
      <View />
    </View>
  );
};

export default AppBar;
