import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./pages/Auth/LogIn";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/Auth/SignUp";
import Main from "./pages/Main";
import PrivateRoutes from "./components/PrivateRouter";
import PrivatePage from "./pages/PrivatePage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<PrivatePage />} path="/" />
            <Route element={<NotFound />} path="/notFound" />
          </Route>
          <Route element={<Main />} path="/main" />
          <Route element={<LogIn />} path="/logIn" />
          <Route element={<SignUp />} path="/signUp" />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
