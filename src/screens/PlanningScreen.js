import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { Text, View, Button } from "react-native";
import { logOut } from '../utilities/users/usersService';
import { useTrip } from '../hooks/useTrip';

export default function PlanningScreen({ navigation, route }) {
  const [count, setCount] = useState(0);
  const { tripData, setTripData } = useTrip();
  console.log("received tripData:", tripData)
  

  
  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <View>
      <Text>Trips Screen!</Text>
      <Text>Trip id = {tripData.id}</Text>
      <Text>Trip name = {tripData.name}</Text>
      <Text>Counter = {count}</Text>
      <Button title="button1" onPress={handleClick} />
      <Button title="logout" onPress={() => {
        logOut();
        navigation.navigate("Home")
      }} />
      <StatusBar style="auto" />
    </View>
  );
}
