import React from 'react';
import { Typography, Box } from '@mui/material';

const ErrorMessage = ({ message }) => (
  <Box textAlign="center" mt={2}>
    <Typography color="error" variant="h6">
      {message}
    </Typography>
  </Box>
);

export default ErrorMessage;
