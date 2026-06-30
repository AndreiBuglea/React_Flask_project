import React from "react";
import { Container, Typography, Box, Link, Divider, Paper } from "@mui/material";

export default function Home() {
  // Date introduse manual (hardcoded) conform informațiilor furnizate
  const pageTitle = "UVT va derula acceleratoare de afaceri pentru studenți și va acorda finanțări de până la 100.000 de euro, 100% nerambursabili pentru start-up-urile înființate de aceștia.";

  const content = [
    "Autoritatea de Management pentru Programul Operaţional Capital Uman 2014 – 2020 din cadrul Ministerului Investițiilor și Proiectelor Europene a publicat în data de 17 noiembrie 2021, listele finale ale cererilor de finanțare aprobate aferente etapei de evaluare tehnică și financiară, Universitatea de Vest din Timișoara fiind unul dintre administratorii de grant ce va derula acceleratoare de afaceri pentru studenți și va acorda finanțări de până la 100.000 de euro, 100% nerambursabili pentru start-upurile înființate de aceștia.",
  ];

  // Link-uri suplimentare (adăugate pentru acces rapid)
  const links = [
    {
      text: "https://mfe.gov.ro/listele-finale-ale-cererilor-de-finantare-aprobate-aferente-etapei-de-evaluare-tehnica-si-financiara-dupa-finalizarea-procesului-de-solutionare-a-contestatiilor-pentru-apelul-de-proiecte-pocu-829-6/",
      url: "https://mfe.gov.ro/listele-finale-ale-cererilor-de-finantare-aprobate-aferente-etapei-de-evaluare-tehnica-si-financiara-dupa-finalizarea-procesului-de-solutionare-a-contestatiilor-pentru-apelul-de-proiecte-pocu-829-6/"
    },
    
  ];

  return (
    <Box sx={{ backgroundColor: "#e6f2ff", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="md">
        {/* Titlu principal */}
        <Typography
          variant="h3"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            color: "#003366",
            fontWeight: "bold",
            mb: 5,
            textShadow: "1px 1px 4px rgba(0,0,0,0.15)",
          }}
        >
          {pageTitle}
        </Typography>

        {/* Conținut text principal */}
        {content.length > 0 && (
          <Paper
            elevation={2}
            sx={{
              p: { xs: 3, md: 4 },
              mb: 5,
              borderRadius: 2,
              backgroundColor: "#ffffff",
            }}
          >
            {content.map((paragraph, index) => (
              <Typography
                key={index}
                variant="body1"
                sx={{
                  mb: 2.5,
                  fontSize: "1.08rem",
                  lineHeight: 1.9,
                  color: "#1a3c5e",
                }}
              >
                {paragraph}
              </Typography>
            ))}
          </Paper>
        )}

        {/* Secțiune Documente și link-uri utile */}
        {links.length > 0 && (
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                mb: 3,
                color: "#003366",
                fontWeight: 600,
              }}
            >
              Resurse și documente oficiale
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    fontSize: "1.05rem",
                    color: "#0066cc",
                    "&:hover": {
                      color: "#003366",
                      textDecorationColor: "#003366",
                    },
                  }}
                >
                  <Box component="span" sx={{ mr: 1 }}>📄</Box>
                  {link.text}
                </Link>
              ))}
            </Box>
          </Box>
        )}

        <Divider sx={{ my: 5, borderColor: "#b0bec5" }} />

        
      </Container>
    </Box>
  );
}