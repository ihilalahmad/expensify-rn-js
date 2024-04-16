import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { colors } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';

const HomeScreenHeader = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <View>
      <View className='flex-row justify-between items-center p-4'>
        <Text className={`${colors.heading} font-bold text-3xl shadow-sm`}>
          Expensify
        </Text>
        <TouchableOpacity
          onPress={handleLogout}
          className='p-2 px-3 bg-white border border-gray-200 rounded-full'
        >
          <Text className={colors.heading}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View className='flex-row justify-center items-center bg-blue-200 rounded-xl mx-4 mb-4'>
        <Image
          source={require('../../../assets/images/banner.png')}
          className='w-60 h-60'
        />
      </View>
    </View>
  );
};

export default HomeScreenHeader;
