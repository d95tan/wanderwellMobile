import { Pressable, Text, View } from "react-native";
import { styles } from "../styles/PlanningStyles";
import { addHours, format } from "date-fns";
import EventCard from "./EventCard";
import { yCoordToTime } from "../utilities/events/eventsService";

export default function CalendarDay({
  day,
  setNewEventModalVisible,
  newEvent,
  setNewEvent,
  setEditEventModalVisible,
  setEditEvent,
}) {
  const { date, events } = day;

  const handlePress = ({ nativeEvent }) => {
    const yCoord = nativeEvent.locationY;
    const newDate = yCoordToTime(yCoord, date);
    console.log(newDate);
    setNewEvent({
      ...newEvent,
      ["start"]: newDate,
      ["end"]: addHours(newDate, 1),
    });
    setNewEventModalVisible(true);
  };

  return (
    <Pressable
      style={styles.calendarDayContainer}
      onPress={handlePress}
      name={"pressable"}
    >
      <Text style={styles.timeWord}>{format(date, "eee, do MMM yy")}</Text>
      <Text style={styles.weatherTimebar}>placeholder</Text>
      {events.map((event) => {
        return (
          <EventCard
            key={event.id}
            event={event}
            setEditEventModalVisible={setEditEventModalVisible}
            setEditEvent={setEditEvent}
          />
        );
      })}
    </Pressable>
  );
}
