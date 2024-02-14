import { isPast } from "date-fns";
import { Pressable, StyleSheet, Text } from "react-native";

export default function TripCard({ trip, navigation, setTripData }) {
  const { id, name, startdate, enddate } = trip;
  
  if (isPast(trip.enddate)) {
    backgroundColor = "dimgray"
  } else if (isPast(trip.startdate)) {
    backgroundColor = "seagreen"
  } else {
    backgroundColor = "steelblue"
  }

  const handlePress = () => {
    setTripData(trip)
    navigation.navigate("SingleTrip");
  };

  return (
    <Pressable style={{...styles.pressable, backgroundColor}} onPressOut={handlePress}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.body}>
        {startdate} to {enddate}
      </Text>
    </Pressable>
  );
}

export const styles = StyleSheet.create({
  pressable: {
    borderRadius: 5,
    height: 125,
    borderWidth: 1,
    borderColor: "grey",
    backgroundColor: "steelblue",
    maxWidth: "50%",
    marginVertical: "1%",
    padding: "2.5%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    color: "white",
    fontSize: 24,
    textAlign: "center",
  },
  body: {
    color: "white",
    textAlign: "center",
  },
});
