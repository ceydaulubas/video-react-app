import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useUserContext } from "../contexts/AuthContext";

interface PrivateRouteProps {
  path: string;
  element: React.ReactNode;
}

function PrivateRoute({ path, element }: PrivateRouteProps) {
  const { isAuthenticated } = useUserContext();

  return isAuthenticated ? <Route path={path} element={element} /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
