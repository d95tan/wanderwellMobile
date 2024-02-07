import AsyncStorage from "@react-native-async-storage/async-storage";
import base64 from "base-64";

export async function getToken() {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log("Token retrieved:", token)
    
    const payload = JSON.parse(base64.decode(token.split(".")?.[1]));

    if (payload?.exp < Date.now() / 1000) {
      console.log("expired");
      await AsyncStorage.removeItem("token");
      return null;
    }
    
    return token;
  } catch (e) {
    console.log("error retrieving token", e);
    return null;
  }
}