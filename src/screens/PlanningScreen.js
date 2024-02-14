import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Text, View, Button, ScrollView, Modal } from "react-native";
import { logOut } from "../utilities/users/usersService";
import { useTrip } from "../hooks/useTrip";
import {
  createEvent,
  deleteEvent,
  getEvents,
  insertNewEvent,
  mapEventsToDay,
} from "../utilities/events/eventsService";
import { styles } from "../styles/PlanningStyles";
import CalendarDay from "../components/CalendarDay";
import CalendarTimeBar from "../components/CalendarTimeBar";
import NewEventModal from "../components/NewEventModal";
import EditEventModal from "../components/EditEventModal";

export default function PlanningScreen({ navigation }) {
  const { tripData, setTripData } = useTrip();
  console.log("Trip Data:", tripData);
  const [newEventModalVisible, setNewEventModalVisible] = useState(false);
  const [editEventModalVisible, setEditEventModalVisible] = useState(false);
  const [calendar, setCalendar] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: "",
    type: "activity",
    description: "",
    start: new Date(),
    end: new Date(),
  });

  const [editEvent, setEditEvent] = useState({
    id: undefined,
    tripid: undefined,
    name: "",
    type: "activity",
    description: "",
    start: new Date(),
    end: new Date(),
  });

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

  handleCreateNewEvent = async () => {
    try {
      const newCalendar = await createEvent(newEvent, tripData.id, calendar);
      setCalendar(newCalendar);
      setNewEvent({
        name: "",
        type: "activity",
        description: "",
        start: new Date(),
        end: new Date(),
      });
    } catch (error) {
      console.log("Error Creating events", error);
    }
  };

  handleEditEvent = async () => {
    console.log("handleEditEvent", editEvent);
  };

  handleDeleteEvent = async () => {
    console.log("delete event: ", editEvent);
    try {
      const newCalendar = await deleteEvent(editEvent.id, tripData.id, calendar);
      setCalendar(newCalendar);
    } catch (error) {
      console.log("Error deleting event", error);
    }
  };

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
                setEditEventModalVisible={setEditEventModalVisible}
                setEditEvent={setEditEvent}
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
        handleCreateNewEvent={handleCreateNewEvent}
      />
      <EditEventModal
        editEventModalVisible={editEventModalVisible}
        setEditEventModalVisible={setEditEventModalVisible}
        editEvent={editEvent}
        setEditEvent={setEditEvent}
        handleEditEvent={handleEditEvent}
        handleDeleteEvent={handleDeleteEvent}
      />
    </View>
  );
}
