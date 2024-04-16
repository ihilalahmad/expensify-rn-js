import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import ScreenWrapper from '../components/Globals/ScreenWrapper';
import { colors } from '../theme';
import AppBar from '../components/Globals/AppBar';
import { useNavigation } from '@react-navigation/native';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxHook';
import { useUser } from '../redux/selectors/userSelector';
import Loading from '../components/Globals/Loading';
import { setUserLoading } from '../redux/slices/userSlice';

const SinginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userLoading } = useAppSelector(useUser);
  const userDispatch = useAppDispatch();

  const handleSignIn = async () => {
    if (email && password) {
      try {
        userDispatch(setUserLoading(true));
        await signInWithEmailAndPassword(auth, email, password);
        userDispatch(setUserLoading(false));
      } catch (error) {
        userDispatch(setUserLoading(false));
        console.error('Firebase Error:', error.message);
      }
    } else {
      userDispatch(setUserLoading(false));
      Alert.alert('Email & Password are required');
    }
  };

  return (
    <ScreenWrapper>
      <View className='flex justify-between h-full mx-4'>
        <View>
          <AppBar header={'Sign In'} />
          <View className='flex-row justify-center my-3 mt-5'>
            <Image
              className='h-72 w-72'
              source={require('../../assets/images/login.png')}
            />
          </View>
          <View className='space-y-2 mx-2'>
            <Text className='text-lg font-bold '>Email</Text>
            <TextInput
              className='p-4 bg-white rounded-full mb-3'
              onChangeText={(value) => setEmail(value)}
            />
            <Text className='text-lg font-bold '>Password</Text>
            <TextInput
              className='p-4 bg-white rounded-full mb-3'
              onChangeText={(value) => setPassword(value)}
              secureTextEntry
            />
            <TouchableOpacity className='flex-row justify-end'>
              <Text>Forget Password</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          {userLoading ? (
            <Loading />
          ) : (
            <TouchableOpacity
              onPress={handleSignIn}
              style={{ backgroundColor: colors.button }}
              className='my-6 rounded-full p-3 shadow-sm mx-2'
            >
              <Text className='text-center text-white text-lg font-bold '>
                Sign In
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SinginScreen;
