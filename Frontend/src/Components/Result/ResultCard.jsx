import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import Stack from "@mui/material/Stack";

const ResultCard = ({ disease, confidence, symptoms, specialty }) => (
  <Card elevation={4} sx={{ mb: 3, borderRadius: 3, animation: 'fadeIn 0.7s' }}>
    <CardContent>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
        <LocalHospitalIcon color="primary" fontSize="large" />
        <Typography variant="h5" sx={{ fontWeight: 700, flexGrow: 1 }}>
          {disease}
        </Typography>
        {confidence !== undefined && (
          <Chip label={`Confidence: ${(confidence * 100).toFixed(1)}%`} color="secondary" />
        )}
      </Stack>
      {specialty && (
        <Typography variant="subtitle2" color="secondary" sx={{ mb: 1, fontWeight: 600 }}>
          Specialty: {specialty}
        </Typography>
      )}
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
        Symptoms:
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {symptoms && symptoms.map((sym, idx) => (
          <Chip key={idx} label={sym} variant="outlined" color="primary" sx={{ mb: 0.5 }} />
        ))}
      </Stack>
    </CardContent>
  </Card>
);

export default ResultCard; 