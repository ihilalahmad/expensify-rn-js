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
import { categories } from '../constants';
import { useAppSelector } from '../hooks/useReduxHook';
import { useUser } from '../redux/selectors/userSelector';
import { addDoc, setDoc } from 'firebase/firestore';
import { expensesRef } from '../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Globals/Loading';

const AddExpenseScreen = (props) => {
  const { id, place, country } = props.route.params;
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCategory, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const userSelector = useAppSelector(useUser);

  console.log('Trip Id 2: ', id);

  const handleAddExpense = async () => {
    if (title && amount && selectedCategory) {
      try {
        setLoading(true);
        let doc = await addDoc(expensesRef, {
          title,
          amount,
          category: selectedCategory,
          tripId: id,
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
          <AppBar header={'Add Expense'} />
          <View className='flex-row justify-center my-3 mt-5'>
            <Image
              className='h-72 w-72'
              source={require('../../assets/images/expenseBanner.png')}
            />
          </View>
          <View className='space-y-2 mx-2'>
            <Text className={`${colors.heading} text-lg font-bold`}>
              For What?
            </Text>
            <TextInput
              className='p-4 bg-white rounded-full mb-3'
              onChangeText={(value) => setTitle(value)}
            />
            <Text className={`${colors.heading} text-lg font-bold`}>
              How Much?
            </Text>
            <TextInput
              className='p-4 bg-white rounded-full mb-3'
              onChangeText={(value) => setAmount(value)}
            />
          </View>
          <View className='mx-2 space-x-2'>
            <Text className={`${colors.heading} text-lg font-bold`}>
              Category
            </Text>
            <View className='flex-row flex-wrap items-center'>
              {categories.map((category) => {
                let categoryBgColor = 'bg-white';
                if (category.value == selectedCategory)
                  categoryBgColor = 'bg-green-200';
                return (
                  <TouchableOpacity
                    key={category.value}
                    className={`rounded-full ${categoryBgColor} px-4 p-2 mb-2 mr-2`}
                    onPress={() => setCategory(category.value)}
                  >
                    <Text>{category.title}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        <View>
          {loading ? (
            <Loading />
          ) : (
            <TouchableOpacity
              onPress={handleAddExpense}
              style={{ backgroundColor: colors.button }}
              className='my-6 rounded-full p-3 shadow-sm mx-2'
            >
              <Text className='text-center text-white text-lg font-bold '>
                Add Expense
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default AddExpenseScreen;
