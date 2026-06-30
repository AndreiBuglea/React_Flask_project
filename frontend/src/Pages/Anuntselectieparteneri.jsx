import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, Box, CircularProgress } from "@mui/material";

export default function AnunturiSelectieParteneri() {
  const [page, setPage] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);

useEffect(() => {
    fetch("/api/page/Anunturi-Selectie-Parteneri-Proiecte")
      .then((res) => res.json())
      .then((data) => {
        let rawHtml = data.content || "";

        // 1. REPARARE LINK-URI: Schimbăm domeniul vechi cu calea locală /uploads/
        let processedHtml = rawHtml.replace(
          /https:\/\/daip\.uvt\.ro\/(wp-content\/)?uploads\//gi, 
          '/uploads/'
        );

        // 2. ELIMINARE TARGET BLANK: Forțăm deschiderea în aceeași fereastră (cale relativă)
        processedHtml = processedHtml.replace(
          /target\s*=\s*["']_blank["']/gi, 
          'target="_self"'
        );

        // 3. CURĂȚARE TITLURI: Eliminăm titlurile redundante extrase din WordPress
        processedHtml = processedHtml.replace(
          /<h[1-2]>.*?Anunțuri selecție parteneri proiecte.*?<\/h[1-2]>/gi, 
          ""
        );

        setPage({
          title: data.title || "Anunțuri selecție parteneri proiecte",
          content: processedHtml
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Eroare:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #f5f9ff 0%, #ffffff 100%)",
        minHeight: "100vh",
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* TITLU PAGINĂ */}
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: "#003366",
              mb: 2,
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

        {/* CARDUL PRINCIPAL CU CONȚINUTUL DIN JSON */}
        <Card
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: 4,
            boxShadow: "0px 10px 40px rgba(0,0,0,0.06)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Accent vizual lateral */}
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

          <CardContent sx={{ p: { xs: 3, md: 6 } }}>
            <Box
              sx={{
                fontSize: "1.1rem",
                lineHeight: 1.8,
                color: "#334455",
                // Stilizăm elementele care vin din WordPress/Elementor
                "& p": { mb: 2.5 },
                "& a": { 
                  color: "#d32f2f", 
                  fontWeight: 600, 
                  textDecoration: "underline",
                  "&:hover": { color: "#003366" }
                },
                "& ul, & ol": { pl: 4, mb: 3 },
                "& li": { mb: 1 },
                "& h1, & h2, & h3, & h4": { 
                  color: "#003366", 
                  mt: 4, 
                  mb: 2,
                  fontWeight: 600 
                },
                // Asigurăm că imaginile din conținut nu depășesc cardul
                "& img": { maxWidth: "100%", height: "auto", borderRadius: 2 }
              }}
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}