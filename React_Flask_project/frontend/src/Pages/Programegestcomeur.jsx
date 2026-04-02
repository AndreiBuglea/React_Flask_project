// frontend/src/ProgrameComisiaEuropeana.jsx
import React from "react";
import { Container, Typography, Card, CardContent, Box } from "@mui/material";

export default function ProgrameComisiaEuropeana() {
  const staticTitle = "Programe gestionate de Comisia Europeană";

  const staticContent = `
    <img width="332" height="369" src="/uploads/2021/12/Com_Europeana.png" alt="Comisia Europeana" loading="lazy" />
    
    <p>Programele comunitare sunt programe finanțate și gestionate direct de către Comisia Europeană și au ca scop punerea în aplicare a politicilor UE.</p>
    
    <ul>
      <li>Programele sunt transnaționale, ceea ce înseamnă că este necesară participarea partenerilor din mai multe state membre pentru depunerea și implementarea unui proiect.</li>
      <li>Propunerile de proiecte sunt supuse spre aprobare direct Comisiei Europene, fără intervenția instituțiilor statului membru.</li>
      <li>Propunerile de proiecte depuse concurează cu cele din toate statele membre, iar proiectele ce vor fi finanțate sunt selectate după o evaluare comparativă.</li>
    </ul>
    
    <h5 style="color: #003366; margin-top: 30px; margin-bottom: 20px;">
        <strong>La nivelul UVT sunt accesate proiecte finanțate prin intermediul următoarelor programe gestionate de Comisia Europeană:</strong>
    </h5>
    
    <img width="649" height="232" src="/uploads/2021/12/Horizon_Europe.png" alt="Horizon Europe" loading="lazy" />
    
    <p style="text-align: center;">
        <strong>
            <a href="https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/home" target="_blank" rel="noopener noreferrer">
                Horizon Europe
            </a>
        </strong>
    </p>
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

          <CardContent sx={{ pl: { xs: 2, md: 4 }, pr: { xs: 2, md: 4 } }}>
            <Box
              sx={{
                fontSize: "1.1rem",
                lineHeight: 1.7,
                color: "#003366",
                
                "& p": { 
                  mb: 3, 
                  textAlign: "left", 
                  width: "100%",
                },
          
                "& img": {
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "12px",
                  mt: 3, 
                  mb: 2, 
                  display: "block",
                  mx: "auto",
                },
          
                "& a": {
                  color: "#FF0000",
                  textDecoration: "underline",
                  fontWeight: 600,
                  display: "block",
                  textAlign: "center",
                  width: "fit-content",
                  mx: "auto",
                  mt: 1,
                  mb: 4,
                  "&:hover": {
                    color: "#cc0000",
                  }
                },
          
                "& h1, & h2, & h3, & h5": {
                  color: "#003366",
                  fontWeight: 600,
                  mt: 4,
                  mb: 2,
                  textAlign: "left",
                },
          
                "& ul": { 
                  display: "block",
                  textAlign: "left",
                  pl: 4,
                  mb: 3
                },
                "& li": {
                  mb: 1
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