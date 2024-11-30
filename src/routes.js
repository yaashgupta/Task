import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserListPage from './pages/UserListPage';
import UserDetailPage from './pages/UserDetailPage';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<UserListPage />} />
      <Route path="/users/:id" element={<UserDetailPage />} />
    </Routes>
  </Router>
);

export default AppRoutes;
