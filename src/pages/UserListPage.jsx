import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { fetchUsers } from '../api/userAPI';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  TextField,
  MenuItem,
  Card,
  CardContent,
  Typography,
  AppBar,
  Toolbar,
} from '@mui/material';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

const UserListPage = () => {
  const { users, setUsers, loading, setLoading, error, setError } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchUsers()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [setUsers, setLoading, setError]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (cityFilter ? user.address.city === cityFilter : true)
  );

  return (
    <Container maxWidth="lg">
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6">User Management</Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} my={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Search by name"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            label="Filter by city"
            variant="outlined"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
          >
            <MenuItem value="">All Cities</MenuItem>
            {[...new Set(users.map((user) => user.address.city))].map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      <Grid container spacing={3}>
        {filteredUsers.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card onClick={() => navigate(`/users/${user.id}`)} style={{ cursor: 'pointer' }}>
              <CardContent>
                <Typography variant="h6">{user.name}</Typography>
                <Typography>Email: {user.email}</Typography>
                <Typography>Phone: {user.phone}</Typography>
                <Typography>
                  Address: {`${user.address.street}, ${user.address.city}`}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UserListPage;
