import React from "react";
import { Container, Typography, Box, Link, Divider, Paper } from "@mui/material";

export default function Home() {
  // Date introduse manual (hardcoded) conform informațiilor furnizate
  const pageTitle = "Oportunități de finanțare – program ACCES 2022";

  const content = [
    "Apel de proiecte: ACCES 2022 lansat de către Ministerul Culturii operatorilor culturali din zona independentă.",
    "Domeniile pentru care se pot transmite oferte culturale sunt: teatru, muzică, dans, arte vizuale, cultură scrisă.",
    "Detalii oficiale pot fi consultate pe pagina web dedicată apelului: www.cultura.ro/anunt-lansarea-sesiunii-anuale-de-finantareprogramului-acces-2022.",
    "Cunoscând activitatea membrilor comunității academice UVT în domeniul cultural, precum și specificul activităților vizate de apelul deschis, vă adresăm invitația de a consulta fișa tehnică de prezentare a apelului – Fișă tehnică apel finanțat prin ME_Acces 2022."
  ];

  // Link-uri suplimentare (adăugate pentru acces rapid)
  const links = [
    {
      text: " www.cultura.ro/anunt-lansarea-sesiunii-anuale-de-finantareprogramului-acces-2022 ",
      url: "http://www.cultura.ro/anunt-lansarea-sesiunii-anuale-de-finantare-programului-acces-2022"
    },
    {
      text: "Fișă tehnică apel finanțat prin ME_Acces2022",
      url: "uploads/2022/05/Fisa-tehnica-apel-finantat-prin-ME_Acces-2022.pdf"
    }
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

        <Typography
          variant="caption"
          color="text.secondary"
          align="center"
          display="block"
          sx={{ mt: 3 }}
        >
          Sursă: Ministerul Culturii | Informații preluate și adaptate pentru comunitatea academică UVT
        </Typography>
      </Container>
    </Box>
  );
}