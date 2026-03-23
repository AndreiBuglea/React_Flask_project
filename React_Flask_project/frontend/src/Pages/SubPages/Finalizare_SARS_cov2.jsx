import React from "react";
import { Container, Typography, Box, Link, Divider, Paper } from "@mui/material";

export default function Home() {
  // Date introduse manual (hardcoded) conform informațiilor furnizate
  const pageTitle = "Finalizarea proiectului cu titlul ”Sprijin pentru Universitatea de Vest din Timișoara în contextul SARS-COV-2” – ID 143325";

  const content = [
    " Universitatea de Vest din Timișoara anunță finalizarea proiectului cu titlul Sprijin pentru Universitatea de Vest din Timișoara în contextul SARS-COV-2 – ID 143325, proiect finanțat prin Programul Operațional Infrastructură Mare, în cadrul apelului de proiecte POIM/964/10/1/Sprijinirea ameliorării efectelor provocate de criză în contextul pandemiei de COVID-19 și al consecințelor sale sociale.",

     "Proiectul s-a derulat pe o perioadă de 21 luni, noiembrie 2020 – iulie 2022 și a avut ca obiectiv general asigurarea unei capacități adecvate de gestionare a crizei sanitare, prin diminuarea riscului de propagare a infecției cu SARS-CoV-2 în sistemul public de educație universitară, prin dotarea Universității de Vest din Timișoara cu aparatură destinată dezinfecției și sterilizării aerului de tipul nebulizatoarelor.",

     "Prin implementarea proiectului 10 locații din cadrul Universității de Vest din Timișoara au fost dotate cu echipamente și aparatură tehnologică de ultimă generație, precum terminale de acces și control, încorporate cu recunoaștere facială și detectoare de temperatură.",

     "Valoarea totală a contractului de finanțare a fost de 1.203.275,43 lei și a reprezentat finanțare 100% nerambursabilă.",

     "Proiect cofinanțat din Fondul European de Dezvoltare Regională/Fondul de Coeziune prin Programul Operațional Infrastructură Mare 2014-2020.",
     "Persoană de contact: Manager proiect: dr. Vlad Sergiu PETCU, E-mail: vlad.petcu@e-uvt.ro, Telefon: 0256 592 309"
  ];

  // Link-uri suplimentare (adăugate pentru acces rapid)
  const links = [
    
    
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