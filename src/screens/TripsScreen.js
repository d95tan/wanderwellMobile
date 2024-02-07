import { StatusBar } from "expo-status-bar";
import { useUser } from "../utilities/users/UserContext";
import { useEffect, useState } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { isPast } from "date-fns";
import { logOut } from "../utilities/users/usersService";
import { getTrips } from "../utilities/trips/tripsService";
import TripCard from "../components/TripCard";
import NewTripCard from "../components/NewTripCard";

export default function TripsScreen({ navigation }) {
  const [trips, setTrips] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    (async () => {
      try {
        const fetchedTrips = await getTrips();
        setTrips(fetchedTrips);
        console.log(fetchedTrips);
      } catch (error) {
        console.log("Error fetching trips:", error);
      }
    })();
  }, [user]);

  const addTrip = (newTrip) => {
    const updatedTrips = [...trips, newTrip].sort((a, b) => {
      const dateA = a.startdate;
      const dateB = b.startdate;
      if (dateA > dateB) {
        return 1;
      } else {
        return -1;
      }
    });
    setTrips(updatedTrips);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Trips</Text>
      <View style={styles.tripsContainer}>
        {trips
          .filter((trip) => !isPast(trip.enddate))
          .map((trip) => (
            <TripCard key={trip.id} trip={trip} navigation={navigation} />
          ))}
        <NewTripCard navigation={navigation} addTrip={addTrip} />
      </View>

      {trips.filter((trip) => isPast(trip.enddate)).length ? (
        <>
          <Text style={styles.title}>Past Trips</Text>
          <View style={styles.tripsContainer}>
            {trips
              .filter((trip) => isPast(trip.enddate))
              .map((trip) => (
                <TripCard key={trip.id} trip={trip} navigation={navigation} />
              ))}
          </View>
        </>
      ) : null}

      <Button
        title="logout"
        onPress={() => {
          logOut();
          setTrips([]);
          navigation.navigate("Home");
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: "5%",
    // justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
  tripsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
