// frontend/src/Rapoarte.jsx
import React from "react";
import { Container, Typography, Card, CardContent, Grid, Button, Box } from "@mui/material";

export default function Rapoarte() {
  // Datele hardcodate direct din JSON-ul tău
  const pageData = {
    "title": "Rapoarte DAIP",
    "rapoarte": [
      {
        "title": "Raport DAIP 2020",
        "url": "/uploads/2021/11/Raport-DAIP_2020.pdf"
      },
      {
        "title": "Raport DAIP 2019",
        "url": "/uploads/2021/11/Raport-DAIP_2019.pdf"
      },
      {
        "title": "Raport DAIP 2018",
        "url": "/uploads/2021/11/Raport-DAIP_2018-ok.doc.pdf"
      },
      {
        "title": "Raport DAIP 2017",
        "url": "/uploads/2021/11/Raport-DAIP-activitate-2017.docx.pdf"
      },
      {
        "title": "Raport DAIP 2016",
        "url": "/uploads/2021/11/Raport-DAIP-activitate-2016.doc.pdf"
      },
      {
        "title": "Raport DAIP 2015",
        "url": "/uploads/2021/11/Raport-DAIP-activitate-2015.pdf"
      },
      {
        "title": "Raport DAIP 2014",
        "url": "/uploads/2021/11/Raport-DAIP-activitate-2014.doc.pdf"
      }
    ]
  };

  return (
    <Box sx={{ backgroundColor: "#e6f2ff", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="lg">
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
            {pageData.title}
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

        {/* Grid Carduri */}
        <Grid container spacing={4}>
          {pageData.rapoarte.map((r, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                  },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  p: 3,
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#003366",
                      mb: 2,
                      fontFamily: "'Roboto', sans-serif",
                    }}
                  >
                    {r.title}
                  </Typography>
                </CardContent>

                <Box sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#FFD700",
                      color: "#003366",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#003366",
                        color: "#FFD700",
                        transform: "scale(1.05)",
                      },
                      px: 4,
                      py: 1.5,
                      borderRadius: "30px",
                      transition: "all 0.3s",
                    }}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Vezi raport
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}