"use client";

import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  Stack,
  Backdrop,
  Slide,
  Input,
  InputLabel,
  FormControl,
} from "@mui/material";
import { X } from "lucide-react";
import { registerClub } from "@/api/service";

export default function ClubCreationDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    setName("");
    setLocation("");
    setAddress("");
    setContact("");
    setDescription("");
    onClose();
  };

  const handleSubmit = async () => {
    if (!name || !location || !contact || !description) {
      alert("Please fill out all required fields");
      return;
    }
    setIsSubmitting(true);
    const token = localStorage.getItem("userToken");

    try {
      const res = await registerClub(name, location, address, contact, description, token)

      if (!res.ok) throw new Error("Error creating club");

      handleClose();
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
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
              <IconButton onClick={handleClose}>
                <X size={20} color="white" />
              </IconButton>
            </Stack>

            <Stack spacing={2}>
              <FormControl required>
                <InputLabel sx={{ color: "#ccc" }} htmlFor="club-name">
                  Club Name
                </InputLabel>
                <Input
                  id="club-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ color: "white" }}
                />
              </FormControl>
              <FormControl required>
                <InputLabel sx={{ color: "#ccc" }} htmlFor="company-main-location">
                  Company Main Location
                </InputLabel>
                <Input
                  id="company-main-location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  sx={{ color: "white" }}
                />
              </FormControl>
              <FormControl required>
                <InputLabel sx={{ color: "#ccc" }} htmlFor="address">
                  Address
                </InputLabel>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  sx={{ color: "white" }}
                />
              </FormControl>
              <FormControl required>
                <InputLabel sx={{ color: "#ccc" }} htmlFor="contact-number">
                  Contact Number
                </InputLabel>
                <Input
                  id="contact-number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  sx={{ color: "white" }}
                />
              </FormControl>
              <FormControl>
                <InputLabel sx={{ color: "#ccc" }} htmlFor="description">
                  Description
                </InputLabel>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  sx={{ color: "white" }}
                  multiline
                  rows={3}
                />
              </FormControl>

              <Stack direction="row" justifyContent="flex-end" spacing={2} pt={2}>
                <Button onClick={handleClose} variant="outlined" color="secondary">
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

