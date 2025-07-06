import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ChatIcon from "@mui/icons-material/Chat";

const ResultCard = ({ disease, confidence, symptoms, specialty, onAskAssistant, onFindDoctor }) => (
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
      <Stack direction="row" justifyContent="flex-end" spacing={1} sx={{ mt: 2 }}>
        {onAskAssistant && (
          <Button
            variant="outlined"
            startIcon={<ChatIcon />}
            onClick={() => onAskAssistant(`Tell me about ${disease} and how to cure or manage it.`)}
          >
            Ask the Assistant about this disease
          </Button>
        )}
        {onFindDoctor && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<LocalHospitalIcon />}
            onClick={onFindDoctor}
          >
            Find a Doctor
          </Button>
        )}
      </Stack>
    </CardContent>
  </Card>
);

export default ResultCard; 