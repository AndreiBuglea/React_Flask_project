import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  IconButton,
  CircularProgress,
  Alert
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// Componentă pentru rândurile tabelului
function Row({ log }) {
  const [open, setOpen] = useState(false);

  // Funcție pentru a extrage numele utilizatorului dacă backend-ul a trimis un obiect claims
  const renderUsername = (userField) => {
    if (typeof userField === 'object' && userField !== null) {
      // Încearcă să ia 'sub' (identity) sau 'role', altfel face string din obiect
      return userField.sub || userField.role || JSON.stringify(userField);
    }
    return userField || "Sistem";
  };

  const getActionStyle = (action) => {
    const act = String(action || "").toLowerCase();
    const isError = act.includes("failed") || act.includes("error") || act.includes("forbidden");
    return {
      padding: "4px 10px",
      borderRadius: "12px",
      fontSize: "0.7rem",
      fontWeight: "bold",
      backgroundColor: isError ? "#ffebee" : "#e8f5e9",
      color: isError ? "#c62828" : "#2e7d32",
      border: `1px solid ${isError ? "#ffcdd2" : "#c8e6c9"}`
    };
  };

  return (
    <React.Fragment>
      <TableRow 
        onClick={() => setOpen(!open)}
        sx={{ 
          '& > *': { borderBottom: 'unset' }, 
          cursor: 'pointer',
          '&:hover': { backgroundColor: '#f5faff' } 
        }}
      >
        <TableCell width="40">
          <IconButton size="small">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell sx={{ fontSize: "0.85rem" }}>{log.timestamp}</TableCell>
        <TableCell sx={{ fontWeight: "bold", color: "#1a237e" }}>
          {renderUsername(log.username)}
        </TableCell>
        <TableCell>
          <span style={getActionStyle(log.action)}>
            {log.action}
          </span>
        </TableCell>
        <TableCell sx={{ fontSize: "0.9rem" }}>{log.details}</TableCell>
        <TableCell align="right" sx={{ color: "text.secondary", fontSize: "0.75rem" }}>{log.ip}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2, p: 2, backgroundColor: "#fafafa", borderRadius: 2, border: "1px dashed #ccc" }}>
              <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#666', mb: 1, display: 'block' }}>
                PAYLOAD DATE (JSON):
              </Typography>
              {log.payload ? (
                <pre style={{ 
                  whiteSpace: 'pre-wrap', 
                  wordBreak: 'break-all', 
                  fontSize: '0.8rem',
                  backgroundColor: '#2d2d2d',
                  color: '#ccc',
                  padding: '12px',
                  borderRadius: '4px',
                  margin: 0
                }}>
                  {JSON.stringify(log.payload, null, 2)}
                </pre>
              ) : (
                <Typography variant="caption" color="text.secondary">Nu există date brute pentru această acțiune.</Typography>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Istoric() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("/api/logs", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        
        if (!res.ok) {
          if(res.status === 401) throw new Error("Sesiune expirată. Te rugăm să te reautentifici.");
          throw new Error("Nu ai permisiunea de a vedea log-urile.");
        }
        
        const data = await res.json();
        setLogs(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <Box sx={{ 
      backgroundColor: "#f0f2f5", 
      minHeight: "100vh", 
      py: 4,
      px: 2
    }}>
      <Container maxWidth="lg">
        <Paper sx={{ p: 3, mb: 3, borderRadius: 2, textAlign: 'center', backgroundColor: '#003366', color: 'white' }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>Istoric Activitate</Typography>
          <Typography variant="subtitle2">Sistem de monitorizare a operațiunilor efectuate de administratori</Typography>
        </Paper>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>
        ) : error ? (
          <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>
        ) : (
          <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
            <Table size="small">
              <TableHead sx={{ backgroundColor: "#f8f9fa" }}>
                <TableRow>
                  <TableCell />
                  <TableCell sx={{ fontWeight: "bold" }}>Data/Ora</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Utilizator</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Acțiune</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Mesaj</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">IP</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs.length > 0 ? (
                  logs.map((log, index) => <Row key={index} log={log} />)
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                      <Typography color="text.secondary">Nu există nicio activitate înregistrată.</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Box>
  );
}