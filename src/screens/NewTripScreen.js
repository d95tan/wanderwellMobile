import { useState } from "react";
import { View, Button, Text, TextInput, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {createTrip} from "../utilities/trips/tripsService";

export default function NewTripScreen({route, navigation}) {
  const { addTrip } = route.params;
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleNameChange = (text) => {
    setName(text);
  };

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

  const handleCreateTrip = async () => {
    const tripData = {
      name,
      startDate,
      endDate,
    };
    const newTrip = await createTrip(tripData)
    addTrip(newTrip);
    console.log(newTrip);
    navigation.navigate("Trips")
  };

  const showStartDatePickerModal = () => {
    setShowStartDatePicker(true);
  };

  const showEndDatePickerModal = () => {
    setShowEndDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateInput}>
        <Text>Destination</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleNameChange}
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
      <Button title="Create Trip" onPress={handleCreateTrip} />

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

export const styles = StyleSheet.create({
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
    paddingHorizontal: 10,
  },
});
