// frontend/src/Pages/Contact.jsx
import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, Box } from "@mui/material";

export default function Contact() {
  const [page, setPage] = useState({ title: "", content: "" });

  useEffect(() => {
    fetch("/api/page/contacts")
      .then((res) => res.json())
      .then((data) => {
        // Eliminăm doar cuvântul "Contact" din titlu dacă apare în content
        const cleanedContent = data.content.replace(/<h[1-3]>.*?Contact.*?<\/h[1-3]>/gi, "");
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

        {/* TITLU MARE */}
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

        {/* CARD CONTINUT */}
        <Card
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: 4,
            boxShadow: "0px 10px 30px rgba(0,0,0,0.08)",
            p: { xs: 3, md: 5 },
            position: "relative",
            mb: 6,
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

          <CardContent sx={{ pl: 5 }}>
            <Box
              sx={{
                fontSize: "1.2rem",
                lineHeight: 2.8, // Spațiere mare între rânduri
                color: "#003366",
                "& p": { mb: 4 },
                "& a": { color: "#FF0000", textDecoration: "underline", fontWeight: 500 },
                
                // --- SOLUȚIA PENTRU HARTA MICĂ ---
                // Această linie va ascunde orice iframe care încearcă să apară în interiorul textului
                "& iframe": { display: "none !important" },
                // --------------------------------
              }}
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </CardContent>
        </Card>

        {/* HARTA MARE (AICI NU ESTE ASCUNSĂ) */}
        <Box 
          sx={{ 
            width: "100%", 
            height: { xs: 500, md: 800 }, // Harta mult mai mare
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0px 15px 35px rgba(0,0,0,0.12)",
          }}
        >
          <iframe
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2784.2008363156433!2d21.2316152!3d45.7471195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47455d84610655bf%3A0xfd169ff24d29f192!2sUniversitatea%20de%20Vest%20din%20Timi%C8%99oara!5e0!3m2!1sro!2sro!4v1773742091939!5m2!1sro!2sro"  width="100%"
  height="100%"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  title="Locație UVT"
/>
        </Box>

      </Container>
    </Box>
  );
}