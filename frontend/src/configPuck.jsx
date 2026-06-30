// src/configPuck.jsx
import React from "react";

export const puckConfig = {
  components: {
    // ====================== HEADING / TITLU ======================
    Heading: {
      fields: {
        children: { type: "text", label: "Titlu" },
        level: { 
          type: "number", 
          label: "Nivel (1-6)", 
          default: 2, 
          min: 1, 
          max: 6 
        },
        className: { type: "text", label: "Clasă CSS" },
        align: { 
          type: "radio", 
          options: ["left", "center", "right"],
          default: "left"
        },
      },
      render: ({ children, level = 2, className = "", align = "left" }) => {
        const Tag = `h${level}`;
        return (
          <Tag 
            className={className}
            style={{ textAlign: align }}
          >
            {children || "Titlu aici..."}
          </Tag>
        );
      },
    },

    // ====================== PARAGRAF ======================
    Paragraph: {
      fields: {
        children: { type: "textarea", label: "Text" },
        className: { type: "text", label: "Clasă CSS" },
      },
      render: ({ children, className = "" }) => (
        <p className={className}>
          {children || "Scrie textul paragrafului aici..."}
        </p>
      ),
    },

    // ====================== IMAGINE ======================
    Image: {
      fields: {
        src: { type: "text", label: "URL Imagine" },
        alt: { type: "text", label: "Text alternativ" },
        width: { type: "number", default: 800 },
        className: { type: "text", label: "Clasă CSS" },
      },
      render: ({ src, alt = "", width, className = "" }) => (
        <img
          src={src}
          alt={alt}
          width={width}
          className={className}
          style={{ 
            maxWidth: "100%", 
            height: "auto", 
            display: "block",
            borderRadius: "8px"
          }}
        />
      ),
    },

    // ====================== BUTON ======================
    Button: {
      fields: {
        label: { type: "text", label: "Text buton" },
        href: { type: "text", label: "Link (URL)" },
        variant: { 
          type: "select", 
          options: ["primary", "secondary", "outline"],
          default: "primary"
        },
        className: { type: "text", label: "Clasă CSS" },
      },
      render: ({ label, href = "#", variant, className = "" }) => (
        <a
          href={href}
          className={`puck-button puck-button-${variant} ${className}`}
          style={{
            display: "inline-block",
            padding: "12px 28px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "16px",
          }}
        >
          {label || "Click aici"}
        </a>
      ),
    },

    // ====================== SECȚIUNE / CONTAINER ======================
    Section: {
      fields: {
        backgroundColor: { type: "text", default: "#ffffff", label: "Culoare fundal" },
        padding: { type: "text", default: "80px 20px", label: "Padding (sus jos stanga dreapta)" },
        className: { type: "text", label: "Clasă CSS" },
      },
      render: ({ backgroundColor, padding, className = "", children }) => (
        <section
          className={className}
          style={{
            backgroundColor,
            padding,
            width: "100%",
          }}
        >
          {children}
        </section>
      ),
    },

    // ====================== SPACER (spațiu gol) ======================
    Spacer: {
      fields: {
        height: { type: "number", default: 40, label: "Înălțime (px)" },
      },
      render: ({ height }) => (
        <div style={{ height: `${height}px` }} />
      ),
    },
  },
};

// Export default pentru import ușor
export default puckConfig;