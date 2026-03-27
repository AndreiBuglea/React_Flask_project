import React, { useEffect, useState } from 'react';
import { Typography, Box, useMediaQuery, useTheme } from "@mui/material";

const PrezentareProiecte = () => {
  const [data, setData] = useState({ projects: [], accordions: [] });
  const [loading, setLoading] = useState(true);
  
  // Hook-uri MUI pentru a detecta dacă suntem pe mobil
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetch("/api/page/Prezentare-Proiecte")
      .then((res) => res.json())
      .then((json) => {
        const cleanProjects = json.projects.filter(p => p.image !== null || p.link !== null);
        setData({ ...json, projects: cleanProjects });
        setLoading(false);
      })
      .catch((err) => console.error("Eroare la încărcarea datelor:", err));
  }, []);

  if (loading) return <Box sx={{ textAlign: 'center', py: 10 }}>Se încarcă proiectele...</Box>;

  // Stiluri dinamice care se schimbă în funcție de isMobile
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
              fontSize: { xs: "1.8rem", md: "3rem" } // Scalare titlu
            }}
          >
            Prezentare Proiecte
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

        <div style={styles.grid}>
          {data.projects.map((project, index) => (
            <React.Fragment key={index}>
              {/* CARD PROIECT */}
              <div style={dynamicStyles.card}>
                {project.image && <img src={project.image} alt={project.title} style={dynamicStyles.image} />}
                <div style={styles.cardContent}>
                  <h3 style={styles.projectTitle}>{project.title}</h3>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer" style={styles.projectBtn}>
                      Detalii Proiect (PDF)
                    </a>
                  )}
                </div>
              </div>

              {/* ACORDIOANE 1 & 2 */}
              {index === 1 && data.accordions.slice(0, 2).map((acc, i) => (
                <a key={`acc-top-${i}`} href={acc.link} target="_blank" rel="noreferrer" style={dynamicStyles.accLink}>
                  <div style={styles.accordionItem}>
                    <span style={{ fontSize: isMobile ? '14px' : '16px' }}>{acc.title}</span>
                    <span style={styles.accIcon}>➔</span>
                  </div>
                </a>
              ))}

              {/* ACORDIOANE 3 & 4 */}
              {index === data.projects.length - 1 && data.accordions.slice(2, 4).map((acc, i) => (
                <a key={`acc-bottom-${i}`} href={acc.link} target="_blank" rel="noreferrer" style={dynamicStyles.accLink}>
                  <div style={styles.accordionItem}>
                    <span style={{ fontSize: isMobile ? '14px' : '16px' }}>{acc.title}</span>
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