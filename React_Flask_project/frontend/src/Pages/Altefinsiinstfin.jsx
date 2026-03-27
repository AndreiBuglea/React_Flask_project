import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, Box } from "@mui/material";

export default function AlteFinantari() {
  const [page, setPage] = useState({ title: "", content: "" });

  useEffect(() => {
    fetch("/api/page/alte-finantari-si-instrumente-financiare")
      .then((res) => res.json())
      .then((data) => {
              // Eliminăm doar cuvântul "Contact" din titlu dacă apare în content
              const cleanedContent = data.content.replace(/<h[1-3]>.*?Alte finanțări și instrumente financiare.*?<\/h[1-3]>/gi, "");
              const parser = new DOMParser();
        const doc = parser.parseFromString(cleanedContent, 'text/html');
        const links = doc.querySelectorAll('a');
        
        links.forEach(link => {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer'); // Important pentru securitate
        });

        // 3. Salvăm conținutul modificat înapoi ca string
        setPage({ ...data, content: doc.body.innerHTML });
            })
      .catch((err) => console.error(err));
  }, []);

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
            {page.title}
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

          
<CardContent sx={{ pl: { xs: 2, md: 4 }, pr: { xs: 2, md: 4 } }}>
  <Box
    sx={{
      fontSize: "1.1rem",
      lineHeight: 1.7, // Ajustat pentru claritate
      color: "#003366",
      
      // TEXTUL GENERAL (Paragrafele)
      "& p": { 
        mb: 3,             // Spațiu decent între paragrafe
        display: "block",  // Resetăm flex-ul care cauza probleme de aliniere
        textAlign: "left", // Forțăm alinierea la stânga perfectă
        width: "100%",
      },

      // IMAGINILE (Singurele care rămân pe mijloc)
      "& img": {
        maxWidth: "100%",
        height: "auto",
        borderRadius: "12px",
        mt: 3, 
        mb: 2, 
        display: "block",
        mx: "auto", // Centrare orizontală imagine
      },

      // LINK-URILE (Sub imagini, centrate)
      "& a": {
        color: "#FF0000",
        textDecoration: "underline",
        fontWeight: 600,
        display: "block",    // Ocupă rândul lor
        textAlign: "center", // Textul link-ului pe mijloc
        width: "fit-content",
        mx: "auto",          // Centrare container link
        mt: 1,
        mb: 4,               // Spațiu mai mare după grup (imagine+link)
        "&:hover": {
          color: "#cc0000",
        }
      },

      // TITLURILE
      "& h1, & h2, & h3": {
        color: "#003366",
        fontWeight: 600,
        mt: 4,
        mb: 2,
        textAlign: "left", // Titlurile se aliniază cu textul la stânga
      },

      // LISTELE
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
    dangerouslySetInnerHTML={{ __html: page.content }}
  />
</CardContent>
        </Card>

      </Container>
    </Box>
  );
}