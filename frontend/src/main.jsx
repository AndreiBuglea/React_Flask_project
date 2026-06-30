// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import keycloak from "./keycloak";

keycloak.init({ 
  onLoad: "check-sso", 
  silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html" 
}).then((authenticated) => {
  // Chiar dacă nu e authenticated, randăm App. 
  // Componentele interne vor decide dacă cer login.
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App keycloak={keycloak} />
    </React.StrictMode>
  );
}).catch(() => {
  console.error("Keycloak failed to initialize");
});