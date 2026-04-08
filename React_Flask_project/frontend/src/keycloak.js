import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "https://aai.e-uvt.ro/",
  realm: "euvt",
  clientId: "DAIP-test",
});

// Citim din .env, dacă nu există nimic punem un array gol ca să nu dea eroare
const adminString = import.meta.env.VITE_ADMIN_USERS || "";

// Transformăm string-ul "email1,email2" în array-ul ["email1", "email2"]
export const ADMIN_USERS = adminString.split(",").map(email => email.trim());

export default keycloak;