import { API_BASE_URL } from "../../../config.js";
import { getToken } from "./usersService.js";

const baseURL = API_BASE_URL+"/users"

const token = getToken();

const headers = {
  "Content-type": "application/json",
  "Authorization": `Bearer ${token}`
}

export async function signUp(body) {
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  }

  const res = await fetch(baseURL, options)

  if (!res.ok) {
    throw new Error("Bad request");
  }

  const json = await res.json();
  return json;
}

export async function logIn(body) {
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  }

  const res = await fetch(baseURL + "/login", options)
  
  if (!res.ok) {
    throw new Error("Bad request")
  }

  const json = await res.json();
  return json;
}