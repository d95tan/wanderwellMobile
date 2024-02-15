import sendRequest from "../../sendAPIRequest";

const apiUrl = "https://api.geocodify.com/v2/geocode?";
const apiKey = "api_key="+process.env.EXPO_PUBLIC_GEOCODIFY_KEY;

export async function getLatLong(query) {
  const q = "&q=" + query;
  return sendRequest(apiUrl + apiKey + q, "GET")
}
