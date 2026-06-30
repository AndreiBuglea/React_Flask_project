import React, { useEffect, useState } from "react";
import { 
  Container, Typography, Card, Box, 
  Accordion, AccordionSummary, AccordionDetails 
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function RaportariProiecte() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    fetch("/api/page/Raportari-proiecte")
      .then((res) => res.json())
      .then((json) => {
        const htmlContent = json.posts?.content_html || "";
        const cleanedHtml = htmlContent.replace(/(<p>&nbsp;<\/p>|<p><\/p>|<br\s*\/?>)+$/gi, "");
        const parser = new DOMParser();
        const doc = parser.parseFromString(cleanedHtml, "text/html");

        const elements = Array.from(doc.querySelectorAll('.elementor-widget-heading, .elementor-widget-accordion'));

        let structuredData = [];
        let currentSection = null;

        elements.forEach((el) => {
          if (el.classList.contains('elementor-widget-heading')) {
            const titleText = el.innerText.trim();
            if (titleText && titleText !== "Raportări proiecte") {
              currentSection = {
                sectionTitle: titleText,
                accordions: []
              };
              structuredData.push(currentSection);
            }
          } 
          else if (el.classList.contains('elementor-widget-accordion') && currentSection) {
            const items = el.querySelectorAll(".elementor-accordion-item");
            
            items.forEach((item) => {
              // 1. Extragem HTML-ul brut al conținutului
              let rawContent = item.querySelector(".elementor-tab-content")?.innerHTML || "";

              // 2. REPARARE LINK-URI: Înlocuim domeniul vechi cu calea locală /uploads/
              // Acoperă variantele cu wp-content/uploads sau direct /uploads
              let processedContent = rawContent.replace(
                /https:\/\/daip\.uvt\.ro\/(wp-content\/)?uploads\//gi, 
                '/uploads/'
              );

              // 3. ELIMINĂM target="_blank" pentru a rămâne pe site la deschiderea PDF-urilor
              processedContent = processedContent.replace(
                /target\s*=\s*["']_blank["']/gi, 
                'target="_self"'
              );

              currentSection.accordions.push({
                year: item.querySelector(".elementor-accordion-title")?.textContent.trim() || "An",
                content: processedContent // Salvăm conținutul procesat
              });
            });
          }
        });

        setSections(structuredData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Eroare:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ background: "linear-gradient(135deg, #f0f4f8 0%, #ffffff 100%)", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="lg">
        
        {/* TITLU PRINCIPAL PAGINĂ */}
        <Box textAlign="center" mb={8}>
          <Typography variant="h3" sx={{ fontWeight: 600, color: "#003366", letterSpacing: 1 }}>
            Raportări Proiecte
          </Typography>
          <Box sx={{ width: 100, height: 5, backgroundColor: "#FFD700", mx: "auto", mt: 2, borderRadius: 2 }} />
        </Box>

        {sections.map((section, sIdx) => (
          <Box key={sIdx} sx={{ mb: 8 }}>
            {/* TITLU FOND (FDI / FSS) */}
            <Typography variant="h4" sx={{ color: "#003366", fontWeight: 700, mb: 4, borderLeft: "8px solid #FFD700", pl: 2 }}>
              {section.sectionTitle}
            </Typography>

            {/* LISTA ACORDEOANE PE ANI */}
            {section.accordions.map((acc, aIdx) => (
              <Accordion 
                key={aIdx} 
                sx={{ 
                  mb: 1.5, 
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                  border: "1px solid #e0eeb",
                  "&:before": { display: "none" },
                  borderRadius: "8px !important",
                  overflow: "hidden"
                }}
              >
                <AccordionSummary 
                  expandIcon={<ExpandMoreIcon sx={{ color: "#003366" }} />}
                  sx={{ 
                    backgroundColor: "#ffffff", 
                    "&:hover": { backgroundColor: "#f8faff" },
                    minHeight: 64
                  }}
                >
                  <Typography sx={{ fontWeight: 700, color: "#003366", fontSize: "1.1rem" }}>
                    Anul {acc.year}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 4, borderTop: "1px solid #f0f0f0" }}>
  <Box
    sx={{
      fontSize: "1.05rem",
      lineHeight: 1.8,
      color: "#444",
      "& a": { 
        color: "#d32f2f", 
        textDecoration: "none", 
        fontWeight: 600,
        transition: "0.2s",
        "&:hover": { color: "#003366", textDecoration: "underline" }
      },
      // MODIFICARE AICI: eliminăm marginea de jos pentru ultimul paragraf
      "& p": { mb: 2 },
      "& p:last-child": { mb: 0 }, 
      "& *:last-child": { mb: 0 } // Siguranță suplimentară pentru orice element final
    }}
    dangerouslySetInnerHTML={{ __html: acc.content }}
  />
</AccordionDetails>
              </Accordion>
            ))}
          </Box>
        ))}

        {loading && <Typography align="center">Se încarcă datele...</Typography>}
      </Container>
    </Box>
  );
}