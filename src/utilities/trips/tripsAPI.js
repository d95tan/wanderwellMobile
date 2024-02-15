import { API_BASE_URL } from "../../../config";
import sendRequest from "../sendAPIRequest";

const baseURL = API_BASE_URL + "/trips";

export async function createTrip(body) {
  return sendRequest(baseURL, "POST", body);
}

export async function getTrips() {
  return sendRequest(baseURL, "GET")
}

export async function addCollaborator(body, tripId) {
  console.log("tripsAPI", body)
  return sendRequest(baseURL+ `/${tripId}/collaborators`, "POST", body)
}

export async function getCollaborators(tripId) {
  return sendRequest(baseURL+ `/${tripId}/collaborators`, "GET")
}

export async function deleteCollaborator(email, tripId) {
  return sendRequest(baseURL+ `/${tripId}/collaborators?email=${email}`, "DELETE")
}