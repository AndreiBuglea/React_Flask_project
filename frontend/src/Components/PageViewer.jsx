import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Render } from "@puckeditor/core";
import puckConfig from "../configPuck";
import { Container, Typography, Card, CardContent, Box } from "@mui/material";

export default function PageViewer() {
  const { slug } = useParams();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentSlug = slug || "acasa";
    setLoading(true);

    fetch(`https://daiptest.e-uvt.ro/api/incarca-pagina/${currentSlug}`)
      .then((r) => {
        if (!r.ok) throw new Error("Pagina nu există pe server");
        return r.json();
      })
      .then((data) => {
        setPageData(data);
      })
      .catch((err) => {
        console.error(err);
        setPageData(null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <Typography variant="h6" color="#003366">Se încarcă pagina...</Typography>
      </Box>
    );
  }

  if (!pageData || (!pageData.content && !pageData.root)) {
    return (
      <Box sx={{ p: 5, textAlign: "center", minHeight: "100vh", background: "linear-gradient(135deg, #e6f2ff 0%, #ffffff 100%)" }}>
        <Typography variant="h4" color="#003366" fontWeight={700}>404 - Pagina nu a fost găsită</Typography>
        <Typography variant="body1" mt={2}>Fișierul pentru pagina <b>{slug}</b> nu a fost găsit pe server.</Typography>
      </Box>
    );
  }

  // Extragem primul Heading indiferent dacă e salvat ca WYSIWYG (html) sau simplu (children)
  const primulHeading = pageData.content?.find(item => item.type === "Heading");
  
  // Curățăm tag-urile HTML dacă titlul a fost salvat ca WYSIWYG, pentru a nu le strica în bara de sus
  const textTitluRaw = primulHeading?.props?.html || primulHeading?.props?.children;
  const titluDinamice = textTitluRaw 
    ? textTitluRaw.replace(/<[^>]*>/g, '') 
    : slug.replace(/-/g, ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #e6f2ff 0%, #ffffff 100%)",
        minHeight: "100vh",
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* TITLU AUTOMAT AL TEMPLATE-ULUI */}
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
            {titluDinamice}
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

        {/* CARDUL STRUCTURĂ ȘI INTEGRAL TEMPLATE */}
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
          {/* Linia decorativă verticală din stânga */}
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

          <CardContent 
            sx={{ 
              pl: { xs: 2, md: 4 }, 
              pr: { xs: 2, md: 4 },
              color: "#003366",
              fontSize: "1.1rem",
              lineHeight: 1.7,
              "& p": { mb: 3, textAlign: "left", width: "100%" },
              // IMPORTANT: Asigură-te că lățimea imaginii nu e suprascrisă la 0 de reguli CSS externe
              "& img": { 
                maxWidth: "100% !important", 
                height: "auto !important", 
                borderRadius: "12px", 
                mt: 3, 
                mb: 2, 
                display: "block", 
                mx: "auto" 
              },
              "& a": { color: "#FF0000", textDecoration: "underline", fontWeight: 600, "&:hover": { color: "#cc0000" } },
              "& h1, & h2, & h3, & h4, & h5, & h6": { color: "#003366", fontWeight: 600, mt: 4, mb: 2, textAlign: "left" },
              "& ul": { display: "block", textAlign: "left", pl: 4, mb: 3 },
              "& li": { mb: 1 }
            }}
          >
            {/* Trimitem direct starea originală, curată, neatinsă. Puck se ocupă singur de randare fără erori */}
            <Render config={puckConfig} data={pageData} />
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}