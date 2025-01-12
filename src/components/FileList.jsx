import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FileList = () => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate(); // React Router's navigate function

  useEffect(() => {
  const fetchFiles = async () => {
    try {
      const response = await axios.get('https://dc99r06cta.execute-api.ap-south-1.amazonaws.com/prod/files');
      const data = JSON.parse(response.data.body); // Parse the response body
      if (Array.isArray(data)) {
        setFiles(data); // Update the state if it's an array
      } else {
        console.error("Expected an array of files, but got:", data);
        setFiles([]); // In case the data isn't an array, set an empty array
      }
    } catch (error) {
      console.error('Error fetching files:', error);
      setFiles([]); // Fallback in case of error
    }
  };
  fetchFiles();
}, []);


  const handleRedirectToUpload = () => {
    navigate('/upload'); // Redirects to the /upload route
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Uploaded Files
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRedirectToUpload}
        >
          Upload File
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>File Name</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.file_id}>
                <TableCell>{file.file_name}</TableCell>
                <TableCell>{file.owner_user_id}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" size="small">
                    View
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ marginLeft: 1 }}
                  >
                    Share
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FileList;
