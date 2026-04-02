// frontend/src/SelectieParteneri.jsx
import React from "react";
import { Container, Typography, Card, CardContent, Box } from "@mui/material";

export default function SelectieParteneri() {
  const staticTitle = "Selecție parteneri";

  const staticContent = `
    <div style="margin-top: 20px;">
      <h5 style="display: flex; align-items: flex-start; margin-bottom: 25px;">
        <span style="margin-right: 15px; font-size: 1.5rem;">📄</span>
        <a href="/uploads/2021/11/PO-00-Procedura-selectie-parteneri.pdf" target="_blank" rel="noopener noreferrer">
          Procedura operațională privind activitatea de selecție a partenerilor în cadrul proiectelor finanțate prin intermediul fondurilor europene pentru perioada 2014 - 2020
        </a>
      </h5>
      
        <ul style="list-style-type: none; padding: 0;">
          ${[
            { n: "1", t: "Model orientativ anunț intenție selecție parteneri", f: "Anexa-1-Model-orientativ-anunt-intentie-selectie-parteneri.docx" },
            { n: "1", t: "Scrisoare de intenție", f: "Anexa-1-Scrisoare-de-intentie.doc" },
            { n: "2", t: "Fișa partenerului", f: "Anexa-2-Fisa-partenerului.doc" },
            { n: "3", t: "Centralizare evaluare dosare de candidatură", f: "Anexa-3-Centralizare-evaluare-dosare-de-candidatura.doc" },
            { n: "3", t: "Grila de evaluare - Criterii de selecție", f: "Anexa-3-Grila-de-evaluare-Criterii-de-selectie.doc" },
            { n: "4", t: "Raportul procedurii de selecție a partenerilor", f: "Anexa-4-Raportul-procedurii-de-selectie-a-partenerilor-.doc" },
            { n: "5", t: "Anunț cu privire la rezultatul procedurii de selecție", f: "Anexa-5-Anunt-cu-privire-la-rezultatul-procedurii-de-selectie-.doc" },
            { n: "6", t: "Raportul procedurii de selecție în urma soluționării contestațiilor", f: "Anexa-6-Raportul-procedurii-de-selectie-a-parteneilor-in-urma-solutionarii-contestatiilor.doc" },
            { n: "7", t: "Anunț cu privire la rezultatul procedurii în urma soluționării contestațiilor", f: "Anexa-7-Anunt-with-privire-la-rezultatul-procedurii-de-selectie-in-urma-solutionarii-contestatiilor.doc" }
          ].map(item => `
            <li style="display: flex; align-items: center; margin-bottom: 12px;">
              <span style="margin-right: 12px; color: #FFD700; font-size: 1.1rem;">📁</span>
              <a href="/uploads/2021/11/${item.f}" target="_blank" rel="noopener noreferrer">
                Anexa ${item.n} - ${item.t}
              </a>
            </li>
          `).join('')}
        </ul>
      </div>

        <span style="margin-right: 15px; font-size: 1.3rem;">⚖️</span>
        <a href="/uploads/2021/11/Decizie-comisie-selectie-partener.doc" target="_blank" rel="noopener noreferrer">
          Decizie comisie selecție partener
        </a>
      </h5>
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
          <Box sx={{ width: 80, height: 4, backgroundColor: "#FFD700", mx: "auto", borderRadius: 2 }} />
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
              left: 0, top: 0, bottom: 0, width: "6px",
              background: "linear-gradient(to bottom, #FFD700, #003366)",
            }}
          />

          <CardContent sx={{ pl: { xs: 2, md: 4 } }}>
            <Box
              sx={{
                fontSize: "1.1rem",
                lineHeight: 1.8,
                color: "#003366",
                "& a": {
                  color: "#FF0000",
                  textDecoration: "underline",
                  fontWeight: 500,
                  "&:hover": { color: "#cc0000", textDecoration: "none" },
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