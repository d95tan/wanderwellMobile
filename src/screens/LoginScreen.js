import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { isValidEmail, isValidPassword } from "../utilities/validation";
import { logIn } from "../utilities/users/usersService";

export default function LoginScreen({ navigation, route }) {
  const { setUser } = route.params;

  const [cred, setCred] = useState({
    email: "dan@dan.com",
    password: "password",
  });

  const handleChange = (name, text) => {
    setCred({ ...cred, [name]: text });
  };

  const handleLogin = async () => {
    console.log("Login clicked");
    if (!isValidEmail(cred.email)) {
      Alert.alert("Invalid Email", "Please enter a valid email");
      return;
    }
    if (!isValidPassword(cred.password)) {
      Alert.alert("Invalid Password", "Please enter a valid password");
      return;
    }

    try {
      const user = await logIn(cred);
      console.log("login,", user);
      setUser(user);
      navigation.navigate("Trips");
    } catch (e) {
      console.log(e);
      Alert.alert("Something went wrong", "Please try again later");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Log In</Text>
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange("email", text)}
        value={cred.email}
        autoComplete="email"
        placeholder="example@example.com"
      />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange("password", text)}
        value={cred.password}
        secureTextEntry
        autoComplete="current-password"
        placeholder="Min. 8 characters"
      />
      <Button title="Log In" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: "7.5%",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
  },
});