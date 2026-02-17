import { useState } from "react";
import Register from "./Register";
import Login from "./Login";

function App() {
  const [loggedInUser, setLoggedInUser] = useState("");

  const handleLogin = (email) => {
    setLoggedInUser(email);
  };

  const handleLogout = () => {
    setLoggedInUser("");
  };

  if (loggedInUser) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Welcome {loggedInUser}</h2>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Register />
      <hr />
      <Login onLogin={handleLogin} />
    </div>
  );
}

export default App;
