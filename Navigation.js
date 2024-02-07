import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import TripsScreen from "./src/screens/TripsScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import PlanningScreen from "./src/screens/PlanningScreen";
import NewTripScreen from "./src/screens/NewTripScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = ({ user, setUser }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Trips" : "Home"}>
        <Stack.Screen
          name="Trips"
          component={TripsScreen}
          options={{ title: `Welcome back, ${user.email}` }}
        />
        <Stack.Screen
          name="NewTrip"
          component={NewTripScreen}
          options={{ title: `New Trip` }}
        />
        <Stack.Screen name="SingleTrip" component={SingleTripNavigator} />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const SingleTripNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Planning">
      <Tab.Screen
        name="Planning"
        component={PlanningScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Expenses"
        component={PlanningScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Whatever"
        component={PlanningScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default Navigation;
