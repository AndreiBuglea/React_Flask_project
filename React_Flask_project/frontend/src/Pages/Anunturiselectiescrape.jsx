import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, Box, MenuItem, Select, FormControl, InputLabel, CircularProgress } from "@mui/material";

export default function Home({ keycloak }) {
  const [anunturi, setAnunturi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isAuthenticated = keycloak?.authenticated;
  const isAdmin = isAuthenticated; 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [sortCriterion, setSortCriterion] = useState("id_desc");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [existingPdfs, setExistingPdfs] = useState([]);

  const [formData, setFormData] = useState({
    id_proiect: "",
    program: "",
    titlu: "",
    posturi: "",
    perioada: "",
    anunt: "",
  });

  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const getSortedAnunturi = (data) => {
    const sorted = [...data];
    if (sortCriterion === "id_desc") sorted.sort((a, b) => b.id - a.id);
    if (sortCriterion === "id_asc") sorted.sort((a, b) => a.id - b.id);
    if (sortCriterion === "titlu_asc") sorted.sort((a, b) => (a.titlu || "").localeCompare(b.titlu || ""));
    if (sortCriterion === "titlu_desc") sorted.sort((a, b) => (b.titlu || "").localeCompare(a.titlu || ""));
    if (sortCriterion === "program") sorted.sort((a, b) => (a.program || "").localeCompare(b.program || ""));
    return sorted;
  };

  const sortedItemsList = getSortedAnunturi(anunturi);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItemsList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedItemsList.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  const fixUrl = (url) => {
    if (!url || typeof url !== "string") return url;
    return url.replace(/https:\/\/daip\.uvt\.ro\/(wp-content\/)?uploads\//gi, "/uploads/");
  };

  const getLinks = (a) => {
    let links = [];
    if (a.link_pdf) {
      if (Array.isArray(a.link_pdf)) links = [...links, ...a.link_pdf];
      else links.push(a.link_pdf);
    }
    if (a.pdf_uri) {
      if (Array.isArray(a.pdf_uri)) links = [...links, ...a.pdf_uri];
      else links.push(a.pdf_uri);
    }
    return links.map((url) => fixUrl(url));
  };

  const getFileName = (url) => {
    if (!url || typeof url !== "string") return "Fisier.pdf";
    return url.split("/").pop();
  };

  const loadAnunturi = async () => {
    try {
      const res = await fetch("/api/anunturi");
      const data = await res.json();
      setAnunturi(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnunturi();
  }, []);

  const startEdit = (a) => {
    setIsEditing(true);
    setEditId(a.id);
    setFormData({
      id_proiect: a.id_proiect || "",
      program: a.program || "",
      titlu: a.titlu || "",
      posturi: a.posturi || "",
      perioada: a.perioada || "",
      anunt: a.anunt || "",
    });
    setExistingPdfs(getLinks(a));
    setFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({ id_proiect: "", program: "", titlu: "", posturi: "", perioada: "", anunt: "" });
    setExistingPdfs([]);
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.id_proiect || !formData.titlu || !formData.anunt) {
      alert("Completează ID Proiect, Titlu și Conținut anunț!");
      return;
    }
    if (!isEditing && !file) {
      alert("Trebuie să adaugi un fișier PDF!");
      return;
    }

    try {
      setSubmitting(true);
      const formPayload = new FormData();
      formPayload.append("id_proiect", formData.id_proiect);
      formPayload.append("program", formData.program);
      formPayload.append("titlu", formData.titlu);
      formPayload.append("posturi", formData.posturi);
      formPayload.append("perioada", formData.perioada);
      formPayload.append("anunt", formData.anunt);

      if (file) formPayload.append("pdf", file);
      existingPdfs.forEach((url) => formPayload.append("keep_pdfs", url));

      const url = isEditing ? `/api/anunturi/${editId}` : "/api/anunturi";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: { Authorization: `Bearer ${keycloak.token}` },
        body: formPayload,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Eroare la salvare");
      }

      await loadAnunturi();
      cancelEdit();
      alert(isEditing ? "Anunț actualizat!" : "Anunț adăugat!");
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Sigur ștergi acest anunț?")) return;
    try {
      const res = await fetch(`/api/anunturi/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${keycloak.token}` },
      });
      if (!res.ok) throw new Error("Eroare la ștergere");
      setAnunturi((prev) => prev.filter((a) => String(a.id) !== String(id)));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #e6f2ff 0%, #ffffff 100%)",
        minHeight: "100vh",
        py: 8,
        width: "100%",
        overflowX: "hidden",
      }}
    >
      {/* MODIFICARE: maxWidth={false} pentru lățime maximă și padding lateral ajustat */}
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 6 } }}>
        
        {/* Bara de Login/Logout */}
        <Box textAlign="right" mb={2}>
          {isAuthenticated ? (
            <button
              onClick={() => keycloak.logout()}
              style={{ padding: "0.5rem 1rem", backgroundColor: "#c53030", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
            >
              Logout ({keycloak.tokenParsed?.preferred_username})
            </button>
          ) : (
            <button
              onClick={() => keycloak.login()}
              style={{ padding: "0.5rem 1rem", backgroundColor: "#003366", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", opacity: 0.8 }}
            >
              Admin Login
            </button>
          )}
        </Box>

        {/* Titlu */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: "#003366", mb: 2 }}>
            Anunțuri selecție echipe proiecte
          </Typography>
          <Box sx={{ width: 100, height: 4, backgroundColor: "#FFD700", mx: "auto", borderRadius: 2 }} />
        </Box>

        {/* Zona Formular Admin */}
        {isAdmin && (
          <Box sx={{ maxWidth: "1200px", mx: "auto", mb: 4 }}>
            <div style={{ background: "#f9fafb", padding: "2rem", borderRadius: "8px", border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
              <h2>{isEditing ? `Editează anunțul (ID: ${editId})` : "Adaugă anunț nou"}</h2>
              <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
                <input style={inputStyle} placeholder="ID Proiect *" value={formData.id_proiect} onChange={(e) => setFormData({ ...formData, id_proiect: e.target.value })} />
                <input style={inputStyle} placeholder="Program" value={formData.program} onChange={(e) => setFormData({ ...formData, program: e.target.value })} />
                <input style={inputStyle} placeholder="Titlu *" value={formData.titlu} onChange={(e) => setFormData({ ...formData, titlu: e.target.value })} />
                <textarea
                  style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
                  placeholder="Posturi (Apasă Enter pentru rând nou)"
                  value={formData.posturi}
                  onChange={(e) => setFormData({ ...formData, posturi: e.target.value })}
                />
                <input style={inputStyle} placeholder="Perioada" value={formData.perioada} onChange={(e) => setFormData({ ...formData, perioada: e.target.value })} />
                <textarea
                  placeholder="Conținut anunț *"
                  value={formData.anunt}
                  onChange={(e) => setFormData({ ...formData, anunt: e.target.value })}
                  style={{ ...inputStyle, minHeight: "120px", resize: "vertical" }}
                />

                {isEditing && existingPdfs.length > 0 && (
                  <div style={{ padding: "10px", background: "#fff", border: "1px solid #ddd", borderRadius: "6px" }}>
                    <p style={{ margin: "0 0 10px 0", fontSize: "0.9rem", fontWeight: "bold" }}>PDF-uri actuale:</p>
                    {existingPdfs.map((pdf, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
                        <span style={{ fontSize: "0.8rem" }}>{getFileName(pdf)}</span>
                        <button type="button" onClick={() => setExistingPdfs(existingPdfs.filter((p) => p !== pdf))} style={{ color: "red", border: "none", background: "none", cursor: "pointer" }}>Elimină</button>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  style={{ border: dragActive ? "2px dashed #15803d" : "2px dashed #ccc", borderRadius: "8px", padding: "2rem", textAlign: "center", background: dragActive ? "#f0fdf4" : "#f9fafb", cursor: "pointer" }}
                  onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
                  onClick={() => document.getElementById("pdfInput").click()}
                >
                  <input type="file" id="pdfInput" accept="application/pdf" style={{ display: "none" }} onChange={handleFileChange} />
                  {file ? (
                    <div>
                      <p style={{ fontWeight: "bold", color: "#15803d" }}>✓ {file.name}</p>
                      <button type="button" onClick={(e) => { e.stopPropagation(); setFile(null); }} style={{ color: "#c53030" }}>Șterge selecția</button>
                    </div>
                  ) : <p>Trage un PDF nou aici sau <strong>click</strong></p>}
                </div>

                <div style={{ display: "flex", gap: "1rem" }}>
                  <button type="submit" disabled={submitting} style={{ flex: 1, padding: "0.75rem", background: submitting ? "#9ca3af" : "#15803d", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                    {submitting ? "Se salvează..." : (isEditing ? "Salvează modificările" : "Adaugă anunț")}
                  </button>
                  {isEditing && <button type="button" onClick={cancelEdit} style={{ padding: "0.75rem 1.5rem", background: "#6b7280", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>Anulează</button>}
                </div>
              </form>
            </div>
          </Box>
        )}

        {/* Control Sortare */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <FormControl size="medium" sx={{ minWidth: 200 }}>
            <InputLabel id="sort-select-label">Sortează după</InputLabel>
            <Select labelId="sort-select-label" value={sortCriterion} label="Sortează după" onChange={(e) => { setSortCriterion(e.target.value); setCurrentPage(1); }}>
              <MenuItem value="id_desc">Cele mai noi</MenuItem>
              <MenuItem value="id_asc">Cele mai vechi</MenuItem>
              <MenuItem value="titlu_asc">Titlu (A-Z)</MenuItem>
              <MenuItem value="titlu_desc">Titlu (Z-A)</MenuItem>
              <MenuItem value="program">Program</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>
        ) : error ? (
          <Box sx={{ color: "red", textAlign: "center", py: 4 }}>Eroare: {error}</Box>
        ) : (
          <>
            {/* CARD TABEL: Lățime maximă prin eliminarea limitelor din stilurile anterioare */}
            <Card sx={{ backgroundColor: "#ffffff", borderRadius: 4, boxShadow: "0px 10px 30px rgba(0,0,0,0.08)", position: "relative", overflow: "hidden" }}>
              <Box sx={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "6px", background: "linear-gradient(to bottom, #FFD700, #003366)", zIndex: 2 }} />
              
              <CardContent sx={{ p: { xs: 2, md: 4 } }}>
                <Box sx={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "auto" }}>
                    <thead>
  <tr style={{ backgroundColor: "#f0f8ff" }}>
    {/* Titlul ocupă o porțiune generoasă */}
    <th style={{ ...thStyle, width: "20%" }}>Titlu</th>
    
    {/* Coloane înguste pentru date scurte */}
    <th style={{ ...thStyle, width: "8%" }}>ID Proiect</th>
    <th style={{ ...thStyle, width: "12%" }}>Program</th>
    
    {/* MODIFICARE: Coloana Posturi devine cea mai lată */}
    <th style={{ ...thStyle, width: "35%" }}>Posturi</th>
    
    <th style={{ ...thStyle, width: "10%" }}>Perioada</th>
    
    {/* MODIFICARE: Coloana PDF devine mai îngustă */}
    <th style={{ ...thStyle, width: "8%" }}>PDF</th>
    
    {/* Acțiunile rămân la final */}
    {isAdmin && <th style={{ ...thStyle, width: "7%" }}>Acțiuni</th>}
  </tr>
</thead>
                    <tbody>
                      {currentItems.map((a, index) => {
                        const allPdfs = getLinks(a);
                        return (
                          <tr key={a.id || index}>
                            <td style={{ ...tdStyle, fontWeight: 600 }}>{a.titlu}</td>
                            <td style={tdStyle}>{a.id_proiect}</td>
                            <td style={tdStyle}>{a.program}</td>
                            <td style={{ ...tdStyle, whiteSpace: "pre-line" }}>{a.posturi}</td>
                            <td style={tdStyle}>{a.perioada}</td>
                            <td style={tdStyle}>
                              {allPdfs.length > 0 ? (
                                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                  {allPdfs.map((url, i) => (
                                    <a key={i} href={url} target="_blank" rel="noopener noreferrer" style={{ color: "#FF0000", textDecoration: "underline", fontSize: "0.85rem", fontWeight: 600 }}>
                                      • {getFileName(url)}
                                    </a>
                                  ))}
                                </div>
                              ) : "—"}
                            </td>
                            {isAdmin && (
                              <td style={tdStyle}>
                                <div style={{ display: "flex", gap: "8px", flexDirection: "column" }}>
                                  <button onClick={() => startEdit(a)} style={editBtnStyle}>Editează</button>
                                  <button onClick={() => handleDelete(a.id)} style={deleteBtnStyle}>Șterge</button>
                                </div>
                              </td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </Box>
              </CardContent>
            </Card>

            {/* Paginare */}
            {totalPages > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4, gap: 1 }}>
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} style={{ ...pageBtnStyle, opacity: currentPage === 1 ? 0.5 : 1 }}>Anterior</button>
                {[...Array(totalPages)].map((_, i) => (
                  <button key={i + 1} onClick={() => paginate(i + 1)} style={{ ...pageBtnStyle, background: currentPage === i + 1 ? "#003366" : "#fff", color: currentPage === i + 1 ? "#fff" : "#003366" }}>{i + 1}</button>
                ))}
                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} style={{ ...pageBtnStyle, opacity: currentPage === totalPages ? 0.5 : 1 }}>Următor</button>
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}

// STILURI
const inputStyle = { padding: "10px", border: "1px solid #ccc", borderRadius: "4px", width: "100%", boxSizing: "border-box" };
const thStyle = { border: "1px solid #003366", padding: "12px", textAlign: "left", fontWeight: "bold", backgroundColor: "#f0f8ff", color: "#003366" };
const tdStyle = { border: "1px solid #003366", padding: "12px", verticalAlign: "top", color: "#003366", fontSize: "0.95rem" };
const editBtnStyle = { background: "#3b82f6", color: "white", border: "none", padding: "0.5rem", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem" };
const deleteBtnStyle = { background: "#c53030", color: "white", border: "none", padding: "0.5rem", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem" };
const pageBtnStyle = { border: "1px solid #003366", padding: "0.5rem 1rem", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" };