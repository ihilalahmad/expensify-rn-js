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
import { useAppSelector } from '../hooks/useReduxHook';
import { useUser } from '../redux/selectors/userSelector';
import { addDoc } from 'firebase/firestore';
import { tripsRef } from '../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Globals/Loading';

const AddTripScreen = () => {
  const navigation = useNavigation();
  const [place, setPlace] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const userSelector = useAppSelector(useUser);

  const handleAddTrip = async () => {
    if (place && country) {
      try {
        setLoading(true);
        let doc = await addDoc(tripsRef, {
          place,
          country,
          userId: userSelector.user.uid,
        });
        setLoading(false);
        if (doc && doc.id) {
          navigation.goBack();
        }
      } catch (error) {
        setLoading(false);
        console.log('Firebase error: ', error.message);
      }
    } else {
      //show an error message
      Alert.alert('Place & Country are required');
    }
  };

  return (
    <ScreenWrapper>
      <View className='flex justify-between h-full mx-4'>
        <View>
          <AppBar header={'Add Trip'} />
          <View className='flex-row justify-center my-3 mt-5'>
            <Image
              className='h-72 w-72'
              source={require('../../assets/images/4.png')}
            />
          </View>
          <View className='space-y-2 mx-2'>
            <Text className='text-lg font-bold '>Where on Earth?</Text>
            <TextInput
              className='p-4 bg-white rounded-full mb-3'
              onChangeText={(value) => setPlace(value)}
            />
            <Text className='text-lg font-bold '>Which Country?</Text>
            <TextInput
              className='p-4 bg-white rounded-full mb-3'
              onChangeText={(value) => setCountry(value)}
            />
          </View>
        </View>

        <View>
          {loading ? (
            <Loading />
          ) : (
            <TouchableOpacity
              onPress={handleAddTrip}
              style={{ backgroundColor: colors.button }}
              className='my-6 rounded-full p-3 shadow-sm mx-2'
            >
              <Text className='text-center text-white text-lg font-bold '>
                Add Trip
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default AddTripScreen;
