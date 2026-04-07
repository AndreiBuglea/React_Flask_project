import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "https://aai.e-uvt.ro/",
  realm: "euvt",
  clientId: "DAIP-test",
});

// Lista de admini: doar aceștia pot modifica anunțuri
export const ADMIN_USERS = [
  "andrei.buglea@e-uvt.ro",
];

export default keycloak;