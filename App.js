import Navigation from "./Navigation";
import { UserProvider } from "./src/utilities/users/UserContext";

export default function App() {
  return (
    <UserProvider>
      <Navigation />
    </UserProvider>
  );
}
