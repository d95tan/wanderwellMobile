import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { Text, View, Button } from "react-native";
import { logOut } from '../utilities/users/usersService';

export default function PlanningScreen({ navigation, route }) {
  const { tripId } = route.params;
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <View>
      <Text>Trips Screen!</Text>
      <Text>Trip id = {tripId}</Text>
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
