import { API_BASE_URL } from "../../../config.js";
import { getToken } from "./getToken.js";

const baseURL = API_BASE_URL + "/users";

export async function signUp(body) {
  return sendRequest(baseURL, "POST", body);
}

export async function logIn(body) {
  return sendRequest(baseURL + "/login", "POST", body);
}

//* Template function for sending requests
async function sendRequest(url, method = "GET", payload = null) {
  const options = { method };
  if (payload) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(payload);
  }

  const token = await getToken();

  if (token) {
    options.headers ||= {};
    options.headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, options);

  if (res.ok) return res.json();
  throw new Error("Bad Request");
}
