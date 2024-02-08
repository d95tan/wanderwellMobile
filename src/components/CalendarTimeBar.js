import { Text, View } from "react-native";
import { styles } from "../styles/PlanningStyles";

export default function CalendarTimeBar() {
  const time = [];
  for (let i = 0; i < 24; i++) {
    time.push(i + ":00");
  }

  return (
    <View style={styles.calendarTimeBar}>
      <Text style={styles.timeWord}>Time</Text>
      <Text style={styles.weatherTimebar}>Weather</Text>
      {time.map((hour) => {
        return (
          <Text key={hour} style={styles.timeText}>
            {hour}
          </Text>
        );
      })}
    </View>
  );
}
