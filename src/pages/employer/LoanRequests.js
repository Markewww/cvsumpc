// src/pages/employer/LoanRequests.js
import React, { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

export default function LoanRequests() {
  const [loanRequests, setLoanRequests] = useState([]);

  useEffect(() => {
    const fetchLoanRequests = async () => {
      try {
        const snapshot = await getDocs(collection(db, "loans"));
        const requests = [];

        for (const docSnap of snapshot.docs) {
          const loanData = docSnap.data();

          // Default member name
          let memberName = "Unknown";

          // Fetch member details if memberID exists
          if (loanData.memberID) {
            try {
              const memberRef = doc(db, "members", loanData.memberID);
              const memberSnap = await getDoc(memberRef);
              if (memberSnap.exists()) {
                memberName = memberSnap.data().fullName || "Unnamed";
              }
            } catch (err) {
              console.error("Error fetching member:", err);
            }
          }

          requests.push({
            id: docSnap.id,
            ...loanData,
            memberName,
          });
        }
        setLoanRequests(requests);
      } catch (error) {
        console.error("Error fetching loan requests:", error);
      }
    };

    fetchLoanRequests();
  }, []);

  const handleAction = async (id, action) => {
    try {
      const loanRef = doc(db, "loans", id);
      await updateDoc(loanRef, { status: action });
      setLoanRequests((prev) =>
        prev.map((loan) =>
          loan.id === id ? { ...loan, status: action } : loan
        )
      );
    } catch (error) {
      console.error("Error updating loan status:", error);
    }
  };

  return (
    <div className="content">
      <h2>Loan Requests</h2>
      {loanRequests.length === 0 ? (
        <p>No loan requests found.</p>
      ) : (
        <table className="members-table">
          <thead>
            <tr>
              <th>Member Name</th>
              <th>Loan Amount</th>
              <th>Loan Type</th>
              <th>Status</th>
              <th>Requested At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loanRequests.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.memberName}</td>
                <td>₱{loan.loanAmount?.toLocaleString() || "0"}</td>
                <td>{loan.loanType || "N/A"}</td>
                <td
                  style={{
                    color:
                      loan.status === "approved"
                        ? "green"
                        : loan.status === "rejected"
                        ? "red"
                        : "orange",
                  }}
                >
                  {loan.status}
                </td>
                <td>
                  {loan.requestedAt?.toDate
                    ? loan.requestedAt.toDate().toLocaleString()
                    : "N/A"}
                </td>
                <td>
                  {loan.status === "pending" ? (
                    <>
                      <button
                        style={{
                          backgroundColor: "green",
                          color: "white",
                          marginRight: "5px",
                          padding: "5px 10px",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleAction(loan.id, "approved")}
                      >
                        Accept
                      </button>
                      <button
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          padding: "5px 10px",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleAction(loan.id, "rejected")}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
