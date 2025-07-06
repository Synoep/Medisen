import React, { useState } from "react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/LocalHospital";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import axios from "axios";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Search from "./Components/Search/Search";
import SymptomInput from "./Components/Search/SymptomInput";
import ResultCard from "./Components/Result/ResultCard";

const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: { main: "#1976d2" },
    secondary: { main: "#f50057" },
    background: { default: mode === "dark" ? "#101624" : "#f4f8fb" },
  },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
  },
});

function App() {
  const [mode, setMode] = useState("light");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const theme = React.useMemo(() => getTheme(mode), [mode]);

  const handlePredict = async (selectedSymptoms) => {
    setLoading(true);
    setError("");
    setResults([]);
    try {
      const res = await axios.post("http://localhost:10000/", { list: selectedSymptoms });
      setResults(res.data.map((item) => ({
        disease: item.disease,
        confidence: undefined, // Backend does not return confidence
        symptoms: item.all_symptoms,
        specialty: item.specialty,
      })));
    } catch (err) {
      setError(err.response?.data?.error || "Failed to get prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", background: theme.palette.background.default }}>
        <AppBar position="static" color="primary" elevation={2}>
          <Toolbar>
            <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
              <MenuIcon fontSize="large" />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 1 }}>
              Medisen
            </Typography>
            <Button color="inherit" sx={{ mx: 1 }} component={Link} href="#about">
              About
            </Button>
            <Button color="inherit" sx={{ mx: 1 }} component={Link} href="#history">
              History
            </Button>
            <IconButton sx={{ ml: 2 }} onClick={() => setMode(mode === "light" ? "dark" : "light") } color="inherit">
              {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <Switch checked={mode === "dark"} onChange={() => setMode(mode === "light" ? "dark" : "light")} color="default" />
          </Toolbar>
        </AppBar>
        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh" }}>
          <Paper elevation={6} sx={{ p: 5, mt: 8, width: "100%", maxWidth: 700, borderRadius: 4, textAlign: "center", animation: "fadeIn 1s" }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 800, color: "primary.main", mb: 2 }}>
              Welcome To Medisen
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, color: "text.secondary" }}>
              Enter your symptoms to predict possible diseases.
            </Typography>
            <SymptomInput onSubmit={handlePredict} />
          </Paper>
          <Box sx={{ width: "100%", maxWidth: 700, mt: 4 }}>
            {loading && (
              <Typography align="center" sx={{ mt: 4 }} color="primary">
                Predicting diseases...
              </Typography>
            )}
            {error && (
              <Typography align="center" sx={{ mt: 4 }} color="error">
                {error}
              </Typography>
            )}
            {!loading && !error && results.length > 0 && (
              <Box>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                  Prediction Results
                </Typography>
                {results.map((res, idx) => (
                  <ResultCard key={idx} {...res} />
                ))}
              </Box>
            )}
          </Box>
        </Container>
        
      </Box>
    </ThemeProvider>
  );
}

export default App;
