import "./App.css";
import { CurrentUserProvider } from "./contexts/CurrentUserContext"
import Router from "./components/routes/Router";
function App() {
  return (
    <div className="App">
      <CurrentUserProvider>
        <Router />
      </CurrentUserProvider>
    </div>
  );
}

export default App;
