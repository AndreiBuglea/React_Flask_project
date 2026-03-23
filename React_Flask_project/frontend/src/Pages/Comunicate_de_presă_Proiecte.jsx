// frontend/src/Pages/Comunicate.jsx
import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, Box } from "@mui/material";

export default function Comunicate() {
  const [page, setPage] = useState({ title: "", content: "", posts: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/page/comunicate-de-presa-proiecte")
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
        <Typography variant="h5">Se încarcă comunicatele...</Typography>
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

  // Texte banner
  const banners = [
    "Proiecte finanțate prin POCU – Programul Operațional Capital Uman",
    "Proiecte finanțate prin POIM – Programul Operațional Infrastructură Mare",
    "Proiecte finanțate prin REGIO - Programul Operațional Regional 2014-2020",
  ];

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
            {page.title || "Comunicate de presă"}
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
        {page.content && (
          <Card
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: 4,
              boxShadow: "0px 10px 30px rgba(0,0,0,0.08)",
              p: { xs: 2, md: 4 },
              mb: 6,
            }}
          >
            <CardContent>
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

        {/* LISTA COMUNICATE */}
        <Box sx={{ maxWidth: "900px", mx: "auto" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {page.posts.length === 0 ? (
              <Typography variant="body1">Nu există comunicate.</Typography>
            ) : (
              page.posts.map((post, index) => (
                <React.Fragment key={post.link || index}>
                  {/* Injectare banneruri */}
                  {index === 0 && (
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: "#003366",
                        background: "#f0f4ff",
                        p: 2,
                        borderRadius: 2,
                        textAlign: "center",
                      }}
                    >
                      {banners[0]}
                    </Typography>
                  )}
                  {index === 2 && (
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: "#003366",
                        background: "#f0f4ff",
                        p: 2,
                        borderRadius: 2,
                        textAlign: "center",
                      }}
                    >
                      {banners[1]}
                    </Typography>
                  )}
                  {index === 4 && (
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: "#003366",
                        background: "#f0f4ff",
                        p: 2,
                        borderRadius: 2,
                        textAlign: "center",
                      }}
                    >
                      {banners[2]}
                    </Typography>
                  )}

                  {/* CARD */}
                  <Box
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
                </React.Fragment>
              ))
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}