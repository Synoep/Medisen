import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Feedback from "./Feedback";

const FeedbackPage = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const loadFeedback = () => {
    const allFeedback = JSON.parse(localStorage.getItem("feedback") || "[]");
    setFeedbackList(allFeedback.reverse());
  };

  useEffect(() => {
    loadFeedback();
  }, [modalOpen]);

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 6, px: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }} align="center">
        User Feedback
      </Typography>
      <Button variant="contained" sx={{ mb: 3 }} onClick={() => setModalOpen(true)}>
        Add Your Feedback
      </Button>
      <Feedback open={modalOpen} onClose={() => setModalOpen(false)} />
      <Stack spacing={2}>
        {feedbackList.length === 0 ? (
          <Typography color="text.secondary" align="center">No feedback yet. Be the first to share your experience!</Typography>
        ) : (
          feedbackList.map((fb, idx) => (
            <Card key={idx} variant="outlined" sx={{ borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mr: 2 }}>
                    {fb.name || "Anonymous"}
                  </Typography>
                  <Rating value={fb.rating} readOnly size="small" />
                  <Typography variant="caption" sx={{ ml: 'auto', color: 'text.secondary' }}>
                    {new Date(fb.date).toLocaleString()}
                  </Typography>
                </Box>
                <Typography variant="body1">{fb.comment}</Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Stack>
    </Box>
  );
};

export default FeedbackPage; 