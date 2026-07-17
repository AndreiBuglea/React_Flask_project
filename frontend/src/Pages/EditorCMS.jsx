import { useEffect, useState, useCallback } from "react";
import { Puck } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import puckConfig from "../configPuck";

export default function EditorCMS() {
  const [numePagina, setNumePagina] = useState("Acasa");
  const [slug, setSlug] = useState("acasa");
  const [data, setData] = useState({ content: [], root: {} });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const genereazaSlug = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+|-+$/g, ""); // curăță cratimele de la început/sfârșit
  };

  const loadPage = useCallback(async (pageSlug) => {
    if (!pageSlug) return;
    setIsLoading(true);
    setMessage(`Se încarcă pagina: ${pageSlug}...`);

    try {
      const res = await fetch(`https://daiptest.e-uvt.ro/api/incarca-pagina/${pageSlug}`);
      if (!res.ok) throw new Error("Eroare la server");
      const json = await res.json();
      setData(json || { content: [], root: {} });
      setMessage(`Pagina "${pageSlug}" încărcată cu succes.`);
    } catch (err) {
      console.error(err);
      setData({ content: [], root: {} });
      setMessage("❌ Eroare la încărcare.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Încarcă pagina "acasa" la pornire
  useEffect(() => {
    loadPage("acasa");
  }, [loadPage]);

  const handleNumeChange = (e) => {
    const nouNume = e.target.value;
    setNumePagina(nouNume);
    setSlug(genereazaSlug(nouNume));
  };

  const handleIncarcaPagina = () => {
    if (!slug.trim()) {
      alert("Te rog introdu un nume valid pentru pagină!");
      return;
    }
    loadPage(slug);
  };

  const handlePublish = useCallback(async (newData) => {
    if (!slug.trim()) {
      alert("Slug-ul paginii este invalid!");
      return;
    }

    try {
      const response = await fetch(`https://daiptest.e-uvt.ro/api/salveaza-pagina/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        setData(newData);
        setMessage(`✅ Pagina "${slug}" a fost salvată cu succes!`);
        alert(`✅ Pagina "${slug}" a fost salvată!`);
      } else {
        const errorText = await response.text();
        console.error(errorText);
        setMessage("❌ Eroare la salvare pe server.");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Eroare de rețea la salvare.");
    }
  }, [slug]);

  if (isLoading) {
    return <div style={{ padding: 40, textAlign: "center" }}>Se încarcă pagina...</div>;
  }

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Bara de management pagini */}
      <div style={{ 
        padding: "12px 20px", 
        background: "#1e293b", 
        color: "#fff", 
        display: "flex", 
        alignItems: "center", 
        gap: "15px",
        flexWrap: "wrap"
      }}>
        <label style={{ fontWeight: "bold", minWidth: "110px" }}>Nume Pagină:</label>
        
        <input 
          type="text" 
          value={numePagina} 
          onChange={handleNumeChange}
          placeholder="Ex: Despre Noi"
          style={{ 
            padding: "8px 12px", 
            borderRadius: "6px", 
            border: "1px solid #475569", 
            background: "#334155",
            color: "#fff",
            width: "260px"
          }}
        />

        <span style={{ color: "#94a3b8", fontSize: "14px" }}>
          Fișier: <strong>{slug}.json</strong>
        </span>

        <button 
          onClick={handleIncarcaPagina}
          style={{ 
            padding: "8px 16px", 
            background: "#3b82f6", 
            color: "#fff", 
            border: "none", 
            borderRadius: "6px", 
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          📂 Deschide / Creează
        </button>

        {message && (
          <span style={{ 
            marginLeft: "auto", 
            padding: "6px 12px", 
            background: "#334155", 
            borderRadius: "4px",
            fontSize: "14px"
          }}>
            {message}
          </span>
        )}
      </div>

      {/* Editor Puck */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        <Puck
          config={puckConfig}
          data={data}
          onPublish={handlePublish}
        />
      </div>
    </div>
  );
}