import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, Box, CircularProgress } from "@mui/material";

export default function ArhivaEchipe() {
  const [page, setPage] = useState({ title: "", tabel: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/page/Arhiva-selectie-echipe-proiecte")
      .then((res) => res.json())
      .then((data) => {
        let rawHtml = data.tabel || "";

        // 1. REPARARE LINK-URI: Transformăm link-urile absolute de pe site-ul vechi în căi relative către /uploads/
        let processedHtml = rawHtml.replace(
          /https:\/\/daip\.uvt\.ro\/(wp-content\/)?uploads\//gi, 
          '/uploads/'
        );

        // 2. ELIMINARE TARGET BLANK: Ne asigurăm că documentele se deschid în același tab, folosind ruta locală
        processedHtml = processedHtml.replace(
          /target\s*=\s*["']_blank["']/gi, 
          'target="_self"'
        );

        // 3. FIX LAYOUT: Eliminăm stilurile inline de tip "width: 1200px" care ar putea strica design-ul responsiv
        processedHtml = processedHtml.replace(/width:\s*\d+px/gi, 'width: 100%');

        setPage({
          title: data.title || "Arhivă selecție echipe proiecte",
          tabel: processedHtml
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Eroare la procesarea tabelelor de arhivă:", err);
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
        background: "linear-gradient(135deg, #e6f2ff 0%, #ffffff 100%)",
        minHeight: "100vh",
        py: 8,
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 6 } }}>
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
            {page.title}
          </Typography>
          <Box sx={{ width: 100, height: 4, backgroundColor: "#FFD700", mx: "auto", borderRadius: 2 }} />
        </Box>

        {/* CARD CONTINUT */}
        <Card
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: 4,
            boxShadow: "0px 10px 30px rgba(0,0,0,0.08)",
            position: "relative",
            overflow: "hidden", // Menținem cardul curat
          }}
        >
          <Box
            sx={{
              position: "absolute",
              left: 0, top: 0, bottom: 0, width: "6px",
              background: "linear-gradient(to bottom, #FFD700, #003366)",
            }}
          />

          <CardContent sx={{ p: { xs: 2, md: 4 } }}>
            <Box
              sx={{
                overflowX: "auto", // Scrollbar DOAR pentru tabel dacă depășește ecranul
                color: "#003366",
                "& table": {
                  width: "100%",
                  minWidth: "1000px", // Prevenim strivirea coloanelor
                  borderCollapse: "collapse",
                  my: 2,
                },
                "& th": {
                  backgroundColor: "#f0f8ff",
                  fontWeight: 700,
                  border: "1px solid #003366",
                  p: 1.5,
                  textAlign: "center",
                },
                "& td": {
                  border: "1px solid #003366",
                  p: 1.5,
                  fontSize: "0.95rem",
                  verticalAlign: "top",
                },
                "& a": {
                  color: "#FF0000",
                  fontWeight: 600,
                  textDecoration: "underline",
                  "&:hover": { color: "#b30000" },
                },
                // Curățăm stilurile reziduale de la Elementor
                "& .elementor-section": { width: "100%" },
              }}
              dangerouslySetInnerHTML={{ __html: page.tabel }}
            />
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}