import { StyleSheet, Text, Pressable } from "react-native";
import { SLOT_HEIGHT } from "../styles/PlanningStyles";
import { calculatePosition } from "../utilities/events/eventsService";
import { cloneDeep } from "lodash";

export default function EventCard({
  event,
  setEditEventModalVisible,
  setEditEvent,
}) {
  const { top, height } = calculatePosition(event);
  

  const backgroundColors = {
    flight: "palegreen",
    activity: "lavender",
    accommodation: "whitesmoke",
  };

  const styles = StyleSheet.create({
    eventCard: {
      position: "absolute",
      top,
      height,
      margin: 0,
      paddingVertical: 0,
      paddingHorizontal: 3,
      borderWidth: 1,
      borderRadius: 3,
      backgroundColor: backgroundColors[event.type],
      width: "97%",
    },
  });

  const handlePress = () => {
    console.log("edit event", event);
    const eventCopy = cloneDeep(event)
    eventCopy.start = new Date(eventCopy.start)
    eventCopy.end = new Date(eventCopy.end)
    setEditEvent(eventCopy);
    setEditEventModalVisible(true);
  };

  return (
    <Pressable style={styles.eventCard} onPress={handlePress}>
      <Text>{event.name}</Text>
    </Pressable>
  );
}
