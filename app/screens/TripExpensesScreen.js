import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenWrapper from '../components/Globals/ScreenWrapper';
import AppBar from '../components/Globals/AppBar';
import { colors } from '../theme';
import EmptyList from '../components/Globals/EmptyList';
import randomImage from '../../assets/images/randomImage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ExpenseCard from '../components/HomeScreen/ExpenseCard';
import { getDocs, query, where } from 'firebase/firestore';
import { expensesRef } from '../config/firebaseConfig';
import { useAppSelector } from '../hooks/useReduxHook';
import { useUser } from '../redux/selectors/userSelector';

const listItems = [
  {
    id: 1,
    title: 'Zinger Burger',
    amount: 6,
    category: 'food',
  },
  {
    id: 2,
    title: 'Bought a Jeans',
    amount: 10,
    category: 'shopping',
  },
  {
    id: 3,
    title: 'Car Fuel',
    amount: 30,
    category: 'commute',
  },
];

const TripExpensesScreen = (props) => {
  const { id, country, place } = props.route.params;
  const navigation = useNavigation();
  const [expenses, setExpenses] = useState([]);
  const isFocused = useIsFocused();

  const fetchExpenses = async () => {
    const expenses = query(expensesRef, where('tripId', '==', id));
    const expensesSnapshot = await getDocs(expenses);
    let data = [];
    expensesSnapshot.forEach((expense) => {
      data.push({ ...expense.data(), id: expense.id });
    });
    setExpenses(data);
  };

  useEffect(() => {
    if (isFocused) fetchExpenses();
  }, [isFocused]);

  return (
    <ScreenWrapper className='flex-1'>
      <View className='px-4'>
        <AppBar header={place} subtitle={country} />
        <View className='flex-row justify-center items-center  rounded-xl mb-4'>
          <Image
            source={require('../../assets/images/7.png')}
            className='w-80 h-80'
          />
        </View>
        <View className=' space-y-4'>
          <View className='flex-row justify-between items-center'>
            <Text className={`${colors.heading} font-bold text-xl`}>
              Expenses
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AddExpense', { id, place, country });
              }}
              className='p-2 px-3 bg-white border border-gray-200 rounded-full'
            >
              <Text className={colors.heading}>Add Expense</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 430 }}>
            <FlatList
              className='mx-1'
              data={expenses}
              ListEmptyComponent={
                <EmptyList message={"You haven't recorded any expenses yet"} />
              }
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                return <ExpenseCard item={item} />;
              }}
            />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default TripExpensesScreen;
