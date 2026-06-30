// frontend/src/Pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Link, Divider } from "@mui/material";

export default function Home() {
  const [page, setPage] = useState({
    title: "",
    content: [],
    links: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/page/Stimulating_innovative")
      .then((res) => {
        if (!res.ok) throw new Error("Eroare la încărcarea paginii");
        return res.json();
      })
      .then((data) => {
        // data.posts este obiectul din JSON
        setPage({
          title: data.title || "",
          content: data.posts?.content || [],
          links: data.posts?.links || []
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h5">Se încarcă...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h5" color="error">
          Eroare: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#e6f2ff", minHeight: "100vh", py: 5 }}>
      <Container maxWidth="md">
        
        {/* Titlu pagină */}
        <Typography
          variant="h4"
          align="center"
          sx={{
            color: "#003366",
            mb: 4,
            fontWeight: "bold"
          }}
        >
          {page.title}
        </Typography>

        {/* Conținut text */}
        {page.content.length > 0 && (
          <Box sx={{ mb: 4 }}>
            {page.content.map((paragraph, index) => (
              paragraph.trim() !== "" && (
                <Typography
                  key={index}
                  variant="body1"
                  sx={{
                    mb: 2,
                    lineHeight: "1.8rem",
                    fontSize: "1rem",
                    color: "#333"
                  }}
                >
                  {paragraph}
                </Typography>
              )
            ))}
          </Box>
        )}

        <Divider sx={{ my: 4 }} />

        {/* Documente */}
        {page.links.length > 0 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Documente disponibile:
            </Typography>

            {page.links.map((link, index) => (
              <Typography key={index} sx={{ mb: 1 }}>
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                >
                  {link.text}
                </Link>
              </Typography>
            ))}
          </Box>
        )}

      </Container>
    </Box>
  );
}
