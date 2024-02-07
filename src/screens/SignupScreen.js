import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { isValidEmail, isValidPassword } from "../utilities/validation";
import { signUp } from "../utilities/users/usersService";
import { useUser } from "../utilities/users/UserContext";

export default function SignupScreen({ navigation, route }) {
  const { setUser } = useUser();
  
  const [cred, setCred] = useState({
    email: "dan@dan.com",
    name: "Dan",
    password: "password",
    confirm: "password",
  });

  const handleChange = (name, text) => {
    setCred({ ...cred, [name]: text });
  };

  const handleSignup = async () => {
    console.log("signup clicked");
    if (!isValidEmail(cred.email)) {
      Alert.alert("Invalid Email", "Please enter a valid email");
      return;
    }
    if (!isValidPassword(cred.password)) {
      Alert.alert("Invalid Password", "Please enter a valid password");
      return;
    }
    if (cred.password !== cred.confirm) {
      Alert.alert("Invalid Password", "Please ensure the passwords match");
      return;
    }

    try {
      const user = await signUp(cred);
      console.log("signup", user);
      setUser(user)
      navigation.navigate("Trips");
    } catch (e) {
      console.log(e);
      Alert.alert("Something went wrong", "Please try again later");
    }

  };

  return (
    <View style={styles.container}>
      <Text>Log In</Text>
      <Text>Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange("name", text)}
        value={cred.name}
        autoComplete="name"
        placeholder="Stanley"
      />
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
        autoComplete="new-password"
        placeholder="Min. 8 characters"
      />
      <Text>Confirm Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange("confirm", text)}
        value={cred.confirm}
        secureTextEntry
        autoComplete="new-password"
      />
      <Button title="Sign Up" onPress={handleSignup} />
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
    paddingHorizontal: 10,
  },
});
