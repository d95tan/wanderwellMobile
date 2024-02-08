import { Text, View } from "react-native";
import { styles } from "../styles/PlanningStyles";
import { format } from "date-fns";
import EventCard from "./EventCard";

export default function CalendarDay({day}) {
  const { date, events } = day;

  return (
    <View style={styles.calendarDayContainer}>
      <Text style={styles.timeWord}>{format(date, "eee, do MMM yy")}</Text>
      <Text style={styles.weatherTimebar}>placeholder</Text>
      {events.map(event => {
        return <EventCard key={event.id} event={event} />
      })}
    </View>
  )
}