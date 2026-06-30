import { useEffect, useState, useCallback } from "react";
import { Puck } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import puckConfig from "../configPuck";

export default function EditorCMS() {
  const [numePagina, setNumePagina] = useState("Acasa");
  const [slug, setSlug] = useState("acasa");
  const [data, setData] = useState({ content: [], root: {} });
  const [isLoading, setIsLoading] = useState(false);

  // Funcție care transformă textul normal în slug (ex: "Despre Noi" -> "despre-noi")
  const genereazaSlug = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")           // Înlocuiește spațiile cu -
      .replace(/[^\w\-]+/g, "")       // Șterge caracterele speciale
      .replace(/\-\-+/g, "-");        // Evită dublele cratime
  };

  const loadPage = useCallback(async (pageSlug) => {
    setIsLoading(true);
    try {
      const res = await fetch(`https://daiptest.e-uvt.ro/api/incarca-pagina/${pageSlug}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
      setData({ content: [], root: {} });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Încarcă pagina inițială (acasa) la start
  useEffect(() => {
    loadPage("acasa");
  }, [loadPage]);

  // Schimbare nume pagină din input
  const handleNumeChange = (e) => {
    const nouNume = e.target.value;
    setNumePagina(nouNume);
    setSlug(genereazaSlug(nouNume));
  };

  // Buton dedicat pentru a schimba/încărca altă pagină în editor
  const handleIncarcaPagina = () => {
    if (!slug) return alert("Scrie un nume valid pentru pagină!");
    loadPage(slug);
  };

  const handlePublish = useCallback(async (newData) => {
    if (!slug) return alert("Numele paginii este invalid!");
    
    try {
      const response = await fetch(`https://daiptest.e-uvt.ro/api/salveaza-pagina/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        setData(newData);
        alert(`✅ Pagina a fost salvată ca: "${slug}.json" în folderul pages!`);
      } else {
        alert("❌ Eroare la salvare pe server.");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Eroare de rețea.");
    }
  }, [slug]);

  if (isLoading) return <div style={{ padding: 40 }}>Se încarcă pagina...</div>;

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* BARA DE SUS PENTRU MANAGEMENT PAGINĂ */}
      <div style={{ padding: "10px 20px", background: "#1e293b", color: "#fff", display: "flex", gap: "15px", alignItems: "center" }}>
        <label style={{ fontWeight: "bold" }}>Nume Pagină:</label>
        <input 
          type="text" 
          value={numePagina} 
          onChange={handleNumeChange}
          style={{ padding: "6px 10px", borderRadius: "4px", border: "1px solid #ccc", color: "#000", width: "200px" }}
        />
        <span style={{ color: "#94a3b8", fontSize: "14px" }}>Fisier: <b>{slug}.json</b></span>
        
        <button 
          onClick={handleIncarcaPagina}
          style={{ padding: "6px 12px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "600" }}
        >
          Deschide / Creează Pagina
        </button>
      </div>

      {/* EDITORUL PUCK */}
      <div style={{ flex: 1, position: "relative" }}>
        <Puck
          config={puckConfig}                         
          data={data}
          onPublish={handlePublish}
        />
      </div>
    </div>
  );
}