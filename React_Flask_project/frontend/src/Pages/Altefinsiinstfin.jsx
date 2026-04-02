// frontend/src/AlteFinantari.jsx
import React from "react";
import { Container, Typography, Card, CardContent, Box } from "@mui/material";

export default function AlteFinantari() {
  const staticTitle = "Alte finanțări și instrumente financiare";

  const staticContent = `
    <img width="332" height="369" src="/uploads/2021/12/Alte_Finantari_Si_Instrumente_Financiare.png" alt="Alte Finantari" loading="lazy" />
    
    <p>În cadrul acestei secțiuni se regăsesc alte tipuri de finanțări, respectiv: subvenții naționale, instrumente financiare, granturi SEE și norvegiene, programe de cooperare transfrontalieră etc.</p>
    
    <p>Noutatea în acest domeniu este Planul Național de Redresare și Reziliență (PNRR), un instrument ce vine să sprijine statul român în depășirea situațiilor generate și amplificate de pandemia COVID. După aprobarea oficială de către Comisia Europeană a Planului Național de Redresare și Reziliență, documentul va fi prezentat în această secțiune a site-ului.</p>
    
    <p>Vor fi promovate coordonarea, complementaritatea și coerența dintre fonduri și alte instrumente și fonduri ale Uniunii, cu optimizarea mecanismelor de coordonare între entitățile competente, pentru a se evita duplicarea pe parcursul planificării și al implementării.</p>
    
    <h5 style="color: #003366; margin-top: 40px; margin-bottom: 20px;">
        <strong>La nivelul UVT sunt accesate și implementate proiecte finanțate prin intermediul următoarelor programe:</strong>
    </h5>
    
    <img width="344" height="183" src="/uploads/2021/12/Centrul_de_Proiecte.png" alt="Centrul de Proiecte" loading="lazy" />
    <p style="text-align: center;"><strong><a href="https://beta.primariatm.ro/centrul-de-proiecte/" target="_blank" rel="noopener noreferrer">Primăria Timișoara</a></strong></p>
    
    <img width="316" height="173" src="/uploads/2021/12/Consiliul_Jud_Timis.png" alt="CJT" loading="lazy" />
    <p style="text-align: center;"><strong><a href="https://www.cjtimis.ro/activitate/finantari-nerambursabile/" target="_blank" rel="noopener noreferrer">Consiliul Județean Timiș - CJT</a></strong></p>
    
    <img width="393" height="137" src="/uploads/2021/12/Granturi_SEE_si_Norvegiene.png" alt="Granturi SEE" loading="lazy" />
    <p style="text-align: center;"><a href="https://www.eeagrants.ro/" target="_blank" rel="noopener noreferrer"><strong>Granturi SEE și Norvegiene</strong></a></p>
    
    <img width="354" height="119" src="/uploads/2021/12/Fonduri_Dezv_Institutionala.png" alt="FDI" loading="lazy" />
    <p style="text-align: center;"><strong><a href="https://uefiscdi.gov.ro/fondul-de-dezvoltare-institutionala-fdi" target="_blank" rel="noopener noreferrer">Fonduri de Dezvoltare Instituțională - FDI</a></strong></p>
    
    <img width="438" height="111" src="/uploads/2021/12/Ministerul_Educatiei.png" alt="Ministerul Educatiei" loading="lazy" />
    <p style="text-align: center;"><strong><a href="https://www.edu.ro/finantare-universitar" target="_blank" rel="noopener noreferrer">Fonduri pentru finanțarea situațiilor speciale - FSS</a></strong></p>
    
    <img width="650" height="138" src="/uploads/2021/12/Rose.png" alt="ROSE" loading="lazy" />
    <p style="text-align: center;"><a href="http://proiecte.pmu.ro/web/guest/rose" target="_blank" rel="noopener noreferrer"><strong>ROSE - Romanian SECONDARY EDUCATION</strong></a></p>
    
    <img width="564" height="125" src="/uploads/2021/12/Interreg.png" alt="Interreg" loading="lazy" />
    <p style="text-align: center;"><strong><a href="https://www.romania-serbia.net/" target="_blank" rel="noopener noreferrer">Interreg - IPA CBC România Serbia</a></strong></p>
    
    <img width="443" height="103" src="/uploads/2021/12/Interreg_Romania_Ungaria.png" alt="Interreg RO-HU" loading="lazy" />
    <p style="text-align: center;"><strong><a href="https://interreg-rohu.eu/en/home-en/" target="_blank" rel="noopener noreferrer">Interreg - România - Hungary</a></strong></p>
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
                  transition: "color 0.2s",
                  "&:hover": {
                    color: "#cc0000",
                  }
                },
          
                "& h5": {
                  color: "#003366",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  textAlign: "left",
                  mt: 4,
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