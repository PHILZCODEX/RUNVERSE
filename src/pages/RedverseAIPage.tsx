// AI feature removed as per user requirement: "remove the ai button i do not want ai"
import React from 'react';
import { Navigate } from 'react-router-dom';

export const RedverseAIPage: React.FC = () => {
  return <Navigate to="/feed" replace />;
};
