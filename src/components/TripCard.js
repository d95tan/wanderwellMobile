import { Pressable, StyleSheet, Text } from "react-native";

export default function TripCard({ trip, navigation }) {
  const { id, name, startdate, enddate } = trip;

  const handlePress = () => {
    console.log("presspress");
    navigation.navigate("SingleTrip", { tripId: id });
  };

  return (
    <Pressable style={styles.pressable} onPressOut={handlePress}>
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
    backgroundColor: "#2196F3",
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
