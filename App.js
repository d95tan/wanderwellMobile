import { useState } from "react";
import Navigation from "./Navigation";
import { getUser } from "./src/utilities/users/usersService";

export default function App() {

  const [user, setUser] = useState(getUser())

  return <Navigation user={user} setUser={setUser} />;
}
