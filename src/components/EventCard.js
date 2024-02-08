import { StyleSheet, Text, View } from "react-native";
import { SLOT_HEIGHT } from "../styles/PlanningStyles";
import { calculatePosition } from "../utilities/events/eventsService";

export default function EventCard({ event }) {

  const {top, height} = calculatePosition(event)

  const backgroundColors = {
    flight: "palegreen",
    activity: "lavender",
    accommodation: "whitesmoke"
  }

  const styles = StyleSheet.create({
    eventCard: {
      position: "absolute",
      top,
      height,
      margin: 0,
      borderWidth: 1,
      backgroundColor: backgroundColors[event.type],
      width: "98%"
    }
  })

  return (
    <View style={styles.eventCard}>
      <Text>{event.name}</Text>
    </View>
  )
}