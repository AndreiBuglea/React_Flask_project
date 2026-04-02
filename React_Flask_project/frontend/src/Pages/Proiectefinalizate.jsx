// frontend/src/ProiecteFinalizate.jsx
import React from "react";
import { Container, Typography, Card, CardContent, Box } from "@mui/material";

export default function ProiecteFinalizate() {
  const staticTitle = "Proiecte finalizate";

  const staticContent = `
    <p style="text-align: left;">
      <a href="/uploads/2023/08/Portofoliu-proiecte-UVT-finalizate-2021-2022.pdf" target="_blank" rel="noopener noreferrer">
        Portofoliu proiecte UVT finalizate 2021-2022
      </a>
    </p>
    
    <p style="text-align: left;">
      <a href="/uploads/2023/08/Portofoliu-proiecte-UVT-finalizate-Exercitiu-financiar-2014-2020.pdf" target="_blank" rel="noopener noreferrer">
        Portofoliu proiecte UVT, finalizate. Exercițiu financiar 2014-2020
      </a>
    </p>
    
    <p style="text-align: left;">
      <a href="/uploads/2023/08/Portofoliu-proiecte-UVT-finalizate-Exercitiu-financiar-2007-2013.pdf" target="_blank" rel="noopener noreferrer">
        Portofoliu proiecte UVT, finalizate. Exercițiu financiar 2007-2013
      </a>
    </p>
    
    <p style="text-align: left;">
      <a href="/uploads/2023/08/Portofoliu-proiecte-nationale-finalizate-pana-in-2016.pdf" target="_blank" rel="noopener noreferrer">
        Portofoliu proiecte naționale finalizate până în 2016
      </a>
    </p>
  `;

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #e6f2ff 0%, #ffffff 100%)",
        minHeight: "100vh",
        py: 8,
      }}
    >
      <Container maxWidth="lg">
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
            {staticTitle}
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
            overflow: "hidden",
          }}
        >
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
                "& p": { 
                  mb: 3,
                  display: "flex",
                  alignItems: "center",
                  "&::before": {
                    content: '"•"',
                    color: "#FFD700",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    marginRight: "15px"
                  }
                },
                "& a": {
                  color: "#FF0000",
                  textDecoration: "underline",
                  fontWeight: 500,
                  transition: "0.2s",
                  "&:hover": {
                    color: "#cc0000",
                    textDecoration: "none"
                  },
                },
              }}
              dangerouslySetInnerHTML={{ __html: staticContent }}
            />
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}