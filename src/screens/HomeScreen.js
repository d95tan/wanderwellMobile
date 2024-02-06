import { StatusBar } from "expo-status-bar";
import { Button, ImageBackground, StyleSheet, Text, View } from "react-native";

export default function HomeScreen({ navigation }) {
  const homeBackground = require("../../assets/HomeScreenBackground.png");

  return (
    <View style={styles.container}>
      <ImageBackground
        source={homeBackground}
        resizeMode="contain"
        style={styles.background}
      />

      <View style={styles.overlayContainer}>
        <View style={styles.overlayContent}>
          <Text style={styles.h1}>Welcome to Wanderwell!</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Sign Up"
              onPress={() => navigation.navigate("Signup")}
            />
            <Button
              title="Log In"
              onPress={() => navigation.navigate("Login")}
            />
          </View>
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#86b03d"
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
  },
  overlayContent: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginBottom: 20,
    width: "85%",
    alignSelf: "center",
    gap: 16,
  },
  h1: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "100%",
    gap: 16,
  },
};
