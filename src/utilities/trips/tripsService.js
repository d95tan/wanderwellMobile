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