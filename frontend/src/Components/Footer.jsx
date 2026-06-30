// frontend/src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        © {new Date().getFullYear()} DAIP. Powered by UVT Open Intelligent Grid. All Rights Reserved
      </p>
      
    </footer>
  );
}

const styles = {
  footer: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#ffffff", // alb ca header-ul
    color: "#003366", // albastru header
    borderTop: "1px solid #e5e7eb", // separator discret
    marginTop: "40px",
  },
  text: {
    margin: "0 0 10px 0",
    fontSize: "0.9rem",
  },
  links: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    fontSize: "0.9rem",
  },
  link: {
    color: "#003366",
    textDecoration: "none",
    transition: "color 0.3s",
  },
};
