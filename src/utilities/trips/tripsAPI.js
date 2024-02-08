import { API_BASE_URL } from "../../../config";
import sendRequest from "../sendAPIRequest";

const baseURL = API_BASE_URL + "/trips";

export async function createTrip(body) {
  return sendRequest(baseURL, "POST", body);
}

export async function getTrips() {
  return sendRequest(baseURL, "GET")
}