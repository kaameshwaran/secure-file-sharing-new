import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    setLoading(true);

    // Read the file as base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64FileContent = reader.result.split(',')[1]; // Get base64 string without the "data:image..." part

      const payload = {
        file_name: file.name,
        file_content: base64FileContent,
        owner_user_id: 'user123', // Replace with your user ID
        permissions: {
          read: ['user123', 'user456'], // Replace with actual users
          write: ['user123'], // Replace with actual users
        },
      };

      try {
        // Axios POST request with 'application/json' Content-Type
        const response = await axios.post(
          'https://j1l51l34k4.execute-api.ap-south-1.amazonaws.com/prod/upload',
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        alert(`Upload successful! File ID: ${response.data.file_id}`);
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('File upload failed.');
      } finally {
        setLoading(false);
      }
    };

    // Read the file as base64
    reader.readAsDataURL(file);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ padding: 4, maxWidth: 400, margin: '0 auto' }}
    >
      <Typography variant="h4" gutterBottom>
        File Uploader
      </Typography>
      <TextField
        type="file"
        onChange={handleFileChange}
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<CloudUploadIcon />}
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Upload File'}
      </Button>
    </Box>
  );
};

export default FileUploader;
