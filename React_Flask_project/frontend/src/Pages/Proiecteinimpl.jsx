import React, { useEffect, useState } from "react";
import { 
  Container, Typography, Box, 
  Accordion, AccordionSummary, AccordionDetails,
  CircularProgress
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function ProiecteImplementare() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    fetch("/api/page/Proiecte-In-Imp")
      .then((res) => res.json())
      .then((json) => {
        setPageTitle(json.title || "Proiecte în implementare");
        
        const htmlContent = json.posts?.content_html || "";
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, "text/html");

        const elements = Array.from(doc.querySelectorAll('.elementor-widget-heading, .elementor-widget-accordion'));

        let structuredData = [];
        let currentSection = null;

        elements.forEach((el) => {
          if (el.classList.contains('elementor-widget-heading')) {
            const titleText = el.innerText.trim();
            if (titleText && !titleText.toLowerCase().includes("proiecte in implementare")) {
              currentSection = {
                sectionTitle: titleText,
                accordions: []
              };
              structuredData.push(currentSection);
            }
          } 
          else if (el.classList.contains('elementor-widget-accordion')) {
            const items = el.querySelectorAll(".elementor-accordion-item");
            if (!currentSection) {
              currentSection = { sectionTitle: "Informații", accordions: [] };
              structuredData.push(currentSection);
            }

            items.forEach((item) => {
  // 1. Luăm HTML-ul brut
  let content = item.querySelector(".elementor-tab-content")?.innerHTML || "";

  // 2. REPARARE LINK-URI: Înlocuim domeniul vechi cu calea relativă locală
  // Această linie caută "https://daip.uvt.ro/wp-content/uploads/" sau "https://daip.uvt.ro/uploads/"
  // și le transformă în "/uploads/"
  content = content.replace(/https:\/\/daip\.uvt\.ro\/(wp-content\/)?uploads\//gi, '/uploads/');

  // 3. ELIMINĂM target="_blank" (pentru a rămâne pe site-ul actual)
  content = content.replace(/target\s*=\s*["']_blank["']/gi, 'target="_self"');

  // 4. OPȚIONAL: Dacă există link-uri care duc la pagini interne de tip "https://daip.uvt.ro/pagina-x"
  // și vrei să le cureți și pe acelea să devină relative:
  // content = content.replace(/https:\/\/daip\.uvt\.ro\//gi, '/');

  currentSection.accordions.push({
    title: item.querySelector(".elementor-accordion-title")?.textContent.trim() || "Detalii",
    content: content 
  });
});
          }
        });

        

        setSections(structuredData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Eroare la încărcare:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ background: "linear-gradient(135deg, #f0f4f8 0%, #ffffff 100%)", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="lg">
        
        {/* TITLU PAGINĂ */}
        <Box textAlign="center" mb={8}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: "#003366", letterSpacing: 1 }}>
            {pageTitle}
          </Typography>
          <Box sx={{ width: 100, height: 5, backgroundColor: "#FFD700", mx: "auto", mt: 2, borderRadius: 2 }} />
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" my={10}>
            <CircularProgress />
          </Box>
        ) : (
          sections.map((section, sIdx) => (
            <Box key={sIdx} sx={{ mb: 8 }}>
              <Typography variant="h4" sx={{ color: "#003366", fontWeight: 700, mb: 4, borderLeft: "8px solid #FFD700", pl: 2 }}>
                {section.sectionTitle}
              </Typography>

              {section.accordions.map((acc, aIdx) => (
                <Accordion 
                  key={aIdx} 
                  sx={{ 
                    mb: 2, 
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    border: "1px solid #e0e0e0",
                    "&:before": { display: "none" },
                    borderRadius: "12px !important",
                    overflow: "hidden"
                  }}
                >
                  <AccordionSummary 
                    expandIcon={<ExpandMoreIcon sx={{ color: "#003366" }} />}
                    sx={{ backgroundColor: "#ffffff", minHeight: 70 }}
                  >
                    <Typography sx={{ fontWeight: 700, color: "#003366", fontSize: "1.15rem" }}>
                      {acc.title}
                    </Typography>
                  </AccordionSummary>
                  
                  <AccordionDetails sx={{ p: { xs: 1, md: 4 }, borderTop: "1px solid #f0f0f0" }}>
                    <Box
                      sx={{
                        width: "100%",
                        overflowX: "auto", // Permite scroll pe mobil pentru tabele late
                        "& table": {
                          width: "100%",
                          borderCollapse: "collapse",
                          my: 2,
                          fontSize: "0.95rem",
                          minWidth: "600px" // Forțează o lățime minimă pentru a păstra aspectul de tabel
                        },
                        "& th": {
                          backgroundColor: "#f4f7fa",
                          color: "#003366",
                          fontWeight: 700,
                          textAlign: "left",
                          padding: "12px 16px",
                          borderBottom: "2px solid #003366"
                        },
                        "& td": {
                          padding: "12px 16px",
                          borderBottom: "1px solid #eee",
                          color: "#444",
                          verticalAlign: "top"
                        },
                        "& tr:hover": {
                          backgroundColor: "#f9f9f9"
                        },
                        "& a": { 
                          color: "#d32f2f", 
                          textDecoration: "none", 
                          fontWeight: 600,
                          "&:hover": { textDecoration: "underline" }
                        }
                      }}
                      dangerouslySetInnerHTML={{ __html: acc.content }}
                    />
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          ))
        )}
      </Container>
    </Box>
  );
}