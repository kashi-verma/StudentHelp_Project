import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import SignUpPage from "./Components/SignUpPage";
import SignInPage from "./Components/SIgnInPage";// Corrected typo: SIgnInPage -> SignInPage
import HomePage from "./Components/HomePage";     // Import your new HomePage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} /> {/* New HomePage route */}
      </Routes>
    </Router>
  );
}

export default App;
