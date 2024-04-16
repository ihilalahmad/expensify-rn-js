import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const DatePicker = () => {
  const navigation = useNavigation();
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  // Function to generate an array of numbers from start to end
  const generateArray = (start, end) => {
    const result = [];
    for (let i = start; i <= end; i++) {
      result.push(i.toString());
    }
    return result;
  };

  // Years from 2018 to current year
  const years = generateArray(2018, new Date().getFullYear());

  // Months from 1 to 12
  const months = generateArray(1, 12);

  // Function to generate days based on the selected month and year
  const generateDays = (selectedMonth, selectedYear) => {
    if (selectedMonth === '') return [];

    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    return generateArray(1, daysInMonth);
  };

  // Handler for month change
  const handleMonthChange = (value) => {
    setMonth(value);
    // Reset day if month changes
    setDay('');
  };

  // Handler for year change
  const handleYearChange = (value) => {
    setYear(value);
    // Reset day if year changes
    setDay('');
  };

  return (
    <View>
      <Text>Select Date of Birth</Text>
      <View style={{ flexDirection: 'row' }}>
        <Picker
          style={{ flex: 1 }}
          selectedValue={year}
          onValueChange={handleYearChange}
        >
          <Picker.Item label='Year' value='' />
          {years.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
        <Picker
          style={{ flex: 1 }}
          selectedValue={month}
          onValueChange={handleMonthChange}
        >
          <Picker.Item label='Month' value='' />
          {months.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
        <Picker
          style={{ flex: 1 }}
          selectedValue={day}
          onValueChange={(itemValue) => setDay(itemValue)}
        >
          <Picker.Item label='Day' value='' />
          {generateDays(month, year).map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
      </View>
      <Button
        title='Go Back'
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
    </View>
  );
};

export default DatePicker;
