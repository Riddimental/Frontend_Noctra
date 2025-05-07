"use client";

import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Stack,
  Backdrop,
  Slide,
} from "@mui/material";
import { X } from "lucide-react";

export default function ClubCreationDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const token = localStorage.getItem("userToken");

    try {
      const res = await fetch("/api/clubs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          main_location: location,
          contact_number: contact,
          description,
        }),
      });

      if (!res.ok) throw new Error("Error creating club");

      setName("");
      setLocation("");
      setContact("");
      setDescription("");
      onClose();
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 300,
          sx: {
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: 500,
        }}
      >
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
          <Box
            sx={{
              bgcolor: "#0f0f0f",
              borderRadius: 4,
              boxShadow: 24,
              p: 4,
              width: "90%",
              maxWidth: 500,
              color: "white",
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" color="white">
                Create New Club
              </Typography>
              <IconButton onClick={onClose}>
                <X size={20} color="white" />
              </IconButton>
            </Stack>

            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Club Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputLabelProps={{ style: { color: "#ccc" } }}
                InputProps={{ style: { color: "white" } }}
              />
              <TextField
                fullWidth
                label="Main Location"
                variant="outlined"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                InputLabelProps={{ style: { color: "#ccc" } }}
                InputProps={{ style: { color: "white" } }}
              />
              <TextField
                fullWidth
                label="Contact Number"
                variant="outlined"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                InputLabelProps={{ style: { color: "#ccc" } }}
                InputProps={{ style: { color: "white" } }}
              />
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                multiline
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                InputLabelProps={{ style: { color: "#ccc" } }}
                InputProps={{ style: { color: "white" } }}
              />

              <Stack direction="row" justifyContent="flex-end" spacing={2} pt={2}>
                <Button onClick={onClose} variant="outlined" color="secondary">
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{ bgcolor: "#6366f1", "&:hover": { bgcolor: "#4f46e5" } }}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Slide>
      </Box>
    </Modal>

  );
}
