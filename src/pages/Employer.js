// src/pages/Employer.js
import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaFacebook } from "react-icons/fa";
import { auth, db } from "../firebase-config"; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import logo from "../images/cvsumpc_logo.jpg";        // for nav
import background from "../images/CvSU-Front.jpg";    // for background
import coopLogo from "../images/cvsumpc_logo.jpg";    // login form logo
import "./Employer.css";

import { useNavigate } from "react-router-dom";

export default function Employer() {
  const [showSignUp, setShowSignUp] = useState(false);
  const navigate = useNavigate();

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // SignUp state
  const [companyName, setCompanyName] = useState("");
  const [employerId, setEmployerId] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Messages
  const [message, setMessage] = useState("");

  // Scroll to top (navbar logo click)
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Handle Login
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setMessage("✅ Login successful!");

      // Redirect to Employer dashboard
      navigate("/employer-dashboard")
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  };

  // Handle Sign Up
  const handleSignUp = async () => {
    console.log("Register Button Clicked");

    if (signUpPassword !== confirmPassword) {
      setMessage("❌ Passwords do not match!");
      return;
    }

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signUpEmail,
        signUpPassword
      );

      const user = userCredential.user;

      // Save employer info in Firestore
      await setDoc(doc(db, "employers", user.uid), {
        companyName: companyName,
        employerId: employerId,
        email: signUpEmail,
        createdAt: new Date(),
      });

      setMessage("✅ Employer registered successfully!");
      setShowSignUp(false);

      // Reset form
      setCompanyName("");
      setEmployerId("");
      setSignUpEmail("");
      setSignUpPassword("");
      setConfirmPassword("");

    } catch (err) {
      console.error("❌ Firebase sign-up error:", err.code, err.message);
        
      if (err.code === "auth/email-already-in-use") {
        alert("This email is already registered. Please use another email or log in.");
      } else if (err.code === "auth/invalid-email") {
        alert("Invalid email address.");
      } else if (err.code === "auth/weak-password") {
        alert("Password must be at least 6 characters.");
      } else {
        alert(`Error: ${err.message}`);
      }
    }
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
            <FaFacebook /> CvSU Multipurpose Cooperative on Facebook
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

      {/* Employer Main Section */}
      <main
        className="employer-main"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="auth-card">
          {/* Coop Logo */}
          <img src={coopLogo} alt="CVSUMPC Logo" className="form-logo" />

          <h2>Employer Login</h2>
          <p className="subtitle">Access your employer dashboard</p>

          <input
            type="email"
            placeholder="Email / Employer ID"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button className="btn" onClick={handleLogin}>Login</button>

          <p className="signup-text">
            Don’t have an account?{" "}
            <button className="link-btn" onClick={() => setShowSignUp(true)}>
              Sign Up
            </button>
          </p>

          {/* Show feedback messages */}
          {message && <p className="message">{message}</p>}
        </div>
      </main>

      {/* Sign Up Modal */}
      {showSignUp && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Employer Sign Up</h2>

            <input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Employer ID / TIN"
              value={employerId}
              onChange={(e) => setEmployerId(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email Address"
              value={signUpEmail}
              onChange={(e) => setSignUpEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button className="btn" onClick={handleSignUp}>Register</button>
            <button className="close-btn" onClick={() => setShowSignUp(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} CVSUMPC. All rights reserved.</p>
      </footer>
    </>
  );
}
