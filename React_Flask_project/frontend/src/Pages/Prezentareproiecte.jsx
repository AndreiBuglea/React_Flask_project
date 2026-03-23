import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Box, Grid, Button } from "@mui/material";


const PrezentareProiecte = () => {
  const [data, setData] = useState({ projects: [], accordions: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Apelăm endpoint-ul tău de Flask
    fetch("/api/page/Prezentare-Proiecte")
      .then((res) => res.json())
      .then((json) => {
        // Filtrăm proiectele care nu au imagine sau link pentru a evita duplicatele goale
        const cleanProjects = json.projects.filter(p => p.image !== null || p.link !== null);
        setData({ ...json, projects: cleanProjects });
        setLoading(false);
      })
      .catch((err) => console.error("Eroare la încărcarea datelor:", err));
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '20px' }}>Se încarcă proiectele...</div>;

  return (
    <Box sx={{ backgroundColor: "#f3f4f6", minHeight: "100vh", py: 6 }}>
  <div style={styles.container}>
      
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
          Prezentare Proiecte
        </Typography>

        {/* Linie decorativă */}
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
            <div style={styles.card}>
              {project.image && <img src={project.image} alt={project.title} style={styles.image} />}
              <div style={styles.cardContent}>
                <h3 style={styles.projectTitle}>{project.title}</h3>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noreferrer" style={styles.projectBtn}>
                    Detalii Proiect (PDF)
                  </a>
                )}
              </div>
            </div>

            {/* INJECTARE ACORDIOANE 1 & 2 (Sub al doilea card - index 1) */}
            {index === 1 && data.accordions.slice(0, 2).map((acc, i) => (
              <a key={`acc-top-${i}`} href={acc.link} target="_blank" rel="noreferrer" style={styles.accLink}>
                <div style={styles.accordionItem}>
                  <span>{acc.title}</span>
                  <span style={styles.accIcon}>➔</span>
                </div>
              </a>
            ))}

            {/* INJECTARE ACORDIOANE 3 & 4 (Sub ultimul card - index 2 în lista filtrată) */}
            {index === data.projects.length - 1 && data.accordions.slice(2, 4).map((acc, i) => (
              <a key={`acc-bottom-${i}`} href={acc.link} target="_blank" rel="noreferrer" style={styles.accLink}>
                <div style={styles.accordionItem}>
                  <span>{acc.title}</span>
                  <span style={styles.accIcon}>➔</span>
                </div>
              </a>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
    </Box>
  );
};

// --- STILURI INLINE (Le poți muta în CSS separat) ---
const styles = {
  container: {
    maxWidth: '900px',
    margin: '40px auto',
    padding: '0 20px',
    fontFamily: 'Arial, sans-serif'
  },
  mainTitle: {
    textAlign: 'center',
    color: '#003366',
    marginBottom: '30px'
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    background: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  image: {
    width: '250px',
    height: '180px',
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
    color: '#333'
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
    width: '90%',
    alignSelf: 'flex-end' // Împinge acordioanele puțin în dreapta pentru ierarhie vizuală
  },
  accordionItem: {
    background: '#f9f9f9',
    padding: '15px 20px',
    borderLeft: '5px solid #ffcc00', // Culoare de accent (Galben UVT)
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    transition: '0.3s',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },
  accIcon: {
    fontSize: '18px',
    color: '#003366'
  }
};

export default PrezentareProiecte;