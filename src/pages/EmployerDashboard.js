// src/pages/EmployerDashboard.js
import React, { useState, useEffect } from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaMoneyBillWave,
  FaClipboardList,
  FaHistory,
  FaFileInvoice,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { getAuth, signOut } from "firebase/auth";
import logo from "../images/cvsumpc_logo.jpg";
import "./EmployerDashboard.css";

// Firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

// Import your pages
import LoanRequests from "./employer/LoanRequests";
import ActiveLoans from "./employer/ActiveLoans";
import Payments from "./employer/Payments";

function DashboardOverview({ membersCount, activeLoansCount, pendingLoansCount, paymentsCollected }) {
  return (
    <div className="content">
      <h2>Dashboard Overview</h2>
      <div className="cards">
        <div className="card">
          <h3>{membersCount}</h3>
          <p>Members</p>
        </div>
        <div className="card">
          <h3>{activeLoansCount}</h3>
          <p>Active Loans</p>
        </div>
        <div className="card">
          <h3>{pendingLoansCount}</h3>
          <p>Pending Requests</p>
        </div>
        <div className="card">
          <h3>₱{paymentsCollected.toLocaleString()}</h3>
          <p>Payments Collected</p>
        </div>
      </div>
    </div>
  );
}

function MembersList({ membersList }) {
  return (
    <div className="content">
      <h2>Members & Loan History</h2>
      {membersList.length === 0 ? (
        <p>No members found.</p>
      ) : (
        <table className="members-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Joined At</th>
            </tr>
          </thead>
          <tbody>
            {membersList.map((member) => (
              <tr key={member.id}>
                <td>{member.fullName}</td>
                <td>{member.email}</td>
                <td>{member.contactNumber}</td>
                <td>{member.address}</td>
                <td>
                  {member.joinedAt?.toDate
                    ? member.joinedAt.toDate().toLocaleString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default function EmployerDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [membersCount, setMembersCount] = useState(0);
  const [activeLoansCount, setActiveLoansCount] = useState(0);
  const [pendingLoansCount, setPendingLoansCount] = useState(0);
  const [paymentsCollected, setPaymentsCollected] = useState(0);
  const [membersList, setMembersList] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Members
        const membersSnapshot = await getDocs(collection(db, "members"));
        setMembersCount(membersSnapshot.size);
        const membersArray = [];
        membersSnapshot.forEach((doc) => {
          membersArray.push({ id: doc.id, ...doc.data() });
        });
        setMembersList(membersArray);

        // Loans
        const loansSnapshot = await getDocs(collection(db, "loans"));
        let activeLoans = 0;
        let pendingLoans = 0;
        loansSnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.status === "approved") activeLoans++;
          if (data.status === "pending") pendingLoans++;
        });
        setActiveLoansCount(activeLoans);
        setPendingLoansCount(pendingLoans);

        // Payments
        const paymentsSnapshot = await getDocs(collection(db, "payments"));
        let totalPayments = 0;
        paymentsSnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          totalPayments += data.amountPaid || 0;
        });
        setPaymentsCollected(totalPayments);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const auth = getAuth();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "Employer";
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to logout. Try again.");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <DashboardOverview
            membersCount={membersCount}
            activeLoansCount={activeLoansCount}
            pendingLoansCount={pendingLoansCount}
            paymentsCollected={paymentsCollected}
          />
        );
      case "requests":
        return <LoanRequests />;
      case "loans":
        return <ActiveLoans />;
      case "members":
        return <MembersList membersList={membersList} />;
      case "payments":
        return <Payments />;
      case "reports":
        return <h2>Reports</h2>;
      case "settings":
        return <h2>Settings</h2>;
      default:
        return <h2>Welcome</h2>;
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="CVSUMPC Logo" className="sidebar-logo" />
          <h2>CVSUMPC</h2>
        </div>
        <nav>
          <ul>
            <li onClick={() => setActiveTab("dashboard")}>
              <FaTachometerAlt /> Dashboard
            </li>
            <li onClick={() => setActiveTab("requests")}>
              <FaClipboardList /> Loan Requests
            </li>
            <li onClick={() => setActiveTab("loans")}>
              <FaMoneyBillWave /> Active Loans
            </li>
            <li onClick={() => setActiveTab("members")}>
              <FaUsers /> Members
            </li>
            <li onClick={() => setActiveTab("payments")}>
              <FaFileInvoice /> Payments
            </li>
            <li onClick={() => setActiveTab("reports")}>
              <FaHistory /> Reports
            </li>
            <li onClick={() => setActiveTab("settings")}>
              <FaCog /> Settings
            </li>
          </ul>
        </nav>
        <button className="logout" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
        </header>
        {renderContent()}
      </main>
    </div>
  );
}
