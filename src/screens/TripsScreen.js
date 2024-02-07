import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { Text, View, Button } from "react-native";
import { logOut } from '../utilities/users/usersService';

export default function TripsScreen({navigation}) {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <View>
      <Text>Trips Screen!</Text>
      <Text>Counter = {count}</Text>
      <Button title="button1" onPress={handleClick} />
      <Button title="logout" onPress={() => {
        logOut();
        navigation.navigate("Home")
      }} />
      <Button title="Single Trip" onPress={() => {
        navigation.navigate("SingleTrip")
      }} />
      <Button title="New Trip" onPress={() => {
        navigation.navigate("NewTrip")
      }} />
      <StatusBar style="auto" />
    </View>
  );
}
