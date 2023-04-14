import React from "react";
import SignUp from "./components/SignUp";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./page/Main";
import LogIn from "./components/LogIn";
import PrivateRoute from "./components/PrivateRouter";
import PrivateComponent from "./components/PrivateComponent";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LogIn />} />
          <Route
            path="/privatecomponent"
            element={
              <PrivateRoute>
                <PrivateComponent />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
