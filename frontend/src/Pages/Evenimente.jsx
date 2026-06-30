// frontend/src/Pages/Evenimente.jsx
import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, Box } from "@mui/material";

export default function Evenimente() {
  const [page, setPage] = useState({ title: "", content: "", posts: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/page/evenimente")
      .then((res) => {
        if (!res.ok) throw new Error("Eroare la încărcarea paginii");
        return res.json();
      })
      .then((data) => setPage(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <Box sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h5">Se încarcă evenimentele...</Typography>
      </Box>
    );

  if (error)
    return (
      <Box sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h5" color="error">
          Eroare: {error}
        </Typography>
      </Box>
    );

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #e6f2ff 0%, #ffffff 100%)",
        minHeight: "100vh",
        py: { xs: 4, md: 8 }, // Padding redus pe mobil
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
              fontSize: { xs: "2rem", md: "3rem" }, // Titlu scalabil
            }}
          >
            {page.title || "Evenimente"}
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

        {/* Conținut pagina (Editor HTML) */}
        {page.content && (
          <Card
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: 4,
              boxShadow: "0px 10px 30px rgba(0,0,0,0.08)",
              p: { xs: 1, md: 4 }, // Padding minim pe mobil pentru a nu irosi spațiu
              mb: 6,
              overflow: "hidden", // Previne ieșirea conținutului din card
            }}
          >
            <CardContent>
              <Box
                sx={{
                  fontSize: { xs: "0.95rem", md: "1.1rem" }, // Text ușor mai mic pe mobil
                  lineHeight: 1.7,
                  color: "#003366",
                  "& p": { mb: 2 },
                  "& img": { maxWidth: "100%", height: "auto" }, // Imagini din editor să nu depășească ecranul
                  "& table": { display: "block", overflowX: "auto" }, // Tabelele devin scrollabile pe mobil
                  "& h1, & h2, & h3": {
                    color: "#003366",
                    fontWeight: 600,
                    mt: 3,
                    mb: 2,
                    fontSize: { xs: "1.3rem", md: "1.8rem" },
                  },
                  "& ul": { pl: { xs: 2, md: 3 } },
                  "& a": {
                    color: "#FF0000",
                    textDecoration: "underline",
                    fontWeight: 500,
                  },
                }}
                dangerouslySetInnerHTML={{ __html: page.content }}
              />
            </CardContent>
          </Card>
        )}

        {/* LISTA EVENIMENTE (Carduri de tip noutăți) */}
        <Box sx={{ maxWidth: "900px", mx: "auto" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {page.posts.length === 0 ? (
              <Typography variant="body1">Nu există evenimente.</Typography>
            ) : (
              page.posts.map((post, index) => (
                <Box
                  key={post.link || index}
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" }, // De la vertical la orizontal
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
                        width: { xs: "100%", sm: 250 },
                        height: { xs: 200, sm: 180 },
                        objectFit: "cover",
                      }}
                    />
                  )}

                  <Box
                    sx={{
                      p: { xs: 2, md: 3 },
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      flex: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "16px", md: "18px" },
                        fontWeight: 600,
                        color: "#333",
                        mb: 1,
                      }}
                    >
                      {post.title || "Titlu nedefinit"}
                    </Typography>

                    {post.date && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {post.date}
                      </Typography>
                    )}

                    {post.link && (
                      <Typography
                        component="a"
                        href={post.link}
                        sx={{
                          alignSelf: "flex-start",
                          padding: "10px 15px",
                          background: "#003366",
                          color: "#fff",
                          textDecoration: "none",
                          borderRadius: "5px",
                          fontSize: "14px",
                          "&:hover": { background: "#002244" },
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