import React from "react";

export const puckConfig = {
  components: {
    // ====================== HEADING / TITLU (WYSIWYG) ======================
    Heading: {
      fields: {
        children: { type: "text", label: "Titlu" },           // fallback dacă nu folosești html
        html: { 
          type: "custom",
          label: "Conținut Titlu (WYSIWYG)",
          render: ({ value, onChange }) => (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onChange(e.target.innerHTML)}
                dangerouslySetInnerHTML={{ __html: value || "<strong>Titlu aici...</strong>" }}
                style={{
                  border: "1px solid #cbd5e1",
                  borderRadius: "6px",
                  padding: "12px",
                  minHeight: "50px",
                  backgroundColor: "#fff",
                  fontSize: "18px",
                  fontWeight: "bold"
                }}
              />
            </div>
          )
        },
        level: { type: "number", label: "Nivel (1-6)", default: 2, min: 1, max: 6 },
        align: { type: "radio", label: "Aliniere", options: ["left", "center", "right"], default: "left" },
        className: { type: "text", label: "Clasă CSS" },
      },
      render: ({ html, children, level = 2, align = "left", className = "" }) => {
        const Tag = `h${level}`;
        const content = html || children || "Titlu aici...";
        return (
          <Tag 
            className={className}
            style={{ textAlign: align, margin: "20px 0" }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        );
      },
    },

    // ====================== PARAGRAF / CONȚINUT COMPLEX (WYSIWYG COMPLET) ======================
    Paragraph: {
      fields: {
        html: {
          type: "custom",
          label: "Conținut Text",
          render: ({ value, onChange }) => {
            const execCmd = (cmd, val = null) => document.execCommand(cmd, false, val);
            return (
              <div style={{ border: "1px solid #cbd5e1", borderRadius: "6px", background: "#fff" }}>
                <div style={{ padding: "6px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", display: "flex", gap: "4px", flexWrap: "wrap" }}>
                  <button type="button" onClick={() => execCmd("bold")} style={{fontWeight:"bold"}}>B</button>
                  <button type="button" onClick={() => execCmd("italic")} style={{fontStyle:"italic"}}>I</button>
                  <button type="button" onClick={() => execCmd("underline")}>U</button>
                  <button type="button" onClick={() => execCmd("insertUnorderedList")}>• Listă</button>
                  <button type="button" onClick={() => execCmd("insertOrderedList")}>1. Listă</button>
                </div>
                <div
                  contentEditable
                  suppressContentEditableWarning
                  onInput={(e) => onChange(e.target.innerHTML)}
                  dangerouslySetInnerHTML={{ __html: value || "Scrie textul aici..." }}
                  style={{ padding: "12px", minHeight: "140px", outline: "none" }}
                />
              </div>
            );
          }
        },
        className: { type: "text", label: "Clasă CSS" },
      },
      render: ({ html, className = "" }) => (
        <div className={className} dangerouslySetInnerHTML={{ __html: html || "" }} />
      ),
    },

    // ====================== IMAGINE REFIZURATĂ CORECT ======================
    Image: {
      fields: {
        src: { 
          type: "custom", 
          label: "Încărcare Imagine",
          render: ({ value, onChange }) => {
            const handleDragOver = (e) => e.preventDefault();

            const handleUpload = async (file) => {
              if (!file || !file.type.startsWith("image/")) {
                alert("Te rog selectează doar imagini!");
                return;
              }

              const formData = new FormData();
              formData.append("file", file);

              try {
                const res = await fetch("https://daiptest.e-uvt.ro/api/upload-imagine", {
                  method: "POST",
                  body: formData,
                });
                
                if (!res.ok) throw new Error("Eroare server");
                
                const resData = await res.json();
                
                if (resData.url) {
                  onChange(resData.url);
                }
              } catch (err) {
                console.error(err);
                alert("❌ Eroare la trimiterea imaginii către server.");
              }
            };

            const onDropZone = (e) => {
              e.preventDefault();
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleUpload(e.dataTransfer.files[0]);
              }
            };

            return (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div
                  onDragOver={handleDragOver}
                  onDrop={onDropZone}
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";
                    input.onchange = (e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleUpload(e.target.files[0]);
                      }
                    };
                    input.click();
                  }}
                  style={{
                    border: "2px dashed #3b82f6",
                    borderRadius: "8px",
                    padding: "20px",
                    textAlign: "center",
                    backgroundColor: "#f0f7ff",
                    cursor: "pointer",
                    color: "#1e3a8a",
                    fontWeight: "600"
                  }}
                >
                  Trage imaginea aici (Drag & Drop) <br />
                  <span style={{ fontSize: "11px", fontWeight: "normal", color: "#64748b" }}>sau dă click pentru a o selecta</span>
                </div>
                
                {value && (
                  <input 
                    type="text" 
                    value={value} 
                    disabled 
                    style={{ padding: "6px", background: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "12px", color: "#334155" }}
                  />
                )}
              </div>
            );
          }
        },
        alt: { type: "text", label: "Text alternativ" },
        width: { type: "number", default: 800 },
        className: { type: "text", label: "Clasă CSS" },
      },
      render: ({ src, alt = "", width }) => {
        const imageSource = src || "https://via.placeholder.com/800x400?text=Incarca+o+imagine";

        return (
          <img
            src={imageSource}
            alt={alt}
            width={width || 800}
            style={{ 
              maxWidth: "100%", 
              height: "auto", 
              display: "block",
              borderRadius: "12px",
              margin: "0 auto"
            }}
          />
        );
      }
    },

    // ====================== BUTON ======================
    Button: {
      fields: {
        label: { type: "text", label: "Text buton", default: "Click aici" },
        href: { type: "text", label: "Link (URL)", default: "#" },
        variant: { 
          type: "select", 
          label: "Stil buton",
          options: [
            { label: "Primary (Albastru)", value: "primary" },
            { label: "Secondary (Gri)", value: "secondary" },
            { label: "Outline", value: "outline" }
          ],
          default: "primary"
        },
        className: { type: "text", label: "Clasă CSS suplimentară" },
      },
      render: ({ label, href = "#", variant = "primary", className = "" }) => {
        const styles = {
          primary: { background: "#0066ff", color: "white" },
          secondary: { background: "#64748b", color: "white" },
          outline: { background: "transparent", color: "#0066ff", border: "2px solid #0066ff" }
        };

        return (
          <a
            href={href}
            style={{
              display: "inline-block",
              padding: "12px 28px",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "600",
              ...styles[variant]
            }}
            className={className}
          >
            {label}
          </a>
        );
      },
    },

    // ====================== SECȚIUNE / CONTAINER ======================
    Section: {
      fields: {
        backgroundColor: { type: "text", default: "#f8fafc", label: "Culoare fundal (#hex)" },
        padding: { type: "text", default: "60px 20px", label: "Padding (ex: 80px 20px)" },
        className: { type: "text", label: "Clasă CSS" },
      },
      render: ({ backgroundColor, padding = "60px 20px", className = "", children }) => (
        <section 
          className={className}
          style={{ 
            backgroundColor, 
            padding,
            width: "100%",
            minHeight: "100px"   // ca să se vadă când e gol
          }}
        >
          {children || <div style={{color: "#94a3b8", textAlign: "center", padding: "40px 0"}}>Conținut secțiune...</div>}
        </section>
      ),
    },

    // ====================== SPACER (spațiu gol) ======================
    Spacer: {
      fields: {
        height: { type: "number", default: 60, label: "Înălțime (px)" },
      },
      render: ({ height = 60 }) => (
        <div style={{ height: `${height}px`, width: "100%" }} />
      ),
    },
  },
};

export default puckConfig;