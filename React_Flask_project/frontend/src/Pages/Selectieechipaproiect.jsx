// frontend/src/SelectieEchipaProiect.jsx
import React from "react";
import { Container, Typography, Card, CardContent, Box } from "@mui/material";

export default function SelectieEchipaProiect() {
  const staticTitle = "Selecție echipă proiect";

  const staticContent = `
    <div style="margin-top: 20px;">
      <h5 style="display: flex; align-items: flex-start; margin-bottom: 25px;">
        <span style="margin-right: 15px; font-size: 1.5rem;">📄</span>
        <a href="/uploads/2025/02/OM_procedura-UVT.pdf" target="_blank" rel="noopener noreferrer">
          Procedura operațională privind activitatea de recrutare și selecție a personalului în vederea nominalizării/angajării în cadrul proiectelor finanțate din fonduri europene nerambursabile și prin mecanismul de redresare și reziliență
        </a>
      </h5>
      
      <div style="padding-left: 20px;">
        <ul style="list-style-type: none; padding: 0;">
          ${[
            { n: "1", t: "Notă justificativă privind nominalizarea personalului", f: "Anexa-1-Nota-justificativa-privind-nominalizarea-personalului-a-proiectului-finantat-din-fonduri-europene-nerambursabile-si_sau-prin-Mecanismul-de-redresare-si-rezilienta-1.docx" },
            { n: "2", t: "Notă justificativă privind înființarea posturilor în afara organigramei", f: "Anexa-2-Nota-justificativa-privind-infiintarea-posturilor-in-afara-organigramei-1.docx" },
            { n: "3", t: "Proces Verbal selecție dosare de candidatură", f: "Anexa-3-Proces-Verbal-selectie-dosare-de-candidatura-1.docx" },
            { n: "4", t: "Verificarea dosarelor de candidatură privind îndeplinirea condițiilor", f: "Anexa-4-Verificarea-dosarelor-de-candidatura-in-ceea-ce-priveste-indeplinirea-conditiilor-de-participare-la-procesul-de-selectie-1.docx" },
            { n: "5", t: "Planul de interviu / borderou de punctaj", f: "Anexa-5-Planul-de-interviu-_borderou-de-punctaj-la-interviu-1.docx" },
            { n: "6", t: "Proces verbal în urma interviului", f: "Anexa-6-Proces-verbal-in-urma-interviului-1.docx" },
            { n: "7", t: "Rezultatele obținute în urma susținerii probei interviu", f: "Anexa-7-Rezultatele-obtinute-in-urma-sustinerii-probei-interviu-1.docx" },
            { n: "8", t: "Raportul final al selecției", f: "Anexa-8-Raportul-final-al-selectiei-1.docx" },
            { n: "9", t: "Declarație pe proprie răspundere", f: "Anexa-9-Declaratie-pe-proprie-raspundere-1.docx" },
            { n: "10", t: "Formular înscriere concurs", f: "Anexa-10-Formular-inscriere-concurs-1.docx" },
            { n: "11", t: "Anunț de selecție echipă de proiect", f: "Anexa-11-Anunt-de-selectie-echipa-de-proiect-finantat-din-fonduri-europene-nerambursabile-1.docx" },
            { n: "A", t: "Anunț selecție - Conținut dosar candidatură", f: "Anexa-11.A-Anunt-selectie-echipa-proiect-Continut-dosar-candidatura-1.docx" },
            { n: "B", t: "Anunț selecție - Descrierea detaliată a posturilor", f: "Anexa-11.B-Anunt-selectie-echipa-proiect-Descrierea-detaliata-a-posturilor-1.docx" },
            { n: "C", t: "Anunț selecție - Criterii de evaluare și ierarhizare", f: "Anexa-11.C-Anunt-selectie-echipa-proiect-Criteriile-de-evaluare-si-modalitatea-de-ierarhizare-a-candidaturilor-1.docx" },
            { n: "D", t: "Anunț selecție - Criteriile de departajare", f: "Anexa-11.D-Anunt-selectie-echipa-proiect-Criteriile-de-departajare-1.docx" },
            { n: "E", t: "Decizie numire comisie de concurs", f: "Anexa-11.E-Decizie-numire-comisie-de-concurs-1.docx" },
            { n: "F", t: "Decizie numire comisie de contestație", f: "Anexa-11.F-Decizie-numire-comisie-de-contestatie-concurs-1.docx" },
            { n: "12", t: "Anunț afișare rezultate selecție", f: "Anexa-12-Anunt-afisare-rezultate-selectie-echipa-de-proiect-finantat-din-fonduri-europene-nerambursabile-si_sau-Mecanismul-de-redresare-si-rezilienta-1-1.docx" },
          ].map(item => `
            <li style="display: flex; align-items: center; margin-bottom: 8px;">
              <span style="margin-right: 10px; color: #FFD700;">📁</span>
              <a href="/uploads/2025/02/${item.f}" target="_blank" rel="noopener noreferrer" download style="font-size: 1rem;">
                Anexa ${item.n} - ${item.t}
              </a>
            </li>
          `).join('')}
          <li style="display: flex; align-items: center; margin-bottom: 8px; margin-top: 15px;">
            <span style="margin-right: 10px; color: #FFD700;">⚖️</span>
            <a href="/uploads/2025/02/Declaratie-GDPR-1.docx" target="_blank" download rel="noopener noreferrer">Declarație GDPR</a>
          </li>
          <li style="display: flex; align-items: center; margin-bottom: 8px;">
            <span style="margin-right: 10px; color: #FFD700;">⚖️</span>
            <a href="/uploads/Declaratie-pe-propria-raspundere-privind-conflictul-de-interese.docx" download target="_blank" rel="noopener noreferrer">Declarație privind Conflictul de Interese</a>
          </li>
        </ul>
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
                lineHeight: 1.6,
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