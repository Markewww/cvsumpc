// src/pages/LoanInfo.js
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMoneyBillWave, FaClock, FaPercentage } from "react-icons/fa";
import "./LoanInfo.css";

const loanDetails = {
  personal: {
    title: "Personal Loan",
    description: "Flexible personal loans for your everyday needs.",
    maxAmount: "₱50,000",
    interest: "1.2% per month",
    term: "12 months max"
  },
  multipurpose: {
    title: "Multipurpose Loan",
    description: "Covers a wide range of personal and household expenses.",
    maxAmount: "₱100,000",
    interest: "1% per month",
    term: "24 months max"
  },
  calamity: {
    title: "Calamity Loan",
    description: "Emergency loan assistance for calamities and disasters.",
    maxAmount: "₱30,000",
    interest: "0.5% per month",
    term: "12 months max"
  },
  educational: {
    title: "Educational Loan",
    description: "Support your educational journey with affordable rates.",
    maxAmount: "₱80,000",
    interest: "0.8% per month",
    term: "18 months max"
  },
  salary: {
    title: "Salary Loan",
    description: "Short-term loan with quick approval against salary.",
    maxAmount: "₱20,000",
    interest: "1.5% per month",
    term: "6 months max"
  }
};

export default function LoanInfo() {
  const { loanType } = useParams();
  const navigate = useNavigate();
  const loan = loanDetails[loanType] || {
    title: "Unknown Loan",
    description: "No details available."
  };

  return (
    <div className="loan-info-container">
      <div className="loan-card">
        {/* Back Button */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>

        {/* Loan Title & Description */}
        <h1>{loan.title}</h1>
        <p className="loan-description">{loan.description}</p>

        {/* Loan Highlights */}
        {loan.maxAmount && (
          <div className="loan-highlights">
            <div className="highlight-item">
              <FaMoneyBillWave className="highlight-icon" />
              <p><strong>Max Amount:</strong><br />{loan.maxAmount}</p>
            </div>
            <div className="highlight-item">
              <FaPercentage className="highlight-icon" />
              <p><strong>Interest:</strong><br />{loan.interest}</p>
            </div>
            <div className="highlight-item">
              <FaClock className="highlight-icon" />
              <p><strong>Term:</strong><br />{loan.term}</p>
            </div>
          </div>
        )}

        {/* CTA Button */}
        <div className="loan-actions">
          <button onClick={() => navigate("/loan_calculator")}>Try Calculator</button>
          <button onClick={() => navigate("/apply_membership")} className="apply-btn">Apply Now</button>
        </div>
      </div>
    </div>
  );
}
