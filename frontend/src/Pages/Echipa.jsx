// frontend/src/Home.jsx
import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, Box, Grid } from "@mui/material";

export default function Home() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch("/api/page/echipa-daip")
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch((err) => console.error(err));
  }, []);

  const CARD_HEIGHT = 320; // Am mărit puțin înălțimea pentru a acomoda spațierea nouă
  const CARD_WIDTH = 300;

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #f5faff 0%, #ffffff 100%)",
        minHeight: "100vh",
        py: 8,
      }}
    >
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: "#003366",
            mb: 2,
            position: "relative",
            display: "inline-block",
          }}
        >
          Echipa DAIP
        </Typography>

        {/* Linie decorativă */}
        <Box
          sx={{
            width: 80,
            height: 4,
            backgroundColor: "#FFD700",
            mx: "auto",
            borderRadius: 2,
          }}
        />
      </Box>

      <Container maxWidth="xl">
        {/* PRIMELE 2 CARDURI - Mărit spacing la 6 pentru distanță mai mare între rânduri */}
        <Grid container spacing={6} justifyContent="center" mb={8}>
          {members.slice(0, 2).map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: CARD_HEIGHT,
                  width: CARD_WIDTH,
                  mx: "auto",
                  borderRadius: 4,
                  boxShadow: "0px 10px 25px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "center",
                  p: 3, // Padding intern mărit
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0px 15px 35px rgba(0,0,0,0.15)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {/* Folosim Box cu display flex și gap pentru spațiere uniformă între rândurile de text */}
                <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "#003366" }}>
                    {member.name}
                  </Typography>
                  <Typography sx={{ color: "#FFD700", fontWeight: 600, mb: 1 }}>
                    {member.role}
                  </Typography>
                  <Typography sx={{ fontSize: "0.95rem", color: "#003366" }}>
                    {member.phone}
                  </Typography>
                  <Typography sx={{ fontSize: "0.95rem", color: "#003366", wordBreak: "break-word" }}>
                    {member.email}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* TEXTUL "CONSULTANȚI DE SPECIALITATE" */}
        <Typography
          variant="h5"
          align="center"
          sx={{ color: "#003366", fontWeight: 700, mb: 6 }}
        >
          Consultanți de specialitate
        </Typography>

        {/* RESTUL CARDURILOR - Spacing 6 pentru rânduri mai aerisite */}
        <Grid container spacing={6} justifyContent="center">
          {members.slice(2).map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: CARD_HEIGHT,
                  width: CARD_WIDTH,
                  mx: "auto",
                  borderRadius: 4,
                  boxShadow: "0px 10px 25px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "center",
                  p: 3,
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0px 15px 35px rgba(0,0,0,0.15)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "#003366" }}>
                    {member.name}
                  </Typography>
                  <Typography sx={{ color: "#FFD700", fontWeight: 600, mb: 1 }}>
                    {member.role}
                  </Typography>
                  <Typography sx={{ fontSize: "0.95rem", color: "#003366" }}>
                    {member.phone}
                  </Typography>
                  <Typography sx={{ fontSize: "0.95rem", color: "#003366", wordBreak: "break-word" }}>
                    {member.email}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}