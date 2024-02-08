import { API_BASE_URL } from "../../../config.js";
import sendRequest from "../sendAPIRequest.js";

const baseURL = API_BASE_URL + "/users";

export async function signUp(body) {
  return sendRequest(baseURL, "POST", body);
}

export async function logIn(body) {
  return sendRequest(baseURL + "/login", "POST", body);
}