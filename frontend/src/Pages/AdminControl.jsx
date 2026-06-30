import React from "react";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ADMIN_USERS } from "../keycloak"; 

export default function AdminControl({ keycloak }) {
  const navigate = useNavigate();
  
  const isAuthenticated = keycloak?.authenticated;
  
  // --- REZOLVARE AICI ---
  // Încercăm să luăm email-ul, dar dacă e gol, luăm preferred_username (care la UVT e tot adresa de email)
  const userIdentifier = keycloak?.tokenParsed?.email || keycloak?.tokenParsed?.preferred_username;
  const username = keycloak?.tokenParsed?.preferred_username;
  
  // Verificăm folosind identificatorul combinat
  const isAuthorized = isAuthenticated && userIdentifier && ADMIN_USERS.includes(userIdentifier.toLowerCase());

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      background: "linear-gradient(135deg, #003366 0%, #001a33 100%)",
      p: 2
    }}>
      <Container maxWidth="sm">
        <Paper elevation={10} sx={{ p: 4, textAlign: "center", borderRadius: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ color: "#003366", fontWeight: "bold" }}>
            Control Panel
          </Typography>

          {isAuthenticated ? (
            <Box>
              <Box sx={{ 
                mb: 3, 
                p: 2, 
                bgcolor: isAuthorized ? "#f0fdf4" : "#fef2f2", 
                borderRadius: 2, 
                border: "1px solid", 
                borderColor: isAuthorized ? "#bcf0da" : "#f87171" 
              }}>
                <Typography variant="h6" sx={{ color: "#333", fontSize: "1rem" }}>
                  Ești conectat ca: <strong>{username}</strong>
                </Typography>
                <Typography variant="body2" sx={{ color: "#555", mt: 0.5 }}>
                  ID Identificat: {userIdentifier}
                </Typography>
                
                {!isAuthorized ? (
                  <Typography variant="body2" sx={{ color: "#c53030", mt: 2, fontWeight: "bold" }}>
                    ⚠️ FĂRĂ ACCES ADMIN: Adresa "{userIdentifier}" nu se află în lista de permisiuni.
                  </Typography>
                ) : (
                  <Typography variant="body2" sx={{ color: "#15803d", mt: 2, fontWeight: "bold" }}>
                    ✅ ACCES CONFIRMAT: Ești în lista de administratori.
                  </Typography>
                )}
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Button 
                  variant="contained" 
                  fullWidth
                  onClick={() => navigate("/")}
                  sx={{ py: 1.5, backgroundColor: "#003366", '&:hover': { backgroundColor: "#002244" } }}
                >
                  Înapoi la Anunțuri
                </Button>
                
                <Button 
                  variant="outlined" 
                  color="error" 
                  fullWidth
                  onClick={() => keycloak.logout({ redirectUri: window.location.origin + "/admin-control" })}
                  sx={{ py: 1.2 }}
                >
                  Logout
                </Button>
              </Box>
            </Box>
          ) : (
            <Box>
              <Typography variant="body2" sx={{ mb: 3, color: "#777" }}>
                Autentifică-te pentru a verifica drepturile de administrare.
              </Typography>
              <Button 
                variant="contained" 
                size="large"
                fullWidth
                onClick={() => keycloak.login()}
                sx={{ 
                  backgroundColor: "#003366", 
                  py: 2,
                  fontWeight: "bold",
                  '&:hover': { backgroundColor: "#002244" }
                }}
              >
                Login (e-UVT)
              </Button>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}