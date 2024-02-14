import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Text, Button, Modal, StyleSheet, View, TextInput } from "react-native";
import { format } from "date-fns";

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

  const handleClose = () => {
    setEditEventModalVisible(false);
  };

  const handleSave = () => {
    setEditEventModalVisible(false);
    handleEditEvent()
  };

  const handleDelete = () => {
    setEditEventModalVisible(false);
    handleDeleteEvent();
  }

  const handleChange = (name, text) => {
    setEditEvent({ ...editEvent, [name]: text });
  };

  const handleStartDateChange = (event, selectedDate) => {
    const start = editEvent.start;
    start.setFullYear(selectedDate.getFullYear());
    start.setMonth(selectedDate.getMonth());
    start.setDate(selectedDate.getDate());
    setShowStartDatePicker(false);
    setEditEvent({ ...editEvent, start });
  };

  const handleEndDateChange = (event, selectedDate) => {
    const end = editEvent.end;
    end.setFullYear(selectedDate.getFullYear());
    end.setMonth(selectedDate.getMonth());
    end.setDate(selectedDate.getDate());
    setShowEndDatePicker(false);
    setEditEvent({ ...editEvent, end });
  };

  const handleStartTimeChange = (event, selectedTime) => {
    const start = editEvent.start;
    start.setHours(selectedTime.getHours());
    start.setMinutes(selectedTime.getMinutes());
    setShowStartTimePicker(false);
    setEditEvent({ ...editEvent, start });
  };

  const handleEndTimeChange = (event, selectedTime) => {
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

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    marginHorizontal: "7.5%",
    justifyContent: "center",
    gap: 16,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 45,
  },
  inputContainer: { flexDirection: "column", gap: 3 },
  input: {
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});
