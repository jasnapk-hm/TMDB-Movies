import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const userId = useSelector((state) => state.user);


  if (!userId) {
    return <Navigate to="/" />;
  }


  return children;
};

export default ProtectedRoute;