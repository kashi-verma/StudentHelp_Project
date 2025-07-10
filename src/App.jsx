import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import SignUpPage from "./Components/SignUpPage";
import SignInPage from "./Components/SignInPage"; // Fixed typo: SIgnInPage -> SignInPage
import HomePage from "./Components/HomePage";
import SellPage from "./Components/SellPage"; // If you want to add SellPage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
       <Route path="/sell" element={<SellPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
