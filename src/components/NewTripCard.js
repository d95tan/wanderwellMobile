import { Pressable, StyleSheet, Text } from "react-native";
import { styles } from "./TripCard"

export default function NewTripCard({navigation, addTrip}) {

  const handlePress = () => {
    navigation.navigate("NewTrip", { addTrip });
  }

  return <Pressable style={styles.pressable} onPressOut={handlePress}>
    <Text style={styles.title}>Add your next adventure</Text>
    {/* <Text style={styles.body}>Click here to add a new trip!</Text> */}
  </Pressable>;
}


