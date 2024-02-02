import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {

  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count+1)
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! Hello there</Text>
      <Text>Counter = {count}</Text>
      <Button title="button1" onPress={handleClick}>Click me</Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
