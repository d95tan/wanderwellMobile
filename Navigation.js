import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import TripsScreen from "./src/screens/TripsScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";

const Stack = createNativeStackNavigator();

export default function Navigation({ user, setUser }) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Login" : "Home"}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ title: "Sign Up" }}
          initialParams={{ setUser }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Log In" }}
          initialParams={{ setUser }}
        />
        <Stack.Screen
          name="Trips"
          component={TripsScreen}
          initialParams={{ user, setUser }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
