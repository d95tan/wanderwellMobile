import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  Text,
  Button,
  Modal,
  StyleSheet,
  View,
  TextInput,
  Alert,
} from "react-native";
import { format } from "date-fns";
import { styles } from "./NewEventModal";

export default function EditEventModal({
  editEventModalVisible,
  setEditEventModalVisible,
  editEvent,
  setEditEvent,
  handleEditEvent,
  handleDeleteEvent,
}) {
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [isUnsaved, setIsUnsaved] = useState(false)

  const handleClose = () => {
    if (isUnsaved) {
      Alert.alert("Discard Changes", "Are you sure you want to navigate away?", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            setEditEventModalVisible(false);
            setIsUnsaved(false);
          },
        },
      ]);
    } else {
      setEditEventModalVisible(false);
    }
  };

  const handleSave = () => {
    setEditEventModalVisible(false);
    setIsUnsaved(false);
    handleEditEvent();
  };

  const handleDelete = () => {
    Alert.alert("Delete Event", "Are you sure you want to delete this event?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          setEditEventModalVisible(false);
          setIsUnsaved(false);
          handleDeleteEvent();
        },
      },
    ]);
  };

  const handleChange = (name, text) => {
    setIsUnsaved(true);
    setEditEvent({ ...editEvent, [name]: text });
  };

  const handleStartDateChange = (event, selectedDate) => {
    setIsUnsaved(true);
    const start = editEvent.start;
    start.setFullYear(selectedDate.getFullYear());
    start.setMonth(selectedDate.getMonth());
    start.setDate(selectedDate.getDate());
    setShowStartDatePicker(false);
    setEditEvent({ ...editEvent, start });
  };

  const handleEndDateChange = (event, selectedDate) => {
    setIsUnsaved(true);
    const end = editEvent.end;
    end.setFullYear(selectedDate.getFullYear());
    end.setMonth(selectedDate.getMonth());
    end.setDate(selectedDate.getDate());
    setShowEndDatePicker(false);
    setEditEvent({ ...editEvent, end });
  };

  const handleStartTimeChange = (event, selectedTime) => {
    setIsUnsaved(true);
    const start = editEvent.start;
    start.setHours(selectedTime.getHours());
    start.setMinutes(selectedTime.getMinutes());
    setShowStartTimePicker(false);
    setEditEvent({ ...editEvent, start });
  };

  const handleEndTimeChange = (event, selectedTime) => {
    setIsUnsaved(true);
    const end = editEvent.end;
    end.setHours(selectedTime.getHours());
    end.setMinutes(selectedTime.getMinutes());
    setShowEndTimePicker(false);
    setEditEvent({ ...editEvent, end });
  };

  return (
    <Modal visible={editEventModalVisible}>
      <View style={styles.modalContainer}>
        <View styles={styles.inputContainer}>
          <Text>Name (required)</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleChange("name", text)}
            value={editEvent.name}
            placeholder="Go to the beach"
          />
        </View>
        <View styles={styles.inputContainer}>
          <Text>Description / Address</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleChange("description", text)}
            value={editEvent.description}
            placeholder="123 Place Avenue"
          />
        </View>
        <View styles={styles.inputContainer}>
          <Text>Event Type</Text>
          <Picker
            selectedValue={editEvent.type}
            onValueChange={(itemValue) => handleChange("type", itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Activity" value="activity" />
            <Picker.Item label="Flight" value="flight" />
            <Picker.Item label="Accomodation" value="accommodation" />
          </Picker>
        </View>
        <View style={styles.dateContainer}>
          <View style={styles.inputContainer}>
            <Text>Start Date</Text>
            <Button
              title={format(editEvent.start, "d MMM yy")}
              onPress={() => {
                setShowStartDatePicker(true);
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text>End Date</Text>
            <Button
              title={format(editEvent.end, "d MMM yy")}
              onPress={() => {
                setShowEndDatePicker(true);
              }}
            />
          </View>
        </View>
        <View style={styles.dateContainer}>
          <View style={styles.inputContainer}>
            <Button
              title={format(editEvent.start, "h:mm aaa")}
              onPress={() => {
                setShowStartTimePicker(true);
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Button
              title={format(editEvent.end, "h:mm aaa")}
              onPress={() => {
                setShowEndTimePicker(true);
              }}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Delete" color="red" onPress={handleDelete} />
          <Button title="Close" onPress={handleClose} />
          <Button title="Save" onPress={handleSave} />
        </View>

        {showStartDatePicker && (
          <DateTimePicker
            value={editEvent.start}
            mode="date"
            display="default"
            onChange={handleStartDateChange}
          />
        )}

        {showEndDatePicker && (
          <DateTimePicker
            value={editEvent.end}
            mode="date"
            display="default"
            onChange={handleEndDateChange}
          />
        )}

        {showStartTimePicker && (
          <DateTimePicker
            value={editEvent.start}
            mode="time"
            display="default"
            onChange={handleStartTimeChange}
          />
        )}
        {showEndTimePicker && (
          <DateTimePicker
            value={editEvent.end}
            mode="time"
            display="default"
            onChange={handleEndTimeChange}
          />
        )}
      </View>
    </Modal>
  );
}
