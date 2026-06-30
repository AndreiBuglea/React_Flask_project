import { useState } from "react";
import { Box, Card, CardContent, TextField, Button, Typography } from "@mui/material";

export default function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const token = localStorage.getItem("token");
  const isAdmin = !!token;
  const [errorMsg, setErrorMsg] = useState("");

  const login = async () => {
  setErrorMsg(""); // Resetăm eroarea la fiecare încercare
  const res = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

    if (!res.ok) {
      setErrorMsg("Credentiale invalide. Încearcă din nou.");
      return;
    }

    const data = await res.json();
    localStorage.setItem("token", data.access_token);
    window.location.href = "/";
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e6f2ff 0%, #ffffff 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 10,
        px: 2,
      }}
    >
      
      <Card
        sx={{
          maxWidth: 400,
          width: "100%",
          borderRadius: 4,
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          p: 4,
        }}
      >
        {errorMsg && <Typography color="error" sx={{ textAlign: 'center', mb: 2 }}>{errorMsg}</Typography>}
        {isAdmin && (
          <Button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
            variant="contained"
            sx={{
              mb: 3,
              backgroundColor: "#c53030",
              "&:hover": { backgroundColor: "#9b2c2c" },
            }}
          >
            Logout
          </Button>
        )}

        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: 700, color: "#003366" }}
          >
            Admin Login
          </Typography>

          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            onClick={login}
            variant="contained"
            sx={{
              backgroundColor: "#FFD700",
              color: "#003366",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#003366",
                color: "#FFD700",
                transform: "scale(1.05)",
              },
              py: 1.5,
              borderRadius: "30px",
              transition: "all 0.3s",
            }}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}