import React from "react";
import { Container, Typography, Box, Link, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function Home() {
  // Date introduse manual (hardcoded) conform noilor informații
  const pageTitle = "Servicii integrate și profesioniști în educația timpurie";

  const content = [
    "Anunț lansare selecție grup țintă pentru program de formare a formatorilor în domeniul curricular pentru personalul didactic și nedidactic din serviciile de educație timpurie PNRR/2024/C15/ME/I3 „Formarea profesioniștilor din educația timpurie”.",
    "Titlu proiect: „Servicii integrate și profesioniști în educația timpurie”.",
    "Anunț privind selecția grupului țintă a UVT."
  ];

  const annexes = [
    { text: "Anexa 1. Cerere înscriere în grupul țintă", url: "http://daip.uvt.ro/wp-content/uploads/2024/11/Anexa-1_A-Cerere-inscriere-in-grupul-tinta.docx" }, // înlocuiește cu URL real, ex: https://daip.uvt.ro/wp-content/uploads/2024/11/Anexa-1_A-Cerere-inscriere-in-grupul-tinta.docx
    { text: "Anexa 2. Declarație de consimțământ", url: "http://daip.uvt.ro/wp-content/uploads/2024/11/Anexa-2-Declaratie-de-consimtamant.docx" },
    { text: "Anexa 3. Declarație angajament", url: "http://daip.uvt.ro/wp-content/uploads/2024/11/Anexa-3-Declaratie-angajament.docx" },
    { text: "Anexa 8. Formular de înregistrare individuală a participanților", url: "http://daip.uvt.ro/wp-content/uploads/2024/11/Anexa-8-Formular-de-inregistrare-individuala-a-participantilor.xlsx" }
  ];

  const countiesData = [
    { judet: "Vâlcea", minim: 6 },
    { judet: "Timiș", minim: 15 },
    { judet: "Olt", minim: 6 },
    { judet: "Mehedinți", minim: 4 },
    { judet: "Hunedoara", minim: 6 },
    { judet: "Gorj", minim: 5 },
    { judet: "Dolj", minim: 10 },
    { judet: "Caraș-Severin", minim: 5 },
    { judet: "Arad", minim: 7 }
  ];

  return (
    <Box sx={{ backgroundColor: "#e6f2ff", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="md">
        {/* Titlu principal */}
        <Typography
          variant="h3"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            color: "#003366",
            fontWeight: "bold",
            mb: 5,
            textShadow: "1px 1px 4px rgba(0,0,0,0.15)",
          }}
        >
          {pageTitle}
        </Typography>

        {/* Conținut text principal */}
        {content.length > 0 && (
          <Paper
            elevation={2}
            sx={{
              p: { xs: 3, md: 4 },
              mb: 5,
              borderRadius: 2,
              backgroundColor: "#ffffff",
            }}
          >
            {content.map((paragraph, index) => (
              <Typography
                key={index}
                variant="body1"
                sx={{
                  mb: 2.5,
                  fontSize: "1.08rem",
                  lineHeight: 1.9,
                  color: "#1a3c5e",
                }}
              >
                {paragraph}
              </Typography>
            ))}
          </Paper>
        )}

        {/* Secțiune Anexe / Documente */}
        {annexes.length > 0 && (
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                mb: 3,
                color: "#003366",
                fontWeight: 600,
              }}
            >
              Anexe disponibile
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {annexes.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    fontSize: "1.05rem",
                    color: "#0066cc",
                    "&:hover": {
                      color: "#003366",
                      textDecorationColor: "#003366",
                    },
                  }}
                >
                  <Box component="span" sx={{ mr: 1 }}>📄</Box>
                  {link.text}
                </Link>
              ))}
            </Box>
          </Box>
        )}

        {/* Secțiune Număr minim participanți pe județ */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              mb: 3,
              color: "#003366",
              fontWeight: 600,
            }}
          >
            Număr minim de participanți pe județ
          </Typography>

          <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
            <Table sx={{ minWidth: 300 }}>
              <TableHead sx={{ backgroundColor: "#f0f7ff" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: "#003366" }}>Județ</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold", color: "#003366" }}>
                    Nr. minim de participanți / județ
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {countiesData.map((row, index) => (
                  <TableRow key={index} hover>
                    <TableCell component="th" scope="row">
                      {row.judet}
                    </TableCell>
                    <TableCell align="right">{row.minim}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Divider sx={{ my: 5, borderColor: "#b0bec5" }} />

        <Typography
          variant="caption"
          color="text.secondary"
          align="center"
          display="block"
          sx={{ mt: 3 }}
        >
          Sursă: DAIP – Universitatea de Vest din Timișoara
        </Typography>
      </Container>
    </Box>
  );
}