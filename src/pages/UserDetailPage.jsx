import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUsers } from '../api/userAPI';
import {
  Container,
  Typography,
  Box,
  Paper,
  Avatar,
  Divider,
  Grid,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

const UserDetailPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchUsers()
      .then((data) => {
        const selectedUser = data.find((u) => u.id === parseInt(id, 10));
        setUser(selectedUser);
        setLoading(false);
      })
      .catch(() => {
        setError('Unable to fetch user details.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!user) return <ErrorMessage message="User not found." />;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Grid container spacing={3}>
          {/* Avatar and Basic Info */}
          <Grid item xs={12} md={4} display="flex" justifyContent="center">
            <Avatar
              sx={{
                bgcolor: '#004d40',
                width: 100,
                height: 100,
              }}
            >
              <AccountCircle fontSize="large" sx={{ fontSize: 50 }} />
            </Avatar>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" color="primary" fontWeight={600}>
              {user.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {user.company.name}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {user.company.catchPhrase}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Contact Info */}
        <Box>
          <Typography variant="h6" color="secondary" gutterBottom>
            Contact Information
          </Typography>
          <Typography>Email: {user.email}</Typography>
          <Typography>Phone: {user.phone}</Typography>
          <Typography>
            Address: {`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Additional Info */}
        <Box>
          <Typography variant="h6" color="secondary" gutterBottom>
            Additional Information
          </Typography>
          <Typography>Website: {user.website}</Typography>
          <Typography>Business: {user.company.name}</Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserDetailPage;
