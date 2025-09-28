// src/Router.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Employer from "./pages/Employer";
import ApplyMembership from "./pages/ApplyMembership";
import LoanCalculator from "./pages/LoanCalculator";
import LoanInfo from "./pages/LoanInfo";
import EmployerDashboard from "./pages/EmployerDashboard";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/employer" element={<Employer />} />
        <Route path="/apply_membership" element={<ApplyMembership />} />
        <Route path="/loan_calculator" element={<LoanCalculator />} />
        <Route path="/loan_info/:loanType" element={<LoanInfo />} />
        <Route path="/employer-dashboard" element={<EmployerDashboard />} />
        <Route path="/about" element={<div style={{ padding: 40 }}>About Page</div>} />
        <Route path="*" element={<h2 style={{ textAlign: "center" }}>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
