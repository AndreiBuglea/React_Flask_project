// frontend/src/Home.jsx
import React from "react";
import { Container, Typography, Card, CardContent, Box } from "@mui/material";

export default function Home() {
  // Conținutul extras din API și curățat pentru a fi independent
  const staticTitle = "Misiunea DAIP";
  
  const staticContent = `
    
    <p><strong>Misiunea DAIP</strong> este de a sprijini dezvoltarea instituțională a Universității de Vest din Timișoara prin intermediul identificării, accesării și implementării instrumentelor de finanțare nerambursabilă care să permită finanțarea obiectivelor strategice ale universității asumate în planul managerial și în strategia de dezvoltare instituțională.<br /><br /></p>
    
    <p><strong>Obiectivele DAIP</strong></p>
    <ul>
      <li>Informarea cadrelor didactice și a personalului administrativ despre oportunitățile de finanțare adresate universităților în scopul dezvoltării instituționale;</li>
      <li>Creșterea valorii finanțărilor nerambursabile pentru dezvoltarea instituționlă a universității prin intermediul accesării de finanțări nerambursabile, în conformitate cu strategia de dezvoltare instituțională și a proiectelor strategice implementate;</li>
      <li>Implementarea eficientă și eficace a proiectelor cu finanțare nerambursabilă ce vizează dezvoltarea instituțională și oferirea de suport managerilor și echipelor de proiect pentru accesarea, implementarea și raportarea acestora.</li>
    </ul>
    
    <p><strong>Serviciului Accesare Proiecte </strong>este menit să sprijine universitatea (solicitantul de finanțare), precum și experții co-interesați să inițieze proiecte, în procesul de conturare și depunere a proiectelor pentru obținerea finanțărilor.</p>
    <p>Accesarea finanțărilor presupune identificarea și selectarea surselor de finanțare potrivite, cunoașterea normelor care se aplică acestor finanțări, accesarea finanțărilor selectate și realizarea tuturor demersurilor necesare contractării proiectelor selectate spre finanțare, sesiuni de lucru/informare privind accesarea finanțărilor și prezentarea liniilor de finanțare disponibile.</p>
    
    <p><strong>Serviciului Implementare Proiecte </strong>presupune implementarea eficientă și eficace a proiectelor finanțate pentru universitate, în scopul dezvoltării instituționale.</p>
    <p>Rolul serviciilor oferite este acela de a identifica cele mai bune modalități de atingere a obiectivelor proiectelor finanțate; de a oferi suport managerilor/experților implicați în implementarea proiectelor finanțate; realizarea raportărilor conform manualelor de implementare, a ghidurilor specifice și a instrucțiunilor emise de autoritățile/organismele de monitorizare și control; monitorizarea implementării proiectelor finanțate; aplicarea procedurilor interne privind selecția echipelor de proiect, a cheltuielilor neeligibile; respectarea restricțiilor impuse de utilizarea finanțărilor nerambursabile/instituționale, sesiuni de lucru/informare privind implementarea eficientă a proiectelor.</p>
    
    <p><strong><br />Atribuții generale DAIP</strong></p>
    <ol>
      <li>Identificarea oportunităților de finanțare pentru dezvoltrarea instituțională a universității;</li>
      <li>Diseminarea oportunităților de finanțare în ceea ce privește dezvoltarea instituțională în rândul cadrelor academice și a personalului administrativ al universității;</li>
      <li>Oferirea de consultanță în accesarea și implementarea finanțărilor nerambursabile care au drept scop dezvoltarea instituțională;</li>
      <li>Oferirea de sprijin în accesarea și implementarea proiectelor cu finanțare nerambursabilă prin punerea la dispoziția managerilor a documentelor standard utilizate în UVT;</li>
      <li>Scrierea, aplicarea, implementarea și raportarea proiectelor cu finanțare nerambursabilă identificate ca fiind prioritare pentru universitate în conformitate cu strategia de dezvoltare instituțională;</li>
      <li>Oferirea de consultanță în accesarea și implementarea proiectelor cu finanțare nerambursabilă de dezvoltare instituțională personalului academic și administrativ al universității;</li>
      <li>Organizarea de seminarii, traininguri și evenimente informative privind oportunitățile de finanțare nerambursabile, accesarea, implementarea și raportarea proiectelor cu finanțare nerambursabilă;</li>
      <li>Monitorizarea derulării proiectelor aflate în implementare, a raportării acestora și evaluarea lor;</li>
      <li>Realizarea de situații și statistici aferente proiectelor cu finanțare nerambursabilă de dezvoltare instituțională precum și rapoartarea situațiilor instituțiilor care solicită aceste situații prin intermediul adreselor.</li>
    </ol>
    
    <p>Regulamentul de organizare și funcționare al Departamentulului de Accesare și Implementare Proiecte – DAIP poate fi consultat <a href="/uploads/2021/11/Regulament-de-organizare-Departament-proiecte-DAIP.docx.pdf" target="_blank" rel="noopener noreferrer">aici</a></p>
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

          {/* Linie decorativă */}
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
                "& h1, & h2, & h3": {
                  color: "#003366",
                  fontWeight: 600,
                  mt: 3,
                  mb: 2,
                },
                "& ul, & ol": { pl: 3, mb: 2 },
                "& li": { mb: 1 },
                "& a": {
                    color: "#003366",
                    fontWeight: "bold",
                    textDecoration: "underline",
                    "&:hover": { color: "#FFD700" }
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