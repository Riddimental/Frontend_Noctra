import React, { useState } from 'react';
import { Drawer, TextField, Button, Typography, Box, IconButton } from '@mui/material';
import { AttachFile } from '@mui/icons-material';

interface NewPostProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (caption: string, files: File[]) => void;
}

const NewPost: React.FC<NewPostProps> = ({ open, onClose, onSubmit }) => {
  const [caption, setCaption] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const handleCaptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handlePostSubmit = () => {
    onSubmit(caption, files);
    setCaption(''); // Reset caption
    setFiles([]);   // Reset files
    onClose();      // Close drawer after submitting
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: '100%',
          maxWidth: '600px',
          padding: '16px',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        },
      }}
    >
      <Box>
        <Typography variant="h6" gutterBottom>
          New Post
        </Typography>

        <TextField
          label="What's on your mind?"
          multiline
          rows={4}
          fullWidth
          value={caption}
          onChange={handleCaptionChange}
          variant="outlined"
          sx={{ marginBottom: '16px' }}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <IconButton color="primary" component="label">
            <AttachFile />
            <input
              type="file"
              hidden
              multiple
              onChange={handleFileChange}
            />
          </IconButton>
          <Typography variant="body2" color="textSecondary" sx={{ marginLeft: '8px' }}>
            {files.length > 0 ? `${files.length} file(s) selected` : 'No files selected'}
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handlePostSubmit}
        >
          Post
        </Button>
      </Box>
    </Drawer>
  );
};

export default NewPost;
