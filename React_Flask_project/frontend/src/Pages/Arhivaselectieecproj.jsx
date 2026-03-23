// frontend/src/Home.jsx
import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, Box } from "@mui/material";

export default function Home() {
  const [page, setPage] = useState({ title: "", tabel: "" });

  useEffect(() => {
    fetch("/api/page/arhiva-selectie-echipe-proiecte")
      .then((res) => res.json())
      .then((data) => setPage(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #e6f2ff 0%, #ffffff 100%)",
        minHeight: "100vh",
        py: 8,
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 4 } }}>
        {/* TITLU */}
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
            {page.title}
          </Typography>
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

        {/* CARD CONTINUT */}
        <Card
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: 4,
            boxShadow: "0px 10px 30px rgba(0,0,0,0.08)",
            p: { xs: 2, md: 4 },
            position: "relative",
            overflowX: "auto",
          }}
        >
          {/* Accent lateral */}
          <Box
            sx={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "6px",
              background: "linear-gradient(to bottom, #FFD700, #003366)",
            }}
          />

          <CardContent sx={{ pl: 4 }}>
            <Box
              sx={{
                fontSize: "1.1rem",
                lineHeight: 1.9,
                color: "#003366",
                "& p": { mb: 2 },
                "& h1, & h2, & h3": { color: "#003366", fontWeight: 600, mt: 3, mb: 2 },
                "& ul": { pl: 3 },
                "& a": { color: "#FF0000", textDecoration: "underline", fontWeight: 500 },

                width: "100%",
                minWidth: "1200px",

                // **STILURI PENTRU TABEL**
                "& table": {
                  width: "100%",
                  borderCollapse: "collapse",
                },
                "& th, & td": {
                  border: "1px solid #003366",
                  padding: "8px",
                  textAlign: "left",
                },
                "& th": {
                  backgroundColor: "#f0f8ff",
                  fontWeight: 700,
                },
              }}
              dangerouslySetInnerHTML={{ __html: page.tabel }}
            />
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}