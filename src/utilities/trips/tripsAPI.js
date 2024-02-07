import { API_BASE_URL } from "../../../config";
import { getToken } from "../users/getToken";

const baseURL = API_BASE_URL + "/trips";

export async function createTrip(body) {
  return sendRequest(baseURL, "POST", body);
}

export async function getTrips() {
  return sendRequest(baseURL, "GET")
}

//* Template function for sending requests
async function sendRequest(url, method = "GET", payload = null) {
  const options = { method };
  if (payload) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(payload);
  }

  const token = await getToken();

  // console.log("sending token:", token)
  if (token) {
    options.headers ||= {};
    options.headers.Authorization = `Bearer ${token}`;
  } else {
    throw new Error("No token found");
  }

  const res = await fetch(url, options);

  if (res.ok) return res.json();
  throw new Error("Bad Request");
}
