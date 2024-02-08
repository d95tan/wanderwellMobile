import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Text, View, Button, ScrollView } from "react-native";
import { logOut } from "../utilities/users/usersService";
import { useTrip } from "../hooks/useTrip";
import { getEvents, mapEventsToDay } from "../utilities/events/eventsService";
import { styles } from "../styles/PlanningStyles";
import CalendarDay from "../components/CalendarDay";
import CalendarTimeBar from "../components/CalendarTimeBar";

export default function PlanningScreen({ navigation }) {
  const { tripData, setTripData } = useTrip();
  console.log("received tripData:", tripData);

  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const fetchedEvents = await getEvents(tripData.id);
        const data = mapEventsToDay(tripData, fetchedEvents);
        console.log(data);
        setCalendar(data);
      } catch (error) {
        console.log("Error fetching events:", error);
      }
    })();
  }, [tripData.id]);

  return (
    <View style={styles.planningScreen}>
      <Text>Trips Screen!</Text>
      <Text>Trip id = {tripData.id}</Text>
      <Text>Trip name = {tripData.name}</Text>
      <View style={styles.planningContainer}>
        <CalendarTimeBar />
        <ScrollView horizontal style={styles.calendarContainer}>
          {calendar.map((day, i) => {
            return <CalendarDay key={i} day={day} />;
          })}
        </ScrollView>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
