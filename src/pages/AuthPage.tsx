import React from 'react';
import { Navigate } from 'react-router-dom';

export const AuthPage: React.FC = () => {
  return <Navigate to="/" replace />;
};
