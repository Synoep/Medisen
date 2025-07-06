import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

// Real doctor data for Nagpur
const NAGPUR_DOCTORS = [
  { name: "Dr. Girdhar Heda", specialty: "Family Physician", city: "Nagpur", contact: "9822227677" },
  { name: "Dr. Jay Deshmukh", specialty: "General Physician", city: "Nagpur", contact: "7122531788" },
  { name: "Dr. Sachin Shelke", specialty: "General Physician", city: "Nagpur", contact: "7000787347" },
  { name: "Dr. Hemangi Vaid", specialty: "General Physician", city: "Nagpur", contact: "8830869880" },
  { name: "Dr. Uma Vaidya", specialty: "OB-GYN", city: "Nagpur", contact: "7122287759" },
  { name: "Dr. M Shams Khan", specialty: "General Physician", city: "Nagpur", contact: "7122529503" },
  { name: "Dr. Praful Pimpalwar", specialty: "Pediatrician", city: "Nagpur", contact: "7122420032" },
  { name: "Dr. Bhange Nilesh Ramkrishna", specialty: "General Physician", city: "Nagpur", contact: "7126699822" },
  { name: "Dr. Suchit Bagade", specialty: "General Physician", city: "Nagpur", contact: "7122649965" },
  { name: "Dr. Subhrajit Dasgupta", specialty: "General Physician", city: "Nagpur", contact: "7122435959" },
  { name: "Dr. Shubhada Gade", specialty: "General Physician", city: "Nagpur", contact: "7122284170" },
  { name: "Dr. Satsheel Sapre", specialty: "General Physician", city: "Nagpur", contact: "7122222953" },
  { name: "Dr. Salim Kamal", specialty: "General Physician", city: "Nagpur", contact: "7122733036" },
  { name: "Dr. S S Gupta", specialty: "General Physician", city: "Nagpur", contact: "7122723056" },
  { name: "Dr. Ravindra Urkude", specialty: "General Physician", city: "Nagpur", contact: "7122526195" },
  { name: "Dr. Nitin Tiwari", specialty: "Cardiologist", city: "Nagpur", contact: "8512830995" },
  { name: "Dr. Sanjay Gidhwani", specialty: "Cardiologist", city: "Nagpur", contact: "7702035544" },
];

function getRandomDoctors(arr, n) {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

const FindDoctor = ({ open, onClose, disease }) => {
  const [city, setCity] = useState("Nagpur");
  const [doctors, setDoctors] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // Optionally filter by disease specialty if provided
    let filtered = NAGPUR_DOCTORS;
    if (disease) {
      filtered = filtered.filter(doc => doc.specialty.toLowerCase().includes(disease.toLowerCase()));
      if (filtered.length === 0) filtered = NAGPUR_DOCTORS; // fallback to all if none match
    }
    setDoctors(getRandomDoctors(filtered, 6));
    setSearched(true);
  };

  const handleClose = () => {
    setCity("Nagpur");
    setDoctors([]);
    setSearched(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Find a Doctor</DialogTitle>
      <DialogContent dividers>
        {disease && (
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Searching for: <b>{disease}</b>
          </Typography>
        )}
        <form onSubmit={handleSearch}>
          <TextField
            select
            label="City"
            value={city}
            onChange={e => setCity(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          >
            <MenuItem value="Nagpur">Nagpur</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" fullWidth>
            Search
          </Button>
        </form>
        {searched && doctors.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Stack spacing={2}>
              {doctors.map((doc, idx) => (
                <Card key={idx} variant="outlined" sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>{doc.name}</Typography>
                    <Typography variant="body2" color="text.secondary">Specialty: {doc.specialty}</Typography>
                    <Typography variant="body2">City: {doc.city}</Typography>
                    <Typography variant="body2">Contact: {doc.contact}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        )}
        {searched && doctors.length === 0 && (
          <Typography color="error" sx={{ mt: 2 }}>No doctors found.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FindDoctor; 