// src/pages/employer/ActiveLoans.js
import React from "react";

export default function ActiveLoans({ loansList, membersList }) {
  const getMemberName = (memberId) => {
    const member = membersList.find((m) => m.id === memberId);
    return member ? member.fullName : memberId;
  };

  const activeLoans = loansList.filter((loan) => loan.status === "approved");

  return (
    <div className="content">
      <h2>Active Loans</h2>
      {activeLoans.length === 0 ? (
        <p>No active loans.</p>
      ) : (
        <table className="loans-table">
          <thead>
            <tr>
              <th>Member Name</th>
              <th>Loan Type</th>
              <th>Amount</th>
              <th>Approved At</th>
            </tr>
          </thead>
          <tbody>
            {activeLoans.map((loan) => (
              <tr key={loan.id}>
                <td>{getMemberName(loan.memberId)}</td>
                <td>{loan.loanType}</td>
                <td>₱{loan.amount.toLocaleString()}</td>
                <td>
                  {loan.approvedAt?.toDate
                    ? loan.approvedAt.toDate().toLocaleString()
                    : new Date(loan.approvedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
