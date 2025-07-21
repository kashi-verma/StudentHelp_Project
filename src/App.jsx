import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import SignUpPage from "./Components/SignUpPage";
import SignInPage from "./Components/SignInPage";
import HomePage from "./Components/HomePage";
import SellPage from "./Components/SellPage";
import UserDashBoard from "./Components/UserDashBoard"; // Import your new UserDashBoard
import Shop from "./Components/Shop";
import AdminDashboard from "./Components/AdminDashboard";
//added APP.jsx
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/dashboard" element={<UserDashBoard />} />
        <Route path="/shop" element={<Shop/>}/>
        <Route path="/admin" element={<AdminDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
