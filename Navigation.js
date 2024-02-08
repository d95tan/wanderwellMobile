import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { UserProvider, useUser } from "./src/hooks/useUser";
import HomeScreen from "./src/screens/HomeScreen";
import TripsScreen from "./src/screens/TripsScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import PlanningScreen from "./src/screens/PlanningScreen";
import NewTripScreen from "./src/screens/NewTripScreen";
import { Text, View } from "react-native";
import { TripProvider, useTrip } from "./src/hooks/useTrip";
import { useLayoutEffect } from "react";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Navigation({}) {
  const { user, setUser, loading } = useUser();
  const { tripData, setTripData } = useTrip();
  console.log(user);

  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <UserProvider value={{ user, setUser }}>
      <TripProvider value={{ tripData, setTripData }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={user ? "Trips" : "Home"}>
            <Stack.Screen
              name="Trips"
              component={TripsScreen}
              options={{ title: `Welcome back, ${user?.name}` }}
            />
            <Stack.Screen
              name="NewTrip"
              component={NewTripScreen}
              options={{ title: `New Trip` }}
            />
            <Stack.Screen
              name="SingleTrip"
              component={SingleTripNavigator}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{ title: "Sign Up" }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: "Log In" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TripProvider>
    </UserProvider>
  );
}

const SingleTripNavigator = ({ route,navigation }) => {
  const { tripId } = route.params;
  const { tripData } = useTrip();
  
  useLayoutEffect(() => {
    navigation.setOptions({ title: tripData.name });
  }, [navigation, tripData.name]);

  return (
    <Tab.Navigator initialRouteName="Planning">
      <Tab.Screen
        name="Planning"
        component={PlanningScreen}
        options={{ headerShown: false }}
        initialParams={{ tripId }}
      />
      <Tab.Screen
        name="Expenses"
        component={PlanningScreen}
        options={{ headerShown: false }}
        initialParams={{ tripId }}
      />
      <Tab.Screen
        name="Whatever"
        component={PlanningScreen}
        options={{ headerShown: false }}
        initialParams={{ tripId }}
      />
    </Tab.Navigator>
  );
};
