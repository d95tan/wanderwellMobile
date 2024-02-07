import React, { useState } from 'react';
import { View, Button, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function NewTripScreen ()  {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(Platform.OS === 'ios');
    setStartDate(currentDate);
  };

  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(Platform.OS === 'ios');
    setEndDate(currentDate);
  };

  const showStartDatePickerModal = () => {
    setShowStartDatePicker(true);
  };

  const showEndDatePickerModal = () => {
    setShowEndDatePicker(true);
  };

  return (
    <View>
      <Button title="Select Start Date" onPress={showStartDatePickerModal} />
      <Text>Start Date: {startDate.toDateString()}</Text>
      <Button title="Select End Date" onPress={showEndDatePickerModal} />
      <Text>End Date: {endDate.toDateString()}</Text>
      {showStartDatePicker && (
        <DateTimePicker
          testID="startDatePicker"
          value={startDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleStartDateChange}
        />
      )}
      {showEndDatePicker && (
        <DateTimePicker
          testID="endDatePicker"
          value={endDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleEndDateChange}
        />
      )}
    </View>
  );
};

