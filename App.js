import Navigation from "./Navigation";
import { TripProvider } from "./src/hooks/useTrip";
import { UserProvider } from "./src/hooks/useUser";

export default function App() {
  return (
    <UserProvider>
      <TripProvider>
        <Navigation />
      </TripProvider>
    </UserProvider>
  );
}
