import React from "react";
import { Container, Typography, Box, Link, Divider, Paper } from "@mui/material";

export default function Home() {
  // Date introduse manual (hardcoded) conform informațiilor furnizate
  const pageTitle = "Burse și sprijin profesional pentru doctoranzi și cercetători post-doctorat";

  const content = [
    "Ministerul Investițiilor și Proiectelor Europene a lansat în 8 noiembrie 2021, apelul de finanțare destinat sprijinirii doctoranzilor și cercetătorilor post-doctorat prin burse de studiu, precum și consolidării colaborărilor între universități, institute de cercetare și mediul privat, din cadrul Programului Operațional Capital Uman 2014-2020.",
    "Apelul are o valoare totală de 21 milioane de euro și încurajază activitățile de cercetare cu componentă aplicativă, relevantă pentru tema de doctorat / postdoctorat aleasă de doctoranzi/ post-doctoranzi.",
    "Proiectele pot fi depuse în sistemul informatic MySMIS până în data de 31 decembrie 2021, ora 16.00.",
  ];

  // Link-uri suplimentare (adăugate pentru acces rapid)
  const links = [
    {
      text: "https://www.fonduri-structurale.ro/program-operational/2/programul-operational-capital-uman",
      url: "https://www.fonduri-structurale.ro/program-operational/2/programul-operational-capital-uman"
    },
    
    // Dacă ai URL-ul exact pentru „Fișă tehnică apel finanțat prin ME_Acces 2022”, adaugă-l aici
    // Exemplu: { text: "Fișă tehnică apel ACCES 2022", url: "URL_AICI" }
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