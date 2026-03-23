// frontend/src/Pages/Home.jsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Box,
  Grid,
} from "@mui/material";

export default function Home() {
  const [page, setPage] = useState({ title: "", content: "", posts: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/page/noutati")
      .then((res) => {
        if (!res.ok) throw new Error("Eroare la încărcarea paginii");
        return res.json();
      })
      .then((data) => setPage(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h5">Se încarcă noutățile...</Typography>
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

  // Dimensiuni uniforme imagini
  const IMAGE_HEIGHT = 300;
  const IMAGE_WIDTH = 300;

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
              display: "inline-block",
            }}
          >
            {page.title || "Noutăți"}
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

        {/* Conținut pagina */}
        

        {/* Grid carduri noutăți */}
        <Box sx={{ maxWidth: "900px", mx: "auto" }}>
  <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {page.posts.length === 0 ? (
  <Typography variant="body1">Nu există noutăți.</Typography>
) : (
  page.posts.map((post, index) => (
    <Box
      key={post.link || index}
      sx={{
        display: "flex",
        flexDirection: "row",
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      {post.image && (
        <Box
          component="img"
          src={post.image}
          alt={post.title}
          sx={{
            width: 250,
            height: 180,
            objectFit: "cover",
          }}
        />
      )}

      <Box
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 600,
            color: "#333",
            mb: 2,
          }}
        >
          {post.title || "Titlu nedefinit"}
        </Typography>

        {post.date && (
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
            {post.date}
          </Typography>
        )}

        {post.link && (
          <Typography
            component="a"
            href={post.link}
            //target="_blank"
            sx={{
              alignSelf: "flex-start",
              padding: "10px 15px",
              background: "#003366",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "5px",
              fontSize: "14px",
            }}
          >
            Citește mai mult
          </Typography>
        )}
      </Box>
    </Box>
  ))
)}
        </Box>
</Box>
      </Container>
    </Box>
  );
}