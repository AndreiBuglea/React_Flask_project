// frontend/src/BuletinInformativ.jsx
import React from "react";
import { Container, Typography, Card, CardContent, Box } from "@mui/material";

export default function BuletinInformativ() {
  const staticTitle = "Buletin informativ";

  const staticContent = `
    <div style="margin-top: 20px; display: flex; flex-direction: column; align-items: center;">
      <Box style="
        background-color: #f8faff; 
        border: 1px dashed #003366; 
        border-radius: 12px; 
        padding: 30px; 
        width: 100%; 
        max-width: 600px; 
        text-align: center;
      ">
        <span style="font-size: 3rem; display: block; margin-bottom: 15px;">📰</span>
        <h5 style="margin-bottom: 20px; font-weight: 600;">Ediția Curentă - DAIP</h5>
        <a 
          href="/uploads/2024/04/Buletin-informativ_DAIP_aprilie-2024-1.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          style="
            display: inline-block;
            background-color: #FF0000;
            color: #ffffff;
            padding: 12px 25px;
            text-decoration: none;
            border-radius: 30px;
            font-weight: 700;
            transition: transform 0.2s, background-color 0.2s;
          "
          onMouseOver="this.style.backgroundColor='#cc0000'; this.style.transform='scale(1.05)';"
          onMouseOut="this.style.backgroundColor='#FF0000'; this.style.transform='scale(1)';"
        >
          DESCHIDE BULETINUL INFORMATIV (PDF)
        </a>
        <p style="margin-top: 15px; font-size: 0.9rem; color: #666;">
          Publicat în: Aprilie 2024
        </p>
      </Box>
    </div>
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

          <CardContent sx={{ pl: { xs: 2, md: 4 } }}>
            <Box
              sx={{
                fontSize: "1.1rem",
                lineHeight: 1.9,
                color: "#003366",
                "& p": { mb: 2 },
              }}
              dangerouslySetInnerHTML={{ __html: staticContent }}
            />
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}