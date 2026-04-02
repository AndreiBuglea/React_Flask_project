import React, { useEffect, useState } from 'react';
import { Typography, Box, useMediaQuery, useTheme, CircularProgress } from "@mui/material";

const PrezentareProiecte = () => {
  const [data, setData] = useState({ projects: [], accordions: [] });
  const [loading, setLoading] = useState(true);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Funcție utilitară pentru a transforma URL-urile vechi în căi relative locale
  const fixUrl = (url) => {
    if (!url) return url;
    // Transformă https://daip.uvt.ro/wp-content/uploads/... în /uploads/...
    return url.replace(/https:\/\/daip\.uvt\.ro\/(wp-content\/)?uploads\//gi, '/uploads/');
  };

  useEffect(() => {
    fetch("/api/page/Prezentare-Proiecte")
      .then((res) => res.json())
      .then((json) => {
        // Procesăm proiectele: fixăm link-urile și filtrăm
        const cleanProjects = json.projects
          .filter(p => p.image !== null || p.link !== null)
          .map(p => ({
            ...p,
            image: fixUrl(p.image),
            link: fixUrl(p.link)
          }));

        // Procesăm și acordeoanele (link-urile de sub proiecte)
        const cleanAccordions = (json.accordions || []).map(acc => ({
          ...acc,
          link: fixUrl(acc.link)
        }));

        setData({ projects: cleanProjects, accordions: cleanAccordions });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Eroare la încărcarea datelor:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const dynamicStyles = {
    card: {
      ...styles.card,
      flexDirection: isMobile ? 'column' : 'row',
    },
    image: {
      ...styles.image,
      width: isMobile ? '100%' : '250px',
      height: isMobile ? '200px' : '180px',
    },
    accLink: {
      ...styles.accLink,
      width: isMobile ? '100%' : '90%',
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f3f4f6", minHeight: "100vh", py: { xs: 4, md: 6 } }}>
      <Box sx={styles.container}>
        
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: "#003366",
              mb: 2,
              display: "inline-block",
              fontSize: { xs: "1.8rem", md: "3rem" }
            }}
          >
            Prezentare Proiecte
          </Typography>
          <Box sx={{ width: 80, height: 4, backgroundColor: "#FFD700", mx: "auto", borderRadius: 2 }} />
        </Box>

        <div style={styles.grid}>
          {data.projects.map((project, index) => (
            <React.Fragment key={index}>
              {/* CARD PROIECT */}
              <div style={dynamicStyles.card}>
                {project.image && (
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    style={dynamicStyles.image}
                    onError={(e) => { e.target.src = "/uploads/placeholder.png"; }} // Imagine de rezervă
                  />
                )}
                <div style={styles.cardContent}>
                  <h3 style={styles.projectTitle}>{project.title}</h3>
                  {project.link && (
                    <a href={project.link} target="_self" style={styles.projectBtn}>
                      Detalii Proiect (PDF)
                    </a>
                  )}
                </div>
              </div>

              {/* ACORDIOANE (Sectiuni suplimentare dupa al doilea proiect) */}
              {index === 1 && data.accordions.slice(0, 2).map((acc, i) => (
                <a key={`acc-top-${i}`} href={acc.link} target="_self" style={dynamicStyles.accLink}>
                  <div style={styles.accordionItem}>
                    <span style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: 600 }}>{acc.title}</span>
                    <span style={styles.accIcon}>➔</span>
                  </div>
                </a>
              ))}

              {/* ACORDIOANE (Sectiuni finale dupa ultimul proiect) */}
              {index === data.projects.length - 1 && data.accordions.slice(2, 4).map((acc, i) => (
                <a key={`acc-bottom-${i}`} href={acc.link} target="_self" style={dynamicStyles.accLink}>
                  <div style={styles.accordionItem}>
                    <span style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: 600 }}>{acc.title}</span>
                    <span style={styles.accIcon}>➔</span>
                  </div>
                </a>
              ))}
            </React.Fragment>
          ))}
        </div>
      </Box>
    </Box>
  );
};

// ... stilurile raman neschimbate (styles obiectul tau de la finalul codului)

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '0 20px',
    fontFamily: 'Arial, sans-serif'
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  card: {
    display: 'flex',
    background: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  image: {
    objectFit: 'cover'
  },
  cardContent: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  projectTitle: {
    margin: '0 0 15px 0',
    fontSize: '18px',
    color: '#333',
    lineHeight: 1.4
  },
  projectBtn: {
    alignSelf: 'flex-start',
    padding: '10px 15px',
    background: '#003366',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '14px'
  },
  accLink: {
    textDecoration: 'none',
    color: '#333',
    alignSelf: 'flex-end'
  },
  accordionItem: {
    background: '#f9f9f9',
    padding: '15px 20px',
    borderLeft: '5px solid #ffcc00',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },
  accIcon: {
    fontSize: '18px',
    color: '#003366',
    marginLeft: '10px'
  }
};

export default PrezentareProiecte;