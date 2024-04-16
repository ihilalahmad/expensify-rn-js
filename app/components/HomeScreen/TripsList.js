import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../theme';
import EmptyList from '../Globals/EmptyList';
import randomImage from '../../../assets/images/randomImage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../../hooks/useReduxHook';
import { getDocs, query, where } from 'firebase/firestore';
import { tripsRef } from '../../config/firebaseConfig';
import { useUser } from '../../redux/selectors/userSelector';

const TripsList = () => {
  const navigation = useNavigation();
  const userSelector = useAppSelector(useUser);
  const [trips, setTrips] = useState([]);

  const isFocused = useIsFocused();

  const fetchTrips = async () => {
    const trips = query(tripsRef, where('userId', '==', userSelector.user.uid));
    const tripsSnapshot = await getDocs(trips);
    let data = [];
    tripsSnapshot.forEach((trip) => {
      data.push({ ...trip.data(), id: trip.id });
    });
    setTrips(data);
  };

  useEffect(() => {
    if (isFocused) fetchTrips();
  }, [isFocused]);

  return (
    <View>
      <View className='px-4 space-y-4'>
        <View className='flex-row justify-between items-center'>
          <Text className={`${colors.heading} font-bold text-xl`}>
            Recent Trips
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddTrip');
            }}
            className='p-2 px-3 bg-white border border-gray-200 rounded-full'
          >
            <Text className={colors.heading}>Add Trip</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 430 }}>
          <FlatList
            className='mx-1'
            data={trips}
            numColumns={2}
            ListEmptyComponent={<EmptyList />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('TripExpenses', { ...item });
                  }}
                  className='bg-white p-3 rounded-2xl mb-3 shadow-sm'
                >
                  <View>
                    <Image source={randomImage()} className='w-36 h-36 mb-2' />
                    <Text className={`${colors.heading} font-bold`}>
                      {item.place}
                    </Text>
                    <Text className={`${colors.heading} font-xs`}>
                      {item.country}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default TripsList;
