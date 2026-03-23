import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, Box } from "@mui/material";

export default function InformareSiPromovare() {
  const [page, setPage] = useState({ title: "", content: "" });

  useEffect(() => {
    fetch("/api/page/informare-si-promovare")
      .then((res) => res.json())
      .then((data) => {
              // Eliminăm doar cuvântul "Contact" din titlu dacă apare în content
              const cleanedContent = data.content.replace(/<h[1-3]>.*?Informare și promovare.*?<\/h[1-3]>/gi, "");
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
                "& ul": { pl: 3 },
                "& a": {
                  color: "#FF0000",       // link-uri roșii
                  textDecoration: "underline",
                  fontWeight: 500,
                },
              }}
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </CardContent>
        </Card>

      </Container>
    </Box>
  );
}