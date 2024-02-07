import * as usersAPI from "./usersAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import base64 from "base-64";
import { getToken } from "./getToken";

export async function getUser() {
  const token = await getToken();
  const user = JSON.parse(base64.decode(token.split(".")[1])).user;
  return token ? user : null;
}

export async function signUp(data) {
  const body = { email: data.email, password: data.password };
  const token = await usersAPI.signUp(body);
  try {
    await AsyncStorage.setItem("token", JSON.stringify(token));
  } catch (e) {
    console.log("saving failed");
    return;
  }
  const user = await getUser();
  console.log("user:", user);
  return user;
}

export async function logIn(data) {
  const token = await usersAPI.logIn(data);
  try {
    await AsyncStorage.setItem("token", JSON.stringify(token));
  } catch (e) {
    console.log("loginError", e);
    return null;
  }

  const user = await getUser();
  return user;
}

export async function logOut() {
  await AsyncStorage.removeItem("token");
  return;
}