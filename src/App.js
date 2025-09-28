// src/App.js
import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import {
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaCalculator,
  FaBuilding,
  FaList
} from "react-icons/fa";
import logo from "./images/cvsumpc_logo.jpg";

// Hero slides
const slides = [
  { title: "Welcome to CvSU Loaning System", subtitle: "Fast. Easy. Reliable.", background: "images/CvSU-Front.jpg" },
  { title: "Build Your Career", subtitle: "Support for your educational journey", background: "images/CvSU-Front.jpg" },
  { title: "Connect with Employers", subtitle: "Linking education with industry", background: "images/CvSU-Front.jpg" },
  { title: "Explore Our Services", subtitle: "Loans tailored to your needs", background: "images/CvSU-Front.jpg" },
  { title: "Virtual Loan App", subtitle: "Monitor your loan status", background: "images/CvSU-Front.jpg" }
];

// Layout with navbar/footer
function Layout({ children }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="contact-info">
          <a href="tel:#########"><FaPhone /> #########</a>
          <a href="mailto:contactus@csu.coop"><FaEnvelope /> contactus@csu.coop</a>
          <a href="https://www.facebook.com/csudc.indangcavite" target="_blank" rel="noreferrer">
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
            <a href="/loan_info/personal">Personal Loan</a>
            <a href="/loan_info/multipurpose">Multipurpose Loan</a>
            <a href="/loan_info/calamity">Calamity Loan</a>
            <a href="/loan_info/educational">Educational Loan</a>
            <a href="/loan_info/salary">Salary Loan</a>
          </div>
        </div>
        <div className="dropdown">
          <span className="dropdown-toggle">Membership ▾</span>
          <div className="dropdown-menu">
            <a href="/apply_membership">Apply for membership</a>
          </div>
        </div>
        <a href="#" className="loan-app-link">Loan App</a>
      </div>

      {/* Main content */}
      {children}

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} CVSUMPC. All rights reserved.</p>
      </footer>
    </>
  );
}

// Home/Member Page
function MemberPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const slideCount = slides.length;
  const startX = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 4000);
    return () => clearInterval(interval);
  }, [paused, slideCount]);

  const handleDragStart = (e) => { startX.current = e.clientX; };
  const handleDragEnd = (e) => {
    const diff = e.clientX - startX.current;
    if (diff < -50) setCurrentSlide((prev) => (prev + 1) % slideCount);
    else if (diff > 50) setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  };

  return (
    <>
      {/* Hero Slider */}
      <div className="hero-slider" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="slider-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide, index) => (
            <div className="slide" key={index} style={{ backgroundImage: `url(${slide.background})` }}
              onMouseDown={handleDragStart} onMouseUp={handleDragEnd}>
              <div className="slide-content">
                <h1>{slide.title}</h1>
                <p>{slide.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Cards */}
      <section className="info-cards">
        <div className="card" onClick={() => (window.location.href = "/loan_calculator")}>
          <FaCalculator className="card-icon" />
          <h3>Calculator</h3>
        </div>
        <div className="card"><FaFacebook className="card-icon" /><h3>Our Social Media</h3></div>
        <div className="card"><FaBuilding className="card-icon" /><h3>Branch</h3></div>
        <div className="card"><FaList className="card-icon" /><h3>Accredited Agencies</h3></div>
      </section>
    </>
  );
}

export default function App() {
  return (
    <Layout>
      <MemberPage />
    </Layout>
  );
}
