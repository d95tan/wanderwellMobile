import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Text, View, Button, ScrollView, Modal } from "react-native";
import { logOut } from "../utilities/users/usersService";
import { useTrip } from "../hooks/useTrip";
import { getEvents, mapEventsToDay } from "../utilities/events/eventsService";
import { styles } from "../styles/PlanningStyles";
import CalendarDay from "../components/CalendarDay";
import CalendarTimeBar from "../components/CalendarTimeBar";
import NewEventModal from "../components/NewEventModal";

export default function PlanningScreen({ navigation }) {
  const { tripData, setTripData } = useTrip();
  const [newEventModalVisible, setNewEventModalVisible] = useState(false);
  const [calendar, setCalendar] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: "",
    type: "activity",
    description: "",
    start: null,
    end: null,
  });
  console.log("received tripData:", tripData);

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
            return (
              <CalendarDay
                key={i}
                day={day}
                setNewEventModalVisible={setNewEventModalVisible}
                newEvent={newEvent}
                setNewEvent={setNewEvent}
              />
            );
          })}
        </ScrollView>
      </View>
      <StatusBar style="auto" />
      <NewEventModal
        newEventModalVisible={newEventModalVisible}
        setNewEventModalVisible={setNewEventModalVisible}
        newEvent={newEvent}
        setNewEvent={setNewEvent}
      />
    </View>
  );
}
