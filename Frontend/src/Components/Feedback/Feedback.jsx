import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

const Feedback = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const allFeedback = JSON.parse(localStorage.getItem("feedback") || "[]");
    allFeedback.push({ name, rating, comment, date: new Date().toISOString() });
    localStorage.setItem("feedback", JSON.stringify(allFeedback));
    setSubmitted(true);
  };

  const handleClose = () => {
    setName("");
    setRating(0);
    setComment("");
    setSubmitted(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Share Your Feedback</DialogTitle>
      <DialogContent dividers>
        {submitted ? (
          <Box sx={{ py: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="success.main" gutterBottom>
              Thank you for your feedback!
            </Typography>
            <Typography variant="body2">We appreciate your input to help us improve.</Typography>
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Your Name (optional)"
              value={name}
              onChange={e => setName(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Typography sx={{ mb: 1 }}>How helpful was this platform?</Typography>
            <Rating
              value={rating}
              onChange={(_, newValue) => setRating(newValue)}
              size="large"
              sx={{ mb: 2 }}
              required
            />
            <TextField
              label="Your Comments"
              value={comment}
              onChange={e => setComment(e.target.value)}
              fullWidth
              multiline
              minRows={3}
              sx={{ mb: 2 }}
              required
            />
            <Button type="submit" variant="contained" fullWidth disabled={rating === 0 || !comment.trim()}>
              Submit Feedback
            </Button>
          </form>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Feedback; 