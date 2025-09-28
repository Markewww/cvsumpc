// src/pages/LoanCalculator.js
import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaFacebook } from "react-icons/fa";
import logo from "../images/cvsumpc_logo.jpg"; // adjust path if needed
import "./LoanCalculator.css"; // we'll style separately

export default function LoanCalculator() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Loan state
  const [loanType, setLoanType] = useState("Personal Loan");
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [results, setResults] = useState(null);

  const loanOptions = {
    "Personal Loan": 0.18,
    "Multipurpose Loan": 0.15,
    "Calamity Loan": 0.12,
    "Educational Loan": 0.12,
    "Salary Loan": 0.12,
  };

  const calculateLoan = () => {
    const principal = parseFloat(amount);
    const months = parseInt(term);
    const rate = loanOptions[loanType];

    if (!principal || !months || months < 1 || months > 36) {
      alert("Please enter a valid loan amount and a term between 1-36 months.");
      return;
    }

    let baseMonthly = principal / months;
    let balance = principal;
    let breakdown = [];
    let totalInterest = 0;
    let totalPayment = 0;

    let interest13to24 = 0;
    let interest25to36 = 0;

    for (let m = 1; m <= months; m++) {
      let interest = 0;

      if (m === 13) {
        interest13to24 = (balance / months) * rate;
      }
      if (m === 25) {
        interest25to36 = (balance / months) * rate;
      }

      if (m >= 13 && m <= 24) {
        interest = interest13to24;
      } else if (m >= 25) {
        interest = interest25to36;
      } else {
        interest = 0;
      }

      let monthlyPayment = baseMonthly + interest;

      totalInterest += interest;
      totalPayment += monthlyPayment;

      breakdown.push({
        month: m,
        baseMonthly: baseMonthly.toFixed(2),
        interest: interest.toFixed(2),
        monthlyPayment: monthlyPayment.toFixed(2),
        balance: (balance - baseMonthly).toFixed(2),
      });

      balance -= baseMonthly;
    }

    setResults({
      breakdown,
      totalInterest: totalInterest.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
    });
  };

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="contact-info">
          <a href="tel:#########">
            <FaPhone /> #########
          </a>
          <a href="mailto:contactus@csu.coop">
            <FaEnvelope /> contactus@csu.coop
          </a>
          <a
            href="https://www.facebook.com/csudc.indangcavite"
            target="_blank"
            rel="noreferrer"
          >
            <FaFacebook /> CvSU Multipurpose Cooperative
          </a>
        </div>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left" onClick={scrollToTop}>
          <img src={logo} alt="CVSUMPC Logo" className="logo" />
          <span>CVSUMPC</span>
        </div>
        <div className="nav-right">
          <a href="/" className="nav-link">Member</a>
          <a href="/employer" className="nav-link">Employer</a>
          <a href="/about" className="nav-link">About</a>
        </div>
      </nav>

      {/* Sub-bar */}
      <div className="sub-bar">
        <div className="dropdown">
          <span className="dropdown-toggle">Cash Loans ▾</span>
          <div className="dropdown-menu">
            <a href="/loan_calculator">Personal Loan</a>
            <a href="/loan_calculator">Multipurpose Loan</a>
            <a href="/loan_calculator">Emergency Loan</a>
            <a href="/loan_calculator">Salary Loan</a>
            <a href="/loan_calculator">Educational Loan</a>
          </div>
        </div>
        <div className="dropdown">
          <span className="dropdown-toggle">Membership ▾</span>
          <div className="dropdown-menu">
            <a href="/apply_membership">Apply for membership</a>
          </div>
        </div>
        <a href="#" className="loan-app-link">
          Loan App
        </a>
      </div>

      {/* Main content */}
      <main className="loan-main">
        <div className="loan-card">
          <h2>Loan Calculator</h2>
          <p className="subtitle">Estimate your monthly loan payments easily.</p>

          <div className="form-group">
            <label>Loan Type</label>
            <select
              value={loanType}
              onChange={(e) => setLoanType(e.target.value)}
            >
              {Object.keys(loanOptions).map((type) => (
                <option key={type} value={type}>
                  {type} ({loanOptions[type] * 100}%)
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Loan Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter loan amount"
            />
          </div>

          <div className="form-group">
            <label>Term (Months)</label>
            <input
              type="number"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="1-36"
            />
          </div>

          <button className="calculate-btn" onClick={calculateLoan}>
            Calculate
          </button>
        </div>

        {results && (
          <div className="results-card">
            <h3>Loan Breakdown</h3>
            <table className="results-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Base</th>
                  <th>Interest</th>
                  <th>Monthly Payment</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {results.breakdown.map((row) => (
                  <tr key={row.month}>
                    <td>{row.month}</td>
                    <td>₱{row.baseMonthly}</td>
                    <td>₱{row.interest}</td>
                    <td>₱{row.monthlyPayment}</td>
                    <td>₱{row.balance}</td>
                  </tr>
                ))}
                <tr className="totals-row">
                  <td colSpan="2">Totals</td>
                  <td>₱{results.totalInterest}</td>
                  <td>₱{results.totalPayment}</td>
                  <td>—</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} CVSUMPC. All rights reserved.</p>
      </footer>
    </>
  );
}
