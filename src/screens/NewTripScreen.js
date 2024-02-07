import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  Platform,
  TextInput,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function NewTripScreen() {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
  };

  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
  };

  const showStartDatePickerModal = () => {
    setShowStartDatePicker(true);
  };

  const showEndDatePickerModal = () => {
    setShowEndDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateInput} >
      <Text>Destination</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange("name", text)}
        value={name}
        autoComplete="country"
        placeholder="Sydney"
        />
        </View>
      <View style={styles.dateContainer}>
        <View style={styles.dateInput}>
          <Text>Start</Text>
          <Button
            title={startDate.toDateString()}
            onPress={showStartDatePickerModal}
          />
        </View>
        <View style={styles.dateInput}>
          <Text>End</Text>
          <Button
            title={endDate.toDateString()}
            onPress={showEndDatePickerModal}
          />
        </View>
      </View>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: "7.5%",
    justifyContent: "center",
    gap: 16,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 45,
  },
  dateInput: {
    flexDirection: "column",
    gap: 3,
  },
  input: {
    borderWidth: 1,
  },
});
