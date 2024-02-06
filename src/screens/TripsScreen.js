import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { Text, View, Button } from "react-native";

export default function TripsScreen() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <View>
      <Text>Trips Screen!</Text>
      <Text>Counter = {count}</Text>
      <Button title="button1" onPress={handleClick}>
        Click me
      </Button>
      <StatusBar style="auto" />
    </View>
  );
}
