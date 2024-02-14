import { API_BASE_URL } from "../../../config";
import sendRequest from "../sendAPIRequest";

const baseURL = API_BASE_URL + "/trips";

export async function createEvent(body, tripId) {
  return sendRequest(baseURL + `/${tripId}`, "POST", body);
}

export async function getEvents(tripId) {
  return sendRequest(baseURL + `/${tripId}`, "GET");
}

export async function deleteEvent(eventId, tripId) {
  return sendRequest(baseURL + `/${tripId}/${eventId}`, "DELETE");
}
