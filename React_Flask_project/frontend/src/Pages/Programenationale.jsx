import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, Box } from "@mui/material";

export default function ProgrameNationale() {
  const [page, setPage] = useState({ title: "", content: "" });

  useEffect(() => {
    fetch("/api/page/programe-nationale")
      .then((res) => res.json())
      .then((data) => {
              // Eliminăm doar cuvântul "Contact" din titlu dacă apare în content
              const cleanedContent = data.content.replace(/<h[1-3]>.*?Programe Naționale.*?<\/h[1-3]>/gi, "");
              setPage({ ...data, content: cleanedContent });
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

        {/* TITLU PRINCIPAL */}
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

          <CardContent sx={{ pl: 4 }}>
            <Box
  sx={{
    /* Setăm baza pentru tot containerul */
    fontSize: "0.85rem", 
    lineHeight: 1.5,
    color: "#003366",

    /* Forțăm toate elementele de text să moștenească dimensiunea mică */
    "& p, & span, & li, & div": { 
      fontSize: "1.1rem !important", 
      mb: 1,
      lineHeight: 1.5 
    },

    /* Ascundem titlul duplicat */
    "& h1": { display: "none" }, 

    /* Ajustăm subtitlurile să fie proporționale cu noul font mic */
    "& h2, & h3": {
      color: "#003366",
      fontWeight: 700,
      mt: 2,
      mb: 1,
      fontSize: "1.1rem !important", // Un pic mai mare decât restul textului
    },

    "& ul": { pl: 2, mb: 1.5 },
    "& a": {
      fontSize: "inherit", // Se asigură că link-urile nu rămân mari
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