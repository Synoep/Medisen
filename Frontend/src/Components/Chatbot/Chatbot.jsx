import React, { useState, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const Chatbot = ({ open, onClose, initialPrompt }) => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: initialPrompt || "Hi! I'm your health assistant. Ask me anything about diseases, symptoms, or cures." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const contentRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: newMessages.map(({ role, content }) => ({ role, content })),
          max_tokens: 256,
        }),
      });
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't get a response.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages([...newMessages, { role: "assistant", content: "Sorry, there was an error contacting the assistant." }]);
    } finally {
      setLoading(false);
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
      }, 100);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        Health Assistant
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ minHeight: 300, maxHeight: 400, p: 2 }} ref={contentRef}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {messages.map((msg, idx) => (
            <Box key={idx} sx={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '90%' }}>
              <Typography
                variant="body2"
                sx={{
                  bgcolor: msg.role === 'user' ? 'primary.main' : 'grey.200',
                  color: msg.role === 'user' ? 'primary.contrastText' : 'text.primary',
                  px: 2, py: 1, borderRadius: 2, mb: 0.5,
                  whiteSpace: 'pre-line',
                }}
              >
                {msg.content}
              </Typography>
            </Box>
          ))}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <TextField
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about a disease, cure, or symptom..."
          fullWidth
          multiline
          minRows={1}
          maxRows={3}
          disabled={loading}
        />
        <Button onClick={sendMessage} disabled={loading || !input.trim()} variant="contained">
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Chatbot; 