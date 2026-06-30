// frontend/src/ProgrameOperationale.jsx
import React from "react";
import { Container, Typography, Card, CardContent, Box } from "@mui/material";

export default function ProgrameOperationale() {
  const staticTitle = "Programe Operaționale";

  const staticContent = `
    <img width="332" height="369" src="/uploads/2021/12/Prog_Oper.png" alt="Programe Operationale" loading="lazy" />
    
    <p>Programele operaționale stabilesc strategii pentru contribuția la obiectivele de politică sau la obiectivul specific al Fondului pentru Tranziție Justă, precum și pentru comunicarea rezultatelor acestora.</p>
    
    <ul>
      <li><em>Sunt formate din una sau mai multe priorități, unde fiecare prioritate corespunde unui obiectiv de politică unic, obiectivului specific FTJ sau asistenței tehnice. O prioritate care corespunde unui obiectiv de politică poate viza unul sau mai multe obiective specifice.</em></li>
      <li><em>În cadrul unui program operațional se regăsesc informații cu privire la principalele provocări adresate (disparități și inegalități economice, sociale și teritoriale, disfuncționalitățile pieței, nevoile de investiții și sinergiile și complementaritățile cu alte forme de sprijin etc.), justificarea obiectivelor de politică selectate, tipurile de acțiuni și contribuția lor preconizată, indicatorii de realizare, cu obiectivele de etapă și țintele corespunzătoare, planul de finanțare, strategia de comunicare și pentru asigurarea vizibilității programului ș.a.</em></li>
      <li><em>Statele membre transmit programele operaționale spre aprobare Comisiei Europene, care le evaluează din punct al conformității lor cu Regulamentul privind dispozițiile comune și cu regulamentele specifice fiecărui fond, inclusiv din punct de vedere al coerenței cu Acordul de Parteneriat.</em></li>
    </ul>
    
    <h5><strong>La nivelul UVT sunt accesate și se află în implementare proiecte finanțate prin intermediul următoarelor programe operaționale:</strong></h5>
    
    <img width="365" height="124" src="/uploads/2021/12/Pocu-1.png" alt="POCU" loading="lazy" />
    <p style="text-align: center;"><strong><a href="https://mfe.gov.ro/programe/autoritati-de-management/am-pocu/" target="_blank" rel="noopener noreferrer">Programul Operațional CAPITAL UMAN</a></strong></p>
    
    <img width="363" height="108" src="/uploads/2021/12/POC.png" alt="POC" loading="lazy" />
    <p style="text-align: center;"><strong><a href="https://www.poc.research.gov.ro/" target="_blank" rel="noopener noreferrer">Programul Operațional COMPETIVITATE</a></strong></p>
    
    <img width="401" height="127" src="/uploads/2021/12/Regio.png" alt="REGIO" loading="lazy" />
    <p style="text-align: center;"><a href="https://adrvest.ro/" target="_blank" rel="noopener noreferrer"><strong>Programul Operațional REGIONAL</strong></a></p>
    
    <img width="479" height="154" src="/uploads/2021/12/POIM.png" alt="POIM" loading="lazy" />
    <p style="text-align: center;"><strong><a href="https://mfe.gov.ro/programe/autoritati-de-management/am-poim/" target="_blank" rel="noopener noreferrer">Programul Operațional INFRASTRUCTURĂ MARE</a></strong></p>
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
                "& p": {
                  mb: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                },
                "& img": {
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  mb: 1.5,
                  display: "block",
                  mx: "auto",
                },
                "& h1, & h2, & h3": {
                  color: "#003366",
                  fontWeight: 600,
                  mt: 4,
                  mb: 2,
                  textAlign: "center",
                },
                "& h5": {
                    textAlign: "center",
                    fontSize: "1.2rem",
                    mb: 3
                },
                "& ul": {
                  display: "block",
                  textAlign: "left",
                  pl: 5,
                  mb: 4
                },
                "& li": {
                    mb: 2
                },
                "& a": {
                  color: "#FF0000",
                  textDecoration: "underline",
                  fontWeight: 500,
                  display: "inline-block",
                  mt: 0.5,
                  "&:hover": {
                    color: "#cc0000",
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