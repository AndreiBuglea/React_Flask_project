// frontend/src/components/Hero.jsx
import React from "react";
import PozaM from "../Images/PozaM.png";
import { Button } from '@mui/material';
import { Link } from "react-router-dom";



export default function Hero() {
  return (
    <section>
      {/* Imagine Hero */}
      <div style={styles.hero}>
        <img src={PozaM} alt="Hero" style={styles.heroImage} />
      </div>

      {/* Text sub imagine */}
      <div style={styles.textSection}>
        <h2>Departamentul de Accesare și Implementare Proiecte</h2>
        <p>
          Misiunea DAIP este de a sprijini dezvoltarea instituțională a Universității de Vest din Timișoara prin intermediul identificării, accesării și implementării instrumentelor de finanțare nerambursabilă care să permită finanțarea obiectivelor strategice ale universității asumate în planul managerial și în strategia de dezvoltare instituțională.
        </p>
      </div>
      
      <Link to="/contacts">
      <Button variant="contained" >Contact</Button>
      </Link>


      {/* Carduri */}
      <div style={styles.cardContainer}>
        <Card title="Noutati"  />
        <Card title="Evenimente"  />
        <Card title="Comunicate de presa proiecte"  />
        <Card title="Anunturi selectie echipa proiecte"  />

      </div>
    </section>
  );
}

// Card simplu în React
function Card({ title, description }) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
    </div>
  );
}

// Stiluri
const styles = {
  hero: {
    width: "100%",
    height: "100px",
   // overflow: "hidden",
  },
  heroImage: {
    width: "100%",
    height: "100%",
   // objectFit: "cover",
  },
  textSection: {
    padding: "40px 20px",
    textAlign: "center",
    maxWidth: "1000px",
    margin: "0 auto",
    lineHeight: "1.6",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: "20px",
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto 40px auto",
  },
  card: {
    flex: "1 1 220px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#f5f8ff",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
};
