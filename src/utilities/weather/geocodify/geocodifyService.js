import * as geocodifyAPI from "./geocodifyAPI";

export async function getLatLong(query) {
  const data = await geocodifyAPI.getLatLong(query);
  const [long, lat] = await data.response.features[0].geometry.coordinates;
  return { lat, long };
}
