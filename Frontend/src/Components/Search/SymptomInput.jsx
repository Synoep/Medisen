import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { sym } from "./data";

const SymptomInput = ({ onSubmit }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(selectedSymptoms);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Autocomplete
        multiple
        options={sym}
        value={selectedSymptoms}
        onChange={(event, newValue) => setSelectedSymptoms(newValue)}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="filled"
              color="primary"
              label={option}
              {...getTagProps({ index })}
              key={option}
              sx={{ fontWeight: 500 }}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Enter symptoms"
            placeholder="Type to search..."
            helperText="Select all symptoms you are experiencing."
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
        )}
        sx={{ mb: 2 }}
      />
      {selectedSymptoms.length > 0 && (
        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2, justifyContent: 'center' }}>
          {selectedSymptoms.map((symptom, idx) => (
            <Chip
              key={idx}
              label={symptom}
              color="primary"
              variant="filled"
              sx={{ fontWeight: 500, fontSize: '1rem', mb: 0.5 }}
            />
          ))}
        </Stack>
      )}
      <Stack direction="row" justifyContent="center">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={selectedSymptoms.length === 0}
          sx={{
            px: 4,
            py: 1.5,
            fontWeight: 700,
            fontSize: "1.1rem",
            borderRadius: 2,
            boxShadow: 2,
            transition: "transform 0.15s, box-shadow 0.15s",
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 6,
            },
          }}
        >
          Predict Diseases
        </Button>
      </Stack>
    </form>
  );
};

export default SymptomInput; 