import * as tripsAPI from "./tripsAPI"

export async function createTrip(data) {
  console.log("createTrip")
  const newTrip = await tripsAPI.createTrip(data);
  return newTrip;
}

export async function getTrips() {
  const trips = await tripsAPI.getTrips();
  return trips;
}

export async function addCollaborator(email, tripId) {
  const added = await tripsAPI.addCollaborator({ email }, tripId);
  return added;
}

export async function getCollaborators(tripId) {
  const collaborators = await tripsAPI.getCollaborators(tripId)
  return collaborators;
}

export async function deleteCollaborator(email, tripId) {
  const deleted = await tripsAPI.deleteCollaborator(email, tripId)
  console.log("deleted:",deleted)
  return deleted;
}