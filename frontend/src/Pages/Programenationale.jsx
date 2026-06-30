// frontend/src/ProgrameNationale.jsx
import React from "react";
import { Container, Typography, Card, CardContent, Box } from "@mui/material";

export default function ProgrameNationale() {
  const staticTitle = "Programe Naționale";

  const staticContent = `
    <img width="332" height="369" src="/uploads/2021/12/Prog_Nat.png" alt="Programe Naționale" loading="lazy" style="display: block; margin: 0 auto 20px auto; max-width: 100%; height: auto;" />
    
    <p>Schemele naționale de finanțare sunt proiectate și aprobate la nivel național în strânsă corelare cu strategiile naționale și sunt finanțate exclusiv din fonduri naționale.</p>
    
    <p>Scopul acestor programe este implementarea diverselor politici și priorități naționale.</p>
    
    <p>Implementarea și gestionarea proiectelor are loc exclusiv în România, sub responsabilitatea ministerelor/agențiilor desemnate în acest scop.</p>
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
        {/* TITLU PRINCIPAL */}
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
                lineHeight: 1.8,
                color: "#003366",
                textAlign: "center", // Am păstrat alinierea centrată pentru a se potrivi cu restul paginilor de acest tip

                /* Forțăm toate elementele de text să moștenească dimensiunea dorită, ignorând inline styles vechi */
                "& p, & span, & li, & div": {
                  fontSize: "1.1rem !important",
                  mb: 3,
                  lineHeight: 1.8,
                },

                "& h2, & h3": {
                  color: "#003366",
                  fontWeight: 700,
                  mt: 2,
                  mb: 2,
                  fontSize: "1.5rem",
                },

                "& img": {
                    borderRadius: "8px",
                    boxShadow: "0px 4px 15px rgba(0,0,0,0.05)"
                }
              }}
              dangerouslySetInnerHTML={{ __html: staticContent }}
            />
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}