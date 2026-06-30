// frontend/src/ConsultantaProiecte.jsx
import React from "react";
import { Container, Typography, Card, CardContent, Box } from "@mui/material";

export default function ConsultantaProiecte() {
  const staticTitle = "Consultanță în accesarea și implementarea proiectelor";

  const staticContent = `
    <div style="margin-top: 20px;">
      <h5 style="display: flex; align-items: flex-start; margin-bottom: 25px;">
        <span style="margin-right: 15px; font-size: 1.5rem;">📄</span>
        <a href="/uploads/2021/11/PO-02-Procedura-operationala-consultanta.pdf" target="_blank" rel="noopener noreferrer">
          Procedura operațională privind activitatea de consultanță în accesarea și implementarea proiectelor cu finanțare nerambursabilă de dezvoltare instituțională
        </a>
      </h5>
      
      <div style="padding-left: 40px;">
        <h5 style="display: flex; align-items: flex-start; margin-bottom: 15px;">
          <span style="margin-right: 15px; font-size: 1.2rem;">📁</span>
          <a href="/uploads/2021/11/Anexa-1-Formular-de-consultanta-in-accesarea-de-proiecte.doc" target="_blank" rel="noopener noreferrer">
            Anexa 1 - Formular de consultanță în accesarea de proiecte
          </a>
        </h5>
        
        <h5 style="display: flex; align-items: flex-start; margin-bottom: 15px;">
          <span style="margin-right: 15px; font-size: 1.2rem;">📁</span>
          <a href="/uploads/2021/11/Anexa-2-Formular-de-consultanta-implementare-proiect.doc" target="_blank" rel="noopener noreferrer">
            Anexa 2 - Formular de consultanță implementare proiect
          </a>
        </h5>
        
        <h5 style="display: flex; align-items: flex-start; margin-bottom: 15px;">
          <span style="margin-right: 15px; font-size: 1.2rem;">📁</span>
          <a href="/uploads/2021/11/Anexa-3-Fisa-consultanta-accesare-sau-implementare-proiecte.docx" target="_blank" rel="noopener noreferrer">
            Anexa 3 - Fișa consultanță accesare sau implementare proiecte
          </a>
        </h5>
      </div>
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
                "& h5": {
                  fontSize: "1.15rem",
                  fontWeight: 600,
                  mb: 2,
                },
                "& a": {
                  color: "#FF0000",
                  textDecoration: "underline",
                  fontWeight: 500,
                  transition: "color 0.2s",
                  "&:hover": {
                    color: "#cc0000",
                    textDecoration: "none",
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